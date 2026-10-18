import Link from "next/link";
import Hero from "@/components/Hero";
import FoundingBanner from "@/components/FoundingBanner";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProjectCard from "@/components/ProjectCard";
import PackageCard from "@/components/PackageCard";
import AccordionItem from "@/components/AccordionItem";
import ChanceChart from "@/components/ChanceChart";
import FounderTeaser from "@/components/FounderTeaser";
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
              Our first published case study — more are on the way as each
              new project launches.
            </p>
          </RevealOnScroll>

          <div className="mx-auto mt-12 max-w-xl">
            {PROJECTS.map((project) => (
              <RevealOnScroll key={project.slug} variant="tech">
                <ProjectCard project={project} featured />
              </RevealOnScroll>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-sm text-center text-sm text-ink/50 dark:text-ivory/50">
            More case studies coming as projects launch.
          </p>

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
          </RevealOnScroll>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
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
            Message us on WhatsApp for the fastest reply, or head to the
            contact page to send a brief.
          </p>
          <div className="mx-auto mt-8 flex max-w-sm flex-col gap-4 sm:flex-row">
            <WhatsAppButton variant="button" className="flex-1" />
            <Button href="/contact" variant="secondary" className="flex-1">
              Contact us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
