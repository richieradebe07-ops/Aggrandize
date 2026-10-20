"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import { useDemoToast } from "./DemoToast";

// Fully generic inert form — every booking/quote/enquiry/signup form across
// every demo is one of these, configured with a `fields` list. It accepts
// input like a real form, but submitting only ever shows the shared demo
// toast; nothing is sent anywhere, no network request is made.
//
// field: { name, label, type: "text"|"email"|"tel"|"date"|"number"|"select"|"textarea",
//          options?: string[], placeholder? }
export default function EnquiryForm({ heading, subheading, fields = [], submitLabel = "Submit", anchor = false }) {
  const { showToast } = useDemoToast();
  const [values, setValues] = useState(() =>
    Object.fromEntries(fields.map((f) => [f.name, ""]))
  );

  function update(name) {
    return (e) => setValues((v) => ({ ...v, [name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    showToast();
  }

  const inputClasses =
    "w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink focus:border-[rgba(var(--demo-accent-rgb),0.6)] focus:outline-none focus:ring-1 focus:ring-[rgba(var(--demo-accent-rgb),0.6)] dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory";

  return (
    <section id={anchor ? "enquire" : undefined} className="scroll-mt-20 px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />
      <form onSubmit={handleSubmit} className="mx-auto mt-8 max-w-lg space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
            >
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                rows={4}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={update(field.name)}
                className={inputClasses}
              />
            ) : field.type === "select" ? (
              <select
                id={field.name}
                value={values[field.name]}
                onChange={update(field.name)}
                className={inputClasses}
              >
                <option value="" disabled>
                  Select…
                </option>
                {(field.options || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={update(field.name)}
                className={inputClasses}
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full rounded-full bg-[rgb(var(--demo-accent-rgb))] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 sm:w-auto sm:px-10"
        >
          {submitLabel}
        </button>
        <p className="text-xs text-ink/40 dark:text-ivory/40">
          Demo form — nothing is sent, and no data is stored.
        </p>
      </form>
    </section>
  );
}
