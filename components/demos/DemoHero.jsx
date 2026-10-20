"use client";

import DemoMotif from "./DemoMotif";
import { useDemoToast } from "./DemoToast";

// Every demo's hero: fictional business name, tagline, a short intro, and
// one primary inert action. `heroCta.type` is "toast" for actions that would
// dial/message/call in a real site (so it fires the demo toast immediately)
// or "scroll" to jump to the page's enquiry form instead.
export default function DemoHero({ business, tagline, intro, motif, heroCta }) {
  const { showToast } = useDemoToast();

  function handleCta() {
    if (heroCta?.type === "scroll") {
      document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    showToast();
  }

  return (
    <section className="relative overflow-hidden px-5 py-16 text-center sm:px-8 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(var(--demo-accent-rgb),0.18)] blur-3xl"
      />
      <DemoMotif motif={motif} className="mx-auto h-14 w-14 text-[rgb(var(--demo-accent-rgb))]" />
      <h1 className="mt-5 font-display text-4xl text-ink dark:text-ivory sm:text-5xl">{business}</h1>
      <p className="mt-3 text-lg font-medium text-[rgb(var(--demo-accent-rgb))]">{tagline}</p>
      <p className="mx-auto mt-4 max-w-xl text-ink/70 dark:text-ivory/70">{intro}</p>
      {heroCta && (
        <button
          type="button"
          onClick={handleCta}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[rgb(var(--demo-accent-rgb))] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          {heroCta.label}
        </button>
      )}
    </section>
  );
}
