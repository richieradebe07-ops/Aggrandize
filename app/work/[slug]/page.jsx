import Link from "next/link";
import { notFound } from "next/navigation";
import SectionDivider from "@/components/SectionDivider";
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
          className="text-sm text-ink/50 underline underline-offset-4 hover:text-ink"
        >
          &larr; All work
        </Link>

        {project.status === "in-progress" && (
          <span className="mt-6 inline-block text-xs font-medium uppercase tracking-wide text-brass">
            In progress
          </span>
        )}
        <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-3 text-lg text-ink/60">{project.tagline}</p>

        <div className="mt-10 flex aspect-video items-center justify-center rounded-2xl bg-ink/5">
          <span className="font-display text-3xl text-ink/25">
            {project.name}
          </span>
        </div>

        <SectionDivider className="my-12" />

        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl text-ink">The problem</h2>
            <p className="mt-3 leading-relaxed text-ink/70">{project.problem}</p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ink">What was built</h2>
            <p className="mt-3 leading-relaxed text-ink/70">
              {project.whatWasBuilt}
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl text-ink">The result</h2>
            <p className="mt-3 leading-relaxed text-ink/70">{project.result}</p>
          </section>
        </div>

        <div className="mt-14 rounded-2xl border border-ink/10 bg-ink/[0.03] p-8 text-center">
          <h3 className="font-display text-xl text-ink">
            Want a site like this one?
          </h3>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-ivory transition-opacity hover:opacity-90"
          >
            Start a project
          </Link>
        </div>
      </div>
    </article>
  );
}
