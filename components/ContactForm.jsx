"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import { PACKAGE_INTEREST_OPTIONS, SITE } from "@/lib/content";

// Posts to /api/contact, which emails both the submitter (a short
// confirmation) and the studio inbox (a full alert) — no submission
// storage, just notifications, same pattern as the "Ask a question" widget.
export default function ContactForm({ initialPackage = "" }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const validInitialPackage = PACKAGE_INTEREST_OPTIONS.some((o) => o.value === initialPackage)
    ? initialPackage
    : "unsure";
  const [values, setValues] = useState({
    name: "",
    business: "",
    packageInterest: validInitialPackage,
    email: "",
    phone: "",
    projectDetails: "",
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
        body: JSON.stringify(values),
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
        <h3 className="font-display text-2xl text-ink dark:text-ivory">Request received</h3>
        <p className="mt-2 text-sm text-ink/65 dark:text-ivory/65">
          Thanks, {values.name.split(" ")[0] || "there"} — check your inbox for a
          confirmation, and we&rsquo;ll reply with next steps within 24 hours. If
          it&rsquo;s urgent, message us directly on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        {status === "submitting" ? "Sending…" : "Request a quote"}
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
