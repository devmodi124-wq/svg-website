import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Formula } from "@/components/Formula";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImageSlot } from "@/components/ImageSlot";
import {
  BreadcrumbSchema,
  ProductSchema,
  FaqSchema,
} from "@/components/Schema";
import {
  ArrowIcon,
  WhatsAppIcon,
  PhoneIcon,
  ShieldIcon,
  industryIcons,
} from "@/components/Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink, productEnquiry } from "@/lib/links";
import { productFaqs } from "@/lib/faqs";
import { relatedProducts, industriesForProduct } from "@/lib/related";
import { products, getProduct } from "@/data/products";

type Params = { slug: string };

/** One static page per gas, generated at build time. */
export function generateStaticParams(): Params[] {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) return {};

  const title = `${product.name} Supplier in Ghaziabad & Delhi NCR`;

  return {
    title,
    description: `${product.summary} Cylinder supply, refill and exchange from ${siteConfig.name}, ${siteConfig.address.locality}, ${siteConfig.address.city}. Same-day quotes.`,
    keywords: product.keywords,
    alternates: { canonical: `/products/${product.slug}/` },
    openGraph: {
      type: "article",
      title,
      description: product.summary,
      url: `${siteConfig.url}/products/${product.slug}/`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const faqs = productFaqs(product);
  const related = relatedProducts(product);
  const servedIndustries = industriesForProduct(product);
  const index = products.findIndex((p) => p.slug === product.slug) + 1;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Gases", href: "/products/" },
    { name: product.name, href: `/products/${product.slug}/` },
  ];

  return (
    <>
      <BreadcrumbSchema items={crumbs} />
      <ProductSchema product={product} />
      <FaqSchema faqs={faqs} />

      {/* Header. The gas's colour arrives as a full-bleed band and a wash — the
          page announces which entry in the register you are standing in. */}
      <section className="relative border-b border-seam">
        <div
          aria-hidden
          className="h-1.5 w-full"
          style={{ background: product.color }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-[0.07]"
          style={{
            background: `linear-gradient(to bottom, ${product.color}, transparent)`,
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="flex flex-col gap-8">
            <Breadcrumbs items={crumbs} />

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <span className="index-num text-xl">
                  {String(index).padStart(2, "0")}
                </span>
                <span
                  className="figures text-lg font-medium"
                  style={{ color: product.color }}
                >
                  <Formula value={product.formula} />
                </span>
              </div>

              <h1 className="max-w-5xl text-6xl leading-[0.9] md:text-8xl">
                {product.name}
              </h1>

              <p className="measure text-lg leading-relaxed text-plain">
                {product.summary}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={whatsappLink(productEnquiry(product.name))}
                variant="whatsapp"
                external
              >
                <WhatsAppIcon className="h-5 w-5" />
                Get a quote on WhatsApp
              </Button>
              <Button
                href={siteConfig.contact.phoneHref}
                variant="outline"
                external
              >
                <PhoneIcon className="h-5 w-5" />
                {siteConfig.contact.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-14">
            <div
              className="rail flex flex-col gap-4"
              style={{ "--rail-color": product.color } as React.CSSProperties}
            >
              <h2 className="text-4xl md:text-5xl">
                {`About ${product.name}`}
              </h2>
              <p className="measure text-lg leading-relaxed text-dim">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="text-4xl md:text-5xl">Applications</h2>
              <ul className="flex flex-col border-t border-seam">
                {product.applications.map((application) => (
                  <li
                    key={application}
                    className="flex items-center gap-4 border-b border-seam py-3.5 text-base text-plain"
                  >
                    <span
                      aria-hidden
                      className="h-3 w-[3px] shrink-0"
                      style={{ background: product.color }}
                    />
                    {application}
                  </li>
                ))}
              </ul>
            </div>

            {servedIndustries.length > 0 && (
              <div className="flex flex-col gap-5">
                <h2 className="text-4xl md:text-5xl">Who we supply it to</h2>
                <ul className="flex flex-wrap gap-3">
                  {servedIndustries.map((industry) => {
                    const Icon = industryIcons[industry.icon];
                    return (
                      <li key={industry.slug}>
                        <Link
                          href={`/industries/#${industry.slug}`}
                          className="flex items-center gap-3 border border-seam px-4 py-3 transition-colors hover:border-brand hover:text-brand-bright"
                        >
                          {Icon && <Icon className="h-5 w-5 shrink-0" />}
                          <span className="text-base font-medium text-plain">
                            {industry.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-8 self-start lg:sticky lg:top-28">
            <ImageSlot
              src={product.image}
              wants={`${product.name} in use — the application, not a product shot on white`}
              alt={`${product.name} in use — supplied across Ghaziabad and Delhi NCR`}
              aspect="4/3"
            />

            <div className="flex flex-col border border-seam bg-shell">
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ background: product.color }}
            >
              <h2 className="font-display text-xl font-bold text-graphite">
                Specification
              </h2>
              <span className="figures text-sm font-semibold text-graphite">
                <Formula value={product.formula} />
              </span>
            </div>

            <dl className="flex flex-col">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-1 border-b border-seam px-5 py-3.5"
                >
                  <dt className="text-sm text-faint">{spec.label}</dt>
                  <dd className="figures text-base font-semibold text-bright">
                    {spec.value}
                  </dd>
                </div>
              ))}
              <div className="flex flex-col gap-1 border-b border-seam px-5 py-3.5">
                <dt className="text-sm text-faint">Delivery area</dt>
                <dd className="text-base font-semibold text-bright">
                  Ghaziabad &amp; Delhi NCR
                </dd>
              </div>
            </dl>

            <div className="flex gap-3 border-b border-seam bg-riser px-5 py-4">
              <ShieldIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-bright">
                  Handling
                </h3>
                <p className="text-sm leading-relaxed text-dim">
                  {product.safetyNote}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 px-5 py-5">
              <Button
                href={whatsappLink(productEnquiry(product.name))}
                variant="whatsapp"
                size="sm"
                external
                className="w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Enquire on WhatsApp
              </Button>
              <Button
                href="/contact/"
                variant="quiet"
                size="sm"
                className="w-full"
              >
                Send a written enquiry
              </Button>
            </div>
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <Section className="border-t border-seam bg-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <p className="caption">Common questions</p>
            <h2 className="text-4xl md:text-6xl">
              {`${product.name}, answered`}
            </h2>
          </div>

          <div className="flex flex-col border-t border-seam">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-b border-seam py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-start justify-between gap-5 text-[1.05rem] font-semibold text-bright">
                  {faq.question}
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 text-xl leading-none text-brand-bright transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-base leading-relaxed text-dim">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section className="border-t border-seam">
          <div className="flex flex-col gap-4">
            <p className="caption">Often bought together</p>
            <h2 className="text-4xl md:text-6xl">
              Also supplied to the same customers
            </h2>
          </div>

          <ul className="mt-12 flex flex-col border-t border-seam">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/products/${item.slug}/`}
                  className="group relative flex items-center gap-6 border-b border-seam py-5 pl-6 transition-colors hover:bg-shell"
                >
                  <span
                    aria-hidden
                    className="absolute top-0 bottom-0 left-0 w-[3px] opacity-60 transition-opacity group-hover:opacity-100"
                    style={{ background: item.color }}
                  />
                  <span className="font-display w-64 shrink-0 text-2xl font-bold text-bright transition-colors group-hover:text-brand-bright">
                    {item.name}
                  </span>
                  <span className="flex-1 text-sm text-dim">{item.summary}</span>
                  <ArrowIcon className="h-5 w-5 shrink-0 text-faint transition-all group-hover:translate-x-1 group-hover:text-brand-bright" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <Button href="/products/" variant="outline">
              All gases
              <ArrowIcon className="h-4 w-4" />
            </Button>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="border-t border-seam bg-shell">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <h2 className="max-w-2xl text-4xl md:text-6xl">
              {`Need ${product.name} in ${siteConfig.address.city} or NCR?`}
            </h2>
            <p className="measure text-lg text-dim">
              Send the cylinder size and how often you need it. We quote the same
              working day.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              href={whatsappLink(productEnquiry(product.name))}
              variant="whatsapp"
              size="lg"
              external
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </Button>
            <Button href="/contact/" variant="brand" size="lg">
              Send an enquiry
              <ArrowIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
