// Tiny inline loading spinner for a button's "submitting" state — kept to
// opacity/transform (a CSS rotation) so it's cheap and respects
// prefers-reduced-motion like the rest of the site's motion.
export default function Spinner({ className = "" }) {
  return (
    <svg
      className={`h-4 w-4 animate-spin motion-reduce:animate-none ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
