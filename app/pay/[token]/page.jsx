import { notFound } from "next/navigation";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import PayFastTestBanner from "@/components/PayFastTestBanner";
import PaymentsComingSoon from "@/components/PaymentsComingSoon";
import PaymentLinkCheckout from "@/components/PaymentLinkCheckout";
import { LockIcon } from "@/components/icons";
import { getPaymentLink } from "@/lib/paymentLinks";
import { PAYFAST_MODE, PAYMENTS_ENABLED } from "@/lib/payfast";

// Deliberately no generateStaticParams here — same reasoning as
// app/status/[token]/page.jsx: this stays server-rendered per request so
// the set of valid tokens is never baked into the build output. Metadata
// stays generic and noindex, in case a token ever leaks into a search
// engine or a browser history suggestion.
export const metadata = {
  title: "Pay Online",
  robots: { index: false, follow: false },
};

function formatCurrency(amount) {
  const rounded = Math.round(amount);
  return `R${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export default async function PaymentLinkPage({ params }) {
  const { token } = await params;
  const link = getPaymentLink(token);
  if (!link) notFound();

  if (!PAYMENTS_ENABLED) {
    return (
      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <PaymentsComingSoon
          message="We’re setting up online payments. Get in touch and we’ll email you secure payment details (EFT)."
          ctaHref="/contact"
          ctaLabel="Contact us"
        />
      </section>
    );
  }

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-xl">
        <PayFastTestBanner />

        <RevealOnScroll className="text-center">
          <h1 className="font-display text-display-lg text-ink dark:text-ivory">
            Pay online
          </h1>
          <p className="mt-4 text-ink/60 dark:text-ivory/60">{link.description}</p>
          <p className="mt-2 font-display text-3xl text-brass">{formatCurrency(link.amount)}</p>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink/45 dark:text-ivory/45">
            <LockIcon className="h-3.5 w-3.5" />
            Processed securely by PayFast
            {PAYFAST_MODE === "sandbox" ? " — sandbox test mode" : ""}
          </p>
        </RevealOnScroll>

        <SectionDivider className="my-10" />

        <RevealOnScroll delay={100}>
          <PaymentLinkCheckout token={token} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
