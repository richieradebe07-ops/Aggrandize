"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "aggrandize-cookie-consent"; // "accepted" | "declined"

// POPIA requires consent before non-essential cookies/trackers load. This
// banner is the gate: nothing non-essential should be wired up (analytics,
// embeds, etc.) without first checking getCookieConsent() === "accepted".
export function getCookieConsent() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// Shared with WhatsAppButton so the floating action button can lift above
// the cookie banner while it's on screen, instead of overlapping it.
const CookieBannerVisibleContext = createContext(false);

export function useCookieBannerVisible() {
  return useContext(CookieBannerVisibleContext);
}

export default function CookieConsent({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reads localStorage, which only exists client-side — this can't move
    // into the initial useState value without causing a server/client
    // hydration mismatch (the server always renders with no stored choice).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!getCookieConsent()) setVisible(true);

    const reopen = () => setVisible(true);
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  function choose(value) {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage unavailable (private mode etc.) — treat as a
      // per-session choice only.
    }
    setVisible(false);
  }

  return (
    <CookieBannerVisibleContext.Provider value={visible}>
      {children}
      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-ivory/98 px-5 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur sm:px-8"
        >
          <div className="mx-auto flex max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink/75">
              We use essential cookies to run this site, and would like your
              consent for non-essential cookies (like analytics) to help us
              improve it. Read our{" "}
              <Link href="/cookies" className="underline hover:text-brass">
                Cookie Policy
              </Link>{" "}
              for details.
            </p>
            <div className="flex flex-shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose("declined")}
                className="rounded-full border border-ink/20 px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-ivory transition-opacity hover:opacity-90"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieBannerVisibleContext.Provider>
  );
}
