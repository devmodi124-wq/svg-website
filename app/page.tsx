import Link from "next/link";

import { Section, SectionHead } from "@/components/Section";
import { Button } from "@/components/Button";
import { Register } from "@/components/Register";
import { ImageSlot } from "@/components/ImageSlot";
import {
  ArrowIcon,
  PhoneIcon,
  WhatsAppIcon,
  industryIcons,
} from "@/components/Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink, DEFAULT_ENQUIRY } from "@/lib/links";
import { products } from "@/data/products";
import { industries } from "@/data/industries";

export default function HomePage() {
  return (
    <>
      <Hero />
      <GasRegister />
      <WhyUs />
      <Industries />
      <ClosingCta />
    </>
  );
}

/* ── Hero ──────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-seam">
      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-16 md:px-8 md:pt-20 md:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div className="flex flex-col gap-8">
          <p className="caption">
            Sahibabad, Ghaziabad · Supplying Delhi NCR
          </p>

          {/* Sized to stay readable rather than to fill the viewport — a serif
              at display size needs more air than a condensed face does. */}
          <h1 className="max-w-4xl text-5xl leading-[1.02] sm:text-7xl lg:text-8xl">
            Every gas.
            <br />
            <span className="text-brand">One number.</span>
          </h1>

          <p className="measure text-xl leading-relaxed text-plain">
            Oxygen, nitrogen, argon, CO₂, acetylene and specialty gases —
            supplied to factories, hospitals, laboratories and fabrication units
            across Ghaziabad and Delhi NCR.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={whatsappLink(DEFAULT_ENQUIRY)}
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

          <p className="figures text-sm text-faint">
            {`${siteConfig.name} · Est. ${siteConfig.firmFounded} · ${siteConfig.businessType}, GST registered`}
          </p>
        </div>

          <ImageSlot
            src="/images/hero.webp"
            wants="Racked industrial gas cylinders in a supplier's yard — daylight, shot slightly low, Indian industrial setting"
            alt="Industrial gas cylinders racked and chained, ready for delivery"
            aspect="4/3"
            priority
          />
        </div>
      </div>

      {/* Stat bar. Figures set in the display serif, tabular so the row aligns. */}
      <div className="border-t border-seam bg-shell">
        <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 md:grid-cols-4 md:px-8">
          {[
            { value: "Full range", label: "Industrial & medical" },
            { value: "Same day", label: "Quote turnaround" },
            { value: "NCR", label: "Delivery coverage" },
            { value: "Mon–Sat", label: "Refills & exchange" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-1 py-6 md:py-7 ${
                index > 0 ? "md:border-l md:border-seam md:pl-7" : ""
              }`}
            >
              <span className="font-display figures text-4xl leading-none font-bold text-bright md:text-5xl">
                {stat.value}
              </span>
              <span className="text-sm text-dim">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Register ──────────────────────────────────────────────────────────── */

function GasRegister() {
  return (
    <Section>
      <SectionHead
        eyebrow="What we supply"
        title="Every gas your line runs on"
        intro="Cylinder supply, refill and exchange across the full industrial and medical range. If you are running several suppliers for different gases today, this is the list that consolidates them."
      />

      <div className="mt-14">
        <Register items={products} />
      </div>

      <div className="mt-10">
        <Button href="/products/" variant="outline">
          Open the full register
          <ArrowIcon className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}

/* ── Why us ────────────────────────────────────────────────────────────── */

const REASONS = [
  {
    title: "Scheduled refills, not scrambles",
    body: "We track your consumption and turn up before you run out. A production line should not stop because a cylinder did.",
  },
  {
    title: "Delivered across NCR",
    body: "Ghaziabad, Sahibabad, Noida, Greater Noida, Delhi, Faridabad and Gurugram. We only claim the area we actually service.",
  },
  {
    title: "Correct grade, correct cylinder",
    body: "Medical gases are filled and handled separately from industrial. Purity is matched to the application, not to what happens to be in stock.",
  },
  {
    title: "Gas only, and we say so",
    body: "We supply gas — cylinder, refill and exchange. We do not sell cylinders or hardware, and we would rather tell you that up front than waste your time.",
  },
];

function WhyUs() {
  return (
    <Section className="border-t border-seam bg-shell">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <SectionHead
          eyebrow="Why buyers stay"
          title="Supply reliability is the whole product"
          intro="Gas is a commodity — every supplier sells the same molecules. What you are actually buying is whether the next cylinder arrives before the last one runs dry."
        />

        {/* Numbered list rather than cards: these are four claims to read, not
            four objects to compare. */}
        <ol className="flex flex-col">
          {REASONS.map((reason, index) => (
            <li
              key={reason.title}
              className="flex gap-6 border-t border-seam py-7 last:border-b"
            >
              <span className="index-num shrink-0 pt-1 text-xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-2xl">{reason.title}</h3>
                <p className="text-base leading-relaxed text-dim">
                  {reason.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* ── Industries ────────────────────────────────────────────────────────── */

function Industries() {
  return (
    <Section id="industries" className="border-t border-seam">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <SectionHead
          eyebrow="Who we supply"
          title="From a two-bay shop to a hospital pipeline"
          intro="Cylinders go out to fabrication units, hospitals, laboratories, food plants and construction sites across the NCR industrial belt."
        />
        {/* Reclassified from `own` to illustrative: the supplied image is a
            generated one, not this business's vehicle. The alt text therefore
            makes no ownership claim — it describes a delivery truck, not ours. */}
        <ImageSlot
          src="/images/delivery.webp"
          wants="Your own delivery vehicle loaded with cylinders, or the godown with stock racked"
          alt="Gas cylinders loaded on a delivery truck"
          aspect="3/2"
        />
      </div>

      <ul className="mt-14 flex flex-wrap gap-3">
        {industries.map((industry) => {
          const Icon = industryIcons[industry.icon];
          return (
            <li key={industry.slug}>
              <Link
                href={`/industries/#${industry.slug}`}
                className="flex items-center gap-3 border border-seam px-5 py-3.5 transition-colors hover:border-brand hover:text-brand-bright"
              >
                {Icon && <Icon className="h-5 w-5 shrink-0" />}
                <span className="font-medium text-plain">{industry.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <Button href="/industries/" variant="outline">
          How we work with each sector
          <ArrowIcon className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}

/* ── Closing CTA ───────────────────────────────────────────────────────── */

function ClosingCta() {
  return (
    <Section className="border-t border-seam bg-shell">
      <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-5">
          <h2 className="max-w-2xl text-4xl md:text-6xl">
            Tell us what you need. We quote today.
          </h2>
          <p className="measure text-lg text-dim">
            Send the gas, the cylinder size and roughly how often you need it.
            That is enough for a price.
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
            Send an enquiry
            <ArrowIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
