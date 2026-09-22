import GetStartedForm from "@/components/GetStartedForm";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import TrustBadges from "@/components/TrustBadges";
import { getSubmission } from "@/lib/submissions";

export const metadata = {
  title: "Get Started",
  description: "Brief your project and secure your spot with a deposit.",
};

export default async function GetStartedPage({ searchParams }) {
  const params = (await searchParams) || {};
  const packageParam = Array.isArray(params.package) ? params.package[0] : params.package;
  const resumeId = Array.isArray(params.resume) ? params.resume[0] : params.resume;
  const foundingParam = Array.isArray(params.founding) ? params.founding[0] : params.founding;

  let initialData = null;
  if (resumeId) {
    const submission = await getSubmission(resumeId);
    // Only resume a draft that hasn't already been paid.
    if (submission && submission.status !== "paid") {
      initialData = submission;
    }
  }

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <RevealOnScroll variant="tech">
          <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">Let&rsquo;s brief your project</h1>
          <p className="mt-4 max-w-xl text-ink/60 dark:text-ivory/60">
            Fill in the details below, then secure your spot with a deposit. We&rsquo;ll review
            everything and be in touch to kick things off.
          </p>
        </RevealOnScroll>
        <SectionDivider className="my-8" />

        <GetStartedForm
          initialPackage={packageParam}
          initialData={initialData}
          initialFoundingIntent={foundingParam === "1"}
        />

        <TrustBadges className="mt-12 justify-center" />
      </div>
    </section>
  );
}
