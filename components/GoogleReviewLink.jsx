import Button from "./Button";
import { ArrowUpRightIcon } from "./icons";
import { GBP_REVIEW_URL } from "@/lib/content";

// "Review us on Google" — only appears once GBP_REVIEW_URL is actually set
// (lib/content.js; empty for now, the Google Business Profile is still
// being set up). Renders nothing at all while it's empty, rather than a
// dead or placeholder link. Used in the footer (inline) and on the Get
// Started success page (button) once a deposit is actually confirmed —
// deliberately NOT on the quote/audit "request received" states, since
// those are leads who haven't used the service yet, not clients.
export default function GoogleReviewLink({ variant = "inline", className = "" }) {
  if (!GBP_REVIEW_URL) return null;

  if (variant === "button") {
    return (
      <Button href={GBP_REVIEW_URL} external variant="secondary" className={className}>
        Review us on Google
        <ArrowUpRightIcon className="h-3.5 w-3.5" />
      </Button>
    );
  }

  return (
    <a
      href={GBP_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm text-ink/75 transition-colors hover:text-brass dark:text-ivory/75 ${className}`}
    >
      Review us on Google
      <ArrowUpRightIcon className="h-3 w-3" />
    </a>
  );
}
