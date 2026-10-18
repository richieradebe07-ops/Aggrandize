"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import AmbientBackdrop from "./AmbientBackdrop";
import WhatsAppButton from "./WhatsAppButton";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  MinusIcon,
  ExpandIcon,
  CompressIcon,
} from "./icons";
import { PACKAGES, HOW_IT_WORKS, SITE, PRICING_PROMISE } from "@/lib/content";
import { useQuoteForm } from "./QuoteFormProvider";

// Expands a package's own `features` list for comparison purposes only —
// the E-Commerce package's feature list literally says "Everything in
// Business Site" (lib/content.js), so that one line is swapped for
// Business's actual feature strings here. Nothing is invented: every row
// that ends up in the comparison table is a feature string that already
// exists verbatim on some package in PACKAGES.
function expandFeatures(pkg) {
  const business = PACKAGES.find((p) => p.id === "business");
  return pkg.features.flatMap((feature) =>
    feature === "Everything in Business Site" && business ? business.features : [feature]
  );
}

// Builds the comparison matrix straight from PACKAGES — one row per unique
// feature string (in first-seen order across the real packages), ticked
// for whichever package(s) actually list it.
function buildComparisonRows() {
  const expanded = PACKAGES.map((pkg) => ({ id: pkg.id, features: expandFeatures(pkg) }));
  const order = [];
  const seen = new Set();
  expanded.forEach(({ features }) => {
    features.forEach((feature) => {
      if (!seen.has(feature)) {
        seen.add(feature);
        order.push(feature);
      }
    });
  });
  return order.map((label) => ({
    label,
    packageIds: expanded.filter((p) => p.features.includes(label)).map((p) => p.id),
  }));
}

const SLIDE_MIN_HEIGHT = "min-h-[460px] sm:min-h-[500px]";
const SWIPE_THRESHOLD_PX = 50;

function IntroSlide() {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center text-center ${SLIDE_MIN_HEIGHT}`}>
      <span className="text-xs font-semibold uppercase tracking-wide text-brass">
        Plans walkthrough
      </span>
      <h2 className="mt-3 font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
        What you get with {SITE.name}
      </h2>
      <p className="mx-auto mt-4 max-w-sm text-ink/60 dark:text-ivory/60">{SITE.valueProp}</p>
      <p className="mt-10 text-sm text-ink/40 dark:text-ivory/40">
        Use the arrows, swipe, or the arrow keys to step through each plan.
      </p>
    </div>
  );
}

function PlanSlide({ pkg }) {
  const { openQuoteForm } = useQuoteForm();
  return (
    <div className={`flex flex-1 flex-col ${SLIDE_MIN_HEIGHT}`}>
      <div className="text-center">
        {pkg.badge && (
          <span className="inline-block rounded-full bg-brass px-4 py-1 text-xs font-semibold uppercase tracking-wide text-ivory">
            {pkg.badge}
          </span>
        )}
        <h2 className="mt-3 font-display text-3xl text-ink dark:text-ivory">{pkg.name}</h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-ink/55 dark:text-ivory/55">
          {pkg.description}
        </p>
        <div className="mt-5">
          <span className="font-display text-4xl text-ink dark:text-ivory">{pkg.price}</span>
          <span className="ml-1.5 text-sm text-ink/45 dark:text-ivory/45">{pkg.priceNote}</span>
        </div>
        {pkg.deliveryTime && (
          <p className="mt-1 text-xs text-ink/45 dark:text-ivory/45">
            Delivery: {pkg.deliveryTime}
          </p>
        )}
      </div>

      <ul className="mx-auto mt-8 w-full max-w-sm flex-1 space-y-3">
        {pkg.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-ink/75 dark:text-ivory/75"
          >
            <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-brass" />
            {feature}
          </li>
        ))}
      </ul>

      <p className="mx-auto text-center text-xs font-medium uppercase tracking-wide text-brass/80">
        {PRICING_PROMISE}
      </p>

      <div className="mt-6 flex flex-col items-center gap-3">
        <Button
          onClick={() => openQuoteForm({ packageId: pkg.id })}
          variant={pkg.highlight ? "primary" : "secondary"}
        >
          Get this plan
        </Button>
        <WhatsAppButton
          variant="inline"
          message={`Hi, I'd like to ask about the ${pkg.name} (${pkg.price}).`}
        />
      </div>
    </div>
  );
}

function ComparisonSlide({ rows }) {
  return (
    <div className={`flex flex-1 flex-col ${SLIDE_MIN_HEIGHT}`}>
      <h2 className="text-center font-display text-3xl text-ink dark:text-ivory">
        Compare plans
      </h2>
      <div className="mx-auto mt-8 w-full max-w-xl overflow-x-auto">
        <table className="w-full min-w-[460px] border-collapse text-left">
          <thead>
            <tr>
              <th className="border-b border-ink/10 pb-3 pr-2 dark:border-ivory/10" />
              {PACKAGES.map((pkg) => (
                <th
                  key={pkg.id}
                  className={`border-b px-2 pb-3 text-center font-display text-base font-semibold ${
                    pkg.highlight
                      ? "border-brass/50 text-brass"
                      : "border-ink/10 text-ink/70 dark:border-ivory/10 dark:text-ivory/70"
                  }`}
                >
                  {pkg.name}
                  {pkg.badge && (
                    <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-wide text-brass">
                      {pkg.badge}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-ink/5 dark:border-ivory/5">
                <th
                  scope="row"
                  className="py-2.5 pr-2 text-xs font-medium text-ink/70 dark:text-ivory/70"
                >
                  {row.label}
                </th>
                {PACKAGES.map((pkg) => (
                  <td
                    key={pkg.id}
                    className={`py-2.5 px-2 text-center ${pkg.highlight ? "bg-brass/5" : ""}`}
                  >
                    {row.packageIds.includes(pkg.id) ? (
                      <CheckIcon className="mx-auto h-4 w-4 text-brass" />
                    ) : (
                      <MinusIcon className="mx-auto h-4 w-4 text-ink/25 dark:text-ivory/25" />
                    )}
                    <span className="sr-only">
                      {row.packageIds.includes(pkg.id) ? "Included" : "Not included"}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HowItWorksSlide() {
  return (
    <div className={`flex flex-1 flex-col items-center justify-center ${SLIDE_MIN_HEIGHT}`}>
      <h2 className="text-center font-display text-3xl text-ink dark:text-ivory">
        How it works
      </h2>
      <div className="mt-10 grid w-full max-w-2xl gap-6 sm:grid-cols-5">
        {HOW_IT_WORKS.map((step, i) => (
          <div key={step.title} className="text-center">
            <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-brass/40 font-display text-sm text-brass">
              {i + 1}
            </div>
            <h3 className="mt-3 font-display text-base text-ink dark:text-ivory">{step.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink/60 dark:text-ivory/60">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinalCtaSlide() {
  const { openQuoteForm } = useQuoteForm();
  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center text-center ${SLIDE_MIN_HEIGHT}`}
    >
      <h2 className="font-display text-3xl text-ink dark:text-ivory sm:text-4xl">
        Ready to get started?
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-ink/60 dark:text-ivory/60">
        Tell us about your business and we&rsquo;ll point you to the right plan.
      </p>
      <div className="mx-auto mt-8 flex w-full max-w-sm flex-col gap-4 sm:flex-row">
        <Button onClick={() => openQuoteForm({})} className="flex-1">
          Request a quote
        </Button>
        <WhatsAppButton variant="button" className="flex-1" />
      </div>
    </div>
  );
}

// An interactive, slide-deck-style walkthrough of the pricing plans —
// everything it renders (names, prices, features, the How It Works steps,
// the value proposition) is read straight from lib/content.js, never
// hardcoded here, so it can't drift from the real Services & Pricing page.
//
// No carousel library — a translateX track plus CSS transitions, same
// "no dependency" philosophy as RevealOnScroll. prefers-reduced-motion is
// already handled globally (app/globals.css zeroes transition-duration for
// everyone when it's set), so no extra handling is needed here.
export default function PlansWalkthrough() {
  const comparisonRows = buildComparisonRows();

  const slides = [
    { label: "Intro", content: <IntroSlide /> },
    ...PACKAGES.map((pkg) => ({ label: pkg.name, content: <PlanSlide key={pkg.id} pkg={pkg} /> })),
    { label: "Compare", content: <ComparisonSlide rows={comparisonRows} /> },
    { label: "How it works", content: <HowItWorksSlide /> },
    { label: "Get started", content: <FinalCtaSlide /> },
  ];

  const [index, setIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const touchStartXRef = useRef(null);

  const canGoPrev = index > 0;
  const canGoNext = index < slides.length - 1;

  function goTo(next) {
    setIndex(Math.max(0, Math.min(slides.length - 1, next)));
  }
  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  function handleKeyDown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  }

  function handleTouchStart(e) {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  }
  function handleTouchEnd(e) {
    if (touchStartXRef.current === null) return;
    const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartXRef.current;
    touchStartXRef.current = null;
    if (deltaX > SWIPE_THRESHOLD_PX) goPrev();
    else if (deltaX < -SWIPE_THRESHOLD_PX) goNext();
  }

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  function toggleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      // Safari
      el.webkitRequestFullscreen();
    }
  }

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Plans walkthrough"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden rounded-3xl border border-ink/10 bg-white/70 shadow-xl shadow-ink/5 outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ivory dark:border-ivory/10 dark:bg-ink/40 dark:shadow-black/30 dark:focus-visible:ring-offset-ink [&:fullscreen]:flex [&:fullscreen]:h-screen [&:fullscreen]:max-w-none [&:fullscreen]:flex-col [&:fullscreen]:justify-center [&:fullscreen]:rounded-none [&:fullscreen]:bg-ivory [&:fullscreen]:px-6 dark:[&:fullscreen]:bg-ink"
    >
      <AmbientBackdrop />

      <div className="relative z-10 flex items-center justify-between px-5 pt-5 sm:px-10">
        <span className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-ivory/40">
          {index + 1} / {slides.length} — {slides[index].label}
        </span>
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/60 transition-colors hover:border-brass hover:text-brass dark:border-ivory/20 dark:text-ivory/60"
        >
          {isFullscreen ? <CompressIcon className="h-3.5 w-3.5" /> : <ExpandIcon className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{isFullscreen ? "Exit" : "Fullscreen"}</span>
        </button>
      </div>

      <div className="relative z-10 overflow-hidden px-2 py-6 sm:px-4">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 px-3 sm:px-6"
              // Keeps off-screen slides out of the tab order and the
              // accessibility tree entirely, rather than just visually
              // hidden — otherwise a visitor tabbing through the page
              // would land on buttons/links for slides they can't see.
              inert={i !== index}
            >
              {/* Re-keying on slide change restarts the reveal animation —
                  a subtle per-slide entrance rather than an abrupt swap. */}
              <div key={i === index ? `active-${i}` : `inactive-${i}`} className={i === index ? "animate-reveal" : ""}>
                {slide.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={goPrev}
        disabled={!canGoPrev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-opacity hover:text-brass disabled:pointer-events-none disabled:opacity-0 dark:bg-ink/60 dark:text-ivory sm:left-4"
      >
        <ArrowLeftIcon />
      </button>
      <button
        type="button"
        onClick={goNext}
        disabled={!canGoNext}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-md backdrop-blur transition-opacity hover:text-brass disabled:pointer-events-none disabled:opacity-0 dark:bg-ink/60 dark:text-ivory sm:right-4"
      >
        <ArrowRightIcon />
      </button>

      <div className="relative z-10 flex items-center justify-center gap-2 pb-6">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-brass" : "w-2 bg-ink/20 hover:bg-ink/40 dark:bg-ivory/20 dark:hover:bg-ivory/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
