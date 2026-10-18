import Card from "./Card";
import { NOT_INCLUDED } from "@/lib/content";

// `detailed` adds delivery time and a "what's not included" list below the
// features — the full transparency view used on /services. The homepage's
// compact summary leaves it off (default false) to stay a teaser.
export default function PackageCard({ pkg, cta, detailed = false }) {
  return (
    <Card
      highlighted={pkg.highlight}
      className={`flex flex-col ${pkg.highlight ? "sm:scale-105" : ""}`}
    >
      {pkg.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ivory">
          {pkg.badge}
        </span>
      )}

      <h3 className="font-display text-2xl text-ink dark:text-ivory">{pkg.name}</h3>
      <p className="mt-2 text-sm text-ink/60 dark:text-ivory/60">{pkg.description}</p>

      <div className="mt-6">
        <span className="font-display text-3xl text-ink dark:text-ivory">{pkg.price}</span>
        <span className="ml-1 text-sm text-ink/50 dark:text-ivory/50">{pkg.priceNote}</span>
      </div>
      {detailed && pkg.deliveryTime && (
        <p className="mt-1.5 text-xs text-ink/45 dark:text-ivory/45">
          Delivery: {pkg.deliveryTime}
        </p>
      )}

      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink/75 dark:text-ivory/75">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brass" />
            {feature}
          </li>
        ))}
      </ul>

      {detailed && (
        <div className="mt-5 border-t border-ink/10 pt-4 dark:border-ivory/10">
          <p className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
            Not included
          </p>
          <ul className="mt-2 space-y-1.5">
            {NOT_INCLUDED.map((item) => (
              <li key={item} className="text-xs leading-relaxed text-ink/45 dark:text-ivory/45">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">{cta}</div>
    </Card>
  );
}
