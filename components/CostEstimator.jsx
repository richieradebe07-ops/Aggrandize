"use client";

import { useMemo, useState } from "react";
import { PACKAGES, ADD_ONS, MAINTENANCE_PLANS } from "@/lib/content";
import { useQuoteForm } from "./QuoteFormProvider";
import Button from "./Button";

function formatCurrency(amount) {
  const rounded = Math.round(amount);
  return `R${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

// MAINTENANCE_PLANS only carries its price as a display string ("R400") —
// parsed here rather than adding a second numeric field to lib/content.js
// that could drift from it; every number used below still traces back to
// that one file.
function parseRand(priceString) {
  return Number(priceString.replace(/[^0-9]/g, "")) || 0;
}

const OptionButton = ({ active, onClick, children, className = "" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
      active
        ? "border-brass bg-brass/10 text-ink dark:text-ivory"
        : "border-ink/15 text-ink/70 hover:border-brass/50 dark:border-ivory/20 dark:text-ivory/70"
    } ${className}`}
  >
    {children}
  </button>
);

// "What it really costs" — a self-service estimator built entirely from
// PACKAGES/ADD_ONS/MAINTENANCE_PLANS (lib/content.js), so it can never show
// a number that disagrees with the pricing cards above it or the pricing
// PDF. No payment step: "Request this quote" only pre-fills the on-page
// quote form's message and scrolls to it.
export default function CostEstimator() {
  const { openQuoteForm } = useQuoteForm();
  const [packageId, setPackageId] = useState(PACKAGES[0].id);
  const [addOnIds, setAddOnIds] = useState([]);
  const [maintenanceId, setMaintenanceId] = useState("");

  const pkg = PACKAGES.find((p) => p.id === packageId);
  const maintenance = MAINTENANCE_PLANS.find((m) => m.id === maintenanceId) || null;

  const { onceOffTotal, monthlyTotal, firstYearTotal } = useMemo(() => {
    const addOnsTotal = ADD_ONS.filter((a) => addOnIds.includes(a.id)).reduce(
      (sum, a) => sum + a.basePrice,
      0
    );
    const once = pkg.priceValue + addOnsTotal;
    const monthly = maintenance ? parseRand(maintenance.price) : 0;
    return { onceOffTotal: once, monthlyTotal: monthly, firstYearTotal: once + monthly * 12 };
  }, [pkg, addOnIds, maintenance]);

  function toggleAddOn(id) {
    setAddOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function requestThisQuote() {
    const addOnLines = ADD_ONS.filter((a) => addOnIds.includes(a.id))
      .map((a) => `- ${a.name} (${a.price})`)
      .join("\n");
    const message = [
      "I'm interested in the following, based on the cost estimator:",
      `- ${pkg.name} (${pkg.price} ${pkg.priceNote})`,
      addOnLines,
      maintenance ? `- ${maintenance.name} maintenance (${maintenance.price}${maintenance.period})` : "- No maintenance plan",
      "",
      `Once-off total: ${formatCurrency(onceOffTotal)}`,
      monthlyTotal > 0 ? `Monthly: ${formatCurrency(monthlyTotal)}` : null,
      `Estimated first-year total: ${formatCurrency(firstYearTotal)}`,
    ]
      .filter(Boolean)
      .join("\n");

    openQuoteForm({ packageId, requestType: "quote", message });
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-ink/10 bg-white/60 p-6 dark:border-ivory/10 dark:bg-ivory/5 sm:p-8">
      <h2 className="text-center font-display text-2xl text-ink dark:text-ivory">
        What it really costs
      </h2>
      <p className="mt-2 text-center text-sm text-ink/60 dark:text-ivory/60">
        Pick a package, any add-ons, and a maintenance plan — every price here comes straight
        from the pricing above.
      </p>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-ivory/50">
          Package
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {PACKAGES.map((p) => (
            <OptionButton key={p.id} active={p.id === packageId} onClick={() => setPackageId(p.id)}>
              <span className="block font-medium">{p.name}</span>
              <span className="block text-xs text-ink/50 dark:text-ivory/50">{p.price}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-ivory/50">
          Add-ons
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {ADD_ONS.map((a) => (
            <OptionButton key={a.id} active={addOnIds.includes(a.id)} onClick={() => toggleAddOn(a.id)}>
              <span className="block font-medium">{a.name}</span>
              <span className="block text-xs text-ink/50 dark:text-ivory/50">{a.price}</span>
            </OptionButton>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-ivory/50">
          Maintenance plan
        </p>
        <div className="grid gap-2 sm:grid-cols-4">
          <OptionButton active={maintenanceId === ""} onClick={() => setMaintenanceId("")}>
            <span className="block font-medium">None</span>
            <span className="block text-xs text-ink/50 dark:text-ivory/50">R0</span>
          </OptionButton>
          {MAINTENANCE_PLANS.map((m) => (
            <OptionButton key={m.id} active={m.id === maintenanceId} onClick={() => setMaintenanceId(m.id)}>
              <span className="block font-medium">{m.name}</span>
              <span className="block text-xs text-ink/50 dark:text-ivory/50">
                {m.price}
                {m.period}
              </span>
            </OptionButton>
          ))}
        </div>
      </div>

      <dl className="mt-8 space-y-2 rounded-xl bg-ink/[0.03] p-5 text-sm dark:bg-ivory/[0.04]">
        <div className="flex justify-between">
          <dt className="text-ink/60 dark:text-ivory/60">Once-off total</dt>
          <dd className="font-medium text-ink dark:text-ivory">{formatCurrency(onceOffTotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/60 dark:text-ivory/60">Monthly (maintenance)</dt>
          <dd className="font-medium text-ink dark:text-ivory">{formatCurrency(monthlyTotal)}</dd>
        </div>
        <div className="flex justify-between border-t border-ink/10 pt-2 dark:border-ivory/10">
          <dt className="font-semibold text-ink dark:text-ivory">Estimated first-year total</dt>
          <dd className="font-semibold text-brass">{formatCurrency(firstYearTotal)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs text-ink/40 dark:text-ivory/40">
        An estimate only — no payment is taken here. Your actual quote is confirmed once your
        brief is in.
      </p>

      <Button onClick={requestThisQuote} className="mt-6 w-full">
        Request this quote
      </Button>
    </div>
  );
}
