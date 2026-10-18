import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

// Backs the /contact page (components/ContactForm.jsx) — no submission
// storage, just an email notification, same pattern as /api/ask.
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const { name, business, package: packageId, email, phone, message, company } = payload || {};

  // Honeypot: real visitors never see or fill this field (see
  // ContactForm.jsx) — a filled value means a bot. Report success without
  // actually sending anything, so the bot has no signal to adapt on.
  if (typeof company === "string" && company.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!name || typeof name !== "string" || !name.trim()) {
    return badRequest("Name is required.");
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return badRequest("A valid email is required.");
  }
  if (!message || typeof message !== "string" || !message.trim()) {
    return badRequest("Message is required.");
  }

  const result = await sendContactNotification({
    name: name.trim(),
    business: typeof business === "string" ? business.trim() : "",
    packageId: typeof packageId === "string" ? packageId : "",
    email: email.trim(),
    phone: typeof phone === "string" ? phone.trim() : "",
    message: message.trim(),
  });

  if (!result.sent) {
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
