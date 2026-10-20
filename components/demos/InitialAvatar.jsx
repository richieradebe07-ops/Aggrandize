// A colored circle with initials — stands in for a team photo so demo sites
// never need a stock headshot. Color comes from the demo's own accent
// (--demo-accent-rgb, set by the page wrapper), so every avatar on a given
// demo matches its palette automatically.
export default function InitialAvatar({ name, className = "h-14 w-14" }) {
  const initials = (name || "")
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center rounded-full bg-[rgba(var(--demo-accent-rgb),0.15)] font-display text-[rgb(var(--demo-accent-rgb))] ${className}`}
      aria-hidden="true"
    >
      <span className="text-base font-semibold">{initials || "—"}</span>
    </div>
  );
}
