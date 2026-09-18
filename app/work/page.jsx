import ProjectCard from "@/components/ProjectCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import { PROJECTS } from "@/lib/content";

export const metadata = {
  title: "Work",
  description:
    "Case studies from Aggrandize Web Co. — real websites built for real Pietermaritzburg small businesses.",
};

export default function WorkPage() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-content">
        <RevealOnScroll className="mx-auto max-w-xl text-center">
          <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">Our Work</h1>
          <p className="mt-4 text-ink/60 dark:text-ivory/60">
            A growing collection of sites built for small businesses that
            wanted something better than a template.
          </p>
        </RevealOnScroll>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={i * 100}>
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
