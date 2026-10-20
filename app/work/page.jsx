import ProjectCard from "@/components/ProjectCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import SectionDivider from "@/components/SectionDivider";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
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
          <h1 className="font-display text-display-lg text-ink dark:text-ivory">Our Work</h1>
          <p className="mt-4 text-ink/60 dark:text-ivory/60">
            A published client case study, plus a demo project showing what
            we can build — more case studies coming as projects launch.
          </p>
        </RevealOnScroll>

        <div className="mx-auto mt-14 grid max-w-3xl gap-8 sm:grid-cols-2">
          {PROJECTS.map((project, i) => (
            <RevealOnScroll key={project.slug} delay={i * 100}>
              <ProjectCard project={project} />
            </RevealOnScroll>
          ))}
        </div>

        <SectionDivider className="my-16" />

        <RevealOnScroll className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl text-ink dark:text-ivory">Before &amp; after</h2>
          <p className="mt-3 text-ink/60 dark:text-ivory/60">
            Drag the slider to compare. We don&rsquo;t have a real redesign to show yet —
            below is the component itself, with clearly marked placeholders, ready for our
            first one.
          </p>
          <div className="mt-8">
            <BeforeAfterSlider
              beforeLabel="Before (placeholder)"
              afterLabel="After (placeholder)"
              ariaLabel="Placeholder before and after comparison — no real redesign yet"
              beforeContent={
                <div className="flex h-full w-full items-center justify-center bg-ink/10 dark:bg-ivory/10">
                  <span className="font-display text-lg text-ink/40 dark:text-ivory/40">
                    [Placeholder — old site]
                  </span>
                </div>
              }
              afterContent={
                <div className="flex h-full w-full items-center justify-center bg-brass/15">
                  <span className="font-display text-lg text-brass">
                    [Placeholder — new build]
                  </span>
                </div>
              }
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
