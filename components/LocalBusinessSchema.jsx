import { SITE, SOCIAL_LINKS, LOCAL_AREAS } from "@/lib/content";

// schema.org LocalBusiness JSON-LD for local SEO — helps the site itself
// rank for "web designer Pietermaritzburg"-style searches. Rendered once,
// on the homepage — the single source of this data, so name/phone/email/
// areaServed can't drift out of sync with what the footer, local landing
// pages (app/web-design/[area]/page.jsx), and contact details show.
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: SITE.name,
    description: SITE.valueProp,
    email: SITE.email,
    telephone: `+${SITE.whatsappNumber}`,
    url: SITE.url,
    // Reads straight from SOCIAL_LINKS (the same data the footer renders)
    // so a new live profile only ever needs adding in one place.
    sameAs: SOCIAL_LINKS.filter((s) => s.live).map((s) => s.href),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pietermaritzburg",
      addressRegion: "KwaZulu-Natal",
      addressCountry: "ZA",
    },
    // Matches the local landing pages 1:1 — every area named there is
    // listed here too.
    areaServed: LOCAL_AREAS.map((area) => `${area.name}, South Africa`),
    priceRange: "R",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
