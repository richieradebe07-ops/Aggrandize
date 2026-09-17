"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import PackageFinder from "./PackageFinder";
import { SITE } from "@/lib/content";

export default function Hero() {
  const [finderOpen, setFinderOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
      {/* Decorative only — a faint dot-grid texture and a slow-drifting brass
          glow behind the wordmark. Purely ambient, no content of its own. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(27,26,23,0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 35%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 35%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
      >
        {/* animate-float sets its own `transform`, so the centering
            translate above has to live on a separate parent — a keyframe's
            transform value replaces the whole property, it doesn't compose
            with a sibling utility class on the same element. */}
        <div
          className="h-full w-full animate-float rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(169,130,60,0.35), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl">
        <Logo size="lg" href={null} />

        <p className="mt-8 font-display text-xl italic text-ink/80 sm:text-2xl">
          {SITE.slogan}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/60 sm:text-lg">
          {SITE.valueProp}
        </p>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row">
          <Link
            href="#work"
            className="flex-1 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-brass hover:text-brass"
          >
            Explore Our Work
          </Link>
          <button
            type="button"
            onClick={() => setFinderOpen(true)}
            className="shine-sweep flex-1 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            Find My Package
          </button>
        </div>
      </div>

      <PackageFinder open={finderOpen} onClose={() => setFinderOpen(false)} />
    </section>
  );
}
