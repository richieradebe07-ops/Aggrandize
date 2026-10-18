"use client";

import { usePathname } from "next/navigation";
import { SITE, whatsappLink } from "@/lib/content";
import { WhatsAppIcon } from "./icons";
import { useCookieBannerVisible } from "./CookieConsent";
import Button from "./Button";

// Page-adaptive default messages for the floating button specifically —
// an explicit `message` prop (e.g. a specific plan, from PlansWalkthrough
// or FreeMockupOffer) always wins over this. Matched by prefix so a
// dynamic route like /work/okuhle still gets the /work message.
const PAGE_MESSAGES = [
  { prefix: "/services", message: "Hi, I'm looking at your pricing plans and had a question." },
  { prefix: "/compare", message: "Hi, I'm comparing options for a new website and had a question." },
  { prefix: "/work", message: "Hi, I saw your work and wanted to find out more." },
  { prefix: "/get-started", message: "Hi, I'm partway through briefing a project and had a question." },
];
const DEFAULT_MESSAGE = "Hi Aggrandize Web Co., I'd like to find out more.";

function pageAdaptiveMessage(pathname) {
  return PAGE_MESSAGES.find((entry) => pathname?.startsWith(entry.prefix))?.message || DEFAULT_MESSAGE;
}

// Persistent floating action button, present on every page via the root
// layout. Also usable inline (e.g. in the header or contact page) via `variant`.
export default function WhatsAppButton({ variant = "floating", message, className = "" }) {
  const pathname = usePathname();
  const href = whatsappLink(message || pageAdaptiveMessage(pathname));
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
        className={`fixed right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-ivory shadow-lg shadow-ink/20 transition-[transform,bottom] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ivory dark:bg-brass dark:text-ink dark:focus-visible:ring-offset-ink sm:h-16 sm:w-16 ${
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
        className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brass dark:text-ivory"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {SITE.whatsappDisplay}
      </a>
    );
  }

  return (
    <Button href={href} external variant="secondary" className={className}>
      <WhatsAppIcon className="h-4 w-4" />
      Message us on WhatsApp
    </Button>
  );
}
