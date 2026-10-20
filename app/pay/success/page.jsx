import SectionDivider from "@/components/SectionDivider";
import PaymentSuccessCheck from "@/components/PaymentSuccessCheck";
import RevealOnScroll from "@/components/RevealOnScroll";
import PayFastTestBanner from "@/components/PayFastTestBanner";
import WhatsAppButton from "@/components/WhatsAppButton";
import Button from "@/components/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Payment Received",
    description: "Your payment is being confirmed.",
    path: "/pay/success",
  }),
  robots: { index: false, follow: false },
};

// PayFast redirects the client's browser here after payment, but a browser
// redirect is never proof of payment — it can be reached without ever
// paying. Unlike /get-started/success, the /pay flow has no database to
// look up a submission in (see lib/payfast.js's buildPayReference comment
// for why), so there's nothing here to check a "confirmed" state against.
// This page always shows the same message; the real confirmation is the
// receipt email, sent only after app/api/payfast/notify verifies the ITN.
export default function PaySuccessPage() {
  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-lg">
        <PayFastTestBanner />
        <PaymentSuccessCheck />
        <RevealOnScroll variant="tech">
          <h1 className="mt-6 font-display text-display-lg text-ink dark:text-ivory">
            Thank you
          </h1>
          <SectionDivider className="my-6" />
          <p className="text-ink/70 dark:text-ivory/70">
            We&rsquo;re confirming your payment now — this usually takes a few seconds. Check
            your email for your receipt, and we&rsquo;ll be in touch if anything needs your
            attention.
          </p>
        </RevealOnScroll>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/">Back to home</Button>
          <WhatsAppButton
            variant="button"
            label="WhatsApp a question"
            message="Hi Aggrandize Web Co, I just made a payment on your website and have a question."
          />
        </div>
      </div>
    </section>
  );
}
