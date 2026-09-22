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
// both app/opengraph-image.jsx and app/twitter-image.jsx so the two stay
// identical without duplicating the markup.
export function OgImageContent() {
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
  );
}

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };
export const OG_IMAGE_CONTENT_TYPE = "image/png";
