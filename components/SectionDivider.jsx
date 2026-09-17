import Flourish from "./Flourish";

// Reuses the logo's ascending-flourish motif as a section separator, tying
// every page visually back to the wordmark. Use between major sections
// instead of a plain <hr>.
export default function SectionDivider({ className = "" }) {
  return (
    <div
      className={`flex justify-center py-2 text-brass/70 ${className}`}
      role="presentation"
    >
      <Flourish className="h-5 w-32 sm:w-40" strokeWidth={1.5} />
    </div>
  );
}
