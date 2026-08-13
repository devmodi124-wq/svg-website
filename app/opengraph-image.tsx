import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { siteConfig } from "@/site.config";
import { products } from "@/data/products";

/**
 * The image every WhatsApp forward, LinkedIn share and search-result snippet
 * shows for the site. Generated at build time — this is a static export, so
 * there is no request to respond to; Next runs this once and writes the PNG
 * straight into `out/`, the same as any other static asset.
 *
 * Deliberately reuses real content rather than inventing marketing copy for
 * this one surface: the headline is the homepage H1 verbatim, and the row of
 * coloured rules at the base is the same one-band-per-gas motif as
 * `components/RangeDiagram.tsx`. Anyone who has seen the site once should
 * recognise this as the same site, not a separate ad creative.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same requirement as robots.ts and sitemap.ts under output: "export" — Next
// needs this stated explicitly, or it assumes the route could be dynamic and
// refuses to include it in the static build at all.
export const dynamic = "force-static";

export default async function OpengraphImage() {
  const fontDir = join(process.cwd(), "app/assets/fonts");
  const [tinosRegular, tinosBold, plexRegular, plexSemibold] =
    await Promise.all([
      readFile(join(fontDir, "Tinos-Regular.ttf")),
      readFile(join(fontDir, "Tinos-Bold.ttf")),
      readFile(join(fontDir, "IBMPlexSans-Regular.ttf")),
      readFile(join(fontDir, "IBMPlexSans-SemiBold.ttf")),
    ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0e1012",
          fontFamily: "IBM Plex Sans",
        }}
      >
        {/* Ruled field, matching the RangeDiagram's squared-paper ground. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(to right, #ffffff12 1px, transparent 1px), linear-gradient(to bottom, #ffffff12 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "76px 80px 0 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 2,
              color: "#a8b0b5",
            }}
          >
            SAHIBABAD · GHAZIABAD · DELHI NCR
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Tinos",
              fontWeight: 700,
              fontSize: 96,
              lineHeight: 1.05,
              color: "#f4f6f7",
              marginTop: 28,
            }}
          >
            <span style={{ display: "flex" }}>Every gas.</span>
            <span style={{ display: "flex", color: "#ed2b24" }}>
              One number.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#d5dadd",
              marginTop: 32,
            }}
          >
            {siteConfig.contact.phoneDisplay}
          </div>
        </div>

        {/* One rule per gas — the same identity-colour wayfinding used across
            the site, here as a closing texture rather than a chart. */}
        <div style={{ display: "flex", height: 96, marginTop: 40 }}>
          {products.map((product) => (
            <div
              key={product.slug}
              style={{
                display: "flex",
                flex: 1,
                background: product.color,
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Tinos", data: tinosRegular, weight: 400, style: "normal" },
        { name: "Tinos", data: tinosBold, weight: 700, style: "normal" },
        {
          name: "IBM Plex Sans",
          data: plexRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "IBM Plex Sans",
          data: plexSemibold,
          weight: 600,
          style: "normal",
        },
      ],
    },
  );
}
