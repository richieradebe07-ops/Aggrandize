/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF8F3",
        ink: "#1B1A17",
        brass: "#A9823C",
        // Muted grey-ink tone for "before" states (e.g. ChanceChart) —
        // deliberately understated next to brass, not a neutral gray.
        dormant: "#8A8880",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        content: "1200px",
      },
      // Fluid display headings — same min/max pixel sizes as the
      // `text-4xl ... sm:text-5xl` / `text-3xl ... sm:text-4xl` pairs they
      // replace (so nothing changes at the extremes of the viewport), but
      // scale smoothly in between instead of jumping at the `sm` breakpoint.
      // Extends (doesn't replace) Tailwind's own scale — text-sm, text-xl
      // etc. are unaffected.
      fontSize: {
        "display-md": ["clamp(1.875rem, 1.4rem + 2.14vw, 2.25rem)", { lineHeight: "1.2" }],
        "display-lg": ["clamp(2.25rem, 1.29rem + 4.29vw, 3rem)", { lineHeight: "1.1" }],
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Same reveal, plus a blur-to-focus pass for a more modern, precise
        // feel — opt in via RevealOnScroll's `variant="tech"` prop.
        revealBlur: {
          "0%": { opacity: "0", transform: "translateY(16px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        // Slow ambient drift for the hero's background glow — deliberately
        // gentle, meant to be felt more than seen.
        float: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(14px, -18px) scale(1.06)" },
        },
        // A brief brass flash — used on the Get Started running total to
        // signal "this number just changed" without a number ticker.
        flashHighlight: {
          "0%": { backgroundColor: "rgba(169,130,60,0.35)" },
          "100%": { backgroundColor: "rgba(169,130,60,0.1)" },
        },
      },
      animation: {
        reveal: "reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal-blur": "revealBlur 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 10s ease-in-out infinite",
        "flash-highlight": "flashHighlight 900ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
