// Shared between the inline init script (app/layout.jsx, runs before first
// paint) and the header's settings panel (components/ThemeSettings.jsx) so
// both agree on the storage key and on what "system" means.

export const THEME_STORAGE_KEY = "aggrandize-theme";

// Deliberately a plain string (not a function) — it's injected into a
// <script> tag as raw text, not executed in this module's own context.
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var useOS=!t||t==="system";var d=useOS?window.matchMedia("(prefers-color-scheme: dark)").matches:t==="dark";document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;

export function getStoredTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : "system";
  } catch {
    return "system";
  }
}

// `value` is "light" | "dark" | "system".
export function applyTheme(value) {
  const dark =
    value === "dark" ||
    (value === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, value);
  } catch {
    // localStorage unavailable (private mode etc.) — the choice just won't
    // persist across visits.
  }
}
