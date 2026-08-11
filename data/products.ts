/**
 * The gas catalogue — single source of truth.
 *
 * The Products page and (in Phase 2) every individual product page are generated
 * from this array. Add a gas here and it appears everywhere, including the sitemap.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ BEFORE LAUNCH: the `specs` on each product are typical trade values, not │
 * │ verified against what Shree Vinayak Gas actually fills. Confirm every  │
 * │ purity grade and cylinder size with the business and correct them here.  │
 * │ Publishing a purity you cannot supply is a commercial and safety problem.│
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export type Product = {
  /** URL segment: /products/oxygen-gas */
  slug: string;
  /**
   * The gas's identity colour, used as a wayfinding rail across the site.
   *
   * These are DECORATIVE. They are not IS 4379 cylinder colour codes and must
   * never be presented as such — no caption, label or alt text may tie a colour
   * to a cylinder band. A buyer who orders by colour because the website taught
   * them to is a safety problem we would have created.
   *
   * If the real colour codes are ever confirmed with the business, they can be
   * substituted here one gas at a time.
   */
  color: string;
  /** Illustrative photograph of the gas in use. Lives in public/images/. */
  image?: string;
  name: string;
  /** Chemical formula, rendered with subscripts in the UI. */
  formula: string;
  /** One line for cards and meta descriptions. */
  summary: string;
  /** Two or three sentences for the product page intro. */
  description: string;
  /** What customers actually use it for. Drives long-tail search traffic. */
  applications: string[];
  /** Slugs from data/industries.ts. */
  industries: string[];
  /** TODO: verify with the business before launch. */
  specs: { label: string; value: string }[];
  /** Extra terms buyers search for, including local trade names. */
  keywords: string[];
  /** Shown as a handling note. Keep factual and non-alarmist. */
  safetyNote: string;
  /** Surfaced on the home page strip. */
  featured: boolean;
};

export const products: Product[] = [
  {
    slug: "oxygen-gas",
    color: "#5FB6EE",
    image: "/images/gas-oxygen-gas.webp",
    name: "Oxygen Gas",
    formula: "O2",
    summary:
      "Industrial grade oxygen for cutting, welding, brazing and process use.",
    description:
      "Oxygen is the workhorse of any fabrication shop. Paired with acetylene or LPG it " +
      "produces the flame temperatures needed for cutting and welding steel, and it is used " +
      "as a process gas across metallurgy, glass and water treatment. We supply industrial " +
      "grade oxygen in cylinders across Ghaziabad and Delhi NCR, with refills on a regular " +
      "delivery cycle so your line never stops waiting on a cylinder.",
    applications: [
      "Oxy-fuel cutting and welding",
      "Brazing, soldering and flame heating",
      "Steel and metal manufacturing",
      "Glass manufacturing and furnace enrichment",
      "Wastewater and effluent treatment",
      "Chemical process oxidation",
    ],
    industries: ["manufacturing", "fabrication", "automotive", "construction"],
    specs: [
      { label: "Purity", value: "99.5% (industrial grade)" },
      { label: "Cylinder sizes", value: "7 m³ / 10 m³" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "oxygen gas supplier ghaziabad",
      "oxygen cylinder delhi ncr",
      "industrial oxygen gas",
      "oxygen gas refill sahibabad",
    ],
    safetyNote:
      "Oxygen is not flammable, but it dramatically accelerates combustion. Keep cylinders " +
      "away from oil, grease and any hydrocarbon, and never lubricate oxygen fittings.",
    featured: true,
  },
  {
    slug: "medical-oxygen",
    color: "#4FCFC0",
    image: "/images/gas-medical-oxygen.webp",
    name: "Medical Oxygen",
    formula: "O2",
    summary:
      "Pharmacopoeia-grade oxygen for hospitals, nursing homes and home care.",
    description:
      "Medical oxygen is held to a higher purity standard than industrial oxygen and is " +
      "filled in dedicated, cleaned cylinders. We supply hospitals, nursing homes, clinics " +
      "and ambulance operators across Delhi NCR, and support home-care patients requiring " +
      "continuous oxygen therapy.",
    applications: [
      "Hospital and nursing home oxygen supply",
      "Operating theatres and ICUs",
      "Ambulance and emergency response",
      "Home oxygen therapy",
      "Oxygen concentration and pipeline systems",
    ],
    industries: ["healthcare"],
    specs: [
      { label: "Purity", value: "99.5% minimum (IP grade)" },
      { label: "Cylinder sizes", value: "1.3 m³ / 7 m³ / 10 m³" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "medical oxygen supplier ghaziabad",
      "medical oxygen cylinder delhi ncr",
      "hospital oxygen supplier noida",
      "oxygen cylinder for home use ghaziabad",
    ],
    safetyNote:
      "Medical oxygen cylinders are filled and handled separately from industrial oxygen. " +
      "Use only medical-grade regulators and never interchange the two.",
    featured: true,
  },
  {
    slug: "nitrogen-gas",
    color: "#7FA8F5",
    image: "/images/gas-nitrogen-gas.webp",
    name: "Nitrogen Gas",
    formula: "N2",
    summary:
      "Dry, inert nitrogen for purging, blanketing, laser cutting and food packaging.",
    description:
      "Nitrogen is inert, dry and cheap to run, which makes it the default choice wherever " +
      "oxygen needs to be kept out — purging pipelines, blanketing reactive chemicals, " +
      "pressure testing, and modified-atmosphere food packaging. It is also the assist gas " +
      "of choice for clean, oxide-free laser cutting of stainless steel.",
    applications: [
      "Purging and inert blanketing of tanks and lines",
      "Laser cutting assist gas",
      "Modified-atmosphere food packaging",
      "Pressure and leak testing",
      "Heat treatment furnace atmospheres",
      "Electronics and semiconductor processing",
    ],
    industries: [
      "manufacturing",
      "fabrication",
      "food-beverage",
      "pharmaceutical",
      "laboratories",
    ],
    specs: [
      { label: "Purity", value: "99.9% – 99.999% depending on grade" },
      { label: "Cylinder sizes", value: "7 m³ / 10 m³" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "nitrogen gas supplier ghaziabad",
      "nitrogen cylinder supplier delhi ncr",
      "liquid nitrogen ghaziabad",
      "nitrogen gas for laser cutting",
    ],
    safetyNote:
      "Nitrogen is non-toxic but displaces oxygen. Use only in ventilated areas — an " +
      "unventilated leak in a confined space is an asphyxiation risk with no warning smell.",
    featured: true,
  },
  {
    slug: "argon-gas",
    color: "#9A9CF7",
    image: "/images/gas-argon-gas.webp",
    name: "Argon Gas",
    formula: "Ar",
    summary:
      "High-purity shielding gas for TIG and MIG welding of stainless steel and aluminium.",
    description:
      "Argon is fully inert, so it shields a weld pool without reacting with it. That makes " +
      "it essential for TIG welding, and for MIG welding of aluminium, stainless steel and " +
      "other non-ferrous metals where a clean, spatter-free bead matters. We supply welding " +
      "grade argon to fabrication units across Ghaziabad and NCR.",
    applications: [
      "TIG (GTAW) welding shielding gas",
      "MIG welding of aluminium and stainless steel",
      "Heat treatment and annealing atmospheres",
      "Metal fabrication and precision welding",
      "Analytical instrumentation carrier gas",
    ],
    industries: ["fabrication", "manufacturing", "automotive", "laboratories"],
    specs: [
      { label: "Purity", value: "99.99% (welding grade)" },
      { label: "Cylinder sizes", value: "7 m³ / 10 m³" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "argon gas supplier ghaziabad",
      "buy argon gas delhi ncr",
      "argon cylinder for welding",
      "tig welding gas supplier sahibabad",
    ],
    safetyNote:
      "Argon is inert and non-toxic but heavier than air, so it pools in pits and trenches. " +
      "Ventilate low-lying work areas.",
    featured: true,
  },
  {
    slug: "carbon-dioxide-gas",
    color: "#B892F2",
    image: "/images/gas-carbon-dioxide-gas.webp",
    name: "Carbon Dioxide Gas",
    formula: "CO2",
    summary:
      "CO₂ for MIG welding, beverage carbonation, fire suppression and pH control.",
    description:
      "Carbon dioxide is the most economical shielding gas for MIG welding mild and carbon " +
      "steel, giving deep penetration at low cost. Beyond the workshop it carbonates " +
      "beverages, charges fire extinguishers, controls pH in effluent treatment and enriches " +
      "greenhouse atmospheres.",
    applications: [
      "MIG/MAG welding shielding gas",
      "Beverage carbonation",
      "Fire extinguisher charging",
      "pH control in water treatment",
      "Greenhouse CO₂ enrichment",
      "Food chilling and freezing",
    ],
    industries: [
      "fabrication",
      "manufacturing",
      "food-beverage",
      "construction",
    ],
    specs: [
      { label: "Purity", value: "99.9% (welding and food grade available)" },
      { label: "Cylinder sizes", value: "30 kg / 34 kg" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "co2 gas supplier ghaziabad",
      "carbon dioxide cylinder delhi ncr",
      "co2 gas for welding ghaziabad",
      "food grade co2 supplier",
    ],
    safetyNote:
      "CO₂ is heavier than air and an asphyxiant at concentration. Cylinders become very " +
      "cold during rapid discharge — handle with gloves.",
    featured: true,
  },
  {
    slug: "acetylene-da-gas",
    color: "#EE85A8",
    image: "/images/gas-acetylene-da-gas.webp",
    name: "Acetylene (DA) Gas",
    formula: "C2H2",
    summary:
      "Dissolved acetylene for oxy-acetylene cutting, welding, brazing and flame heating.",
    description:
      "Acetylene burns hotter than any other commercial fuel gas, which is why oxy-acetylene " +
      "remains the standard for cutting and gas welding steel. It is supplied as dissolved " +
      "acetylene — DA gas — absorbed in acetone within a porous mass inside the cylinder, " +
      "which is what makes it safe to store and transport at pressure.",
    applications: [
      "Oxy-acetylene cutting and gas welding",
      "Brazing and silver soldering",
      "Flame hardening and straightening",
      "Metal heating and preheating",
      "Carbon black and chemical synthesis",
    ],
    industries: ["fabrication", "manufacturing", "construction", "automotive"],
    specs: [
      { label: "Type", value: "Dissolved acetylene (DA)" },
      { label: "Purity", value: "98% minimum" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "acetylene gas supplier ghaziabad",
      "da gas supplier delhi ncr",
      "dissolved acetylene cylinder",
      "acetylene gas for cutting ghaziabad",
    ],
    safetyNote:
      "DA cylinders must always be stored and used upright, and allowed to stand upright for " +
      "several hours before use if they have been laid down — otherwise acetone is drawn " +
      "into the line. Never exceed 15 psi working pressure.",
    featured: true,
  },
  {
    slug: "helium-gas",
    color: "#E087CE",
    image: "/images/gas-helium-gas.webp",
    name: "Helium Gas",
    formula: "He",
    summary:
      "High-purity helium for leak detection, analytical instruments and cryogenics.",
    description:
      "Helium is inert, the smallest molecule available and has the lowest boiling point of " +
      "any element, which makes it irreplaceable for pressure leak detection, as a carrier " +
      "gas in gas chromatography, and for cooling superconducting magnets in MRI systems.",
    applications: [
      "Helium leak detection and pressure testing",
      "Gas chromatography carrier gas",
      "MRI magnet cooling",
      "Shielding gas for aluminium and copper welding",
      "Balloon and lifting applications",
    ],
    industries: ["laboratories", "healthcare", "manufacturing", "electronics"],
    specs: [
      { label: "Purity", value: "99.995% and above" },
      { label: "Cylinder sizes", value: "7 m³" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "helium gas supplier ghaziabad",
      "helium cylinder delhi ncr",
      "helium gas for leak testing",
      "balloon gas supplier ghaziabad",
    ],
    safetyNote:
      "Helium is inert and non-toxic but displaces oxygen. Never inhale from a cylinder.",
    featured: false,
  },
  {
    slug: "hydrogen-gas",
    color: "#E8C06A",
    image: "/images/gas-hydrogen-gas.webp",
    name: "Hydrogen Gas",
    formula: "H2",
    summary:
      "Hydrogen for hydrogenation, reducing atmospheres and analytical instruments.",
    description:
      "Hydrogen is a powerful reducing agent and the lightest gas available. It is used for " +
      "hydrogenation in chemical and food processing, to create reducing atmospheres in " +
      "float glass and metal annealing, and as a high-efficiency carrier gas in laboratory " +
      "chromatography.",
    applications: [
      "Hydrogenation in chemical and food processing",
      "Reducing atmosphere for annealing and sintering",
      "Float glass manufacturing",
      "Gas chromatography carrier and flame gas",
      "Generator cooling in power plants",
    ],
    industries: ["manufacturing", "pharmaceutical", "laboratories", "electronics"],
    specs: [
      { label: "Purity", value: "99.9% – 99.999% depending on grade" },
      { label: "Cylinder sizes", value: "7 m³" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "hydrogen gas supplier ghaziabad",
      "hydrogen cylinder delhi ncr",
      "high purity hydrogen gas india",
    ],
    safetyNote:
      "Hydrogen is highly flammable across an unusually wide concentration range and burns " +
      "with a nearly invisible flame. Store outdoors or in a well-ventilated area, away from " +
      "all ignition sources.",
    featured: false,
  },
  {
    slug: "nitrous-oxide-gas",
    color: "#CF8AE8",
    image: "/images/gas-nitrous-oxide-gas.webp",
    name: "Nitrous Oxide",
    formula: "N2O",
    summary:
      "Medical and industrial grade N₂O for anaesthesia, food processing and automotive use.",
    description:
      "Nitrous oxide is used in hospitals and dental clinics as an analgesic and anaesthetic " +
      "carrier, and in food processing as the propellant in whipped cream dispensers. It also " +
      "serves as an oxidiser in automotive performance and certain analytical applications.",
    applications: [
      "Medical and dental anaesthesia and analgesia",
      "Food processing and aerosol propellant",
      "Automotive performance applications",
      "Analytical and laboratory use",
    ],
    industries: ["healthcare", "food-beverage", "automotive", "laboratories"],
    specs: [
      { label: "Grades", value: "Medical (IP) and industrial" },
      { label: "Cylinder sizes", value: "On request" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "nitrous oxide gas supplier ghaziabad",
      "n2o cylinder delhi ncr",
      "medical nitrous oxide supplier",
    ],
    safetyNote:
      "Nitrous oxide supports combustion like oxygen. Supply for medical use is restricted to " +
      "licensed healthcare facilities.",
    featured: false,
  },
  {
    slug: "ammonia-gas",
    color: "#63D19C",
    image: "/images/gas-ammonia-gas.webp",
    name: "Ammonia Gas",
    formula: "NH3",
    summary:
      "Anhydrous ammonia for refrigeration, heat treatment and water treatment.",
    description:
      "Anhydrous ammonia is the standard refrigerant in industrial cold storage and food " +
      "processing plants, valued for its efficiency. It is also used as a nitriding agent in " +
      "metal heat treatment and in flue gas and water treatment processes.",
    applications: [
      "Industrial refrigeration and cold storage",
      "Nitriding and metal heat treatment",
      "Water and flue gas treatment",
      "Pharmaceutical and chemical synthesis",
      "Rubber and textile processing",
    ],
    industries: ["manufacturing", "food-beverage", "pharmaceutical"],
    specs: [
      { label: "Type", value: "Anhydrous ammonia" },
      { label: "Purity", value: "99.8% and above" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "ammonia gas supplier ghaziabad",
      "anhydrous ammonia cylinder delhi ncr",
      "ammonia gas for refrigeration",
    ],
    safetyNote:
      "Ammonia is toxic and corrosive with a sharp odour that gives early warning. Handle " +
      "only with appropriate PPE and in ventilated areas. Supplied to industrial users only.",
    featured: false,
  },
  {
    slug: "argon-co2-welding-mixture",
    color: "#8FD173",
    image: "/images/gas-argon-co2-welding-mixture.webp",
    name: "Argon-CO₂ Welding Mixture",
    formula: "Ar/CO2",
    summary:
      "Pre-blended 80/20 and 82/18 shielding mixtures for MAG welding of steel.",
    description:
      "A pre-blended argon and carbon dioxide mixture gives a more stable arc, less spatter " +
      "and a cleaner bead than pure CO₂, at lower cost than pure argon. The 80/20 and 82/18 " +
      "blends are the standard choice for MAG welding of mild and carbon steel in production " +
      "fabrication.",
    applications: [
      "MAG welding of mild and carbon steel",
      "Spray and short-arc transfer welding",
      "Automotive body and chassis fabrication",
      "Structural steel fabrication",
    ],
    industries: ["fabrication", "automotive", "manufacturing", "construction"],
    specs: [
      { label: "Blends", value: "80% Ar / 20% CO₂, 82% Ar / 18% CO₂" },
      { label: "Custom blends", value: "Available on request" },
      { label: "Supply", value: "Cylinder, refill and exchange" },
    ],
    keywords: [
      "argon co2 mixture gas supplier ghaziabad",
      "welding mixture gas delhi ncr",
      "mag welding gas supplier",
      "80 20 argon co2 cylinder",
    ],
    safetyNote:
      "Handled as an inert mixture — ventilate the work area, as the blend displaces oxygen.",
    featured: false,
  },
  {
    slug: "dry-ice",
    color: "#4EC6DE",
    image: "/images/gas-dry-ice.webp",
    name: "Dry Ice",
    formula: "CO2",
    summary:
      "Solid CO₂ in block and pellet form for cold chain, food transport and blast cleaning.",
    description:
      "Dry ice is solid carbon dioxide at −78.5 °C. It sublimates directly to gas, leaving no " +
      "liquid residue, which makes it ideal for shipping temperature-sensitive pharmaceuticals " +
      "and food, and for abrasive-free industrial blast cleaning.",
    applications: [
      "Cold chain and pharmaceutical shipping",
      "Frozen food transport and storage",
      "Dry ice blast cleaning",
      "Laboratory sample preservation",
      "Event and stage fog effects",
    ],
    industries: ["food-beverage", "pharmaceutical", "healthcare", "laboratories"],
    specs: [
      { label: "Forms", value: "Blocks, slabs and pellets" },
      { label: "Temperature", value: "−78.5 °C" },
      { label: "Supply", value: "To order — sublimates, so ordered fresh" },
    ],
    keywords: [
      "dry ice supplier ghaziabad",
      "dry ice delhi ncr",
      "dry ice for cold chain transport",
      "dry ice blocks pellets supplier",
    ],
    safetyNote:
      "Never handle dry ice with bare skin — it causes cold burns on contact. Never store in " +
      "an airtight container, as sublimation will build pressure until it ruptures.",
    featured: false,
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
