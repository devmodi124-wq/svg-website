/**
 * Single source of truth for every business constant on the site.
 *
 * Nothing here is a secret. This is a static export, so every NEXT_PUBLIC_* value
 * is inlined into the shipped HTML at build time — which is exactly what we want
 * for a phone number and a GSTIN. Never put anything private in here.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ Every env var below MUST be read as a literal `process.env.NEXT_PUBLIC_X`│
 * │ expression. Next inlines these by textual substitution at build time, so │
 * │ a computed lookup — `process.env[key]` — is NOT replaced and silently    │
 * │ resolves to undefined in client bundles. That produces the worst kind of │
 * │ bug: correct on the server-rendered HTML, wrong after hydration.         │
 * │ Do not refactor these into a loop or a helper that takes the key.        │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

/** Picks the env value when set, otherwise a loudly-marked placeholder. */
function or(value: string | undefined, fallback: string): string {
  return value && value.trim() !== "" ? value.trim() : fallback;
}

/** Strips everything but digits, for tel: and wa.me links. */
function digits(phone: string): string {
  return phone.replace(/\D/g, "");
}

const phoneDisplay = or(process.env.NEXT_PUBLIC_PHONE, "+91 00000 00000");
const whatsappNumber = or(
  process.env.NEXT_PUBLIC_WHATSAPP,
  digits(phoneDisplay),
);

export const siteConfig = {
  /** Canonical business name. Must match Google Business Profile exactly. */
  name: "Shree Vinayak Gas",
  legalName: "Shree Vinayak Gas",
  shortName: "SVG",

  tagline: "Industrial & Medical Gas Supplier in Delhi NCR",
  description:
    "Shree Vinayak Gas supplies oxygen, nitrogen, argon, CO₂, acetylene, helium, " +
    "hydrogen and specialty gases to factories, hospitals, laboratories and fabrication " +
    "units across Ghaziabad and Delhi NCR.",

  /**
   * The firm's own founding year, which matches its GST registration.
   *
   * The family's earlier history in the trade — the predecessor partnership and
   * the 2017 separation — is deliberately not published. It is internal, and an
   * experience claim that predates this firm invites a due-diligence question
   * the website cannot answer on its own. If an experience line is ever wanted,
   * add it here as an explicit value rather than implying it in copy.
   */
  firmFounded: 2017,

  url: or(process.env.NEXT_PUBLIC_SITE_URL, "https://shreevinayakgases.in"),

  contact: {
    phoneDisplay,
    phoneHref: `tel:+${digits(phoneDisplay)}`,
    whatsappNumber,
    whatsappHref: `https://wa.me/${digits(whatsappNumber)}`,
    email: or(
      process.env.NEXT_PUBLIC_EMAIL,
      "shreevinayakgases@gmail.com",
    ),
  },

  address: {
    street: or(
      process.env.NEXT_PUBLIC_ADDRESS_STREET,
      "Site No. 4, 104, Block C, Jhandapur, Sahibabad Industrial Area Site 4",
    ),
    locality: or(process.env.NEXT_PUBLIC_ADDRESS_LOCALITY, "Sahibabad"),
    city: or(process.env.NEXT_PUBLIC_ADDRESS_CITY, "Ghaziabad"),
    state: "Uttar Pradesh",
    postalCode: or(process.env.NEXT_PUBLIC_ADDRESS_PIN, "201010"),
    country: "IN",
    latitude: 28.6687396,
    longitude: 77.351196,
    mapsUrl: "https://maps.app.goo.gl/1g7nn5pwWRPituB67",
  },

  /** Displayed in the footer as required for a GST-registered business. */
  gstin: or(process.env.NEXT_PUBLIC_GSTIN, "GSTIN pending"),
  businessType: "Sole Proprietorship",

  /** Endpoint for the enquiry form. See scripts/apps-script/README.md. */
  enquiryEndpoint: or(process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT, ""),

  hours: {
    display: "Mon–Sat, 9:00 AM – 7:00 PM",
    /** schema.org openingHours format, for JSON-LD. */
    schema: ["Mo-Sa 09:00-19:00"],
  },

  /** Only these areas — we do not claim coverage we cannot service. */
  serviceAreas: [
    "Ghaziabad",
    "Sahibabad",
    "Noida",
    "Greater Noida",
    "Delhi",
    "Faridabad",
    "Gurugram",
    "Delhi NCR",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
