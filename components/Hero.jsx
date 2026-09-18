"use client";

import { useState } from "react";
import Logo from "./Logo";
import PackageFinder from "./PackageFinder";
import AmbientBackdrop from "./AmbientBackdrop";
import Button from "./Button";
import { SITE } from "@/lib/content";

export default function Hero() {
  const [finderOpen, setFinderOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-16 text-center sm:px-8 sm:pb-24 sm:pt-24">
      <AmbientBackdrop />

      <div className="relative z-10 mx-auto max-w-2xl">
        <Logo size="lg" href={null} />

        <p className="mt-8 font-display text-xl italic text-ink/80 dark:text-ivory/80 sm:text-2xl">
          {SITE.slogan}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/60 dark:text-ivory/60 sm:text-lg">
          {SITE.valueProp}
        </p>

        <div className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row">
          <Button href="#work" variant="secondary" className="flex-1">
            Explore Our Work
          </Button>
          <Button onClick={() => setFinderOpen(true)} className="flex-1">
            Find My Package
          </Button>
        </div>
      </div>

      <PackageFinder open={finderOpen} onClose={() => setFinderOpen(false)} />
    </section>
  );
}
