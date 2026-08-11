import Link from "next/link";

/**
 * Visible breadcrumb trail. Pairs with BreadcrumbSchema — one is for people,
 * the other for search engines, and they should always list the same path.
 */
export function Breadcrumbs({
  items,
}: {
  /** The last item is the current page and is not linked. */
  items: { name: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-plain" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    className="text-faint transition-colors hover:text-bright"
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden className="text-faint">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
