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
│   ├── contact/               # General contact form
│   ├── get-started/            # Project brief + deposit checkout (see below)
│   │   ├── page.jsx               # Brief form, package/add-on/plan selection
│   │   ├── success/               # PayFast return_url
│   │   └── cancelled/             # PayFast cancel_url, with a resume link
│   ├── privacy/, terms/, cookies/   # Legal pages (placeholder copy)
│   ├── about/, process/, blog/       # Phase 2 stub routes
│   └── api/
│       ├── get-started/           # Creates a submission, returns PayFast redirect fields
│       ├── blob-upload/           # Vercel Blob client-upload token endpoint
│       └── payfast/notify/        # PayFast ITN webhook (source of truth for payment)
├── components/              # Header, Footer, Logo, SectionDivider, PackageCard, etc.
├── lib/
│   ├── content.js           # All real copy, pricing, and easily-edited constants
│   ├── payfast.js           # Signature generation + PayFast field building/validation
│   ├── submissions.js       # Get Started submission storage (Vercel Blob-backed)
│   └── email.js             # Submission notification email (Resend)
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

## Get Started flow (project brief + deposit)

The "Get started" buttons on `/services` and the Package Finder's result screen
lead to `/get-started`, which replaces what used to be a plain contact form:

1. **Brief form** — package, add-ons, payment plan, business/contact details,
   a structured project brief, and multi-image upload (drag-and-drop not
   included, but click-to-choose, JPG/PNG/WEBP, up to 10 files at 5MB each).
   A running total and today's deposit amount update live.
2. **Legal agreement** — a required, unchecked-by-default checkbox linking to
   `/privacy` and `/terms` (opened in a new tab) gates the submit button.
   The exact `LEGAL_VERSIONS` (in `lib/content.js`) the client agreed to, plus
   a timestamp and IP, are recorded with the submission as proof of consent —
   the same principle as the cookie consent banner.
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
- `NEXT_PUBLIC_SITE_URL` — absolute origin PayFast redirects back to; required in production.

### Pricing

Add-on and payment plan numbers all live in `lib/content.js` (`ADD_ONS`,
`PAYMENT_PLANS`) as firm figures, not ranges:

- Add-ons: Logo Design R1,000, Copywriting R1,500, Extra Page R650.
- **Three-Part Split** (E-Commerce only): 34% deposit now, 33% at the build
  milestone, 33% on completion.
- **Monthly Instalment** (Business/E-Commerce): fixed at 3 months, with a 5%
  surcharge on the total; the first instalment is collected today as the
  "deposit" through PayFast.

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

- **Contact form**: currently simulates submission client-side only. Wire `components/ContactForm.jsx`'s `handleSubmit` to a real endpoint (e.g. a serverless function or a form service) before launch.
- **Legal pages**: `/privacy`, `/terms`, `/cookies` are structured with placeholder `[Placeholder]` copy, ready for the final POPIA-aligned text to be pasted in.
- **Cookie consent**: gates non-essential cookies per POPIA. Check `getCookieConsent() === "accepted"` (from `components/CookieConsent.jsx`) before loading any analytics or third-party embeds.
- **OG image**: add `public/og-image.png` (1200×630) and re-enable it in `app/layout.jsx`'s metadata once a brand image is ready.
- **Get Started / PayFast**: currently wired to PayFast's public sandbox — switch to live credentials (see above) once the merchant account is verified, and do at least one real end-to-end sandbox payment before launch to confirm the ITN webhook reaches your deployed URL.
- **Resend**: sending from the shared `onboarding@resend.dev` works for testing but should move to a domain-verified sender before launch.

## License

MIT — see [LICENSE](LICENSE).
