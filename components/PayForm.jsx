"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";
import { PACKAGES, PAY_DEPOSIT_PERCENT, calculatePayAmount } from "@/lib/content";

// Deliberately not Number.toLocaleString — see GetStartedForm.jsx's
// formatCurrency comment for why a manual comma-insertion avoids an
// SSR/browser hydration mismatch.
function formatCurrency(amount) {
  const rounded = Math.round(amount);
  return `R${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

const PAYMENT_TYPES = [
  { value: "deposit", label: "Deposit" },
  { value: "full", label: "Pay in full" },
  { value: "balance", label: "Final balance" },
];

const DEPOSIT_PERCENT_LABEL = `${Math.round(PAY_DEPOSIT_PERCENT * 100)}%`;

export default function PayForm({ initialPackage = "" }) {
  const validInitialPackage = PACKAGES.some((p) => p.id === initialPackage)
    ? initialPackage
    : PACKAGES[0]?.id || "";

  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    packageId: validInitialPackage,
    paymentType: "deposit",
    consent: false,
    // Honeypot — see the hidden field below and /api/payfast/create.
    company: "",
  });

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  const pricing = useMemo(
    () => calculatePayAmount({ packageId: values.packageId, paymentType: values.paymentType }),
    [values.packageId, values.paymentType]
  );

  const canSubmit =
    values.name.trim() &&
    values.email.trim() &&
    values.businessName.trim() &&
    values.packageId &&
    values.consent &&
    status !== "submitting";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/payfast/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone,
          businessName: values.businessName,
          packageId: values.packageId,
          paymentType: values.paymentType,
          consent: values.consent,
          company: values.company,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      if (!data.actionUrl) throw new Error("Something went wrong. Please try again.");

      // Build and auto-submit a real form POST to PayFast's hosted payment
      // page — this has to be a full navigation, not a fetch, since
      // PayFast needs to render its own page (same pattern as
      // GetStartedForm.jsx).
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
      {/* Honeypot — hidden from sighted and keyboard users, left for bots
          that blindly fill every field. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="pay-company">Company</label>
        <input
          id="pay-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={update("company")}
        />
      </div>

      <div>
        <label htmlFor="payName" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Name
        </label>
        <input
          id="payName"
          required
          value={values.name}
          onChange={update("name")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="payEmail" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Email
        </label>
        <input
          id="payEmail"
          type="email"
          required
          value={values.email}
          onChange={update("email")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="payPhone" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Phone / WhatsApp <span className="text-ink/40 dark:text-ivory/40">(optional)</span>
        </label>
        <input
          id="payPhone"
          type="tel"
          value={values.phone}
          onChange={update("phone")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label
          htmlFor="payBusinessName"
          className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
        >
          Business name
        </label>
        <input
          id="payBusinessName"
          required
          value={values.businessName}
          onChange={update("businessName")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        />
      </div>

      <div>
        <label htmlFor="payPackage" className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory">
          Plan
        </label>
        <select
          id="payPackage"
          value={values.packageId}
          onChange={update("packageId")}
          className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
        >
          {PACKAGES.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} — {pkg.price}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-ink dark:text-ivory">What are you paying?</legend>
        <div className="space-y-2">
          {PAYMENT_TYPES.map((type) => (
            <label
              key={type.value}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                values.paymentType === type.value
                  ? "border-brass bg-brass/5"
                  : "border-ink/15 bg-white/50 dark:border-ivory/20 dark:bg-ivory/5"
              }`}
            >
              <input
                type="radio"
                name="paymentType"
                checked={values.paymentType === type.value}
                onChange={() => setValues((v) => ({ ...v, paymentType: type.value }))}
                className="h-4 w-4 accent-brass"
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      {pricing && (
        <div className="rounded-lg bg-brass/10 px-4 py-3 text-sm">
          <div className="flex justify-between font-semibold">
            <span className="text-ink dark:text-ivory">Amount due</span>
            <span className="text-brass">{formatCurrency(pricing.amount)}</span>
          </div>
          {values.paymentType === "deposit" && (
            <p className="mt-1 text-xs text-ink/50 dark:text-ivory/50">
              {DEPOSIT_PERCENT_LABEL} deposit of {formatCurrency(pricing.packagePrice)} — the
              remaining {formatCurrency(pricing.balanceAmount)} is due as the final balance, on
              launch.
            </p>
          )}
          {values.paymentType === "full" && (
            <p className="mt-1 text-xs text-ink/50 dark:text-ivory/50">
              The full plan price, paid upfront — no balance due later.
            </p>
          )}
        </div>
      )}

      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/80 dark:text-ivory/80">
        <input
          type="checkbox"
          required
          checked={values.consent}
          onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
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
        {status === "submitting" ? "Redirecting to PayFast…" : "Continue to payment"}
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
