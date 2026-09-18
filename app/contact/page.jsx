import ContactForm from "@/components/ContactForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import RevealOnScroll from "@/components/RevealOnScroll";
import TrustBadges from "@/components/TrustBadges";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Aggrandize Web Co. to start your project.",
};

export default async function ContactPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const initialPackage = resolvedSearchParams?.package || "";

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll className="text-center">
          <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">
            Let&rsquo;s talk
          </h1>
          <p className="mt-4 text-ink/60 dark:text-ivory/60">
            Tell us a bit about your business and what you need — we&rsquo;ll
            reply within one business day.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_auto_1fr]">
          <RevealOnScroll>
            <ContactForm initialPackage={initialPackage} />
          </RevealOnScroll>

          <div className="hidden w-px bg-ink/10 dark:bg-ivory/10 sm:block" aria-hidden="true" />
          <div className="block h-px w-full bg-ink/10 dark:bg-ivory/10 sm:hidden" aria-hidden="true" />

          <RevealOnScroll delay={100} className="flex flex-col justify-center">
            <h2 className="font-display text-xl text-ink dark:text-ivory">
              Prefer to chat directly?
            </h2>
            <p className="mt-2 text-sm text-ink/60 dark:text-ivory/60">
              Message us on WhatsApp for the fastest response.
            </p>
            <div className="mt-4">
              <WhatsAppButton variant="button" />
            </div>
          </RevealOnScroll>
        </div>

        <TrustBadges className="mt-16 justify-center border-t border-ink/10 pt-8 dark:border-ivory/10" />
      </div>
    </section>
  );
}
