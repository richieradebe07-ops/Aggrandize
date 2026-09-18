import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { updateUserProfile, deleteUserAccount } from "@/lib/authAdapter";

// Backs the signed-in Settings page (components/SettingsForm.jsx) — profile
// edits and account deletion for the currently authenticated user only.
export async function PATCH(request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { name, marketingOptIn } = payload || {};
  const patch = {};
  if (typeof name === "string") patch.name = name.trim() || null;
  if (typeof marketingOptIn === "boolean") patch.marketingOptIn = marketingOptIn;

  const updated = await updateUserProfile(session.user.id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  await deleteUserAccount(session.user.id);
  return NextResponse.json({ ok: true });
}
