import Link from "next/link";

/**
 * The site's one button.
 *
 * `brand` is the only filled variant that is not a partner's colour — the
 * business's own red. Because each gas owns a colour, the action colour has to
 * sit outside that spectrum, or a CTA would read as just another gas.
 */

type Variant = "brand" | "outline" | "quiet" | "whatsapp";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  brand: "bg-brand text-brand-ink hover:bg-brand-deep",
  outline:
    "border border-seam-bright text-bright hover:border-brand hover:bg-brand hover:text-brand-ink",
  quiet:
    "border border-seam text-plain hover:border-seam-bright hover:text-bright",
  whatsapp: "bg-whatsapp text-whatsapp-ink hover:brightness-110",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-[1.0625rem] gap-2.5",
};

const BASE =
  "inline-flex items-center justify-center font-semibold " +
  "transition-colors duration-150 whitespace-nowrap";

type Props = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

export function Button({
  href,
  variant = "brand",
  size = "md",
  className = "",
  children,
  external = false,
}: Props) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
