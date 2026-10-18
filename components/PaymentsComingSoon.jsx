import SectionDivider from "./SectionDivider";
import RevealOnScroll from "./RevealOnScroll";
import Button from "./Button";

// Shown at every /pay entry point while PAYMENTS_ENABLED is false
// (PayFast verification pending) — see lib/payfast.js. No payment logic
// lives here; this is presentation only.
export default function PaymentsComingSoon({
  message = "Online payments are opening soon. Request a quote and we’ll send you payment details.",
  ctaHref = "/contact",
  ctaLabel = "Request a quote",
}) {
  return (
    <div className="mx-auto max-w-lg text-center">
      <RevealOnScroll variant="tech">
        <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">Pay online</h1>
        <SectionDivider className="my-6" />
        <p className="text-ink/70 dark:text-ivory/70">{message}</p>
      </RevealOnScroll>
      <Button href={ctaHref} className="mt-8">
        {ctaLabel}
      </Button>
    </div>
  );
}
