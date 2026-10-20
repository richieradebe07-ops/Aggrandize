"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import DemoMotif from "./DemoMotif";
import { CloseIcon } from "../icons";

// Decorative gallery — gradient/pattern tiles with a motif and caption, no
// photos anywhere. `lightbox` opens a larger view of the same CSS tile.
export default function Gallery({ heading, subheading, items = [], motif = "waves", lightbox = false }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mx-auto mt-8 grid max-w-content grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => lightbox && setOpenIndex(i)}
            className={`group relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-[rgba(var(--demo-accent-rgb),0.1)] dark:border-ivory/10 ${
              lightbox ? "cursor-zoom-in" : "cursor-default"
            }`}
          >
            <DemoMotif
              motif={motif}
              className="h-10 w-10 text-[rgb(var(--demo-accent-rgb))] opacity-70 transition-transform group-hover:scale-110"
            />
            <span className="absolute bottom-2 left-0 right-0 text-center text-xs font-medium text-ink/60 dark:text-ivory/60">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {lightbox && openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={items[openIndex]?.label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 dark:bg-black/90"
          onClick={() => setOpenIndex(null)}
        >
          <div
            className="relative flex aspect-square w-full max-w-md items-center justify-center rounded-2xl bg-[rgba(var(--demo-accent-rgb),0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <DemoMotif motif={motif} className="h-20 w-20 text-[rgb(var(--demo-accent-rgb))]" />
            <p className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium text-ivory">
              {items[openIndex]?.label}
            </p>
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full bg-ivory/90 p-1.5 text-ink"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
