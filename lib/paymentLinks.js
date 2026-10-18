// Config-driven custom-quote payment links (app/pay/[token]/page.jsx) —
// no database, same pattern as lib/clientStatus.js. Each key is the
// unguessable token in the page's URL (/pay/<token>), so treat these keys
// themselves as secrets: generate a long random string per client (e.g.
// crypto.randomUUID()), never a client's name, slug, or anything else
// guessable. The token must not contain an underscore — lib/payfast.js's
// buildLinkReference/parseLinkReference use "_" as a delimiter when
// encoding it into PayFast's m_payment_id.
//
// `amount` is in South African Rand, a plain number (never a string) —
// it's the one thing app/api/payfast/notify re-derives independently from
// this file at ITN time, rather than trusting what PayFast echoes back,
// so it must stay in sync with whatever you actually quoted the client.
export const PAYMENT_LINKS = {
  // TODO(you): replace this with a real custom quote as needed, each
  // under its own long random token. Remove the demo entry once you have
  // a real one — it exists only so this page has something to render and
  // test against in sandbox; it is not a real client or a real amount.
  "demo-link-k9m2x7qp": {
    clientName: "Demo Client",
    description: "Custom quote — demo",
    amount: 1500,
    currency: "ZAR",
  },
};

export function getPaymentLink(token) {
  return PAYMENT_LINKS[token] || null;
}
