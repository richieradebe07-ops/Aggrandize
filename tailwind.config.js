/** @type {import('tailwindcss').Config} */
module.exports = {
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
      },
      animation: {
        reveal: "reveal 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal-blur": "revealBlur 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
