"use client";

import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";
import DemoMotif from "./DemoMotif";
import { useDemoToast } from "./DemoToast";
import { CloseIcon } from "../icons";

// Illustrated product grid + a client-side-only cart (never persisted, never
// sent anywhere) + a "concept checkout" view — framed explicitly as what the
// E-Commerce package looks like, per the brief. No real order is ever taken.
export default function Products({ heading, subheading, categories = [], items = [], motif = "bag" }) {
  const { showToast } = useDemoToast();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const filtered = useMemo(
    () => (activeCategory === "All" ? items : items.filter((p) => p.category === activeCategory)),
    [items, activeCategory]
  );

  const cartCount = cart.reduce((sum, line) => sum + line.qty, 0);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((line) => line.name === product.name);
      if (existing) {
        return prev.map((line) =>
          line.name === product.name ? { ...line, qty: line.qty + 1 } : line
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setDrawerOpen(true);
  }

  function removeFromCart(name) {
    setCart((prev) => prev.filter((line) => line.name !== name));
  }

  function placeOrder() {
    showToast("This is a concept checkout — no order was placed.");
    setCart([]);
    setCheckoutOpen(false);
    setDrawerOpen(false);
  }

  return (
    <section className="relative px-5 py-14 sm:px-8">
      <SectionHeading heading={heading} subheading={subheading} />

      <div className="mx-auto mt-6 flex max-w-content flex-wrap justify-center gap-2">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            aria-pressed={cat === activeCategory}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              cat === activeCategory
                ? "border-[rgba(var(--demo-accent-rgb),0.6)] bg-[rgba(var(--demo-accent-rgb),0.12)] text-[rgb(var(--demo-accent-rgb))]"
                : "border-ink/15 text-ink/60 hover:border-[rgba(var(--demo-accent-rgb),0.4)] dark:border-ivory/20 dark:text-ivory/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-8 grid max-w-content grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product) => (
          <div
            key={product.name}
            className="flex flex-col rounded-2xl border border-ink/10 bg-white/60 p-4 dark:border-ivory/10 dark:bg-ivory/5"
          >
            <div className="flex aspect-square items-center justify-center rounded-xl bg-[rgba(var(--demo-accent-rgb),0.1)]">
              <DemoMotif motif={motif} className="h-8 w-8 text-[rgb(var(--demo-accent-rgb))]" />
            </div>
            <p className="mt-3 text-sm font-medium text-ink dark:text-ivory">{product.name}</p>
            <p className="text-xs text-ink/50 dark:text-ivory/50">{product.price}</p>
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="mt-3 rounded-full bg-[rgb(var(--demo-accent-rgb))] px-3 py-1.5 text-xs font-semibold text-white"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>

      {/* Floating cart toggle */}
      <button
        type="button"
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-20 right-5 z-30 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-ivory shadow-lg dark:bg-ivory dark:text-ink sm:bottom-5"
      >
        Cart{cartCount > 0 ? ` (${cartCount})` : ""}
      </button>

      {drawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Cart"
          className="fixed inset-0 z-50 flex justify-end bg-ink/50 dark:bg-black/70"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className="flex h-full w-full max-w-sm flex-col bg-ivory p-6 dark:bg-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-ink dark:text-ivory">
                {checkoutOpen ? "Concept checkout" : "Your cart"}
              </h3>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close cart"
                className="rounded-full p-1.5 text-ink/60 hover:bg-ink/5 dark:text-ivory/60"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            {checkoutOpen ? (
              <div className="mt-6 flex flex-1 flex-col">
                <p className="rounded-lg border border-dashed border-ink/20 p-3 text-xs text-ink/60 dark:border-ivory/20 dark:text-ivory/60">
                  Concept checkout only — this demo does not take real orders or payments.
                </p>
                <ul className="mt-4 flex-1 space-y-2 overflow-y-auto text-sm">
                  {cart.map((line) => (
                    <li key={line.name} className="flex justify-between text-ink/80 dark:text-ivory/80">
                      <span>
                        {line.qty} &times; {line.name}
                      </span>
                      <span>{line.price}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={placeOrder}
                  className="mt-4 w-full rounded-full bg-[rgb(var(--demo-accent-rgb))] px-6 py-3 text-sm font-semibold text-white"
                >
                  Place order (demo)
                </button>
              </div>
            ) : (
              <div className="mt-6 flex flex-1 flex-col">
                {cart.length === 0 ? (
                  <p className="text-sm text-ink/55 dark:text-ivory/55">Your cart is empty.</p>
                ) : (
                  <ul className="flex-1 space-y-3 overflow-y-auto">
                    {cart.map((line) => (
                      <li key={line.name} className="flex items-center justify-between gap-3 text-sm">
                        <div>
                          <p className="font-medium text-ink dark:text-ivory">{line.name}</p>
                          <p className="text-ink/50 dark:text-ivory/50">
                            {line.qty} &times; {line.price}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(line.name)}
                          className="text-xs text-ink/40 underline hover:text-ink/70 dark:text-ivory/40"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                    className="mt-4 w-full rounded-full bg-[rgb(var(--demo-accent-rgb))] px-6 py-3 text-sm font-semibold text-white"
                  >
                    Proceed to concept checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
