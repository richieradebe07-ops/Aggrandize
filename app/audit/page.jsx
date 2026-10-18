import WebsiteAuditForm from "@/components/WebsiteAuditForm";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free Website Audit",
  description:
    "Get a free, honest review of your current website from Aggrandize Web Co. — no automated score, a real person looks at your site.",
  path: "/audit",
});

const STEPS = [
  "Send us your website URL and contact details below.",
  "We actually look at your site — design, speed, mobile usability, and whether it's easy for a visitor to get in touch.",
  "You get a short, honest report by email within 48 hours — no obligation, no automated score.",
];

export default function AuditPage() {
  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl py-8">
          <AmbientBackdrop />
          <RevealOnScroll variant="tech" className="relative z-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-brass">
              Free, no obligation
            </span>
            <h1 className="mt-3 font-display text-4xl text-ink dark:text-ivory sm:text-5xl">
              Get a free website audit
            </h1>
            <p className="mx-auto mt-4 max-w-md text-ink/60 dark:text-ivory/60">
              Not sure if your current site is helping or hurting you? Send it over — we&rsquo;ll
              take an honest look and tell you what we find.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mx-auto mt-10 max-w-md">
          <ol className="space-y-3">
            {STEPS.map((step, i) => (
              <li key={step} className="flex items-start gap-3 text-sm text-ink/70 dark:text-ivory/70">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-brass/40 font-display text-xs text-brass">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </RevealOnScroll>

        <SectionDivider className="my-12" />

        <RevealOnScroll>
          <WebsiteAuditForm />
        </RevealOnScroll>
      </div>
    </section>
  );
}
