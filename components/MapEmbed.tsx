"use client";

import { useState } from "react";

import { PinIcon } from "./Icons";

/**
 * Google Maps, loaded only when asked for.
 *
 * `loading="lazy"` wasn't enough: on a phone the map sits close enough to the
 * form that the browser fetched it anyway, and the embed alone is ~450 KB of
 * Google's JS and tiles — more than the rest of the Contact page combined. A
 * visitor who came to call or WhatsApp never needed it. The "Get directions"
 * button next to this opens Maps itself, so nothing is lost by waiting for a tap.
 *
 * The placeholder fills the same box as the iframe, so loading it causes no
 * layout shift.
 */
export function MapEmbed({
  src,
  title,
  address,
}: {
  src: string;
  title: string;
  address: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="aspect-[4/3] w-full border border-seam bg-shell">
      {loaded ? (
        <iframe
          src={src}
          title={title}
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
          style={{ border: 0 }}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
          <PinIcon className="h-7 w-7 text-brand-bright" />
          <p className="max-w-[34ch] text-base leading-relaxed text-plain">
            {address}
          </p>
          <button
            type="button"
            onClick={() => setLoaded(true)}
            className="inline-flex items-center justify-center border border-seam-bright px-5 py-2.5 font-semibold text-bright transition-colors hover:border-brand-action hover:bg-brand-action hover:text-brand-ink"
          >
            Show map
          </button>
        </div>
      )}
    </div>
  );
}
