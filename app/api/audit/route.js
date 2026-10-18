import { NextResponse } from "next/server";
import { sendAuditNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function normalizeUrl(input) {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withScheme).toString();
  } catch {
    return null;
  }
}

// Backs the free website audit form (components/WebsiteAuditForm.jsx) —
// no automated scoring here or anywhere downstream: this just emails the
// request to the studio and confirms to the visitor that a human will
// send a real report within 48 hours.
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const { name, email, business, url, company } = payload || {}; // `company` is the honeypot

  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimit = checkRateLimit(`audit:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
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
  if (!url || typeof url !== "string" || !url.trim()) {
    return badRequest("A website URL is required.");
  }
  const websiteUrl = normalizeUrl(url);
  if (!websiteUrl) {
    return badRequest("That doesn't look like a valid website URL.");
  }

  const result = await sendAuditNotification({
    name: name.trim(),
    email: email.trim(),
    business: typeof business === "string" ? business.trim() : "",
    websiteUrl,
  });

  if (!result.sent) {
    return NextResponse.json(
      { error: "Something went wrong sending your request. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
