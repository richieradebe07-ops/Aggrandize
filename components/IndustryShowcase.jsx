import Link from "next/link";
import Card from "./Card";
import { ArrowUpRightIcon } from "./icons";
import { INDUSTRY_SHOWCASE } from "@/lib/content";

// Cards for each industry niche — only "Restaurant / Bakery" links
// anywhere real (the Braai & Bake demo case study); the rest are
// deliberately non-clickable "Coming soon" placeholders rather than dead
// links or a fabricated demo.
export default function IndustryShowcase() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {INDUSTRY_SHOWCASE.map((industry) =>
        industry.href ? (
          <Link key={industry.label} href={industry.href} className="group block">
            <Card className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <h3 className="font-display text-lg text-ink dark:text-ivory">{industry.label}</h3>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brass transition-opacity group-hover:opacity-80">
                See the demo
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </span>
            </Card>
          </Link>
        ) : (
          <Card
            key={industry.label}
            hoverLift={false}
            className="flex h-full flex-col items-center justify-center gap-3 text-center opacity-70"
          >
            <h3 className="font-display text-lg text-ink dark:text-ivory">{industry.label}</h3>
            <span className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
              Coming soon
            </span>
          </Card>
        )
      )}
    </div>
  );
}
