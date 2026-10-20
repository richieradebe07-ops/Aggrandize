import SectionDivider from "@/components/SectionDivider";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import PayFastTestBanner from "@/components/PayFastTestBanner";
import Button from "@/components/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Payment Cancelled",
    description: "No charge was made.",
    path: "/pay/cancelled",
  }),
  robots: { index: false, follow: false },
};

export default function PayCancelledPage() {
  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-lg">
        <PayFastTestBanner />
        <RevealOnScroll variant="tech">
          <h1 className="font-display text-display-lg text-ink dark:text-ivory">
            Payment cancelled
          </h1>
          <SectionDivider className="my-6" />
          <p className="text-ink/70 dark:text-ivory/70">
            No charge was made. You can try again whenever you&rsquo;re ready.
          </p>
        </RevealOnScroll>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/pay">Try again</Button>
          <WhatsAppButton
            variant="button"
            label="WhatsApp a question"
            message="Hi Aggrandize Web Co, I had trouble paying online and have a question."
          />
        </div>
      </div>
    </section>
  );
}
