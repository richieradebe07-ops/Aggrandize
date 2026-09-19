import { Playfair_Display, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AskQuestionWidget from "@/components/AskQuestionWidget";
import CookieConsent from "@/components/CookieConsent";
import SiteAnalytics from "@/components/SiteAnalytics";
import { SITE } from "@/lib/content";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

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
  metadataBase: new URL(SITE.url),
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
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Refined presence for ambitious business.`,
    description: SITE.valueProp,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${workSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col bg-ivory font-body text-ink antialiased dark:bg-ink dark:text-ivory">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory dark:focus:bg-ivory dark:focus:text-ink"
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
          <AskQuestionWidget />
          <SiteAnalytics />
        </CookieConsent>
      </body>
    </html>
  );
}
