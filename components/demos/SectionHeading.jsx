// Shared heading treatment for every section component below — keeps
// spacing and typography consistent without each one repeating it.
export default function SectionHeading({ heading, subheading }) {
  if (!heading) return null;
  return (
    <div className="mx-auto max-w-xl text-center">
      <h2 className="font-display text-3xl text-ink dark:text-ivory">{heading}</h2>
      {subheading && <p className="mt-2 text-sm text-ink/60 dark:text-ivory/60">{subheading}</p>}
    </div>
  );
}
