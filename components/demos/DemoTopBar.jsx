import Link from "next/link";

// Fixed, slim disclaimer bar shown at the top of every /industries/[slug]
// demo — present regardless of how deep a visitor scrolls, so there's never
// a moment where a demo page could be mistaken for a real business's site.
export default function DemoTopBar({ industrySlug }) {
  return (
    <div className="sticky top-0 z-40 border-b border-ink/10 bg-ink text-ivory dark:border-ivory/10 dark:bg-ivory dark:text-ink">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs sm:px-8">
        <span className="font-medium">
          Concept demo by Aggrandize Web Co. — not a real business
        </span>
        <div className="flex items-center gap-4">
          <Link href="/industries" className="underline underline-offset-2 hover:opacity-80">
            &larr; All industries
          </Link>
          <Link
            href={`/contact?industry=${industrySlug}&requestType=mockup`}
            className="rounded-full bg-brass px-3 py-1 font-semibold text-ink hover:opacity-90"
          >
            Get a site like this
          </Link>
        </div>
      </div>
    </div>
  );
}
