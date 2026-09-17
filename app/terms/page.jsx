import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/content";

export const metadata = {
  title: "Terms",
  description: `Terms of service for ${SITE.name}.`,
};

// Placeholder structure only — final copy to be pasted in.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="[date]">
      <LegalSection heading="1. Introduction">
        <p>
          [Placeholder] These terms govern the use of our website and the
          services provided by {SITE.name}.
        </p>
      </LegalSection>

      <LegalSection heading="2. Services">
        <p>
          [Placeholder] Description of the website design and development
          services offered, referencing our{" "}
          <a href="/services" className="underline hover:text-brass">
            Services & Pricing
          </a>{" "}
          page.
        </p>
      </LegalSection>

      <LegalSection heading="3. Payment terms">
        <p>
          [Placeholder] Deposit, balance, and maintenance billing terms.
        </p>
      </LegalSection>

      <LegalSection heading="4. Project scope & revisions">
        <p>
          [Placeholder] What is included in each package, and how changes
          outside of scope are handled.
        </p>
      </LegalSection>

      <LegalSection heading="5. Intellectual property">
        <p>
          [Placeholder] Ownership of the final website, and of any
          pre-existing tools, templates, or code used to build it.
        </p>
      </LegalSection>

      <LegalSection heading="6. Limitation of liability">
        <p>[Placeholder] Standard limitation of liability language.</p>
      </LegalSection>

      <LegalSection heading="7. Termination">
        <p>
          [Placeholder] Conditions under which either party may end a
          project or maintenance agreement.
        </p>
      </LegalSection>

      <LegalSection heading="8. Contact us">
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${SITE.email}`} className="underline hover:text-brass">
            {SITE.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
