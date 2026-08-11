/** Shared section scaffolding, so vertical rhythm is decided once. */

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-5 py-20 md:px-8 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/**
 * Section heading. The small line above the title is set in sentence case in
 * the body face — the uppercase letterspaced accent eyebrow is deliberately not
 * part of this system.
 */
export function SectionHead({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="flex flex-col gap-5">
      {eyebrow && <p className="caption">{eyebrow}</p>}
      <h2 className="max-w-3xl text-4xl md:text-6xl">{title}</h2>
      {intro && (
        <p className="measure text-lg leading-relaxed text-dim">{intro}</p>
      )}
    </div>
  );
}
