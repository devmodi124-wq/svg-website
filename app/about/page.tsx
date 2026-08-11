import type { Metadata } from "next";

import { Section, SectionHead } from "@/components/Section";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RangeDiagram } from "@/components/RangeDiagram";
import { BreadcrumbSchema } from "@/components/Schema";
import { ArrowIcon, WhatsAppIcon } from "@/components/Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink, DEFAULT_ENQUIRY, addressLine } from "@/lib/links";

export const metadata: Metadata = {
  title: "About Us",
  description:
    `${siteConfig.name} is a GST-registered industrial and medical gas supplier ` +
    `in ${siteConfig.address.locality}, ${siteConfig.address.city}, serving ` +
    `factories, hospitals and laboratories across Delhi NCR.`,
  alternates: { canonical: "/about/" },
};

const crumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about/" },
];

/**
 * The firm's earlier family history is deliberately absent from this page — it
 * is internal, and an experience claim predating the firm's own registration
 * invites a due-diligence question the site cannot answer. What a buyer
 * actually needs here is what we supply, how we work, and the registration
 * details their purchase department will ask for.
 */
const PRINCIPLES = [
  {
    title: "The cylinder arrives before you need it",
    body: "Anyone can sell you gas. The reason customers stay is that the refill turns up on schedule, so nobody on the floor is waiting on us.",
  },
  {
    title: "The right grade, every time",
    body: "Medical gases are filled and handled separately from industrial. We match purity to the application rather than to whatever happens to be on the truck.",
  },
  {
    title: "We only claim the area we service",
    body: "We deliver across Ghaziabad and Delhi NCR. If you are outside it, we will say so rather than take an order we cannot service properly.",
  },
  {
    title: "Gas only, and we say so",
    body: "We supply gas — cylinder, refill and exchange. We do not sell cylinders or hardware, and we would rather tell you that up front than waste your time.",
  },
];

const DETAILS = [
  { label: "Registered name", value: siteConfig.legalName },
  { label: "Constitution", value: siteConfig.businessType },
  { label: "GSTIN", value: siteConfig.gstin },
  { label: "Established", value: String(siteConfig.firmFounded) },
  { label: "Working hours", value: siteConfig.hours.display },
  { label: "Address", value: addressLine },
  { label: "Delivery area", value: "Ghaziabad & Delhi NCR" },
  { label: "Range", value: "Industrial and medical gases" },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={crumbs} />

      <section className="border-b border-seam px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-col gap-6">
            <p className="caption">
              {`${siteConfig.address.locality} · ${siteConfig.address.city}`}
            </p>
            <h1 className="max-w-4xl text-5xl md:text-7xl">
              A gas supplier built around one promise: it turns up.
            </h1>
            <p className="measure text-xl leading-relaxed text-plain">
              {`${siteConfig.name} is a GST-registered proprietorship in ${siteConfig.address.locality}, ${siteConfig.address.city}, supplying industrial and medical gases to factories, hospitals, laboratories and fabrication units across Delhi NCR.`}
            </p>
          </div>
        </div>
      </section>

      {/* What we do */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead
            eyebrow="What we do"
            title="One supplier, one number to call"
          />

          <div className="flex flex-col gap-8">
            {/* Deliberately a diagram, not a photograph. The only honest photo
                here would be one of our own premises, and until that exists an
                abstract of the actual range says more than a stock stand-in. */}
            <RangeDiagram />
            <p className="measure text-lg leading-relaxed text-plain">
              We supply the full industrial and medical range — from oxygen and
              dissolved acetylene for the fabrication shops of Sahibabad, to
              medical oxygen for hospitals and nursing homes across NCR, to
              high-purity carrier gases for testing laboratories.
            </p>
            <p className="measure text-lg leading-relaxed text-plain">
              Everything is supplied on cylinder, refill and exchange. Regular
              customers go onto a scheduled delivery cycle, so a full cylinder
              arrives before the one in use runs out — which is the part of this
              business that actually decides whether a buyer stays.
            </p>
            <p className="measure text-lg leading-relaxed text-plain">
              We work across manufacturing, fabrication, healthcare and
              laboratories, and we are candid about the limits: we sell gas, we
              deliver within Delhi NCR, and we will tell you plainly if a
              requirement falls outside either.
            </p>
          </div>
        </div>
      </Section>

      {/* Principles */}
      <Section className="border-t border-seam bg-shell">
        <SectionHead
          eyebrow="How we work"
          title="Four things we will not compromise on"
        />

        <ol className="mt-12 flex flex-col border-t border-seam">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="flex gap-6 border-b border-seam py-8"
            >
              <span className="index-num shrink-0 pt-1 text-2xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl md:text-3xl">{principle.title}</h3>
                <p className="measure text-lg leading-relaxed text-dim">
                  {principle.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Business details — the panel a purchase department asks for. */}
      <Section className="border-t border-seam">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHead
            eyebrow="For your records"
            title="Details your purchase team will ask for"
          />

          <dl className="flex flex-col border-t border-seam">
            {DETAILS.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-b border-seam py-4 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="shrink-0 text-base text-dim sm:w-48">
                  {row.label}
                </dt>
                <dd className="figures font-medium text-bright">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-seam bg-shell">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-5">
            <h2 className="max-w-2xl text-4xl md:text-6xl">
              Come and see the operation
            </h2>
            <p className="measure text-lg text-dim">
              We are on the Sahibabad industrial belt, open Monday to Saturday.
              Or just send us a requirement.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button
              href={whatsappLink(DEFAULT_ENQUIRY)}
              variant="whatsapp"
              size="lg"
              external
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp
            </Button>
            <Button href="/contact/" variant="brand" size="lg">
              Contact us
              <ArrowIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
