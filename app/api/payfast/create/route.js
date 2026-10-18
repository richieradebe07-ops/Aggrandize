import { NextResponse } from "next/server";
import { PACKAGES, calculatePayAmount, SITE } from "@/lib/content";
import { getPaymentLink } from "@/lib/paymentLinks";
import { checkRateLimit } from "@/lib/rateLimit";
import {
  buildPaymentFields,
  buildPayReference,
  buildLinkReference,
  PAYFAST_PROCESS_URL,
} from "@/lib/payfast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_PAYMENT_TYPES = new Set(["deposit", "balance", "full"]);

function siteOrigin(request) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("host");
  return `${proto}://${host}`;
}

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

// Backs both /pay (components/PayForm.jsx — a deposit, final-balance, or
// full payment on a real plan) and /pay/[token] (a one-off custom-quote
// payment link, components/PaymentLinkCheckout.jsx). Either way the
// amount is always recomputed here — from lib/content.js's package prices
// for a plan, or from lib/paymentLinks.js's hand-entered config for a
// token — never accepted from the client. See lib/payfast.js's
// buildPayReference/buildLinkReference comments for how the resulting
// m_payment_id lets app/api/payfast/notify verify that amount again later
// without a database.
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const {
    name,
    email,
    phone = "",
    businessName = "",
    packageId,
    paymentType,
    token,
    consent,
    company, // honeypot
  } = payload || {};

  // Honeypot: real visitors never see or fill this field (see
  // PayForm.jsx / PaymentLinkCheckout.jsx) — a filled value means a bot.
  // Report a harmless shape without building a real PayFast request.
  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ actionUrl: null, paymentFields: {} });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimit = checkRateLimit(`payfast-create:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return badRequest("A valid email is required.");
  }
  if (consent !== true) {
    return badRequest("You must agree to the Terms, Refund Policy, and Privacy Policy to continue.");
  }

  const origin = siteOrigin(request);

  // --- Custom-quote payment link (/pay/[token]) ---
  if (typeof token === "string" && token.trim()) {
    const link = getPaymentLink(token.trim());
    if (!link) return badRequest("This payment link isn't valid.");

    const mPaymentId = buildLinkReference({ token: token.trim() });
    const nameParts = (link.clientName || "Client").trim().split(" ");

    const paymentFields = buildPaymentFields({
      returnUrl: `${origin}/pay/success?ref=${mPaymentId}`,
      cancelUrl: `${origin}/pay/cancelled?ref=${mPaymentId}`,
      notifyUrl: `${origin}/api/payfast/notify`,
      nameFirst: nameParts[0],
      nameLast: nameParts.slice(1).join(" ") || nameParts[0],
      email: email.trim(),
      cellNumber: typeof phone === "string" ? phone.trim() : "",
      mPaymentId,
      amount: link.amount,
      itemName: `${SITE.name}: ${link.description}`,
      itemDescription: "",
    });

    return NextResponse.json({ actionUrl: PAYFAST_PROCESS_URL, paymentFields });
  }

  // --- Standard plan deposit / final balance / full payment (/pay) ---
  if (!name || typeof name !== "string" || !name.trim()) return badRequest("Name is required.");
  if (!PACKAGES.some((p) => p.id === packageId)) return badRequest("Invalid plan.");
  if (!VALID_PAYMENT_TYPES.has(paymentType)) return badRequest("Invalid payment type.");

  // Never trust an amount from the browser — always recompute server-side
  // from the real package price.
  const pricing = calculatePayAmount({ packageId, paymentType });
  if (!pricing) return badRequest("Could not calculate the amount for this plan.");

  const pkg = PACKAGES.find((p) => p.id === packageId);
  const mPaymentId = buildPayReference({ packageId, paymentType });
  const typeLabel =
    paymentType === "deposit" ? "deposit" : paymentType === "full" ? "payment in full" : "final balance";
  const trimmedBusinessName =
    typeof businessName === "string" ? businessName.trim().slice(0, 200) : "";

  const paymentFields = buildPaymentFields({
    returnUrl: `${origin}/pay/success?ref=${mPaymentId}`,
    cancelUrl: `${origin}/pay/cancelled?ref=${mPaymentId}`,
    notifyUrl: `${origin}/api/payfast/notify`,
    nameFirst: name.trim().split(" ")[0] || name.trim(),
    nameLast: name.trim().split(" ").slice(1).join(" ") || name.trim(),
    email: email.trim(),
    cellNumber: typeof phone === "string" ? phone.trim() : "",
    mPaymentId,
    amount: pricing.amount,
    itemName: `${SITE.name}: ${pkg.name} plan, ${typeLabel}`,
    itemDescription: trimmedBusinessName ? `Business: ${trimmedBusinessName}` : "",
  });

  return NextResponse.json({
    actionUrl: PAYFAST_PROCESS_URL,
    paymentFields,
  });
}
