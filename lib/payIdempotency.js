// Best-effort duplicate-ITN guard for the stateless /pay flow (no
// database — see lib/payfast.js's buildPayReference comment for why).
// Same trade-off as lib/rateLimit.js's in-memory Map: this only dedupes
// within one warm serverless instance's lifetime, not across cold starts
// or concurrent instances/regions. For this site's expected /pay volume
// (occasional manual deposit/balance payments, not a high-traffic
// checkout), the realistic case this needs to catch — PayFast retrying a
// notification that was slow to get a 200 back the first time — usually
// retries against the same warm instance soon after, so this still covers
// it. A true duplicate landing on two different instances at once is rare
// enough to accept for now.
//
// TODO(you): if /pay volume grows, promote this to the same Vercel Blob
// pattern lib/submissions.js already uses for Get Started (keyed by
// pf_payment_id), and keep these two function signatures the same so
// nothing else has to change.
const processed = new Map();
const TTL_MS = 24 * 60 * 60 * 1000; // far longer than PayFast's retry window

function sweep(now) {
  for (const [key, at] of processed) {
    if (now - at > TTL_MS) processed.delete(key);
  }
}

export function wasPayItnProcessed(pfPaymentId) {
  const now = Date.now();
  sweep(now);
  return processed.has(pfPaymentId);
}

export function markPayItnProcessed(pfPaymentId) {
  processed.set(pfPaymentId, Date.now());
}
