import Link from "next/link";
import { PAYMENTS_ENABLED } from "@/lib/payfast";

// Secondary "Pay deposit" link shown next to the primary "Get started" /
// "Request a quote" CTA on package cards and the Plans Walkthrough.
// Renders nothing while PAYMENTS_ENABLED is false (PayFast verification
// pending) — the primary CTA right next to it is already the normal
// quote/get-started path, so hiding this is enough; there's no separate
// "replace" needed. Has no server-only imports, so it's safe to use
// from both server pages and client components (e.g. PlansWalkthrough).
export default function PayDepositLink({ packageId, className = "" }) {
  if (!PAYMENTS_ENABLED) return null;

  return (
    <Link
      href={`/pay?plan=${packageId}`}
      className={`text-center text-xs font-medium text-ink/50 underline hover:text-brass dark:text-ivory/50 ${className}`}
    >
      Pay deposit
    </Link>
  );
}
