import SectionDivider from "@/components/SectionDivider";

export const metadata = {
  title: "Our Process",
  description: "How a project with Aggrandize Web Co. goes from enquiry to launch.",
};

// Phase 2 — route reserved for a visual step-by-step:
// enquiry → proposal → deposit → build → launch.
const STEPS = ["Enquiry", "Proposal", "Deposit", "Build", "Launch"];

export default function ProcessPage() {
  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">
          Our Process
        </h1>
        <SectionDivider className="my-6" />
        <p className="text-ink/60">
          A detailed walkthrough is coming soon. In short:
        </p>
        <ol className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-2 gap-y-3 text-sm font-medium text-ink/70">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              {step}
              {i < STEPS.length - 1 && (
                <span className="text-brass" aria-hidden="true">
                  &rarr;
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
