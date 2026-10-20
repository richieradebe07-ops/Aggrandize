"use client";

import { useDemoToast } from "./DemoToast";

// A bold horizontal bar with an optional inert CTA — emergency call-outs,
// after-hours notes, a "donations coming soon" hook, a concept-checkout
// banner. `tone` only changes color emphasis.
export default function CalloutBar({ text, ctaLabel, tone = "brass" }) {
  const { showToast } = useDemoToast();
  const toneClasses =
    tone === "urgent"
      ? "border-[rgba(var(--demo-accent-rgb),0.5)] bg-[rgba(var(--demo-accent-rgb),0.12)]"
      : "border-ink/10 bg-ink/[0.03] dark:border-ivory/10 dark:bg-ivory/[0.04]";

  return (
    <section className="px-5 sm:px-8">
      <div
        className={`mx-auto flex max-w-content flex-col items-center justify-between gap-3 rounded-2xl border p-5 text-center sm:flex-row sm:text-left ${toneClasses}`}
      >
        <p className="text-sm font-medium text-ink dark:text-ivory">{text}</p>
        {ctaLabel && (
          <button
            type="button"
            onClick={() => showToast()}
            className="flex-shrink-0 rounded-full bg-[rgb(var(--demo-accent-rgb))] px-5 py-2 text-sm font-semibold text-white"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </section>
  );
}
