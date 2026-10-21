// Config-driven client status pages (app/status/[token]/page.jsx) — no
// database. Each key is the unguessable token in the page's URL
// (/status/<token>), so treat these keys themselves as secrets: generate
// a long random string per client (e.g. crypto.randomUUID()), never a
// client's name, slug, or anything else guessable.
//
// Deliberately minimal — no email, phone, pricing, or other personal/
// financial data lives here. `label` is just a project nickname shown on
// the page; leave it generic if you'd rather not name the business even
// behind the unguessable URL.
export const STAGES = ["Discovery", "Design", "Review", "Launch", "Live"];

// TODO(you): add real clients here as projects start, each under its own
// long random token (e.g. crypto.randomUUID()).
export const CLIENT_STATUSES = {};

export function getClientStatus(token) {
  return CLIENT_STATUSES[token] || null;
}
