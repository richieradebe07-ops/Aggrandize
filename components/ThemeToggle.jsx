"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "./icons";

const STORAGE_KEY = "aggrandize-theme";

// Toggles the `dark` class on <html>, set up in tandem with the inline
// init script in app/layout.jsx that applies the stored/OS preference
// before first paint (so there's no flash of the wrong theme).
export default function ThemeToggle({ className = "" }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // The init script already set the class before this ever runs; this
    // just syncs the button's own icon/label to that state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // localStorage unavailable (private mode etc.) — the choice just
      // won't persist across visits.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-brass hover:text-brass dark:border-ivory/20 dark:text-ivory/70 dark:hover:border-brass dark:hover:text-brass ${className}`}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
