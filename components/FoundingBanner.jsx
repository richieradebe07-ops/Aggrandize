import { FOUNDING_SPOTS_REMAINING, FOUNDING_SPOTS_TOTAL } from "@/lib/content";

export default function FoundingBanner() {
  if (FOUNDING_SPOTS_REMAINING <= 0) return null;

  return (
    <div className="border-y border-brass/30 bg-brass/5 px-5 py-3 text-center">
      <p className="text-sm font-medium text-ink">
        <span className="relative mr-1.5 inline-flex h-2 w-2 align-middle" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brass/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-brass" />
        </span>
        <span className="text-brass">
          {FOUNDING_SPOTS_REMAINING} of {FOUNDING_SPOTS_TOTAL}
        </span>{" "}
        Founding Client spots remaining — see{" "}
        <a href="/services#founding-offer" className="underline underline-offset-4 hover:text-brass">
          what&rsquo;s included
        </a>
        .
      </p>
    </div>
  );
}
