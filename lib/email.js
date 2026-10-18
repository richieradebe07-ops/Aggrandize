import { Resend } from "resend";
import { SITE, FOUNDER, getPackage, getAddOn } from "./content";
import { buildClientConfirmationEmail, buildOwnerAlertEmail } from "./emailTemplates";

// Requires RESEND_API_KEY. Sign up at resend.com, verify a sending domain
// (aggrandizeweb.co.za is already verified — DKIM/SPF), and set
// RESEND_API_KEY + FROM_EMAIL + NOTIFY_EMAIL in the deployment environment.
// FROM_EMAIL/NOTIFY_EMAIL fall back to Resend's shared test sender and
// SITE.email respectively so local dev without a .env.local doesn't crash —
// production always has the real values set (see .env.example).
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || SITE.email;

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
      to: NOTIFY_EMAIL,
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

// Sent for the /contact "Request a quote" form (components/ContactForm.jsx).
// Two emails go out per submission: a short confirmation to the person who
// submitted it (reply-to NOTIFY_EMAIL, so a reply lands in the studio
// inbox), and a full alert to the studio (reply-to the submitter's own
// address, so replying goes straight back to them). No submission storage —
// this is a notification-only flow, same as /api/ask.
//
// The confirmation email is a nice-to-have, not the point of the form: if
// it fails to send but the owner alert goes through, the lead has still
// reached the studio, so this still reports success overall and just logs
// the client-email failure. If the owner alert itself fails, that's
// reported as a failure — the whole reason this endpoint exists.
export async function sendContactNotification({
  name,
  business,
  packageInterest,
  email,
  phone,
  projectDetails,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — skipping contact notification emails. " +
        "Set it in the deployment environment to enable notifications."
    );
    return { sent: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);

  const ownerEmail = buildOwnerAlertEmail({
    name,
    email,
    phone,
    business,
    packageInterest,
    projectDetails,
    siteName: SITE.name,
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New quote request from ${name}`,
      html: ownerEmail.html,
      text: ownerEmail.text,
    });
  } catch (error) {
    console.error("Failed to send contact owner alert email:", error);
    return { sent: false, reason: "send_failed" };
  }

  const clientEmail = buildClientConfirmationEmail({
    name,
    siteName: SITE.name,
    founderName: FOUNDER.name,
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: NOTIFY_EMAIL,
      subject: `We've received your quote request — ${SITE.name}`,
      html: clientEmail.html,
      text: clientEmail.text,
    });
  } catch (error) {
    // The lead already reached the studio via the owner alert above — a
    // failed confirmation email shouldn't surface as an error to the
    // submitter, just get logged for follow-up.
    console.error("Failed to send contact client confirmation email:", error);
  }

  return { sent: true };
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
      to: NOTIFY_EMAIL,
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
