import SectionHeading from "./SectionHeading";

// A plain grid of named items with a short description — practice areas,
// trade services, ministries/programmes, anything without a central price.
export default function ServicesOrMenu({ heading, subheading, items = [] }) {
  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mx-auto mt-8 grid max-w-content gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-ink/10 bg-white/60 p-6 dark:border-ivory/10 dark:bg-ivory/5"
          >
            <h3 className="font-display text-lg text-ink dark:text-ivory">{item.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-ivory/65">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
