import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/content";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Terms",
  // SITE.name already ends in a period ("...Co."); don't add a second one.
  description: `Terms of service for ${SITE.name}`,
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated={COMPANY.policiesLastUpdated}
      version={COMPANY.policyVersion}
    >
      <LegalSection heading="1. About these terms">
        <p>
          These terms apply to your use of this website and to any website design, development,
          or maintenance services you buy from {COMPANY.legalName}. By using the site, or by
          ticking the agreement box at checkout, you accept them. For larger projects, we may also
          ask you to sign a Service Agreement. If that agreement conflicts with these terms, the
          signed agreement wins.
        </p>
      </LegalSection>

      <LegalSection heading="2. Our services and prices">
        <p>
          Packages, add-ons, maintenance plans, and prices are listed on our{" "}
          <Link href="/services" className="underline hover:text-brass">
            Services & Pricing
          </Link>{" "}
          page, in South African Rand. Prices shown are for guidance until your project brief is
          confirmed. If your brief needs work beyond the chosen package, we&rsquo;ll quote it and
          get your approval before doing it. Prices may change for future projects. Confirmed
          projects keep their agreed price.
        </p>
      </LegalSection>

      <LegalSection heading="3. What's not included">
        <p>
          Unless stated in your package or quote, prices don&rsquo;t include: domain name
          registration, third-party subscriptions or platform fees (for example Shopify, paid
          plugins, or premium fonts), stock photography, or ongoing hosting after launch (available
          through a maintenance plan).
        </p>
      </LegalSection>

      <LegalSection heading="4. Payment">
        <p>
          Work begins once your deposit is received through PayFast. Standard plan: 50% deposit,
          50% on completion. The Three-Part Split and Monthly Instalment plans follow the
          percentages shown at checkout. The final balance must be paid before the site is launched
          on your domain and before ownership is transferred. Late payments may pause work.
        </p>
      </LegalSection>

      <LegalSection heading="5. Your responsibilities">
        <p>
          You agree to provide the content, images, and feedback we need, within a reasonable
          time. You confirm that you own, or have permission to use, all content and images you
          provide, and that they don&rsquo;t infringe anyone else&rsquo;s rights or break any law.
          You&rsquo;re responsible for the accuracy of your business information shown on your
          site.
        </p>
      </LegalSection>

      <LegalSection heading="6. Timelines and revisions">
        <p>
          Estimated timelines (Starter 1–2 weeks, Business 3–4 weeks, E-Commerce 4–6 weeks) start
          when we receive your deposit and the content we need. Delays in content or feedback
          extend the timeline. Each project includes 2 rounds of revisions, each submitted as one
          consolidated list. Further revisions are quoted separately. If we don&rsquo;t hear from
          you for 30 days, the project is paused, and restarting may need a new timeline.
        </p>
      </LegalSection>

      <LegalSection heading="7. Ownership">
        <p>
          Once you&rsquo;ve paid in full, you own the final website design, content, and code we
          created for you, and we&rsquo;ll transfer the relevant accounts or files to you. We keep
          ownership of our general tools, templates, and know-how used across projects. Third-party
          assets remain under their own licences. Unless you tell us otherwise in writing, we may
          show the finished project in our portfolio and include a small &ldquo;Website by{" "}
          {SITE.name}&rdquo; credit link in your site&rsquo;s footer.
        </p>
      </LegalSection>

      <LegalSection heading="8. Warranty and support">
        <p>
          We&rsquo;ll fix bugs caused by our original build free of charge for 14 days after
          launch. After that, support and changes are covered by a maintenance plan or quoted
          separately.
        </p>
      </LegalSection>

      <LegalSection heading="9. Maintenance plans">
        <p>
          Maintenance plans are billed monthly (or annually if prepaid) and continue until
          cancelled. Either party can cancel with 30 days&rsquo; written notice. Unused monthly
          edits don&rsquo;t roll over. The Founding Client locked-in rate applies for as long as
          the plan stays active without a break.
        </p>
      </LegalSection>

      <LegalSection heading="10. Cancellations and refunds">
        <p>
          See our{" "}
          <Link href="/refunds" className="underline hover:text-brass">
            Refund Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection heading="11. Limitation of liability">
        <p>
          We build every site with care, but we can&rsquo;t guarantee it will produce any
          particular number of visitors, enquiries, or sales. To the extent the law allows,
          we&rsquo;re not liable for indirect or consequential losses (such as lost profits), and
          our total liability for any project is limited to the amount you&rsquo;ve paid us for
          it. Nothing in these terms limits rights you have under South African law that
          can&rsquo;t be excluded.
        </p>
      </LegalSection>

      <LegalSection heading="12. Acceptable use of this website">
        <p>
          Don&rsquo;t misuse the site, attempt to disrupt it, or submit unlawful, harmful, or
          infringing content through its forms.
        </p>
      </LegalSection>

      <LegalSection heading="13. Governing law">
        <p>These terms are governed by the laws of the Republic of South Africa.</p>
      </LegalSection>

      <LegalSection heading="14. Contact">
        <p>
          {COMPANY.legalName}, {COMPANY.physicalAddress}.{" "}
          <a href={`mailto:${COMPANY.email}`} className="underline hover:text-brass">
            {COMPANY.email}
          </a>{" "}
          · {COMPANY.phone}
        </p>
      </LegalSection>
    </LegalPage>
  );
}
