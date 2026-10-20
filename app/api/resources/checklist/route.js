import { NextResponse } from "next/server";
import { sendChecklistEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";
import { isHoneypotFilled } from "@/lib/honeypot";
import { SITE } from "@/lib/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

// Backs the free "10 things your small business website needs" checklist
// lead magnet (components/ChecklistSignupForm.jsx). Emails the visitor a
// direct link to the page and alerts the studio — the page itself stays
// readable without submitting this form, so this is purely "email me the
// link" convenience plus a lead for the studio.
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const { name, email, company } = payload || {}; // `company` is the honeypot

  if (isHoneypotFilled(company)) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateLimit = checkRateLimit(`checklist:${ip}`, { limit: 5, windowMs: 10 * 60 * 1000 });
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

  const checklistUrl = `${SITE.url}/resources/website-checklist`;

  const result = await sendChecklistEmail({
    name: name.trim(),
    email: email.trim(),
    checklistUrl,
  });

  if (!result.sent) {
    return NextResponse.json(
      { error: "Something went wrong sending your checklist. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
