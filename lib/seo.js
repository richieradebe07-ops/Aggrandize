import { SITE } from "./content";

// Next.js's title template (set once in app/layout.jsx) only ever applies
// to the plain `title` field — it does NOT propagate into `openGraph.title`
// or `twitter.title`, and a route that only sets `title`/`description`
// otherwise just inherits the root layout's openGraph/twitter block
// wholesale (i.e. every page's social preview showing the homepage's own
// title/description). This helper is the one place that builds all three
// consistently from a single title/description per route, plus the
// canonical URL — call it from every route's `metadata` export (or
// `generateMetadata`) instead of hand-rolling the object.
// `ogImagePath` defaults to the sitewide fallback card (app/opengraph-image.jsx,
// served at /opengraph-image) — pass `${path}/opengraph-image` explicitly
// for a route that has its own opengraph-image.jsx + twitter-image.jsx
// pair (e.g. /services, /about, /contact, /industries, /work/[slug],
// /resources/website-checklist).
export function pageMetadata({ title, description, path = "/", ogImagePath = "/opengraph-image" }) {
  const fullTitle = `${title} — ${SITE.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    // Next.js shallow-merges metadata per nested field, replacing (not
    // merging into) the parent layout's own openGraph/twitter objects — so
    // every route using this helper has to restate `type`/`card` itself,
    // or they silently fall back to Twitter's small "summary" card instead
    // of the large-image one every page's root layout actually asks for.
    //
    // It also has to restate `images` explicitly: Next's opengraph-image.*
    // file convention only auto-populates `images` for a segment that
    // doesn't otherwise define its own `openGraph` object, and every route
    // calling this helper does — so without this, only the exact segment
    // holding an opengraph-image.jsx file gets a social-share image at all,
    // and every other page silently ships with none.
    openGraph: { title: fullTitle, description, url: path, type: "website", images: [ogImagePath] },
    twitter: { title: fullTitle, description, card: "summary_large_image", images: [ogImagePath] },
  };
}
