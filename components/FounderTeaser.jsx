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
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left"
    >
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
        <h2 className="font-display text-2xl text-ink dark:text-ivory">
          Meet the founder
        </h2>
        <p className="mt-3 font-display text-lg text-ink dark:text-ivory">
          {FOUNDER.name}
        </p>
        <p className="mt-1 text-sm font-medium uppercase tracking-wide text-brass">
          {FOUNDER.role}
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70 dark:text-ivory/70">
          {FOUNDER.bio}
        </p>
      </div>
    </RevealOnScroll>
  );
}
