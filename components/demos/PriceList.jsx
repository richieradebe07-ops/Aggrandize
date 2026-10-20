"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";

// Tabbed (or single-tab) price list — Salon's hair/nails/barber categories,
// Auto's "from R___" services, Gym's membership plans, fee tables. Every
// price here is a clearly fictional placeholder, never a real rate.
export default function PriceList({ heading, subheading, tabs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = tabs[activeIndex];

  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />

      {tabs.length > 1 && (
        <div className="mx-auto mt-6 flex max-w-content flex-wrap justify-center gap-2">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-pressed={i === activeIndex}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                i === activeIndex
                  ? "border-[rgba(var(--demo-accent-rgb),0.6)] bg-[rgba(var(--demo-accent-rgb),0.12)] text-[rgb(var(--demo-accent-rgb))]"
                  : "border-ink/15 text-ink/60 hover:border-[rgba(var(--demo-accent-rgb),0.4)] dark:border-ivory/20 dark:text-ivory/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="mx-auto mt-8 max-w-2xl divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/60 dark:divide-ivory/10 dark:border-ivory/10 dark:bg-ivory/5">
        {active?.items.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-4 px-6 py-4">
            <div>
              <p className="text-sm font-medium text-ink dark:text-ivory">{item.name}</p>
              {item.duration && (
                <p className="text-xs text-ink/50 dark:text-ivory/50">{item.duration}</p>
              )}
            </div>
            <span className="whitespace-nowrap text-sm font-semibold text-[rgb(var(--demo-accent-rgb))]">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
