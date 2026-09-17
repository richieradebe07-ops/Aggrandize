import SectionDivider from "@/components/SectionDivider";

export const metadata = {
  title: "About",
  description: "The story behind Aggrandize Web Co.",
};

// Phase 2 — route reserved, content to follow (founder story,
// Pietermaritzburg roots, the meaning behind "Aggrandize").
export default function AboutPage() {
  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">About</h1>
        <SectionDivider className="my-6" />
        <p className="text-ink/60">
          Our story is coming soon — including why we chose the name
          &ldquo;Aggrandize&rdquo;, and why Pietermaritzburg is home base.
        </p>
      </div>
    </section>
  );
}
