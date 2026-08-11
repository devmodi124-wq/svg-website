import type { Metadata } from "next";
import { Tinos, IBM_Plex_Sans } from "next/font/google";

import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { LocalBusinessSchema } from "@/components/Schema";
import { siteConfig } from "@/site.config";

/**
 * Tinos is the logo face — Times-metric, matching the existing Shree Vinayak
 * mark — and it carries the headings too, so the brand voice runs through the
 * page rather than stopping at the wordmark. Set in sentence case, which is
 * markedly easier to read than the condensed caps it replaced.
 *
 * Plex Sans does the reading. Its figures are excellent, which matters on a
 * site that is mostly specifications.
 */
const tinos = Tinos({
  variable: "--font-tinos",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  keywords: [
    "industrial gas supplier ghaziabad",
    "industrial gas supplier delhi ncr",
    "oxygen gas supplier ghaziabad",
    "nitrogen cylinder supplier delhi ncr",
    "argon gas supplier ghaziabad",
    "medical oxygen supplier delhi ncr",
    "acetylene DA gas supplier",
    "gas cylinder supplier sahibabad",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${tinos.variable} ${plex.variable} h-full`}
    >
      {/* Bottom padding clears the fixed mobile CTA bar. */}
      <body className="flex min-h-full flex-col bg-graphite pb-[52px] lg:pb-0">
        <LocalBusinessSchema />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
