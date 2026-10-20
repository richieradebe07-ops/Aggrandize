"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "./Card";
import DemoMotif from "./demos/DemoMotif";
import { ArrowUpRightIcon } from "./icons";
import { DEMO_CATEGORIES } from "@/lib/demos";

// Client-side category filter + grid — the only interactive piece of the
// /industries hub. `demos` is passed down from the server page so this
// never needs its own data fetch.
export default function IndustriesGrid({ demos }) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? demos : demos.filter((d) => d.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by industry category">
        {DEMO_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              active === cat
                ? "border-brass bg-brass/10 text-brass"
                : "border-ink/15 text-ink/60 hover:border-brass/50 dark:border-ivory/20 dark:text-ivory/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((demo) => (
          <Card
            key={demo.slug}
            style={{ "--demo-accent-rgb": demo.accentRgb }}
            className="flex h-full flex-col"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-[rgba(var(--demo-accent-rgb),0.12)]">
                <DemoMotif motif={demo.motif} className="h-8 w-8 text-[rgb(var(--demo-accent-rgb))]" />
              </div>
              <div>
                <h3 className="font-display text-lg text-ink dark:text-ivory">{demo.name}</h3>
                <span className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
                  {demo.category}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-ink/65 dark:text-ivory/65">{demo.pitch}</p>

            <ul className="mt-4 flex-1 space-y-1.5">
              {demo.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2 text-xs text-ink/55 dark:text-ivory/55"
                >
                  <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-[rgb(var(--demo-accent-rgb))]" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <Link
                href={demo.externalHref || `/industries/${demo.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-[rgba(var(--demo-accent-rgb),0.6)] hover:text-[rgb(var(--demo-accent-rgb))] dark:border-ivory/20 dark:text-ivory"
              >
                View demo
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </Link>
              <Link
                href={`/contact?industry=${demo.slug}&requestType=mockup`}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[rgb(var(--demo-accent-rgb))] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Free mockup
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center text-sm text-ink/50 dark:text-ivory/50">
          No demos in this category yet — more are on the way.
        </p>
      )}
    </div>
  );
}
