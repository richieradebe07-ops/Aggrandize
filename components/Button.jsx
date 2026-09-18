import Link from "next/link";

// Button — shared CTA component with two visual variants, used consistently
// across every call-to-action on the site. Purely structural and copy-free:
// supply the label as children. Safe to copy into other projects as-is.
//
// Renders as:
//   - a Next.js <Link>   when `href` is set (internal navigation)
//   - a plain <a>        when `href` is set with `external`
//   - a native <button>  otherwise (for onClick / form submit)
//
// Props:
//   variant   "primary" | "secondary" (default "primary"). Primary is a
//             solid filled pill with a hover shine-sweep; secondary is
//             outlined and turns brass on hover.
//   href      string. If set, renders as a link instead of a button.
//   external  boolean (default false). With `href`, opens in a new tab with
//             rel="noopener noreferrer" instead of using client-side routing.
//   type      "button" | "submit" (native button only, default "button").
//   disabled  boolean (native button only, default false).
//   className extra classes merged on top of the variant defaults (e.g. to
//             adjust width or padding for a specific placement).
//   ...rest   forwarded to the underlying element (onClick, aria-*, etc.).
const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-40";

const VARIANT_CLASSES = {
  primary:
    "shine-sweep bg-ink text-ivory hover:opacity-90 dark:bg-brass dark:text-ink",
  secondary:
    "border border-ink/20 text-ink hover:border-brass hover:text-brass dark:border-ivory/25 dark:text-ivory",
};

export default function Button({
  variant = "primary",
  href,
  external = false,
  type = "button",
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}
