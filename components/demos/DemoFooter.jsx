import Link from "next/link";

// Fake, obviously-placeholder contact details per the brief — never a real
// phone number or email, so nobody can mistake this for a real business.
export default function DemoFooter({ business }) {
  return (
    <footer className="border-t border-ink/10 px-5 py-10 text-center dark:border-ivory/10 sm:px-8">
      <p className="font-display text-lg text-ink dark:text-ivory">{business}</p>
      <p className="mt-2 text-sm text-ink/50 dark:text-ivory/50">
        000 000 0000 &middot; hello@example.com
      </p>
      <p className="mx-auto mt-4 max-w-md text-xs text-ink/40 dark:text-ivory/40">
        This is a concept demo built by Aggrandize Web Co. to show what a real site could look
        like — it is not a real business, and none of its forms or buttons send anything.
      </p>
      <p className="mt-5 text-xs">
        <Link href="/industries" className="text-brass underline hover:opacity-80">
          &larr; Back to all industries
        </Link>
      </p>
    </footer>
  );
}
