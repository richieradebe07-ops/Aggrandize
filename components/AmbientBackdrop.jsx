// Decorative only — a faint dot-grid texture plus a slow-drifting brass glow.
// Drop into any `relative overflow-hidden` container to get the same ambient
// "techy" backdrop used behind the homepage hero. Purely visual, no content
// of its own, so it's always aria-hidden.
//
// The dot color is driven by the --dot-rgb custom property (globals.css),
// which flips between ink and ivory under .dark — inline styles can't take
// a `dark:` Tailwind variant directly, so this is the one place that needs
// to reach for a CSS variable instead of a utility class.
export default function AmbientBackdrop() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(var(--dot-rgb), 0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 60% 55% at 50% 35%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 55% at 50% 35%, black 30%, transparent 75%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
      >
        {/* animate-float sets its own `transform`, so the centering translate
            above has to live on this parent — a keyframe's transform value
            replaces the whole property rather than composing with it. */}
        <div
          className="h-full w-full animate-float rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(var(--glow-rgb), 0.35), transparent 70%)",
          }}
        />
      </div>
    </>
  );
}
