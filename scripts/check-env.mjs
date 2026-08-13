/**
 * Fails a production build whose public configuration is missing or still
 * placeholder. Wired to the `prebuild` npm script, so it runs automatically
 * ahead of `next build` — including on Cloudflare, which runs `npm run build`.
 *
 * ── Why this exists ─────────────────────────────────────────────────────────
 *
 * Every value here has a sensible fallback in site.config.ts, which means a
 * build with nothing configured SUCCEEDS and publishes a site advertising
 * "+91 00000 00000" with an enquiry form that posts nowhere. Nothing in the
 * build log would say so. On a lead-generation site that is worse than an
 * outright failure: the deploy looks green while every enquiry is lost.
 *
 * A loud build failure is the cheapest possible way to make that impossible.
 *
 * Runs only for production builds. `next dev` is left alone so a fresh clone
 * can be worked on before anyone has filled in a GSTIN.
 */
// @next/env is CommonJS, so it has no named exports to destructure at import.
import nextEnv from "@next/env";

const { loadEnvConfig } = nextEnv;

// Reuses Next's own loader rather than parsing .env files by hand, so the
// precedence checked here is exactly the precedence the build will see:
// real environment (a Cloudflare dashboard variable) > .env.local >
// .env.production. Anything already in process.env is left untouched.
loadEnvConfig(process.cwd(), false);

/**
 * `placeholder` is the fallback site.config.ts substitutes when the variable is
 * absent. Finding that exact string means someone set the variable to the
 * example value, which fails just as badly as leaving it unset.
 */
const REQUIRED = [
  {
    key: "NEXT_PUBLIC_PHONE",
    placeholder: "+91 00000 00000",
    why: "every tel: link, the header, the footer and all WhatsApp links",
  },
  {
    key: "NEXT_PUBLIC_ENQUIRY_ENDPOINT",
    why: "the contact form silently posts nowhere without it",
  },
  {
    key: "NEXT_PUBLIC_GSTIN",
    placeholder: "GSTIN pending",
    why: "shown in the footer; purchase departments look for it",
  },
  { key: "NEXT_PUBLIC_SITE_URL", why: "canonical URLs, sitemap and OG tags" },
  { key: "NEXT_PUBLIC_EMAIL", why: "the contact page and footer" },
];

const problems = [];

for (const { key, placeholder, why } of REQUIRED) {
  const value = process.env[key]?.trim();

  if (!value) {
    problems.push(`${key} is not set — ${why}`);
  } else if (placeholder && value === placeholder) {
    problems.push(`${key} is still the placeholder ${placeholder} — ${why}`);
  }
}

// A site URL that never got a real domain produces canonicals and a sitemap
// pointing at a dev server, which is the kind of thing Search Console notices
// months later.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (siteUrl && /localhost|127\.0\.0\.1|example\.com/.test(siteUrl)) {
  problems.push(
    `NEXT_PUBLIC_SITE_URL points at ${siteUrl} — canonicals and the sitemap would ship pointing at a dev server`,
  );
}

if (problems.length > 0) {
  console.error(
    [
      "",
      "  Build stopped: the public configuration is incomplete.",
      "",
      ...problems.map((problem) => `    · ${problem}`),
      "",
      "  These are baked into the HTML at build time, so a build without them",
      "  publishes a working-looking site with the wrong contact details.",
      "",
      "  Locally: set them in .env.local.",
      "",
      "  On Cloudflare: Settings → Build → Build variables and secrets.",
      "  NOT Settings → Variables and Secrets — that section is runtime-only",
      "  bindings for a running Worker. This site is a static export with no",
      "  server, so a runtime variable never reaches the build that needs it.",
      "",
      "  A variable added after a build only takes effect on the NEXT build.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

console.log("✓ Public configuration complete");
