import { siteConfig } from "@/site.config";

/**
 * The Shree Vinayak Gas identity.
 *
 * The wordmark is the business's existing logo: a Times-metric serif in the
 * brand red. The cylinder mark sits beside it as a compact symbol for the
 * places a wordmark cannot go — favicon, WhatsApp display picture, a stamp on
 * a delivery challan.
 */

type Tone = "default" | "mono";

export function LogoMark({
  tone = "default",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  const ink = tone === "mono" ? "currentColor" : "var(--color-plain)";
  const accent = tone === "mono" ? "currentColor" : "var(--color-brand)";

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={`${siteConfig.name} logo`}
    >
      {/* Left cylinder — valve stub, then body with domed shoulder. */}
      <rect x="12.5" y="17" width="4" height="6" rx="1" fill={ink} />
      <path
        d="M8 56 L8 28.5 A6.5 6.5 0 0 1 21 28.5 L21 56 A2 2 0 0 1 19 58 L10 58 A2 2 0 0 1 8 56 Z"
        fill={ink}
      />
      {/* Centre cylinder, tallest, carries the brand red. */}
      <rect x="30" y="9" width="4" height="6" rx="1" fill={accent} />
      <path
        d="M25.5 56 L25.5 20.5 A6.5 6.5 0 0 1 38.5 20.5 L38.5 56 A2 2 0 0 1 36.5 58 L27.5 58 A2 2 0 0 1 25.5 56 Z"
        fill={accent}
      />
      {/* Right cylinder. */}
      <rect x="47.5" y="14" width="4" height="6" rx="1" fill={ink} />
      <path
        d="M43 56 L43 25.5 A6.5 6.5 0 0 1 56 25.5 L56 56 A2 2 0 0 1 54 58 L45 58 A2 2 0 0 1 43 56 Z"
        fill={ink}
      />
    </svg>
  );
}

export function Logo({
  sub = "Industrial & medical gases",
  className = "",
}: {
  sub?: string | null;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" />
      <span className="flex flex-col leading-none">
        {/* The wordmark, as supplied: serif, bold, brand red. */}
        <span className="font-display text-[1.35rem] leading-none font-bold tracking-[-0.01em] text-brand">
          {siteConfig.name}
        </span>
        {sub && (
          <span className="mt-1.5 text-[0.72rem] leading-none text-dim">
            {sub}
          </span>
        )}
      </span>
    </span>
  );
}
