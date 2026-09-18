import { put, del, get } from "@vercel/blob";
import { randomUUID } from "crypto";

// Client/visitor accounts are stored as Vercel Blob JSON — the same
// lightweight-persistence approach lib/submissions.js uses for Get Started
// briefs, so this app doesn't need a separate database.
//
// Unlike submissions, this data uses `access: "private"`. The secondary
// email-index blob's pathname is derived directly from the user's own
// (low-entropy, guessable) email address, so a public blob would let anyone
// enumerate account existence or harvest email addresses just by knowing the
// URL scheme. Private blobs require BLOB_READ_WRITE_TOKEN to read, not just
// knowledge of the pathname.
//
// Same read-modify-write trade-off as submissions.js applies here — fine at
// this site's expected volume (a single visitor updating their own account).

const USERS_PREFIX = "auth/users/";
const EMAIL_INDEX_PREFIX = "auth/users-by-email/";
const TOKENS_PREFIX = "auth/verification-tokens/";

function userPath(id) {
  return `${USERS_PREFIX}${id}.json`;
}

function emailIndexPath(email) {
  return `${EMAIL_INDEX_PREFIX}${encodeURIComponent(email.toLowerCase())}.json`;
}

function tokenPath(token) {
  return `${TOKENS_PREFIX}${token}.json`;
}

async function readJson(path) {
  try {
    const result = await get(path, { access: "private", useCache: false });
    if (!result?.stream) return null;
    return await new Response(result.stream).json();
  } catch {
    return null;
  }
}

async function writeJson(path, data) {
  await put(path, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
    cacheControlMaxAge: 0,
    allowOverwrite: true,
  });
  return data;
}

async function removeBlob(path) {
  try {
    await del(path);
  } catch {
    // Already gone — deletes are idempotent for this module's purposes.
  }
}

function toAdapterUser(record) {
  if (!record) return null;
  return {
    id: record.id,
    email: record.email,
    emailVerified: record.emailVerified ? new Date(record.emailVerified) : null,
    name: record.name ?? null,
    image: record.image ?? null,
  };
}

// --- Exports used by the app itself (Settings page mutations) ---

export async function getUserById(id) {
  return readJson(userPath(id));
}

export async function updateUserProfile(id, patch) {
  const current = await readJson(userPath(id));
  if (!current) return null;
  const updated = { ...current, ...patch, updatedAt: new Date().toISOString() };
  return writeJson(userPath(id), updated);
}

export async function deleteUserAccount(id) {
  const current = await readJson(userPath(id));
  if (!current) return;
  await removeBlob(userPath(id));
  if (current.email) await removeBlob(emailIndexPath(current.email));
}

// --- Auth.js Adapter ---
//
// Only the methods Auth.js actually calls for "Email/magic-link provider +
// JWT session strategy" are implemented (traced from @auth/core's own
// source): getUser, getUserByEmail, createUser, updateUser, deleteUser,
// createVerificationToken, useVerificationToken. Session/account-linking
// methods (createSession, linkAccount, getUserByAccount, ...) are never
// invoked on this path and are deliberately left out.
export function BlobAdapter() {
  return {
    async getUser(id) {
      return toAdapterUser(await readJson(userPath(id)));
    },

    async getUserByEmail(email) {
      const index = await readJson(emailIndexPath(email));
      if (!index?.id) return null;
      return toAdapterUser(await readJson(userPath(index.id)));
    },

    async createUser(data) {
      const id = data.id || randomUUID();
      const now = new Date().toISOString();
      const record = {
        id,
        email: data.email,
        emailVerified: data.emailVerified
          ? new Date(data.emailVerified).toISOString()
          : null,
        name: data.name ?? null,
        image: data.image ?? null,
        marketingOptIn: false,
        createdAt: now,
        updatedAt: now,
      };
      await writeJson(userPath(id), record);
      await writeJson(emailIndexPath(record.email), { id });
      return toAdapterUser(record);
    },

    async updateUser(data) {
      const current = await readJson(userPath(data.id));
      if (!current) throw new Error(`No user found for id ${data.id}`);
      const updated = {
        ...current,
        ...data,
        emailVerified:
          data.emailVerified !== undefined
            ? data.emailVerified
              ? new Date(data.emailVerified).toISOString()
              : null
            : current.emailVerified,
        updatedAt: new Date().toISOString(),
      };
      await writeJson(userPath(updated.id), updated);
      return toAdapterUser(updated);
    },

    async deleteUser(id) {
      await deleteUserAccount(id);
    },

    async createVerificationToken({ identifier, token, expires }) {
      const record = { identifier, token, expires: expires.toISOString() };
      await writeJson(tokenPath(token), record);
      return record;
    },

    async useVerificationToken({ identifier, token }) {
      const path = tokenPath(token);
      const record = await readJson(path);
      await removeBlob(path); // single-use, regardless of match/expiry
      if (!record || record.identifier !== identifier) return null;
      if (new Date(record.expires).getTime() < Date.now()) return null;
      return {
        identifier: record.identifier,
        token,
        expires: new Date(record.expires),
      };
    },
  };
}
