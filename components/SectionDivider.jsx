import Flourish from "./Flourish";

// SectionDivider — a thin ascending-flourish line used as a section
// separator instead of a plain <hr>, tying every page visually back to the
// wordmark. Purely structural and copy-free. Safe to copy into other
// projects as-is (swap Flourish.jsx's path for a different brand's motif).
//
// Props:
//   className    extra classes merged onto the wrapping element (e.g.
//                vertical margin between sections).
//   color        text-color class controlling the flourish's stroke, since
//                Flourish draws with currentColor (default "text-brass/70").
//   widthClassName  responsive width classes for the flourish (default
//                "w-32 sm:w-40").
//   strokeWidth  numeric stroke width passed through to Flourish (default 1.5).
export default function SectionDivider({
  className = "",
  color = "text-brass/70",
  widthClassName = "w-32 sm:w-40",
  strokeWidth = 1.5,
}) {
  return (
    <div
      className={`flex justify-center py-2 ${color} ${className}`}
      role="presentation"
    >
      <Flourish className={`h-5 ${widthClassName}`} strokeWidth={strokeWidth} />
    </div>
  );
}
