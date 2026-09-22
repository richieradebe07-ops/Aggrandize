"use client";

import Link from "next/link";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsAppButton";
import TrustBadges from "./TrustBadges";
import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/content";
import { InstagramIcon, FacebookIcon } from "./icons";

const SOCIAL_ICON = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookie Policy" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ivory dark:border-ivory/10 dark:bg-ink">
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo size="sm" href={null} />
            <p className="mt-4 max-w-[24ch] text-sm text-ink/60 dark:text-ivory/60">
              {SITE.slogan}
            </p>
          </div>

          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-ink/50 dark:text-ivory/50">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink/75 transition-colors hover:text-brass dark:text-ivory/75"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-ink/50 dark:text-ivory/50">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <WhatsAppButton variant="inline" />
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-ink/75 transition-colors hover:text-brass dark:text-ivory/75"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="text-sm text-ink/60 dark:text-ivory/60">{SITE.location}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-ink/50 dark:text-ivory/50">
              Follow
            </h3>
            <ul className="mt-4 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICON[social.name];
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      aria-label={social.ariaLabel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink/60 transition-colors hover:border-brass hover:text-brass dark:border-ivory/20 dark:text-ivory/60"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <TrustBadges className="mt-12 border-t border-ink/10 pt-8 dark:border-ivory/10" />

        <div className="mt-8 flex flex-col gap-4 border-t border-ink/10 pt-6 text-xs text-ink/50 dark:border-ivory/10 dark:text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name} All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-brass"
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new Event("open-cookie-settings"))
              }
              className="transition-colors hover:text-brass"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
