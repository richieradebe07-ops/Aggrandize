import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import Button from "@/components/Button";
import DeviceFrameShowcase from "@/components/DeviceFrameShowcase";
import { ArrowUpRightIcon } from "@/components/icons";
import { PROJECTS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/work"
          className="text-sm text-ink/50 underline underline-offset-4 hover:text-ink dark:text-ivory/50 dark:hover:text-ivory"
        >
          &larr; All work
        </Link>

        {project.isDemo ? (
          <div className="mt-6 rounded-lg border border-ink/15 bg-ink/[0.03] px-4 py-3 text-sm text-ink/70 dark:border-ivory/20 dark:bg-ivory/[0.04] dark:text-ivory/70">
            <span className="font-medium uppercase tracking-wide text-ink/50 dark:text-ivory/50">
              Demo project
            </span>{" "}
            — this is not an actual client. It was built to show what we can do, not to
            claim a real client relationship or outcome.
          </div>
        ) : (
          project.status === "in-progress" && (
            <span className="mt-6 inline-block text-xs font-medium uppercase tracking-wide text-brass">
              In progress
            </span>
          )
        )}

        {project.logo && (
          <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-xl border border-ink/10 bg-white p-2.5 dark:border-ivory/10">
            <Image
              src={project.logo}
              alt={`${project.name} logo`}
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>
        )}

        <h1 className="mt-3 font-display text-display-lg text-ink dark:text-ivory">
          {project.name}
        </h1>
        <p className="mt-3 text-lg text-ink/60 dark:text-ivory/60">{project.tagline}</p>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brass transition-opacity hover:opacity-80"
          >
            Visit Live Site
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="mt-5 inline-block text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
            {project.isDemo ? "Concept demo — no live site" : "Launching Soon"}
          </span>
        )}

        <RevealOnScroll variant="tech" className="mt-10">
          <DeviceFrameShowcase
            projectName={project.name}
            screenshots={project.screenshots}
          />
        </RevealOnScroll>

        <SectionDivider className="my-12" />

        <div className="space-y-10">
          <RevealOnScroll as="section" variant="tech">
            <h2 className="font-display text-2xl text-ink dark:text-ivory">The problem</h2>
            <p className="mt-3 leading-relaxed text-ink/70 dark:text-ivory/70">{project.problem}</p>
          </RevealOnScroll>
          <RevealOnScroll as="section" variant="tech">
            <h2 className="font-display text-2xl text-ink dark:text-ivory">What was built</h2>
            <p className="mt-3 leading-relaxed text-ink/70 dark:text-ivory/70">
              {project.whatWasBuilt}
            </p>
          </RevealOnScroll>
          <RevealOnScroll as="section" variant="tech">
            <h2 className="font-display text-2xl text-ink dark:text-ivory">The result</h2>
            <p className="mt-3 leading-relaxed text-ink/70 dark:text-ivory/70">{project.result}</p>
          </RevealOnScroll>

          {project.metrics?.length > 0 && (
            <RevealOnScroll as="section" variant="tech">
              <h2 className="font-display text-2xl text-ink dark:text-ivory">In numbers</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-ink/10 bg-ink/[0.03] p-5 text-center dark:border-ivory/10 dark:bg-ivory/[0.04]"
                  >
                    <p className="font-display text-3xl text-brass">{metric.value}</p>
                    <p className="mt-1.5 text-sm text-ink/60 dark:text-ivory/60">{metric.label}</p>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          )}

          {project.testimonial?.quote && (
            <RevealOnScroll as="section" variant="tech">
              <blockquote className="relative border-l-2 border-brass pl-6">
                <span
                  aria-hidden="true"
                  className="absolute -left-1 -top-2 font-display text-5xl text-brass/30"
                >
                  &ldquo;
                </span>
                <p className="font-display text-xl italic leading-relaxed text-ink dark:text-ivory">
                  {project.testimonial.quote}
                </p>
              </blockquote>
              <p className="mt-3 pl-6 text-sm text-ink/50 dark:text-ivory/50">
                {project.testimonial.clientName}
                {project.testimonial.businessName ? `, ${project.testimonial.businessName}` : ""}
              </p>
            </RevealOnScroll>
          )}
        </div>

        <div className="mt-14 rounded-2xl border border-ink/10 bg-ink/[0.03] p-8 text-center dark:border-ivory/10 dark:bg-ivory/[0.04]">
          <h3 className="font-display text-xl text-ink dark:text-ivory">
            Want a site like this one?
          </h3>
          <Button href="/contact" className="mt-4">
            Start a project
          </Button>
        </div>
      </div>
    </article>
  );
}
