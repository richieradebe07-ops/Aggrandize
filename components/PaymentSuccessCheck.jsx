"use client";

import { useEffect, useRef, useState } from "react";

// A brass circle-and-check draw-in for the payment success page — matches
// the line-draw technique used elsewhere (ChanceChart, the logo flourish)
// rather than a generic checkmark icon. Reduced motion is already handled
// globally (app/globals.css collapses all transition durations/delays), so
// this only needs to flip `visible` once mounted.
const CIRCLE_DRAW_MS = 500;
const CHECK_DRAW_MS = 350;
const CHECK_DELAY_MS = 450;

export default function PaymentSuccessCheck() {
  const circleRef = useRef(null);
  const checkRef = useRef(null);
  const [circleLength, setCircleLength] = useState(0);
  const [checkLength, setCheckLength] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (circleRef.current) setCircleLength(circleRef.current.getTotalLength());
    if (checkRef.current) setCheckLength(checkRef.current.getTotalLength());
    // Defer a frame so the hidden (dash-offset) state paints first —
    // otherwise the transition has nothing to animate from.
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg
      viewBox="0 0 64 64"
      className="mx-auto h-16 w-16"
      fill="none"
      aria-hidden="true"
    >
      <circle
        ref={circleRef}
        cx="32"
        cy="32"
        r="28"
        className="stroke-brass"
        strokeWidth={3}
        style={{
          strokeDasharray: circleLength,
          strokeDashoffset: visible ? 0 : circleLength,
          transition: circleLength
            ? `stroke-dashoffset ${CIRCLE_DRAW_MS}ms ease-out`
            : "none",
        }}
      />
      <path
        ref={checkRef}
        d="M20 33 L28 41 L45 24"
        className="stroke-brass"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: checkLength,
          strokeDashoffset: visible ? 0 : checkLength,
          transition: checkLength
            ? `stroke-dashoffset ${CHECK_DRAW_MS}ms ease-out ${CHECK_DELAY_MS}ms`
            : "none",
        }}
      />
    </svg>
  );
}
