import SectionDivider from "@/components/SectionDivider";
import PaymentSuccessCheck from "@/components/PaymentSuccessCheck";
import RevealOnScroll from "@/components/RevealOnScroll";
import Button from "@/components/Button";
import GoogleReviewLink from "@/components/GoogleReviewLink";
import { getSubmission } from "@/lib/submissions";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Thank You",
    description: "Your deposit and project brief have been received.",
    path: "/get-started/success",
  }),
  robots: { index: false, follow: false },
};

// PayFast redirects the client's browser here after payment, but a browser
// redirect is not proof of payment — it can be reached without ever paying.
// The submission is only ever marked "paid" by the server-side ITN webhook
// (app/api/payfast/notify). This page just gives the client a clean
// confirmation and, best-effort, reflects whatever the ITN has already
// recorded by the time they land here (it often arrives within seconds, but
// there's no guarantee it beats the browser redirect).
export default async function GetStartedSuccessPage({ searchParams }) {
  const params = (await searchParams) || {};
  const ref = Array.isArray(params.ref) ? params.ref[0] : params.ref;
  const submission = ref ? await getSubmission(ref) : null;
  const confirmed = submission?.payment?.status === "COMPLETE";
  // Set by app/api/get-started/route.js while NEXT_PUBLIC_PAYMENTS_ENABLED
  // is false — no PayFast flow ran at all, so there's nothing to "confirm"
  // the way the fallback message below implies.
  const eftPending = submission?.payment?.status === "EFT_PENDING";

  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-lg">
        <PaymentSuccessCheck />
        <RevealOnScroll variant="tech">
          <h1 className="mt-6 font-display text-display-lg text-ink dark:text-ivory">Thank you</h1>
          <SectionDivider className="my-6" />
          {confirmed ? (
            <p className="text-ink/70 dark:text-ivory/70">
              We&rsquo;ve received your deposit and brief. We&rsquo;ll be in touch within 1&ndash;2
              business days to kick things off.
            </p>
          ) : eftPending ? (
            <p className="text-ink/70 dark:text-ivory/70">
              We&rsquo;ve received your brief. We&rsquo;ll email you our banking details (EFT) so
              you can secure your spot — work begins once the deposit has cleared.
            </p>
          ) : (
            <p className="text-ink/70 dark:text-ivory/70">
              Thanks — we&rsquo;re confirming your payment now. You&rsquo;ll receive a message from
              us within 1&ndash;2 business days once it&rsquo;s through, or sooner if anything needs
              your attention.
            </p>
          )}
        </RevealOnScroll>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/">Back to home</Button>
          {confirmed && <GoogleReviewLink variant="button" />}
        </div>
      </div>
    </section>
  );
}
