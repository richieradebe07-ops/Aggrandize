"use client";

import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme } from "@/lib/theme";

const OPTIONS = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
];

// Explicit three-way theme control for the Settings page. The header's
// ThemeToggle stays a quick binary light/dark toggle; this is the place to
// pick "System" (follow the OS). Both read/write the same lib/theme storage.
export default function ThemeSettings() {
  const [value, setValue] = useState("system");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(getStoredTheme());
  }, []);

  function choose(next) {
    setValue(next);
    applyTheme(next);
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="inline-flex rounded-full border border-ink/15 p-1 dark:border-ivory/20"
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          onClick={() => choose(opt.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            value === opt.value
              ? "bg-ink text-ivory dark:bg-ivory dark:text-ink"
              : "text-ink/70 hover:text-ink dark:text-ivory/70 dark:hover:text-ivory"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
