import { buildOgImageResponse, OG_IMAGE_SIZE, OG_IMAGE_CONTENT_TYPE } from "@/lib/ogImageContent";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function Image() {
  return buildOgImageResponse({
    title: "Services & Pricing",
    subtitle: "Straightforward packages, no hidden fees.",
  });
}
