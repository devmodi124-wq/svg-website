/**
 * `twitter:image` is a separate tag from `og:image` and does not fall back to
 * it. Same render as opengraph-image.tsx, re-exported so the two cannot drift.
 */
export {
  default,
  alt,
  size,
  contentType,
  generateStaticParams,
} from "./opengraph-image";

// Next's static-export check reads this per file rather than following
// re-exports, so it has to be declared here too.
export const dynamic = "force-static";
