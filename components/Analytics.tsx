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
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
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
