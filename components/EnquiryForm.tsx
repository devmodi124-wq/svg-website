"use client";

import { useState } from "react";

import { Button } from "./Button";
import { WhatsAppIcon, CheckIcon, PhoneIcon } from "./Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink } from "@/lib/links";
import { products } from "@/data/products";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full border border-seam bg-shell px-3.5 py-2.5 text-base text-bright " +
  "placeholder:text-faint transition-colors focus:border-brand focus:outline-none";

const LABEL = "text-sm font-medium text-plain";

/**
 * Enquiry form. Submissions POST to a Google Apps Script web app, which appends
 * a row to the leads spreadsheet — see scripts/apps-script/README.md.
 *
 * The body is sent as text/plain deliberately: it keeps the request "simple" in
 * CORS terms, so the browser skips the preflight OPTIONS that Apps Script does
 * not answer. Apps Script parses the JSON on its side.
 */
export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const endpoint = siteConfig.enquiryEndpoint;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: real users never fill a field they cannot see. Silently accept
    // so the bot believes it succeeded and does not retry.
    if (data.website) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          page: window.location.pathname,
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);

      setStatus("sent");
      form.reset();
    } catch (error) {
      console.error("Enquiry submission failed:", error);
      setStatus("error");
    }
  }

  // Without a configured endpoint the form cannot deliver anything, so we show
  // the channels that do work rather than a control that silently fails.
  if (!endpoint) {
    return (
      <div className="flex flex-col gap-5 border border-seam bg-shell p-7">
        <h3 className="text-3xl">Send us your requirement</h3>
        <p className="text-base leading-relaxed text-dim">
          The enquiry form is not connected yet. In the meantime, WhatsApp is the
          fastest way to reach us — messages are answered the same working day.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink()} variant="whatsapp" external>
            <WhatsAppIcon className="h-5 w-5" />
            Message on WhatsApp
          </Button>
          <Button href={siteConfig.contact.phoneHref} variant="outline" external>
            <PhoneIcon className="h-5 w-5" />
            {siteConfig.contact.phoneDisplay}
          </Button>
        </div>
        <p className="text-sm text-faint">
          Developer note: set NEXT_PUBLIC_ENQUIRY_ENDPOINT in .env.local
        </p>
      </div>
    );
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-5 border border-seam bg-shell p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand">
          <CheckIcon className="h-6 w-6 text-brand-ink" />
        </span>
        <h3 className="text-3xl">Enquiry received</h3>
        <p className="measure text-base leading-relaxed text-dim">
          We will get back to you with a quote on the number you provided,
          usually the same working day. If it is urgent, WhatsApp us and we will
          pick it up straight away.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button href={whatsappLink()} variant="whatsapp" size="sm" external>
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp us
          </Button>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-sm text-dim underline underline-offset-4 hover:text-bright"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 border border-seam bg-shell p-6 md:p-8"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-3xl">Send us your requirement</h3>
        <p className="text-base text-dim">
          Tell us the gas and roughly how much you need — that is enough for us
          to quote.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field
          label="Phone number"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Company"
          name="company"
          optional
          autoComplete="organization"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="gas" className={LABEL}>
            Gas required
          </label>
          <select id="gas" name="gas" required defaultValue="" className={FIELD}>
            <option value="" disabled>
              Select a gas
            </option>
            {products.map((product) => (
              <option key={product.slug} value={product.name}>
                {product.name}
              </option>
            ))}
            <option value="Multiple gases">Multiple gases</option>
            <option value="Other / not listed">Other — not listed</option>
          </select>
        </div>
      </div>

      <Field
        label="Quantity & frequency"
        name="quantity"
        optional
        placeholder="e.g. 4 cylinders of 7 m³, twice a month"
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={LABEL}>
          Anything else <span className="text-faint">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Delivery location, purity grade, timelines…"
          className={FIELD}
        />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="border-l-2 border-brand bg-riser px-4 py-3 text-sm text-plain"
        >
          That did not go through — the connection failed. Please WhatsApp us on{" "}
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-bright underline underline-offset-2"
          >
            {siteConfig.contact.phoneDisplay}
          </a>{" "}
          instead, or call — we will pick it up right away.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center gap-2 bg-brand px-7 py-3.5 font-semibold text-brand-ink transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-faint">Or WhatsApp us — usually faster.</p>
      </div>
    </form>
  );
}

/* ── Field ─────────────────────────────────────────────────────────────── */

function Field({
  label,
  name,
  type = "text",
  required = false,
  optional = false,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className={LABEL}>
        {label} {optional && <span className="text-faint">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className={FIELD}
        {...rest}
      />
    </div>
  );
}
