"use client";

import Button from "./Button";
import { useQuoteForm } from "./QuoteFormProvider";

// [PLACEHOLDER: confirm the real turnaround time for a free mockup — not
// stated anywhere on the site yet, so it isn't claimed here as a specific
// promise the way the quote form's "reply within 24 hours" is.]
const STEPS = [
  {
    title: "Tell us about your business",
    description: "A couple of quick details below — takes about 2 minutes.",
  },
  {
    title: "We design your homepage",
    description:
      "We put together a free homepage mockup based on your business and brand — no payment, no obligation.",
  },
  {
    title: "You decide",
    description:
      "Like what you see? Move forward with a package. If not, there's no catch — you keep the mockup conversation either way.",
  },
];

// Opens the same shared quote form (QuoteFormProvider) that the Plans
// Walkthrough uses, just with requestType="mockup" instead of "quote" — see
// ContactForm.jsx and lib/email.js for how that changes the copy and
// subject lines on both emails it triggers.
export default function FreeMockupOffer() {
  const { openQuoteForm } = useQuoteForm();

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-brass/40 bg-brass/5 p-8 text-center sm:p-12">
      <span className="text-xs font-semibold uppercase tracking-wide text-brass">
        Free, no obligation
      </span>
      <h2 className="mt-3 font-display text-display-md text-ink dark:text-ivory">
        See your homepage design first
      </h2>
      <p className="mx-auto mt-3 max-w-md text-ink/60 dark:text-ivory/60">
        Not ready to commit? We&rsquo;ll design your homepage for free before you pay
        anything.
      </p>

      <div className="mx-auto mt-10 grid max-w-xl gap-6 text-left sm:grid-cols-3">
        {STEPS.map((step, i) => (
          <div key={step.title}>
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full border border-brass/40 font-display text-sm text-brass sm:mx-0">
              {i + 1}
            </div>
            <h3 className="mt-3 text-center font-display text-base text-ink dark:text-ivory sm:text-left">
              {step.title}
            </h3>
            <p className="mt-1.5 text-center text-xs leading-relaxed text-ink/60 dark:text-ivory/60 sm:text-left">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <Button onClick={() => openQuoteForm({ requestType: "mockup" })} className="mt-10">
        Request my free mockup
      </Button>
    </div>
  );
}
