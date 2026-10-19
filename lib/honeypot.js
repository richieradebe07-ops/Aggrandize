// Shared honeypot check — every form on the site (Contact, Get Started,
// /pay, /pay/[token], the free audit, Ask a question) posts a hidden
// "company" field that real visitors never see or fill (see each
// component's off-screen, aria-hidden, tabIndex=-1 input named "company").
// A filled value means a bot blindly filling every field. Pulled into one
// function so the five API routes that check it can't drift from each
// other, and so it's testable without needing to run a full Next route
// (see scripts/test-contact-honeypot.mjs).
export function isHoneypotFilled(value) {
  return typeof value === "string" && value.trim().length > 0;
}
