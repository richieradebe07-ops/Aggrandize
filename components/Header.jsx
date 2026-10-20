"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import SettingsPanel from "./SettingsPanel";
import { NAV_LINKS } from "@/lib/content";
import { MenuIcon, CloseIcon } from "./icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  // Condenses the header's vertical padding once the page has scrolled past
  // a small threshold — purely a `padding`/`shadow` transition (both cheap,
  // composited-adjacent properties), triggered by the user's own scroll so
  // it falls inside Lighthouse's CLS input-exclusion window rather than
  // counting as an unexpected shift.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b border-ink/10 bg-ivory/90 backdrop-blur transition-[padding,box-shadow] duration-300 ease-out dark:border-ivory/10 dark:bg-ink/90 ${
        scrolled ? "shadow-sm shadow-ink/5 dark:shadow-black/20" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-content items-center justify-between px-5 transition-[padding] duration-300 ease-out sm:px-8 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <Logo size="sm" />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/80 transition-colors hover:text-brass dark:text-ivory/80"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton variant="inline" />
          <SettingsPanel />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <SettingsPanel />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink dark:text-ivory"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-4 border-t border-ink/10 px-5 py-5 dark:border-ivory/10 md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-ink/85 dark:text-ivory/85"
            >
              {link.label}
            </Link>
          ))}
          <WhatsAppButton variant="inline" />
        </nav>
      )}
    </header>
  );
}
