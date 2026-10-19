"use client";

import { createContext, useContext, useRef, useState } from "react";
import { PACKAGE_INTEREST_OPTIONS } from "@/lib/content";

// Shared trigger for every "take me to the quote form" CTA on the page —
// the Plans Walkthrough's per-plan buttons, its final-slide "Request a
// quote", and (Phase 3) the Free Mockup offer's CTA. All of them just call
// openQuoteForm() from anywhere in the tree; this provider owns the one
// <EmbeddedQuoteForm> instance they're all scrolling to and pre-filling.
const QuoteFormContext = createContext(null);

export function useQuoteForm() {
  const ctx = useContext(QuoteFormContext);
  if (!ctx) {
    throw new Error("useQuoteForm must be used within a QuoteFormProvider");
  }
  return ctx;
}

// The quote form's dropdown mirrors every real PACKAGES id directly; anything
// unrecognized falls through to ContactForm's own "unsure" default.
function mapPackageIdToQuoteInterest(packageId) {
  if (PACKAGE_INTEREST_OPTIONS.some((o) => o.value === packageId)) return packageId;
  return "";
}

export default function QuoteFormProvider({ children }) {
  const [selection, setSelection] = useState({ packageInterest: "", requestType: "quote" });
  const formRef = useRef(null);

  // `packageId` is a real PACKAGES id (or omitted) — translated to the
  // quote form's own vocabulary here, once, so every caller (Walkthrough,
  // Free Mockup offer, anything else later) can just pass the id it knows.
  function openQuoteForm({ packageId = "", requestType = "quote" } = {}) {
    setSelection({ packageInterest: mapPackageIdToQuoteInterest(packageId), requestType });
    // Deferred a tick so this also works when called during a slide
    // transition (the target is always already mounted — it just isn't
    // conditionally rendered — so this is purely to let the state update
    // commit before measuring scroll position).
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <QuoteFormContext.Provider value={{ selection, openQuoteForm, formRef }}>
      {children}
    </QuoteFormContext.Provider>
  );
}
