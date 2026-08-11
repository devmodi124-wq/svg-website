import { siteConfig } from "@/site.config";
import type { Product } from "@/data/products";

export type Faq = { question: string; answer: string };

/**
 * Builds the FAQ block for a product page.
 *
 * Every answer is composed from facts already in `data/products.ts` and
 * `site.config.ts` — nothing is invented here. That matters twice over: FAQ
 * rich results put this text directly in front of searchers, and the same
 * unverified-spec caveat that applies to the catalogue applies to these
 * answers, so they must stay derived rather than written.
 *
 * These also answer what buyers actually type into search: "do you deliver to
 * X", "what purity", "what cylinder size".
 */
export function productFaqs(product: Product): Faq[] {
  const purity = product.specs.find((s) => s.label === "Purity")?.value;
  const sizes = product.specs.find((s) =>
    s.label.toLowerCase().includes("cylinder"),
  )?.value;
  const supply = product.specs.find((s) => s.label === "Supply")?.value ?? "";

  const areas = siteConfig.serviceAreas.slice(0, -1).join(", ");

  const faqs: Faq[] = [
    {
      question: `Do you supply ${product.name} in Ghaziabad and Delhi NCR?`,
      answer:
        `Yes. ${siteConfig.name} supplies ${product.name} across ${areas} and ` +
        `the wider Delhi NCR industrial belt, from our base in ` +
        `${siteConfig.address.locality}, ${siteConfig.address.city}.`,
    },
    {
      question: `What is ${product.name} used for?`,
      answer:
        `${product.name} is used across a range of industrial and medical ` +
        `processes. Common applications include ${listApplications(
          product.applications.slice(0, 4),
        )}.`,
    },
  ];

  if (purity || sizes) {
    faqs.push({
      question: `What purity and cylinder sizes of ${product.name} are available?`,
      answer: [
        purity && `Purity is ${purity}.`,
        sizes && `Cylinder sizes are ${sizes}.`,
        "If you need a grade or size not listed, send us the specification and we will tell you whether we can supply it.",
      ]
        .filter(Boolean)
        .join(" "),
    });
  }

  // Only ask the refill question where refilling is actually how the product is
  // supplied. Dry ice sublimates and is made to order, so the question is wrong
  // for it and gets a different one.
  if (/refill/i.test(supply)) {
    faqs.push({
      question: `Do you offer ${product.name} on refill or exchange?`,
      answer:
        `Yes. ${product.name} is supplied on a cylinder, refill and exchange ` +
        `basis. We supply gas only — we do not sell cylinders. Regular ` +
        `customers go onto a scheduled delivery cycle, so a full cylinder ` +
        `arrives before the one in use runs out.`,
    });
  } else if (supply) {
    faqs.push({
      question: `How is ${product.name} supplied?`,
      answer: `${supply}. Tell us the quantity and the date you need it, and we will confirm what we can arrange.`,
    });
  }

  faqs.push({
    question: `How do I get a price for ${product.name}?`,
    answer:
      `Send us the quantity and roughly how often you need it — that is enough ` +
      `for a quote. WhatsApp or call ${siteConfig.contact.phoneDisplay}, or use ` +
      `the enquiry form. We quote the same working day.`,
  });

  return faqs;
}

/**
 * Joins application phrases into prose.
 *
 * Semicolons rather than commas, because several applications contain their own
 * "and" — "purging and inert blanketing of tanks and lines" — and a comma list
 * ending in "and pressure and leak testing" reads as a mistake.
 */
function listApplications(items: string[]): string {
  const cleaned = items.map(
    (item) => item.charAt(0).toLowerCase() + item.slice(1),
  );

  if (cleaned.length <= 1) return cleaned.join("");
  if (cleaned.length === 2) return cleaned.join(" and ");

  return `${cleaned.slice(0, -1).join("; ")}; and ${cleaned.at(-1)}`;
}
