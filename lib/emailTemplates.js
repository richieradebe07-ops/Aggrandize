// Brand-styled HTML (+ plain-text fallback) for the quote-request emails
// sent by lib/email.js. Kept separate from the sending logic so the
// templates can be read/edited without touching the Resend calls.
//
// Email clients strip <style> blocks unpredictably and don't load web
// fonts, so every rule here is inlined and the font stacks fall back to
// system serif/sans — same idea as lib/ogImageContent.jsx's satori fallback.

import { whatsappLink } from "./content";

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

const PACKAGE_INTEREST_LABELS = {
  starter: "Starter",
  business: "Business",
  custom: "Custom",
  unsure: "Not sure",
};

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
