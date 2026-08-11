# Shree Vinayak Gases — Website Plan

**Status:** Phases 1 and 2 built and verified — 17 pages. Awaiting real
phone/GSTIN, the Apps Script endpoint, and a domain before deploy.
**Last updated:** 2026-08-03

---

## 1. What we're building

A fast, static, SEO-first lead-generation website for **Shree Vinayak Gases**, an
industrial gas supplier operating out of Sahibabad, Ghaziabad, serving Delhi NCR.

The site has exactly one job: **when a factory / hospital / fabrication shop in NCR
searches for a gas supplier, we show up, and they hit WhatsApp or the enquiry form.**

Everything below serves that. Anything that doesn't, we cut.

---

## 2. Decisions made (locked)

| Area | Decision | Why |
|---|---|---|
| Stack | Next.js (App Router) + TypeScript + Tailwind, `output: 'export'` static | Zero-cost hosting, total SEO control, sub-second loads on 4G |
| Hosting | Cloudflare Pages (or Vercel) free tier | ₹0/month. Only recurring cost is the domain |
| Maintenance | Devanshu, in code | Content lives in typed data files — edits are one-liners |
| Lead capture | WhatsApp click-to-chat + click-to-call + enquiry form → Google Sheet | No backend, no server bill, leads land in a spreadsheet lead register |
| Language | English only | B2B procurement in NCR searches in English |
| Visual direction | **"Cylinder Code"** — graphite ground, a per-gas identity colour used as a wayfinding rail, hi-vis lime for actions, condensed display type | Specific to a gas supplier rather than to industrial B2B generally. See §8 |
| Canonical name | **Shree Vinayak Gases** | Chosen; requires directory cleanup (see §7) |
| Phase 1 scope | Lean launch: Home + Products + Contact | Live and taking leads fast; SEO depth follows in Phase 2 |
| Logo | **Concept 02 "Cylinder Rack"** — chosen from four hand-coded SVG marks | Instantly legible as gas supply; scalable, tiny, doubles as favicon / letterhead / WhatsApp DP |
| Typography | Big Shoulders (condensed display) + IBM Plex Sans (body) | Condensed echoes the proportion of a cylinder; Plex has the figures a spec-heavy site needs |

### Rejected
- **WordPress + Elementor** (the original `SVG.md` recommendation) — ₹200–300/mo hosting,
  slower, ongoing plugin/security maintenance, and it can't be built in code.
- **Selling cylinders / hardware** — out of scope. We sell gas only.

---

## 3. Business facts (source of truth)

- **Business:** Shree Vinayak Gases — sole proprietorship, GST registered
- **History:** In the trade since **1990** via the family firm *Shree Balaji Gases*
  (partnership with brothers); split in **2017** and founded Shree Vinayak Gases
- **Location:** Opp. Cell Industrial Area, Sahibabad Town, Sahibabad, Ghaziabad, UP
  (≈ 28.6687, 77.3512)
- **Service area:** Ghaziabad + Delhi NCR only
- **Email:** shreevinayakgases@gmail.com
- **Phone / WhatsApp:** same number — supplied via env var, never hardcoded
- **GSTIN:** supplied via env var
- **Sells:** industrial & medical gases only. No cylinder sales.

> **Positioning note.** "Since 1990" is defensible but needs honest phrasing, because the
> firm itself dates to 2017. Recommended line: **"Serving Delhi NCR since 1990 · Shree
> Vinayak Gases est. 2017"** — keeps the 30+ years of credibility without a claim that
> falls apart under a GST or due-diligence check by a large buyer.

---

## 4. Product catalogue (13 pages in Phase 2)

| # | Product | Primary keyword target |
|---|---|---|
| 1 | Oxygen Gas | oxygen gas supplier ghaziabad |
| 2 | Medical Oxygen | medical oxygen supplier ghaziabad / delhi ncr |
| 3 | Nitrogen Gas | nitrogen gas cylinder supplier delhi ncr |
| 4 | Argon Gas | argon gas supplier ghaziabad |
| 5 | Carbon Dioxide (CO₂) | co2 gas supplier ghaziabad |
| 6 | Acetylene / DA Gas | dissolved acetylene DA gas supplier ghaziabad |
| 7 | Helium Gas | helium gas cylinder supplier delhi ncr |
| 8 | Hydrogen Gas | hydrogen gas supplier ghaziabad |
| 9 | Nitrous Oxide (N₂O) | nitrous oxide gas supplier delhi ncr |
| 10 | Ammonia Gas | ammonia gas supplier ghaziabad |
| 11 | Argon-CO₂ Welding Mixture | welding mixture gas supplier ghaziabad |
| 12 | Dry Ice | dry ice supplier delhi ncr |

> **Note on #6.** Acetylene and "DA gas" are the same product in different phrasing.
> They get **one** page targeting both terms, not two — two near-identical pages would
> cannibalise each other's ranking.

Each product page carries: what it is → typical applications → industries that buy it →
handling/safety note → enquiry CTA. That structure is what makes them rank.

---

## 5. Architecture

```
svg-website/
├─ site.config.ts          # ALL business constants, read from env
├─ .env.example            # documents every required var
├─ data/
│  ├─ products.ts          # typed product catalogue — single source of truth
│  └─ industries.ts
├─ app/
│  ├─ layout.tsx           # header, footer, JSON-LD, sticky mobile CTA bar
│  ├─ page.tsx             # Home
│  ├─ products/page.tsx    # Products index
│  ├─ products/[slug]/     # Phase 2: generated from data/products.ts
│  ├─ industries/page.tsx  # Phase 2
│  ├─ about/page.tsx       # Phase 2
│  ├─ contact/page.tsx
│  ├─ sitemap.ts | robots.ts
├─ components/
│  ├─ Logo.tsx             # hand-coded SVG
│  ├─ EnquiryForm.tsx      # → Google Apps Script → Sheet
│  ├─ WhatsAppButton.tsx   # floating
│  └─ ...
```

**Every business constant is env-driven.** Phone, WhatsApp, GSTIN, email, sheet endpoint.
Nothing sensitive or changeable is baked into a component.

### Enquiry form → Google Sheet
A **Google Apps Script web app** bound to a Sheet in the
`shreevinayakgases@gmail.com` account, exposed as a POST endpoint. Free, no server,
no third-party service holding your leads. The endpoint URL goes in an env var.
Fallback if that's fussy: Web3Forms free tier.

---

## 6. Phases

### Phase 1 — Lean launch *(built)*
1. ✅ Scaffold Next.js + TypeScript + Tailwind, static export
2. ✅ `site.config.ts` + `.env.example` with every business constant
3. ✅ Four logo concepts as SVG → **Concept 02 chosen**
4. ✅ Design system: colours, type scale, components
5. ✅ **Home** — hero, gas range grid, trust bar, industries, CTA
6. ✅ **Products** — full catalogue on one page, all 12 with anchors and spec sheets
7. ✅ **Contact** — form, map embed, click-to-call, address, hours
8. ✅ WhatsApp float + sticky mobile call/WhatsApp bar
9. ✅ Base SEO: metadata, LocalBusiness JSON-LD, sitemap, robots, favicon
10. ⬜ Deploy to Cloudflare Pages — **blocked on your account + a domain**

Build is clean (6 static routes, no lint errors, no console errors). Verified at
desktop and mobile widths.

**Not done in Phase 1, deliberately:** Industries and About are sections/links
on the home page rather than routes. The header nav points at `/#industries`
and switches to `/industries/` in Phase 2.

### Phase 2 — SEO depth *(built)*
1. ✅ 12 individual product pages generated from `data/products.ts`
2. ✅ Industries Served page — 9 anchored sections, each cross-linked to its gases
3. ✅ About page — the 1990 → 2017 story, with a business-details panel for
   purchase departments
4. ✅ Per-page metadata and canonicals, Product + FAQPage + Breadcrumb JSON-LD
5. ✅ Internal linking: related products by shared industry, industry ↔ product
   cross-links, breadcrumbs, footer nav
6. ✅ Sitemap expanded to 17 URLs, generated from the catalogue
7. ⬜ Real photography swapped in for placeholders — **needs photos from you**

**Duplicate-content decision.** `/products/` was rewritten as a shallow
catalogue that lists and routes. The full descriptions, applications and
handling notes now live only on the individual pages. Had both carried the same
copy, the index and the 12 pages would have competed for the same queries.

**FAQ content is derived, not written.** `lib/faqs.ts` composes each answer from
fields already in `data/products.ts` and `site.config.ts`. Nothing is invented —
which also means the unverified-spec caveat below applies to the FAQ answers,
since they quote the same purity and cylinder values.

### Phase 3 — Growth
- Domain + DNS live, HTTPS
- Google Analytics 4 + Search Console verification
- **NAP cleanup** — one canonical name/address/phone across Google Business Profile,
  Justdial, IndiaMART (see §7)
- Google Business Profile optimisation, review generation
- Optional: blog for long-tail keywords

---

## 7. Open items / risks

| Item | Detail |
|---|---|
| **Domain** | `shreevinayakgases.com` is **taken** by Shree Vinayak Speciality Gases (Modasa, Gujarat). Alternatives to check: `shreevinayakgases.in`, `shreevinayakgases.co.in`, `svgases.in`, `vinayakgases.in`. A `.in` is fine — arguably better for local intent. |
| **Name inconsistency** | Three spellings live right now: "Shree Vinayak Gases" (chosen), "Shree Vinayak Gas" (Google Maps), "Shri Vinayak Gas" (Justdial). Local ranking depends on these matching exactly. Phase 3 fix. |
| **No real photos** | Building with placeholders. Real photos of the godown, cylinders and delivery vehicle will outperform stock significantly — worth an hour with a phone camera before Phase 2 ships. |
| **Phone/GSTIN not yet supplied** | Placeholders in `.env` until you fill them. Site builds and runs regardless. |
| **"Since 1990" framing** | See §3. Needs the honest dual phrasing. |

---

## 8. Visual direction — "Cylinder Code"

**Why the first design was replaced.** The original visual system (navy ground,
safety-orange accent `#E4572E`, uppercase letterspaced accent eyebrows, light
alternating bands, hairline grid-of-cards) converged almost exactly on an
unrelated project in the same workspace — an industrial fabrication site using
`#E8531A` with the same eyebrow device, ground treatment and card structure.

The cause was the brief, not the execution: *"industrial and credible"* is a
description that fits any industrial supplier, so it produced the generic
industrial defaults twice. Nothing about it was specific to selling **gas**.

**The replacement is specific to this business.** Each gas carries its own
identity colour, used as a rail down the left of every row and as the band across
its page — the site's navigation *is* the product range.

| | Decision |
|---|---|
| Ground | Graphite `#101315`, single committed dark look — no light variant |
| Product colours | Twelve hues, even spacing, matched lightness and chroma |
| Action colour | Hi-vis lime `#CBEF4B` — outside the product spectrum, so a CTA never reads as a gas |
| Display type | Big Shoulders — condensed industrial face, set very large and uppercase |
| Body type | IBM Plex Sans — good figures, which matters on a site that is mostly specs |
| Primary structure | The **register**: numbered rows with colour rails, not a grid of cards |
| Captions | Sentence case, body face — the uppercase letterspaced eyebrow is deliberately excluded |

### ⚠️ The product colours are decorative

They are **not** IS 4379 cylinder colour codes, and no label, caption or alt text
may present them as such. A buyer who learns "argon is indigo" from this website
and then orders or identifies a cylinder by colour is a hazard we would have
created. The rule is enforced by a comment on the `color` field in
`data/products.ts`; keep it there.

If the real colour codes are ever confirmed with the business, they can be
substituted one gas at a time and the design becomes genuinely informative.

### Avoid-list carried forward

Any future work on this site must not reintroduce: orange in the
`#C2440F`–`#E8531A` range; uppercase letterspaced accent-coloured eyebrows;
light-ground alternating bands; or the hairline grid-of-cards as primary
structure.

---

## 9. Bug worth remembering: env vars in client bundles

`site.config.ts` originally read env through a helper: `process.env[key]`.

Next inlines `NEXT_PUBLIC_*` by **textual substitution** at build time, so a
computed key is never replaced. The result was the nastiest class of bug — the
server-rendered HTML carried the real phone number, and hydration then replaced
it with the placeholder. It looked exactly like a stale dev cache.

Every env read in `site.config.ts` is now a literal
`process.env.NEXT_PUBLIC_X` expression. **Do not refactor them into a loop or a
key-taking helper.** There is a boxed comment in the file saying so.
