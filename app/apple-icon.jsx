import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Apple touch icon — same flourish-and-dots mark as public/favicon.svg,
// rendered at the size iOS actually asks for. Next's file convention
// (app/apple-icon.jsx) auto-generates this and links it from <head>, so
// nothing in app/layout.jsx's `icons` needs to reference it.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF8F3",
          borderRadius: 32,
        }}
      >
        <svg width={130} height={23} viewBox="0 0 160 28" fill="none">
          <path
            d="M4 22C22 10 36 8 52 14C68 20 84 22 98 15C112 8 128 6 142 10"
            stroke="#A9823C"
            strokeWidth={9}
            strokeLinecap="round"
          />
          <circle cx="4" cy="22" r="10" fill="#A9823C" />
          <circle cx="150" cy="8" r="10" fill="#A9823C" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
