// Central place for all real site copy, pricing, and easily-editable constants.
// Edit values here rather than hunting through components.

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
  // The one place the production origin is hardcoded — everything that needs
  // an absolute site URL (metadata, structured data, etc.) reads it from
  // here, overridable via NEXT_PUBLIC_SITE_URL, so a domain/deployment
  // change is a one-line edit instead of a find-and-replace across the app.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://aggrandizewebco.co.za",
};

export function whatsappLink(message) {
  const base = `https://wa.me/${SITE.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

// Hardcoded, easy to edit as spots fill up. No backend needed for v1.
export const FOUNDING_SPOTS_TOTAL = 5;
export const FOUNDING_SPOTS_REMAINING = 3;

// Social links are not live yet. Keep the slots in the UI (so the footer/header
// layout is already correct once real profiles exist) but do not point them
// anywhere real. TBD — swap `href: "#"` for the live profile URL and flip
// `live: true` when each one is ready.
export const SOCIAL_LINKS = [
  { name: "Instagram", href: "#", live: false },
  { name: "Facebook", href: "#", live: false },
  { name: "LinkedIn", href: "#", live: false },
];

export const NAV_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/services", label: "Services & Pricing" },
  { href: "/compare", label: "Compare" },
  { href: "/contact", label: "Contact" },
];

// Small trust signals shown near the footer and on forms that collect
// personal details or payment (Get Started, Contact) — see TrustBadges.jsx.
export const TRUST_BADGES = [
  { icon: "shield", label: "POPIA Compliant" },
  { icon: "lock", label: "Secure & SSL Protected" },
  { icon: "pin", label: "Proudly Pietermaritzburg" },
];

export const PACKAGES = [
  {
    id: "starter",
    name: "Starter Site",
    price: "R4,000",
    priceValue: 4000,
    priceNote: "once-off",
    description:
      "For a business that just needs a clean online presence.",
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
    features: [
      "Everything in Business Site",
      "Product catalogue",
      "Shopping cart",
      "Secure checkout",
    ],
    highlight: false,
  },
];

export function getPackage(id) {
  return PACKAGES.find((p) => p.id === id);
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
        "R8,000–R15,000+",
      ],
    },
    {
      label: "Typical turnaround",
      values: [
        "1–4 weeks",
        "Do it yourself — timeline depends on you",
        "Often 6–12+ weeks",
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
export function calculatePricing({ packageId, addOnIds = [], paymentPlanId }) {
  const pkg = getPackage(packageId);
  const plan = getPaymentPlan(paymentPlanId);
  if (!pkg || !plan) return null;

  const packagePrice = pkg.priceValue;
  const addOnsPrice = addOnIds.reduce((sum, id) => {
    const addOn = getAddOn(id);
    return sum + (addOn ? addOn.basePrice : 0);
  }, 0);

  const subtotal = packagePrice + addOnsPrice;
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
    subtotal,
    surcharge,
    total,
    depositDue,
  };
}

// Bump these whenever the legal copy materially changes, so consent records
// stay tied to the exact version a client agreed to (POPIA-relevant, same
// principle as the cookie consent banner).
export const LEGAL_VERSIONS = {
  privacy: "2026-01-01",
  terms: "2026-01-01",
};

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

export const FOUNDING_OFFER = {
  title: "The Founding Client Offer",
  points: [
    "15% off list price, or a free add-on of your choice",
    "Maintenance pricing locked in for life, even as future prices rise",
  ],
};

export const FAQS = [
  {
    question: "Do you offer e-commerce?",
    answer:
      "Yes. The E-Commerce Site package includes a full product catalogue, cart, and secure checkout, built on top of everything in the Business Site package. It's currently offered at an introductory rate for our first 1–2 store clients.",
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
// `name` is a placeholder (matching the bracket convention used elsewhere,
// e.g. legal page copy) — replace it before launch.
export const FOUNDER = {
  name: "[Your Name]",
  role: "Founder & Designer",
  bio: "I started Aggrandize because too many small businesses were stuck choosing between a generic template and an agency invoice that didn't match the size of the job. I design and build every site myself — no hand-offs, no account managers, just one person who cares how it turns out.",
  // Served from /public — see components/FounderTeaser.jsx.
  photo: "/founder.jpg",
};

// Homepage/Work testimonials (components/TestimonialsCarousel.jsx). Empty
// until real client testimonials come in — the carousel renders nothing
// rather than an empty placeholder when this is []. Add entries as
// { quote, clientName, businessName } once available.
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

// Placeholder case studies — OKUHLE, Braai & Bake, and RL Paws Co will
// replace this content as each project is ready to publish.
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
      "A live, professional web presence that gives OKUHLE somewhere credible to send new enquiries, launching shortly.",
    status: "live",
    // Temporary Vercel URL — swap for https://ohyokuhle.co.za once that
    // domain's DNS connection is finalized.
    liveUrl: "https://ohyokuhle-store.vercel.app/",
  },
  {
    slug: "braai-and-bake",
    name: "Braai & Bake",
    tagline: "A warm, appetite-driven site for a home food business.",
    summary:
      "A gallery-led site designed to showcase the food and make ordering simple.",
    problem:
      "Braai & Bake needed a way to show off their food and take enquiries without relying only on WhatsApp broadcasts and word of mouth.",
    whatWasBuilt:
      "A visual, gallery-forward site with an easy enquiry flow, built around mobile ordering behaviour.",
    result: "In progress — details to follow at launch.",
    status: "in-progress",
  },
  {
    slug: "rl-paws-co",
    name: "RL Paws Co",
    tagline: "A Shopify storefront for a pet-care brand.",
    summary: "An online store built on Shopify for product sales and checkout.",
    problem:
      "RL Paws Co needed to sell products online with a reliable cart and checkout, without building commerce infrastructure from scratch.",
    whatWasBuilt:
      "A custom-themed Shopify storefront with a catalogue, cart, and secure checkout, matched to the brand's look and feel.",
    result: "In progress — details to follow at launch.",
    status: "in-progress",
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
