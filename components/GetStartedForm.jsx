"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  PACKAGES,
  ADD_ONS,
  getAvailablePaymentPlans,
  calculatePricing,
} from "@/lib/content";
import ImageUploader from "./ImageUploader";

// Deliberately not Number.toLocaleString: Node's SSR pass and the browser
// can have different ICU data for "en-ZA", producing different separators
// (comma vs space) for the same number and causing a hydration mismatch.
// A manual comma-insertion is deterministic in any JS environment.
function formatCurrency(amount) {
  const rounded = Math.round(amount);
  return `R${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function newSubmissionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `sub-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function GetStartedForm({ initialPackage, initialData }) {
  const [submissionId] = useState(() => initialData?.id || newSubmissionId());

  const [packageId, setPackageId] = useState(
    initialData?.package || initialPackage || "starter"
  );
  const [addOns, setAddOns] = useState(initialData?.addOns || []);
  const availablePlans = useMemo(() => getAvailablePaymentPlans(packageId), [packageId]);
  const [paymentPlan, setPaymentPlan] = useState(
    initialData?.paymentPlan || availablePlans[0]?.id || "standard"
  );

  const [business, setBusiness] = useState({ name: initialData?.business?.name || "" });
  const [contact, setContact] = useState({
    name: initialData?.contact?.name || "",
    email: initialData?.contact?.email || "",
    phone: initialData?.contact?.phone || "",
  });
  const [brief, setBrief] = useState({
    description: initialData?.brief?.description || "",
    pagesNeeded: initialData?.brief?.pagesNeeded || "",
    productsOrServices: initialData?.brief?.productsOrServices || "",
    brandColors: initialData?.brief?.brandColors || "",
  });
  const [images, setImages] = useState(initialData?.images || []);
  const [agreedToLegal, setAgreedToLegal] = useState(false);

  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState("");

  // If the package changes, make sure the selected payment plan is still
  // valid for it (e.g. switching away from E-Commerce drops "Three-Part").
  // Adjusted during render (React's documented pattern for resetting state
  // when a dependency changes) rather than in an effect, which would cause
  // an extra, visible re-render after the fact.
  const [prevPackageId, setPrevPackageId] = useState(packageId);
  if (packageId !== prevPackageId) {
    setPrevPackageId(packageId);
    if (!availablePlans.some((p) => p.id === paymentPlan)) {
      setPaymentPlan(availablePlans[0]?.id);
    }
  }

  const pricing = useMemo(
    () => calculatePricing({ packageId, addOnIds: addOns, paymentPlanId: paymentPlan }),
    [packageId, addOns, paymentPlan]
  );

  // A brief brass flash on the deposit figure whenever it changes, so the
  // "running total" reads as live rather than a static label. Re-keying the
  // element restarts the CSS animation on every change.
  const [depositFlashKey, setDepositFlashKey] = useState(0);
  const prevDepositDueRef = useRef(pricing?.depositDue);
  useEffect(() => {
    if (pricing && prevDepositDueRef.current !== pricing.depositDue) {
      prevDepositDueRef.current = pricing.depositDue;
      setDepositFlashKey((k) => k + 1);
    }
  }, [pricing]);

  function toggleAddOn(id) {
    setAddOns((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }

  const requiredFieldsFilled =
    business.name.trim() && contact.name.trim() && contact.email.trim() && contact.phone.trim();
  const canSubmit = requiredFieldsFilled && agreedToLegal && status !== "submitting";

  // Drives the progress bar in the sidebar — a quick "how close am I" cue
  // through the required fields, not a strict step tracker.
  const progressChecks = [
    business.name.trim(),
    contact.name.trim(),
    contact.email.trim(),
    contact.phone.trim(),
    agreedToLegal,
  ];
  const progressPercent = Math.round(
    (progressChecks.filter(Boolean).length / progressChecks.length) * 100
  );

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/get-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: submissionId,
          package: packageId,
          addOns,
          paymentPlan,
          business,
          contact,
          brief,
          images,
          agreedToLegal,
        }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Something went wrong. Please try again.");
      }
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      // Build and auto-submit a real form POST to PayFast's hosted payment
      // page — this has to be a full navigation, not a fetch, since PayFast
      // needs to render its own page.
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
    <form onSubmit={handleSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-10">
        {/* Package + add-ons */}
        <section>
          <h2 className="font-display text-2xl text-ink">Your package</h2>
          <div className="mt-4">
            <label htmlFor="package" className="mb-1.5 block text-sm font-medium text-ink">
              Package
            </label>
            <select
              id="package"
              value={packageId}
              onChange={(e) => setPackageId(e.target.value)}
              className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
            >
              {PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} — {pkg.price}
                </option>
              ))}
            </select>
          </div>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-medium text-ink">Add-ons</legend>
            <div className="space-y-2">
              {ADD_ONS.map((addOn) => {
                const checked = addOns.includes(addOn.id);
                return (
                  <label
                    key={addOn.id}
                    className={`flex cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors ${
                      checked ? "border-brass bg-brass/5" : "border-ink/15 bg-white/50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddOn(addOn.id)}
                        className="h-4 w-4 accent-brass"
                      />
                      {addOn.name}
                    </span>
                    <span className="text-ink/50">{addOn.price}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-medium text-ink">Payment plan</legend>
            <div className="space-y-2">
              {availablePlans.map((plan) => (
                <label
                  key={plan.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                    paymentPlan === plan.id ? "border-brass bg-brass/5" : "border-ink/15 bg-white/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentPlan"
                    checked={paymentPlan === plan.id}
                    onChange={() => setPaymentPlan(plan.id)}
                    className="mt-0.5 h-4 w-4 accent-brass"
                  />
                  <span>
                    <span className="block font-medium text-ink">{plan.name}</span>
                    <span className="block text-ink/50">{plan.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        {/* Business + contact */}
        <section>
          <h2 className="font-display text-2xl text-ink">Your details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="businessName" className="mb-1.5 block text-sm font-medium text-ink">
                Business name
              </label>
              <input
                id="businessName"
                required
                value={business.name}
                onChange={(e) => setBusiness({ name: e.target.value })}
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
              />
            </div>
            <div>
              <label htmlFor="contactName" className="mb-1.5 block text-sm font-medium text-ink">
                Contact name
              </label>
              <input
                id="contactName"
                required
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
              />
            </div>
            <div>
              <label htmlFor="contactEmail" className="mb-1.5 block text-sm font-medium text-ink">
                Email
              </label>
              <input
                id="contactEmail"
                type="email"
                required
                value={contact.email}
                onChange={(e) => setContact((c) => ({ ...c, email: e.target.value }))}
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contactPhone" className="mb-1.5 block text-sm font-medium text-ink">
                Phone / WhatsApp
              </label>
              <input
                id="contactPhone"
                type="tel"
                required
                value={contact.phone}
                onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
              />
            </div>
          </div>
        </section>

        {/* Brief */}
        <section>
          <h2 className="font-display text-2xl text-ink">Tell us about the site</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">
                Describe what you&apos;re looking for
              </label>
              <textarea
                id="description"
                rows={5}
                value={brief.description}
                onChange={(e) => setBrief((b) => ({ ...b, description: e.target.value }))}
                className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                placeholder="What does your business do, and what should this site help it achieve?"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pagesNeeded" className="mb-1.5 block text-sm font-medium text-ink">
                  Pages needed
                </label>
                <input
                  id="pagesNeeded"
                  value={brief.pagesNeeded}
                  onChange={(e) => setBrief((b) => ({ ...b, pagesNeeded: e.target.value }))}
                  placeholder="e.g. Home, About, Services, Contact"
                  className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                />
              </div>
              <div>
                <label
                  htmlFor="productsOrServices"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Products / services to list
                </label>
                <input
                  id="productsOrServices"
                  value={brief.productsOrServices}
                  onChange={(e) =>
                    setBrief((b) => ({ ...b, productsOrServices: e.target.value }))
                  }
                  className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="brandColors" className="mb-1.5 block text-sm font-medium text-ink">
                  Existing brand colors or style preferences
                </label>
                <input
                  id="brandColors"
                  value={brief.brandColors}
                  onChange={(e) => setBrief((b) => ({ ...b, brandColors: e.target.value }))}
                  placeholder="e.g. we already use navy and gold, or: no preference"
                  className="w-full rounded-lg border border-ink/15 bg-white px-4 py-3 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass"
                />
              </div>
            </div>

            <ImageUploader submissionId={submissionId} images={images} onChange={setImages} />
          </div>
        </section>

        {/* Legal agreement */}
        <section className="rounded-xl border border-ink/10 bg-ink/[0.03] p-5">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/80">
            <input
              type="checkbox"
              checked={agreedToLegal}
              onChange={(e) => setAgreedToLegal(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-brass"
            />
            <span>
              I have read and agree to the{" "}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brass"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-brass"
              >
                Terms & Conditions
              </Link>
              .
            </span>
          </label>
        </section>

        {errorMessage && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={!canSubmit}
          className="shine-sweep w-full rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40 sm:w-auto sm:px-10"
        >
          {status === "submitting" ? "Redirecting to payment…" : "Continue to Payment"}
        </button>
      </div>

      {/* Running total */}
      <aside className="h-fit rounded-2xl border border-ink/10 bg-white/60 p-6 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl text-ink">Running total</h3>
          <span className="text-xs font-medium text-ink/40">{progressPercent}% ready</span>
        </div>
        <div
          className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ink/10"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Brief completion"
        >
          <div
            className="h-full rounded-full bg-brass transition-[width] duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        {pricing && (
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Package</dt>
              <dd className="text-ink">{formatCurrency(pricing.packagePrice)}</dd>
            </div>
            {pricing.addOnsPrice > 0 && (
              <div className="flex justify-between">
                <dt className="text-ink/60">Add-ons</dt>
                <dd className="text-ink">{formatCurrency(pricing.addOnsPrice)}</dd>
              </div>
            )}
            {pricing.surcharge > 0 && (
              <div className="flex justify-between">
                <dt className="text-ink/60">Instalment surcharge (5%)</dt>
                <dd className="text-ink">{formatCurrency(pricing.surcharge)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-ink/10 pt-2 font-medium">
              <dt className="text-ink">Total</dt>
              <dd className="text-ink">{formatCurrency(pricing.total)}</dd>
            </div>
            <div
              key={depositFlashKey}
              className="mt-3 rounded-lg bg-brass/10 px-3 py-2.5 animate-flash-highlight"
            >
              <div className="flex justify-between font-semibold">
                <dt className="text-ink">Due today</dt>
                <dd className="text-brass">{formatCurrency(pricing.depositDue)}</dd>
              </div>
            </div>
          </dl>
        )}
        <p className="mt-4 text-xs leading-relaxed text-ink/45">
          Paid securely via PayFast.
        </p>
      </aside>
    </form>
  );
}
