import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";
import { PACKAGE_INTEREST_OPTIONS } from "@/lib/content";
import { isHoneypotFilled } from "@/lib/honeypot";
import { getDemo } from "@/lib/demos";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_PACKAGE_INTERESTS = new Set(PACKAGE_INTEREST_OPTIONS.map((o) => o.value));
const VALID_REQUEST_TYPES = new Set(["quote", "mockup"]);

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

// Backs the /contact "Request a quote" form (components/ContactForm.jsx) —
// no submission storage, just two email notifications (see
// lib/email.js's sendContactNotification): a confirmation to the submitter
// and an alert to the studio inbox.
//
// This intentionally stops at "request received" — no payment is taken
// here. A later PayFast deposit step (mirroring app/api/get-started/route.js)
// would slot in after the validation below and before the success
// response, without needing to change the shape of this route.
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const {
    name,
    business,
    packageInterest,
    email,
    phone,
    projectDetails,
    requestType,
    consent,
    industry, // optional /industries slug, from ?industry= — see ContactForm.jsx
    company, // honeypot
  } = payload || {};

  // Honeypot: real visitors never see or fill this field (see
  // ContactForm.jsx) — a filled value means a bot. Report success without
  // actually sending anything, so the bot has no signal to adapt on.
  if (isHoneypotFilled(company)) {
    return NextResponse.json({ ok: true });
  }

  // Basic rate limiting per IP — see lib/rateLimit.js for what this does
  // and doesn't guarantee on serverless.
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimit = checkRateLimit(`contact:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
    );
  }

  if (!name || typeof name !== "string" || !name.trim()) {
    return badRequest("Name is required.");
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return badRequest("A valid email is required.");
  }
  if (!projectDetails || typeof projectDetails !== "string" || !projectDetails.trim()) {
    return badRequest("Project details are required.");
  }
  if (packageInterest && !VALID_PACKAGE_INTERESTS.has(packageInterest)) {
    return badRequest("Invalid package interest.");
  }
  if (requestType && !VALID_REQUEST_TYPES.has(requestType)) {
    return badRequest("Invalid request type.");
  }
  if (consent !== true) {
    return badRequest("You must agree to the Privacy Policy to submit this form.");
  }

  // An unknown or garbage `industry` value (a stale link, a hand-edited
  // URL) is silently dropped rather than rejected — it's a nice-to-have for
  // lead tracking, never a reason to fail a real submission.
  const industryDemo = typeof industry === "string" ? getDemo(industry) : null;
  const industryName = industryDemo && !industryDemo.externalHref ? industryDemo.name : null;

  const result = await sendContactNotification({
    name: name.trim(),
    business: typeof business === "string" ? business.trim() : "",
    packageInterest: typeof packageInterest === "string" ? packageInterest : "unsure",
    email: email.trim(),
    phone: typeof phone === "string" ? phone.trim() : "",
    projectDetails: projectDetails.trim(),
    requestType: VALID_REQUEST_TYPES.has(requestType) ? requestType : "quote",
    industry: industryName,
    page: request.headers.get("referer") || null,
  });

  if (!result.sent) {
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
