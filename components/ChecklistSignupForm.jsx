"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import Spinner from "./Spinner";
import { SITE } from "@/lib/content";

// Posts to /api/resources/checklist — emails the visitor a direct link to
// this page and alerts the studio. The checklist itself is already fully
// readable on the page without this form; this is just an "email me this
// link" convenience plus a lead for the studio.
export default function ChecklistSignupForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    consent: false,
    company: "", // honeypot
  });

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  const canSubmit = values.name.trim() && values.email.trim() && values.consent;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/resources/checklist", {
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
        <h3 className="font-display text-2xl text-ink dark:text-ivory">Check your inbox</h3>
        <p className="mt-2 text-sm text-ink/65 dark:text-ivory/65">
          Thanks, {values.name.split(" ")[0] || "there"} — we&rsquo;ve emailed you a direct link
          to this checklist, so you can find it again any time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="checklist-company">Company</label>
        <input
          id="checklist-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div>
        <label htmlFor="checklist-name" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Name
        </label>
        <input
          id="checklist-name"
          name="name"
          type="text"
          required
          value={values.name}
          onChange={update("name")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="checklist-email" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Email
        </label>
        <input
          id="checklist-email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={update("email")}
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
          I agree to my details being used to email me this checklist, per the{" "}
          <Link href="/privacy" className="underline hover:text-brass">
            Privacy Policy
          </Link>
          . No spam, no other mailing list.
        </span>
      </label>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button type="submit" disabled={!canSubmit || status === "submitting"} className="w-full sm:w-auto sm:px-10">
        {status === "submitting" && <Spinner />}
        {status === "submitting" ? "Sending…" : "Email me this checklist"}
      </Button>

      <p className="text-xs text-ink/40 dark:text-ivory/40">
        Prefer not to? The checklist above is free to read right now — this just emails you a
        link to find it again. Questions? Write to{" "}
        <a href={`mailto:${SITE.email}`} className="underline hover:text-brass">
          {SITE.email}
        </a>
        .
      </p>
    </form>
  );
}
