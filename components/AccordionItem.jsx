"use client";

import { useState } from "react";
import { ChevronDownIcon } from "./icons";

export default function AccordionItem({ question, answer, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-ink/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-lg text-ink">{question}</span>
        <ChevronDownIcon
          className={`h-4 w-4 flex-shrink-0 text-brass transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-prose text-sm leading-relaxed text-ink/70">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
