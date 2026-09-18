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

// Shared with WhatsAppButton (banner visibility, so the floating action
// button can lift above the cookie banner instead of overlapping it) and
// with anything that must only activate after non-essential consent (e.g.
// SiteAnalytics) — both read from this one context so a visitor's choice
// takes effect immediately, with no page reload required.
const CookieConsentContext = createContext({ visible: false, consent: null });

export function useCookieBannerVisible() {
  return useContext(CookieConsentContext).visible;
}

// "accepted" | "declined" | null (no choice made yet).
export function useCookieConsent() {
  return useContext(CookieConsentContext).consent;
}

export default function CookieConsent({ children }) {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    // Reads localStorage, which only exists client-side — this can't move
    // into the initial useState value without causing a server/client
    // hydration mismatch (the server always renders with no stored choice).
    const stored = getCookieConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!stored) setVisible(true);
    setConsent(stored);

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
    setConsent(value);
    setVisible(false);
  }

  return (
    <CookieConsentContext.Provider value={{ visible, consent }}>
      {children}
      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-ivory/98 px-5 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] backdrop-blur dark:border-ivory/10 dark:bg-ink/98 sm:px-8"
        >
          <div className="mx-auto flex max-w-content flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink/75 dark:text-ivory/75">
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
                className="rounded-full border border-ink/20 px-5 py-2 text-sm font-medium text-ink transition-colors hover:border-ink/40 dark:border-ivory/25 dark:text-ivory dark:hover:border-ivory/50"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("accepted")}
                className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-ivory transition-opacity hover:opacity-90 dark:bg-brass dark:text-ink"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}
