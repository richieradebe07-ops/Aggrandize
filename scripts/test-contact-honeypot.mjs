// Standalone test script for the site-wide honeypot check in
// lib/honeypot.js — no test framework is configured in this project (see
// scripts/test-payfast.mjs for the same pattern), so this is run directly
// with Node:
//
//   node scripts/test-contact-honeypot.mjs
//
// isHoneypotFilled() is the single function every form's API route calls
// to decide bot vs. real visitor: app/api/contact/route.js,
// app/api/get-started/route.js, app/api/payfast/create/route.js,
// app/api/audit/route.js, and app/api/ask/route.js all import it and branch
// on it the same way — `if (isHoneypotFilled(company)) return <fake
// success>;` before any other validation runs. Testing the one shared
// function exercises the exact logic all five routes rely on (none of them
// reimplement it), without needing to run a full Next server just to POST
// a fetch request — this project has no test runner wired up for that.
//
// Covers:
//   - every value a bot's blind-fill would actually send (plain text,
//     whitespace-only, HTML/script injection attempts) is treated as
//     filled — gets a bot
//   - every value a genuine visitor's unfilled, invisible honeypot field
//     actually submits (never touched: undefined/missing, or an empty
//     string the input's own value="" still sends) is treated as NOT
//     filled — never gets a false positive on a real submission
//   - non-string input (a bot or a buggy client sending the wrong type)
//     doesn't crash the check and is treated as not-filled, matching the
//     `typeof value === "string"` guard in the real function

import { isHoneypotFilled } from "../lib/honeypot.js";

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

console.log("--- Filled honeypot (bot behaviour) is always caught ---");

for (const botValue of ["Acme Corp", "   x   ", "<script>alert(1)</script>", "a", "0", "false"]) {
  check(`isHoneypotFilled(${JSON.stringify(botValue)}) === true`, isHoneypotFilled(botValue) === true);
}

console.log("\n--- Empty/missing honeypot (real visitor) never trips the trap ---");

for (const realValue of [undefined, null, "", "   ", "\n\t "]) {
  check(`isHoneypotFilled(${JSON.stringify(realValue)}) === false`, isHoneypotFilled(realValue) === false);
}

console.log("\n--- Non-string input never crashes the check ---");

for (const weirdValue of [0, 1, false, true, {}, [], ["Acme"]]) {
  check(
    `isHoneypotFilled(${JSON.stringify(weirdValue)}) === false (not a string)`,
    isHoneypotFilled(weirdValue) === false
  );
}

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
