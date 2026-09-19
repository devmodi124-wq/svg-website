import { siteConfig } from "@/site.config";
import type { Product } from "@/data/products";
import type { Faq } from "@/lib/faqs";

/**
 * JSON-LD structured data.
 *
 * This is what lets Google show the business as a local result with address,
 * hours and phone rather than a plain blue link. For a supplier competing on
 * "near me" searches it does more work than any amount of on-page copy.
 *
 * The address, geo and phone here must stay identical to the Google Business
 * Profile listing — mismatches actively suppress local ranking.
 */
export function LocalBusinessSchema() {
  const { address, contact, hours } = siteConfig;

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contact.phoneDisplay,
    email: contact.email,
    foundingDate: String(siteConfig.firmFounded),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${address.street}, ${address.locality}`,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.latitude,
      longitude: address.longitude,
    },
    hasMap: address.mapsUrl,
    openingHoursSpecification: hours.schema.map((spec) => {
      const [days, time] = spec.split(" ");
      const [opens, closes] = time.split("-");
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: expandDays(days),
        opens,
        closes,
      };
    }),
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    })),
    // No `hasOfferCatalog` here on purpose. Each gas already gets its own
    // correctly-scoped `Product` entity via ProductSchema on its own page.
    // Duplicating a stripped-down copy of every product here would repeat the
    // same "missing offers/review/aggregateRating" validation warning across
    // every page on the site, since this schema is rendered sitewide from the
    // root layout — one real product page carrying that warning is a rounding
    // error, 23 pages all carrying it is a red flag Search Console surfaces
    // as a systemic issue.
  };

  return (
    <script
      type="application/ld+json"
      // Content is built from our own config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

const DAY_NAMES: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

const DAY_ORDER = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/** Turns a "Mo-Sa" range or "Mo,We" list into full day names for schema.org. */
function expandDays(days: string): string[] {
  if (days.includes("-")) {
    const [from, to] = days.split("-");
    const start = DAY_ORDER.indexOf(from);
    const end = DAY_ORDER.indexOf(to);
    return DAY_ORDER.slice(start, end + 1).map((d) => DAY_NAMES[d]);
  }
  return days.split(",").map((d) => DAY_NAMES[d]);
}

/**
 * Product schema for an individual gas page.
 *
 * Deliberately no `offers` block: that requires a price, and quoting is done
 * per customer. Claiming a price we do not publish would be false structured
 * data, which Google penalises.
 */
export function ProductSchema({ product }: { product: Product }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: "Industrial Gas",
    url: `${siteConfig.url}/products/${product.slug}/`,
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@id": `${siteConfig.url}/#business` },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** FAQ schema — the answers can surface directly in search results. */
export function FaqSchema({ faqs }: { faqs: Faq[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** Breadcrumbs, so search results show the page's place in the site. */
export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
