import SectionDivider from "@/components/SectionDivider";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import Button from "@/components/Button";

export const metadata = { title: "Payment Cancelled" };

export default async function GetStartedCancelledPage({ searchParams }) {
  const params = (await searchParams) || {};
  const ref = Array.isArray(params.ref) ? params.ref[0] : params.ref;

  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-lg">
        <RevealOnScroll variant="tech">
          <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">Payment cancelled</h1>
          <SectionDivider className="my-6" />
          <p className="text-ink/70 dark:text-ivory/70">
            No charge was made. Your brief is saved — pick up right where you left off whenever
            you&rsquo;re ready.
          </p>
        </RevealOnScroll>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={ref ? `/get-started?resume=${ref}` : "/get-started"}>
            Resume checkout
          </Button>
          <WhatsAppButton variant="button" />
        </div>
      </div>
    </section>
  );
}
