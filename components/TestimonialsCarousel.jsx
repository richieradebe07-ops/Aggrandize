"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";

// TestimonialsCarousel — a single-item-at-a-time quote slider. Purely
// structural and copy-free: pass testimonials as data. Safe to copy into
// other projects as-is.
//
// Props:
//   testimonials  Array of { quote, clientName, businessName? } (default
//                 []). Renders nothing at all when empty, rather than an
//                 empty/broken-looking carousel shell — safe to mount even
//                 before any real content exists.
export default function TestimonialsCarousel({ testimonials = [] }) {
  const [index, setIndex] = useState(0);

  if (testimonials.length === 0) return null;

  const item = testimonials[index];
  const canNavigate = testimonials.length > 1;

  function goTo(i) {
    setIndex((i + testimonials.length) % testimonials.length);
  }

  return (
    <div className="mx-auto max-w-2xl text-center">
      <blockquote className="font-display text-xl italic leading-relaxed text-ink dark:text-ivory sm:text-2xl">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <p className="mt-4 text-sm font-medium text-ink/60 dark:text-ivory/60">
        {item.clientName}
        {item.businessName ? `, ${item.businessName}` : ""}
      </p>

      {canNavigate && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="text-ink/40 transition-colors hover:text-brass dark:text-ivory/40"
          >
            <ChevronDownIcon className="h-4 w-4 rotate-90" />
          </button>
          <div className="flex gap-1.5">
            {testimonials.map((t, i) => (
              <button
                key={t.clientName + i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === index ? "bg-brass" : "bg-ink/20 dark:bg-ivory/20"
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="text-ink/40 transition-colors hover:text-brass dark:text-ivory/40"
          >
            <ChevronDownIcon className="h-4 w-4 -rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
}
