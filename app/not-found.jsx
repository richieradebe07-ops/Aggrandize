import SectionDivider from "@/components/SectionDivider";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="px-5 py-24 text-center sm:px-8 sm:py-32">
      <div className="mx-auto max-w-md">
        <h1 className="font-display text-4xl text-ink dark:text-ivory">Page not found</h1>
        <SectionDivider className="my-6" />
        <p className="text-ink/60 dark:text-ivory/60">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has moved.
        </p>
        <Button href="/" className="mt-8">
          Back to home
        </Button>
      </div>
    </section>
  );
}
