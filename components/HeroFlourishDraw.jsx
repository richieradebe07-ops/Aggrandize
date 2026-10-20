"use client";

import { useEffect, useRef, useState } from "react";

// Same path as Flourish.jsx, but drawn on with stroke-dashoffset once
// mounted — used only by Hero (above the fold, so no IntersectionObserver
// needed) rather than inside Flourish itself, so the hundred-odd other
// Flourish usages (every SectionDivider, every Logo in the header/footer)
// stay plain, hook-free server markup instead of each becoming its own
// client boundary. prefers-reduced-motion is handled globally
// (app/globals.css collapses every transition duration to ~0), so this
// only needs to flip `visible` once — same technique as
// PaymentSuccessCheck.jsx.
export default function HeroFlourishDraw({ className = "" }) {
  const pathRef = useRef(null);
  const [length, setLength] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      viewBox="0 0 160 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M4 22C22 10 36 8 52 14C68 20 84 22 98 15C112 8 128 6 142 10"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        style={{
          strokeDasharray: length,
          strokeDashoffset: visible ? 0 : length,
          transition: length ? "stroke-dashoffset 1100ms cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        }}
      />
      <circle
        cx="4"
        cy="22"
        r="2.75"
        fill="currentColor"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms ease 950ms" }}
      />
      <circle
        cx="150"
        cy="8"
        r="2.75"
        fill="currentColor"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms ease 1050ms" }}
      />
    </svg>
  );
}
