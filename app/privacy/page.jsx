import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/content";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects personal information, in line with POPIA.`,
};

// Placeholder structure only — final POPIA-aligned copy to be pasted in.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="[date]">
      <LegalSection heading="1. Introduction">
        <p>
          [Placeholder] {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is
          committed to protecting your personal information in accordance
          with the Protection of Personal Information Act (POPIA). This
          policy explains what information we collect, why, and how it is
          used.
        </p>
      </LegalSection>

      <LegalSection heading="2. Information we collect">
        <p>
          [Placeholder] Details of the personal information collected via
          our contact form and other channels (e.g. name, business name,
          email, message content) will be listed here.
        </p>
      </LegalSection>

      <LegalSection heading="3. How we use your information">
        <p>
          [Placeholder] Explanation of the purposes for processing (e.g.
          responding to enquiries, preparing quotes, delivering services).
        </p>
      </LegalSection>

      <LegalSection heading="4. Cookies">
        <p>
          [Placeholder] Summary of cookie use, referencing our{" "}
          <a href="/cookies" className="underline hover:text-brass">
            Cookie Policy
          </a>{" "}
          for full detail.
        </p>
      </LegalSection>

      <LegalSection heading="5. Sharing of information">
        <p>
          [Placeholder] Whether personal information is shared with any
          third parties (e.g. hosting providers) and under what conditions.
        </p>
      </LegalSection>

      <LegalSection heading="6. Data security">
        <p>
          [Placeholder] Description of the measures taken to keep personal
          information secure.
        </p>
      </LegalSection>

      <LegalSection heading="7. Your rights">
        <p>
          [Placeholder] Your rights under POPIA, including access,
          correction, and deletion of your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="8. Contact us">
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
