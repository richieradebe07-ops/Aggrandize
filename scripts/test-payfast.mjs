// Standalone test script for the PayFast signature generation and ITN
// verification logic in lib/payfast.js — no test framework is configured
// in this project, so this is run directly with Node:
//
//   node --experimental-specifier-resolution=node scripts/test-payfast.mjs
//
// It exercises the actual exported functions (not a reimplementation), so
// a bug fixed/introduced in lib/payfast.js is caught here too. Covers:
//   - signature generation is deterministic and round-trips through
//     verifyItnSignature
//   - a bad/tampered signature is rejected
//   - a tampered amount_gross is rejected (it invalidates the signature,
//     since amount_gross is itself a signed field)
//   - the /pay and /pay/[token] stateless reference encode/decode and
//     their independent amount re-derivation

import {
  generateSignature,
  verifyItnSignature,
  buildPaymentFields,
  buildPayReference,
  parsePayReference,
  isPayReference,
  verifyPayAmount,
  buildLinkReference,
  parseLinkReference,
  isLinkReference,
  verifyLinkAmount,
  isKnownPayfastIp,
  PAYFAST_MERCHANT_ID,
  PAYFAST_MERCHANT_KEY,
} from "../lib/payfast.js";
import { calculatePayAmount, PAY_DEPOSIT_PERCENT, PACKAGES } from "../lib/content.js";

let pass = 0;
let fail = 0;

function check(name, condition) {
  if (condition) {
    pass += 1;
    console.log(`  ok  ${name}`);
  } else {
    fail += 1;
    console.error(`FAIL  ${name}`);
  }
}

console.log("--- Signature generation ---");

const samplePaymentFields = buildPaymentFields({
  returnUrl: "https://example.com/pay/success",
  cancelUrl: "https://example.com/pay/cancelled",
  notifyUrl: "https://example.com/api/payfast/notify",
  nameFirst: "Jane",
  nameLast: "Doe",
  email: "jane@example.com",
  cellNumber: "0821234567",
  mPaymentId: "PAY_business_deposit_1700000000000_abc123",
  amount: 4250,
  itemName: "Aggrandize Web Co: Business plan, deposit",
  itemDescription: "Business: Jane's Bakery",
});

check(
  "buildPaymentFields produces merchant_id/merchant_key from env (or sandbox defaults)",
  samplePaymentFields.merchant_id === PAYFAST_MERCHANT_ID &&
    samplePaymentFields.merchant_key === PAYFAST_MERCHANT_KEY
);
check("buildPaymentFields formats amount to 2 decimals", samplePaymentFields.amount === "4250.00");
check(
  "buildPaymentFields includes a signature",
  typeof samplePaymentFields.signature === "string" && samplePaymentFields.signature.length === 32
);
const { signature: _omit, ...fieldsWithoutSignature } = samplePaymentFields;
check(
  "generateSignature is deterministic for the same fields",
  generateSignature(fieldsWithoutSignature) === samplePaymentFields.signature &&
    generateSignature(fieldsWithoutSignature) === generateSignature({ ...fieldsWithoutSignature })
);

console.log("\n--- ITN signature verification ---");

// Simulate a genuine ITN echoing the fields PayFast would send back,
// signed the same way our own outbound request was.
const genuineItn = {
  m_payment_id: "PAY_business_deposit_1700000000000_abc123",
  pf_payment_id: "1234567",
  payment_status: "COMPLETE",
  item_name: "Aggrandize Web Co: Business plan, deposit",
  amount_gross: "4250.00",
  amount_fee: "-100.00",
  amount_net: "4150.00",
  name_first: "Jane",
  name_last: "Doe",
  email_address: "jane@example.com",
  merchant_id: PAYFAST_MERCHANT_ID,
};
const genuineSignature = generateSignature(genuineItn);
const signedItn = { ...genuineItn, signature: genuineSignature };

check("a correctly signed ITN verifies", verifyItnSignature(signedItn) === true);

const tamperedAmountItn = { ...signedItn, amount_gross: "1.00" };
check(
  "a tampered amount_gross invalidates the signature (rejected)",
  verifyItnSignature(tamperedAmountItn) === false
);

const badSignatureItn = { ...signedItn, signature: "0".repeat(32) };
check("a bad/garbage signature is rejected", verifyItnSignature(badSignatureItn) === false);

const flippedCaseSignature = { ...signedItn, signature: signedItn.signature.toUpperCase() };
check(
  "signature comparison is exact (case matters)",
  verifyItnSignature(flippedCaseSignature) === (signedItn.signature === signedItn.signature.toUpperCase())
);

console.log("\n--- /pay stateless reference (deposit/full/balance) ---");

for (const pkg of PACKAGES) {
  for (const paymentType of ["deposit", "full", "balance"]) {
    const ref = buildPayReference({ packageId: pkg.id, paymentType });
    check(`isPayReference recognises its own output (${pkg.id}/${paymentType})`, isPayReference(ref));
    const parsed = parsePayReference(ref);
    check(
      `parsePayReference round-trips (${pkg.id}/${paymentType})`,
      parsed && parsed.packageId === pkg.id && parsed.paymentType === paymentType
    );

    const expected = calculatePayAmount({ packageId: pkg.id, paymentType });
    const { valid: amountOk } = verifyPayAmount({
      packageId: pkg.id,
      paymentType,
      amountGross: expected.amount,
    });
    check(`verifyPayAmount accepts the correct amount (${pkg.id}/${paymentType})`, amountOk);

    const { valid: tamperedOk } = verifyPayAmount({
      packageId: pkg.id,
      paymentType,
      amountGross: expected.amount + 1000,
    });
    check(`verifyPayAmount rejects a tampered amount (${pkg.id}/${paymentType})`, tamperedOk === false);
  }
}

check(
  "deposit + balance add up to the full package price",
  PACKAGES.every((pkg) => {
    const deposit = calculatePayAmount({ packageId: pkg.id, paymentType: "deposit" });
    const balance = calculatePayAmount({ packageId: pkg.id, paymentType: "balance" });
    return deposit.amount + balance.amount === pkg.priceValue;
  })
);
check(
  `the deposit share matches PAY_DEPOSIT_PERCENT (${PAY_DEPOSIT_PERCENT})`,
  PACKAGES.every((pkg) => {
    const deposit = calculatePayAmount({ packageId: pkg.id, paymentType: "deposit" });
    return deposit.amount === Math.round(pkg.priceValue * PAY_DEPOSIT_PERCENT);
  })
);

check("parsePayReference rejects a garbage reference", parsePayReference("not_a_real_reference") === null);
check(
  "parsePayReference rejects an unknown payment type",
  parsePayReference("PAY_business_subscription_123_abc") === null
);

console.log("\n--- /pay/[token] custom-quote reference ---");

const linkRef = buildLinkReference({ token: "demo-link-k9m2x7qp" });
check("isLinkReference recognises its own output", isLinkReference(linkRef));
const parsedLink = parseLinkReference(linkRef);
check("parseLinkReference round-trips", parsedLink && parsedLink.token === "demo-link-k9m2x7qp");

const { valid: linkAmountOk, link } = verifyLinkAmount({ token: "demo-link-k9m2x7qp", amountGross: 1500 });
check("verifyLinkAmount accepts the configured amount", linkAmountOk && link?.amount === 1500);

const { valid: linkTamperedOk } = verifyLinkAmount({ token: "demo-link-k9m2x7qp", amountGross: 1 });
check("verifyLinkAmount rejects a tampered amount", linkTamperedOk === false);

const { valid: unknownTokenOk } = verifyLinkAmount({ token: "no-such-token", amountGross: 1500 });
check("verifyLinkAmount rejects an unknown token", unknownTokenOk === false);

console.log("\n--- Source IP range check (advisory, see lib/payfast.js) ---");

check("isKnownPayfastIp matches an address inside a listed /28 range", isKnownPayfastIp("197.97.145.150"));
check("isKnownPayfastIp matches the listed single sandbox IP", isKnownPayfastIp("144.126.193.139"));
check("isKnownPayfastIp rejects an address outside every listed range", isKnownPayfastIp("8.8.8.8") === false);
check("isKnownPayfastIp rejects a missing IP", isKnownPayfastIp(undefined) === false);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
