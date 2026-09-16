# Aggrandize

Aggrandize Web Co. — a web design studio building fast, modern websites for small businesses in Pietermaritzburg, South Africa. This repo hosts the company's own marketing site.

## Tech stack

Plain HTML, CSS, and JavaScript — no build step or framework. This keeps the site fast, easy to host anywhere (Netlify, Vercel, GitHub Pages, or any static host), and simple to hand off or maintain.

## Project structure

```
.
├── index.html          # Home page
├── services.html        # Services overview
├── about.html            # About the studio
├── contact.html          # Contact form
├── css/
│   └── styles.css        # Site-wide styles
├── js/
│   └── main.js            # Nav toggle, contact form handling
├── assets/
│   └── images/            # Site images
├── package.json           # Optional local dev server script
├── LICENSE                # MIT license
└── .gitignore
```

## Local development

No build tools are required — open `index.html` directly in a browser, or serve the folder locally:

```bash
npm run dev
```

This runs a lightweight static file server (via `npx serve`) at `http://localhost:3000`.

## Notes

The contact form (`contact.html`) currently only validates and confirms submission client-side. Wire it up to a form backend (e.g. Formspree, Netlify Forms, or a custom endpoint) before going live.

## License

MIT — see [LICENSE](LICENSE).
