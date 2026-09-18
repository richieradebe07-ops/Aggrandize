"use client";

import { useEffect, useRef, useState } from "react";
import { CHANCE_CHART } from "@/lib/content";

// This chart is a persuasive illustration, not a data visualization — it
// carries no numbers, percentages, or counts anywhere, in the UI or here in
// the source. The line's start/end coordinates below are shared by every
// category on purpose: the point is "before is low, after is high," not a
// specific trajectory per category. Treat these as layout constants, not
// data. The curve and terminal dots deliberately echo the brand flourish
// (components/Flourish.jsx) — a thin rounded stroke rising to a small
// circular terminal — rather than reading as a generic line chart.
const VIEWBOX_WIDTH = 200;
const VIEWBOX_HEIGHT = 120;
const BEFORE_POINT = { x: 18, y: 96 };
const AFTER_POINT = { x: 182, y: 20 };
const LINE_PATH = `M${BEFORE_POINT.x},${BEFORE_POINT.y} C${VIEWBOX_WIDTH * 0.45},${BEFORE_POINT.y} ${VIEWBOX_WIDTH * 0.55},${AFTER_POINT.y} ${AFTER_POINT.x},${AFTER_POINT.y}`;
const DRAW_TRANSITION_MS = 900;
const DOT_TRANSITION_MS = 350;
const GROUP_STAGGER_MS = 200;

function LineTrend({ label, groupIndex, visible }) {
  const pathRef = useRef(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setLength(pathRef.current.getTotalLength());
    }
  }, []);

  const groupDelay = groupIndex * GROUP_STAGGER_MS;

  return (
    <div className="flex flex-col items-center">
      <p className="mb-6 max-w-[18ch] text-center text-sm font-medium text-ink dark:text-ivory sm:text-base">
        {label}
      </p>

      <div className="w-full max-w-[220px]">
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="h-28 w-full sm:h-36"
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d={LINE_PATH}
            className="stroke-brass"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              strokeDasharray: length,
              strokeDashoffset: visible ? 0 : length,
              transition: length
                ? `stroke-dashoffset ${DRAW_TRANSITION_MS}ms ease-out ${groupDelay}ms`
                : "none",
            }}
          />
          <circle
            cx={BEFORE_POINT.x}
            cy={BEFORE_POINT.y}
            r={5}
            className="fill-dormant"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity ${DOT_TRANSITION_MS}ms ease-out ${groupDelay}ms`,
            }}
          />
          <circle
            cx={AFTER_POINT.x}
            cy={AFTER_POINT.y}
            r={5}
            className="fill-brass"
            style={{
              opacity: visible ? 1 : 0,
              transition: `opacity ${DOT_TRANSITION_MS}ms ease-out ${groupDelay + DRAW_TRANSITION_MS - DOT_TRANSITION_MS}ms`,
            }}
          />
        </svg>

        <div className="mt-1 flex justify-between">
          <span className="text-[11px] font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
            Before
          </span>
          <span className="text-[11px] font-medium uppercase tracking-wide text-brass/80">
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
        <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
          {CHANCE_CHART.heading}
        </h2>
      </div>

      <div className="mt-14 grid gap-12 sm:grid-cols-3 sm:gap-6">
        {CHANCE_CHART.categories.map((category, i) => (
          <LineTrend
            key={category.label}
            label={category.label}
            groupIndex={i}
            visible={visible}
          />
        ))}
      </div>

      <p className="mx-auto mt-10 max-w-md text-center text-sm text-ink/50 dark:text-ivory/50">
        {CHANCE_CHART.subheading}
      </p>
    </div>
  );
}
