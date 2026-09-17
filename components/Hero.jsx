"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import PackageFinder from "./PackageFinder";
import { SITE } from "@/lib/content";

export default function Hero() {
  const [finderOpen, setFinderOpen] = useState(false);

  return (
    <section className="px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
      <div className="mx-auto max-w-2xl">
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
            className="flex-1 rounded-full border border-ink/20 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-brass hover:text-brass"
          >
            Explore Our Work
          </Link>
          <button
            type="button"
            onClick={() => setFinderOpen(true)}
            className="flex-1 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-ivory transition-opacity hover:opacity-90"
          >
            Find My Package
          </button>
        </div>
      </div>

      <PackageFinder open={finderOpen} onClose={() => setFinderOpen(false)} />
    </section>
  );
}
