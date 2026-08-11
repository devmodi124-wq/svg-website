import type { Metadata } from "next";

import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/Button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BreadcrumbSchema } from "@/components/Schema";
import {
  PhoneIcon,
  MailIcon,
  PinIcon,
  ClockIcon,
  WhatsAppIcon,
  ArrowIcon,
} from "@/components/Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink, addressLine, directionsLink } from "@/lib/links";

export const metadata: Metadata = {
  title: "Contact — Get a Quote",
  description:
    `Contact ${siteConfig.name} for industrial and medical gas supply in ` +
    `Ghaziabad and Delhi NCR. Call, WhatsApp, or send an enquiry and we will ` +
    `quote the same working day.`,
  alternates: { canonical: "/contact/" },
};

const { address, contact, hours } = siteConfig;

/** Keyless Google Maps embed — no API key, no billing account. */
const mapEmbed = `https://www.google.com/maps?q=${address.latitude},${address.longitude}&z=16&output=embed`;

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact/" },
];

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={crumbs} />

      <section className="border-b border-seam px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-7">
          <Breadcrumbs items={crumbs} />
          <div className="flex flex-col gap-5">
            <p className="caption">Sahibabad, Ghaziabad</p>
            <h1 className="text-6xl md:text-8xl">Get a quote</h1>
            <p className="measure text-lg leading-relaxed text-plain">
              Send us the gas, the cylinder size and roughly how often you need
              it. We quote the same working day, and WhatsApp is usually the
              fastest way to reach us.
            </p>
          </div>
        </div>
      </section>

      {/* Quick contact strip — for the visitor who just wants the number. */}
      <div className="border-b border-seam">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
          <a
            href={contact.phoneHref}
            className="group flex items-center gap-4 border-b border-seam px-5 py-6 transition-colors hover:bg-shell sm:border-b-0 md:px-8"
          >
            <PhoneIcon className="h-6 w-6 shrink-0 text-brand-bright" />
            <span className="flex flex-col">
              <span className="text-sm text-faint">Call us</span>
              <span className="figures font-semibold text-bright transition-colors group-hover:text-brand-bright">
                {contact.phoneDisplay}
              </span>
            </span>
          </a>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border-b border-seam px-5 py-6 transition-colors hover:bg-shell sm:border-x sm:border-b-0 md:px-8"
          >
            <WhatsAppIcon className="h-6 w-6 shrink-0 text-whatsapp" />
            <span className="flex flex-col">
              <span className="text-sm text-faint">WhatsApp</span>
              <span className="font-semibold text-bright transition-colors group-hover:text-brand-bright">
                Message us
              </span>
            </span>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="group flex items-center gap-4 px-5 py-6 transition-colors hover:bg-shell md:px-8"
          >
            <MailIcon className="h-6 w-6 shrink-0 text-brand-bright" />
            <span className="flex min-w-0 flex-col">
              <span className="text-sm text-faint">Email</span>
              <span className="truncate font-semibold text-bright transition-colors group-hover:text-brand-bright">
                {contact.email}
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Form + details */}
      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <EnquiryForm />

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl md:text-5xl">Where we are</h2>

              <dl className="flex flex-col border-t border-seam">
                <div className="flex gap-4 border-b border-seam py-4">
                  <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
                  <div className="flex flex-col gap-1">
                    <dt className="text-sm text-faint">Address</dt>
                    <dd className="text-base leading-relaxed text-bright">
                      {addressLine}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-seam py-4">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
                  <div className="flex flex-col gap-1">
                    <dt className="text-sm text-faint">Hours</dt>
                    <dd className="figures text-base text-bright">
                      {hours.display}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-seam py-4">
                  <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-bright" />
                  <div className="flex min-w-0 flex-col gap-1">
                    <dt className="text-sm text-faint">GSTIN</dt>
                    <dd className="figures text-base break-all text-bright">
                      {siteConfig.gstin}
                    </dd>
                  </div>
                </div>
              </dl>

              <div>
                <Button href={directionsLink} variant="outline" external>
                  Get directions
                  <ArrowIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Map. loading="lazy" keeps it off the critical path — it is well
                below the fold and the iframe is heavy on a 4G connection. */}
            <div className="aspect-[4/3] w-full border border-seam bg-shell">
              <iframe
                src={mapEmbed}
                title={`Map showing ${siteConfig.name} in ${address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
                style={{ border: 0 }}
              />
            </div>

            <div className="flex flex-col gap-3 border-l-2 border-brand bg-shell px-5 py-4">
              <h3 className="text-sm font-semibold text-bright">
                Delivery area
              </h3>
              <p className="text-base leading-relaxed text-dim">
                {siteConfig.serviceAreas.slice(0, -1).join(", ")} — and the wider
                Delhi NCR industrial belt. Outside this area, ask us and we will
                tell you honestly whether we can service you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
