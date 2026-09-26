# Aggrandize

Aggrandize Web Co. — a web design studio building fast, modern websites for small businesses in Pietermaritzburg, South Africa. This repo is the studio's own marketing site: a portfolio and sales tool meant to convert visitors into signed clients.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + [Tailwind CSS](https://tailwindcss.com)
- Deployed to [Vercel](https://vercel.com), with [`@vercel/analytics`](https://vercel.com/docs/analytics) (see below)
- Fonts loaded via `next/font/google`: Playfair Display (headings) and Work Sans (body)
- Dark mode via Tailwind's class strategy — see below
- Server-side PDF generation (`pdfkit`) for the pricing download

## Project structure

```
.
├── app/
│   ├── layout.jsx          # Fonts, header/footer, WhatsApp FAB + ask widget, cookie consent, theme init script
│   ├── page.jsx            # Homepage
│   ├── opengraph-image.jsx, twitter-image.jsx  # Generated social share preview image (see below)
│   ├── work/                # Portfolio grid + [slug] case studies
│   ├── services/             # Services & Pricing (+ pricing PDF download link)
│   ├── compare/               # Aggrandize vs. DIY builders vs. traditional agency
│   ├── contact/                 # General contact form
│   ├── get-started/            # Project brief + deposit checkout (see below)
│   │   ├── page.jsx               # Brief form, package/add-on/plan selection
│   │   ├── success/               # PayFast return_url
│   │   └── cancelled/             # PayFast cancel_url, with a resume link
│   ├── privacy/, terms/, cookies/   # Legal pages (placeholder copy)
│   ├── about/, process/, blog/       # Phase 2 stub routes
│   └── api/
│       ├── get-started/           # Creates a submission, returns PayFast redirect fields
│       ├── ask/                   # Backs the "Ask a question" widget (Resend notification)
│       ├── pricing-pdf/           # Generates the pricing PDF from lib/content.js on request
│       ├── blob-upload/           # Vercel Blob client-upload token endpoint
│       └── payfast/notify/        # PayFast ITN webhook (source of truth for payment)
├── components/
│   ├── Card.jsx, Button.jsx, AccordionItem.jsx, SectionDivider.jsx  # Reusable, copy-free
│   │                                                                # design-system primitives —
│   │                                                                # see "Component library" below
│   ├── Header.jsx, Footer.jsx, Logo.jsx, SettingsPanel.jsx, TrustBadges.jsx, etc.
│   ├── WhatsAppButton.jsx, AskQuestionWidget.jsx     # The two floating contact options
│   ├── FounderTeaser.jsx, TestimonialsCarousel.jsx    # Homepage sections (see below)
│   └── LocalBusinessSchema.jsx                          # JSON-LD, rendered on the homepage
├── lib/
│   ├── content.js           # All real copy, pricing, and easily-edited constants
│   ├── ogImageContent.jsx   # Shared JSX for the OG/Twitter preview image
│   ├── payfast.js           # Signature generation + PayFast field building/validation
│   ├── submissions.js       # Get Started submission storage (Vercel Blob-backed)
│   └── email.js             # Submission + quick-question notification emails (Resend)
└── public/
    └── favicon.svg
```

## Editing content

Nearly everything editable lives in `lib/content.js`, with one exception —
`lib/company.js` holds the legally-required company details (legal
name/status, registration number, physical address, Information Officer,
policy version/date) that `/privacy`, `/terms`, `/cookies`, `/refunds`,
`/legal`, and the footer's company line all read from. See the comments in
that file for how `registrationNumber` and the street-address portion of
`physicalAddress` are placeholders that upgrade automatically (no other
code changes needed) once real values are filled in.

`lib/content.js` itself:

- `FOUNDING_SPOTS_REMAINING` — the single number gating the homepage banner, the Services page's Founding Client section (including whether its "Claim your spot" button renders at all), and whether the Founding Client offer choice appears in the Get Started checkout. No backend; just update the number down to 0 once spots are gone and all three hide automatically.
- `PACKAGES`, `ADD_ONS`, `MAINTENANCE_PLANS` — pricing and package details.
- `PROJECTS` — case studies shown on the homepage and `/work`. Replace the placeholder entries (OKUHLE, Braai & Bake, RL Paws Co) as each project is ready.
- `FAQS`, `TRUST_POINTS` — homepage copy.
- `SITE` — WhatsApp number, email, slogan, value proposition.
- `SOCIAL_LINKS` — Instagram and Facebook, both live; each entry's `href` and `ariaLabel` are read directly by the footer and folded into `LocalBusinessSchema`'s `sameAs`. There's no LinkedIn entry (no account yet) — add one the same way once it exists rather than pointing it at "#".
- `COMPARISON_TABLE` — the `/compare` page's rows. The Aggrandize starting-price cell reads `getPackage("starter").price` directly rather than a hardcoded figure, and never mentions the Founding Client rate (temporary/limited) — keep it that way if you edit this.
- `FOUNDER` — the homepage "Meet the founder" teaser. `photo` points at `public/founder.jpg`; set it to a falsy value instead of deleting the field to fall back to an ivory/brass initials circle (`FOUNDER.initials`) rather than a broken image.
- `TESTIMONIALS` — empty (`[]`) until real client testimonials exist. Add `{ quote, clientName, businessName }` entries and the homepage carousel picks them up automatically; leaving it empty renders nothing (not a broken empty carousel).
- `TRUST_BADGES` — the small "POPIA Compliant / Secure & SSL Protected / Proudly Pietermaritzburg" row shown in the footer and on the Get Started/Contact forms.

## Dark mode

Tailwind's class-based dark mode (`darkMode: "class"` in `tailwind.config.js`). A small inline script in `app/layout.jsx` (from `lib/theme.js`) applies a stored choice (or falls back to the OS preference) to `<html>` before first paint, so there's no flash of the wrong theme. The header's settings panel (see "Settings panel" below) exposes the Light/System/Dark control visitors use to override it.

Most components just pair every `text-ink`/`bg-ivory`/`border-ink/10`-style class with a `dark:` variant. The one exception is `components/AmbientBackdrop.jsx`'s dot-grid and glow, which are inline-style gradients (can't take a `dark:` class) — those read `--dot-rgb`/`--glow-rgb` CSS custom properties defined per-theme in `app/globals.css` instead.

## Component library

`components/Card.jsx`, `Button.jsx`, `AccordionItem.jsx`, and `SectionDivider.jsx` are deliberately generic — no Aggrandize-specific copy, fully driven by props, each documented with a comment block at the top of its file. They're meant to be copyable as-is into a future client project as a starting design system (swap the brand colors in `tailwind.config.js` and `Flourish.jsx`'s path). Every other card/button in the app (`PackageCard`, `ProjectCard`, maintenance plan cards, every CTA) is built on top of these two.

## Get Started flow (project brief + deposit)

The "Get started" buttons on `/services` and the Package Finder's result screen
lead to `/get-started`, which replaces what used to be a plain contact form:

1. **Brief form** — package, add-ons, payment plan, business/contact details,
   a structured project brief, and multi-image upload (drag-and-drop not
   included, but click-to-choose, JPG/PNG/WEBP, up to 10 files at 5MB each).
   A running total and today's deposit amount update live.
2. **Legal agreement** — a required, unchecked-by-default checkbox linking to
   `/terms`, `/refunds`, and `/privacy` (each opened in a new tab) gates the
   submit button. The exact `policyVersion`/`policiesLastUpdated` (in
   `lib/company.js` — the single source every legal page reads from) the
   client agreed to, plus a timestamp and IP, are recorded with the
   submission as proof of consent — the same principle as the cookie
   consent banner.
3. **Payment (PayFast)** — submitting POSTs the brief to `/api/get-started`,
   which validates everything server-side, computes the deposit amount itself
   (never trusts the client's math), stores the submission, and returns a set
   of signed fields the browser auto-submits to PayFast's hosted payment page.

**Payment is only ever confirmed by PayFast's server-side ITN webhook**
(`/api/payfast/notify`), never by the client's browser landing on the
`success` page — that page is purely informational and can be reached without
paying. The webhook verifies the field signature, calls PayFast's own
"validate" endpoint to confirm the payload really came from them, checks the
amount matches, and is idempotent (a submission already marked `COMPLETE` is
a no-op, so a duplicate/out-of-order ITN retry never double-processes or
double-emails). Once confirmed, it emails the full brief, image links, and
payment reference to `aggrandizewebco@gmail.com` for manual review — **no
code generation or build work is auto-triggered**; that's a deliberate later
phase.

If a client cancels at PayFast, they land on `/get-started/cancelled` with a
"Resume checkout" link back to `/get-started?resume={id}`, which reloads
their saved draft (including already-uploaded images) — nothing is lost.

### Founding Client offer at checkout

While `FOUNDING_SPOTS_REMAINING > 0`, the brief form shows a "Founding
Client offer" choice: 15% off the package price, or one add-on made free
(picked from a dropdown). Landing on `/get-started?founding=1` (what
"Claim your spot" links to) pre-selects the discount option; either can
still be changed or turned off. Both options are computed by the same
`calculatePricing()` (`lib/content.js`) the client form and the server
share, so the two can't disagree — the server also re-checks
`FOUNDING_SPOTS_REMAINING` itself rather than trusting the client's request
body on whether the offer is even still available. The chosen option (and,
for the free-add-on path, which add-on) is stored on the submission and
included in the paid-deposit notification email.

### Storage choice

Both uploaded images and the submission records themselves are stored as
Vercel Blob objects (JSON for submissions, at `submissions/{id}.json`) rather
than provisioning a separate database — there's no other persistence need in
this app yet, and it keeps everything on one storage primitive. See the
comment atop `lib/submissions.js` for the trade-offs (read-modify-write, not
a transaction) and when to graduate to a real database.

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

- `BLOB_READ_WRITE_TOKEN` — Vercel Blob store token (image uploads + submission storage).
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` — for the submission notification email.
- `PAYFAST_MODE`, `PAYFAST_MERCHANT_ID`, `PAYFAST_MERCHANT_KEY`, `PAYFAST_PASSPHRASE` —
  defaults to PayFast's public **sandbox** test credentials (`lib/payfast.js`) so
  the flow works out of the box for testing. Set `PAYFAST_MODE=live` and the
  three credential values once the PayFast merchant account is verified.
- `NEXT_PUBLIC_SITE_URL` — the site's absolute production origin. PayFast
  redirects back to it (required in production); it's also the single source
  for `SITE.url` (`lib/content.js`), which `metadataBase` and the
  LocalBusiness structured data read from — see "Site URL" below.

### Pricing

Add-on and payment plan numbers all live in `lib/content.js` (`ADD_ONS`,
`PAYMENT_PLANS`) as firm figures, not ranges:

- Add-ons: Logo Design R1,000, Copywriting R1,500, Extra Page R650.
- **Three-Part Split** (E-Commerce only): 34% deposit now, 33% at the build
  milestone, 33% on completion.
- **Monthly Instalment** (Business/E-Commerce): fixed at 3 months, with a 5%
  surcharge on the total; the first instalment is collected today as the
  "deposit" through PayFast.

## Site URL

`SITE.url` (`lib/content.js`) is the one place the production origin
lives — `metadataBase` (`app/layout.jsx`), OG/Twitter image resolution, and
the LocalBusiness structured data (`components/LocalBusinessSchema.jsx`)
all read from it, so a domain or deployment change is a one-line edit
instead of a find-and-replace across the app. No domain is hardcoded as a
fallback: `next.config.js` resolves `NEXT_PUBLIC_SITE_URL` once at build
time — an explicit value (`.env.example`) always wins; otherwise it falls
back to Vercel's own `VERCEL_PROJECT_PRODUCTION_URL` (the production domain
already assigned to whichever of this repo's Vercel projects built the
deployment — e.g. `aggrandize.vercel.app`), then to `localhost` for local
dev. Once a custom domain is connected, set `NEXT_PUBLIC_SITE_URL`
explicitly in that project's Vercel settings — no code change needed.

`app/api/get-started/route.js` has its own similar-looking `siteOrigin()`
helper for PayFast callback URLs — that one is deliberately request-derived
(with the same env var as an override) rather than a fixed constant, since
PayFast needs to call back to whichever preview/production host actually
served the request.

## Settings panel

A gear icon in the header (`components/SettingsPanel.jsx`) opens a small
dropdown — no login or account system, just visitor-facing preferences:

- **Appearance** — a Light/System/Dark control (`components/ThemeSettings.jsx`).
  "System" (the default) follows `prefers-color-scheme`; any explicit choice
  is applied instantly via a `dark` class swap on `<html>` (`lib/theme.js`,
  no page reload) and persisted to `localStorage` so it holds across visits.
- **Manage cookie preferences** — reopens the existing cookie-consent banner
  (`components/CookieConsent.jsx`) by dispatching the same `open-cookie-settings`
  event the footer's "Cookie Settings" link already uses, rather than
  duplicating any consent logic.

## Analytics

`@vercel/analytics` is wired in via `components/SiteAnalytics.jsx`, mounted in the root layout. It only renders `<Analytics />` once the visitor has clicked "Accept" on the cookie banner (`useCookieConsent() === "accepted"`, from `components/CookieConsent.jsx`) — consistent with treating it as non-essential tracking under POPIA. No extra account setup needed since the project is already on Vercel.

## "Ask a question" widget

A smaller, more subdued floating button next to the WhatsApp one (`components/AskQuestionWidget.jsx`) opens a short name/email/question form for visitors who'd rather not use WhatsApp. It posts to `/api/ask`, which emails the studio via the same Resend setup as Get Started (see `lib/email.js`'s `sendQuickQuestionNotification`) — no submission storage, just a notification.

## Pricing PDF

`/services` links to `/api/pricing-pdf`, which generates a one-page PDF (via `pdfkit`) straight from `lib/content.js`'s `PACKAGES`/`ADD_ONS`/`MAINTENANCE_PLANS` on every request — there's no static file to fall out of sync, and it deliberately excludes the Founding Client offer. `next.config.js` has an `outputFileTracingIncludes` entry for pdfkit's bundled font-metric data, which its serverless bundle needs on Vercel.

## Social share previews

`app/opengraph-image.jsx` and `app/twitter-image.jsx` generate a branded (ivory/ink/brass) 1200×630 preview image via Next's `ImageResponse`, inherited by every route. They attempt to fetch the real Playfair Display font at build time for the wordmark (`lib/ogImageContent.jsx`'s `loadPlayfairFont`) and fall back to satori's default font if that fetch fails for any reason — passing an explicit empty `fonts: []` array instead of omitting the option entirely makes satori hard-fail the whole build, so don't "fix" the fallback back to that.

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
npm run lint    # eslint
```

## Notes / known gaps for launch

- **Contact form**: posts to `/api/contact` (name, business, package, email, phone, message), which emails `aggrandizewebco@gmail.com` with reply-to set to the enquirer's address — same no-storage notification pattern as `/api/ask`.
- **Legal pages**: `/privacy`, `/terms`, `/cookies`, `/refunds`, and `/legal` (Company Information) all have real, final copy, reading company details from `lib/company.js`. Two fields there are still placeholders pending real values: `registrationNumber` (the business isn't a registered company yet, so the copy correctly describes it as a sole proprietorship until this is filled in) and the street-level part of `physicalAddress` (falls back to just city/province/country until then). Fill both in once available — everything that reads from them updates automatically.
- **Cookie consent**: gates non-essential cookies per POPIA. Check `useCookieConsent() === "accepted"` (from `components/CookieConsent.jsx`) before loading any analytics or third-party embeds — see `components/SiteAnalytics.jsx` for the pattern. Vercel Web Analytics itself is cookieless (confirmed against the shipped `@vercel/analytics` package — no `document.cookie`/`localStorage`/`sessionStorage` calls anywhere in it); this consent gate is a belt-and-braces choice, not one the analytics package requires.
- **OKUHLE's live link**: `lib/content.js`'s `liveUrl` for OKUHLE points at a temporary Vercel URL — swap it for `ohyokuhle.co.za` once that domain's DNS is finalized.
- **Get Started / PayFast**: currently wired to PayFast's public sandbox — switch to live credentials (see above) once the merchant account is verified, and do at least one real end-to-end sandbox payment before launch to confirm the ITN webhook reaches your deployed URL.
- **Resend**: sending from the shared `onboarding@resend.dev` works for testing but should move to a domain-verified sender before launch.

## License

MIT — see [LICENSE](LICENSE).
