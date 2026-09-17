import { put, list } from "@vercel/blob";

// Get Started submissions are stored as JSON blobs in Vercel Blob rather
// than a separate database — there's no other persistence need in this app
// yet, and this keeps the whole flow (images + brief record) on one storage
// primitive. Blob pathnames are deterministic (`addRandomSuffix: false`) so
// a submission can be looked up by its id.
//
// Trade-off: updates are read-modify-write (fetch the JSON, merge, write it
// back), not a transaction. Two updates racing within milliseconds of each
// other (e.g. two ITN retries arriving nearly simultaneously) could in
// theory clobber one another. For this site's expected volume that's an
// acceptable risk; the idempotency guards in the ITN handler (checking
// `payment.status` / `notified` before acting) cover the realistic case of
// PayFast's spaced-out retries. If volume grows, migrate this module to a
// real database (e.g. Vercel Postgres) and keep the same function
// signatures — nothing else in the app should need to change.

const SUBMISSIONS_PREFIX = "submissions/";

function submissionPath(id) {
  return `${SUBMISSIONS_PREFIX}${id}.json`;
}

async function writeSubmission(submission) {
  const updated = { ...submission, updatedAt: new Date().toISOString() };
  await put(submissionPath(submission.id), JSON.stringify(updated), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0,
    allowOverwrite: true,
  });
  return updated;
}

// `id` is supplied by the caller (generated client-side when the Get
// Started form loads) so the same id can namespace image uploads before the
// submission record itself exists.
export async function createSubmission(id, data) {
  const now = new Date().toISOString();
  const submission = {
    id,
    createdAt: now,
    updatedAt: now,
    status: "pending_payment", // draft | pending_payment | paid | cancelled
    notified: false,
    payment: {
      status: "PENDING", // PENDING | COMPLETE | FAILED
      pfPaymentId: null,
      amountGross: null,
      itnReceivedAt: null,
    },
    ...data,
  };
  return writeSubmission(submission);
}

export async function getSubmission(id) {
  if (!id) return null;
  const path = submissionPath(id);
  const { blobs } = await list({ prefix: path, limit: 1 });
  const match = blobs.find((b) => b.pathname === path);
  if (!match) return null;

  const res = await fetch(match.url, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function getSubmissionBlobUrl(id) {
  const path = submissionPath(id);
  const { blobs } = await list({ prefix: path, limit: 1 });
  return blobs.find((b) => b.pathname === path)?.url || null;
}

export async function updateSubmission(id, patch) {
  const current = await getSubmission(id);
  if (!current) return null;
  return writeSubmission({ ...current, ...patch });
}
