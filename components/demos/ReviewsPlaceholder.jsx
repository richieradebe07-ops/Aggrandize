// Every demo would, on a real site, show testimonials or review stars here —
// but nothing in a concept demo may look like a real claim, so this is a
// clearly labelled, visually distinct placeholder instead of invented quotes.
export default function ReviewsPlaceholder() {
  return (
    <section className="px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-ink/20 bg-ink/[0.02] p-6 text-center dark:border-ivory/20 dark:bg-ivory/[0.03]">
        <p className="text-sm font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
          [ Your reviews here ]
        </p>
        <p className="mt-1.5 text-xs text-ink/40 dark:text-ivory/40">
          Real sites show real testimonials and review scores in this spot.
        </p>
      </div>
    </section>
  );
}
