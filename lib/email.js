import { Resend } from "resend";
import { SITE, FOUNDER, getPackage, getAddOn } from "./content";
import {
  buildClientConfirmationEmail,
  buildOwnerAlertEmail,
  buildAuditOwnerAlertEmail,
  buildAuditConfirmationEmail,
  buildPaymentReceiptEmail,
  buildPaymentAlertEmail,
  buildEftPendingOwnerAlertEmail,
  buildEftPendingClientConfirmationEmail,
  buildChecklistOwnerAlertEmail,
  buildChecklistEmail,
  payTypeLabel,
} from "./emailTemplates";

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

// Sent for a Get Started brief submitted while payments aren't live yet
// (app/api/get-started/route.js's EFT branch, gated on PAYMENTS_ENABLED) —
// no deposit has been paid, so this is a heads-up to send banking details
// manually, not a "paid" notification like sendSubmissionNotification above.
// Same dual-send pattern as sendContactNotification: owner alert must
// succeed for this to report sent:true, client confirmation is best-effort.
export async function sendEftPendingNotification({
  businessName,
  contactName,
  email,
  phone,
  packageName,
  depositDue,
  total,
  reviewUrl,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — skipping EFT-pending notification emails. " +
        "Set it in the deployment environment to enable notifications."
    );
    return { sent: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);

  const ownerEmail = buildEftPendingOwnerAlertEmail({
    businessName,
    contactName,
    email,
    phone,
    packageName,
    depositDue,
    total,
    reviewUrl,
    siteName: SITE.name,
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New brief awaiting EFT: ${businessName} (${packageName})`,
      html: ownerEmail.html,
      text: ownerEmail.text,
    });
  } catch (error) {
    console.error("Failed to send EFT-pending owner alert email:", error);
    return { sent: false, reason: "send_failed" };
  }

  const clientEmail = buildEftPendingClientConfirmationEmail({
    name: contactName,
    siteName: SITE.name,
    founderName: FOUNDER.name,
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: NOTIFY_EMAIL,
      subject: `We've received your brief — ${SITE.name}`,
      html: clientEmail.html,
      text: clientEmail.text,
    });
  } catch (error) {
    // The brief already reached the studio via the owner alert above — a
    // failed confirmation email shouldn't surface as an error to the
    // client, just get logged for follow-up.
    console.error("Failed to send EFT-pending client confirmation email:", error);
  }

  return { sent: true };
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
  requestType = "quote",
  industry = null,
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
  const isMockup = requestType === "mockup";

  const ownerEmail = buildOwnerAlertEmail({
    name,
    email,
    phone,
    business,
    packageInterest,
    projectDetails,
    requestType,
    industry,
    siteName: SITE.name,
  });

  // Industry goes in the owner alert's subject too (never the client
  // confirmation below) so it's visible at a glance in the studio inbox,
  // without opening every email to see which /industries page a lead came
  // from.
  const industrySuffix = industry ? ` — ${industry}` : "";

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: isMockup
        ? `New free mockup request from ${name}${industrySuffix}`
        : `New quote request from ${name}${industrySuffix}`,
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
    requestType,
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: NOTIFY_EMAIL,
      subject: isMockup
        ? `We've received your free mockup request — ${SITE.name}`
        : `We've received your quote request — ${SITE.name}`,
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

// Sent for the free website audit form (components/WebsiteAuditForm.jsx /
// app/api/audit/route.js). Same owner-alert-first, confirmation-second
// pattern as sendContactNotification — a failed confirmation email doesn't
// fail the request, since the lead already reached the studio.
export async function sendAuditNotification({ name, email, business, websiteUrl }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — skipping audit request emails. " +
        "Set it in the deployment environment to enable notifications."
    );
    return { sent: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);

  const ownerEmail = buildAuditOwnerAlertEmail({ name, email, business, websiteUrl, siteName: SITE.name });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New free audit request from ${name}`,
      html: ownerEmail.html,
      text: ownerEmail.text,
    });
  } catch (error) {
    console.error("Failed to send audit owner alert email:", error);
    return { sent: false, reason: "send_failed" };
  }

  const clientEmail = buildAuditConfirmationEmail({ name, siteName: SITE.name, founderName: FOUNDER.name });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: NOTIFY_EMAIL,
      subject: `We've received your audit request — ${SITE.name}`,
      html: clientEmail.html,
      text: clientEmail.text,
    });
  } catch (error) {
    console.error("Failed to send audit client confirmation email:", error);
  }

  return { sent: true };
}

// Sent once a /pay deposit or final-balance payment is confirmed via
// PayFast's ITN (app/api/payfast/notify's handlePayItn) — same
// never-trust-the-redirect rule as sendSubmissionNotification, just for
// the stateless /pay flow instead of a stored Get Started submission.
// Owner alert first (the one that must succeed for this to report
// `sent: true` — the caller only marks the ITN "processed" on that), then
// a best-effort client receipt.
export async function sendPaymentNotification({
  name,
  email,
  packageName,
  paymentType,
  amount,
  reference,
  pfPaymentId,
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — skipping payment notification emails. " +
        "Set it in the deployment environment to enable notifications."
    );
    return { sent: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);
  const typeLabel = payTypeLabel(paymentType);
  const typeLabelCapitalized = typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1);

  const ownerEmail = buildPaymentAlertEmail({
    name,
    email,
    packageName,
    paymentType,
    amount,
    reference,
    pfPaymentId,
    siteName: SITE.name,
  });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email || NOTIFY_EMAIL,
      subject: `Payment received: ${typeLabelCapitalized} — ${packageName}`,
      html: ownerEmail.html,
      text: ownerEmail.text,
    });
  } catch (error) {
    console.error("Failed to send payment owner alert email:", error);
    return { sent: false, reason: "send_failed" };
  }

  if (email) {
    const clientEmail = buildPaymentReceiptEmail({
      name,
      siteName: SITE.name,
      founderName: FOUNDER.name,
      packageName,
      paymentType,
      amount,
      reference,
    });

    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        replyTo: NOTIFY_EMAIL,
        subject: `Payment receipt — ${SITE.name}`,
        html: clientEmail.html,
        text: clientEmail.text,
      });
    } catch (error) {
      // The payment is already recorded via the owner alert above — a
      // failed receipt email shouldn't surface as an error, just get
      // logged for follow-up.
      console.error("Failed to send payment client receipt email:", error);
    }
  }

  return { sent: true };
}

// Sent for the free website checklist lead magnet
// (components/ChecklistSignupForm.jsx / app/api/resources/checklist/route.js).
// Same owner-alert-first, confirmation-second pattern as
// sendAuditNotification — the owner alert is the one that must succeed;
// a failed visitor email just gets logged, since they can still read the
// checklist on the page they're already on.
export async function sendChecklistEmail({ name, email, checklistUrl }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set — skipping website checklist emails. " +
        "Set it in the deployment environment to enable notifications."
    );
    return { sent: false, reason: "missing_api_key" };
  }

  const resend = new Resend(apiKey);

  const ownerEmail = buildChecklistOwnerAlertEmail({ name, email, siteName: SITE.name });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      replyTo: email,
      subject: `New website checklist request from ${name}`,
      html: ownerEmail.html,
      text: ownerEmail.text,
    });
  } catch (error) {
    console.error("Failed to send checklist owner alert email:", error);
    return { sent: false, reason: "send_failed" };
  }

  const visitorEmail = buildChecklistEmail({ name, siteName: SITE.name, founderName: FOUNDER.name, checklistUrl });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      replyTo: NOTIFY_EMAIL,
      subject: `Your checklist — ${SITE.name}`,
      html: visitorEmail.html,
      text: visitorEmail.text,
    });
  } catch (error) {
    console.error("Failed to send checklist visitor email:", error);
  }

  return { sent: true };
}
