import {
  verifyItnSignature,
  validateWithPayfast,
  PAYFAST_MERCHANT_ID,
} from "@/lib/payfast";
import {
  getSubmission,
  updateSubmission,
  getSubmissionBlobUrl,
} from "@/lib/submissions";
import { sendSubmissionNotification } from "@/lib/email";

const AMOUNT_TOLERANCE = 0.05; // rands, to absorb float rounding

// PayFast's Instant Transaction Notification webhook — the single source of
// truth for payment success. The client's browser redirect back to
// /get-started/success is never trusted to mean "paid"; only this handler
// marks a submission paid, and only after:
//   1. the field signature matches (same algorithm PayFast used to sign),
//   2. PayFast's own server confirms it sent this exact payload
//      (the documented "validate" callback), and
//   3. the amount matches what we expect for that submission.
// It always responds 200 quickly (PayFast retries on non-200), and is
// idempotent: a submission already marked "COMPLETE" is a no-op, so a
// duplicate/out-of-order ITN never creates a second notification.
export async function POST(request) {
  const rawBody = await request.text();
  const params = new URLSearchParams(rawBody);
  const itn = Object.fromEntries(params.entries());

  if (!itn.m_payment_id) {
    return new Response("Missing m_payment_id", { status: 200 });
  }

  if (itn.merchant_id !== PAYFAST_MERCHANT_ID) {
    console.error("PayFast ITN: merchant_id mismatch", itn.merchant_id);
    return new Response("Merchant mismatch", { status: 200 });
  }

  if (!verifyItnSignature(itn)) {
    console.error("PayFast ITN: signature verification failed", itn.m_payment_id);
    return new Response("Invalid signature", { status: 200 });
  }

  const validated = await validateWithPayfast(rawBody);
  if (!validated) {
    console.error("PayFast ITN: server-side validation failed", itn.m_payment_id);
    return new Response("Validation failed", { status: 200 });
  }

  const submission = await getSubmission(itn.m_payment_id);
  if (!submission) {
    console.error("PayFast ITN: unknown submission", itn.m_payment_id);
    return new Response("Unknown submission", { status: 200 });
  }

  // Idempotency guard — a retried or duplicate ITN for an already-completed
  // submission is a no-op.
  if (submission.payment.status === "COMPLETE") {
    return new Response("Already processed", { status: 200 });
  }

  const amountGross = parseFloat(itn.amount_gross);
  const expectedAmount = submission.pricing.depositDue;

  if (itn.payment_status !== "COMPLETE") {
    await updateSubmission(submission.id, {
      payment: {
        ...submission.payment,
        status: itn.payment_status || "FAILED",
        pfPaymentId: itn.pf_payment_id || null,
        itnReceivedAt: new Date().toISOString(),
      },
      status: "cancelled",
    });
    return new Response("Recorded non-complete status", { status: 200 });
  }

  if (Math.abs(amountGross - expectedAmount) > AMOUNT_TOLERANCE) {
    console.error(
      `PayFast ITN: amount mismatch for ${submission.id} — expected ${expectedAmount}, got ${amountGross}`
    );
    // Don't finalize on an amount we can't reconcile. Left as PENDING for
    // manual review rather than silently marking it paid.
    return new Response("Amount mismatch", { status: 200 });
  }

  const updated = await updateSubmission(submission.id, {
    payment: {
      status: "COMPLETE",
      pfPaymentId: itn.pf_payment_id,
      amountGross,
      itnReceivedAt: new Date().toISOString(),
    },
    status: "paid",
  });

  // Guard against sending the notification twice (e.g. a second ITN slips
  // through between the read and write above).
  if (updated && !updated.notified) {
    const reviewUrl = await getSubmissionBlobUrl(submission.id);
    const result = await sendSubmissionNotification(updated, { reviewUrl });
    if (result.sent) {
      await updateSubmission(submission.id, { notified: true });
    }
  }

  return new Response("OK", { status: 200 });
}
