"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { ChevronDownIcon } from "../icons";

export default function FAQSection({ heading = "FAQ", subheading, items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <div className="mx-auto mt-8 max-w-2xl divide-y divide-ink/10 dark:divide-ivory/10">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-medium text-ink dark:text-ivory">{item.q}</span>
                <ChevronDownIcon
                  className={`h-4 w-4 flex-shrink-0 text-ink/50 transition-transform dark:text-ivory/50 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open && (
                <p className="pb-4 text-sm leading-relaxed text-ink/65 dark:text-ivory/65">
                  {item.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
