import SectionHeading from "./SectionHeading";

// Numbered steps/timeline — "how we work", a daily routine, anything
// sequential.
export default function Steps({ heading, subheading, steps = [] }) {
  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <ol className="mx-auto mt-8 max-w-xl space-y-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(var(--demo-accent-rgb),0.15)] text-sm font-semibold text-[rgb(var(--demo-accent-rgb))]">
              {i + 1}
            </span>
            <div>
              <p className="font-medium text-ink dark:text-ivory">{step.title}</p>
              <p className="mt-1 text-sm text-ink/60 dark:text-ivory/60">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
