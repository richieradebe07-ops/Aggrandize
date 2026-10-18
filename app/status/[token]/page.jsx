import { notFound } from "next/navigation";
import SectionDivider from "@/components/SectionDivider";
import { getClientStatus, STAGES } from "@/lib/clientStatus";

// Deliberately no generateStaticParams here — this stays server-rendered
// per request rather than pre-built, so the set of valid tokens is never
// baked into the build output. Metadata stays generic (never the client's
// name) and noindex, in case a token ever leaks into a search engine or
// a browser history suggestion.
export const metadata = {
  title: "Project Status",
  robots: { index: false, follow: false },
};

export default async function ClientStatusPage({ params }) {
  const { token } = await params;
  const status = getClientStatus(token);
  if (!status) notFound();

  const currentIndex = STAGES.indexOf(status.stage);

  return (
    <section className="px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-3xl text-ink dark:text-ivory">
          {status.label || "Project status"}
        </h1>
        <SectionDivider className="my-8" />

        <ol className="space-y-4 text-left">
          {STAGES.map((stage, i) => {
            const reached = i <= currentIndex;
            const isCurrent = i === currentIndex;
            return (
              <li key={stage} className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-xs font-display ${
                    reached
                      ? "border-brass bg-brass text-ivory"
                      : "border-ink/20 text-ink/40 dark:border-ivory/25 dark:text-ivory/40"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={
                    isCurrent
                      ? "font-semibold text-brass"
                      : reached
                        ? "text-ink dark:text-ivory"
                        : "text-ink/40 dark:text-ivory/40"
                  }
                >
                  {stage}
                  {isCurrent ? " — current" : ""}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-10 text-xs text-ink/40 dark:text-ivory/40">
          Questions about where things stand? Just reply to our last email or message us on
          WhatsApp.
        </p>
      </div>
    </section>
  );
}
