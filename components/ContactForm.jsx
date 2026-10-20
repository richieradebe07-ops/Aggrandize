"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import Spinner from "./Spinner";
import WhatsAppButton from "./WhatsAppButton";
import { PACKAGE_INTEREST_OPTIONS, SITE } from "@/lib/content";
import { getDemo } from "@/lib/demos";

// Posts to /api/contact, which emails both the submitter (a short
// confirmation) and the studio inbox (a full alert) — no submission
// storage, just notifications, same pattern as the "Ask a question" widget.
//
// `requestType` ("quote" | "mockup") is set by the caller, not the visitor —
// the Free Mockup CTA (components/FreeMockupOffer.jsx) renders this same
// form with requestType="mockup" so the owner alert reads differently
// without needing a second form or route.
export default function ContactForm({
  initialPackage = "",
  initialIndustry = "",
  initialMessage = "",
  requestType = "quote",
}) {
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const validInitialPackage = PACKAGE_INTEREST_OPTIONS.some((o) => o.value === initialPackage)
    ? initialPackage
    : "unsure";
  // Only known /industries slugs are kept — an industry name never surfaces
  // in the UI, but it's carried through as a hidden field so the owner
  // alert email can show which industry a lead came from (see
  // lib/emailTemplates.js's buildOwnerAlertEmail). A matching demo also
  // seeds the project details message below, as a starting point to edit.
  const demo = getDemo(initialIndustry);
  const validIndustry = demo && !demo.externalHref ? initialIndustry : "";
  const [values, setValues] = useState({
    name: "",
    business: "",
    packageInterest: validInitialPackage,
    email: "",
    phone: "",
    projectDetails: initialMessage
      ? initialMessage
      : validIndustry
        ? `I'd like a free mockup for my ${demo.name} business, like your demo.`
        : "",
    consent: false,
    // Honeypot: real visitors never see or fill this field (see the
    // visually-hidden input below), so a filled value means a bot. Checked
    // server-side in /api/contact.
    company: "",
  });

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  const canSubmit =
    values.name.trim() && values.email.trim() && values.projectDetails.trim() && values.consent;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, requestType, industry: validIndustry }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brass/30 bg-brass/5 p-8 text-center">
        <h3 className="font-display text-2xl text-ink dark:text-ivory">
          {requestType === "mockup" ? "Mockup request received" : "Request received"}
        </h3>
        <p className="mt-2 text-sm text-ink/65 dark:text-ivory/65">
          Thanks, we&rsquo;ve emailed you a confirmation and will reply within 24 hours.
        </p>
        <div className="mt-5 flex justify-center">
          <WhatsAppButton
            variant="button"
            message="Hi Aggrandize Web Co, I just sent a request on your website and have a question."
            label="Have a quick question? Chat to us on WhatsApp"
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Not a visitor-facing field — set by the caller via the
          `requestType` prop (see above), submitted as-is. */}
      <input type="hidden" name="requestType" value={requestType} />

      {/* Honeypot — hidden from sighted and keyboard users, left for bots
          that blindly fill every field. Not display:none/visibility:hidden,
          which some bots skip; off-screen positioning instead. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={update("name")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label
          htmlFor="business"
          className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
        >
          Business Name
        </label>
        <input
          id="business"
          name="business"
          type="text"
          value={values.business}
          onChange={update("business")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={update("email")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Phone / WhatsApp <span className="text-ink/40 dark:text-ivory/40">(optional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label
          htmlFor="packageInterest"
          className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
        >
          Package interested in
        </label>
        <select
          id="packageInterest"
          name="packageInterest"
          value={values.packageInterest}
          onChange={update("packageInterest")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        >
          {PACKAGE_INTEREST_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="projectDetails"
          className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
        >
          Project details
        </label>
        <textarea
          id="projectDetails"
          name="projectDetails"
          rows={5}
          required
          value={values.projectDetails}
          onChange={update("projectDetails")}
          placeholder="What does your business do, and what are you looking to get built?"
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/80 dark:text-ivory/80">
        <input
          type="checkbox"
          required
          checked={values.consent}
          onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
          className="mt-0.5 h-4 w-4 accent-brass"
        />
        <span>
          I agree to my details being used to respond to this enquiry, per the{" "}
          <Link href="/privacy" className="underline hover:text-brass">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button
        type="submit"
        disabled={!canSubmit || status === "submitting"}
        className="w-full sm:w-auto sm:px-10"
      >
        {status === "submitting" && <Spinner />}
        {status === "submitting"
          ? "Sending…"
          : requestType === "mockup"
            ? "Request my free mockup"
            : "Request a quote"}
      </Button>

      <p className="text-xs text-ink/40 dark:text-ivory/40">
        Prefer email? Write to{" "}
        <a href={`mailto:${SITE.email}`} className="underline hover:text-brass">
          {SITE.email}
        </a>
        .
      </p>
    </form>
  );
}
