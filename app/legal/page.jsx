import Link from "next/link";
import LegalPage, { LegalSection } from "@/components/LegalPage";
import { SITE } from "@/lib/content";
import { COMPANY, REGISTRATION_NUMBER_IS_PLACEHOLDER } from "@/lib/company";

export const metadata = {
  title: "Company Information",
  description: `Company and contact details for ${SITE.name}, as required by the Electronic Communications and Transactions Act.`,
};

const POLICY_LINKS = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/refunds", label: "Refund Policy" },
];

function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="w-40 flex-shrink-0 font-medium text-ink dark:text-ivory">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export default function CompanyInformationPage() {
  return (
    <LegalPage
      title="Company Information"
      lastUpdated={COMPANY.policiesLastUpdated}
      version={COMPANY.policyVersion}
    >
      <LegalSection heading="About this page">
        <p>
          Published in line with section 43 of the Electronic Communications and Transactions Act,
          which requires businesses trading online in South Africa to disclose these details.
        </p>
      </LegalSection>

      <LegalSection heading="Details">
        <dl className="space-y-3">
          <Row label="Full name" value={COMPANY.legalName} />
          <Row label="Legal status" value={COMPANY.legalStatus} />
          {!REGISTRATION_NUMBER_IS_PLACEHOLDER && (
            <Row label="Registration no." value={COMPANY.registrationNumber} />
          )}
          <Row label="Physical address" value={COMPANY.physicalAddress} />
          <Row
            label="Phone"
            value={
              <a href={`tel:${COMPANY.phone.replace(/\s+/g, "")}`} className="underline hover:text-brass">
                {COMPANY.phone}
              </a>
            }
          />
          <Row
            label="Email"
            value={
              <a href={`mailto:${COMPANY.email}`} className="underline hover:text-brass">
                {COMPANY.email}
              </a>
            }
          />
          <Row
            label="Website"
            value={
              <a href={SITE.url} className="underline hover:text-brass">
                {COMPANY.website}
              </a>
            }
          />
          <Row label="Information Officer" value={COMPANY.informationOfficer} />
        </dl>
      </LegalSection>

      <LegalSection heading="Payments">
        <p>
          Payments are processed securely by PayFast. We never see or store your card details.
        </p>
      </LegalSection>

      <LegalSection heading="Policies">
        <ul className="list-disc space-y-2 pl-5">
          {POLICY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="underline hover:text-brass">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </LegalSection>
    </LegalPage>
  );
}
