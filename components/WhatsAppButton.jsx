"use client";

import { SITE, whatsappLink } from "@/lib/content";
import { WhatsAppIcon } from "./icons";
import { useCookieBannerVisible } from "./CookieConsent";

// Persistent floating action button, present on every page via the root
// layout. Also usable inline (e.g. in the header or contact page) via `variant`.
export default function WhatsAppButton({ variant = "floating", message }) {
  const href = whatsappLink(
    message || `Hi Aggrandize Web Co., I'd like to find out more.`
  );
  // Lift above the cookie-consent banner while it's on screen so the two
  // fixed, bottom-anchored elements don't overlap.
  const bannerVisible = useCookieBannerVisible();

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${SITE.name} on WhatsApp`}
        className={`fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory shadow-lg shadow-ink/20 transition-[transform,bottom] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:h-16 sm:w-16 ${
          bannerVisible ? "bottom-40 sm:bottom-24" : "bottom-5"
        }`}
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brass"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {SITE.whatsappDisplay}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-transparent px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-brass hover:text-brass"
    >
      <WhatsAppIcon className="h-4 w-4" />
      Message us on WhatsApp
    </a>
  );
}
