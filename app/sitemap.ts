import type { MetadataRoute } from "next";

import { siteConfig } from "@/site.config";
import { products } from "@/data/products";

/** Required by `output: 'export'` — emits sitemap.xml at build time. */
export const dynamic = "force-static";

/**
 * Product pages are mapped from the catalogue rather than listed by hand, so
 * adding a gas to data/products.ts puts it in the sitemap automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/products/`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/industries/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about/`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/contact/`,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/products/${product.slug}/`,
    changeFrequency: "monthly",
    // The individual gas pages are what rank for "<gas> supplier ghaziabad",
    // so they sit just below the catalogue index rather than at the bottom.
    priority: 0.85,
  }));

  return [...staticRoutes, ...productRoutes].map((route) => ({
    ...route,
    lastModified: now,
  }));
}
