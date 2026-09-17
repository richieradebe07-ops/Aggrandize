"use client";

import { useEffect, useRef, useState } from "react";
import { CHANCE_CHART } from "@/lib/content";

// This chart is a persuasive illustration, not a data visualization — it
// carries no numbers, percentages, or counts anywhere, in the UI or here in
// the source. The two bar heights below are shared by every category on
// purpose: the point is "before is short, after is tall," not a specific
// figure per category. Treat these as layout constants, not data.
const BEFORE_HEIGHT = "22%";
const AFTER_HEIGHT = "88%";
const BAR_TRANSITION_MS = 700;
const GROUP_STAGGER_MS = 150;

function BarPair({ label, groupIndex, visible }) {
  const groupDelay = groupIndex * GROUP_STAGGER_MS;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-6 max-w-[18ch] text-center text-sm font-medium text-ink sm:text-base">
        {label}
      </p>

      <div className="flex h-40 items-end gap-3 sm:h-52 sm:gap-5">
        <div className="flex h-full flex-col items-center justify-end">
          <div className="flex h-full w-9 items-end sm:w-11">
            <div
              className="w-full origin-bottom rounded-t bg-dormant transition-transform ease-out"
              style={{
                height: BEFORE_HEIGHT,
                transform: visible ? "scaleY(1)" : "scaleY(0)",
                transitionDuration: `${BAR_TRANSITION_MS}ms`,
                transitionDelay: `${groupDelay}ms`,
              }}
            />
          </div>
          <span className="mt-3 text-[11px] font-medium uppercase tracking-wide text-ink/40">
            Before
          </span>
        </div>

        <div className="flex h-full flex-col items-center justify-end">
          <div className="flex h-full w-9 items-end sm:w-11">
            <div
              className="w-full origin-bottom rounded-t bg-brass transition-transform ease-out"
              style={{
                height: AFTER_HEIGHT,
                transform: visible ? "scaleY(1)" : "scaleY(0)",
                transitionDuration: `${BAR_TRANSITION_MS}ms`,
                transitionDelay: `${groupDelay + GROUP_STAGGER_MS}ms`,
              }}
            />
          </div>
          <span className="mt-3 text-[11px] font-medium uppercase tracking-wide text-brass/80">
            After
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ChanceChart() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- matchMedia is client-only, can't be the initial state without an SSR/client mismatch
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">
          {CHANCE_CHART.heading}
        </h2>
      </div>

      <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-6">
        {CHANCE_CHART.categories.map((category, i) => (
          <BarPair
            key={category.label}
            label={category.label}
            groupIndex={i}
            visible={visible}
          />
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-md text-center text-sm text-ink/50">
        {CHANCE_CHART.subheading}
      </p>
    </div>
  );
}
