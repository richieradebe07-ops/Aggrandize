"use client";

import { useEffect, useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";

// The "How it works" 5-step list, with a connecting line that fills in as
// the section scrolls through the viewport — vertical on mobile (stacked
// single column), horizontal at `sm:` and up (the grid becomes a row).
// Both lines share one scroll-computed percentage; only one is visible at
// a time via responsive classes, so this is one effect, not two.
export default function ProcessTimeline({ steps }) {
  const containerRef = useRef(null);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    let raf = null;

    function updateFill() {
      raf = null;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight || 0;
      // 0% when the section's top is at the bottom of the viewport, 100%
      // once its bottom has scrolled up to the top of the viewport.
      const total = rect.height + viewportH;
      const scrolled = viewportH - rect.top;
      const pct = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;
      setFillPercent(pct);
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(updateFill);
    }

    updateFill();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const percentValue = `${Math.round(fillPercent * 100)}%`;

  return (
    <div ref={containerRef} className="relative mt-12">
      {/* Mobile: vertical line down the left of the stacked list. */}
      <div
        className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-ink/10 dark:bg-ivory/10 sm:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute left-[18px] top-0 w-0.5 bg-brass transition-[height] duration-150 ease-out sm:hidden"
        style={{ height: percentValue }}
        aria-hidden="true"
      />

      {/* sm:+ : horizontal line through the row of step circles. */}
      <div
        className="absolute left-0 right-0 top-[18px] hidden h-0.5 -translate-y-1/2 bg-ink/10 dark:bg-ivory/10 sm:block"
        aria-hidden="true"
      />
      <div
        className="absolute left-0 top-[18px] hidden h-0.5 -translate-y-1/2 bg-brass transition-[width] duration-150 ease-out sm:block"
        style={{ width: percentValue }}
        aria-hidden="true"
      />

      <ol className="relative grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {steps.map((step, i) => (
          <RevealOnScroll key={step.title} delay={i * 80} variant="tech" as="li">
            <div className="flex items-start gap-4 text-left sm:flex-col sm:items-center sm:text-center sm:gap-0">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-brass/40 bg-ivory font-display text-sm text-brass dark:bg-ink">
                {i + 1}
              </div>
              <div className="sm:mt-3">
                <h3 className="font-display text-lg text-ink dark:text-ivory">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60 dark:text-ivory/60">
                  {step.description}
                </p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </ol>
    </div>
  );
}
