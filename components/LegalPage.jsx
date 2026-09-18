export default function LegalPage({ title, lastUpdated, children }) {
  return (
    <article className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-4xl text-ink dark:text-ivory">{title}</h1>
        <p className="mt-2 text-sm text-ink/45 dark:text-ivory/45">Last updated: {lastUpdated}</p>
        <div className="prose-legal mt-10 space-y-8">{children}</div>
      </div>
    </article>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <section>
      <h2 className="font-display text-xl text-ink dark:text-ivory">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink/70 dark:text-ivory/70">
        {children}
      </div>
    </section>
  );
}
