// A very faint paper-grain overlay — inline SVG only (no image request, no
// layout impact: absolutely positioned inset-0 inside a `relative` parent).
// `id` must be unique per usage so two instances on the same page don't
// collide (SVG filter ids are page-global).
export default function GrainTexture({ id, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.04] mix-blend-overlay dark:opacity-[0.06] ${className}`}
    >
      <filter id={id}>
        {/* numOctaves=1 keeps this cheap to rasterize — a second octave
            made the grain marginally finer but wasn't worth the extra
            paint cost on lower-end mobile devices. */}
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
