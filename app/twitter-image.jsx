import { ImageResponse } from "next/og";
import {
  OgImageContent,
  loadPlayfairFont,
  OG_IMAGE_SIZE,
  OG_IMAGE_CONTENT_TYPE,
} from "@/lib/ogImageContent";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

// Same image as opengraph-image.jsx — Next.js needs both file conventions
// present to populate the Twitter Card's image tag, it doesn't reuse
// opengraph-image automatically.
export default async function Image() {
  const fontData = await loadPlayfairFont();
  // Passing an explicit empty `fonts: []` array makes satori hard-fail with
  // "No fonts are loaded" — omitting the option entirely (undefined) is what
  // lets it fall back to its own built-in default font.
  const options = fontData
    ? { ...size, fonts: [{ name: "Playfair Display", data: fontData, style: "normal", weight: 600 }] }
    : { ...size };
  return new ImageResponse(<OgImageContent />, options);
}
