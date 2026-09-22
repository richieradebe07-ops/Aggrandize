import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/content";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Refund & Cancellation Policy",
  description: `Refund and cancellation terms for ${SITE.name} projects and maintenance plans.`,
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      lastUpdated={COMPANY.policiesLastUpdated}
      version={COMPANY.policyVersion}
    >
      <LegalSection heading="1. Cooling-off period">
        <p>
          If you&rsquo;re entitled to a cooling-off period under section 44 of the Electronic
          Communications and Transactions Act, you can cancel within 7 days of paying your deposit
          and receive a full refund, as long as we haven&rsquo;t started work. We start work only
          after our kickoff with you. If you ask us to start within those 7 days, you agree that
          the cooling-off refund no longer applies once work has begun.
        </p>
      </LegalSection>

      <LegalSection heading="2. Cancelling after work has started">
        <p>
          Either party may cancel a project in writing. If a project is cancelled after work has
          started, you pay for the work completed to date, calculated as a fair share of the total
          project fee. Any amount you&rsquo;ve paid above that is refunded. Any shortfall is
          invoiced.
        </p>
      </LegalSection>

      <LegalSection heading="3. Paused projects">
        <p>
          If we don&rsquo;t hear from you for 30 days, the project is paused. Paused projects can
          restart with a new timeline. Payments made remain credited to the project for up to 6
          months.
        </p>
      </LegalSection>

      <LegalSection heading="4. Maintenance plans">
        <p>
          Cancel any time with 30 days&rsquo; written notice. Payments already made for the current
          month aren&rsquo;t refunded. Annual prepayments are refunded pro rata for full unused
          months.
        </p>
      </LegalSection>

      <LegalSection heading="5. How refunds are paid">
        <p>
          Approved refunds are paid within 30 days, to the original payment method or by EFT to an
          account in the payer&rsquo;s name.
        </p>
      </LegalSection>

      <LegalSection heading="6. Contact">
        <p>
          Email{" "}
          <a href={`mailto:${COMPANY.email}`} className="underline hover:text-brass">
            {COMPANY.email}
          </a>{" "}
          to cancel or ask about a refund.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
