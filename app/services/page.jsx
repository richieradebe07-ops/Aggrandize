import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { DownloadIcon } from "@/components/icons";
import {
  PACKAGES,
  ADD_ONS,
  MAINTENANCE_PLANS,
  MAINTENANCE_NOTE,
  FOUNDING_OFFER,
  FOUNDING_SPOTS_REMAINING,
} from "@/lib/content";

export const metadata = {
  title: "Services & Pricing",
  description:
    "Website packages, add-ons, and maintenance plans from Aggrandize Web Co.",
};

export default function ServicesPage() {
  return (
    <div className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-content">
        <div className="relative overflow-hidden rounded-3xl py-8">
          <AmbientBackdrop />
          <RevealOnScroll
            variant="tech"
            className="relative z-10 mx-auto max-w-xl text-center"
          >
            <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">
              Services & Pricing
            </h1>
            <p className="mt-4 text-ink/60 dark:text-ivory/60">
              Straightforward packages with no hidden fees. Not sure which one
              fits?{" "}
              <Link href="/#work" className="underline hover:text-brass">
                See our work
              </Link>{" "}
              or get in touch and we&rsquo;ll help you decide.
            </p>
            <a
              href="/api/pricing-pdf"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brass hover:opacity-80"
            >
              <DownloadIcon className="h-4 w-4" />
              Download our pricing (PDF)
            </a>
          </RevealOnScroll>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <RevealOnScroll key={pkg.id} delay={i * 100} variant="tech">
              <PackageCard
                pkg={pkg}
                cta={
                  <Button
                    href={`/get-started?package=${pkg.id}`}
                    variant={pkg.highlight ? "primary" : "secondary"}
                    className="w-full"
                  >
                    Get started
                  </Button>
                }
              />
            </RevealOnScroll>
          ))}
        </div>

        <SectionDivider className="my-16" />

        <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl text-ink dark:text-ivory">Add-ons</h2>
          <p className="mt-3 text-ink/60 dark:text-ivory/60">
            Extend any package with the following.
          </p>
        </RevealOnScroll>

        <div className="mx-auto mt-10 max-w-lg divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/60 dark:divide-ivory/10 dark:border-ivory/10 dark:bg-ivory/5">
          {ADD_ONS.map((addOn) => (
            <div
              key={addOn.name}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-brass/5"
            >
              <span className="text-sm font-medium text-ink dark:text-ivory">
                {addOn.name}
              </span>
              <span className="text-sm text-ink/60 dark:text-ivory/60">{addOn.price}</span>
            </div>
          ))}
        </div>

        <SectionDivider className="my-16" />

        <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl text-ink dark:text-ivory">
            Maintenance & Updates
          </h2>
          <p className="mt-3 text-ink/60 dark:text-ivory/60">
            Keep your site secure, online, and up to date after launch.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {MAINTENANCE_PLANS.map((plan, i) => (
            <RevealOnScroll key={plan.id} delay={i * 80} variant="tech">
              <Card highlighted={plan.highlight} className="h-full">
                <h3 className="font-display text-xl text-ink dark:text-ivory">{plan.name}</h3>
                <div className="mt-3">
                  <span className="font-display text-2xl text-ink dark:text-ivory">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-sm text-ink/50 dark:text-ivory/50">
                    {plan.period}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-ink/70 dark:text-ivory/70"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brass" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink/50 dark:text-ivory/50">
          {MAINTENANCE_NOTE}
        </p>

        <SectionDivider className="my-16" />

        <RevealOnScroll
          variant="tech"
          as="div"
          id="founding-offer"
          className="mx-auto max-w-2xl scroll-mt-24 rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center sm:p-12"
        >
          <h2 className="font-display text-3xl text-ink dark:text-ivory">
            {FOUNDING_OFFER.title}
          </h2>
          {FOUNDING_SPOTS_REMAINING > 0 ? (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-brass">
              <span className="relative inline-flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brass" />
              </span>
              {FOUNDING_SPOTS_REMAINING} spots remaining
            </p>
          ) : (
            <p className="mt-2 text-sm font-medium text-ink/50 dark:text-ivory/50">
              All Founding Client spots are currently filled.
            </p>
          )}
          <ul className="mx-auto mt-6 max-w-md space-y-3 text-left">
            {FOUNDING_OFFER.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ink/75 dark:text-ivory/75">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brass" />
                {point}
              </li>
            ))}
          </ul>
          {FOUNDING_SPOTS_REMAINING > 0 && (
            <Button href="/get-started?founding=1" className="mt-8">
              Claim your spot
            </Button>
          )}
        </RevealOnScroll>
      </div>
    </div>
  );
}
