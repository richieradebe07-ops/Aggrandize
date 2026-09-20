import Image from "next/image";
import RevealOnScroll from "./RevealOnScroll";
import { FOUNDER } from "@/lib/content";

// A short stand-in for the full story the Phase 2 /about page will tell.
// Swap FOUNDER.name in lib/content.js for the real name once available.
export default function FounderTeaser() {
  return (
    <RevealOnScroll
      variant="tech"
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left"
    >
      <Image
        src={FOUNDER.photo}
        alt={FOUNDER.name !== "[Your Name]" ? FOUNDER.name : "Aggrandize's founder"}
        width={112}
        height={112}
        className="h-28 w-28 flex-shrink-0 rounded-full object-cover ring-1 ring-ink/10 dark:ring-ivory/15"
      />
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
