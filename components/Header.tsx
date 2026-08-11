"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "./Logo";
import { Button } from "./Button";
import { PhoneIcon, MenuIcon, CloseIcon } from "./Icons";
import { siteConfig } from "@/site.config";

const NAV = [
  { href: "/products/", label: "Gases" },
  { href: "/industries/", label: "Industries" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Prevent the page scrolling behind the open mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-seam bg-graphite/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-5 py-3.5 md:px-8">
        <Link href="/" aria-label={`${siteConfig.name} — home`}>
          <Logo />
        </Link>

        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-base font-medium transition-colors ${
                isActive(item.href)
                  ? "text-brand-bright"
                  : "text-plain hover:text-bright"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={siteConfig.contact.phoneHref}
          className="figures ml-auto hidden items-center gap-2 text-base font-medium text-plain transition-colors hover:text-bright lg:ml-0 lg:flex"
        >
          <PhoneIcon className="h-4 w-4" />
          {siteConfig.contact.phoneDisplay}
        </a>

        <Button href="/contact/" size="sm" className="hidden lg:inline-flex">
          Get a quote
        </Button>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto p-2 text-bright lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t border-seam bg-shell lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-2 md:px-8">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // Closed here rather than in an effect on `pathname`: an anchor
                // link does not change the pathname, so an effect would leave
                // the menu covering the section just asked for.
                onClick={() => setOpen(false)}
                className={`font-display border-b border-seam py-4 text-3xl font-bold last:border-0 ${
                  isActive(item.href) ? "text-brand-bright" : "text-bright"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={siteConfig.contact.phoneHref}
              className="figures flex items-center gap-2 py-4 text-plain"
            >
              <PhoneIcon className="h-4 w-4" />
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
