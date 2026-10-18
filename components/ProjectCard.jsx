import Link from "next/link";
import Card from "./Card";
import { ArrowUpRightIcon } from "./icons";

// `featured` renders a larger treatment (bigger visual, bigger type) for
// use where a single project stands alone — e.g. the homepage's "Recent
// work" section — rather than the compact grid tile used on /work.
export default function ProjectCard({ project, featured = false }) {
  return (
    <Card padded={false} className="group overflow-hidden">
      <Link href={`/work/${project.slug}`} className="block">
        <div
          className={`flex items-center justify-center bg-ink/5 dark:bg-ivory/5 ${
            featured ? "aspect-[16/9]" : "aspect-[4/3]"
          }`}
        >
          {/* Placeholder visual until real screenshots are ready */}
          <span
            className={`font-display text-ink/25 dark:text-ivory/25 ${
              featured ? "text-4xl" : "text-2xl"
            }`}
          >
            {project.name}
          </span>
        </div>
        <div className={featured ? "p-8 pb-5" : "p-6 pb-4"}>
          {project.isDemo ? (
            <span className="mb-2 inline-block rounded-full border border-ink/15 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-ink/50 dark:border-ivory/20 dark:text-ivory/50">
              Demo project — not an actual client
            </span>
          ) : (
            project.status === "in-progress" && (
              <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wide text-brass">
                In progress
              </span>
            )
          )}
          <h3 className={`font-display text-ink dark:text-ivory ${featured ? "text-2xl" : "text-xl"}`}>
            {project.name}
          </h3>
          <p className={`mt-2 text-ink/60 dark:text-ivory/60 ${featured ? "text-base" : "text-sm"}`}>
            {project.tagline}
          </p>
          <span className="mt-4 inline-block text-sm font-medium text-ink underline decoration-brass/50 underline-offset-4 transition-colors group-hover:text-brass dark:text-ivory">
            View case study
          </span>
        </div>
      </Link>

      {/* Outside the case-study Link — an <a> can't nest inside another <a>. */}
      <div className={`border-t border-ink/10 dark:border-ivory/10 ${featured ? "px-8 py-5" : "px-6 py-4"}`}>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brass transition-opacity hover:opacity-80"
          >
            Visit Live Site
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        ) : (
          <span className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
            {project.isDemo ? "Concept demo — no live site" : "Launching Soon"}
          </span>
        )}
      </div>
    </Card>
  );
}
