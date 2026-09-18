"use client";

import { Analytics } from "@vercel/analytics/next";
import { useCookieConsent } from "./CookieConsent";

// Vercel Analytics is non-essential tracking under POPIA, so it only mounts
// once the visitor has actively accepted the cookie banner — reading the
// shared CookieConsent context means it starts (or stops, on Cookie
// Settings -> Decline) immediately, with no page reload required.
export default function SiteAnalytics() {
  const consent = useCookieConsent();
  if (consent !== "accepted") return null;
  return <Analytics />;
}
