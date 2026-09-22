import SectionDivider from "@/components/SectionDivider";

export const metadata = {
  title: "Blog",
  description: "Notes on web design and small business from Aggrandize Web Co.",
};

// Phase 2 — route reserved, no content yet.
export default function BlogPage() {
  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">Blog</h1>
        <SectionDivider className="my-6" />
        <p className="text-ink/60 dark:text-ivory/60">
          We&rsquo;re just getting started — first posts are on the way.
        </p>
      </div>
    </section>
  );
}
