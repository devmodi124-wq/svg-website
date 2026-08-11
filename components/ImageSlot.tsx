import { CameraIcon, ShieldIcon } from "./Icons";

/**
 * A photograph, or a designed placeholder standing in for one.
 *
 * ── The `kind` distinction is the important part ─────────────────────────────
 *
 * `own`          The image depicts THIS business — its premises, its vehicle,
 *                its people — and the alt text says so. It must be a real
 *                photograph. A generated or stock image here is a false
 *                statement about the company, not a design shortcut.
 *
 * `illustrative` A generic depiction of the trade: cylinders, a workshop, a
 *                hospital ward. Nothing claims it is this business, so licensed
 *                stock or a generated image is legitimate.
 *
 * Placeholders say which kind they are, so the rule survives whoever fills them
 * in later.
 *
 * To fill a slot: drop the file in `public/images/` and pass `src`.
 *
 * `next/image` is not used because this is a static export with optimisation
 * disabled — a plain <img> ships the same bytes with less machinery.
 */
export function ImageSlot({
  src,
  alt,
  /** Describes the shot this slot is waiting for. */
  wants,
  kind = "illustrative",
  aspect = "4/3",
  className = "",
  priority = false,
}: {
  src?: string;
  alt: string;
  wants: string;
  kind?: "own" | "illustrative";
  aspect?: "4/3" | "3/2" | "16/9" | "1/1";
  className?: string;
  priority?: boolean;
}) {
  const ratio = {
    "4/3": "aspect-[4/3]",
    "3/2": "aspect-[3/2]",
    "16/9": "aspect-[16/9]",
    "1/1": "aspect-square",
  }[aspect];

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`${ratio} w-full object-cover ${className}`}
      />
    );
  }

  const isOwn = kind === "own";

  return (
    <div
      className={`${ratio} relative w-full overflow-hidden border border-seam bg-shell ${className}`}
    >
      {/* Faint diagonal hatch — reads as "drawing, not photograph", so nobody
          mistakes an empty slot for a design choice. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 10px)",
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        {isOwn ? (
          <ShieldIcon className="h-7 w-7 text-brand-bright" />
        ) : (
          <CameraIcon className="h-7 w-7 text-faint" />
        )}
        <p className="max-w-[30ch] text-base leading-relaxed text-plain">
          {wants}
        </p>
        <p
          className={`max-w-[30ch] text-sm ${isOwn ? "text-brand-bright" : "text-faint"}`}
        >
          {isOwn
            ? "Real photograph required — this one depicts the business itself"
            : "Stock or generated image is fine here"}
        </p>
      </div>
    </div>
  );
}
