import PayForm from "@/components/PayForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import PayFastTestBanner from "@/components/PayFastTestBanner";
import { LockIcon } from "@/components/icons";
import { PAYFAST_MODE } from "@/lib/payfast";
import { PACKAGES } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pay Online",
  description: "Pay a deposit, final balance, or full plan price securely via PayFast.",
  path: "/pay",
});

export default async function PayPage({ searchParams }) {
  const resolvedSearchParams = (await searchParams) || {};
  const planParam = Array.isArray(resolvedSearchParams.plan)
    ? resolvedSearchParams.plan[0]
    : resolvedSearchParams.plan;
  const initialPackage = PACKAGES.some((p) => p.id === planParam) ? planParam : "";

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-xl">
        <PayFastTestBanner />

        <RevealOnScroll className="text-center">
          <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">
            Pay online
          </h1>
          <p className="mt-4 text-ink/60 dark:text-ivory/60">
            Pay a deposit to get started, your final balance when your site is ready to launch,
            or your full plan price upfront.
          </p>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-wide text-ink/45 dark:text-ivory/45">
            <LockIcon className="h-3.5 w-3.5" />
            Processed securely by PayFast
            {PAYFAST_MODE === "sandbox" ? " — sandbox test mode" : ""}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={100} className="mt-10">
          <PayForm initialPackage={initialPackage} />
        </RevealOnScroll>
      </div>
    </section>
  );
}
