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
        className="group flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="flex items-center gap-3">
          <span
            className={`h-4 w-0.5 rounded-full bg-brass transition-all duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
          <span className="font-display text-lg text-ink transition-colors group-hover:text-brass">
            {question}
          </span>
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 flex-shrink-0 text-brass transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
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
