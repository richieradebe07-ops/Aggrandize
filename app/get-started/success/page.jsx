import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import PaymentSuccessCheck from "@/components/PaymentSuccessCheck";
import RevealOnScroll from "@/components/RevealOnScroll";
import { getSubmission } from "@/lib/submissions";

export const metadata = { title: "Thank You" };

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

  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-lg">
        <PaymentSuccessCheck />
        <RevealOnScroll variant="tech">
          <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Thank you</h1>
          <SectionDivider className="my-6" />
          {confirmed ? (
            <p className="text-ink/70">
              We&rsquo;ve received your deposit and brief. We&rsquo;ll be in touch within 1&ndash;2
              business days to kick things off.
            </p>
          ) : (
            <p className="text-ink/70">
              Thanks — we&rsquo;re confirming your payment now. You&rsquo;ll receive a message from
              us within 1&ndash;2 business days once it&rsquo;s through, or sooner if anything needs
              your attention.
            </p>
          )}
        </RevealOnScroll>
        <Link
          href="/"
          className="shine-sweep mt-8 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-ivory transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
