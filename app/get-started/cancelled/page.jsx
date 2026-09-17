import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = { title: "Payment Cancelled" };

export default async function GetStartedCancelledPage({ searchParams }) {
  const params = (await searchParams) || {};
  const ref = Array.isArray(params.ref) ? params.ref[0] : params.ref;

  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-lg">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">Payment cancelled</h1>
        <SectionDivider className="my-6" />
        <p className="text-ink/70">
          No charge was made. Your brief is saved — pick up right where you left off whenever
          you&rsquo;re ready.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={ref ? `/get-started?resume=${ref}` : "/get-started"}
            className="rounded-full bg-ink px-8 py-3 text-sm font-semibold text-ivory transition-opacity hover:opacity-90"
          >
            Resume checkout
          </Link>
          <WhatsAppButton variant="button" />
        </div>
      </div>
    </section>
  );
}
