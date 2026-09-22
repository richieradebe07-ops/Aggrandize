// Card — shared boxed-surface primitive for portfolio items, pricing tiers,
// plans, and similar content blocks. Purely structural and copy-free: supply
// your own content as children. Safe to copy into other projects as-is.
//
// Props:
//   as          React element/tag to render (default "div"). Pass "li", a
//               Next.js <Link>, etc. when the card itself needs to be that
//               element.
//   highlighted boolean (default false). Swaps the neutral border for a
//               brass border + brass-tinted shadow, for a featured card.
//   hoverLift   boolean (default true). Lifts slightly and deepens the
//               shadow on hover. Set false for cards that shouldn't react.
//   padded      boolean (default true). Applies the default inner padding.
//               Set false when a child needs edge-to-edge content (e.g. an
//               image flush with the card's top edge).
//   className   extra classes merged on top of the defaults.
//   ...rest     forwarded to the underlying element (href, onClick, etc.).
export default function Card({
  as: Tag = "div",
  highlighted = false,
  hoverLift = true,
  padded = true,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "relative rounded-2xl border transition-all duration-300",
    highlighted
      ? "border-brass bg-white shadow-lg shadow-brass/10 dark:bg-ink/40"
      : "border-ink/10 bg-white/60 dark:border-ivory/10 dark:bg-ivory/5",
    hoverLift &&
      (highlighted
        ? "hover:-translate-y-1 hover:shadow-xl hover:shadow-brass/20"
        : "hover:-translate-y-1 hover:shadow-lg hover:shadow-ink/5 dark:hover:shadow-black/20"),
    padded && "p-7",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
