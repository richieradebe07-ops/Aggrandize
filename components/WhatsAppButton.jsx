"use client";

import { SITE, whatsappLink } from "@/lib/content";
import { WhatsAppIcon } from "./icons";
import { useCookieBannerVisible } from "./CookieConsent";
import Button from "./Button";

// WhatsApp is a secondary, "quick question" channel site-wide — sales and
// project requests go through the quote form (ContactForm), which emails a
// confirmation + owner alert via Resend. This is the one default message
// every WhatsApp entry point falls back to unless a caller passes its own
// `message` for a specific, genuinely different context (e.g. the
// post-submit "I just sent a request" follow-up).
const DEFAULT_MESSAGE = "Hi Aggrandize Web Co., I have a quick question.";

// Persistent floating action button, present on every page via the root
// layout. Also usable inline (e.g. in the header or contact page) via `variant`.
//
// `label` only applies to variant="button" — lets a caller use the exact
// copy a given placement needs (e.g. "WhatsApp a question" on the Plans
// Walkthrough's final slide) without changing the shared default.
export default function WhatsAppButton({
  variant = "floating",
  message,
  label = "Have a quick question? Chat to us on WhatsApp",
  className = "",
}) {
  const href = whatsappLink(message || DEFAULT_MESSAGE);
  // Lift above the cookie-consent banner while it's on screen so the two
  // fixed, bottom-anchored elements don't overlap.
  const bannerVisible = useCookieBannerVisible();

  if (variant === "floating") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Quick question? WhatsApp us"
        title="Quick question? WhatsApp us"
        // Hidden below `sm:` — MobileStickyBar.jsx is the small-screen
        // replacement (its own WhatsApp action, paired with "Free mockup"),
        // so the two never show at once or collide.
        className={`fixed right-5 z-40 hidden h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory/90 text-ink/70 shadow-md backdrop-blur transition-[transform,bottom,color] hover:scale-105 hover:border-brass hover:text-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ivory dark:border-ivory/20 dark:bg-ink/80 dark:text-ivory/70 dark:focus-visible:ring-offset-ink sm:flex sm:h-12 sm:w-12 ${
          bannerVisible ? "bottom-40 sm:bottom-24" : "bottom-5"
        }`}
      >
        <WhatsAppIcon className="h-5 w-5" />
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-1.5 font-medium text-ink/70 transition-colors hover:text-brass dark:text-ivory/70 ${className || "text-sm"}`}
      >
        <WhatsAppIcon className="h-4 w-4" />
        {SITE.whatsappDisplay}
      </a>
    );
  }

  return (
    <Button href={href} external variant="secondary" className={className}>
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </Button>
  );
}
