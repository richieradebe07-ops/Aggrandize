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
export function pageMetadata({ title, description, path = "/" }) {
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
    openGraph: { title: fullTitle, description, url: path, type: "website" },
    twitter: { title: fullTitle, description, card: "summary_large_image" },
  };
}
