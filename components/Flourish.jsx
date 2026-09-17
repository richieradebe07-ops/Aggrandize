// The recurring ascending-flourish motif: a single tapering stroke with small
// circular terminals. Reused standalone above the logo wordmark, and as the
// basis for SectionDivider elsewhere on the site.
export default function Flourish({ className = "", strokeWidth = 2.5 }) {
  return (
    <svg
      viewBox="0 0 160 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 22C22 10 36 8 52 14C68 20 84 22 98 15C112 8 128 6 142 10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="4" cy="22" r="2.75" fill="currentColor" />
      <circle cx="150" cy="8" r="2.75" fill="currentColor" />
    </svg>
  );
}
