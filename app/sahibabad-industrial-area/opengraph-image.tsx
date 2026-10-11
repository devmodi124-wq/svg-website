/**
 * This page defines its own openGraph metadata, which drops the site-wide
 * image, so it re-exports the same one rather than a separate design.
 */
export { default, alt, size, contentType } from "../opengraph-image";

// Next's static-export check reads this per file rather than following
// re-exports, so it has to be declared here too.
export const dynamic = "force-static";
