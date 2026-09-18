"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "@/lib/content";
import { MenuIcon, CloseIcon, PersonIcon } from "./icons";

function AccountButton({ session, className = "" }) {
  const label = session?.user ? session.user.name || "Account" : "Sign in";

  return (
    <Link
      href="/settings"
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-brass hover:text-brass dark:border-ivory/20 dark:text-ivory/70 dark:hover:border-brass dark:hover:text-brass ${className}`}
    >
      <PersonIcon className="h-4 w-4" />
    </Link>
  );
}

export default function Header({ session }) {
  const [open, setOpen] = useState(false);
  const accountLabel = session?.user
    ? session.user.name || "Account"
    : "Sign in";

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-ivory/90 backdrop-blur dark:border-ivory/10 dark:bg-ink/90">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-3 sm:px-8">
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
          <AccountButton session={session} />
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <AccountButton session={session} />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-md p-2 text-ink dark:text-ivory"
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
          <Link
            href="/settings"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-1.5 text-base font-medium text-ink/85 dark:text-ivory/85"
          >
            <PersonIcon className="h-4 w-4" />
            {accountLabel}
          </Link>
          <WhatsAppButton variant="inline" />
        </nav>
      )}
    </header>
  );
}
