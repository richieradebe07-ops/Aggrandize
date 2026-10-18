import crypto from "node:crypto";
import { calculatePayAmount } from "./content";
import { getPaymentLink } from "./paymentLinks";

// PayFast sandbox test credentials — these are PayFast's own publicly
// documented sandbox values (safe to commit, they only work against the
// sandbox). Replace via env vars once the live PayFast account is verified:
// set PAYFAST_MODE=live, PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, and
// PAYFAST_PASSPHRASE in the deployment environment.
const SANDBOX_MERCHANT_ID = "10000100";
const SANDBOX_MERCHANT_KEY = "46f0cd694581a";

export const PAYFAST_MODE = process.env.PAYFAST_MODE === "live" ? "live" : "sandbox";

export const PAYFAST_MERCHANT_ID =
  process.env.PAYFAST_MERCHANT_ID || SANDBOX_MERCHANT_ID;
export const PAYFAST_MERCHANT_KEY =
  process.env.PAYFAST_MERCHANT_KEY || SANDBOX_MERCHANT_KEY;
// No passphrase by default in sandbox. Live integrations should always set one.
export const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE || "";

export const PAYFAST_PROCESS_URL =
  PAYFAST_MODE === "live"
    ? "https://www.payfast.co.za/eng/process"
    : "https://sandbox.payfast.co.za/eng/process";

const PAYFAST_VALIDATE_URL =
  PAYFAST_MODE === "live"
    ? "https://www.payfast.co.za/eng/query/validate"
    : "https://sandbox.payfast.co.za/eng/query/validate";

// PayFast urlencodes values PHP-style (spaces as "+"), which differs from
// encodeURIComponent's "%20". This matches their documented signature
// algorithm exactly.
function pfEncode(value) {
  return encodeURIComponent(String(value).trim()).replace(/%20/g, "+");
}

// Builds the signature string in PayFast's documented field order and MD5
// hashes it. `fields` must already be in that order (see buildPaymentFields
// below) — order matters because PayFast recomputes the signature using
// their own canonical field order when verifying.
export function generateSignature(fields, passphrase = PAYFAST_PASSPHRASE) {
  const pairs = Object.entries(fields)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}=${pfEncode(value)}`);

  let paramString = pairs.join("&");
  if (passphrase) {
    paramString += `&passphrase=${pfEncode(passphrase)}`;
  }

  return crypto.createHash("md5").update(paramString).digest("hex");
}

// Builds the full set of fields for the hidden form that redirects the
// client to PayFast's hosted payment page, including the signature.
// Field order follows PayFast's integration guide — do not reorder.
export function buildPaymentFields({
  returnUrl,
  cancelUrl,
  notifyUrl,
  nameFirst,
  nameLast,
  email,
  cellNumber,
  mPaymentId,
  amount,
  itemName,
  itemDescription,
}) {
  const fields = {
    merchant_id: PAYFAST_MERCHANT_ID,
    merchant_key: PAYFAST_MERCHANT_KEY,
    return_url: returnUrl,
    cancel_url: cancelUrl,
    notify_url: notifyUrl,
    name_first: nameFirst,
    name_last: nameLast,
    email_address: email,
    cell_number: cellNumber || "",
    m_payment_id: mPaymentId,
    amount: amount.toFixed(2),
    item_name: itemName,
    item_description: itemDescription || "",
  };

  const signature = generateSignature(fields);

  return { ...fields, signature };
}

// Server-to-server confirmation that an ITN really came from PayFast, per
// their recommended validation step. `rawBody` must be the exact
// x-www-form-urlencoded body PayFast posted to the notify_url.
export async function validateWithPayfast(rawBody) {
  try {
    const response = await fetch(PAYFAST_VALIDATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: rawBody,
    });
    const text = (await response.text()).trim();
    return text === "VALID";
  } catch {
    return false;
  }
}

// Verifies an ITN payload's signature the same way PayFast verifies ours —
// same field order, same passphrase rule — over the fields PayFast actually
// sent (excluding their own `signature` field).
export function verifyItnSignature(itnFields) {
  const { signature, ...rest } = itnFields;
  return generateSignature(rest) === signature;
}

// --- Stateless /pay flow (app/pay) — deposit/full/final-balance payments
// made outside the full Get Started brief. Unlike that flow (lib/
// submissions.js, backed by Vercel Blob), /pay deliberately has no
// database yet (see lib/payIdempotency.js for the one place that trade-off shows up). With
// nowhere to persist "for payment X, we expect amount Y", the plan and
// payment type are instead encoded directly into m_payment_id itself, and
// the amount is re-derived independently from lib/content.js at ITN time
// — never trusted from anything PayFast echoes back.
//
// This is safe because m_payment_id is one of the fields PayFast's ITN
// signature covers (see verifyItnSignature above): by the time
// app/api/payfast/notify parses it, its authenticity already rests on the
// same signature check every other ITN field does. No new field is added
// to the signed set, so this doesn't touch — or risk breaking — the field
// order buildPaymentFields signs with.
const PAY_REF_PREFIX = "PAY";

export function buildPayReference({ packageId, paymentType }) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${PAY_REF_PREFIX}_${packageId}_${paymentType}_${Date.now()}_${random}`;
}

export function isPayReference(mPaymentId) {
  return typeof mPaymentId === "string" && mPaymentId.startsWith(`${PAY_REF_PREFIX}_`);
}

const VALID_PAY_TYPES = new Set(["deposit", "balance", "full"]);

// Returns null for anything that isn't a well-formed /pay reference —
// callers treat that the same as "unknown payment" and reject it.
export function parsePayReference(mPaymentId) {
  if (!isPayReference(mPaymentId)) return null;
  const parts = mPaymentId.split("_");
  if (parts.length < 4) return null;
  const [, packageId, paymentType] = parts;
  if (!VALID_PAY_TYPES.has(paymentType)) return null;
  return { packageId, paymentType };
}

const PAY_AMOUNT_TOLERANCE = 0.05; // rands, to absorb float rounding

// Re-derives the expected amount for a /pay reference straight from
// lib/content.js's real package prices and compares it to what PayFast
// actually reports was paid (amount_gross) — the "never trust an amount
// we didn't just compute ourselves" check, done without a database.
export function verifyPayAmount({ packageId, paymentType, amountGross }) {
  const expected = calculatePayAmount({ packageId, paymentType });
  if (!expected) return { valid: false, expectedAmount: null };
  const valid = Math.abs(expected.amount - amountGross) <= PAY_AMOUNT_TOLERANCE;
  return { valid, expectedAmount: expected.amount };
}

// --- Custom-quote payment links (app/pay/[token]) — same no-database,
// re-derive-don't-trust approach as the plan-based /pay flow above, but
// for a one-off amount a human typed into lib/paymentLinks.js rather than
// a standard package price. The token itself is the only "secret" (see
// that file's header comment); it must not contain an underscore, since
// that's the delimiter used here.
const LINK_REF_PREFIX = "LINK";

export function buildLinkReference({ token }) {
  const random = Math.random().toString(36).slice(2, 8);
  return `${LINK_REF_PREFIX}_${token}_${Date.now()}_${random}`;
}

export function isLinkReference(mPaymentId) {
  return typeof mPaymentId === "string" && mPaymentId.startsWith(`${LINK_REF_PREFIX}_`);
}

export function parseLinkReference(mPaymentId) {
  if (!isLinkReference(mPaymentId)) return null;
  const parts = mPaymentId.split("_");
  if (parts.length < 4) return null;
  const token = parts[1];
  return { token };
}

// Re-derives the expected amount for a payment-link reference straight
// from lib/paymentLinks.js's hand-maintained config, the same way
// verifyPayAmount re-derives it from lib/content.js's package prices.
export function verifyLinkAmount({ token, amountGross }) {
  const link = getPaymentLink(token);
  if (!link) return { valid: false, expectedAmount: null, link: null };
  const valid = Math.abs(link.amount - amountGross) <= PAY_AMOUNT_TOLERANCE;
  return { valid, expectedAmount: link.amount, link };
}

// --- ITN source IP check ---
// PayFast's developer docs publish the IP ranges their servers send ITNs
// from. This sandbox environment's network policy blocks payfast.co.za, so
// these ranges were triangulated from search results referencing that
// documentation rather than fetched directly from it.
// TODO(you): verify this list against developers.payfast.co.za before
// relying on it for anything stricter than a logged warning — PayFast has
// expanded these ranges before, and a stale hardcoded list has broken real
// integrations' ITNs elsewhere (reported against at least one WooCommerce
// plugin). That's why isKnownPayfastIp is advisory, not enforced: a
// mismatch is logged for review but does NOT reject the notification by
// itself. The signature check + validateWithPayfast() are the actual
// authentication boundary here; this is defense-in-depth layered on top,
// and a false negative from a stale list is worse than a skipped layer —
// it would silently strand a real, paid-for notification.
export const PAYFAST_IP_RANGES = [
  "197.97.145.144/28",
  "41.74.179.192/27",
  "102.216.36.0/28",
  "102.216.36.128/28",
  "144.126.193.139/32",
];

function ipToInt(ip) {
  const parts = String(ip).split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

function ipInCidr(ip, cidr) {
  const [range, bitsStr] = cidr.split("/");
  const bits = bitsStr === undefined ? 32 : parseInt(bitsStr, 10);
  const ipInt = ipToInt(ip);
  const rangeInt = ipToInt(range);
  if (ipInt === null || rangeInt === null) return false;
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ipInt & mask) === (rangeInt & mask);
}

export function isKnownPayfastIp(ip) {
  if (!ip) return false;
  return PAYFAST_IP_RANGES.some((cidr) => ipInCidr(ip, cidr));
}
