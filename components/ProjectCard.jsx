import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-ink/10 bg-white/60 transition-shadow hover:shadow-lg hover:shadow-ink/5"
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-ink/5">
        {/* Placeholder visual until real screenshots are ready */}
        <span className="font-display text-2xl text-ink/25">
          {project.name}
        </span>
      </div>
      <div className="p-6">
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
  );
}
