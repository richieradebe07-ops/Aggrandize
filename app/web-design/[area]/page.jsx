import Link from "next/link";
import { notFound } from "next/navigation";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import Button from "@/components/Button";
import WhatsAppButton from "@/components/WhatsAppButton";
import { LOCAL_AREAS, PRICING_PROMISE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LOCAL_AREAS.map((area) => ({ area: area.slug }));
}

export async function generateMetadata({ params }) {
  const { area: slug } = await params;
  const area = LOCAL_AREAS.find((a) => a.slug === slug);
  if (!area) return {};
  return pageMetadata({
    title: area.heading,
    description: area.intro,
    path: `/web-design/${area.slug}`,
  });
}

export default async function LocalAreaPage({ params }) {
  const { area: slug } = await params;
  const area = LOCAL_AREAS.find((a) => a.slug === slug);
  if (!area) notFound();

  const otherAreas = LOCAL_AREAS.filter((a) => a.slug !== area.slug);

  return (
    <article className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl py-8">
          <AmbientBackdrop />
          <RevealOnScroll variant="tech" className="relative z-10 text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-brass">
              Serving {area.name}
            </span>
            <h1 className="mt-3 font-display text-display-lg text-ink dark:text-ivory">
              {area.heading}
            </h1>
            <p className="mx-auto mt-4 max-w-md text-ink/60 dark:text-ivory/60">{area.intro}</p>
          </RevealOnScroll>
        </div>

        <SectionDivider className="my-12" />

        <div className="space-y-6">
          {area.paragraphs.map((paragraph, i) => (
            <RevealOnScroll key={i} delay={i * 100}>
              <p className="leading-relaxed text-ink/70 dark:text-ivory/70">{paragraph}</p>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll
          variant="tech"
          className="mt-12 rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center"
        >
          <h2 className="font-display text-2xl text-ink dark:text-ivory">
            Ready for a website for your {area.name} business?
          </h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-brass">
            {PRICING_PROMISE}
          </p>
          <p className="mx-auto mt-3 max-w-sm text-sm text-ink/60 dark:text-ivory/60">
            See our{" "}
            <Link href="/services" className="underline hover:text-brass">
              plans and pricing
            </Link>
            , browse{" "}
            <Link href="/work" className="underline hover:text-brass">
              our work
            </Link>
            , or get in touch directly.
          </p>
          <div className="mx-auto mt-6 flex max-w-sm flex-col items-center gap-3">
            <Button href="/contact" className="w-full">
              Request a quote
            </Button>
            <WhatsAppButton variant="button" label="WhatsApp a question" />
          </div>
        </RevealOnScroll>

        <SectionDivider className="my-12" />

        <div className="text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
            Also serving
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {otherAreas.map((other) => (
              <Link
                key={other.slug}
                href={`/web-design/${other.slug}`}
                className="text-sm text-ink/60 underline decoration-brass/40 underline-offset-4 hover:text-brass dark:text-ivory/60"
              >
                {other.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
