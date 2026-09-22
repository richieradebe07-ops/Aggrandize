import crypto from "node:crypto";

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
