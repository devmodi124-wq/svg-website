import Link from "next/link";

import { Formula } from "./Formula";
import { ArrowIcon } from "./Icons";
import type { Product } from "@/data/products";

/**
 * The gas register — the site's primary structure, used in place of a grid of
 * cards.
 *
 * Numbered rows with a colour rail down the left, reading like a stock manifest.
 * It holds a long list without turning into wallpaper, it puts the headline
 * spec on the same line as the name, and the colour gives each gas a consistent
 * identity the visitor can follow from here into its own page.
 *
 * The colours are decorative wayfinding. Nothing here labels them as cylinder
 * colour codes, and nothing should.
 */
export function Register({ items }: { items: Product[] }) {
  return (
    <ol className="flex flex-col border-t border-seam">
      {items.map((product, index) => {
        const headline = product.specs[0];

        return (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}/`}
              className="group relative flex items-start gap-5 border-b border-seam py-6 pl-6 transition-colors hover:bg-shell md:items-center md:gap-8 md:pl-8"
            >
              {/* The rail. Grows to full opacity on hover so the row it belongs
                  to is unambiguous when scanning the list. */}
              <span
                aria-hidden
                className="absolute top-0 bottom-0 left-0 w-[3px] opacity-70 transition-opacity duration-150 group-hover:opacity-100"
                style={{ background: product.color }}
              />

              <span className="index-num w-7 shrink-0 pt-1.5 text-xl md:pt-0">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Symbol column — fixed width, and ahead of the name rather than
                  trailing it. A two-line name like "Carbon Dioxide Gas" used to
                  shove a trailing symbol out of line with the rest of the column. */}
              <span
                className="figures w-12 shrink-0 pt-1.5 text-base font-medium md:w-14 md:pt-0"
                style={{ color: product.color }}
              >
                <Formula value={product.formula} />
              </span>

              <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:flex-row md:items-baseline md:gap-6">
                <span className="font-display text-2xl leading-tight font-bold text-bright transition-colors group-hover:text-brand-bright md:w-64 md:shrink-0 md:text-[1.75rem]">
                  {product.name}
                </span>

                <span className="flex-1 text-base leading-relaxed text-dim">
                  {product.summary}
                </span>

                {headline && (
                  <span className="figures hidden w-44 shrink-0 text-base text-plain lg:block">
                    {headline.value}
                  </span>
                )}
              </span>

              <ArrowIcon className="mt-1.5 h-5 w-5 shrink-0 text-faint transition-all duration-150 group-hover:translate-x-1 group-hover:text-brand-bright md:mt-0" />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
