import { Resend } from "resend";
import { SITE, getPackage, getAddOn } from "./content";

// Requires RESEND_API_KEY. Sign up at resend.com, verify a sending domain
// (or use their shared onboarding@resend.dev sender for testing), and set
// RESEND_API_KEY + RESEND_FROM_EMAIL in the deployment environment.
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

function formatCurrency(amount) {
  const rounded = Math.round(amount);
  return `R${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Sent once a deposit payment is confirmed via PayFast's ITN — never on the
// client-side redirect alone. Idempotency (not sending this twice for the
// same submission) is the caller's responsibility (see the ITN handler).
export async function sendSubmissionNotification(submission, { reviewUrl }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — skipping submission notification email. " +
        "Set it in the deployment environment to enable notifications."
    );
    return { sent: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);
  const pkg = getPackage(submission.package);
  const addOnNames = (submission.addOns || [])
    .map((id) => getAddOn(id)?.name)
    .filter(Boolean);

  const { pricing, business, contact, brief, images, foundingOffer } = submission;

  const foundingOfferLine = foundingOffer
    ? foundingOffer.type === "discount"
      ? "15% off package price"
      : `Free add-on — ${getAddOn(foundingOffer.freeAddOnId)?.name || foundingOffer.freeAddOnId}`
    : null;

  const html = `
    <h2>New Get Started brief — deposit paid</h2>
    <p><strong>Package:</strong> ${pkg?.name || submission.package}</p>
    <p><strong>Add-ons:</strong> ${addOnNames.length ? addOnNames.join(", ") : "None"}</p>
    ${foundingOfferLine ? `<p><strong>Founding Client offer:</strong> ${foundingOfferLine}</p>` : ""}
    <p><strong>Payment plan:</strong> ${submission.paymentPlan}</p>
    <p><strong>Total:</strong> ${formatCurrency(pricing.total)} — <strong>Deposit received:</strong> ${formatCurrency(pricing.depositDue)}</p>
    <hr />
    <h3>Business</h3>
    <p>${business.name}</p>
    <h3>Contact</h3>
    <p>${contact.name}<br/>${contact.email}<br/>${contact.phone}</p>
    <h3>Brief</h3>
    <p><strong>Pages needed:</strong> ${brief.pagesNeeded || "—"}</p>
    <p><strong>Products/services:</strong> ${brief.productsOrServices || "—"}</p>
    <p><strong>Brand colors/style:</strong> ${brief.brandColors || "—"}</p>
    <p><strong>Description:</strong><br/>${(brief.description || "—").replace(/\n/g, "<br/>")}</p>
    <h3>Uploaded images (${images?.length || 0})</h3>
    <ul>${(images || []).map((img) => `<li><a href="${img.url}">${img.filename}</a></li>`).join("")}</ul>
    <hr />
    <p><strong>PayFast reference:</strong> ${submission.payment.pfPaymentId}</p>
    <p><a href="${reviewUrl}">View full submission JSON</a></p>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: SITE.email,
      replyTo: contact.email,
      subject: `New paid brief: ${business.name} (${pkg?.name || submission.package})`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Failed to send submission notification email:", error);
    return { sent: false, reason: "send_failed" };
  }
}

// Non-package `package` values the /contact form's <select> can send —
// real package ids are resolved via getPackage instead.
const CONTACT_PACKAGE_LABELS = {
  maintenance: "Maintenance plan",
  other: "Something else",
};

function contactPackageLabel(packageId) {
  if (!packageId) return "Not sure yet";
  return getPackage(packageId)?.name || CONTACT_PACKAGE_LABELS[packageId] || packageId;
}

// Sent for the /contact form (components/ContactForm.jsx) — no submission
// storage, just an email notification, same pipeline as the other forms
// (Resend to the studio inbox, reply-to the visitor's own address so it can
// be answered directly).
export async function sendContactNotification({ name, business, packageId, email, phone, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — skipping contact notification email. " +
        "Set it in the deployment environment to enable notifications."
    );
    return { sent: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New enquiry from the contact form</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    ${phone ? `<p><strong>Phone/WhatsApp:</strong> ${phone}</p>` : ""}
    ${business ? `<p><strong>Business:</strong> ${business}</p>` : ""}
    <p><strong>Package interested in:</strong> ${contactPackageLabel(packageId)}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: SITE.email,
      replyTo: email,
      subject: `New contact form enquiry from ${name}`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Failed to send contact notification email:", error);
    return { sent: false, reason: "send_failed" };
  }
}

// Sent for the lightweight "Ask a question" widget — a much smaller ask
// than the Get Started brief, but the same notification pipeline (Resend to
// the studio inbox, reply-to the visitor's own address).
export async function sendQuickQuestionNotification({ name, email, question }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — skipping quick-question notification email. " +
        "Set it in the deployment environment to enable notifications."
    );
    return { sent: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New question from the website</h2>
    <p><strong>From:</strong> ${name} (${email})</p>
    <p><strong>Question:</strong></p>
    <p>${question.replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: SITE.email,
      replyTo: email,
      subject: `Website question from ${name}`,
      html,
    });
    return { sent: true };
  } catch (error) {
    console.error("Failed to send quick-question notification email:", error);
    return { sent: false, reason: "send_failed" };
  }
}
