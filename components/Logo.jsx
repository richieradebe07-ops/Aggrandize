import Link from "next/link";
import Flourish from "./Flourish";
import HeroFlourishDraw from "./HeroFlourishDraw";

const SIZES = {
  sm: {
    flourish: "h-3 w-20",
    name: "text-lg",
    rule: "w-4",
    tag: "text-[9px]",
    gap: "gap-1",
  },
  md: {
    flourish: "h-4 w-28",
    name: "text-2xl",
    rule: "w-6",
    tag: "text-[10px]",
    gap: "gap-1.5",
  },
  lg: {
    flourish: "h-5 w-40",
    name: "text-4xl sm:text-5xl",
    rule: "w-10",
    tag: "text-xs",
    gap: "gap-2",
  },
};

// Recreated wordmark per the brand system: ascending flourish, serif
// "Aggrandize", and "WEB CO" in tracked small caps flanked by thin rules.
// Swap this for the real logo SVG/PNG assets once provided — the markup
// below approximates their layout so no other code needs to change.
export default function Logo({ size = "md", href = "/", className = "", animated = false }) {
  const s = SIZES[size];
  // `animated` draws the flourish on with stroke-dashoffset instead of
  // rendering it instantly — opt-in (Hero.jsx only) so the header/footer
  // logo and every SectionDivider stay plain, hook-free server markup.
  const FlourishEl = animated ? HeroFlourishDraw : Flourish;

  const mark = (
    <div className={`flex flex-col items-center ${className}`}>
      <FlourishEl className={`${s.flourish} text-brass mb-1`} />
      <span
        className={`font-display font-semibold text-ink leading-none dark:text-ivory ${s.name}`}
      >
        Aggrandize
      </span>
      <div className={`flex items-center ${s.gap} mt-1.5`}>
        <span className={`h-px bg-brass/60 ${s.rule}`} />
        <span
          className={`font-body font-medium tracking-[0.3em] text-ink/70 dark:text-ivory/70 ${s.tag}`}
        >
          WEB CO
        </span>
        <span className={`h-px bg-brass/60 ${s.rule}`} />
      </div>
    </div>
  );

  if (!href) return mark;

  return (
    <Link href={href} aria-label="Aggrandize Web Co. — home">
      {mark}
    </Link>
  );
}
