/**
 * Inline icon set. Kept in one file and hand-drawn rather than pulled from a
 * library — the site uses perhaps a dozen icons, and a dependency would ship
 * far more bytes than these paths.
 *
 * All icons are 24×24, stroke-based, and inherit `currentColor`.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.6 2.5h-2A2.1 2.1 0 0 0 2.5 4.8 18.8 18.8 0 0 0 19.2 21.5a2.1 2.1 0 0 0 2.3-2.1v-2a2.1 2.1 0 0 0-1.8-2.1l-2.3-.4a2.1 2.1 0 0 0-2 .8l-.6.8a14.4 14.4 0 0 1-5.9-5.9l.8-.6a2.1 2.1 0 0 0 .8-2l-.4-2.3a2.1 2.1 0 0 0-2.1-1.8Z" />
    </svg>
  );
}

/** WhatsApp glyph — filled, since the brand mark is recognised by its shape. */
export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden focusable="false">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.42 1.31-1.95 1.36-.5.05-.97.23-3.27-.68-2.75-1.08-4.5-3.9-4.64-4.08-.13-.18-1.11-1.48-1.11-2.82 0-1.34.7-2 .95-2.27.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.53.77 1.87.84 2.01.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.35-.41.47-.14.14-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.11.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.58.75 1.85.88.27.14.45.2.52.32.07.11.07.64-.17 1.32Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 6.5L21 6" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 10.5c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.8" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 6.75V12l3.5 2" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2.25} className={className}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg {...base} strokeWidth={2} className={className}>
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  );
}

export function CameraIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 8.5h3l1.5-2.5h8l1.5 2.5h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13.5" r="3.75" />
    </svg>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.5 4 5.5v6c0 5 3.4 8.8 8 10 4.6-1.2 8-5 8-10v-6l-8-3Z" />
      <path d="m8.75 12 2.25 2.25 4.25-4.5" />
    </svg>
  );
}

export function TruckIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 10h4l3 3v2.5h-7z" />
      <circle cx="6.5" cy="18" r="1.9" />
      <circle cx="17" cy="18" r="1.9" />
    </svg>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" />
    </svg>
  );
}

/* ── Industry icons, keyed by `icon` in data/industries.ts ─────────────── */

export function FactoryIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 20.5v-9l6 3.5v-3.5l6 3.5v-3.5l6 3.5v5.5z" />
      <path d="M18.5 11.5 19.5 3.5h-2l-1 8" />
    </svg>
  );
}

export function WeldingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M14.5 2.5 8 12h4l-2.5 9.5L16 12h-4z" />
    </svg>
  );
}

export function MedicalIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="6.5" width="18" height="14" rx="2" />
      <path d="M8.5 6.5V4a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 4v2.5M12 10.5v6M9 13.5h6" />
    </svg>
  );
}

export function LabIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M9.5 2.5v6L4 18a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3l-5.5-9.5v-6" />
      <path d="M8 2.5h8M6.75 14h10.5" />
    </svg>
  );
}

export function FoodIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 3v7a3 3 0 0 0 3 3v8M4 3v4.5M7 3v4.5M10 3v7a3 3 0 0 1-3 3" />
      <path d="M17.5 3c-1.7 0-3 2.7-3 6 0 2.5.8 4 2 4.6V21" />
    </svg>
  );
}

export function FlaskIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M10 2.5h4M11 2.5v6.2L5.6 18a2.2 2.2 0 0 0 1.9 3.3h9a2.2 2.2 0 0 0 1.9-3.3L13 8.7V2.5" />
      <circle cx="10.5" cy="16.5" r="1" />
      <circle cx="13.5" cy="19" r="1" />
    </svg>
  );
}

export function AutomotiveIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 15.5v3.5h3M21 15.5v3.5h-3" />
      <path d="M3 15.5 5 9.5A2.5 2.5 0 0 1 7.4 8h9.2a2.5 2.5 0 0 1 2.4 1.5l2 6z" />
      <path d="M6.5 12.5h2M15.5 12.5h2" />
    </svg>
  );
}

export function ConstructionIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M2.5 20.5h19M4.5 20.5V9l7.5-5.5L19.5 9v11.5" />
      <path d="M9.5 20.5v-6h5v6" />
    </svg>
  );
}

export function ChipIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="6.5" y="6.5" width="11" height="11" rx="1.5" />
      <path d="M10 2.5v4M14 2.5v4M10 17.5v4M14 17.5v4M2.5 10h4M2.5 14h4M17.5 10h4M17.5 14h4" />
    </svg>
  );
}

/** Maps the `icon` key from data/industries.ts to a component. */
export const industryIcons: Record<
  string,
  (props: IconProps) => React.ReactElement
> = {
  factory: FactoryIcon,
  welding: WeldingIcon,
  medical: MedicalIcon,
  lab: LabIcon,
  food: FoodIcon,
  flask: FlaskIcon,
  automotive: AutomotiveIcon,
  construction: ConstructionIcon,
  chip: ChipIcon,
};
