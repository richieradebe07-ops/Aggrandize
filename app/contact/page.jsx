import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppQRCode from "@/components/WhatsAppQRCode";
import RevealOnScroll from "@/components/RevealOnScroll";
import TrustBadges from "@/components/TrustBadges";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Get in touch with Aggrandize Web Co. to start your project.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialPackage = resolvedSearchParams?.package || "";
  const initialIndustry = resolvedSearchParams?.industry || "";
  const requestType = resolvedSearchParams?.requestType === "mockup" ? "mockup" : "quote";

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll className="text-center">
          <h1 className="font-display text-display-lg text-ink dark:text-ivory">
            Let&rsquo;s talk
          </h1>
          <p className="mt-4 text-ink/60 dark:text-ivory/60">
            Tell us a bit about your business and what you need — we&rsquo;ll
            reply within one business day.
          </p>
          <p className="mt-2 text-sm text-ink/50 dark:text-ivory/50">
            Not sure what yours would look like?{" "}
            <Link href="/industries" className="underline hover:text-brass">
              See demos by industry
            </Link>
            .
          </p>
        </RevealOnScroll>

        <div className="mt-12">
          <RevealOnScroll>
            <ContactForm
              initialPackage={initialPackage}
              initialIndustry={initialIndustry}
              requestType={requestType}
            />
          </RevealOnScroll>

          <p className="mt-6 text-center text-sm text-ink/60 dark:text-ivory/60">
            Or email us directly at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-medium text-ink underline-offset-2 hover:underline dark:text-ivory"
            >
              {SITE.email}
            </a>
          </p>
        </div>

        <div className="mt-10 border-t border-ink/10 pt-8 text-center dark:border-ivory/10">
          <h2 className="font-display text-base text-ink dark:text-ivory">
            For quick questions
          </h2>
          <p className="mt-1 text-sm text-ink/55 dark:text-ivory/55">
            Not ready for a full brief? Send us a quick WhatsApp message instead.
          </p>
          <div className="mt-4 flex justify-center">
            <WhatsAppButton variant="button" />
          </div>
          <div className="mx-auto mt-6 flex max-w-xs items-center gap-3">
            <WhatsAppQRCode message="Hi Aggrandize Web Co., I'd like to find out more." />
            <p className="text-xs text-ink/50 dark:text-ivory/50">
              Or scan with your phone&rsquo;s camera to open WhatsApp directly.
            </p>
          </div>
        </div>

        <TrustBadges className="mt-16 justify-center border-t border-ink/10 pt-8 dark:border-ivory/10" />
      </div>
    </section>
  );
}
