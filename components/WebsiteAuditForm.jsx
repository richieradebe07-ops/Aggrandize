"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import { SITE } from "@/lib/content";

// Posts to /api/audit — no automated scoring anywhere in this flow, just a
// notification to the studio and a confirmation that a human will send a
// real report within 48 hours.
export default function WebsiteAuditForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    business: "",
    url: "",
    consent: false,
    company: "", // honeypot
  });

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  const canSubmit = values.name.trim() && values.email.trim() && values.url.trim() && values.consent;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/audit", {
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
          confirmation. We&rsquo;ll send you a short, honest audit of your site within 48
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="audit-company">Company</label>
        <input
          id="audit-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div>
        <label htmlFor="audit-url" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Your website URL
        </label>
        <input
          id="audit-url"
          name="url"
          type="text"
          required
          placeholder="yourbusiness.co.za"
          value={values.url}
          onChange={update("url")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="audit-name" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Name
        </label>
        <input
          id="audit-name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={update("name")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="audit-email" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Email
        </label>
        <input
          id="audit-email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={update("email")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="audit-business" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Business name <span className="text-ink/40 dark:text-ivory/40">(optional)</span>
        </label>
        <input
          id="audit-business"
          name="business"
          type="text"
          value={values.business}
          onChange={update("business")}
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
          I agree to my details being used to send me this audit, per the{" "}
          <Link href="/privacy" className="underline hover:text-brass">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button type="submit" disabled={!canSubmit || status === "submitting"} className="w-full sm:w-auto sm:px-10">
        {status === "submitting" ? "Sending…" : "Get my free audit"}
      </Button>

      <p className="text-xs text-ink/40 dark:text-ivory/40">
        A real person reviews your site — not an automated score. Prefer email? Write to{" "}
        <a href={`mailto:${SITE.email}`} className="underline hover:text-brass">
          {SITE.email}
        </a>
        .
      </p>
    </form>
  );
}
