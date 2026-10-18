// schema.org FAQPage JSON-LD for the homepage's "Common questions"
// accordion — reads straight from the same FAQS array the visible
// accordion renders, so the structured data can never drift out of sync
// with the actual copy.
export default function FAQSchema({ faqs }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
