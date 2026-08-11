import Link from "next/link";

import { Logo } from "./Logo";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon } from "./Icons";
import { siteConfig } from "@/site.config";
import { addressLine, directionsLink } from "@/lib/links";
import { products } from "@/data/products";
import { industries } from "@/data/industries";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/products/", label: "Gases" },
  { href: "/industries/", label: "Industries" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-seam bg-pit">
      {/* The full spectrum as a hairline — the one place every gas colour
          appears together, which is what the identity actually is. */}
      <div aria-hidden className="flex h-1">
        {products.map((product) => (
          <span
            key={product.slug}
            className="flex-1"
            style={{ background: product.color }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div className="flex flex-col gap-5">
            <Logo sub={`${siteConfig.address.city} · Delhi NCR`} />
            <p className="max-w-xs text-sm leading-relaxed text-dim">
              Industrial and medical gas supply to factories, hospitals,
              laboratories and fabrication units across Ghaziabad and Delhi NCR.
            </p>
            <p className="figures text-sm leading-relaxed text-faint">
              {`Est. ${siteConfig.firmFounded} · ${siteConfig.businessType}`}
            </p>
          </div>

          <nav className="flex flex-col gap-3.5">
            <h2 className="font-display text-lg font-bold text-bright">
              Gases
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {products.slice(0, 7).map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/products/${product.slug}/`}
                    className="group flex items-center gap-2.5 text-dim transition-colors hover:text-bright"
                  >
                    <span
                      aria-hidden
                      className="h-3 w-0.5 shrink-0"
                      style={{ background: product.color }}
                    />
                    {product.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products/"
                  className="ml-[1.25rem] font-medium text-plain transition-colors hover:text-brand-bright"
                >
                  See all gases →
                </Link>
              </li>
            </ul>
          </nav>

          <nav className="flex flex-col gap-3.5">
            <h2 className="font-display text-lg font-bold text-bright">
              Industries
            </h2>
            <ul className="flex flex-col gap-2.5 text-sm">
              {industries.slice(0, 6).map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/industries/#${industry.slug}`}
                    className="text-dim transition-colors hover:text-bright"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-3.5">
            <h2 className="font-display text-lg font-bold text-bright">
              Contact
            </h2>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="figures flex items-start gap-2.5 text-dim transition-colors hover:text-bright"
                >
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-start gap-2.5 break-all text-dim transition-colors hover:text-bright"
                >
                  <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-dim transition-colors hover:text-bright"
                >
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                  <span>{addressLine}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-dim">
                <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-bright" />
                {siteConfig.hours.display}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-seam pt-6 text-xs text-faint">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-bright"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} {siteConfig.legalName}. All rights
              reserved.
            </p>
            <p className="figures">
              {`${siteConfig.businessType} · GSTIN ${siteConfig.gstin}`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
