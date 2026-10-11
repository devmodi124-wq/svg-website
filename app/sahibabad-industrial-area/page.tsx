import type { Metadata } from "next";
import Link from "next/link";

import { Section, SectionHead } from "@/components/Section";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Register } from "@/components/Register";
import { BreadcrumbSchema, FaqSchema } from "@/components/Schema";
import {
  ArrowIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink, addressLine, directionsLink } from "@/lib/links";
import type { Faq } from "@/lib/faqs";
import { products } from "@/data/products";

const AREA = "Sahibabad Industrial Area";

/** Areas the business has confirmed it supplies around the estate. */
const NEARBY = ["Loni", "Vasundhara", "Mohan Nagar", "Noida"];

// Absolute: with the brand suffix the title would run past what Google shows.
const title = `Industrial Gas Supplier in ${AREA}`;

export const metadata: Metadata = {
  title: { absolute: title },
  description:
    `Oxygen, nitrogen, argon, CO₂, acetylene and more, supplied from inside ` +
    `${AREA}, Ghaziabad. Cylinder supply, refill and exchange.`,
  alternates: { canonical: "/sahibabad-industrial-area/" },
  // The image comes from ./opengraph-image.tsx and ./twitter-image.tsx; the
  // parent's openGraph object is replaced, not merged, so the rest is repeated.
  openGraph: {
    type: "website",
    title,
    url: `${siteConfig.url}/sahibabad-industrial-area/`,
    siteName: siteConfig.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: AREA, href: "/sahibabad-industrial-area/" },
];

/**
 * Every answer here restates something already published elsewhere on the
 * site (address, hours, the range, quote turnaround, supply beyond the NCR on
 * request). Add delivery times or distances only once the business confirms
 * them — a hyper-local page invites the question, and a wrong number is worse
 * than none.
 */
const faqs: Faq[] = [
  {
    question: `Who supplies industrial gas cylinders in ${AREA}?`,
    answer:
      `${siteConfig.name} is based in ${AREA}, Sahibabad, Ghaziabad — ` +
      `${addressLine}. We supply oxygen, nitrogen, argon, carbon dioxide, ` +
      `acetylene (DA) gas and other industrial and medical gases to the ` +
      `factories, fabrication units and workshops around us.`,
  },
  {
    question: `Which gases can I get from ${siteConfig.name}?`,
    answer: `${products.map((p) => p.name).join(", ")}. Each has its own page with specifications and cylinder sizes.`,
  },
  {
    question: "How do I get a quote?",
    answer:
      `Call ${siteConfig.contact.phoneDisplay}, message us on WhatsApp, or use ` +
      `the enquiry form. Tell us the gas, the cylinder size and roughly how ` +
      `often you need it, and we quote the same working day. We are open ` +
      `${siteConfig.hours.display}.`,
  },
  {
    question: "How quickly can you deliver?",
    answer:
      "It depends on the gas and the size of the order — industrial supply is " +
      "planned against your requirement, not a fixed promise. Tell us what you " +
      "need and when, and we confirm the lead time with the quote.",
  },
  {
    question: `Do you supply outside ${AREA}?`,
    answer:
      `Yes. Beyond ${AREA} we supply nearby areas including ` +
      `${NEARBY.join(", ")}, across Ghaziabad and Delhi NCR, and elsewhere in ` +
      `India on request. Send us the gas, quantity and delivery location and ` +
      `we will confirm availability and lead time.`,
  },
];

export default function SahibabadPage() {
  return (
    <>
      <BreadcrumbSchema items={crumbs} />
      <FaqSchema faqs={faqs} />

      <section className="border-b border-seam px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Breadcrumbs items={crumbs} />

          <div className="flex flex-col gap-5">
            <p className="caption">Sahibabad, Ghaziabad · Uttar Pradesh</p>
            <h1 className="max-w-5xl text-5xl leading-[1.02] md:text-7xl">
              Industrial gas supplier in {AREA}
            </h1>
            <p className="measure text-lg leading-relaxed text-plain">
              {siteConfig.name} operates from inside {AREA}, so a factory,
              fabrication shop or workshop here is dealing with a supplier in
              its own neighbourhood — one phone call, one point of contact,
              every gas you use.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsappLink(
                `Hello ${siteConfig.name}, I am in ${AREA} and would like a quote for gas supply.`,
              )}
              variant="whatsapp"
              size="lg"
              external
            >
              <WhatsAppIcon className="h-5 w-5" />
              Get a quote on WhatsApp
            </Button>
            <Button
              href={siteConfig.contact.phoneHref}
              variant="outline"
              size="lg"
              external
            >
              <PhoneIcon className="h-5 w-5" />
              {siteConfig.contact.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>

      <Section>
        <div className="flex flex-col gap-12">
          <SectionHead
            eyebrow="What we supply"
            title={`Every gas a plant in ${AREA} is likely to ask for`}
            intro="Cylinder supply, refill and exchange. Open any gas for specifications, cylinder sizes and what it is used for."
          />
          <Register items={products} />
        </div>
      </Section>

      <Section className="border-t border-seam">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <SectionHead
              eyebrow="How it works"
              title="Ask once, get a quote the same working day"
            />
            <ol className="flex flex-col gap-5 text-lg leading-relaxed text-plain">
              <li>
                <span className="font-semibold text-bright">1. Tell us what you need.</span>{" "}
                The gas, the cylinder size, and roughly how often — by call,
                WhatsApp or the enquiry form.
              </li>
              <li>
                <span className="font-semibold text-bright">2. We quote the same working day.</span>{" "}
                You get price and availability for exactly what you asked for.
              </li>
              <li>
                <span className="font-semibold text-bright">3. Supply, refill and exchange.</span>{" "}
                Once you are set up, repeat orders are the same single call.
              </li>
            </ol>
          </div>

          <div className="flex flex-col gap-6 border border-seam bg-shell p-7 md:p-9">
            <h2 className="text-3xl">Find us</h2>
            <div className="flex gap-4">
              <PinIcon className="mt-1 h-5 w-5 shrink-0 text-brand-bright" />
              <p className="text-lg leading-relaxed text-bright">{addressLine}</p>
            </div>
            <p className="figures text-base text-dim">{siteConfig.hours.display}</p>
            <p className="text-base leading-relaxed text-dim">
              Also supplying nearby: {NEARBY.join(", ")}.
            </p>
            <div>
              <Button href={directionsLink} variant="outline" external>
                Get directions
                <ArrowIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-seam bg-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <p className="caption">Common questions</p>
            <h2 className="text-4xl md:text-6xl">
              {`Gas supply in ${AREA}, answered`}
            </h2>
          </div>

          <div className="flex flex-col gap-8">
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

            <p className="text-base leading-relaxed text-dim">
              Outside {AREA}? We also supply across Ghaziabad and Delhi NCR, and
              elsewhere in India on request —{" "}
              <Link
                href="/contact/"
                className="text-brand-bright underline underline-offset-4"
              >
                get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
