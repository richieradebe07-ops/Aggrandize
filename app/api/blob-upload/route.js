import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Client-side direct upload to Vercel Blob (recommended for anything past a
// couple of MB — routing files through a serverless function's own request
// body runs into payload-size limits). The browser gets a short-lived token
// from this route, then PUTs the file straight to Blob storage.
export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: MAX_SIZE_BYTES,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({ pathname }),
        };
      },
      onUploadCompleted: async () => {
        // No server-side action needed here — the client already has the
        // resulting blob URL and includes it when it submits the brief.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 400 }
    );
  }
}
