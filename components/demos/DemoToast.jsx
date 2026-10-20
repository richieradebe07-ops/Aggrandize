"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

// Every interactive control on a demo site (forms, "book now", "call",
// WhatsApp-style buttons, add-to-cart) is inert — nothing is sent anywhere.
// This is the one shared mechanism that tells a visitor that, instead of
// each section reinventing its own toast.
const DemoToastContext = createContext(null);

const DEFAULT_MESSAGE = "This is a demo, nothing was sent.";

export function useDemoToast() {
  const ctx = useContext(DemoToastContext);
  if (!ctx) {
    throw new Error("useDemoToast must be used within a DemoToastProvider");
  }
  return ctx;
}

export default function DemoToastProvider({ children }) {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = useCallback((text = DEFAULT_MESSAGE) => {
    setMessage(text);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(null), 3200);
  }, []);

  return (
    <DemoToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
      >
        {message && (
          <div className="pointer-events-auto rounded-full border border-ink/15 bg-ink px-5 py-2.5 text-sm font-medium text-ivory shadow-lg dark:border-ivory/20 dark:bg-ivory dark:text-ink">
            {message}
          </div>
        )}
      </div>
    </DemoToastContext.Provider>
  );
}
