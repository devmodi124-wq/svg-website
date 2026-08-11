/**
 * Industries served. Referenced by slug from data/products.ts, and (Phase 2)
 * rendered as the Industries Served page.
 */

export type Industry = {
  slug: string;
  name: string;
  /** One line for cards. */
  summary: string;
  /** Longer copy for the Industries page. */
  description: string;
  /** Product slugs most relevant to this industry. */
  products: string[];
  /** Simple icon key, mapped to an inline SVG in components/Icon.tsx. */
  icon: string;
  /** Illustrative photograph of the sector. Lives in public/images/. */
  image?: string;
};

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    image: "/images/industry-manufacturing.webp",
    name: "Factories & Manufacturing",
    summary: "Process gases, furnace atmospheres and inerting for production lines.",
    description:
      "Manufacturing plants across Sahibabad, Ghaziabad and the wider NCR industrial belt " +
      "rely on a steady gas supply to keep lines running. We handle scheduled refills so " +
      "production is never held up waiting on a cylinder, and we supply the full range from " +
      "process oxygen and nitrogen through to heat treatment atmospheres.",
    products: ["oxygen-gas", "nitrogen-gas", "hydrogen-gas", "ammonia-gas"],
    icon: "factory",
  },
  {
    slug: "fabrication",
    image: "/images/industry-fabrication.webp",
    name: "Engineering & Fabrication",
    summary: "Cutting, welding and shielding gases for workshops and job shops.",
    description:
      "Fabrication shops are our largest customer group. Whether it is oxy-acetylene cutting, " +
      "TIG on stainless, or high-volume MAG welding on a production jig, we supply the " +
      "shielding and fuel gases to match — including pre-blended argon-CO₂ mixtures that cut " +
      "spatter and rework.",
    products: [
      "acetylene-da-gas",
      "argon-gas",
      "carbon-dioxide-gas",
      "argon-co2-welding-mixture",
      "oxygen-gas",
    ],
    icon: "welding",
  },
  {
    slug: "healthcare",
    image: "/images/industry-healthcare.webp",
    name: "Hospitals & Healthcare",
    summary: "Medical oxygen and anaesthetic gases for hospitals, clinics and home care.",
    description:
      "We supply hospitals, nursing homes, dental clinics and ambulance operators across " +
      "Delhi NCR with medical grade oxygen and nitrous oxide, filled in dedicated cylinders. " +
      "We also support home-care patients on continuous oxygen therapy.",
    products: ["medical-oxygen", "nitrous-oxide-gas", "helium-gas"],
    icon: "medical",
  },
  {
    slug: "laboratories",
    image: "/images/industry-laboratories.webp",
    name: "Laboratories & Research",
    summary: "High-purity carrier and calibration gases for analytical instruments.",
    description:
      "Research labs, testing houses and educational institutions need gases where the purity " +
      "grade genuinely matters. We supply high-purity nitrogen, argon, helium and hydrogen for " +
      "chromatography, spectroscopy and general instrumentation.",
    products: ["nitrogen-gas", "helium-gas", "hydrogen-gas", "argon-gas"],
    icon: "lab",
  },
  {
    slug: "food-beverage",
    image: "/images/industry-food-beverage.webp",
    name: "Food & Beverage",
    summary: "Food grade CO₂, nitrogen and dry ice for packaging and cold chain.",
    description:
      "Food processors and beverage plants use CO₂ for carbonation, nitrogen for " +
      "modified-atmosphere packaging that extends shelf life, and dry ice to hold the cold " +
      "chain in transit. We supply all three.",
    products: ["carbon-dioxide-gas", "nitrogen-gas", "dry-ice", "nitrous-oxide-gas"],
    icon: "food",
  },
  {
    slug: "pharmaceutical",
    image: "/images/industry-pharmaceutical.webp",
    name: "Pharmaceutical & Chemical",
    summary: "Inerting, blanketing and process gases for regulated manufacturing.",
    description:
      "Pharmaceutical and chemical manufacturers use nitrogen for blanketing and purging " +
      "reactive intermediates, hydrogen for hydrogenation, and dry ice for cold chain " +
      "distribution of temperature-sensitive product.",
    products: ["nitrogen-gas", "hydrogen-gas", "dry-ice", "ammonia-gas"],
    icon: "flask",
  },
  {
    slug: "automotive",
    image: "/images/industry-automotive.webp",
    name: "Automotive & Ancillary",
    summary: "Welding and shielding gases for body shops and component manufacturers.",
    description:
      "The NCR automotive ancillary cluster runs on shielding gas. We supply argon, CO₂ and " +
      "pre-blended welding mixtures to component manufacturers, body shops and service " +
      "workshops on scheduled delivery.",
    products: ["argon-co2-welding-mixture", "argon-gas", "carbon-dioxide-gas", "oxygen-gas"],
    icon: "automotive",
  },
  {
    slug: "construction",
    image: "/images/industry-construction.webp",
    name: "Construction & Infrastructure",
    summary: "Cutting and welding gases delivered to site.",
    description:
      "Site work needs fuel and cutting gas delivered where the work is. We supply oxygen and " +
      "dissolved acetylene for structural cutting, welding and flame heating on construction " +
      "and infrastructure projects across NCR.",
    products: ["oxygen-gas", "acetylene-da-gas", "argon-co2-welding-mixture"],
    icon: "construction",
  },
  {
    slug: "electronics",
    image: "/images/industry-electronics.webp",
    name: "Electronics & Precision",
    summary: "Ultra-high-purity gases for electronics assembly and testing.",
    description:
      "Electronics manufacturing and precision assembly need gases at purity grades where " +
      "contamination shows up in yield. We supply high-purity nitrogen, hydrogen and helium " +
      "for reflow, testing and leak detection.",
    products: ["nitrogen-gas", "hydrogen-gas", "helium-gas"],
    icon: "chip",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
