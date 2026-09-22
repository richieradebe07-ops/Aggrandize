"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { CloseIcon } from "./icons";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILES = 10;
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export default function ImageUploader({ submissionId, images, onChange }) {
  const [uploading, setUploading] = useState([]);
  const [error, setError] = useState("");

  async function handleFiles(fileList) {
    setError("");
    const files = Array.from(fileList);
    if (images.length + uploading.length + files.length > MAX_FILES) {
      setError(`You can upload up to ${MAX_FILES} images in total.`);
      return;
    }

    for (const file of files) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(`"${file.name}" isn't a JPG, PNG, or WEBP — skipped.`);
        continue;
      }
      if (file.size > MAX_SIZE_BYTES) {
        setError(`"${file.name}" is over 5MB — skipped.`);
        continue;
      }

      const tempId = `${file.name}-${Date.now()}-${Math.random()}`;
      setUploading((u) => [...u, { id: tempId, name: file.name, progress: 0 }]);

      try {
        const blob = await upload(`uploads/${submissionId}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/blob-upload",
          onUploadProgress: ({ percentage }) => {
            setUploading((u) =>
              u.map((item) => (item.id === tempId ? { ...item, progress: percentage } : item))
            );
          },
        });
        onChange([
          ...images,
          { url: blob.url, filename: file.name, size: file.size, contentType: file.type },
        ]);
      } catch {
        setError(`"${file.name}" failed to upload — try again.`);
      } finally {
        setUploading((u) => u.filter((item) => item.id !== tempId));
      }
    }
  }

  function removeImage(url) {
    onChange(images.filter((img) => img.url !== url));
  }

  return (
    <div>
      <label className="block text-sm font-medium text-ink dark:text-ivory">
        Images{" "}
        <span className="font-normal text-ink/50 dark:text-ivory/50">
          (logo if you have one, product photos, reference images — optional)
        </span>
      </label>
      <p className="mt-1 text-xs text-ink/45 dark:text-ivory/45">
        JPG, PNG, or WEBP. Up to {MAX_FILES} files, 5MB each.
      </p>

      <label className="mt-3 flex cursor-pointer items-center justify-center rounded-lg border border-dashed border-ink/25 bg-white/50 px-4 py-6 text-sm text-ink/60 transition-colors hover:border-brass hover:text-brass dark:border-ivory/25 dark:bg-ivory/5 dark:text-ivory/60">
        Click to choose images
        <input
          type="file"
          multiple
          accept={ACCEPTED_TYPES.join(",")}
          onChange={(e) => {
            handleFiles(e.target.files);
            e.target.value = "";
          }}
          className="sr-only"
        />
      </label>

      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}

      {(images.length > 0 || uploading.length > 0) && (
        <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((img) => (
            <div key={img.url} className="group relative aspect-square overflow-hidden rounded-lg border border-ink/10 dark:border-ivory/10">
              {/* eslint-disable-next-line @next/next/no-img-element -- external, dynamically-uploaded Blob URLs; not worth configuring next/image remote patterns for user content */}
              <img src={img.url} alt={img.filename} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(img.url)}
                aria-label={`Remove ${img.filename}`}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-ivory opacity-0 transition-opacity group-hover:opacity-100"
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {uploading.map((u) => (
            <div
              key={u.id}
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-ink/10 bg-ink/5 p-2 text-center dark:border-ivory/10 dark:bg-ivory/5"
            >
              <span className="truncate text-[10px] text-ink/50 dark:text-ivory/50">{u.name}</span>
              <div className="h-1 w-full overflow-hidden rounded-full bg-ink/10 dark:bg-ivory/10">
                <div
                  className="h-full bg-brass transition-all"
                  style={{ width: `${u.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
