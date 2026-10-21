// Config-driven industry demo sites (see /industries and /industries/[slug]).
// Adding a new industry means adding an entry here — the dynamic page
// (app/industries/[slug]/page.jsx) and the hub (app/industries/page.jsx)
// both render purely from this data, via components/demos/SectionRenderer.
//
// Every demo is a fictional business: invented name, fake contact details
// (000 000 0000, hello@example.com — see components/demos/DemoFooter.jsx),
// no real brands/people/addresses, no photos (motif + palette only), and no
// testimonials/stats/awards (see components/demos/ReviewsPlaceholder.jsx,
// auto-rendered on every demo). Any price shown is an invented placeholder.
//
// `accentRgb` is an "R, G, B" triplet (same convention as globals.css's
// --dot-rgb/--glow-rgb) consumed via arbitrary Tailwind values like
// bg-[rgba(var(--demo-accent-rgb),0.12)], set on the page wrapper so every
// section automatically picks up that demo's accent color.
//
// `externalHref` marks an entry that points at a real, existing page instead
// of /industries/[slug] — used for Restaurant/Bakery, which stays on its
// existing /work/hearth-and-crumb-demo case study (lib/content.js's "Hearth
// & Crumb Demo" project) rather than being rebuilt here. Such entries are
// excluded from generateStaticParams.

export const DEMO_CATEGORIES = [
  "All",
  "Beauty",
  "Trades",
  "Professional",
  "Hospitality",
  "Education",
  "Community",
  "Creative",
  "Health & Fitness",
  "Retail",
];

export const DEMOS = [
  {
    slug: "restaurant-bakery",
    name: "Restaurant / Bakery",
    category: "Hospitality",
    pitch: "A visual, gallery-led site built around how people actually order food.",
    bullets: [
      "Menu with prices, front and center",
      "Gallery that sells the food itself",
      "One-tap WhatsApp ordering flow",
    ],
    motif: "waves",
    accentRgb: "169, 130, 60",
    externalHref: "/work/hearth-and-crumb-demo",
  },
  {
    slug: "salon-beauty",
    name: "Salon & Beauty",
    category: "Beauty",
    pitch: "A booking-first site that shows off your work and makes booking effortless.",
    bullets: [
      "Service & price list, organised by category",
      "Gallery that shows off real work",
      "One-tap booking via WhatsApp",
    ],
    motif: "scissors",
    accentRgb: "196, 93, 122",
    business: "Luna & Co. Hair Studio",
    tagline: "Hair, nails & grooming in the heart of Pietermaritzburg",
    intro:
      "A fictional salon built to show what a booking-first site looks like — service menus, real photos of your work, and a one-tap way to book.",
    heroCta: { label: "Book on WhatsApp", type: "toast" },
    sections: [
      {
        type: "priceList",
        props: {
          heading: "Services & prices",
          subheading: "All prices shown are placeholders for this demo.",
          tabs: [
            {
              label: "Hair",
              items: [
                { name: "Cut & finish", price: "from R250", duration: "45 min" },
                { name: "Colour & cut", price: "from R650", duration: "2 hr" },
                { name: "Blow-wave", price: "from R180", duration: "30 min" },
              ],
            },
            {
              label: "Nails",
              items: [
                { name: "Manicure", price: "from R200", duration: "40 min" },
                { name: "Gel overlay", price: "from R280", duration: "1 hr" },
                { name: "Pedicure", price: "from R220", duration: "45 min" },
              ],
            },
            {
              label: "Barber",
              items: [
                { name: "Skin fade", price: "from R150", duration: "30 min" },
                { name: "Beard trim", price: "from R100", duration: "20 min" },
              ],
            },
          ],
        },
      },
      {
        type: "gallery",
        props: {
          heading: "Our work",
          motif: "scissors",
          items: [
            { label: "Colour" },
            { label: "Cuts" },
            { label: "Styling" },
            { label: "Nails" },
            { label: "Barbering" },
            { label: "Bridal" },
          ],
        },
      },
      {
        type: "hours",
        props: {
          heading: "Opening hours",
          hours: [
            { day: "Mon – Fri", time: "08:30 – 17:30" },
            { day: "Saturday", time: "08:00 – 14:00" },
            { day: "Sunday", time: "Closed" },
          ],
        },
      },
      {
        type: "team",
        props: {
          heading: "Meet the team",
          members: [
            { name: "Thandi N.", role: "Owner & Senior Stylist" },
            { name: "Kyle M.", role: "Barber" },
            { name: "Zinhle P.", role: "Nail Technician" },
          ],
        },
      },
      {
        type: "faq",
        props: {
          items: [
            {
              q: "Do I need to book in advance?",
              a: "Walk-ins are welcome, but booking ahead means less waiting — especially on weekends.",
            },
            {
              q: "Do you take card payments?",
              a: "Yes — card, cash and most mobile payment apps are accepted in-store.",
            },
            {
              q: "Is this a real salon?",
              a: "No — this is a concept demo built by Aggrandize Web Co. to show what a salon's site could look like.",
            },
          ],
        },
      },
    ],
  },
  {
    slug: "trades-construction",
    name: "Trades & Construction",
    category: "Trades",
    pitch: "A site that gets you trusted quote requests, not just phone calls.",
    bullets: [
      "Emergency call-out bar for urgent jobs",
      "Request-a-quote form that collects the details upfront",
      "Project gallery that proves the work",
    ],
    motif: "spanner",
    accentRgb: "191, 110, 48",
    business: "Midlands Build & Maintain",
    tagline: "Plumbing, electrical & general building across Pietermaritzburg",
    intro:
      "A fictional trades business built to show how a quote form, service areas, and real project photos turn visitors into leads.",
    heroCta: { label: "Request a quote", type: "scroll" },
    sections: [
      {
        type: "callout",
        props: {
          text: "Burst pipe? No power? We take emergency call-outs every day of the week.",
          ctaLabel: "Call now",
          tone: "urgent",
        },
      },
      {
        type: "services",
        props: {
          heading: "What we do",
          items: [
            { name: "Plumbing", description: "Leaks, geysers, blocked drains and new installations." },
            { name: "Electrical", description: "Certified wiring, DB board upgrades and fault-finding." },
            { name: "General building", description: "Renovations, repairs and small extensions." },
            { name: "Maintenance contracts", description: "Scheduled upkeep for landlords and estates." },
          ],
        },
      },
      {
        type: "info",
        props: {
          heading: "Areas we serve",
          items: ["Pietermaritzburg", "Hilton", "Howick", "Hayfields", "Scottsville"],
        },
      },
      {
        type: "form",
        props: {
          heading: "Request a quote",
          anchor: true,
          submitLabel: "Request a quote",
          fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "service", label: "Service needed", type: "select", options: ["Plumbing", "Electrical", "Building", "Maintenance contract"] },
            { name: "details", label: "Job details", type: "textarea", placeholder: "What needs doing, and where?" },
          ],
        },
      },
      {
        type: "steps",
        props: {
          heading: "How we work",
          steps: [
            { title: "Tell us the job", description: "Send a quote request or call for urgent work." },
            { title: "We quote upfront", description: "A clear, itemised quote before any work starts." },
            { title: "We do the work", description: "Scheduled at a time that suits you, cleaned up after." },
          ],
        },
      },
      {
        type: "info",
        props: {
          heading: "Accreditation",
          items: ["[Trade accreditation body & number]", "[Public liability insurance details]"],
          placeholder: true,
        },
      },
      {
        type: "gallery",
        props: {
          heading: "Recent projects",
          motif: "spanner",
          items: [
            { label: "Bathroom reno" },
            { label: "DB upgrade" },
            { label: "Extension" },
            { label: "Geyser install" },
          ],
        },
      },
    ],
  },
  {
    slug: "auto-mechanic",
    name: "Auto / Mechanic",
    category: "Trades",
    pitch: "A site that makes booking a service as easy as booking anything else.",
    bullets: [
      "Services with upfront \"from R\" pricing",
      "Booking form that asks for make, model & year",
      "Brands serviced, hours & after-hours note",
    ],
    motif: "gear",
    accentRgb: "71, 97, 115",
    business: "Midlands Auto & Panel",
    tagline: "Honest service & panel beating for cars and bakkies",
    intro:
      "A fictional mechanic & panel beater built to show how upfront pricing and a proper booking form build trust before anyone calls.",
    heroCta: { label: "Book a service", type: "scroll" },
    sections: [
      {
        type: "priceList",
        props: {
          heading: "Services",
          subheading: "All prices shown are placeholders for this demo.",
          tabs: [
            {
              label: "Services",
              items: [
                { name: "Full service", price: "from R1,800" },
                { name: "Brake inspection & pads", price: "from R950" },
                { name: "Panel beating & paint", price: "from R2,500" },
                { name: "Pre-purchase inspection", price: "from R450" },
              ],
            },
          ],
        },
      },
      {
        type: "form",
        props: {
          heading: "Book a service",
          anchor: true,
          submitLabel: "Book a service",
          fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "make", label: "Make", type: "text", placeholder: "e.g. Toyota" },
            { name: "model", label: "Model", type: "text", placeholder: "e.g. Hilux" },
            { name: "year", label: "Year", type: "number", placeholder: "e.g. 2019" },
            { name: "notes", label: "What's wrong?", type: "textarea" },
          ],
        },
      },
      {
        type: "info",
        props: {
          heading: "Brands we service",
          body: "Toyota, Volkswagen, Ford, Isuzu, Hyundai, and most other makes and models.",
        },
      },
      {
        type: "hours",
        props: {
          heading: "Opening hours",
          hours: [
            { day: "Mon – Fri", time: "07:30 – 17:00" },
            { day: "Saturday", time: "08:00 – 13:00" },
            { day: "Sunday", time: "Closed" },
          ],
        },
      },
      {
        type: "callout",
        props: {
          text: "Need an after-hours tow-in or emergency quote? We can still help.",
          ctaLabel: "Call now",
          tone: "urgent",
        },
      },
    ],
  },
  {
    slug: "law-accounting",
    name: "Law & Accounting",
    category: "Professional",
    pitch: "A site that reads as credible to a client deciding who to trust with their matter.",
    bullets: [
      "Practice areas laid out clearly",
      "Team bios that build confidence",
      "Consultation booking with a date picker",
    ],
    motif: "scales",
    accentRgb: "40, 58, 82",
    business: "Khumalo & Partners",
    tagline: "Attorneys, conveyancers & tax practitioners",
    intro:
      "A fictional law and accounting practice built to show how practice areas, real bios, and a proper booking form read as credible to a new client.",
    heroCta: { label: "Book a consultation", type: "scroll" },
    sections: [
      {
        type: "services",
        props: {
          heading: "Practice areas",
          items: [
            { name: "Conveyancing", description: "Property transfers, bonds and sectional title matters." },
            { name: "Commercial law", description: "Contracts, company registration and disputes." },
            { name: "Family law", description: "Divorce, maintenance and estate matters." },
            { name: "Tax & accounting", description: "Returns, provisional tax and SARS correspondence." },
          ],
        },
      },
      {
        type: "team",
        props: {
          heading: "Our team",
          members: [
            { name: "Nomsa Khumalo", role: "Director, Attorney", bio: "15 years in conveyancing and commercial law." },
            { name: "David Pillay", role: "Tax Practitioner", bio: "Registered tax practitioner for small businesses." },
            { name: "Aisha Govender", role: "Candidate Attorney", bio: "Family law and general litigation support." },
          ],
        },
      },
      {
        type: "form",
        props: {
          heading: "Book a consultation",
          anchor: true,
          submitLabel: "Book a consultation",
          fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "matter", label: "Matter type", type: "select", options: ["Conveyancing", "Commercial law", "Family law", "Tax & accounting"] },
            { name: "date", label: "Preferred date", type: "date" },
          ],
        },
      },
      {
        type: "callout",
        props: {
          text: "Want more detail before you call? Download our company profile.",
          ctaLabel: "Download company profile",
          tone: "brass",
        },
      },
      {
        type: "info",
        props: {
          heading: "Registration & compliance",
          items: [
            "[Law Society / professional body registration number]",
            "[Fidelity Fund certificate number]",
            "[Professional indemnity insurance details]",
          ],
          placeholder: true,
        },
      },
    ],
  },
  {
    slug: "bnb-guesthouse",
    name: "B&B / Guesthouse",
    category: "Hospitality",
    pitch: "A site built to win direct bookings instead of paying commission to booking sites.",
    bullets: [
      "Room cards with rates & amenities",
      "Availability enquiry form (dates & guests)",
      "A clear case for booking direct",
    ],
    motif: "roofline",
    accentRgb: "176, 108, 73",
    business: "Midlands Rest Guesthouse",
    tagline: "A quiet self-catering stay just outside Pietermaritzburg",
    intro:
      "A fictional guesthouse built to show how room cards, an availability form, and a direct-booking pitch win guests before they ever reach a booking site.",
    heroCta: { label: "Check availability", type: "scroll" },
    sections: [
      {
        type: "rooms",
        props: {
          heading: "Rooms",
          items: [
            {
              name: "Garden Room",
              price: "from R850 / night",
              description: "A quiet double room overlooking the garden.",
              amenities: ["wifi", "bath", "aircon"],
            },
            {
              name: "Family Suite",
              price: "from R1,350 / night",
              description: "Two bedrooms with a shared lounge, sleeps up to 4.",
              amenities: ["wifi", "tv", "parking"],
            },
            {
              name: "Self-Catering Cottage",
              price: "from R1,100 / night",
              description: "A private cottage with its own kitchenette.",
              amenities: ["wifi", "bed", "parking"],
            },
          ],
        },
      },
      {
        type: "form",
        props: {
          heading: "Check availability",
          anchor: true,
          submitLabel: "Send enquiry",
          fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "checkin", label: "Check-in", type: "date" },
            { name: "checkout", label: "Check-out", type: "date" },
            { name: "guests", label: "Guests", type: "number" },
          ],
        },
      },
      {
        type: "info",
        props: {
          heading: "The area",
          body: "Set in the KwaZulu-Natal Midlands just outside Pietermaritzburg — close to the Midlands Meander, hiking trails, and a short drive from the city.",
        },
      },
      {
        type: "info",
        props: {
          heading: "House rules",
          items: [
            "Check-in from 14:00, check-out by 10:00",
            "No smoking indoors",
            "Pets welcome by arrangement",
          ],
        },
      },
      {
        type: "info",
        props: {
          heading: "Why book direct",
          body: "Booking direct means no third-party commission, more flexible dates, and you're talking straight to the people who'll host you.",
        },
      },
    ],
  },
  {
    slug: "education-creche",
    name: "Education",
    category: "Education",
    pitch: "A reassuring site for parents choosing a creche, tutor, or small school.",
    bullets: [
      "Programmes laid out by age group",
      "A daily routine parents can picture",
      "Enrolment enquiry form built in",
    ],
    motif: "blocks",
    accentRgb: "47, 122, 115",
    business: "Little Sprouts Learning Centre",
    tagline: "Early learning & aftercare in Pietermaritzburg",
    intro:
      "A fictional creche & tutoring centre built to show how clear programmes, a daily routine, and a simple enquiry form reassure a parent deciding where to enrol.",
    heroCta: { label: "Enquire about enrolment", type: "scroll" },
    sections: [
      {
        type: "services",
        props: {
          heading: "Our programmes",
          items: [
            { name: "Toddlers (2–3 yrs)", description: "Play-based learning in a small, supervised group." },
            { name: "Pre-school (4–5 yrs)", description: "School-readiness activities, literacy and numeracy basics." },
            { name: "Grade R", description: "A structured introduction to the primary school curriculum." },
            { name: "After-school tutoring", description: "Homework support and extra lessons for primary learners." },
          ],
        },
      },
      {
        type: "steps",
        props: {
          heading: "A typical day",
          steps: [
            { title: "07:00 – Drop-off", description: "Free play while everyone arrives." },
            { title: "08:30 – Morning activities", description: "Structured learning time by age group." },
            { title: "12:00 – Lunch", description: "A packed lunch from home, eaten together." },
            { title: "13:00 – Quiet time", description: "Rest or quiet activities for younger children." },
            { title: "17:30 – Pick-up", description: "Collection by 17:30, with aftercare available on request." },
          ],
        },
      },
      {
        type: "priceList",
        props: {
          heading: "Fees",
          subheading: "All fees shown are placeholders for this demo.",
          tabs: [
            {
              label: "Fees",
              items: [
                { name: "Toddlers", price: "from R2,200 / month" },
                { name: "Pre-school & Grade R", price: "from R2,600 / month" },
                { name: "After-school tutoring", price: "from R450 / session" },
              ],
            },
          ],
        },
      },
      {
        type: "form",
        props: {
          heading: "Enquire about enrolment",
          anchor: true,
          submitLabel: "Send enquiry",
          fields: [
            { name: "childName", label: "Child's name", type: "text" },
            { name: "age", label: "Child's age", type: "number" },
            { name: "parentName", label: "Parent/guardian name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
          ],
        },
      },
      {
        type: "info",
        props: {
          heading: "Safety & policies",
          items: [
            "Secure, access-controlled premises",
            "First-aid trained staff on site at all times",
            "[Fire safety & health inspection certificate number]",
          ],
        },
      },
      {
        type: "info",
        props: {
          heading: "Term dates",
          items: ["[Term 1 dates]", "[Term 2 dates]", "[Term 3 dates]", "[Term 4 dates]"],
          placeholder: true,
        },
      },
    ],
  },
  {
    slug: "church-community",
    name: "Church / NPO",
    category: "Community",
    pitch: "A welcoming site that makes it easy to visit, get involved, and stay informed.",
    bullets: [
      "Service times & upcoming events",
      "Volunteer sign-up built in",
      "A newsletter signup for your community",
    ],
    motif: "dove",
    accentRgb: "107, 70, 110",
    business: "Grace Fellowship Church",
    tagline: "A home for faith and community in Pietermaritzburg",
    intro:
      "A fictional church & community organisation built to show how service times, events, and a volunteer sign-up make a newcomer feel welcome.",
    heroCta: { label: "Get involved", type: "scroll" },
    sections: [
      {
        type: "hours",
        props: {
          heading: "Service times",
          hours: [
            { day: "Sunday", time: "08:00 & 10:00" },
            { day: "Wednesday", time: "18:00 (Bible study)" },
          ],
        },
      },
      {
        type: "events",
        props: {
          heading: "Upcoming events",
          items: [
            { date: "Sat", title: "Community outreach day", description: "Volunteering at the local shelter." },
            { date: "Sun", title: "Youth camp sign-up closes", description: "For ages 13–18, over the school holidays." },
          ],
        },
      },
      {
        type: "services",
        props: {
          heading: "Ministries & programmes",
          items: [
            { name: "Children's ministry", description: "Sunday programmes for ages 3–12." },
            { name: "Youth group", description: "Weekly gatherings for teens." },
            { name: "Community outreach", description: "Food parcels and support for families in need." },
          ],
        },
      },
      {
        type: "form",
        props: {
          heading: "Volunteer with us",
          anchor: true,
          submitLabel: "Sign up to volunteer",
          fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "interest", label: "Area of interest", type: "select", options: ["Children's ministry", "Youth group", "Community outreach", "Other"] },
          ],
        },
      },
      {
        type: "callout",
        props: {
          text: "Give — online giving is coming soon. In the meantime, speak to us after a service.",
          ctaLabel: "Notify me when it's online",
          tone: "brass",
        },
      },
      {
        type: "form",
        props: {
          heading: "Stay in touch",
          submitLabel: "Subscribe",
          fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
          ],
        },
      },
    ],
  },
  {
    slug: "photographer-events",
    name: "Photographer / Events",
    category: "Creative",
    pitch: "A portfolio-led site that lets the work speak for itself.",
    bullets: [
      "Portfolio grid with a lightbox view",
      "Packages with clear inclusions",
      "Enquiry form built around your event date",
    ],
    motif: "aperture",
    accentRgb: "120, 100, 60",
    business: "Frame & Light Photography",
    tagline: "Weddings, portraits & events across KwaZulu-Natal",
    intro:
      "A fictional photography business built to show how a portfolio-first layout and a date-aware enquiry form turn browsers into bookings.",
    heroCta: { label: "Check my date", type: "scroll" },
    sections: [
      {
        type: "gallery",
        props: {
          heading: "Portfolio",
          motif: "aperture",
          lightbox: true,
          items: [
            { label: "Weddings" },
            { label: "Portraits" },
            { label: "Events" },
            { label: "Engagements" },
            { label: "Families" },
            { label: "Corporate" },
          ],
        },
      },
      {
        type: "priceList",
        props: {
          heading: "Packages",
          subheading: "All prices shown are placeholders for this demo.",
          tabs: [
            {
              label: "Packages",
              items: [
                { name: "Elopement", price: "from R4,500", duration: "2 hrs coverage, 30 edited photos" },
                { name: "Full day wedding", price: "from R14,000", duration: "8 hrs coverage, 300+ edited photos" },
                { name: "Portrait session", price: "from R1,800", duration: "1 hr coverage, 20 edited photos" },
              ],
            },
          ],
        },
      },
      {
        type: "form",
        props: {
          heading: "Check my date",
          anchor: true,
          submitLabel: "Send enquiry",
          fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "eventType", label: "Event type", type: "select", options: ["Wedding", "Portrait session", "Corporate event", "Other"] },
            { name: "eventDate", label: "Event date", type: "date" },
            { name: "message", label: "Tell us about your event", type: "textarea" },
          ],
        },
      },
      {
        type: "faq",
        props: {
          items: [
            { q: "How far in advance should I book?", a: "For weddings, 6–12 months ahead is ideal — popular dates fill up quickly." },
            { q: "Do you travel outside Pietermaritzburg?", a: "Yes — travel is quoted separately based on location." },
            { q: "Is this a real photography business?", a: "No — this is a concept demo built by Aggrandize Web Co." },
          ],
        },
      },
    ],
  },
  {
    slug: "gym-fitness",
    name: "Gym / Fitness",
    category: "Health & Fitness",
    pitch: "A site that gets people off the fence and into a free trial.",
    bullets: [
      "Class timetable at a glance",
      "Membership plans with clear pricing",
      "A free-trial CTA that's hard to ignore",
    ],
    motif: "pulse",
    accentRgb: "163, 54, 54",
    business: "Midlands Strength & Conditioning",
    tagline: "Functional fitness & personal training in Pietermaritzburg",
    intro:
      "A fictional gym built to show how a class timetable, clear membership pricing, and a free-trial CTA convert a visitor into a sign-up.",
    sections: [
      {
        type: "timetable",
        props: {
          heading: "Class timetable",
          days: [
            { day: "Monday", classes: [{ time: "06:00", name: "Strength" }, { time: "18:00", name: "HIIT" }] },
            { day: "Wednesday", classes: [{ time: "06:00", name: "Conditioning" }, { time: "18:00", name: "Strength" }] },
            { day: "Friday", classes: [{ time: "06:00", name: "HIIT" }, { time: "17:00", name: "Mobility" }] },
          ],
        },
      },
      {
        type: "priceList",
        props: {
          heading: "Membership plans",
          subheading: "All prices shown are placeholders for this demo.",
          tabs: [
            {
              label: "Plans",
              items: [
                { name: "Casual class pack", price: "from R450 / month" },
                { name: "Unlimited membership", price: "from R799 / month" },
                { name: "Personal training (4 sessions)", price: "from R1,600 / month" },
              ],
            },
          ],
        },
      },
      {
        type: "team",
        props: {
          heading: "Our trainers",
          members: [
            { name: "Sipho Dlamini", role: "Head Coach" },
            { name: "Megan Botha", role: "Personal Trainer" },
          ],
        },
      },
      {
        type: "callout",
        props: {
          text: "New here? Your first class is on us.",
          ctaLabel: "Claim my free trial",
          tone: "brass",
        },
      },
      {
        type: "faq",
        props: {
          items: [
            { q: "Do I need to be fit to start?", a: "No — classes are scaled to every fitness level." },
            { q: "Is there a sign-up fee?", a: "No sign-up fee on any plan shown here." },
          ],
        },
      },
    ],
  },
  {
    slug: "retail-store",
    name: "Retail / Online Store",
    category: "Retail",
    pitch: "What our E-Commerce package looks like: browse, cart, and a clear checkout.",
    bullets: [
      "Illustrated product grid with category filters",
      "A real cart drawer, built to feel instant",
      "A concept checkout — no real orders taken",
    ],
    motif: "bag",
    accentRgb: "46, 125, 90",
    business: "Karoo & Co. Home Goods",
    tagline: "Handmade home decor, shipped across South Africa",
    intro:
      "A fictional online store — this is what our E-Commerce package looks like in practice: a filterable product grid, a working cart, and a checkout flow.",
    sections: [
      {
        type: "info",
        props: {
          heading: "About this demo",
          body: "This page shows what the E-Commerce package (see /services) looks like for a product-based business — browsing, a cart, and checkout, all included.",
        },
      },
      {
        type: "products",
        props: {
          heading: "Shop",
          motif: "bag",
          categories: ["Candles", "Textiles", "Ceramics"],
          items: [
            { name: "Soy candle — Amber", category: "Candles", price: "R180" },
            { name: "Soy candle — Fig", category: "Candles", price: "R180" },
            { name: "Woven throw blanket", category: "Textiles", price: "R450" },
            { name: "Linen cushion cover", category: "Textiles", price: "R220" },
            { name: "Stoneware mug", category: "Ceramics", price: "R160" },
            { name: "Ceramic vase", category: "Ceramics", price: "R380" },
          ],
        },
      },
    ],
  },
  {
    slug: "health-wellness",
    name: "Health & Wellness",
    category: "Health & Fitness",
    pitch: "A reassuring, professional site for a practice built on trust.",
    bullets: [
      "Services listed without overselling",
      "Practitioner profiles",
      "Appointment request form built in",
    ],
    motif: "leaf",
    accentRgb: "90, 120, 100",
    business: "Midlands Family Physio & Wellness",
    tagline: "Physiotherapy & wellness care for the whole family",
    intro:
      "A fictional physiotherapy practice built to show how a clear services list, practitioner profiles, and an appointment form build trust with new patients.",
    heroCta: { label: "Request an appointment", type: "scroll" },
    sections: [
      {
        type: "services",
        props: {
          heading: "Services",
          items: [
            { name: "Physiotherapy", description: "Assessment and treatment for injuries and chronic pain." },
            { name: "Sports rehabilitation", description: "Recovery programmes for sport-related injuries." },
            { name: "Postural assessments", description: "Workplace and lifestyle posture reviews." },
          ],
        },
      },
      {
        type: "team",
        props: {
          heading: "Our practitioners",
          members: [
            { name: "Dr. Lerato Mokoena", role: "Physiotherapist" },
            { name: "James Naidoo", role: "Biokineticist" },
          ],
        },
      },
      {
        type: "form",
        props: {
          heading: "Request an appointment",
          anchor: true,
          submitLabel: "Request an appointment",
          fields: [
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "reason", label: "Reason for visit", type: "textarea" },
          ],
        },
      },
      {
        type: "info",
        props: {
          heading: "Fees & medical aid",
          items: [
            "[Consultation fee]",
            "[Medical aid schemes accepted]",
            "Direct claims submitted where your scheme allows it",
          ],
          placeholder: true,
        },
      },
      {
        type: "info",
        props: {
          heading: "Your privacy",
          body: "In line with POPIA, your information is used only to manage your care and is never shared without your consent.",
        },
      },
    ],
  },
];

export function getDemo(slug) {
  return DEMOS.find((d) => d.slug === slug);
}

// Demos with their own rendered page at /industries/[slug] — excludes
// pointer entries like Restaurant/Bakery that link elsewhere.
export function getRoutableDemos() {
  return DEMOS.filter((d) => !d.externalHref);
}
