import SectionHeading from "./SectionHeading";
import InitialAvatar from "./InitialAvatar";

// Team/practitioner cards — initial-avatars stand in for photos. `bio` is
// optional (used by Law's team bios, skipped by shorter cards elsewhere).
export default function Team({ heading, subheading, members = [] }) {
  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mx-auto mt-8 grid max-w-content gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.name} className="flex flex-col items-center text-center">
            <InitialAvatar name={member.name} className="h-16 w-16 text-lg" />
            <p className="mt-3 font-display text-base text-ink dark:text-ivory">{member.name}</p>
            <p className="text-xs font-medium uppercase tracking-wide text-[rgb(var(--demo-accent-rgb))]">
              {member.role}
            </p>
            {member.bio && (
              <p className="mt-2 max-w-xs text-sm text-ink/60 dark:text-ivory/60">{member.bio}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
