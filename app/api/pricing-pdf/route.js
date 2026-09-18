import PDFDocument from "pdfkit";
import { PACKAGES, ADD_ONS, MAINTENANCE_PLANS, MAINTENANCE_NOTE, SITE } from "@/lib/content";

// Requires Node (pdfkit isn't edge-compatible).
export const runtime = "nodejs";

const INK = "#1B1A17";
const BRASS = "#A9823C";
const MUTED = "#6B6A64";

// Generated on request, straight from lib/content.js — the same source the
// live Services & Pricing page reads from — so this can never drift out of
// sync with a pricing change. Deliberately excludes the Founding Client
// offer: this is meant to be forwarded as a standing reference, and that
// offer is temporary/limited.
export async function GET() {
  const doc = new PDFDocument({ size: "A4", margin: 56 });
  const chunks = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const finished = new Promise((resolve, reject) => {
    doc.on("end", resolve);
    doc.on("error", reject);
  });

  doc.fillColor(INK).font("Helvetica-Bold").fontSize(22).text(SITE.name);
  doc.fillColor(BRASS).font("Helvetica").fontSize(12).text("Services & Pricing");
  doc.moveDown(1.2);

  doc.fillColor(INK).font("Helvetica-Bold").fontSize(15).text("Packages");
  doc.moveDown(0.4);
  PACKAGES.forEach((pkg) => {
    doc
      .fillColor(INK)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(`${pkg.name} — ${pkg.price} (${pkg.priceNote})`);
    doc.fillColor(MUTED).font("Helvetica").fontSize(10).text(pkg.description);
    doc.moveDown(0.15);
    pkg.features.forEach((feature) => {
      doc.fillColor(INK).font("Helvetica").fontSize(10).text(`•  ${feature}`, { indent: 12 });
    });
    doc.moveDown(0.6);
  });

  doc.moveDown(0.4);
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(15).text("Add-ons");
  doc.moveDown(0.3);
  ADD_ONS.forEach((addOn) => {
    doc.fillColor(INK).font("Helvetica").fontSize(10.5).text(`${addOn.name} — ${addOn.price}`);
  });

  doc.moveDown(0.8);
  doc.fillColor(INK).font("Helvetica-Bold").fontSize(15).text("Maintenance & Updates");
  doc.moveDown(0.3);
  MAINTENANCE_PLANS.forEach((plan) => {
    doc
      .fillColor(INK)
      .font("Helvetica-Bold")
      .fontSize(12)
      .text(`${plan.name} — ${plan.price}${plan.period}`);
    plan.features.forEach((feature) => {
      doc.fillColor(INK).font("Helvetica").fontSize(10).text(`•  ${feature}`, { indent: 12 });
    });
    doc.moveDown(0.5);
  });
  doc.fillColor(MUTED).font("Helvetica-Oblique").fontSize(9.5).text(MAINTENANCE_NOTE);

  doc.moveDown(1.5);
  doc
    .fillColor(MUTED)
    .font("Helvetica")
    .fontSize(9)
    .text(`${SITE.email}   •   ${SITE.whatsappDisplay}   •   ${SITE.location}`);

  doc.end();
  await finished;
  const pdfBuffer = Buffer.concat(chunks);

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="aggrandize-web-co-pricing.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
