/**
 * Renders a chemical formula with proper subscripts — "O2" becomes O₂.
 *
 * Stored plain in data/products.ts so the strings stay searchable and easy to
 * edit; the typography happens here at render time.
 */
export function Formula({ value }: { value: string }) {
  const parts = value.split(/(\d+)/).filter(Boolean);

  return (
    // `normal-case` guards against this landing inside an uppercased container.
    // Chemical symbols are case-sensitive: Ar is argon, AR is nothing, and He,
    // Cl and Br break the same way.
    <span className="normal-case">
      {parts.map((part, i) =>
        /^\d+$/.test(part) ? (
          <sub key={i} className="text-[0.75em]">
            {part}
          </sub>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}
