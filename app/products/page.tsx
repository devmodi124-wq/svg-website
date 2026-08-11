import type { Metadata } from "next";
import Link from "next/link";

import { Section, SectionHead } from "@/components/Section";
import { Button } from "@/components/Button";
import { Register } from "@/components/Register";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/Schema";
import { ArrowIcon, WhatsAppIcon, industryIcons } from "@/components/Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink, DEFAULT_ENQUIRY } from "@/lib/links";
import { products } from "@/data/products";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industrial & Medical Gases — Full Product Range",
  description:
    "Oxygen, nitrogen, argon, CO₂, acetylene (DA), helium, hydrogen, nitrous oxide, " +
    "ammonia, welding mixtures and dry ice. Cylinder supply, refill and exchange " +
    "across Ghaziabad and Delhi NCR.",
  alternates: { canonical: "/products/" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Gases", href: "/products/" },
];

/**
 * The catalogue index.
 *
 * Deliberately shallow: it lists and routes, and the depth lives on each product
 * page. Repeating the full descriptions here would put this page in competition
 * with the individual pages it exists to feed traffic to.
 */
export default function ProductsPage() {
  return (
    <>
      <BreadcrumbSchema items={crumbs} />

      <section className="border-b border-seam px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-col gap-5">
            <p className="caption">
              Cylinder supply, refill and exchange
            </p>
            <h1 className="max-w-4xl text-6xl md:text-8xl">The register</h1>
            <p className="measure text-lg leading-relaxed text-plain">
              Everything below is delivered from our base in{" "}
              {siteConfig.address.locality}, {siteConfig.address.city}. Open any
              gas for specifications, applications and handling notes — or
              WhatsApp us and skip straight to a quote.
            </p>
          </div>
          <div>
            <Button
              href={whatsappLink(DEFAULT_ENQUIRY)}
              variant="whatsapp"
              external
            >
              <WhatsAppIcon className="h-5 w-5" />
              Get a quote on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <Register items={products} />
      </Section>

      {/* A second way in, for buyers who think in terms of their plant rather
          than the periodic table. */}
      <Section className="border-t border-seam bg-shell">
        <SectionHead
          eyebrow="Not sure which gas"
          title="Find it by what you run"
          intro="Most buyers arrive knowing the job, not the gas. Pick your industry and we will show you what it usually needs."
        />

        <ul className="mt-12 flex flex-wrap gap-3">
          {industries.map((industry) => {
            const Icon = industryIcons[industry.icon];
            return (
              <li key={industry.slug}>
                <Link
                  href={`/industries/#${industry.slug}`}
                  className="flex items-center gap-3 border border-seam px-5 py-3.5 transition-colors hover:border-brand hover:text-brand-bright"
                >
                  {Icon && <Icon className="h-5 w-5 shrink-0" />}
                  <span className="font-medium text-plain">
                    {industry.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section className="border-t border-seam">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Not listed?"
            title="Ask anyway — we can usually source it"
            intro={`If you need a gas, grade or cylinder size that is not on this page, send us the specification. Between our own filling and our supplier network we can usually arrange it across ${siteConfig.address.city} and NCR.`}
          />
          <Button href="/contact/" variant="brand" size="lg" className="shrink-0">
            Send a specification
            <ArrowIcon className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </>
  );
}
