import { LIGHTHOUSE_SCORES } from "@/lib/content";

const METRICS = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "bestPractices", label: "Best Practices" },
  { key: "seo", label: "SEO" },
];

function scoreColor(score) {
  if (score >= 90) return "text-brass";
  if (score >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
}

// Real, measured scores only — see LIGHTHOUSE_SCORES's own comment in
// lib/content.js for exactly how and when these were captured. Never add a
// score here without having actually run Lighthouse for it.
export default function SpeedProof() {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-3">
        {LIGHTHOUSE_SCORES.pages.map((page) => (
          <div
            key={page.path}
            className="rounded-2xl border border-ink/10 bg-white/60 p-6 dark:border-ivory/10 dark:bg-ivory/5"
          >
            <h3 className="font-display text-lg text-ink dark:text-ivory">{page.label}</h3>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {METRICS.map((metric) => (
                <div key={metric.key}>
                  <dt className="text-xs text-ink/50 dark:text-ivory/50">{metric.label}</dt>
                  <dd className={`font-display text-2xl ${scoreColor(page[metric.key])}`}>
                    {page[metric.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-xl text-center text-xs text-ink/45 dark:text-ivory/45">
        Lighthouse (mobile) scores, measured {LIGHTHOUSE_SCORES.measuredAt}. {LIGHTHOUSE_SCORES.method}
      </p>
    </div>
  );
}
