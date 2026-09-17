import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import CookieConsent from "@/components/CookieConsent";
import { SITE } from "@/lib/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://aggrandizewebco.co.za"),
  title: {
    default: `${SITE.name} — Refined presence for ambitious business.`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.valueProp,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `${SITE.name} — Refined presence for ambitious business.`,
    description: SITE.valueProp,
    siteName: SITE.name,
    locale: "en_ZA",
    type: "website",
    // TODO: add an /public/og-image.png (1200x630) once brand assets are final.
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${workSans.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory font-body text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <CookieConsent>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </CookieConsent>
      </body>
    </html>
  );
}
