"use client";

import { useEffect, useRef, useState } from "react";
import { GearIcon } from "./icons";
import ThemeSettings from "./ThemeSettings";

// A small header dropdown for visitor-facing preferences — no account,
// login, or user data involved. Currently holds appearance (theme) and a
// shortcut to the existing cookie-consent control (components/CookieConsent.jsx),
// which it reopens via the same "open-cookie-settings" event the footer's
// "Cookie Settings" link already dispatches, rather than duplicating any
// consent logic here.
export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function openCookieSettings() {
    setOpen(false);
    window.dispatchEvent(new Event("open-cookie-settings"));
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Settings"
        title="Settings"
        className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-brass hover:text-brass dark:border-ivory/20 dark:text-ivory/70 dark:hover:border-brass dark:hover:text-brass"
      >
        <GearIcon className="h-4 w-4" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Settings"
          className="absolute right-0 top-full z-40 mt-2 w-64 rounded-2xl border border-ink/10 bg-ivory p-4 shadow-xl shadow-ink/10 dark:border-ivory/10 dark:bg-ink dark:shadow-black/30"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-ink/50 dark:text-ivory/50">
            Appearance
          </p>
          <div className="mt-2.5">
            <ThemeSettings />
          </div>

          <div className="my-4 h-px bg-ink/10 dark:bg-ivory/10" />

          <button
            type="button"
            onClick={openCookieSettings}
            className="text-sm font-medium text-ink/80 underline decoration-brass/50 underline-offset-4 transition-colors hover:text-brass dark:text-ivory/80"
          >
            Manage cookie preferences
          </button>
        </div>
      )}
    </div>
  );
}
