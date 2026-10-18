import QRCode from "qrcode";
import { whatsappLink } from "@/lib/content";

// Server Component — the `qrcode` package only ever runs here, at render
// time, so it costs nothing in the client bundle. Renders the exact same
// wa.me link WhatsAppButton uses, as an inline SVG (no external image
// request, no layout shift).
export default async function WhatsAppQRCode({ message, className = "" }) {
  const url = whatsappLink(message);
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 1,
    width: 160,
    color: { dark: "#1B1A17", light: "#FAF8F3" },
  });

  return (
    <div
      role="img"
      aria-label="QR code to start a WhatsApp chat with Aggrandize Web Co."
      className={`inline-block overflow-hidden rounded-xl border border-ink/10 dark:border-ivory/10 ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
