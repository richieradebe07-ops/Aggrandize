"use client";

import { useEffect, useRef, useState } from "react";

// Lightweight scroll-triggered reveal — no animation library dependency.
// Respects prefers-reduced-motion by rendering content visible immediately.
export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "default",
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      // matchMedia only exists client-side, so this can't be the initial
      // useState value without a server/client hydration mismatch.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const revealClass = variant === "tech" ? "animate-reveal-blur" : "animate-reveal";

  return (
    <Tag
      ref={ref}
      className={`${visible ? revealClass : "opacity-0"} ${className}`}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
