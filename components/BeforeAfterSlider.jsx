"use client";

import { useRef, useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

// A draggable (mouse, touch, and keyboard) before/after comparison slider —
// pure Pointer Events + CSS clipping, no library. Pass `beforeContent` /
// `afterContent` as whatever fills each panel: a real <Image>, or a plain
// placeholder block when no real screenshot exists yet (see /work, which
// uses this with clearly marked placeholders — there's no real "before"
// image on the site yet).
export default function BeforeAfterSlider({
  beforeContent,
  afterContent,
  beforeLabel = "Before",
  afterLabel = "After",
  ariaLabel = "Before and after comparison slider",
  className = "",
}) {
  const [position, setPosition] = useState(50); // percent, 0 = all "after", 100 = all "before"
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  function updateFromClientX(clientX) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  function handlePointerDown(e) {
    draggingRef.current = true;
    updateFromClientX(e.clientX);
  }
  function handlePointerMove(e) {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  }
  function handlePointerUp() {
    draggingRef.current = false;
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative aspect-video w-full touch-none select-none overflow-hidden rounded-2xl ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* "After" is the base layer, full size. */}
      <div className="absolute inset-0">{afterContent}</div>
      <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-ivory">
        {afterLabel}
      </span>

      {/* "Before" is also full size — clip-path reveals only the left
          `position`% of it, so beforeContent never needs to know the
          container's pixel width (a percentage-width wrapper would instead
          scale/distort its content as the divider moves). */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {beforeContent}
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs font-medium text-ivory">
          {beforeLabel}
        </span>
      </div>

      <div
        role="slider"
        aria-label={ariaLabel}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="absolute top-0 h-full w-1 -translate-x-1/2 cursor-ew-resize bg-ivory shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-brass"
        style={{ left: `${position}%` }}
      >
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-0.5 rounded-full bg-ivory shadow-md">
          <ArrowLeftIcon className="h-3 w-3 text-ink" />
          <ArrowRightIcon className="h-3 w-3 text-ink" />
        </div>
      </div>
    </div>
  );
}
