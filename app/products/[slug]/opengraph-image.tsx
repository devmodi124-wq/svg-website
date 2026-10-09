import { ImageResponse } from "next/og";

import { siteConfig } from "@/site.config";
import { products, getProduct } from "@/data/products";
import { loadOgFonts } from "@/lib/og-fonts";

/**
 * Per-gas social preview. A WhatsApp forward of /products/argon-gas/ shows
 * "Argon Gas" in that gas's identity colour, rather than the generic site card
 * every page shared before — the link tells the recipient what it is before
 * they open it.
 */
export const alt = `Industrial gas supplier — ${siteConfig.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) throw new Error(`No product for slug "${slug}"`);

  // "O2" → "O" + subscript "2", the same split components/Formula.tsx does.
  const parts = product.formula.split(/(\d+)/).filter(Boolean);

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
        <div
          style={{ display: "flex", height: 24, background: product.color }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "64px 80px 0 80px",
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
            GAS SUPPLIER · GHAZIABAD &amp; DELHI NCR
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Tinos",
              fontWeight: 700,
              fontSize: product.name.length > 20 ? 92 : 120,
              lineHeight: 1.05,
              color: "#f4f6f7",
              marginTop: 28,
            }}
          >
            {product.name}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              fontFamily: "Tinos",
              fontSize: 56,
              color: product.color,
              marginTop: 20,
            }}
          >
            {parts.map((part, i) =>
              /^\d+$/.test(part) ? (
                <span key={i} style={{ display: "flex", fontSize: 36 }}>
                  {part}
                </span>
              ) : (
                <span key={i} style={{ display: "flex" }}>
                  {part}
                </span>
              ),
            )}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 80px 56px 80px",
            fontSize: 30,
            color: "#d5dadd",
          }}
        >
          <span style={{ display: "flex", fontWeight: 600 }}>
            {siteConfig.name}
          </span>
          <span style={{ display: "flex" }}>
            {siteConfig.contact.phoneDisplay}
          </span>
        </div>
      </div>
    ),
    { ...size, fonts: [...(await loadOgFonts())] },
  );
}
