import { products } from "@/data/products";
import { Formula } from "./Formula";

/**
 * An abstract standing in for a photograph on the About page.
 *
 * One equal band per gas, in its identity colour, read left to right in
 * catalogue order — the range as a spectrum. Add a gas to `data/products.ts`
 * and this grows with it, so the picture cannot go stale.
 *
 * ── Two things it deliberately is not ───────────────────────────────────────
 *
 * Not a chart. An earlier version stepped the band heights, which looked
 * better but read as a bar chart — implying quantities that do not exist.
 * Equal bands cannot be misread as data.
 *
 * Not a cylinder. The bands are flat geometry, not a depiction of a physical
 * cylinder, because the identity colours are decorative wayfinding rather than
 * IS 4379 colour codes. Colouring a drawn cylinder would imply the code; a
 * colour field beside a formula does not.
 */
export function RangeDiagram({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative flex aspect-[3/2] w-full flex-col overflow-hidden border border-seam bg-shell ${className}`}
    >
      {/* Ruled field, like squared drawing paper. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Thin rules rather than fat blocks: twelve saturated bands at full
          width read as a paint swatch, which is louder than anything else on
          the site. Narrow lines on open ground read as instrumentation. */}
      <div className="relative flex flex-1 items-stretch px-5 pt-10 sm:px-7">
        {products.map((product) => (
          <span
            key={product.slug}
            className="flex flex-1 justify-center"
            aria-hidden
          >
            <span
              className="w-[3px] sm:w-1"
              style={{
                background: product.color,
                maskImage: "linear-gradient(to bottom, #000 45%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, #000 45%, transparent)",
              }}
            />
          </span>
        ))}
      </div>

      {/* The legend, and the proof that this is the real catalogue rather than
          an arbitrary pattern. */}
      <figcaption className="relative flex gap-[3px] border-t border-seam bg-graphite/70 px-5 py-3 sm:px-7">
        {products.map((product) => (
          <span
            key={product.slug}
            className="figures flex-1 text-center text-[0.55rem] leading-none sm:text-[0.7rem]"
            style={{ color: product.color }}
            title={product.name}
          >
            <Formula value={product.formula} />
          </span>
        ))}
      </figcaption>

      <span className="sr-only">
        {`The range: ${products.map((p) => p.name).join(", ")}.`}
      </span>
    </figure>
  );
}
