// Isolated from lib/payfast.js so lib/content.js can read this flag too,
// without content.js <-> payfast.js becoming a circular import (payfast.js
// already imports calculatePayAmount from content.js). lib/payfast.js
// re-exports PAYMENTS_ENABLED from here so existing `from "@/lib/payfast"`
// imports keep working unchanged.
export const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";
