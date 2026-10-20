import { buildOgImageResponse, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/ogImageContent";
import { PROJECTS } from "@/lib/content";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image({ params }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return buildOgImageResponse({
    title: project ? project.name : "Our Work",
    subtitle: project?.tagline,
  });
}
