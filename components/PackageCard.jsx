export default function PackageCard({ pkg, cta }) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
        pkg.highlight
          ? "border-brass bg-white shadow-xl shadow-brass/10 hover:shadow-2xl hover:shadow-brass/20 sm:scale-105"
          : "border-ink/10 bg-white/60 hover:shadow-lg hover:shadow-ink/5"
      }`}
    >
      {pkg.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brass px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ivory">
          {pkg.badge}
        </span>
      )}

      <h3 className="font-display text-2xl text-ink">{pkg.name}</h3>
      <p className="mt-2 text-sm text-ink/60">{pkg.description}</p>

      <div className="mt-6">
        <span className="font-display text-3xl text-ink">{pkg.price}</span>
        <span className="ml-1 text-sm text-ink/50">{pkg.priceNote}</span>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-ink/75">
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brass" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">{cta}</div>
    </div>
  );
}
