import { SITE } from "./content";

// Fetches the actual Playfair Display font for the OG/Twitter image, so the
// wordmark matches the live site instead of falling back to a generic sans.
// Both callers are static routes (generated once at build time, not per
// request), so a one-time network call here is a fine trade — and if it
// ever fails (offline build, blocked egress), satori just falls back to its
// built-in sans and the image still renders correctly, only less on-brand.
export async function loadPlayfairFont() {
  try {
    const cssRes = await fetch(
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&display=swap",
      {
        headers: {
          // Google serves woff2 to modern UAs and ttf/otf to older ones —
          // satori needs the latter.
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
        },
      }
    );
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

// Shared JSX tree for the site's Open Graph / Twitter Card image — used by
// both app/opengraph-image.jsx and app/twitter-image.jsx, and by each
// route's own opengraph-image.jsx, so every page's social card carries the
// same brand marks (swoosh, serif wordmark, palette) with its own title.
// `title` replaces the wordmark line; `subtitle` replaces the slogan line.
export function OgImageContent({ title, subtitle } = {}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FAF8F3",
      }}
    >
      <svg width={220} height={38} viewBox="0 0 160 28" fill="none">
        <path
          d="M4 22C22 10 36 8 52 14C68 20 84 22 98 15C112 8 128 6 142 10"
          stroke="#A9823C"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <circle cx="4" cy="22" r="3" fill="#A9823C" />
        <circle cx="150" cy="8" r="3" fill="#A9823C" />
      </svg>

      {title ? (
        // satori renders a bare <>...</> fragment as its own implicit
        // row-flex box, which broke the intended vertical stack here — an
        // explicit column div avoids that.
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              marginTop: 22,
              fontSize: 22,
              letterSpacing: 6,
              color: "rgba(169,130,60,0.9)",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            {SITE.name.toUpperCase()}
          </div>
          <div
            style={{
              marginTop: 14,
              maxWidth: 980,
              fontSize: 68,
              fontWeight: 600,
              textAlign: "center",
              color: "#1B1A17",
              fontFamily: "Playfair Display, Georgia, serif",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                marginTop: 18,
                maxWidth: 820,
                fontSize: 28,
                textAlign: "center",
                color: "rgba(27,26,23,0.65)",
                fontFamily: "Playfair Display, Georgia, serif",
                fontStyle: "italic",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              marginTop: 18,
              fontSize: 92,
              fontWeight: 600,
              color: "#1B1A17",
              fontFamily: "Playfair Display, Georgia, serif",
            }}
          >
            {SITE.name.replace(" Web Co.", "")}
          </div>

          <div style={{ display: "flex", alignItems: "center", marginTop: 6, marginBottom: 30 }}>
            <div style={{ width: 44, height: 1, backgroundColor: "rgba(169,130,60,0.6)" }} />
            <div
              style={{
                margin: "0 16px",
                fontSize: 22,
                letterSpacing: 8,
                color: "rgba(27,26,23,0.65)",
                fontFamily: "Arial, Helvetica, sans-serif",
              }}
            >
              WEB CO
            </div>
            <div style={{ width: 44, height: 1, backgroundColor: "rgba(169,130,60,0.6)" }} />
          </div>

          <div
            style={{
              fontSize: 32,
              fontStyle: "italic",
              color: "rgba(27,26,23,0.75)",
              fontFamily: "Playfair Display, Georgia, serif",
            }}
          >
            {SITE.slogan}
          </div>
        </div>
      )}
    </div>
  );
}

// Shared by every route's opengraph-image.jsx / twitter-image.jsx pair, so
// adding a page-specific social card is one small file per convention
// instead of re-deriving the ImageResponse/font-loading boilerplate.
export async function buildOgImageResponse({ title, subtitle } = {}) {
  const { ImageResponse } = await import("next/og");
  const fontData = await loadPlayfairFont();
  const options = fontData
    ? { ...OG_IMAGE_SIZE, fonts: [{ name: "Playfair Display", data: fontData, style: "normal", weight: 600 }] }
    : { ...OG_IMAGE_SIZE };
  return new ImageResponse(<OgImageContent title={title} subtitle={subtitle} />, options);
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";
