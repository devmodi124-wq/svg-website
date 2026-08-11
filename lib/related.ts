import { products, type Product } from "@/data/products";
import { industries, type Industry } from "@/data/industries";

/**
 * Products a buyer of `product` plausibly also needs, ranked by how many
 * industries they share.
 *
 * This is what turns 12 isolated pages into a site: someone landing on the
 * argon page from a search has a route to the CO₂ and welding-mixture pages,
 * which is both useful to them and how internal link equity spreads.
 */
export function relatedProducts(product: Product, limit = 3): Product[] {
  const overlap = (candidate: Product) =>
    candidate.industries.filter((i) => product.industries.includes(i)).length;

  return products
    .filter((candidate) => candidate.slug !== product.slug)
    .map((candidate) => ({ candidate, score: overlap(candidate) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

/** Every product relevant to an industry, in catalogue order. */
export function productsForIndustry(industry: Industry): Product[] {
  return products.filter(
    (product) =>
      industry.products.includes(product.slug) ||
      product.industries.includes(industry.slug),
  );
}

/** Every industry that lists this product, in catalogue order. */
export function industriesForProduct(product: Product): Industry[] {
  return industries.filter((industry) =>
    product.industries.includes(industry.slug),
  );
}
