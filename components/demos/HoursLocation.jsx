import SectionHeading from "./SectionHeading";

// Opening hours / service times, with an optional free-text note below
// (after-hours call-out, area blurb) — covers Salon & Auto hours and
// Church service times alike.
export default function HoursLocation({ heading, subheading, hours = [], note }) {
  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mx-auto mt-8 max-w-sm divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white/60 dark:divide-ivory/10 dark:border-ivory/10 dark:bg-ivory/5">
        {hours.map((row) => (
          <div key={row.day} className="flex items-center justify-between px-6 py-3 text-sm">
            <span className="text-ink/70 dark:text-ivory/70">{row.day}</span>
            <span className="font-medium text-ink dark:text-ivory">{row.time}</span>
          </div>
        ))}
      </div>
      {note && (
        <p className="mx-auto mt-5 max-w-md text-center text-sm text-ink/55 dark:text-ivory/55">
          {note}
        </p>
      )}
    </section>
  );
}
