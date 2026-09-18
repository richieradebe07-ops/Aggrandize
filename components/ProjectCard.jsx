import Link from "next/link";
import { ArrowUpRightIcon } from "./icons";

export default function ProjectCard({ project }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition-shadow hover:shadow-lg hover:shadow-ink/5">
      <Link href={`/work/${project.slug}`} className="block">
        <div className="flex aspect-[4/3] items-center justify-center bg-ink/5">
          {/* Placeholder visual until real screenshots are ready */}
          <span className="font-display text-2xl text-ink/25">
            {project.name}
          </span>
        </div>
        <div className="p-6 pb-4">
          {project.status === "in-progress" && (
            <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wide text-brass">
              In progress
            </span>
          )}
          <h3 className="font-display text-xl text-ink">{project.name}</h3>
          <p className="mt-2 text-sm text-ink/60">{project.tagline}</p>
          <span className="mt-4 inline-block text-sm font-medium text-ink underline decoration-brass/50 underline-offset-4 transition-colors group-hover:text-brass">
            View case study
          </span>
        </div>
      </Link>

      {/* Outside the case-study Link — an <a> can't nest inside another <a>. */}
      <div className="border-t border-ink/10 px-6 py-4">
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
          <span className="text-xs font-medium uppercase tracking-wide text-ink/40">
            Launching Soon
          </span>
        )}
      </div>
    </div>
  );
}
