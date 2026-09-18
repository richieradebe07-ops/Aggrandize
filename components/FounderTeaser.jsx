import RevealOnScroll from "./RevealOnScroll";
import { PersonIcon } from "./icons";
import { FOUNDER } from "@/lib/content";

// A short stand-in for the full story the Phase 2 /about page will tell.
// Swap the placeholder circle for a real photo (and FOUNDER.name in
// lib/content.js) once available.
export default function FounderTeaser() {
  return (
    <RevealOnScroll
      variant="tech"
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left"
    >
      <div
        className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink/30 dark:bg-ivory/10 dark:text-ivory/30"
        aria-hidden="true"
      >
        <PersonIcon className="h-10 w-10" />
      </div>
      <div>
        <h2 className="font-display text-2xl text-ink dark:text-ivory">
          Meet the founder
        </h2>
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
