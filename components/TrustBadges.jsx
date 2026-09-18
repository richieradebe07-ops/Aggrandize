import { TRUST_BADGES } from "@/lib/content";
import { ShieldCheckIcon, LockIcon, PinIcon } from "./icons";

const ICON = {
  shield: ShieldCheckIcon,
  lock: LockIcon,
  pin: PinIcon,
};

// A simple, unflashy row of trust signals — text and a small line icon each,
// no badge graphics. Used near the footer and on forms that collect
// personal details or payment (Get Started, Contact).
export default function TrustBadges({ className = "" }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {TRUST_BADGES.map((badge) => {
        const Icon = ICON[badge.icon];
        return (
          <li
            key={badge.label}
            className="flex items-center gap-1.5 text-xs font-medium text-ink/50 dark:text-ivory/50"
          >
            <Icon className="h-4 w-4 flex-shrink-0 text-brass" />
            {badge.label}
          </li>
        );
      })}
    </ul>
  );
}
