import Link from "next/link";
import Hero from "@/components/Hero";
import FoundingBanner from "@/components/FoundingBanner";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProjectCard from "@/components/ProjectCard";
import PackageCard from "@/components/PackageCard";
import PayDepositLink from "@/components/PayDepositLink";
import AccordionItem from "@/components/AccordionItem";
import ChanceChart from "@/components/ChanceChart";
import FounderTeaser from "@/components/FounderTeaser";
import SpeedProof from "@/components/SpeedProof";
import CarePlanSection from "@/components/CarePlanSection";
import IndustryShowcase from "@/components/IndustryShowcase";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import FAQSchema from "@/components/FAQSchema";
import WhatsAppButton from "@/components/WhatsAppButton";
import Button from "@/components/Button";
import {
  PROJECTS,
  TRUST_POINTS,
  FAQS,
  TESTIMONIALS,
  HOW_IT_WORKS,
  PACKAGES,
  FOUNDING_OFFER,
  FOUNDING_SPOTS_REMAINING,
  PRICING_PROMISE,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <FAQSchema faqs={FAQS} />
      <FoundingBanner />
      <Hero />

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <ChanceChart />
        </div>
      </section>

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
              How it works
            </h2>
            <p className="mt-3 text-ink/60 dark:text-ivory/60">
              From first message to a live site, in five straightforward steps.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {HOW_IT_WORKS.map((step, i) => (
              <RevealOnScroll key={step.title} delay={i * 80} variant="tech">
                <div className="text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-brass/40 font-display text-sm text-brass">
                    {i + 1}
                  </div>
                  <h3 className="mt-3 font-display text-lg text-ink dark:text-ivory">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60 dark:text-ivory/60">
                    {step.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section id="work" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll
            as="div"
            variant="tech"
            className="mx-auto max-w-xl text-center"
          >
            <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
              Recent work
            </h2>
            <p className="mt-3 text-ink/60 dark:text-ivory/60">
              A published client case study, plus a demo showing what we can
              build — more case studies on the way as each new project
              launches.
            </p>
          </RevealOnScroll>

          <div className="mx-auto mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
            {PROJECTS.map((project, i) => (
              <RevealOnScroll key={project.slug} delay={i * 100} variant="tech">
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/work"
              className="text-sm font-semibold text-ink underline decoration-brass/50 underline-offset-4 hover:text-brass dark:text-ivory"
            >
              See all work
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
              Services & Pricing
            </h2>
            <p className="mt-3 text-ink/60 dark:text-ivory/60">
              Straightforward packages with no hidden fees.
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-brass">
              {PRICING_PROMISE}
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <RevealOnScroll key={pkg.id} delay={i * 100} variant="tech">
                <PackageCard
                  pkg={pkg}
                  cta={
                    <div className="space-y-2">
                      <Button
                        href={`/get-started?package=${pkg.id}`}
                        variant={pkg.highlight ? "primary" : "secondary"}
                        className="w-full"
                      >
                        Get started
                      </Button>
                      <PayDepositLink packageId={pkg.id} className="block" />
                    </div>
                  }
                />
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="text-sm font-semibold text-ink underline decoration-brass/50 underline-offset-4 hover:text-brass dark:text-ivory"
            >
              See full pricing, add-ons & maintenance plans
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
              See it in your industry
            </h2>
            <p className="mt-3 text-ink/60 dark:text-ivory/60">
              A look at what a site could look like for a business like yours.
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="tech" delay={100} className="mt-10">
            <IndustryShowcase />
          </RevealOnScroll>
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <>
          <SectionDivider />
          <section className="px-5 py-16 sm:px-8 sm:py-24">
            <div className="mx-auto max-w-content">
              <RevealOnScroll variant="tech">
                <TestimonialsCarousel testimonials={TESTIMONIALS} />
              </RevealOnScroll>
            </div>
          </section>
        </>
      )}

      <SectionDivider />

      <section className="bg-ink/[0.03] px-5 py-16 dark:bg-ivory/[0.04] sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
              Why work with an independent studio
            </h2>
            <p className="mt-3 text-ink/60 dark:text-ivory/60">
              A big agency or a template builder can get you a website. Here&rsquo;s
              what a small, local studio gets you instead.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {TRUST_POINTS.map((point, i) => (
              <RevealOnScroll key={point.title} delay={i * 80} variant="tech">
                <div className="flex gap-4">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brass" />
                  <div>
                    <h3 className="font-display text-lg text-ink dark:text-ivory">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/60 dark:text-ivory/60">
                      {point.description}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
              Built for speed
            </h2>
            <p className="mt-3 text-ink/60 dark:text-ivory/60">
              A fast site isn&rsquo;t a nice-to-have — it&rsquo;s what keeps visitors
              from leaving before they see what you offer.
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="tech" delay={100} className="mt-10">
            <SpeedProof />
          </RevealOnScroll>
        </div>
      </section>

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <FounderTeaser />
        </div>
      </section>

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <RevealOnScroll variant="tech" className="text-center">
            <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
              Common questions
            </h2>
          </RevealOnScroll>

          <div className="mt-10">
            {FAQS.map((faq) => (
              <AccordionItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll variant="tech" className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
              Keep it running smoothly
            </h2>
            <p className="mt-3 text-ink/60 dark:text-ivory/60">
              A website is never really &ldquo;done&rdquo; — small updates keep it working for
              you.
            </p>
          </RevealOnScroll>
          <RevealOnScroll variant="tech" delay={100} className="mt-10">
            <CarePlanSection />
          </RevealOnScroll>
        </div>
      </section>

      <SectionDivider />

      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center sm:p-12">
          <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
            Ready to get started?
          </h2>
          {FOUNDING_SPOTS_REMAINING > 0 && (
            <p className="mt-2 flex items-center justify-center gap-1.5 text-sm font-medium text-brass">
              <span className="relative inline-flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brass" />
              </span>
              {FOUNDING_SPOTS_REMAINING} Founding Client spots remaining —{" "}
              {FOUNDING_OFFER.points[0]}
            </p>
          )}
          <p className="mx-auto mt-4 max-w-md text-ink/65 dark:text-ivory/65">
            Send us a brief and we&rsquo;ll reply with next steps within 24
            hours.
          </p>
          <div className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-3">
            <Button href="/contact" className="w-full">
              Contact us
            </Button>
            <WhatsAppButton variant="button" label="WhatsApp a question" />
          </div>
        </div>
      </section>
    </>
  );
}
