"use client";

import { useState } from "react";
import Card from "./Card";
import Button from "./Button";

// Renders the magic-link request form (logged-out state of /settings).
// `onSignIn` is a server action (passed down from the page) that calls
// Auth.js's `signIn("resend", ...)` — which itself redirects to the
// verify-request page on success, so there's no success state to render here.
export default function SignInPanel({ onSignIn, checkEmail }) {
  const [pending, setPending] = useState(false);

  if (checkEmail) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <h1 className="font-display text-2xl text-ink dark:text-ivory">
          Check your email
        </h1>
        <p className="mt-3 text-sm text-ink/60 dark:text-ivory/60">
          We&rsquo;ve sent you a sign-in link. Click it to access your
          account — the link expires in 24 hours and can only be used once.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-md">
      <h1 className="font-display text-2xl text-ink dark:text-ivory">
        Sign in
      </h1>
      <p className="mt-2 text-sm text-ink/60 dark:text-ivory/60">
        Enter your email and we&rsquo;ll send you a link to sign in — no
        password needed.
      </p>
      <form
        action={async (formData) => {
          setPending(true);
          try {
            await onSignIn(formData);
          } finally {
            setPending(false);
          }
        }}
        className="mt-6 flex flex-col gap-3"
      >
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className="rounded-lg border border-ink/15 bg-transparent px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brass dark:border-ivory/20 dark:text-ivory"
        />
        <Button type="submit" disabled={pending}>
          {pending ? "Sending…" : "Email me a sign-in link"}
        </Button>
      </form>
    </Card>
  );
}
