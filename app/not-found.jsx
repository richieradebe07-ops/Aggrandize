import Link from "next/link";
import SectionDivider from "@/components/SectionDivider";
import RevealOnScroll from "@/components/RevealOnScroll";
import AmbientBackdrop from "@/components/AmbientBackdrop";
import Button from "@/components/Button";

const QUICK_LINKS = [
  { href: "/services", label: "Services & Pricing" },
  { href: "/audit", label: "Free Audit" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden px-5 py-24 text-center sm:px-8 sm:py-32">
      <AmbientBackdrop />
      <RevealOnScroll variant="tech" className="relative z-10 mx-auto max-w-md">
        <span className="font-display text-sm font-semibold uppercase tracking-wide text-brass">
          404
        </span>
        <h1 className="mt-2 font-display text-4xl text-ink dark:text-ivory">Page not found</h1>
        <SectionDivider className="my-6" />
        <p className="text-ink/60 dark:text-ivory/60">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved.
        </p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
        <nav aria-label="Popular pages" className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/60 underline underline-offset-4 hover:text-brass dark:text-ivory/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </RevealOnScroll>
    </section>
  );
}
