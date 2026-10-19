import SectionDivider from "./SectionDivider";
import RevealOnScroll from "./RevealOnScroll";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";

// Shown at every /pay entry point while PAYMENTS_ENABLED is false
// (PayFast verification pending) — see lib/payfast.js. No payment logic
// lives here; this is presentation only. Deposits in the meantime are
// taken by EFT, with banking details sent by email per client — never
// shown on the site (see app/page.jsx's How it works step 2 and the
// "How does payment work?" FAQ for the same EFT-or-PayFast wording).
export default function PaymentsComingSoon({
  message = "We’re setting up online payments. To get started, request a quote and we’ll email you a proposal with secure payment details (EFT).",
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
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button href={ctaHref}>{ctaLabel}</Button>
        <WhatsAppButton variant="button" label="WhatsApp a question" />
      </div>
    </div>
  );
}
