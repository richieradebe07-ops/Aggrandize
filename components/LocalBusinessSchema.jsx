import { SITE } from "@/lib/content";

// schema.org LocalBusiness JSON-LD for local SEO — helps the site itself
// rank for "web designer Pietermaritzburg"-style searches. Rendered once,
// on the homepage.
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.valueProp,
    email: SITE.email,
    telephone: `+${SITE.whatsappNumber}`,
    url: "https://aggrandizewebco.co.za",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pietermaritzburg",
      addressRegion: "KwaZulu-Natal",
      addressCountry: "ZA",
    },
    areaServed: "Pietermaritzburg, South Africa",
    priceRange: "R",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
