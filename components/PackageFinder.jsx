"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PACKAGE_FINDER_QUESTIONS,
  getRecommendedPackage,
  FOUNDING_SPOTS_REMAINING,
} from "@/lib/content";
import { CloseIcon } from "./icons";

const TOTAL_STEPS = PACKAGE_FINDER_QUESTIONS.length;

export default function PackageFinder({ open, onClose }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (!open) {
      // Reset for next time, after the close animation would settle.
      const t = setTimeout(() => {
        setStep(0);
        setAnswers({});
      }, 200);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isResult = step >= TOTAL_STEPS;
  const currentQuestion = PACKAGE_FINDER_QUESTIONS[step];
  const recommended = isResult ? getRecommendedPackage(answers) : null;
  const qualifiesForFounding = FOUNDING_SPOTS_REMAINING > 0;

  function selectAnswer(value) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    setStep((s) => s + 1);
  }

  function goToContact() {
    onClose();
    router.push(`/contact?package=${recommended.id}`);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Package finder"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-ivory p-8 shadow-2xl sm:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close package finder"
          className="absolute right-5 top-5 text-ink/50 transition-colors hover:text-ink"
        >
          <CloseIcon />
        </button>

        {/* Progress indicator */}
        <div className="mb-8 flex gap-2">
          {PACKAGE_FINDER_QUESTIONS.map((q, i) => (
            <div
              key={q.id}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-brass" : "bg-ink/10"
              }`}
            />
          ))}
        </div>

        {!isResult ? (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-ink/40">
              Question {step + 1} of {TOTAL_STEPS}
            </p>
            <h2 className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              {currentQuestion.question}
            </h2>
            <div className="mt-8 grid gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectAnswer(option.value)}
                  className="rounded-xl border border-ink/15 px-5 py-4 text-left text-sm font-medium text-ink transition-colors hover:border-brass hover:bg-brass/5"
                >
                  {option.label}
                </button>
              ))}
            </div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="mt-6 text-sm text-ink/50 underline underline-offset-4 hover:text-ink"
              >
                Back
              </button>
            )}
          </div>
        ) : (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brass">
              Recommended for you
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">
              {recommended.name}
            </h2>
            <p className="mt-2 text-2xl text-ink/80">
              {recommended.price}{" "}
              <span className="text-sm text-ink/45">
                {recommended.priceNote}
              </span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink/65">
              {recommended.description}
            </p>

            {qualifiesForFounding && (
              <div className="mt-6 rounded-xl border border-brass/40 bg-brass/5 p-4">
                <p className="text-sm font-medium text-ink">
                  You&rsquo;d qualify for the Founding Client offer —
                  15% off, or a free add-on, plus maintenance pricing locked
                  in for life.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={goToContact}
              className="mt-8 w-full rounded-full bg-ink px-6 py-3.5 text-center text-sm font-semibold text-ivory transition-opacity hover:opacity-90"
            >
              Continue to Contact
            </button>
            <button
              type="button"
              onClick={() => setStep(0)}
              className="mt-4 w-full text-center text-sm text-ink/50 underline underline-offset-4 hover:text-ink"
            >
              Start over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
