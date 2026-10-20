"use client";

import { usePathname } from "next/navigation";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";
import { useCookieBannerVisible } from "./CookieConsent";

// A mobile-only conversion bar — the floating WhatsApp button (WhatsAppButton's
// "floating" variant) is `hidden sm:flex` so the two never show at once; this
// is effectively that button's small-screen replacement, just paired with a
// primary "Free mockup" CTA. Hidden on /contact itself (the quote form it
// points to), since showing "go to the quote form" ON the quote form is just
// clutter.
export default function MobileStickyBar() {
  const pathname = usePathname();
  const bannerVisible = useCookieBannerVisible();

  if (pathname === "/contact") return null;

  return (
    <div
      className={`fixed inset-x-0 z-40 flex gap-2 border-t border-ink/10 bg-ivory/95 p-3 backdrop-blur transition-[bottom] dark:border-ivory/10 dark:bg-ink/95 sm:hidden ${
        bannerVisible ? "bottom-32" : "bottom-0"
      }`}
    >
      <Button href="/contact?requestType=mockup" className="flex-1 px-4 py-3 text-center">
        Free mockup
      </Button>
      <WhatsAppButton variant="button" label="WhatsApp" className="flex-1 px-4 py-3" />
    </div>
  );
}
