# Aggrandize

Aggrandize Web Co. — a web design studio building fast, modern websites for small businesses in Pietermaritzburg, South Africa. This repo is the studio's own marketing site: a portfolio and sales tool meant to convert visitors into signed clients.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + [Tailwind CSS](https://tailwindcss.com)
- Deployed to [Vercel](https://vercel.com)
- Fonts loaded via `next/font/google`: Playfair Display (headings) and Work Sans (body)

## Project structure

```
.
├── app/
│   ├── layout.jsx          # Fonts, header/footer, WhatsApp FAB, cookie consent
│   ├── page.jsx            # Homepage
│   ├── work/                # Portfolio grid + [slug] case studies
│   ├── services/             # Services & Pricing
│   ├── contact/               # Contact form
│   ├── privacy/, terms/, cookies/   # Legal pages (placeholder copy)
│   └── about/, process/, blog/       # Phase 2 stub routes
├── components/              # Header, Footer, Logo, SectionDivider, PackageCard, etc.
├── lib/
│   └── content.js           # All real copy, pricing, and easily-edited constants
└── public/
    └── favicon.svg
```

## Editing content

Nearly everything editable lives in `lib/content.js`:

- `FOUNDING_SPOTS_REMAINING` — the "X of 5 Founding Client spots remaining" banner. No backend; just update the number.
- `PACKAGES`, `ADD_ONS`, `MAINTENANCE_PLANS` — pricing and package details.
- `PROJECTS` — case studies shown on the homepage and `/work`. Replace the placeholder entries (OKUHLE, Braai & Bake, RL Paws Co) as each project is ready.
- `FAQS`, `TRUST_POINTS` — homepage copy.
- `SITE` — WhatsApp number, email, slogan, value proposition.
- `SOCIAL_LINKS` — Instagram/Facebook/LinkedIn slots exist in the header/footer but are inert (`href: "#"`) until each profile is live. Flip `live: true` and set the real URL when ready.

## Brand assets

The logo (wordmark + ascending flourish + favicon) is currently recreated in code — `components/Logo.jsx`, `components/Flourish.jsx`, and `public/favicon.svg` — since no source files were available at build time. Swap these for the real SVG/PNG assets when provided; every other component that reuses the flourish motif (`components/SectionDivider.jsx`) references `Flourish.jsx`, so updating that one file updates the motif everywhere.

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build locally
npx eslint .     # lint
```

## Notes / known gaps for launch

- **Contact form**: currently simulates submission client-side only. Wire `components/ContactForm.jsx`'s `handleSubmit` to a real endpoint (e.g. a serverless function or a form service) before launch.
- **Legal pages**: `/privacy`, `/terms`, `/cookies` are structured with placeholder `[Placeholder]` copy, ready for the final POPIA-aligned text to be pasted in.
- **Cookie consent**: gates non-essential cookies per POPIA. Check `getCookieConsent() === "accepted"` (from `components/CookieConsent.jsx`) before loading any analytics or third-party embeds.
- **OG image**: add `public/og-image.png` (1200×630) and re-enable it in `app/layout.jsx`'s metadata once a brand image is ready.

## License

MIT — see [LICENSE](LICENSE).
