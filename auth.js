import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { BlobAdapter } from "@/lib/authAdapter";
import { sendMagicLinkEmail } from "@/lib/email";

// Passwordless sign-in for site visitors — no passwords to store, no OAuth
// app to register. `trustHost: true` is required both in this sandbox and
// behind Vercel's proxy in production (see @auth/core's assertConfig).
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: BlobAdapter(),
  session: { strategy: "jwt" },
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/settings",
    verifyRequest: "/settings",
  },
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      async sendVerificationRequest({ identifier, url }) {
        await sendMagicLinkEmail({ identifier, url });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.uid;
      return session;
    },
  },
});
