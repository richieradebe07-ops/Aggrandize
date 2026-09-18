import { auth, signIn, signOut } from "@/auth";
import { getUserById } from "@/lib/authAdapter";
import SignInPanel from "@/components/SignInPanel";
import SettingsForm from "@/components/SettingsForm";

export const metadata = {
  title: "Settings",
  robots: { index: false },
};

export default async function SettingsPage({ searchParams }) {
  const params = await searchParams;
  const session = await auth();

  async function handleSignIn(formData) {
    "use server";
    const email = formData.get("email");
    await signIn("resend", { email, redirectTo: "/settings" });
  }

  if (!session?.user) {
    return (
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <SignInPanel
          onSignIn={handleSignIn}
          checkEmail={params?.type === "email"}
        />
      </section>
    );
  }

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  const record = await getUserById(session.user.id);
  const user = record || session.user;

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <SettingsForm user={user} onSignOut={handleSignOut} />
    </section>
  );
}
