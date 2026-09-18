import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import AmbientBackdrop from "@/components/AmbientBackdrop";
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
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <RevealOnScroll key={pkg.id} delay={i * 100} variant="tech">
              <PackageCard
                pkg={pkg}
                cta={
                  <Link
                    href={`/get-started?package=${pkg.id}`}
                    className={`shine-sweep block w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 ${
                      pkg.highlight
                        ? "bg-ink text-ivory"
                        : "border border-ink/20 text-ink hover:border-brass hover:text-brass"
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

        <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl text-ink">Add-ons</h2>
          <p className="mt-3 text-ink/60">
            Extend any package with the following.
          </p>
        </RevealOnScroll>

        <div className="mx-auto mt-10 max-w-lg divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/60">
          {ADD_ONS.map((addOn) => (
            <div
              key={addOn.name}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-brass/5"
            >
              <span className="text-sm font-medium text-ink">
                {addOn.name}
              </span>
              <span className="text-sm text-ink/60">{addOn.price}</span>
            </div>
          ))}
        </div>

        <SectionDivider className="my-16" />

        <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl text-ink">
            Maintenance & Updates
          </h2>
          <p className="mt-3 text-ink/60">
            Keep your site secure, online, and up to date after launch.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {MAINTENANCE_PLANS.map((plan, i) => (
            <RevealOnScroll key={plan.id} delay={i * 80} variant="tech">
              <div
                className={`h-full rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  plan.highlight
                    ? "border-brass bg-white shadow-lg shadow-brass/10 hover:shadow-xl hover:shadow-brass/20"
                    : "border-ink/10 bg-white/60 hover:shadow-lg hover:shadow-ink/5"
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
            </RevealOnScroll>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink/50">
          {MAINTENANCE_NOTE}
        </p>

        <SectionDivider className="my-16" />

        <RevealOnScroll
          variant="tech"
          as="div"
          id="founding-offer"
          className="mx-auto max-w-2xl scroll-mt-24 rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center sm:p-12"
        >
          <h2 className="font-display text-3xl text-ink">
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
            className="shine-sweep mt-8 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
          >
            Claim your spot
          </Link>
        </RevealOnScroll>
      </div>
    </div>
  );
}
