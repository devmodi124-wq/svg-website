import { siteConfig } from "@/site.config";

/**
 * Builds a wa.me link with a pre-filled message.
 *
 * Pre-filling matters more than it looks: a buyer who lands on the argon page
 * and taps WhatsApp arrives in the chat with "I need a quote for Argon Gas"
 * already typed. It removes the moment where they have to compose something,
 * which is where most enquiries are abandoned.
 */
export function whatsappLink(message?: string): string {
  const base = siteConfig.contact.whatsappHref;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Default enquiry message, used by the floating button and header CTA. */
export const DEFAULT_ENQUIRY = `Hello ${siteConfig.name}, I would like a quote for industrial gas supply.`;

/** Product-specific enquiry message. */
export function productEnquiry(productName: string): string {
  return `Hello ${siteConfig.name}, I would like a quote for ${productName}. Please share pricing and availability.`;
}

/** Google Maps directions link for the address. */
export const directionsLink = siteConfig.address.mapsUrl;

/** Full address as a single line, for schema and copy-paste. */
export const addressLine = [
  siteConfig.address.street,
  siteConfig.address.locality,
  `${siteConfig.address.city} ${siteConfig.address.postalCode}`,
  siteConfig.address.state,
].join(", ");
