import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
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
        <RevealOnScroll className="mx-auto max-w-xl text-center">
          <h1 className="font-display text-4xl text-ink sm:text-5xl">
            Services & Pricing
          </h1>
          <p className="mt-4 text-ink/60">
            Straightforward packages with no hidden fees. Not sure which one
            fits?{" "}
            <Link href="/#work" className="underline hover:text-brass">
              See our work
            </Link>{" "}
            or get in touch and we&rsquo;ll help you decide.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <RevealOnScroll key={pkg.id} delay={i * 100}>
              <PackageCard
                pkg={pkg}
                cta={
                  <Link
                    href={`/get-started?package=${pkg.id}`}
                    className={`block w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90 ${
                      pkg.highlight
                        ? "bg-ink text-ivory"
                        : "border border-ink/20 text-ink"
                    }`}
                  >
                    Get started
                  </Link>
                }
              />
            </RevealOnScroll>
          ))}
        </div>

        <SectionDivider className="my-16" />

        <RevealOnScroll className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl text-ink">Add-ons</h2>
          <p className="mt-3 text-ink/60">
            Extend any package with the following.
          </p>
        </RevealOnScroll>

        <div className="mx-auto mt-10 max-w-lg divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/60">
          {ADD_ONS.map((addOn) => (
            <div
              key={addOn.name}
              className="flex items-center justify-between px-6 py-4"
            >
              <span className="text-sm font-medium text-ink">
                {addOn.name}
              </span>
              <span className="text-sm text-ink/60">{addOn.price}</span>
            </div>
          ))}
        </div>

        <SectionDivider className="my-16" />

        <RevealOnScroll className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl text-ink">
            Maintenance & Updates
          </h2>
          <p className="mt-3 text-ink/60">
            Keep your site secure, online, and up to date after launch.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {MAINTENANCE_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl border p-7 ${
                plan.highlight
                  ? "border-brass bg-white shadow-lg shadow-brass/10"
                  : "border-ink/10 bg-white/60"
              }`}
            >
              <h3 className="font-display text-xl text-ink">{plan.name}</h3>
              <div className="mt-3">
                <span className="font-display text-2xl text-ink">
                  {plan.price}
                </span>
                <span className="ml-1 text-sm text-ink/50">
                  {plan.period}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-ink/70"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brass" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink/50">
          {MAINTENANCE_NOTE}
        </p>

        <SectionDivider className="my-16" />

        <div
          id="founding-offer"
          className="mx-auto max-w-2xl scroll-mt-24 rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center sm:p-12"
        >
          <h2 className="font-display text-3xl text-ink">
            {FOUNDING_OFFER.title}
          </h2>
          {FOUNDING_SPOTS_REMAINING > 0 ? (
            <p className="mt-2 text-sm font-medium text-brass">
              {FOUNDING_SPOTS_REMAINING} spots remaining
            </p>
          ) : (
            <p className="mt-2 text-sm font-medium text-ink/50">
              All Founding Client spots are currently filled.
            </p>
          )}
          <ul className="mx-auto mt-6 max-w-md space-y-3 text-left">
            {FOUNDING_OFFER.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-ink/75">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brass" />
                {point}
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-ivory transition-opacity hover:opacity-90"
          >
            Claim your spot
          </Link>
        </div>
      </div>
    </div>
  );
}
