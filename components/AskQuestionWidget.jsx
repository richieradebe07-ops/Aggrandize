"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import { ChatIcon, CloseIcon } from "./icons";
import { useCookieBannerVisible } from "./CookieConsent";

// A secondary, lower-key floating option next to the WhatsApp button, for
// visitors who'd rather not leave the site or don't use WhatsApp. Deliberately
// smaller and more subdued than WhatsApp — that stays the primary, more
// prominent channel. Submits to /api/ask, which emails the studio the same
// way the Get Started flow does.
export default function AskQuestionWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({ name: "", email: "", question: "" });
  const bannerVisible = useCookieBannerVisible();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") close();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function close() {
    setOpen(false);
    // Reset after the close transition would settle, mirroring PackageFinder.
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage("");
      setValues({ name: "", email: "", question: "" });
    }, 200);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ask a question"
        className={`fixed right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-ivory text-ink/70 shadow-md transition-[transform,bottom] hover:scale-105 hover:border-brass hover:text-brass focus:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-ivory dark:border-ivory/20 dark:bg-ink dark:text-ivory/70 dark:focus-visible:ring-offset-ink ${
          bannerVisible ? "bottom-[232px] sm:bottom-[176px]" : "bottom-[92px] sm:bottom-[100px]"
        }`}
      >
        <ChatIcon className="h-5 w-5" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Ask a question"
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-ivory p-6 shadow-2xl dark:bg-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 text-ink/40 transition-colors hover:text-ink dark:text-ivory/40 dark:hover:text-ivory"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            {status === "sent" ? (
              <div className="py-4 text-center">
                <h3 className="font-display text-xl text-ink dark:text-ivory">Question sent</h3>
                <p className="mt-2 text-sm text-ink/65 dark:text-ivory/65">
                  Thanks — we&rsquo;ll get back to you by email shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display text-xl text-ink dark:text-ivory">Ask a question</h3>
                  <p className="mt-1 text-sm text-ink/60 dark:text-ivory/60">
                    Prefer not to use WhatsApp? Send us a quick message instead.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="ask-name"
                    className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
                  >
                    Name
                  </label>
                  <input
                    id="ask-name"
                    required
                    value={values.name}
                    onChange={update("name")}
                    className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ask-email"
                    className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
                  >
                    Email
                  </label>
                  <input
                    id="ask-email"
                    type="email"
                    required
                    value={values.email}
                    onChange={update("email")}
                    className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ask-question"
                    className="mb-1.5 block text-sm font-medium text-ink dark:text-ivory"
                  >
                    Question
                  </label>
                  <textarea
                    id="ask-question"
                    required
                    rows={3}
                    value={values.question}
                    onChange={update("question")}
                    className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm text-ink focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass dark:border-ivory/20 dark:bg-ivory/5 dark:text-ivory"
                  />
                </div>
                {errorMessage && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">
                    {errorMessage}
                  </p>
                )}
                <Button type="submit" disabled={status === "submitting"} className="w-full">
                  {status === "submitting" ? "Sending…" : "Send question"}
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
