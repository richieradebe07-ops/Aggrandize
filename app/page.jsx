import Link from "next/link";
import Hero from "@/components/Hero";
import FoundingBanner from "@/components/FoundingBanner";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProjectCard from "@/components/ProjectCard";
import AccordionItem from "@/components/AccordionItem";
import { PROJECTS, TRUST_POINTS, FAQS } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <FoundingBanner />
      <Hero />

      <SectionDivider />

      <section id="work" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll as="div" className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Recent work
            </h2>
            <p className="mt-3 text-ink/60">
              A look at what we&rsquo;ve built — with more case studies
              landing as each project goes live.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, i) => (
              <RevealOnScroll key={project.slug} delay={i * 100}>
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/work"
              className="text-sm font-semibold text-ink underline decoration-brass/50 underline-offset-4 hover:text-brass"
            >
              See all work
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="bg-ink/[0.03] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-content">
          <RevealOnScroll className="mx-auto max-w-xl text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Why work with an independent studio
            </h2>
            <p className="mt-3 text-ink/60">
              A big agency or a template builder can get you a website. Here&rsquo;s
              what a small, local studio gets you instead.
            </p>
          </RevealOnScroll>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {TRUST_POINTS.map((point, i) => (
              <RevealOnScroll key={point.title} delay={i * 80}>
                <div className="flex gap-4">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brass" />
                  <div>
                    <h3 className="font-display text-lg text-ink">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
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
        <div className="mx-auto max-w-2xl">
          <RevealOnScroll className="text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
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
    </>
  );
}
