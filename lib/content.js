// Central place for all real site copy, pricing, and easily-editable constants.
// Edit values here rather than hunting through components.

// Real Lighthouse (mobile) scores — see components/SpeedProof.jsx. This
// sandbox can't reach the live external domain directly (outbound HTTPS is
// restricted to an allowlist), so these were measured against a local
// `next build && next start` run of this exact deployed codebase instead —
// same code, same build output, just not fetched from the live URL itself.
// Re-run Lighthouse and update these numbers after any meaningfully
// performance-relevant change; never edit them without re-measuring.
export const LIGHTHOUSE_SCORES = {
  measuredAt: "2026-10-18",
  method:
    "Lighthouse (mobile), measured against a local production build (`next build && next start`) of this exact codebase.",
  pages: [
    { label: "Homepage", path: "/", performance: 91, accessibility: 96, bestPractices: 100, seo: 100 },
    { label: "Services & Pricing", path: "/services", performance: 93, accessibility: 93, bestPractices: 100, seo: 100 },
    { label: "Contact", path: "/contact", performance: 95, accessibility: 97, bestPractices: 100, seo: 100 },
  ],
};

// Local landing pages (app/web-design/[area]/page.jsx) — one per area,
// genuinely distinct copy reflecting each area's actual character rather
// than a single template with the name swapped. No invented statistics
// (business counts, population, named local competitors) — only general,
// well-known character of each place plus honest reasoning about why a
// fast, mobile-first, locally-run site helps a business there.
export const LOCAL_AREAS = [
  {
    slug: "pietermaritzburg",
    name: "Pietermaritzburg",
    heading: "Web Design in Pietermaritzburg",
    intro:
      "Pietermaritzburg is home base for Aggrandize Web Co. — not a city we service remotely, but the one we actually live and work in.",
    paragraphs: [
      "As the capital of KwaZulu-Natal, Pietermaritzburg has a dense mix of independent retailers, professional services, trades, and home-based businesses competing for attention both online and on the high street. A lot of that competition still shows up with a Facebook page and nothing else — which means a real website, even a small one, is still a genuine point of difference here.",
      "Being local means no time-zone friction and no account-manager layer: if you want to meet in person to talk through your site, that's straightforward, not a novelty.",
    ],
  },
  {
    slug: "scottsville",
    name: "Scottsville",
    heading: "Web Design for Scottsville Businesses",
    intro:
      "Scottsville sits near the racecourse and the University of KwaZulu-Natal's Pietermaritzburg campus — a mix of footfall-driven local businesses and professional services.",
    paragraphs: [
      "Proximity to a university campus and a major racecourse means a steady flow of people searching on their phones for something nearby right now — a café, a tutor, a salon, a service provider. If your business doesn't show up cleanly in that search, or your site is slow and awkward on mobile, that's a visitor who moves on to whoever does.",
      "A fast, mobile-first site with your contact details and a clear WhatsApp link does most of the work here — people in Scottsville are usually looking to act quickly, not browse a slow, cluttered page.",
    ],
  },
  {
    slug: "edendale",
    name: "Edendale",
    heading: "Web Design for Edendale Businesses",
    intro:
      "Edendale is one of the larger, more established communities in greater Pietermaritzburg, with a long history of local trade and small, community-rooted businesses.",
    paragraphs: [
      "Word of mouth and WhatsApp still do a lot of the heavy lifting for businesses here, and rightly so — but they only reach people who already know you. A simple site that's easy to find and easy to share extends that same trust to people who don't yet.",
      "We build mobile-first by default, which matters especially here: for most visitors, a phone is the only device they'll ever use to find you, so the site has to work properly on one, not just look fine on a desktop screen in a demo.",
    ],
  },
  {
    slug: "hayfields",
    name: "Hayfields",
    heading: "Web Design for Hayfields Businesses",
    intro:
      "Hayfields is a residential Pietermaritzburg suburb, home to a steady base of home-run and small service businesses — tutors, trades, stylists, consultants.",
    paragraphs: [
      "A lot of businesses based out of a home or a small premises in suburbs like Hayfields never get further than a WhatsApp number and a word-of-mouth reputation. That works, until a potential client wants to check you're legitimate before messaging a stranger — and a search turns up nothing.",
      "Even a simple, honest site with your services, pricing, and a way to get in touch gives a suburb-based business the same credibility signal a bigger, more visible competitor already has.",
    ],
  },
  {
    slug: "pelham",
    name: "Pelham",
    heading: "Web Design for Pelham Businesses",
    intro:
      "Pelham is a Pietermaritzburg suburb with a strong base of local services and small businesses operating close to where their customers actually live.",
    paragraphs: [
      "Being close to your customers is an advantage a big-city agency can't replicate — but it only helps if those customers can actually find you online when they're deciding who to call. A clear, fast site turns local proximity into an actual booking or enquiry.",
      "We keep this simple on purpose: a Pelham-based business doesn't need a bloated site with features it'll never use — it needs to be found, look credible, and make it easy to get in touch.",
    ],
  },
];

export const SITE = {
  name: "Aggrandize Web Co.",
  slogan: "Refined presence for ambitious business.",
  valueProp:
    "Fast, modern websites for small businesses in Pietermaritzburg — built by someone who actually answers the phone.",
  location: "Pietermaritzburg, South Africa",
  email: "aggrandizewebco@gmail.com",
  // WhatsApp deep link number, digits only, country code first (no +, no spaces).
  whatsappNumber: "27746136184",
  whatsappDisplay: "+27 74 613 6184",
  // Everything that needs an absolute site URL (metadata, OG/Twitter image
  // resolution, structured data) reads it from here. No hardcoded domain:
  // NEXT_PUBLIC_SITE_URL is always set by the time this runs — see
  // next.config.js for the fallback chain (explicit env var, then Vercel's
  // own assigned production domain, then localhost for local dev).
  url: process.env.NEXT_PUBLIC_SITE_URL,
};

export function whatsappLink(message) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Hardcoded, easy to edit as spots fill up. No backend needed for v1.
export const FOUNDING_SPOTS_TOTAL = 5;
export const FOUNDING_SPOTS_REMAINING = 3;

// Live social profiles. Each `ariaLabel` is used as-is in the footer (and
// folded into LocalBusinessSchema's `sameAs`) — add a new entry the same
// way once another profile goes live; there's no LinkedIn yet, so it isn't
// listed here rather than shown as an inert/dead link.
export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/aggrandizewebco/",
    ariaLabel: "Aggrandize Web Co. on Instagram",
    live: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594242706714",
    ariaLabel: "Aggrandize Web Co. on Facebook",
    live: true,
  },
];

export const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/compare", label: "Compare" },
  { href: "/audit", label: "Free Audit" },
  { href: "/contact", label: "Contact" },
];

// Package-interest options for the quote request form
// (components/ContactForm.jsx). Deliberately a simpler, looser set than
// PACKAGES (the actual priced offerings on /services) — "Custom" and "Not
// sure" are valid answers at the enquiry stage that don't map to a specific
// package yet. `value` is what's sent to /api/contact and stored in the
// alert email; keep it in sync with the validation there.
export const PACKAGE_INTEREST_OPTIONS = [
  { value: "starter", label: "Starter" },
  { value: "business", label: "Business" },
  { value: "custom", label: "Custom" },
  { value: "unsure", label: "Not sure" },
];

// Small trust signals shown near the footer and on forms that collect
// personal details or payment (Get Started, Contact) — see TrustBadges.jsx.
// Deliberately demonstrably-true claims only, not compliance badges we
// can't substantiate: "POPIA Compliant" and "SSL Protected" were dropped as
// unverifiable/overclaiming, in favour of what's actually true today.
export const TRUST_BADGES = [
  { icon: "shield", label: "Your details are only used to reply to you" },
  { icon: "lock", label: "Payments handled securely by PayFast" },
  { icon: "pin", label: "Proudly Pietermaritzburg" },
];

// SUGGESTION — pending your confirmation, not yet added to any package
// below: consider including "Google Business Profile setup" in one or more
// plans. Pietermaritzburg-area searches lean heavily on Google Maps/"near
// me" results, and a verified Business Profile is often what actually
// surfaces a small business there, more than the website itself does. This
// is a suggestion to decide on, not something assumed or added — no
// package below has been changed to include it.
export const PACKAGES = [
  {
    id: "starter",
    name: "Starter Site",
    price: "R4,000",
    priceValue: 4000,
    priceNote: "once-off",
    description:
      "For a business that just needs a clean online presence.",
    // Matches the estimate already published on /terms (Section 6,
    // "Timelines and revisions") — single source of truth, that page
    // reads this field rather than restating the number.
    deliveryTime: "1–2 weeks",
    features: [
      "1–3 pages",
      "Mobile-responsive design",
      "Contact form",
      "Basic SEO setup",
    ],
    highlight: false,
  },
  {
    id: "business",
    name: "Business Site",
    price: "R8,500",
    priceValue: 8500,
    priceNote: "once-off",
    description:
      "A fuller marketing site built to convert visitors into enquiries.",
    deliveryTime: "3–4 weeks",
    features: [
      "5–7 pages",
      "Custom design",
      "Gallery / portfolio section",
      "Contact form",
      "SEO setup",
    ],
    highlight: true,
    badge: "Most Popular",
  },
  {
    id: "ecommerce",
    name: "E-Commerce Site",
    price: "R18,000",
    priceValue: 18000,
    priceNote: "introductory rate — first 1–2 clients only",
    description: "Everything in Business, plus a full online store.",
    deliveryTime: "4–6 weeks",
    features: [
      "Everything in Business Site",
      "Product catalogue",
      "Shopping cart",
      "Secure checkout",
    ],
    highlight: false,
  },
];

// The one-line pricing promise shown near every price on the site —
// deliberately the exact counter-positioning to agencies that quote
// hourly or hide pricing behind "get a quote."
export const PRICING_PROMISE = "Fixed prices. No hourly billing, no surprises.";

// What a package price does NOT cover — applies across all three
// packages (it's a general policy, not plan-specific), matching /terms
// Section 3 ("What's not included") exactly. That page reads this array
// too, so the two can't drift.
export const NOT_INCLUDED = [
  "Domain name registration",
  "Third-party subscriptions or platform fees (e.g. Shopify, paid plugins, premium fonts)",
  "Stock photography",
  "Ongoing hosting after launch (available through a maintenance plan)",
];

export function getPackage(id) {
  return PACKAGES.find((p) => p.id === id);
}

// Deposit share for the standalone /pay flow (app/pay) — paying a plan's
// deposit or final balance directly, outside the full Get Started brief.
// This is deliberately separate from PAYMENT_PLANS below (which has its
// own per-plan depositPercent for the brief's instalment options): /pay is
// a simpler "deposit now, balance later" flow with one flat percentage.
// [CONFIRM: deposit percentage] — confirm 50% before go-live.
export const PAY_DEPOSIT_PERCENT = 0.5;

// Server-only trust boundary for /pay: the amount due is always computed
// here from the real package price, never accepted from the client. Used
// by app/api/payfast/create (to build the signed PayFast request) and
// app/api/payfast/notify (to re-derive the expected amount for a payment
// reference at ITN time, with no database — see lib/payfast.js's
// buildPayReference for why that's possible without one).
const VALID_PAY_PAYMENT_TYPES = new Set(["deposit", "balance", "full"]);

export function calculatePayAmount({ packageId, paymentType }) {
  const pkg = getPackage(packageId);
  if (!pkg) return null;
  if (!VALID_PAY_PAYMENT_TYPES.has(paymentType)) return null;

  const packagePrice = pkg.priceValue;
  const depositAmount = Math.round(packagePrice * PAY_DEPOSIT_PERCENT);
  const balanceAmount = packagePrice - depositAmount;
  const amount =
    paymentType === "deposit" ? depositAmount : paymentType === "full" ? packagePrice : balanceAmount;

  return { packagePrice, depositAmount, balanceAmount, amount };
}

export const ADD_ONS = [
  { id: "logo", name: "Logo Design", price: "R1,000", basePrice: 1000 },
  { id: "copywriting", name: "Copywriting", price: "R1,500", basePrice: 1500 },
  { id: "extraPage", name: "Extra Page", price: "R650", basePrice: 650 },
];

export function getAddOn(id) {
  return ADD_ONS.find((a) => a.id === id);
}

// /compare page data. The Aggrandize starting-price cell reads straight from
// PACKAGES (the same source the Services & Pricing page uses) rather than a
// hardcoded figure, so it can never drift out of sync — and deliberately
// never mentions the Founding Client rate, which is temporary/limited.
export const COMPARISON_TABLE = {
  note:
    "Traditional agency figures are general market estimates for small-business sites in South Africa, not quotes from a specific agency — actual pricing and timelines vary widely.",
  columns: [
    "Aggrandize Web Co.",
    "DIY Website Builders (Wix/GoDaddy)",
    "Traditional Web Agency",
  ],
  rows: [
    {
      label: "Ownership of your code",
      values: [
        "Yes — you own it outright",
        "No — you're locked into their platform",
        "Varies — often yes, but slower to get",
      ],
    },
    {
      label: "Monthly platform lock-in",
      values: [
        "No — host anywhere once built; maintenance plan is opt-in",
        "Yes — stop paying, your site goes down",
        "Sometimes",
      ],
    },
    {
      label: "Direct access to the person building your site",
      values: [
        "Yes, always",
        "No support relationship",
        "Often no — account managers in between",
      ],
    },
    {
      label: "Custom design vs. template",
      values: [
        "Fully custom",
        "Template-based",
        "Custom, but slower and pricier",
      ],
    },
    {
      label: "Typical starting price for a small business site",
      values: [
        `${getPackage("starter").price} ${getPackage("starter").priceNote}`,
        "Cheap upfront, but recurring monthly fees add up over time",
        "Typically R8,000–R15,000+, as a general market estimate",
      ],
    },
    {
      label: "Typical turnaround",
      values: [
        "1–4 weeks",
        "Do it yourself — timeline depends on you",
        "Often 6–12+ weeks, as a general market estimate",
      ],
    },
  ],
};

// Payment plan options offered at checkout. `depositPercent` is the share of
// the total due today through PayFast; the rest is invoiced per the plan.
// The Monthly Instalment plan adds a 5% surcharge to the total and splits
// the (surcharged) total across `instalments` months, with the first
// instalment collected today as the "deposit".
export const PAYMENT_PLANS = [
  {
    id: "standard",
    name: "Standard 50/50",
    description: "50% deposit now, 50% on completion.",
    depositPercent: 0.5,
    availableFor: ["starter", "business", "ecommerce"],
  },
  {
    id: "three_part",
    name: "Three-Part Split",
    description:
      "34% deposit now, 33% at the build milestone, 33% on completion.",
    depositPercent: 0.34,
    availableFor: ["ecommerce"],
  },
  {
    id: "monthly",
    name: "Monthly Instalment",
    description:
      "Total split into 3 monthly instalments (a 5% surcharge applies). First instalment due now.",
    surchargePercent: 0.05,
    instalments: 3,
    availableFor: ["business", "ecommerce"],
  },
];

export function getPaymentPlan(id) {
  return PAYMENT_PLANS.find((p) => p.id === id);
}

export function getAvailablePaymentPlans(packageId) {
  return PAYMENT_PLANS.filter((p) => p.availableFor.includes(packageId));
}

// Calculates the running total and the amount due today for a Get Started
// submission. Shared between the client form (live totals) and the server
// (authoritative amount for the PayFast redirect) so the two never disagree.
//
// `foundingOffer` is "discount" (15% off the package price), "addon" (the
// add-on named by `freeAddOnId` is included and fully discounted — it's a
// gift, independent of whatever the client separately checked in
// `addOnIds`), or null/undefined. Whether the offer is available at all
// (FOUNDING_SPOTS_REMAINING > 0) is a UI/availability concern the caller
// enforces — this function only ever does the math for whatever offer
// it's told to apply.
export function calculatePricing({
  packageId,
  addOnIds = [],
  paymentPlanId,
  foundingOffer = null,
  freeAddOnId = null,
}) {
  const pkg = getPackage(packageId);
  const plan = getPaymentPlan(paymentPlanId);
  if (!pkg || !plan) return null;

  const packagePrice = pkg.priceValue;
  // The Founding "free add-on" is its own gift, not tied to whether the
  // client separately checked it in the regular add-ons list — exclude it
  // from that list here so it's never priced (and then discounted) twice.
  const freeAddOn = foundingOffer === "addon" ? getAddOn(freeAddOnId) : null;
  const paidAddOnIds = freeAddOn ? addOnIds.filter((id) => id !== freeAddOn.id) : addOnIds;
  const paidAddOnsPrice = paidAddOnIds.reduce((sum, id) => {
    const addOn = getAddOn(id);
    return sum + (addOn ? addOn.basePrice : 0);
  }, 0);
  const addOnsPrice = paidAddOnsPrice + (freeAddOn ? freeAddOn.basePrice : 0);

  const foundingDiscount =
    foundingOffer === "discount"
      ? Math.round(packagePrice * 0.15)
      : freeAddOn
        ? freeAddOn.basePrice
        : 0;

  const subtotal = packagePrice + addOnsPrice - foundingDiscount;
  const surcharge = plan.surchargePercent ? subtotal * plan.surchargePercent : 0;
  const total = subtotal + surcharge;
  // Plans with a deposit percent (Standard, Three-Part) charge that share of
  // the total today; instalment plans instead charge one instalment's worth.
  const depositDue = plan.instalments
    ? Math.round(total / plan.instalments)
    : Math.round(total * plan.depositPercent);

  return {
    packagePrice,
    addOnsPrice,
    foundingDiscount,
    subtotal,
    surcharge,
    total,
    depositDue,
  };
}

export const MAINTENANCE_PLANS = [
  {
    id: "basic",
    name: "Basic",
    price: "R250",
    period: "/mo",
    features: [
      "Hosting & domain management",
      "Security updates",
      "Uptime monitoring",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "R400",
    period: "/mo",
    features: [
      "Everything in Basic",
      "Up to 2 small content edits / month",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "R650",
    period: "/mo",
    features: [
      "Everything in Standard",
      "Up to 4 edits / month",
      "Monthly performance & SEO check",
      "48-hour priority turnaround",
    ],
  },
];

export const MAINTENANCE_NOTE =
  "Prepay annually and get 1 month free (roughly an 8% discount).";

export function getMaintenancePlan(id) {
  return MAINTENANCE_PLANS.find((p) => p.id === id);
}

// "See it in your industry" homepage section (components/IndustryShowcase.jsx).
// Restaurant/Bakery links to the real Braai & Bake demo case study — the
// "one polished demo page" already exists, no need to build a second one.
// The other three have no built demo yet, so `href` is left null and the
// card renders as a clearly marked "Coming soon" placeholder rather than a
// dead or fabricated link.
export const INDUSTRY_SHOWCASE = [
  { label: "Restaurant / Bakery", href: "/work/braai-and-bake-demo" },
  { label: "Salon", href: null },
  { label: "Mechanic / Trades", href: null },
  { label: "Law / Accounting", href: null },
];

// [PLACEHOLDER PRICE — pending your confirmation] A simpler, single-tier
// "Care Plan" framing of ongoing support, as explicitly requested
// separately from the three real, priced MAINTENANCE_PLANS above. Note
// this likely overlaps with MAINTENANCE_PLANS' "Standard" tier (R400/mo,
// "Up to 2 small content edits / month") — decide whether to keep both,
// merge this into that tier's marketing copy, or drop this section
// before treating it as live. Nothing here is a real, confirmed price.
export const CARE_PLAN = {
  price: "[PLACEHOLDER: R___]",
  period: "/mo",
  features: [
    "Update help whenever you need it",
    "Small content edits",
    "Ongoing support — someone to actually ask",
  ],
  promise: "Cancel any time. You own your site outright — no lock-in.",
};

export const FOUNDING_OFFER = {
  title: "The Founding Client Offer",
  points: [
    "15% off list price, or a free add-on of your choice",
    "Maintenance pricing locked in for life, even as future prices rise",
  ],
};

// Homepage "How it works" section (app/page.jsx). Wording deliberately
// matches the "How does payment work?" FAQ below (deposit to start,
// balance due at launch) so the two never describe the process differently.
export const HOW_IT_WORKS = [
  {
    title: "Chat",
    description:
      "Tell us about your business and what you need — send a quote request through the contact form, or WhatsApp us a quick question first.",
  },
  {
    title: "Proposal & deposit",
    description:
      "We confirm the scope and price, then you secure your spot with a deposit to get started.",
  },
  {
    title: "Design & build",
    description:
      "We design and build your site, with rounds of revisions along the way so it matches what you had in mind.",
  },
  {
    title: "Launch",
    description:
      "Once the balance is settled, your site goes live on your domain.",
  },
  {
    title: "Support",
    description:
      "Keep it secure and up to date afterwards with an optional maintenance plan.",
  },
];

export const FAQS = [
  {
    question: "How much does a website cost?",
    answer: `${PRICING_PROMISE} ${PACKAGES.map((p) => `${p.name} is ${p.price} (${p.priceNote})`).join(", ")}. Full breakdown, add-ons, and maintenance plans are on our Services & Pricing page.`,
  },
  {
    question: "How long does a project take?",
    answer: `${PACKAGES.map((p) => `${p.name.replace(" Site", "")}: ${p.deliveryTime}`).join(", ")}, starting once we receive your deposit and the content we need from you. Delays in content or feedback extend the timeline.`,
  },
  {
    question: "Do you offer e-commerce?",
    answer:
      "Yes. The E-Commerce Site package includes a full product catalogue, cart, and secure checkout, built on top of everything in the Business Site package. It's currently offered at an introductory rate for our first 1–2 store clients.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Your content, images, and feedback, within a reasonable time — the fewer delays on your side, the faster we can launch. You'll need to confirm you own or have permission to use everything you send us.",
  },
  {
    question: "Do you handle hosting and my domain?",
    answer: `Domain registration and ongoing hosting aren't included in a package price — ${NOT_INCLUDED[3].toLowerCase()}. Our Basic maintenance plan (${getMaintenancePlan("basic")?.price}${getMaintenancePlan("basic")?.period}) covers hosting and domain management if you'd rather not deal with it yourself.`,
  },
  {
    question: "How many rounds of revisions do I get?",
    answer:
      "2 rounds of revisions per project, each submitted as one consolidated list rather than piecemeal. Further revisions beyond that are quoted separately.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "That's what the maintenance plans are for. Basic covers hosting, security, and uptime monitoring; Standard and Premium add a set number of small content edits each month, plus a priority turnaround on Premium. You can also request one-off changes any time — just get in touch.",
  },
  {
    question: "How does payment work?",
    answer:
      "Projects start with a deposit to secure your spot and begin work, with the balance due at launch. Maintenance plans are billed monthly, with a discount if you prepay annually. Full details are confirmed in your proposal before anything is booked.",
  },
  {
    question: "How do you handle my personal information?",
    answer:
      "In line with POPIA — we only use your details to respond to your enquiry, deliver your project, and (if you're a client) keep required financial records. See our Privacy Policy for the full breakdown of what we collect, why, and your rights.",
  },
  {
    question: "What if I'm not tech-savvy?",
    answer:
      "That's the point of working with a small studio — you deal directly with the person building your site, in plain language, from the first message to launch and beyond. No jargon, no ticket queues.",
  },
];

export const TRUST_POINTS = [
  {
    title: "Direct access to the person building it",
    description:
      "No account managers or ticket queues — you talk to the designer and developer working on your site.",
  },
  {
    title: "Faster turnaround",
    description:
      "A small studio means fewer layers between a decision and it being built. Most sites launch in weeks, not months.",
  },
  {
    title: "Pietermaritzburg-based",
    description:
      "Local, reachable, and familiar with the small businesses and customers you're building for.",
  },
  {
    title: "Real custom work, not a template",
    description:
      "Every site is designed around your business, not stretched over a one-size-fits-all theme.",
  },
];

// Homepage "Meet the founder" teaser (components/FounderTeaser.jsx) — a
// stand-in for the full story that the Phase 2 /about page will tell.
export const FOUNDER = {
  name: "Asanda Richard Radebe",
  role: "Founder & Designer",
  bio: "I started Aggrandize because too many small businesses were stuck choosing between a generic template and an agency invoice that didn't match the size of the job. I design and build every site myself — no hand-offs, no account managers, just one person who cares how it turns out.",
  // Served from /public — see components/FounderTeaser.jsx. Set to a
  // falsy value (rather than deleting the key) to show the initials
  // placeholder instead — e.g. while a real photo is pending.
  photo: "/founder.jpg",
  initials: "AR",
};

// TODO(you): paste real client testimonials in here once you have them —
// never invent one. Homepage/Work testimonials
// (components/TestimonialsCarousel.jsx). Empty until real client
// testimonials come in — the carousel renders nothing rather than an empty
// placeholder when this is []. Add entries as:
//   { quote: "...", clientName: "...", businessName: "..." (optional) }
export const TESTIMONIALS = [];

// Homepage "chance" chart (components/ChanceChart.jsx). This is a
// persuasive illustration, not a statistical claim — copy is deliberately
// framed around chance/possibility rather than a stated outcome, and the
// component itself never renders a number, percentage, or count anywhere.
export const CHANCE_CHART = {
  heading: "A Better Website, A Better Chance",
  subheading:
    "A professional website can give your business a stronger chance to be found, get enquiries, and win more customers. Illustrative only — not a guaranteed outcome.",
  categories: [
    { label: "Chance of Being Found Online" },
    { label: "Chance of a Visitor Reaching Out" },
    { label: "Chance of Turning Interest Into a Sale" },
  ],
};

// OKUHLE is the one published client case study. Add further real client
// entries here as each new project goes live.
//
// Braai & Bake (below) is explicitly a demo, not a client — `isDemo: true`
// drives a visible "Demo project" badge and disclaimer on its card and case
// study page (ProjectCard.jsx, app/work/[slug]/page.jsx). It exists to show
// what we can build, not to claim a real client relationship or outcome;
// never write its `result` as if it were one.
export const PROJECTS = [
  {
    slug: "okuhle",
    name: "OKUHLE",
    tagline: "A clean, modern presence for a growing local brand.",
    summary:
      "A full marketing site built to give OKUHLE a fast, professional home online.",
    problem:
      "OKUHLE had no website and was relying entirely on word of mouth and social media, making it hard for new customers to find or trust the business.",
    whatWasBuilt:
      "A custom multi-page marketing site covering the business's story, services, and a clear path to get in touch — designed mobile-first and built for speed.",
    result:
      "A live, professional web presence that gives OKUHLE somewhere credible to send new enquiries.",
    status: "live",
    isDemo: false,
    // Optional { quote, clientName, businessName } — the case study page
    // only renders a testimonial block when this is set. Leave it unset
    // rather than filling in placeholder text.
    testimonial: null,
    // The client's own domain (ohyokuhle.co.za) isn't connected on their
    // Vercel project yet — this points at the real, working deployment
    // instead of a dead link. Swap it back once that domain is live.
    liveUrl: "https://okuhle-store.vercel.app/",
    // Optional path to a logo image in /public — the case study page shows
    // it above the placeholder hero block when set. Leave null until a
    // real logo file exists rather than using a placeholder graphic.
    logo: null,
  },
  {
    slug: "braai-and-bake-demo",
    name: "Braai & Bake",
    tagline: "A demo concept for a home food business.",
    summary:
      "A demo build showing what a visual, gallery-led site could look like for a home food business.",
    isDemo: true,
    problem:
      "Home food businesses often rely entirely on WhatsApp broadcasts and word of mouth, with no visual, shareable home online. This demo shows what solving that could look like.",
    whatWasBuilt:
      "A visual, gallery-forward concept site with an easy enquiry flow, designed around mobile ordering behaviour.",
    result:
      "A demo used to show prospective food & hospitality clients what's possible — there is no real client behind this project, and no business outcome to report.",
    status: "demo",
    testimonial: null,
    // [PLACEHOLDER: link to a deployed, viewable version of this demo, if
    // one exists — left null rather than claiming a live site.]
    liveUrl: null,
    logo: null,
  },
];

export const PACKAGE_FINDER_QUESTIONS = [
  {
    id: "goal",
    question: "What are you looking to build?",
    options: [
      { value: "new", label: "New site" },
      { value: "redesign", label: "Redesign" },
      { value: "store", label: "Online store" },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    options: [
      { value: "speed", label: "Fast turnaround" },
      { value: "price", label: "Lowest price" },
      { value: "quality", label: "Best design quality" },
    ],
  },
  {
    id: "budget",
    question: "Rough budget?",
    options: [
      { value: "under5k", label: "Under R5k" },
      { value: "5to15k", label: "R5k – R15k" },
      { value: "over15k", label: "R15k+" },
    ],
  },
];

export function getRecommendedPackage(answers) {
  const { goal, budget } = answers;

  if (goal === "store") {
    return PACKAGES.find((p) => p.id === "ecommerce");
  }
  if (budget === "under5k") {
    return PACKAGES.find((p) => p.id === "starter");
  }
  return PACKAGES.find((p) => p.id === "business");
}
