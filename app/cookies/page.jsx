import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/content";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Cookie Policy",
  description: `How ${SITE.name} uses cookies, in line with POPIA.`,
};

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      lastUpdated={COMPANY.policiesLastUpdated}
      version={COMPANY.policyVersion}
    >
      <LegalSection heading="1. What cookies are">
        <p>
          Cookies and similar technologies (such as your browser&rsquo;s local storage) are small
          pieces of data stored on your device, used to make a site work and to understand how
          it&rsquo;s used.
        </p>
      </LegalSection>

      <LegalSection heading="2. Strictly necessary (always on)">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Cookie consent preference (local storage): remembers whether you accepted or declined
            non-essential cookies
          </li>
          <li>
            Theme preference (local storage): remembers light or dark mode, if you chose one
          </li>
        </ul>
        <p>These are needed for the site to work and don&rsquo;t require consent.</p>
      </LegalSection>

      <LegalSection heading="3. Analytics (only with your consent)">
        <p>
          We use Vercel Web Analytics to understand, in aggregate, which pages are visited and on
          which devices. It loads only after you click Accept. It does not place tracking cookies
          and does not identify you personally.
        </p>
      </LegalSection>

      <LegalSection heading="4. Third-party links">
        <p>
          Clicking through to WhatsApp, Facebook, Instagram, or PayFast takes you to their sites,
          where their own cookie policies apply.
        </p>
      </LegalSection>

      <LegalSection heading="5. Managing your preference">
        <p>
          Change your choice at any time using &ldquo;Cookie Settings&rdquo; in the footer or the
          settings panel. You can also block or delete cookies in your browser, but blocking
          strictly necessary ones may stop parts of the site from working.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
