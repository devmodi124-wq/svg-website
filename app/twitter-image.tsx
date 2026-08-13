/**
 * Twitter/X reads `twitter:image`, a separate meta tag from `og:image` — it
 * does not fall back to Open Graph when the tag is missing. The page already
 * declares `twitter:card: summary_large_image`; without this file that card
 * type has no image to show.
 *
 * Same render as opengraph-image.tsx. Re-exporting rather than duplicating it
 * keeps the two social previews from drifting apart.
 */
export { default, alt, size, contentType } from "./opengraph-image";

// Next's static-export check reads this per file rather than following
// re-exports, so it has to be declared here too, not just in
// opengraph-image.tsx.
export const dynamic = "force-static";
