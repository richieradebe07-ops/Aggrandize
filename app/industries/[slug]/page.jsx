import { notFound } from "next/navigation";
import DemoToastProvider from "@/components/demos/DemoToast";
import DemoTopBar from "@/components/demos/DemoTopBar";
import DemoHero from "@/components/demos/DemoHero";
import SectionRenderer from "@/components/demos/SectionRenderer";
import ReviewsPlaceholder from "@/components/demos/ReviewsPlaceholder";
import DemoFooter from "@/components/demos/DemoFooter";
import { getDemo, getRoutableDemos } from "@/lib/demos";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getRoutableDemos().map((demo) => ({ slug: demo.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo || demo.externalHref) return {};
  return {
    ...pageMetadata({
      title: `${demo.name} demo`,
      description: `A concept demo of what an Aggrandize Web Co. site for a ${demo.name.toLowerCase()} business could look like.`,
      path: `/industries/${demo.slug}`,
    }),
    // Crawlable (so internal links are followed) but never indexed — this
    // is a concept demo, not a real business or a page worth ranking on its
    // own. The hub page (/industries) is the one indexable entry point.
    robots: { index: false, follow: true },
  };
}

export default async function IndustryDemoPage({ params }) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo || demo.externalHref) notFound();

  return (
    <DemoToastProvider>
      <div
        style={{ "--demo-accent-rgb": demo.accentRgb }}
        className="bg-ivory dark:bg-ink"
      >
        <DemoTopBar industrySlug={demo.slug} />
        <DemoHero
          business={demo.business}
          tagline={demo.tagline}
          intro={demo.intro}
          motif={demo.motif}
          heroCta={demo.heroCta}
        />
        <SectionRenderer sections={demo.sections} />
        <ReviewsPlaceholder />
        <DemoFooter business={demo.business} />
      </div>
    </DemoToastProvider>
  );
}
