import Link from "next/link";
import { notFound } from "next/navigation";
import SectionDivider from "@/components/SectionDivider";
import Button from "@/components/Button";
import { ArrowUpRightIcon } from "@/components/icons";
import { PROJECTS } from "@/lib/content";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
  };
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

        {project.status === "in-progress" && (
          <span className="mt-6 inline-block text-xs font-medium uppercase tracking-wide text-brass">
            In progress
          </span>
        )}
        <h1 className="mt-3 font-display text-4xl text-ink dark:text-ivory sm:text-5xl">
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
            Launching Soon
          </span>
        )}

        <div className="mt-10 flex aspect-video items-center justify-center rounded-2xl bg-ink/5 dark:bg-ivory/5">
          <span className="font-display text-3xl text-ink/25 dark:text-ivory/25">
            {project.name}
          </span>
        </div>

        <SectionDivider className="my-12" />

        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl text-ink dark:text-ivory">The problem</h2>
            <p className="mt-3 leading-relaxed text-ink/70 dark:text-ivory/70">{project.problem}</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ink dark:text-ivory">What was built</h2>
            <p className="mt-3 leading-relaxed text-ink/70 dark:text-ivory/70">
              {project.whatWasBuilt}
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ink dark:text-ivory">The result</h2>
            <p className="mt-3 leading-relaxed text-ink/70 dark:text-ivory/70">{project.result}</p>
          </section>

          {project.testimonial?.quote && (
            <section>
              <blockquote className="border-l-2 border-brass pl-5 font-display text-xl italic leading-relaxed text-ink dark:text-ivory">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <p className="mt-3 text-sm text-ink/50 dark:text-ivory/50">
                {project.testimonial.clientName}
                {project.testimonial.businessName ? `, ${project.testimonial.businessName}` : ""}
              </p>
            </section>
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
