import { NextResponse } from "next/server";
import {
  PACKAGES,
  ADD_ONS,
  getAvailablePaymentPlans,
  calculatePricing,
  FOUNDING_SPOTS_REMAINING,
  SITE,
} from "@/lib/content";
import { COMPANY } from "@/lib/company";
import { createSubmission } from "@/lib/submissions";
import { buildPaymentFields, PAYFAST_PROCESS_URL } from "@/lib/payfast";

function siteOrigin(request) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const proto = request.headers.get("x-forwarded-proto") || "https";
  const host = request.headers.get("host");
  return `${proto}://${host}`;
}

function badRequest(message) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return badRequest("Invalid JSON body.");
  }

  const {
    id,
    package: packageId,
    addOns = [],
    paymentPlan,
    business = {},
    contact = {},
    brief = {},
    images = [],
    agreedToLegal,
    foundingOffer = null,
    freeAddOnId = null,
  } = payload || {};

  // --- Server-side validation. Never trust client-calculated pricing or an
  // unchecked consent box that only looked checked in the browser. ---
  if (!id || typeof id !== "string") return badRequest("Missing submission id.");
  if (!PACKAGES.some((p) => p.id === packageId)) return badRequest("Invalid package.");
  if (!Array.isArray(addOns) || addOns.some((a) => !ADD_ONS.some((ao) => ao.id === a))) {
    return badRequest("Invalid add-ons.");
  }
  const availablePlans = getAvailablePaymentPlans(packageId);
  if (!availablePlans.some((p) => p.id === paymentPlan)) {
    return badRequest("Invalid payment plan for this package.");
  }
  if (!business.name) return badRequest("Business name is required.");
  if (!contact.name || !contact.email || !contact.phone) {
    return badRequest("Contact name, email, and phone are required.");
  }
  if (agreedToLegal !== true) {
    return badRequest(
      "You must agree to the Terms & Conditions, Refund Policy, and Privacy Policy."
    );
  }
  if (!Array.isArray(images) || images.length > 10) {
    return badRequest("Invalid images.");
  }
  if (foundingOffer !== null && !["discount", "addon"].includes(foundingOffer)) {
    return badRequest("Invalid founding offer.");
  }
  // Never trust the client on whether the offer is even still available —
  // recheck the same constant the homepage banner and Get Started page read.
  const appliedFoundingOffer = FOUNDING_SPOTS_REMAINING > 0 ? foundingOffer : null;
  const appliedFreeAddOnId = appliedFoundingOffer === "addon" ? freeAddOnId : null;

  const pricing = calculatePricing({
    packageId,
    addOnIds: addOns,
    paymentPlanId: paymentPlan,
    foundingOffer: appliedFoundingOffer,
    freeAddOnId: appliedFreeAddOnId,
  });
  if (!pricing) return badRequest("Could not calculate pricing.");

  try {
    const submission = await createSubmission(id, {
      package: packageId,
      addOns,
      paymentPlan,
      pricing,
      foundingOffer: appliedFoundingOffer
        ? { type: appliedFoundingOffer, freeAddOnId: appliedFreeAddOnId }
        : null,
      business: { name: business.name },
      contact: { name: contact.name, email: contact.email, phone: contact.phone },
      brief: {
        description: brief.description || "",
        pagesNeeded: brief.pagesNeeded || "",
        productsOrServices: brief.productsOrServices || "",
        brandColors: brief.brandColors || "",
      },
      images: images.map((img) => ({
        url: img.url,
        filename: img.filename,
        size: img.size,
        contentType: img.contentType,
      })),
      consent: {
        agreedAt: new Date().toISOString(),
        policyVersion: COMPANY.policyVersion,
        policiesLastUpdated: COMPANY.policiesLastUpdated,
        ip: request.headers.get("x-forwarded-for") || null,
      },
    });

    const origin = siteOrigin(request);
    const pkg = PACKAGES.find((p) => p.id === packageId);

    const paymentFields = buildPaymentFields({
      returnUrl: `${origin}/get-started/success?ref=${submission.id}`,
      cancelUrl: `${origin}/get-started/cancelled?ref=${submission.id}`,
      notifyUrl: `${origin}/api/payfast/notify`,
      nameFirst: contact.name.split(" ")[0] || contact.name,
      nameLast: contact.name.split(" ").slice(1).join(" ") || contact.name,
      email: contact.email,
      cellNumber: contact.phone,
      mPaymentId: submission.id,
      amount: pricing.depositDue,
      itemName: `${SITE.name} — ${pkg.name} deposit`,
      itemDescription: `Deposit for ${pkg.name} (${paymentPlan} payment plan)`,
    });

    return NextResponse.json({
      submissionId: submission.id,
      actionUrl: PAYFAST_PROCESS_URL,
      paymentFields,
    });
  } catch (error) {
    console.error("Failed to create Get Started submission:", error);
    return NextResponse.json(
      { error: "Something went wrong saving your brief. Please try again." },
      { status: 500 }
    );
  }
}
