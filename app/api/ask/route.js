import { NextResponse } from "next/server";
import { sendQuickQuestionNotification } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

// Backs the lightweight "Ask a question" widget (components/AskQuestionWidget.jsx)
// — no submission storage, just an email notification, same as Get Started's
// but for a much smaller ask.
export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const { name, email, question } = payload || {};

  if (!name || typeof name !== "string" || !name.trim()) {
    return badRequest("Name is required.");
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return badRequest("A valid email is required.");
  }
  if (!question || typeof question !== "string" || !question.trim()) {
    return badRequest("Question is required.");
  }

  const result = await sendQuickQuestionNotification({
    name: name.trim(),
    email: email.trim(),
    question: question.trim(),
  });

  if (!result.sent) {
    return NextResponse.json(
      { error: "Something went wrong sending your question. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
