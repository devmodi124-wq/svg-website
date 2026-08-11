import { PhoneIcon, WhatsAppIcon } from "./Icons";
import { siteConfig } from "@/site.config";
import { whatsappLink, DEFAULT_ENQUIRY } from "@/lib/links";

/**
 * Two persistent contact affordances, split by viewport.
 *
 * On mobile — where most of this traffic lands — a fixed bottom bar puts Call
 * and WhatsApp within thumb reach on every page. On desktop that bar would be
 * intrusive, so it becomes a single floating WhatsApp button.
 */
export function StickyCta() {
  const wa = whatsappLink(DEFAULT_ENQUIRY);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-seam lg:hidden">
        <a
          href={siteConfig.contact.phoneHref}
          className="flex items-center justify-center gap-2 bg-brand py-3.5 text-sm font-bold text-brand-ink"
        >
          <PhoneIcon className="h-5 w-5" />
          Call now
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-whatsapp py-3.5 text-sm font-bold text-whatsapp-ink"
        >
          <WhatsAppIcon className="h-5 w-5" />
          WhatsApp
        </a>
      </div>

      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed right-7 bottom-7 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-ink shadow-lg shadow-black/40 transition-transform duration-150 hover:scale-105 lg:flex"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
}
