import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import Button from "@/components/Button";
import WhatsAppButton from "@/components/WhatsAppButton";
import Card from "@/components/Card";
import IndustriesGrid from "@/components/IndustriesGrid";
import { DEMOS } from "@/lib/demos";
import { SITE } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "See what a website could look like for your type of business — concept demos by industry, from salons to trades to retail.",
  path: "/industries",
  ogImagePath: "/industries/opengraph-image",
});

const HUB_FAQS = [
  {
    q: "Are these real businesses?",
    a: "No. Every demo is a concept site for a fictional business, built by Aggrandize Web Co. to show what a real site for your type of business could look like — the names, contact details, prices and photos are all placeholders.",
  },
  {
    q: "Can my site look exactly like one of these?",
    a: "These demos show the shape of a good site for your industry, not a fixed template — your actual site is built around your business, your content, and your brand.",
  },
  {
    q: "Do the demo forms and buttons actually do anything?",
    a: "No — every button, form, and \"add to cart\" on a demo page is inert. Submitting a demo form just shows a message confirming nothing was sent.",
  },
  {
    q: "What if my industry isn't listed?",
    a: "Get in touch with a short description of your business — most sites follow the same patterns as the demos here even if your exact industry isn't shown yet.",
  },
];

export default function IndustriesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${SITE.url}/industries` },
    ],
  };

  return (
    <div className="px-5 py-16 sm:px-8 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="mx-auto max-w-content">
        <nav aria-label="Breadcrumb" className="text-xs text-ink/45 dark:text-ivory/45">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-brass">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink/70 dark:text-ivory/70">
              Industries
            </li>
          </ol>
        </nav>

        <div className="relative mt-8 overflow-hidden rounded-3xl py-8">
          <AmbientBackdrop />
          <RevealOnScroll variant="tech" className="relative z-10 mx-auto max-w-2xl text-center">
            <h1 className="font-display text-display-lg text-ink dark:text-ivory">
              Websites for local businesses, by industry
            </h1>
            <p className="mt-4 text-ink/60 dark:text-ivory/60">
              Every type of business needs something slightly different from its website — a
              salon needs bookings and a gallery, a trades business needs a quote form people
              trust, a guesthouse needs rooms and rates. Browse concept demos below to see what
              yours could look like, built for a Pietermaritzburg business like yours.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact?requestType=mockup">Get a free homepage mockup</Button>
              <WhatsAppButton variant="button" label="WhatsApp a question" />
            </div>
          </RevealOnScroll>
        </div>

        <SectionDivider className="my-14" />

        <RevealOnScroll variant="tech">
          <IndustriesGrid demos={DEMOS} />
        </RevealOnScroll>

        <SectionDivider className="my-14" />

        <RevealOnScroll variant="tech" className="mx-auto max-w-xl">
          <Card className="text-center">
            <h2 className="font-display text-2xl text-ink dark:text-ivory">
              Don&rsquo;t see your industry?
            </h2>
            <p className="mt-2 text-sm text-ink/60 dark:text-ivory/60">
              Most businesses follow the same patterns shown above — tell us a bit about yours
              and we&rsquo;ll show you what it could look like.
            </p>
            <Button href="/contact?requestType=mockup" className="mt-5">
              Request a quote
            </Button>
          </Card>
        </RevealOnScroll>

        <SectionDivider className="my-14" />

        <RevealOnScroll variant="tech" className="mx-auto max-w-2xl">
          <h2 className="text-center font-display text-3xl text-ink dark:text-ivory">FAQ</h2>
          <div className="mt-8 divide-y divide-ink/10 dark:divide-ivory/10">
            {HUB_FAQS.map((item) => (
              <div key={item.q} className="py-5">
                <h3 className="font-medium text-ink dark:text-ivory">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 dark:text-ivory/65">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>

        <SectionDivider className="my-14" />

        <RevealOnScroll
          variant="tech"
          className="mx-auto max-w-xl rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center sm:p-12"
        >
          <h2 className="font-display text-3xl text-ink dark:text-ivory">
            Ready to see yours?
          </h2>
          <p className="mt-2 text-ink/60 dark:text-ivory/60">
            Tell us about your business and we&rsquo;ll put together a free homepage mockup.
          </p>
          <Button href="/contact?requestType=mockup" className="mt-6">
            Get a free homepage mockup
          </Button>
        </RevealOnScroll>
      </div>
    </div>
  );
}
