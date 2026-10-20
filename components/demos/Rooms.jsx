import SectionHeading from "./SectionHeading";

// Tiny inline icon set for amenity chips — deliberately minimal (a handful
// of common B&B amenities), not a full icon library.
function AmenityIcon({ name, className = "h-3.5 w-3.5" }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  switch (name) {
    case "wifi":
      return (
        <svg {...common}>
          <path d="M5 12a11 11 0 0 1 14 0M8 15a7 7 0 0 1 8 0" strokeLinecap="round" />
          <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bath":
      return (
        <svg {...common}>
          <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" />
          <path d="M6 12V7a2 2 0 0 1 2-2" strokeLinecap="round" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M9 21h6" strokeLinecap="round" />
        </svg>
      );
    case "aircon":
      return (
        <svg {...common}>
          <path d="M12 3v18M4 7l16 10M20 7 4 17" strokeLinecap="round" />
        </svg>
      );
    case "parking":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 10l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
        </svg>
      );
  }
}

// Room/unit cards — B&B & guesthouse rates, each with a short blurb and a
// row of amenity chips.
export default function Rooms({ heading, subheading, items = [] }) {
  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mx-auto mt-8 grid max-w-content gap-6 sm:grid-cols-2">
        {items.map((room) => (
          <div
            key={room.name}
            className="rounded-2xl border border-ink/10 bg-white/60 p-6 dark:border-ivory/10 dark:bg-ivory/5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-lg text-ink dark:text-ivory">{room.name}</h3>
              <span className="whitespace-nowrap text-sm font-semibold text-[rgb(var(--demo-accent-rgb))]">
                {room.price}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink/65 dark:text-ivory/65">{room.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(room.amenities || []).map((amenity) => (
                <span
                  key={amenity}
                  className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink/60 dark:border-ivory/15 dark:text-ivory/60"
                >
                  <AmenityIcon name={amenity} />
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
