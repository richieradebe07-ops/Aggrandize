import SectionHeading from "./SectionHeading";

// A plain text/placeholder block — accreditation notes, compliance text,
// house rules, fees/medical-aid notes, POPIA notes. `items` renders as a
// bullet list instead of/alongside the body paragraph; `placeholder` adds
// the same bracketed, dashed-border treatment used elsewhere for anything
// a real business would need to fill in (e.g. actual accreditation numbers).
export default function InfoBlock({ heading, body, items = [], placeholder = false }) {
  return (
    <section className="px-5 py-10 sm:px-8">
      <div
        className={`mx-auto max-w-2xl rounded-2xl border p-6 ${
          placeholder
            ? "border-dashed border-ink/20 dark:border-ivory/20"
            : "border-ink/10 bg-white/60 dark:border-ivory/10 dark:bg-ivory/5"
        }`}
      >
        <SectionHeading heading={heading} />
        {body && (
          <p className="mt-3 text-center text-sm leading-relaxed text-ink/65 dark:text-ivory/65">
            {body}
          </p>
        )}
        {items.length > 0 && (
          <ul className="mx-auto mt-4 max-w-md list-disc space-y-1.5 pl-5 text-sm text-ink/65 dark:text-ivory/65">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
