import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";

export default function NotFound() {
  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-4xl text-ink">Page not found</h1>
        <SectionDivider className="my-6" />
        <p className="text-ink/60">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-ink px-8 py-3 text-sm font-semibold text-ivory transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
