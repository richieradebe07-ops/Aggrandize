// Brand-styled HTML (+ plain-text fallback) for the quote-request emails
// sent by lib/email.js. Kept separate from the sending logic so the
// templates can be read/edited without touching the Resend calls.
//
// Email clients strip <style> blocks unpredictably and don't load web
// fonts, so every rule here is inlined and the font stacks fall back to
// system serif/sans — same idea as lib/ogImageContent.jsx's satori fallback.

import { whatsappLink, PACKAGE_INTEREST_OPTIONS } from "./content";

const INK = "#1B1A17";
const BRASS = "#A9823C";
const IVORY = "#FAF8F3";
const MUTED = "#6B6A64";
const BORDER = "#E7E2D6";

const SERIF_STACK = "Georgia, 'Times New Roman', serif";
const SANS_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

// Every piece of user-submitted text is interpolated into these templates'
// HTML, so it must be escaped first — otherwise a name or message field
// containing `<`/`&`/etc. could break the markup or inject content into an
// email rendered by a real mail client.
export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(escaped) {
  return escaped.replace(/\n/g, "<br />");
}

function formatRand(amount) {
  const rounded = Math.round(amount);
  return `R${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// Shared outer shell: ivory background, a single centered card, brass
// accent rule under the heading. `bodyHtml` is trusted — callers must have
// already escaped any user input going into it.
function shell({ heading, bodyHtml, footerText }) {
  return `
<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background-color:${IVORY};font-family:${SANS_STACK};">
    <div style="max-width:560px;margin:0 auto;background-color:#ffffff;border:1px solid ${BORDER};border-radius:16px;overflow:hidden;">
      <div style="padding:32px 32px 24px;">
        <h1 style="margin:0 0 4px;font-family:${SERIF_STACK};font-size:22px;font-weight:600;color:${INK};">
          ${heading}
        </h1>
        <div style="width:48px;height:2px;background-color:${BRASS};margin:12px 0 20px;"></div>
        ${bodyHtml}
      </div>
      <div style="padding:16px 32px;background-color:${IVORY};border-top:1px solid ${BORDER};">
        <p style="margin:0;font-size:12px;line-height:1.6;color:${MUTED};">${footerText}</p>
      </div>
    </div>
  </body>
</html>`;
}

// Stacked (label above value) rather than a two-column table — a fixed-width
// label column clips long values (emails, long names) on narrow mobile email
// clients, which don't reflow table cells the way a browser would. The
// explicit width/max-width + word-break/overflow-wrap pair is belt-and-
// braces for long unbroken strings (URLs, long emails) on 360px Gmail.
function detailRow(label, value) {
  if (!value) return "";
  return `
    <tr>
      <td style="padding:6px 0;width:100%;max-width:100%;">
        <div style="font-size:12px;color:${MUTED};text-transform:uppercase;letter-spacing:0.02em;">${label}</div>
        <div style="margin-top:2px;font-size:14px;color:${INK};max-width:100%;word-break:break-word;overflow-wrap:anywhere;">${value}</div>
      </td>
    </tr>`;
}

// Derived from the same options array the form itself renders (lib/content.js)
// rather than a hand-maintained duplicate — a label couldn't silently go
// stale here the way "ecommerce" once did (it fell through to "Not sure"
// until this was fixed).
const PACKAGE_INTEREST_LABELS = Object.fromEntries(
  PACKAGE_INTEREST_OPTIONS.map((o) => [o.value, o.label])
);

export function packageInterestLabel(value) {
  return PACKAGE_INTEREST_LABELS[value] || "Not sure";
}

// Sent to the person who submitted the quote request.
export function buildClientConfirmationEmail({ name, siteName, founderName, requestType = "quote" }) {
  const firstName = escapeHtml((name || "").trim().split(" ")[0] || "there");
  const isMockup = requestType === "mockup";
  const requestNoun = isMockup ? "free mockup request" : "quote request";
  const whatsappUrl = whatsappLink(
    "Hi Aggrandize Web Co, I just sent a request on your website and have a question."
  );

  const html = shell({
    heading: `Thanks, ${firstName} — we've got your request`,
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        Thanks for reaching out to ${escapeHtml(siteName)} We've received your ${requestNoun}
        and will reply within 24 hours with ${isMockup ? "your free mockup" : "next steps"}.
      </p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        If anything's urgent in the meantime, just reply to this email — it
        comes straight to our inbox.
      </p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:${INK};">
        Warmly,<br />
        ${escapeHtml(founderName)}<br />
        <span style="color:${MUTED};">${escapeHtml(siteName)}</span>
      </p>
      <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:${MUTED};">
        Need to add something? Message us on WhatsApp:
        <a href="${whatsappUrl}" style="color:${BRASS};">${whatsappUrl}</a>
      </p>
    `,
    footerText: `You're receiving this because you submitted a ${requestNoun} on our website.`,
  });

  const text = `Thanks, ${firstName} — we've got your request

Thanks for reaching out to ${siteName} We've received your ${requestNoun} and will reply within 24 hours with ${isMockup ? "your free mockup" : "next steps"}.

If anything's urgent in the meantime, just reply to this email — it comes straight to our inbox.

Warmly,
${founderName}
${siteName}

Need to add something? Message us on WhatsApp: ${whatsappUrl}`;

  return { html, text };
}

// Sent to the studio inbox (NOTIFY_EMAIL) for every quote or mockup request.
export function buildOwnerAlertEmail({
  name,
  email,
  phone,
  business,
  packageInterest,
  projectDetails,
  requestType = "quote",
  industry = null,
  siteName,
}) {
  const isMockup = requestType === "mockup";
  const heading = isMockup ? "New free mockup request" : "New quote request";

  const rows = [
    detailRow("Request type", isMockup ? "Free mockup" : "Quote"),
    detailRow("Name", escapeHtml(name)),
    detailRow("Email", escapeHtml(email)),
    detailRow("Phone / WhatsApp", phone ? escapeHtml(phone) : ""),
    detailRow("Business", business ? escapeHtml(business) : ""),
    detailRow("Package interest", escapeHtml(packageInterestLabel(packageInterest))),
    // Which /industries demo a lead arrived via, if any — see lib/demos.js
    // and ContactForm.jsx's `initialIndustry` prop. Owner alert only, never
    // the client confirmation.
    detailRow("Industry", industry ? escapeHtml(industry) : ""),
  ]
    .filter(Boolean)
    .join("");

  const html = shell({
    heading,
    bodyHtml: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;margin-bottom:18px;">
        ${rows}
      </table>
      <p style="margin:0 0 6px;font-size:13px;color:${MUTED};">Project details</p>
      <p style="margin:0;padding:12px 14px;background-color:${IVORY};border-radius:10px;font-size:14px;line-height:1.6;color:${INK};white-space:pre-wrap;">${nl2br(
        escapeHtml(projectDetails)
      )}</p>
    `,
    footerText: `Reply to this email to respond directly to ${escapeHtml(name)} at ${escapeHtml(
      email
    )}. Sent by the ${isMockup ? "free mockup" : "quote request"} form on ${escapeHtml(siteName)}`,
  });

  const text = `${heading}

Request type: ${isMockup ? "Free mockup" : "Quote"}
Name: ${name}
Email: ${email}
${phone ? `Phone / WhatsApp: ${phone}\n` : ""}${business ? `Business: ${business}\n` : ""}Package interest: ${packageInterestLabel(
    packageInterest
  )}
${industry ? `Industry: ${industry}\n` : ""}
Project details:
${projectDetails}

Reply to this email to respond directly to ${name}.`;

  return { html, text };
}

// Sent to the studio inbox for a free website audit request
// (components/WebsiteAuditForm.jsx / app/api/audit/route.js).
export function buildAuditOwnerAlertEmail({ name, email, business, websiteUrl, siteName }) {
  const rows = [
    detailRow("Name", escapeHtml(name)),
    detailRow("Email", escapeHtml(email)),
    detailRow("Business", business ? escapeHtml(business) : ""),
    detailRow("Website to audit", escapeHtml(websiteUrl)),
  ]
    .filter(Boolean)
    .join("");

  const html = shell({
    heading: "New free audit request",
    bodyHtml: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;">
        ${rows}
      </table>
    `,
    footerText: `Reply to this email to respond directly to ${escapeHtml(name)} at ${escapeHtml(
      email
    )}. Sent by the free website audit form on ${escapeHtml(siteName)}`,
  });

  const text = `New free audit request

Name: ${name}
Email: ${email}
${business ? `Business: ${business}\n` : ""}Website to audit: ${websiteUrl}

Reply to this email to respond directly to ${name}.`;

  return { html, text };
}

// Sent to the person who requested a free audit. Deliberately does NOT
// promise or imply any automated score — a human reviews the site and
// sends a real report, within the window stated here.
export function buildAuditConfirmationEmail({ name, siteName, founderName }) {
  const firstName = escapeHtml((name || "").trim().split(" ")[0] || "there");

  const html = shell({
    heading: `Thanks, ${firstName} — your audit request is in`,
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        Thanks for requesting a free website audit from ${escapeHtml(siteName)} We'll take a
        look at your site and send you a short, honest report within 48 hours.
      </p>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        This isn't an automated score — one of us actually reviews your site and writes up
        what we find.
      </p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:${INK};">
        Warmly,<br />
        ${escapeHtml(founderName)}<br />
        <span style="color:${MUTED};">${escapeHtml(siteName)}</span>
      </p>
    `,
    footerText: "You're receiving this because you requested a free website audit on our website.",
  });

  const text = `Thanks, ${firstName} — your audit request is in

Thanks for requesting a free website audit from ${siteName} We'll take a look at your site and send you a short, honest report within 48 hours.

This isn't an automated score — one of us actually reviews your site and writes up what we find.

Warmly,
${founderName}
${siteName}`;

  return { html, text };
}

// Covers both /pay (plan-based deposit/full/balance) and /pay/[token]
// (a one-off custom-quote link, paymentType "custom") so one pair of
// email templates serves every payment this site takes.
const PAY_TYPE_LABELS = {
  deposit: "deposit",
  full: "payment in full",
  balance: "final balance",
  custom: "payment",
};

export function payTypeLabel(paymentType) {
  return PAY_TYPE_LABELS[paymentType] || "payment";
}

// Sent to the person who paid, once the /pay flow's ITN (app/api/payfast/
// notify) verifies a COMPLETE payment. Never sent on the browser redirect
// alone — only after server-side signature + validate() + amount checks
// all pass.
export function buildPaymentReceiptEmail({
  name,
  siteName,
  founderName,
  packageName,
  paymentType,
  amount,
  reference,
}) {
  const firstName = escapeHtml((name || "").trim().split(" ")[0] || "there");
  const typeLabel = payTypeLabel(paymentType);
  const whatsappUrl = whatsappLink(
    "Hi Aggrandize Web Co, I just made a payment on your website and have a question."
  );
  const dateStr = new Date().toLocaleDateString("en-ZA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const rows = [
    detailRow("Plan", escapeHtml(packageName)),
    detailRow("Payment type", escapeHtml(typeLabel)),
    detailRow("Amount", formatRand(amount)),
    detailRow("Date", dateStr),
    detailRow("Reference", reference ? escapeHtml(reference) : ""),
  ]
    .filter(Boolean)
    .join("");

  const html = shell({
    heading: `Thanks, ${firstName} — payment received`,
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        Thank you — we've received your ${typeLabel} payment for the ${escapeHtml(
      packageName
    )} plan.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;margin:18px 0;">
        ${rows}
      </table>
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        ${
          paymentType === "balance"
            ? "Your site is being finalised for launch."
            : "We'll be in touch shortly."
        }
      </p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:${INK};">
        Thank you,<br />
        ${escapeHtml(founderName)}<br />
        <span style="color:${MUTED};">${escapeHtml(siteName)}</span>
      </p>
      <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:${MUTED};">
        Need to add something? Message us on WhatsApp:
        <a href="${whatsappUrl}" style="color:${BRASS};">${whatsappUrl}</a>
      </p>
    `,
    footerText:
      "This is your receipt for a payment made on our website, processed securely by PayFast.",
  });

  const text = `Thanks, ${firstName} — payment received

Thank you — we've received your ${typeLabel} payment for the ${packageName} plan.

Plan: ${packageName}
Payment type: ${typeLabel}
Amount: ${formatRand(amount)}
Date: ${dateStr}
${reference ? `Reference: ${reference}\n` : ""}
${paymentType === "balance" ? "Your site is being finalised for launch." : "We'll be in touch shortly."}

Thank you,
${founderName}
${siteName}

Need to add something? Message us on WhatsApp: ${whatsappUrl}`;

  return { html, text };
}

// Sent to the studio inbox (NOTIFY_EMAIL) for every confirmed /pay payment.
export function buildPaymentAlertEmail({
  name,
  email,
  packageName,
  paymentType,
  amount,
  reference,
  pfPaymentId,
  siteName,
}) {
  const typeLabel = payTypeLabel(paymentType);
  const typeLabelCapitalized = typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1);

  const rows = [
    detailRow("Name", name ? escapeHtml(name) : ""),
    detailRow("Email", email ? escapeHtml(email) : ""),
    detailRow("Plan", escapeHtml(packageName)),
    detailRow("Payment type", escapeHtml(typeLabel)),
    detailRow("Amount", formatRand(amount)),
    detailRow("Reference", reference ? escapeHtml(reference) : ""),
    detailRow("PayFast payment ID", pfPaymentId ? escapeHtml(pfPaymentId) : ""),
  ]
    .filter(Boolean)
    .join("");

  const html = shell({
    heading: `Payment received: ${typeLabelCapitalized}`,
    bodyHtml: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;">
        ${rows}
      </table>
    `,
    footerText: `Verified via PayFast's ITN on ${escapeHtml(siteName)} — reply to this email to respond directly to ${escapeHtml(
      name || "the client"
    )}${email ? ` at ${escapeHtml(email)}` : ""}.`,
  });

  const text = `Payment received: ${typeLabelCapitalized}

Name: ${name || "—"}
Email: ${email || "—"}
Plan: ${packageName}
Payment type: ${typeLabel}
Amount: ${formatRand(amount)}
${reference ? `Reference: ${reference}\n` : ""}${pfPaymentId ? `PayFast payment ID: ${pfPaymentId}\n` : ""}
Verified via PayFast's ITN on ${siteName}.`;

  return { html, text };
}

// Sent for a Get Started brief submitted while NEXT_PUBLIC_PAYMENTS_ENABLED
// is false (PayFast verification pending) — app/api/get-started/route.js's
// EFT branch. No payment has happened yet here (unlike
// sendSubmissionNotification above, which only fires once PayFast's ITN
// confirms a deposit) — this just alerts the studio that a brief is
// waiting on manually-sent EFT banking details.
export function buildEftPendingOwnerAlertEmail({
  businessName,
  contactName,
  email,
  phone,
  packageName,
  depositDue,
  total,
  reviewUrl,
  siteName,
}) {
  const rows = [
    detailRow("Business", escapeHtml(businessName)),
    detailRow("Contact", escapeHtml(contactName)),
    detailRow("Email", escapeHtml(email)),
    detailRow("Phone", escapeHtml(phone)),
    detailRow("Package", escapeHtml(packageName)),
    detailRow("Deposit due (EFT)", formatRand(depositDue)),
    detailRow("Total", formatRand(total)),
  ]
    .filter(Boolean)
    .join("");

  const html = shell({
    heading: "New Get Started brief — awaiting EFT",
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        Online payments aren't live yet, so no deposit has been paid — send this client our
        banking details by email to secure the spot.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;margin-bottom:18px;">
        ${rows}
      </table>
      <p style="margin:0;"><a href="${reviewUrl}" style="color:${BRASS};">View full submission JSON</a></p>
    `,
    footerText: `Reply to this email to respond directly to ${escapeHtml(contactName)} at ${escapeHtml(
      email
    )}. Sent by the Get Started form on ${escapeHtml(siteName)}`,
  });

  const text = `New Get Started brief — awaiting EFT

Online payments aren't live yet, so no deposit has been paid — send this client our banking details by email to secure the spot.

Business: ${businessName}
Contact: ${contactName}
Email: ${email}
Phone: ${phone}
Package: ${packageName}
Deposit due (EFT): ${formatRand(depositDue)}
Total: ${formatRand(total)}

View full submission JSON: ${reviewUrl}

Reply to this email to respond directly to ${contactName}.`;

  return { html, text };
}

// Sent to the client who submitted the brief — a holding confirmation only.
// It deliberately never includes real banking details (see
// PaymentsComingSoon.jsx's comment on why those are only ever sent by email
// per client, never published on the site).
export function buildEftPendingClientConfirmationEmail({ name, siteName, founderName }) {
  const firstName = escapeHtml((name || "").trim().split(" ")[0] || "there");
  const whatsappUrl = whatsappLink(
    "Hi Aggrandize Web Co, I just sent my brief on your website and have a question."
  );

  const html = shell({
    heading: `Thanks, ${firstName} — we've got your brief`,
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        Thanks for sending through your brief for ${escapeHtml(siteName)} We'll email you our
        banking details (EFT) shortly so you can secure your spot — work begins once the
        deposit has cleared.
      </p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:${INK};">
        Warmly,<br />
        ${escapeHtml(founderName)}<br />
        <span style="color:${MUTED};">${escapeHtml(siteName)}</span>
      </p>
      <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:${MUTED};">
        Need to add something? Message us on WhatsApp:
        <a href="${whatsappUrl}" style="color:${BRASS};">${whatsappUrl}</a>
      </p>
    `,
    footerText: "You're receiving this because you submitted a Get Started brief on our website.",
  });

  const text = `Thanks, ${firstName} — we've got your brief

Thanks for sending through your brief for ${siteName} We'll email you our banking details (EFT) shortly so you can secure your spot — work begins once the deposit has cleared.

Warmly,
${founderName}
${siteName}

Need to add something? Message us on WhatsApp: ${whatsappUrl}`;

  return { html, text };
}

// Sent to the studio when someone requests the free website checklist
// (components/ChecklistSignupForm.jsx / app/api/resources/checklist/route.js).
export function buildChecklistOwnerAlertEmail({ name, email, siteName }) {
  const rows = [detailRow("Name", escapeHtml(name)), detailRow("Email", escapeHtml(email))]
    .filter(Boolean)
    .join("");

  const html = shell({
    heading: "New website checklist request",
    bodyHtml: `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;table-layout:fixed;">
        ${rows}
      </table>
    `,
    footerText: `Reply to this email to respond directly to ${escapeHtml(name)} at ${escapeHtml(
      email
    )}. Sent by the "10 things your website needs" checklist form on ${escapeHtml(siteName)}`,
  });

  const text = `New website checklist request

Name: ${name}
Email: ${email}

Reply to this email to respond directly to ${name}.`;

  return { html, text };
}

// Sent to the visitor who requested the checklist — carries the direct
// link so it's useful even if they never reopen the original page.
export function buildChecklistEmail({ name, siteName, founderName, checklistUrl }) {
  const firstName = escapeHtml((name || "").trim().split(" ")[0] || "there");

  const html = shell({
    heading: `Here's your checklist, ${firstName}`,
    bodyHtml: `
      <p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK};">
        Thanks for requesting &ldquo;10 Things Your Small Business Website Needs&rdquo; from
        ${escapeHtml(siteName)} Here's your link:
      </p>
      <p style="margin:0 0 20px;">
        <a
          href="${checklistUrl}"
          style="display:inline-block;padding:12px 24px;background-color:${BRASS};color:#ffffff;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;"
        >
          Read the checklist
        </a>
      </p>
      <p style="margin:0 0 14px;font-size:13px;line-height:1.6;color:${MUTED};">
        Or copy this link: <a href="${checklistUrl}" style="color:${BRASS};">${checklistUrl}</a>
      </p>
      <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:${INK};">
        Warmly,<br />
        ${escapeHtml(founderName)}<br />
        <span style="color:${MUTED};">${escapeHtml(siteName)}</span>
      </p>
    `,
    footerText:
      "You're receiving this because you requested this checklist on our website. We won't add you to any other mailing list.",
  });

  const text = `Here's your checklist, ${firstName}

Thanks for requesting "10 Things Your Small Business Website Needs" from ${siteName} Here's your link:

${checklistUrl}

Warmly,
${founderName}
${siteName}

You're receiving this because you requested this checklist on our website. We won't add you to any other mailing list.`;

  return { html, text };
}
