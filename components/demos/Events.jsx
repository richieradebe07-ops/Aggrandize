import SectionHeading from "./SectionHeading";

// A simple dated list — church/community events calendar.
export default function Events({ heading, subheading, items = [] }) {
  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mx-auto mt-8 max-w-xl space-y-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-4 rounded-xl border border-ink/10 bg-white/60 p-4 dark:border-ivory/10 dark:bg-ivory/5"
          >
            <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-[rgba(var(--demo-accent-rgb),0.15)] text-[rgb(var(--demo-accent-rgb))]">
              <span className="text-[10px] font-semibold uppercase">{item.date}</span>
            </div>
            <div>
              <p className="font-medium text-ink dark:text-ivory">{item.title}</p>
              <p className="mt-1 text-sm text-ink/60 dark:text-ivory/60">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
