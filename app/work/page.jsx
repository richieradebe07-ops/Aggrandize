import ProjectCard from "@/components/ProjectCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { PROJECTS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies from Aggrandize Web Co. — real websites built for real Pietermaritzburg small businesses.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-content">
        <RevealOnScroll className="mx-auto max-w-xl text-center">
          <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">Our Work</h1>
          <p className="mt-4 text-ink/60 dark:text-ivory/60">
            Our first published case study — more case studies coming as
            projects launch.
          </p>
        </RevealOnScroll>

        <div className="mx-auto mt-14 max-w-xl">
          {PROJECTS.map((project) => (
            <RevealOnScroll key={project.slug}>
              <ProjectCard project={project} featured />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
