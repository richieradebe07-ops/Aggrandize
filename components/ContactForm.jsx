"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import { PACKAGES, SITE } from "@/lib/content";

// No backend is wired up yet — this simulates submission locally so the UI
// and validation are ready to connect to a real endpoint (e.g. a serverless
// function or a form service) later. Swap handleSubmit's body for a real
// fetch() call when that's ready.
export default function ContactForm({ initialPackage = "" }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | sent
  const [values, setValues] = useState({
    name: "",
    business: "",
    package: initialPackage,
    message: "",
  });

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    // TODO: wire this up to a real submission endpoint.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-brass/30 bg-brass/5 p-8 text-center">
        <h3 className="font-display text-2xl text-ink dark:text-ivory">Message sent</h3>
        <p className="mt-2 text-sm text-ink/65 dark:text-ivory/65">
          Thanks, {values.name.split(" ")[0] || "there"} — we&rsquo;ll be in
          touch shortly. If it&rsquo;s urgent, message us directly on
          WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
        <label
          htmlFor="package"
          className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
        >
          Package interested in
        </label>
        <select
          id="package"
          name="package"
          value={values.package}
          onChange={update("package")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        >
          <option value="">Not sure yet</option>
          {PACKAGES.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} — {pkg.price}
            </option>
          ))}
          <option value="maintenance">Maintenance plan</option>
          <option value="other">Something else</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={update("message")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <p className="text-xs leading-relaxed text-ink/50 dark:text-ivory/50">
        We only use the details you share here to respond to your enquiry.
        See our{" "}
        <Link href="/privacy" className="underline hover:text-brass">
          Privacy Policy
        </Link>{" "}
        for how your information is handled.
      </p>

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto sm:px-10">
        {status === "submitting" ? "Sending…" : "Send message"}
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
