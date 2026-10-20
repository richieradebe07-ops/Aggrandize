// Decorative, brand-neutral SVG motifs — no photos or stock art anywhere in
// the demo engine, per the brief. Each motif is a simple abstract line-art
// pattern drawn with currentColor, reused as both the hub card thumbnail and
// each demo's hero decoration, so a given industry always looks the same.
// Add a new industry by adding a key here and referencing it from lib/demos.js.
const MOTIFS = {
  scissors: (
    <>
      <circle cx="24" cy="60" r="8" />
      <circle cx="24" cy="24" r="8" />
      <path d="M30 30 L78 78 M30 54 L78 6" />
    </>
  ),
  spanner: (
    <>
      <path d="M20 64 L48 36" strokeWidth="6" strokeLinecap="round" />
      <path d="M56 12 a14 14 0 1 0 16 16 l-7 -2 -3 -7 2 -7 z" />
      <circle cx="18" cy="66" r="7" />
    </>
  ),
  gear: (
    <>
      <circle cx="42" cy="42" r="16" />
      <circle cx="42" cy="42" r="5" fill="currentColor" stroke="none" />
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI) / 4;
        const x1 = 42 + Math.cos(angle) * 18;
        const y1 = 42 + Math.sin(angle) * 18;
        const x2 = 42 + Math.cos(angle) * 26;
        const y2 = 42 + Math.sin(angle) * 26;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="5" strokeLinecap="round" />;
      })}
    </>
  ),
  scales: (
    <>
      <line x1="42" y1="8" x2="42" y2="70" />
      <line x1="12" y1="24" x2="72" y2="24" />
      <path d="M12 24 l-8 20 a9 9 0 0 0 16 0 z" />
      <path d="M72 24 l-8 20 a9 9 0 0 0 16 0 z" />
      <line x1="30" y1="70" x2="54" y2="70" />
    </>
  ),
  roofline: (
    <>
      <path d="M6 48 L42 16 L78 48" />
      <path d="M16 48 V72 H68 V48" />
      <line x1="42" y1="48" x2="42" y2="72" />
    </>
  ),
  blocks: (
    <>
      <rect x="10" y="40" width="18" height="24" rx="3" />
      <rect x="32" y="26" width="18" height="38" rx="3" />
      <rect x="54" y="12" width="18" height="52" rx="3" />
    </>
  ),
  dove: (
    <>
      <path d="M42 14 C 30 14 20 24 20 36 C 20 48 32 58 42 70 C 52 58 64 48 64 36 C 64 24 54 14 42 14 Z" />
      <path d="M42 22 C 42 36 42 50 42 64" strokeWidth="1.5" />
    </>
  ),
  aperture: (
    <>
      <circle cx="42" cy="42" r="26" />
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const x1 = 42 + Math.cos(angle) * 10;
        const y1 = 42 + Math.sin(angle) * 10;
        const x2 = 42 + Math.cos(angle) * 24;
        const y2 = 42 + Math.sin(angle) * 24;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="2" />;
      })}
    </>
  ),
  pulse: (
    <>
      <path d="M6 42 H26 L34 20 L48 64 L58 42 H78" strokeLinejoin="round" />
    </>
  ),
  bag: (
    <>
      <path d="M20 30 H64 L60 70 H24 Z" />
      <path d="M30 30 V22 a12 12 0 0 1 24 0 v8" />
    </>
  ),
  leaf: (
    <>
      <path d="M16 68 C 16 36 40 12 72 12 C 72 44 48 68 16 68 Z" />
      <path d="M20 64 C 36 48 52 32 70 14" strokeWidth="1.5" />
    </>
  ),
  waves: (
    <>
      <path d="M4 32 C 16 20, 28 20, 40 32 S 64 44, 76 32" />
      <path d="M4 52 C 16 40, 28 40, 40 52 S 64 64, 76 52" />
    </>
  ),
};

export default function DemoMotif({ motif = "waves", className = "h-16 w-16" }) {
  const content = MOTIFS[motif] || MOTIFS.waves;
  return (
    <svg
      viewBox="0 0 84 84"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      {content}
    </svg>
  );
}
