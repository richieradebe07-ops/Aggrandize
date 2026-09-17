import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/content";

export const metadata = {
  title: "Cookie Policy",
  description: `How ${SITE.name} uses cookies, in line with POPIA.`,
};

// Placeholder structure only — final POPIA-aligned copy to be pasted in.
export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="[date]">
      <LegalSection heading="1. What are cookies">
        <p>
          [Placeholder] A short explanation of what cookies are and how
          they&apos;re used on this site.
        </p>
      </LegalSection>

      <LegalSection heading="2. Essential cookies">
        <p>
          [Placeholder] List of strictly necessary cookies that don&apos;t
          require consent (e.g. the cookie that remembers your consent
          choice itself).
        </p>
      </LegalSection>

      <LegalSection heading="3. Non-essential cookies">
        <p>
          [Placeholder] List of any analytics, marketing, or embedded
          third-party cookies, which only load after you accept them via
          the cookie banner.
        </p>
      </LegalSection>

      <LegalSection heading="4. Managing your preference">
        <p>
          You can change your cookie preference at any time using the
          &ldquo;Cookie Settings&rdquo; link in the footer of this site.
        </p>
      </LegalSection>

      <LegalSection heading="5. Contact us">
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${SITE.email}`} className="underline hover:text-brass">
            {SITE.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
