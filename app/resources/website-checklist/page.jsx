import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import ChecklistSignupForm from "@/components/ChecklistSignupForm";
import Button from "@/components/Button";
import { pageMetadata } from "@/lib/seo";

// DRAFT — content pending your review. Deliberately not linked from the
// header/footer nav (lib/content.js NAV_LINKS) and noindexed below, so it
// only exists at this direct URL until you approve it. Once approved:
// 1) remove the `robots: { index: false }` line below, and
// 2) add it to NAV_LINKS (and app/sitemap.js's STATIC_PATHS) yourself.
export const metadata = {
  ...pageMetadata({
    title: "10 Things Your Small Business Website Needs",
    description:
      "A practical checklist for small business owners in South Africa: what a website actually needs to bring in enquiries, from clear pricing to a working contact form.",
    path: "/resources/website-checklist",
  }),
  robots: { index: false, follow: false },
};

const CHECKLIST = [
  {
    title: "1. A clear statement of what you do, above the fold",
    body:
      "A visitor should be able to tell what your business does and who it's for within about five seconds, without scrolling. If your homepage opens with a vague slogan and no plain description, you're losing people who would otherwise have stayed.",
  },
  {
    title: "2. A way to contact you that actually works on a phone",
    body:
      "Most of your visitors are on a phone. A contact form that's fiddly to fill in on a small screen, or a phone number that isn't tappable, costs you enquiries you never hear about. Test your own contact page on your own phone.",
  },
  {
    title: "3. Real pricing, or at least a real starting point",
    body:
      "\"Contact us for a quote\" filters out more customers than it filters in. Even a \"from R X\" figure or a described package lets a visitor self-qualify before they reach out, which means the enquiries you do get are warmer.",
  },
  {
    title: "4. Fast load times, especially on mobile data",
    body:
      "A site that takes several seconds to become usable on a average mobile connection loses visitors before they see anything. Heavy, unoptimised images are the most common cause — check yours with a free tool like Google PageSpeed Insights.",
  },
  {
    title: "5. A reason to trust you, specific to your business",
    body:
      "Generic trust badges convince nobody. What works is specific: how long you've been operating, a real example of work you've done, or a direct way to verify you (a Google Business Profile, a real street address, a real phone number that gets answered).",
  },
  {
    title: "6. One obvious next step per page",
    body:
      "Every page should have one clear thing you want the visitor to do next — book a call, send a brief, request a quote. If a page has five competing buttons and links, most visitors do none of them.",
  },
  {
    title: "7. Content that answers the questions people actually ask you",
    body:
      "Think about the three questions you get asked most on the phone or in a DM. If your website doesn't answer them, you're forcing every curious visitor to go through the friction of contacting you just to get basic information.",
  },
  {
    title: "8. Accessible, readable design",
    body:
      "Text that's too small or too low-contrast to read comfortably, especially in bright daylight on a phone, quietly loses you an audience you never see complaining. Decent contrast and a sensible minimum font size cost nothing and help everyone.",
  },
  {
    title: "9. A plan for keeping it up to date",
    body:
      "A website with outdated hours, an old phone number, or a \"2019\" copyright notice reads as abandoned. Whether that's a basic maintenance plan or just a calendar reminder to check it quarterly, have an actual plan rather than hoping you'll remember.",
  },
  {
    title: "10. Basic security and backups",
    body:
      "HTTPS (the padlock icon), kept-up-to-date software if you're on a CMS, and some form of backup. None of this is visible to visitors, which is exactly why it's easy to skip — until the day something breaks and there's no way back.",
  },
];

export default function WebsiteChecklistPage() {
  return (
    <div className="px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll variant="tech" className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-brass">
            Free resource
          </p>
          <h1 className="mt-3 font-display text-display-lg text-ink dark:text-ivory">
            10 Things Your Small Business Website Needs
          </h1>
          <p className="mt-4 text-ink/60 dark:text-ivory/60">
            No fluff — just the practical things that actually affect whether your website
            brings in enquiries, written for small business owners in South Africa.
          </p>
        </RevealOnScroll>

        <SectionDivider className="my-14" />

        <div className="space-y-10">
          {CHECKLIST.map((item, i) => (
            <RevealOnScroll key={item.title} as="section" variant="tech" delay={Math.min(i * 40, 200)}>
              <h2 className="font-display text-xl text-ink dark:text-ivory">{item.title}</h2>
              <p className="mt-2.5 leading-relaxed text-ink/70 dark:text-ivory/70">{item.body}</p>
            </RevealOnScroll>
          ))}
        </div>

        <SectionDivider className="my-14" />

        <RevealOnScroll
          variant="tech"
          className="rounded-2xl border border-ink/10 bg-white/60 p-8 dark:border-ivory/10 dark:bg-ivory/5 sm:p-10"
        >
          <h2 className="text-center font-display text-2xl text-ink dark:text-ivory">
            Want this as a link you can keep?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-sm text-ink/60 dark:text-ivory/60">
            Pop in your email and we&rsquo;ll send you a direct link to this page — no other
            mailing list, no spam.
          </p>
          <div className="mx-auto mt-6 max-w-sm">
            <ChecklistSignupForm />
          </div>
        </RevealOnScroll>

        <div className="mt-14 rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center sm:p-12">
          <h3 className="font-display text-xl text-ink dark:text-ivory">
            Want a second pair of eyes on your own site?
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink/65 dark:text-ivory/65">
            Our free website audit checks your site against this exact list and sends you a
            short, honest write-up.
          </p>
          <Button href="/audit" className="mt-6">
            Get my free audit
          </Button>
        </div>
      </div>
    </div>
  );
}
