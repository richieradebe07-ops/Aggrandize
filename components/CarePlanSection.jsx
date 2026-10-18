import Link from "next/link";
import { CheckIcon } from "./icons";
import { CARE_PLAN } from "@/lib/content";

// NOTE: CARE_PLAN.price is an explicit, unconfirmed placeholder — see the
// comment above its definition in lib/content.js. This section makes that
// visible on the page itself rather than quietly rendering it as a real
// price, so it can't accidentally go live looking confirmed.
export default function CarePlanSection() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-ink/10 bg-white/60 p-8 text-center dark:border-ivory/10 dark:bg-ivory/5 sm:p-10">
      <h2 className="font-display text-3xl text-ink dark:text-ivory">Care Plan</h2>
      <p className="mt-2 text-ink/60 dark:text-ivory/60">
        Keep your site running smoothly after launch.
      </p>

      <div className="mt-6">
        <span className="font-display text-3xl text-ink dark:text-ivory">{CARE_PLAN.price}</span>
        <span className="ml-1 text-sm text-ink/50 dark:text-ivory/50">{CARE_PLAN.period}</span>
      </div>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
        Price pending confirmation
      </p>

      <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left">
        {CARE_PLAN.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/75 dark:text-ivory/75">
            <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brass" />
            {feature}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm font-semibold text-brass">{CARE_PLAN.promise}</p>

      <p className="mt-6 text-xs text-ink/45 dark:text-ivory/45">
        See our full{" "}
        <Link href="/services#maintenance" className="underline hover:text-brass">
          maintenance plans
        </Link>{" "}
        for the detailed breakdown.
      </p>
    </div>
  );
}
