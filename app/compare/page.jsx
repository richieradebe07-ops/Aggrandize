import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import CompareCTA from "@/components/CompareCTA";
import { COMPARISON_TABLE } from "@/lib/content";

export const metadata = {
  title: "Compare",
  description:
    "How Aggrandize Web Co. compares to DIY website builders and traditional web agencies.",
};

export default function ComparePage() {
  return (
    <div className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-content">
        <div className="relative overflow-hidden rounded-3xl py-8">
          <AmbientBackdrop />
          <RevealOnScroll
            variant="tech"
            className="relative z-10 mx-auto max-w-2xl text-center"
          >
            <h1 className="font-display text-4xl text-ink dark:text-ivory sm:text-5xl">
              How we compare
            </h1>
            <p className="mt-4 text-ink/60 dark:text-ivory/60">
              An honest, specific look at what you actually get with a
              custom-built site from Aggrandize versus the two most common
              alternatives.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll variant="tech" className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="w-1/4 border-b border-ink/10 pb-4 pr-4 align-bottom font-body text-xs font-semibold uppercase tracking-wide text-ink/40 dark:border-ivory/10 dark:text-ivory/40">
                  &nbsp;
                </th>
                {COMPARISON_TABLE.columns.map((column, i) => (
                  <th
                    key={column}
                    className={`border-b pb-4 pr-6 align-bottom font-display text-lg font-semibold ${
                      i === 0
                        ? "border-brass/40 text-brass"
                        : "border-ink/10 text-ink/70 dark:border-ivory/10 dark:text-ivory/70"
                    }`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_TABLE.rows.map((row) => (
                <tr key={row.label} className="border-b border-ink/10 dark:border-ivory/10">
                  <th
                    scope="row"
                    className="py-5 pr-4 align-top font-body text-sm font-medium text-ink dark:text-ivory"
                  >
                    {row.label}
                  </th>
                  {row.values.map((value, i) => (
                    <td
                      key={i}
                      className={`py-5 pr-6 align-top leading-relaxed ${
                        i === 0
                          ? "font-medium text-ink dark:text-ivory"
                          : "text-ink/60 dark:text-ivory/60"
                      }`}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </RevealOnScroll>

        <SectionDivider className="my-16" />

        <RevealOnScroll
          variant="tech"
          className="mx-auto max-w-xl rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center sm:p-12"
        >
          <h2 className="font-display text-2xl text-ink dark:text-ivory">
            Not sure which package fits?
          </h2>
          <p className="mt-2 text-sm text-ink/60 dark:text-ivory/60">
            Answer three quick questions and we&rsquo;ll point you to the
            right starting point.
          </p>
          <div className="mt-6 flex justify-center">
            <CompareCTA />
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
