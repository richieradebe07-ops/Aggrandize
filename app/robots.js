import { SITE } from "@/lib/content";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/get-started/success", "/get-started/cancelled", "/api/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
