import { SITE, PROJECTS, LOCAL_AREAS } from "@/lib/content";

// Static marketing routes only — transactional pages (get-started/success,
// get-started/cancelled) are deliberately excluded via robots.js/metadata
// noindex, and PROJECTS drives /work/[slug] automatically so a removed
// project (see lib/content.js) can never leave a stale URL in here.
const STATIC_PATHS = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/work", priority: 0.8, changeFrequency: "weekly" },
  { path: "/industries", priority: 0.8, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "weekly" },
  { path: "/compare", priority: 0.7, changeFrequency: "monthly" },
  { path: "/audit", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/get-started", priority: 0.6, changeFrequency: "yearly" },
  { path: "/pay", priority: 0.3, changeFrequency: "yearly" },
  { path: "/about", priority: 0.4, changeFrequency: "yearly" },
  { path: "/process", priority: 0.4, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.3, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.1, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.1, changeFrequency: "yearly" },
  { path: "/refunds", priority: 0.1, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.1, changeFrequency: "yearly" },
  { path: "/legal", priority: 0.1, changeFrequency: "yearly" },
];

export default function sitemap() {
  const base = SITE.url;
  const now = new Date();

  const staticEntries = STATIC_PATHS.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const projectEntries = PROJECTS.map((project) => ({
    url: `${base}/work/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const localAreaEntries = LOCAL_AREAS.map((area) => ({
    url: `${base}/web-design/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...projectEntries, ...localAreaEntries];
}
