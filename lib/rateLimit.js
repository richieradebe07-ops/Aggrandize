// Minimal in-memory, fixed-window rate limiter — enough to blunt a basic
// spam script without needing an external store (Redis/Vercel KV).
//
// Caveat, worth knowing before relying on this for anything serious:
// serverless functions don't guarantee one warm instance per visitor, and
// this Map lives in that instance's memory. A cold start clears it, and
// traffic spread across multiple concurrent instances/regions each gets
// its own counter. In practice this still catches a single script hammering
// the endpoint from one connection, which is the realistic spam case for a
// low-traffic contact form — it's just not a hard guarantee under load. If
// abuse becomes a real problem, move this to Vercel KV/Upstash so the count
// is shared across instances.
const hits = new Map();

// Opportunistic cleanup so `hits` doesn't grow unbounded over the life of a
// warm instance — runs inline on each call rather than a separate timer.
function sweep(now) {
  for (const [key, entry] of hits) {
    if (now - entry.windowStart > entry.windowMs) hits.delete(key);
  }
}

// Returns { allowed, retryAfterSeconds }. `key` should identify the caller
// (an IP address); `limit` is the max requests per `windowMs`.
export function checkRateLimit(key, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  sweep(now);

  const entry = hits.get(key);
  if (!entry || now - entry.windowStart > windowMs) {
    hits.set(key, { count: 1, windowStart: now, windowMs });
    return { allowed: true };
  }

  if (entry.count >= limit) {
    const retryAfterSeconds = Math.ceil((entry.windowStart + windowMs - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count += 1;
  return { allowed: true };
}
