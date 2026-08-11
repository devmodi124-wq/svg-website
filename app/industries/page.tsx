import type { Metadata } from "next";
import Link from "next/link";

import { Section, SectionHead } from "@/components/Section";
import { Button } from "@/components/Button";
import { Formula } from "@/components/Formula";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageSlot } from "@/components/ImageSlot";
import { BreadcrumbSchema } from "@/components/Schema";
import { ArrowIcon, WhatsAppIcon, industryIcons } from "@/components/Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink } from "@/lib/links";
import { productsForIndustry } from "@/lib/related";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries We Supply",
  description:
    "Industrial and medical gas supply for factories, fabrication shops, " +
    "hospitals, laboratories, food and pharmaceutical plants across Ghaziabad " +
    "and Delhi NCR.",
  alternates: { canonical: "/industries/" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Industries", href: "/industries/" },
];

export default function IndustriesPage() {
  return (
    <>
      <BreadcrumbSchema items={crumbs} />

      <section className="border-b border-seam px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-col gap-5">
            <p className="caption">
              Sectors we supply · Delhi NCR
            </p>
            <h1 className="max-w-4xl text-6xl md:text-8xl">
              Who we supply
            </h1>
            <p className="measure text-lg leading-relaxed text-plain">
              Different plants need different things from a gas supplier. A
              fabrication shop needs the cylinder to be there on Monday; a
              hospital needs the paperwork and the grade to be right every time.
              Here is how we work with each.
            </p>
          </div>
        </div>
      </section>

      <nav
        aria-label="Industry index"
        className="border-b border-seam px-5 py-5 md:px-8"
      >
        <ul className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {industries.map((industry) => (
            <li key={industry.slug}>
              <a
                href={`#${industry.slug}`}
                className="block border border-seam px-3.5 py-2 text-sm text-dim transition-colors hover:border-brand hover:text-brand-bright"
              >
                {industry.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        {industries.map((industry, index) => {
          const Icon = industryIcons[industry.icon];
          const relevant = productsForIndustry(industry);

          return (
            <article
              key={industry.slug}
              id={industry.slug}
              className={`border-b border-seam px-5 py-16 md:px-8 md:py-24 ${
                index % 2 === 1 ? "bg-shell" : ""
              }`}
            >
              <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="index-num text-xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {Icon && <Icon className="h-7 w-7 text-brand-bright" />}
                  </div>
                  <h2 className="text-5xl md:text-6xl">{industry.name}</h2>
                  <p className="measure text-lg leading-relaxed text-dim">
                    {industry.description}
                  </p>
                  <div>
                    <Button
                      href={whatsappLink(
                        `Hello ${siteConfig.name}, I am enquiring about gas supply for ${industry.name.toLowerCase()}.`,
                      )}
                      variant="whatsapp"
                      size="sm"
                      external
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Enquire for this sector
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <ImageSlot
                    src={industry.image}
                    wants={`A customer site in ${industry.name} — cylinders in use on the floor`}
                    alt={`Industrial gas in use in ${industry.name.toLowerCase()}`}
                    aspect="16/9"
                  />
                  <p className="caption">Gases we supply to this sector</p>
                  <ul className="flex flex-col border-t border-seam">
                    {relevant.map((product) => (
                      <li key={product.slug}>
                        <Link
                          href={`/products/${product.slug}/`}
                          className="group relative flex items-center gap-4 border-b border-seam py-3.5 pl-5 transition-colors hover:bg-riser"
                        >
                          <span
                            aria-hidden
                            className="absolute top-0 bottom-0 left-0 w-[3px] opacity-60 transition-opacity group-hover:opacity-100"
                            style={{ background: product.color }}
                          />
                          {/* Symbol ahead of the name, same as the register, so
                              a wrapping name cannot shift the column. */}
                          <span
                            className="figures w-12 shrink-0 text-base font-medium"
                            style={{ color: product.color }}
                          >
                            <Formula value={product.formula} />
                          </span>
                          <span className="font-display w-52 shrink-0 text-xl leading-tight font-bold text-bright transition-colors group-hover:text-brand-bright">
                            {product.name}
                          </span>
                          <span className="hidden flex-1 text-sm text-dim md:block">
                            {product.summary}
                          </span>
                          <ArrowIcon className="h-4 w-4 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-brand-bright" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <Section>
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Your sector not here?"
            title="If you need gas in NCR, ask"
            intro="These are the sectors we work with most, not a limit. Tell us what you run and what it consumes, and we will tell you honestly whether we are the right supplier for it."
          />
          <Button href="/contact/" variant="brand" size="lg" className="shrink-0">
            Talk to us
            <ArrowIcon className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
