import Link from "next/link";
import { MAINTENANCE_PLANS, MAINTENANCE_TERMS } from "@/lib/content";

// Compact homepage summary of the three real, priced maintenance tiers —
// no separate "Care Plan" price or copy of its own. This used to show its
// own single-tier placeholder price; it now just reads MAINTENANCE_PLANS
// (the same source /services, the FAQ, Terms §9, and the pricing PDF read
// from) so it can never drift from — or duplicate — the real tiers.
export default function CarePlanSection() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="grid gap-5 sm:grid-cols-3">
        {MAINTENANCE_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl border p-6 text-center ${
              plan.highlight
                ? "border-brass bg-brass/5"
                : "border-ink/10 bg-white/60 dark:border-ivory/10 dark:bg-ivory/5"
            }`}
          >
            <h3 className="font-display text-xl text-ink dark:text-ivory">{plan.name}</h3>
            <div className="mt-2">
              <span className="font-display text-2xl text-ink dark:text-ivory">
                {plan.price}
              </span>
              <span className="ml-1 text-sm text-ink/50 dark:text-ivory/50">{plan.period}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink/60 dark:text-ivory/60">
              {plan.summary}
            </p>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-6 max-w-lg text-center text-sm font-semibold text-brass">
        {MAINTENANCE_TERMS}
      </p>

      <p className="mt-4 text-center text-xs text-ink/45 dark:text-ivory/45">
        <Link href="/services#maintenance" className="underline hover:text-brass">
          See full maintenance plans
        </Link>
      </p>
    </div>
  );
}
