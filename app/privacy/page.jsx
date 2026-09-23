import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/content";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} collects, uses, and protects personal information, in line with POPIA.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={COMPANY.policiesLastUpdated}
      version={COMPANY.policyVersion}
    >
      <LegalSection heading="1. Who we are">
        <p>
          {COMPANY.legalName} (&ldquo;Aggrandize&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
          designs and builds websites for small businesses. We are the Responsible Party for the
          personal information described in this policy under the Protection of Personal
          Information Act 4 of 2013 (POPIA). Our Information Officer is{" "}
          {COMPANY.informationOfficer}, reachable at{" "}
          <a href={`mailto:${COMPANY.email}`} className="underline hover:text-brass">
            {COMPANY.email}
          </a>{" "}
          or {COMPANY.phone}. Physical address: {COMPANY.physicalAddress}.
        </p>
      </LegalSection>

      <LegalSection heading="2. Information we collect">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Contact and enquiry forms: your name, business name, email address, the package
            you&rsquo;re interested in, and your message.
          </li>
          <li>
            Get Started project brief: business name, contact name, email address, phone/WhatsApp
            number, your project description, pages and products or services you want listed,
            brand and style preferences, and any images you upload (such as logos, product photos,
            and reference images).
          </li>
          <li>
            Payments: payments are processed by PayFast. We do not see or store your card or bank
            details. We receive only a payment reference, the amount, and whether the payment
            succeeded.
          </li>
          <li>
            Consent records: when you accept these policies at checkout, we record the date and
            time and the policy version you agreed to.
          </li>
          <li>WhatsApp and email: messages you send us directly.</li>
          <li>
            Website usage: anonymous, aggregated information about how the site is used (pages
            visited, device and browser type), collected only as described in our{" "}
            <Link href="/cookies" className="underline hover:text-brass">
              Cookie Policy
            </Link>
            .
          </li>
        </ul>
        <p>We do not knowingly collect information from anyone under 18.</p>
      </LegalSection>

      <LegalSection heading="3. Why we use it">
        <ul className="list-disc space-y-2 pl-5">
          <li>To respond to your enquiry and prepare quotes</li>
          <li>To plan, build, and deliver the website you&rsquo;ve paid for</li>
          <li>To process and confirm payments and keep financial records</li>
          <li>To provide maintenance and support if you subscribe to a maintenance plan</li>
          <li>To improve our website, using aggregated usage data only</li>
        </ul>
        <p>
          We will not send you marketing messages unless you&rsquo;ve agreed to receive them, and
          you can opt out at any time.
        </p>
      </LegalSection>

      <LegalSection heading="4. Our lawful basis">
        <p>
          We process your information because you&rsquo;ve consented to it, because it&rsquo;s
          needed to take steps towards or perform a contract with you, because the law requires it
          (for example, keeping financial records), or because we have a legitimate interest that
          doesn&rsquo;t override your rights.
        </p>
      </LegalSection>

      <LegalSection heading="5. Who we share it with">
        <p>
          We don&rsquo;t sell your personal information. We share it only with service providers
          (&ldquo;operators&rdquo;) who help us run the business, and only as far as they need it:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Vercel: website hosting, analytics, and storage of uploaded images (Vercel Blob)</li>
          <li>PayFast: payment processing</li>
          <li>Resend: sending email notifications</li>
          <li>Google (Gmail): business email</li>
          <li>Meta (WhatsApp): if you contact us on WhatsApp</li>
        </ul>
        <p>We may also disclose information where the law requires it.</p>
      </LegalSection>

      <LegalSection heading="6. Information stored outside South Africa">
        <p>
          Some of these providers store data on servers outside South Africa. We use only
          reputable providers that are bound by data-protection laws or contractual obligations
          offering protection comparable to POPIA, as section 72 of POPIA requires.
        </p>
      </LegalSection>

      <LegalSection heading="7. How long we keep it">
        <ul className="list-disc space-y-2 pl-5">
          <li>Enquiries that don&rsquo;t become projects: up to 12 months, then deleted</li>
          <li>
            Client project records, invoices, and payment records: 5 years after the project ends,
            to meet tax and legal record-keeping requirements
          </li>
          <li>
            Uploaded images and project files: for the duration of the project and any
            maintenance plan, then deleted on request or within 12 months of the relationship
            ending
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="8. How we protect it">
        <p>
          Our site uses encrypted connections (SSL/TLS). Access to client information is limited
          to Aggrandize, and we use secure, access-controlled services to store it. No system is
          completely secure, but we take reasonable technical and organisational steps to prevent
          loss, misuse, or unauthorised access. If a security compromise affects your information,
          we will notify you and the Information Regulator as POPIA requires.
        </p>
      </LegalSection>

      <LegalSection heading="9. Your rights">
        <p>You have the right to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>ask whether we hold your information and request a copy of it</li>
          <li>ask us to correct or delete inaccurate, outdated, or unnecessary information</li>
          <li>object to us processing it, or withdraw your consent at any time</li>
          <li>refuse direct marketing</li>
          <li>lodge a complaint with the Information Regulator</li>
        </ul>
        <p>
          To make a request, email{" "}
          <a href={`mailto:${COMPANY.email}`} className="underline hover:text-brass">
            {COMPANY.email}
          </a>
          . We may need to verify your identity, and we&rsquo;ll respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection heading="10. Complaints">
        <p>
          If you&rsquo;re unhappy with how we&rsquo;ve handled your information, please contact us
          first. You can also complain to the Information Regulator (South Africa) at{" "}
          <a
            href="https://www.inforegulator.org.za"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-brass"
          >
            www.inforegulator.org.za
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="11. Changes to this policy">
        <p>
          We may update this policy. The date and version at the top show when it last changed.
          Significant changes will be highlighted on this page.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
