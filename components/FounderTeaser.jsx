import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import { FOUNDER, SITE } from "@/lib/content";

// A short stand-in for the full story the Phase 2 /about page will tell.
// FOUNDER.photo (lib/content.js) can be set falsy to show the initials
// placeholder instead of an <Image> — e.g. while a real photo is pending —
// so swapping in a photo later is just setting that one field.
export default function FounderTeaser() {
  return (
    <RevealOnScroll
      variant="tech"
      className="mx-auto max-w-3xl rounded-2xl border border-ink/10 bg-white/60 p-8 dark:border-ivory/10 dark:bg-ivory/5 sm:p-10"
    >
      <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        {FOUNDER.photo ? (
          <Image
            src={FOUNDER.photo}
            alt={`${FOUNDER.name}, founder of ${SITE.name}`}
            width={112}
            height={112}
            className="h-28 w-28 flex-shrink-0 rounded-full object-cover ring-1 ring-ink/10 dark:ring-ivory/15"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full bg-ivory font-display text-2xl font-semibold text-brass ring-1 ring-brass/30 dark:bg-ink"
          >
            {FOUNDER.initials}
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brass">
            Meet the founder
          </p>
          <p className="mt-2 font-display text-xl text-ink dark:text-ivory">
            {FOUNDER.name}
          </p>
          <p className="mt-1 text-sm font-medium text-ink/50 dark:text-ivory/50">
            {FOUNDER.role}
          </p>
        </div>
      </div>
      <blockquote className="relative mt-6 border-l-2 border-brass pl-6 sm:ml-[7.5rem]">
        <span
          aria-hidden="true"
          className="absolute -left-1 -top-3 font-display text-5xl text-brass/30"
        >
          &ldquo;
        </span>
        <p className="font-display text-lg italic leading-relaxed text-ink dark:text-ivory">
          {FOUNDER.bio}
        </p>
      </blockquote>
    </RevealOnScroll>
  );
}
