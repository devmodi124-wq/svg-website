import Script from "next/script";

/**
 * GA4 (gtag.js), loaded the standard way rather than through
 * @next/third-parties or Tag Manager — one script tag is all this site
 * needs, and the project otherwise avoids dependencies for things this small.
 *
 * Renders nothing when the measurement ID is unset, so a build without it
 * still succeeds — matching how EnquiryForm degrades when its endpoint is
 * missing, rather than shipping a broken script tag.
 *
 * `lazyOnload` rather than `afterInteractive`: gtag.js is ~180 KB and nothing
 * on the site depends on it (no custom events — page views only), so it waits
 * for the page's own load event and an idle moment instead of competing with
 * the hero image and hydration. The cost is a visitor who leaves before the
 * page finishes loading is not counted, which on a site this size is noise.
 *
 * No consent-mode setup: the business serves Ghaziabad and Delhi NCR only,
 * so EEA/UK consent requirements don't apply here.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
