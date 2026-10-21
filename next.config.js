/** @type {import('next').NextConfig} */

// Resolves NEXT_PUBLIC_SITE_URL once at build time so lib/content.js's
// SITE.url (metadataBase, OG/Twitter image resolution, LocalBusiness
// structured data) never needs a hardcoded domain baked in as a fallback:
//   1. An explicit NEXT_PUBLIC_SITE_URL (set in Vercel's project settings,
//      or a local .env) always wins — this is what to set once a custom
//      domain is actually connected, with no code change required.
//   2. Otherwise, Vercel's own VERCEL_PROJECT_PRODUCTION_URL — the
//      production domain Vercel has already assigned this project (e.g.
//      aggrandize.vercel.app) — so sharing previews work correctly on
//      whichever of this repo's Vercel projects actually built the
//      deployment, without per-project configuration.
//   3. localhost, for local dev with neither of the above set.
// app/api/get-started/route.js has its own similar-looking siteOrigin()
// helper for PayFast callback URLs — that one is deliberately
// request-derived instead, since PayFast needs to call back to whichever
// host actually served the request, which metadata resolution (no request
// in scope) can't do.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  // pdfkit loads its standard-14 font metrics (Helvetica etc.) from data
  // files bundled inside the package via a relative fs read at runtime —
  // Next's serverless file tracing doesn't always follow that automatically,
  // so /api/pricing-pdf would 500 in production without this.
  outputFileTracingIncludes: {
    "/api/pricing-pdf": ["./node_modules/pdfkit/js/data/**"],
  },
  // Braai & Bake and RL Paws Co were removed from lib/content.js's PROJECTS
  // (never launched) — permanently redirect their old case-study URLs to
  // /work instead of letting them 404, in case either was shared or indexed.
  async redirects() {
    return [
      { source: "/work/braai-and-bake", destination: "/work", permanent: true },
      { source: "/work/rl-paws-co", destination: "/work", permanent: true },
      // The fictional bakery demo was renamed from "Braai & Bake" to
      // "Hearth & Crumb" because a real business called Braai & Bake
      // trades in Scottsville — redirect the old slug rather than 404.
      {
        source: "/work/braai-and-bake-demo",
        destination: "/work/hearth-and-crumb-demo",
        permanent: true,
      },
      // Vercel's own default project domain serves the exact same
      // deployment as the real www domain (it's just another alias), so
      // anyone who lands on it directly (an old bookmark, a stale shared
      // link) sees the site at the wrong host — the page's own canonical/
      // og:url tags already say www.aggrandizeweb.co.za (set via
      // metadataBase in app/layout.jsx), but that doesn't change what's in
      // the address bar or what a crawler fetches *from*. This sends that
      // traffic straight to the canonical domain instead.
      {
        source: "/:path*",
        has: [{ type: "host", value: "aggrandize.vercel.app" }],
        destination: "https://www.aggrandizeweb.co.za/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
