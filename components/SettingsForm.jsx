"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Card from "./Card";
import Button from "./Button";
import ThemeSettings from "./ThemeSettings";

const SAVE_STATES = {
  IDLE: "idle",
  SAVING: "saving",
  SAVED: "saved",
  ERROR: "error",
};

// Signed-in state of /settings. Profile fields (name, marketing opt-in) are
// persisted via app/api/account/route.js, matching the rest of the app's
// API-route mutation pattern; sign-out is Auth.js's own server action,
// passed down from the page.
export default function SettingsForm({ user, onSignOut }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [marketingOptIn, setMarketingOptIn] = useState(
    Boolean(user.marketingOptIn)
  );
  const [saveState, setSaveState] = useState(SAVE_STATES.IDLE);
  const [deleting, setDeleting] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    if (saveState !== SAVE_STATES.SAVED) return;
    const timer = setTimeout(() => setSaveState(SAVE_STATES.IDLE), 2000);
    return () => clearTimeout(timer);
  }, [saveState]);

  async function handleSave(e) {
    e.preventDefault();
    setSaveState(SAVE_STATES.SAVING);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), marketingOptIn }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaveState(SAVE_STATES.SAVED);
      router.refresh();
    } catch {
      setSaveState(SAVE_STATES.ERROR);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await signOut({ callbackUrl: "/" });
    } catch {
      setDeleting(false);
      setConfirmingDelete(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8">
      <div>
        <h1 className="font-display text-3xl text-ink dark:text-ivory">
          Settings
        </h1>
        <p className="mt-2 text-sm text-ink/60 dark:text-ivory/60">
          Signed in as <span className="font-medium">{user.email}</span>
        </p>
      </div>

      <Card>
        <h2 className="font-display text-lg text-ink dark:text-ivory">
          Appearance
        </h2>
        <p className="mt-1 text-sm text-ink/60 dark:text-ivory/60">
          Choose how the site looks on this device.
        </p>
        <div className="mt-4">
          <ThemeSettings />
        </div>
      </Card>

      <Card as="form" onSubmit={handleSave}>
        <h2 className="font-display text-lg text-ink dark:text-ivory">
          Profile
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-ink/80 dark:text-ivory/80"
            >
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-ink/15 bg-transparent px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-brass dark:border-ivory/20 dark:text-ivory"
            />
          </div>

          <label className="flex items-center gap-2.5 text-sm text-ink/80 dark:text-ivory/80">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e) => setMarketingOptIn(e.target.checked)}
              className="h-4 w-4 rounded border-ink/30 text-brass focus:ring-brass dark:border-ivory/30"
            />
            Send me occasional emails about new services and offers
          </label>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button type="submit" disabled={saveState === SAVE_STATES.SAVING}>
            {saveState === SAVE_STATES.SAVING ? "Saving…" : "Save changes"}
          </Button>
          {saveState === SAVE_STATES.SAVED && (
            <span className="text-sm text-ink/60 dark:text-ivory/60">
              Saved.
            </span>
          )}
          {saveState === SAVE_STATES.ERROR && (
            <span className="text-sm text-red-600 dark:text-red-400">
              Couldn&rsquo;t save — please try again.
            </span>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg text-ink dark:text-ivory">
          Account
        </h2>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <form action={onSignOut}>
            <Button type="submit" variant="secondary">
              Sign out
            </Button>
          </form>

          {!confirmingDelete ? (
            <button
              type="button"
              onClick={() => setConfirmingDelete(true)}
              className="text-sm font-medium text-red-600 hover:underline dark:text-red-400"
            >
              Delete account
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm text-ink/70 dark:text-ivory/70">
                Delete your account and all data? This can&rsquo;t be undone.
              </span>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="text-sm font-semibold text-red-600 hover:underline dark:text-red-400"
              >
                {deleting ? "Deleting…" : "Confirm"}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingDelete(false)}
                className="text-sm text-ink/60 hover:underline dark:text-ivory/60"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
