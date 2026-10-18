import { PAYFAST_MODE } from "@/lib/payfast";

// Shown on every payment-related page while PAYFAST_MODE is "sandbox" —
// disappears automatically the moment that env var is switched to "live"
// (no code change needed), so there's no way to accidentally ship a
// "test mode" banner into production.
export default function PayFastTestBanner() {
  if (PAYFAST_MODE !== "sandbox") return null;

  return (
    <div className="mx-auto mb-6 max-w-xl rounded-lg border border-brass/40 bg-brass/10 px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-brass">
      TEST MODE — no real money is charged
    </div>
  );
}
