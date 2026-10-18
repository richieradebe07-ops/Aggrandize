"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";

// Backs /pay/[token] — a custom-quote payment link (lib/paymentLinks.js).
// The amount and description are already fixed by that config (shown by
// the server component above this), so all this collects is the email a
// receipt should go to, plus the same terms consent every checkout needs.
export default function PaymentLinkCheckout({ token }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  // Honeypot — see the hidden field below and /api/payfast/create.
  const [company, setCompany] = useState("");

  const canSubmit = email.trim() && consent && status !== "submitting";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/payfast/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, phone, consent, company }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      if (!data.actionUrl) throw new Error("Something went wrong. Please try again.");

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.actionUrl;
      Object.entries(data.paymentFields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="link-company">Company</label>
        <input
          id="link-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="linkEmail" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Email (for your receipt)
        </label>
        <input
          id="linkEmail"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="linkPhone" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Phone / WhatsApp <span className="text-ink/40 dark:text-ivory/40">(optional)</span>
        </label>
        <input
          id="linkPhone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/80 dark:text-ivory/80">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-brass"
        />
        <span>
          I agree to my details being used to process this payment, per the{" "}
          <Link href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-brass">
            Terms & Conditions
          </Link>
          ,{" "}
          <Link href="/refunds" target="_blank" rel="noopener noreferrer" className="underline hover:text-brass">
            Refund Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brass">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {errorMessage && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
      )}

      <Button type="submit" disabled={!canSubmit} className="w-full sm:w-auto sm:px-10">
        {status === "submitting" ? "Redirecting to PayFast…" : "Pay now"}
      </Button>

      <p className="text-xs text-ink/40 dark:text-ivory/40">
        We accept card, Instant EFT and QR payments via PayFast. Rather pay another way?{" "}
        <WhatsAppButton
          variant="inline"
          className="text-xs"
          message="Hi Aggrandize Web Co, I'd like to arrange payment another way."
        />
      </p>
    </form>
  );
}
