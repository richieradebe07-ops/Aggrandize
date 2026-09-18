/** @type {import('next').NextConfig} */
const nextConfig = {
  // pdfkit loads its standard-14 font metrics (Helvetica etc.) from data
  // files bundled inside the package via a relative fs read at runtime —
  // Next's serverless file tracing doesn't always follow that automatically,
  // so /api/pricing-pdf would 500 in production without this.
  outputFileTracingIncludes: {
    "/api/pricing-pdf": ["./node_modules/pdfkit/js/data/**"],
  },
};

module.exports = nextConfig;
