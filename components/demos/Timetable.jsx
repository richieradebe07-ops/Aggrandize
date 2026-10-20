import SectionHeading from "./SectionHeading";

// Class timetable grouped by day — a simple stacked list rather than a wide
// grid, so it stays readable at 360px without horizontal scrolling.
export default function Timetable({ heading, subheading, days = [] }) {
  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mx-auto mt-8 grid max-w-content gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {days.map((day) => (
          <div
            key={day.day}
            className="rounded-2xl border border-ink/10 bg-white/60 p-5 dark:border-ivory/10 dark:bg-ivory/5"
          >
            <h3 className="font-display text-base text-[rgb(var(--demo-accent-rgb))]">{day.day}</h3>
            <ul className="mt-3 space-y-2">
              {day.classes.map((cls) => (
                <li key={`${day.day}-${cls.time}-${cls.name}`} className="flex justify-between text-sm">
                  <span className="text-ink/70 dark:text-ivory/70">{cls.name}</span>
                  <span className="font-medium text-ink dark:text-ivory">{cls.time}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
