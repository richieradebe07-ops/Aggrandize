import Image from "next/image";

// CSS-only phone + laptop frames for a case study hero. Each screen slot
// reserves its real aspect ratio whether or not an image is supplied, so
// swapping in a real screenshot later never shifts layout. `screenshots`
// stays { phone: null, laptop: null } in lib/content.js until real
// screenshots exist — this renders a clearly-labelled placeholder in the
// meantime rather than inventing visuals.
function ScreenSlot({ src, alt, placeholderLabel }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 40vw, 320px"
        className="object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink/10 to-ink/5 p-3 text-center dark:from-ivory/10 dark:to-ivory/5">
      <p className="text-[11px] font-medium leading-relaxed text-ink/40 dark:text-ivory/40">
        {placeholderLabel}
      </p>
    </div>
  );
}

export default function DeviceFrameShowcase({ projectName, screenshots = {} }) {
  const { phone = null, laptop = null } = screenshots;

  return (
    <div
      className="mx-auto flex max-w-2xl flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center sm:gap-6"
      role="img"
      aria-label={`Preview of the ${projectName} website on laptop and mobile`}
    >
      <div className="w-full max-w-sm sm:w-[62%]">
        <div className="rounded-t-xl border-[6px] border-b-0 border-ink bg-ink p-1.5 dark:border-ivory/70">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2px] bg-ivory dark:bg-ink">
            <ScreenSlot
              src={laptop}
              alt={`${projectName} website shown on a laptop screen`}
              placeholderLabel={`Laptop screenshot pending — upload a file to /public and set this project's screenshots.laptop in lib/content.js`}
            />
          </div>
        </div>
        <div className="h-3 w-full rounded-b-lg bg-ink dark:bg-ivory/70" />
        <div className="mx-auto h-1 w-1/4 rounded-b-md bg-ink/70 dark:bg-ivory/50" />
      </div>

      <div className="w-28 flex-shrink-0 sm:w-32">
        <div className="relative rounded-[1.6rem] border-[5px] border-ink bg-ink p-1 dark:border-ivory/70">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.2rem] bg-ivory dark:bg-ink">
            <ScreenSlot
              src={phone}
              alt={`${projectName} website shown on a phone screen`}
              placeholderLabel="Phone screenshot pending"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 h-1 w-7 -translate-x-1/2 rounded-full bg-ivory/70 dark:bg-ink/70"
          />
        </div>
      </div>
    </div>
  );
}
