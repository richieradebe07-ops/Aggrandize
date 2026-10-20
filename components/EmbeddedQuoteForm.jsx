"use client";

import ContactForm from "./ContactForm";
import { useQuoteForm } from "./QuoteFormProvider";

// The one on-page quote form every CTA (Plans Walkthrough, Free Mockup
// offer) scrolls to and pre-fills via QuoteFormProvider's openQuoteForm().
// Re-keying ContactForm on selection change remounts it with the new
// initial values instead of trying to imperatively update its internal
// state from outside.
export default function EmbeddedQuoteForm({ id = "quote-form", title = "Request a quote" }) {
  const { selection, formRef } = useQuoteForm();

  return (
    <div ref={formRef} id={id} className="scroll-mt-24">
      <h2 className="text-center font-display text-3xl text-ink dark:text-ivory">{title}</h2>
      <div className="mx-auto mt-8 max-w-xl">
        <ContactForm
          key={`${selection.packageInterest}-${selection.requestType}-${selection.message}`}
          initialPackage={selection.packageInterest}
          initialMessage={selection.message}
          requestType={selection.requestType}
        />
      </div>
    </div>
  );
}
