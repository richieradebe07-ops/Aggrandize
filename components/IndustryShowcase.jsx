import Link from "next/link";
import DemoMotif from "./demos/DemoMotif";
import Button from "./Button";
import { DEMOS } from "@/lib/demos";

// The 6 industries shown on the homepage teaser — a cross-section of the
// full /industries hub, not every demo (keeps the homepage light). Order
// matches what the brief asked for.
const TEASER_SLUGS = [
  "salon-beauty",
  "trades-construction",
  "auto-mechanic",
  "law-accounting",
  "bnb-guesthouse",
  "restaurant-bakery",
];

// Compact homepage teaser for the full /industries hub — a heading, one
// line of copy, a horizontally scrollable row of cards, and a CTA to the
// hub. Deliberately light (no filter chips, bullets, or long descriptions)
// so homepage weight/performance doesn't grow with every new industry added
// to lib/demos.js.
export default function IndustryShowcase() {
  const teaserDemos = TEASER_SLUGS.map((slug) => DEMOS.find((d) => d.slug === slug)).filter(Boolean);

  return (
    <div>
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-display-md text-ink dark:text-ivory">
          See it in your industry
        </h2>
        <p className="mt-3 text-ink/60 dark:text-ivory/60">
          Concept demos for salons, trades, guesthouses and more — see what a site built for your
          business could look like.
        </p>
      </div>

      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible lg:grid-cols-6">
        {teaserDemos.map((demo) => (
          <Link
            key={demo.slug}
            href={demo.externalHref || `/industries/${demo.slug}`}
            style={{ "--demo-accent-rgb": demo.accentRgb }}
            className="group flex w-36 flex-shrink-0 flex-col items-center gap-2 rounded-2xl border border-ink/10 bg-white/60 p-4 text-center transition-colors hover:border-[rgba(var(--demo-accent-rgb),0.5)] dark:border-ivory/10 dark:bg-ivory/5 sm:w-auto"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(var(--demo-accent-rgb),0.12)]">
              <DemoMotif motif={demo.motif} className="h-7 w-7 text-[rgb(var(--demo-accent-rgb))]" />
            </div>
            <span className="text-sm font-medium text-ink dark:text-ivory">{demo.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button href="/industries">See all industries</Button>
      </div>
    </div>
  );
}
