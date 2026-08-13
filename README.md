# Shree Vinayak Gases — website

Static marketing site for an industrial and medical gas supplier in Sahibabad,
Ghaziabad. Built to rank locally and turn searches into WhatsApp enquiries.

**Next.js 16 · React 19 · TypeScript · Tailwind v4 · static export**

See [`PLAN.md`](./PLAN.md) for the full plan, phase breakdown and open items.

---
## Running it

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

```bash
npm run build     # static export → out/
npm run lint
```

The build writes plain HTML/CSS/JS to `out/`. There is no server, and hosting
it costs nothing beyond the domain.

---

## Where things live

| Path | What it's for |
|---|---|
| `site.config.ts` | **Every business constant** — phone, address, GSTIN, hours. Env-driven. |
| `.env.example` | Documents each variable. Copy to `.env.local`. |
| `data/products.ts` | The gas catalogue. Add a gas here and it appears everywhere. |
| `data/industries.ts` | Industries served, cross-linked to products by slug. |
| `components/Logo.tsx` | The mark, as hand-authored SVG. |
| `lib/faqs.ts` | Builds each product's FAQ **from existing data** — never invents facts. |
| `lib/related.ts` | Product ↔ industry cross-linking. |
| `scripts/apps-script/` | Google Apps Script that receives enquiries → Sheet. |
| `design/logo-concepts.html` | The four logo concepts. Concept 02 was chosen. |

### Routes (17)

`/` · `/products/` · `/products/[slug]/` ×12 · `/industries/` · `/about/` ·
`/contact/`

`/products/` is a **shallow catalogue** on purpose — it lists and routes, and
the depth lives on the individual gas pages. Do not move product descriptions
back onto the index; it would put it in competition with the 12 pages it exists
to feed.

### The two rules worth knowing

**1. Business facts go in `site.config.ts`, never in a component.** Phone
number, address and GSTIN are read from env there and used everywhere. Changing
the phone number should be a one-line edit to `.env.local`.

**2. Content goes in `data/`, never in a page.** The Products page, the home
page grid, the footer and the JSON-LD catalogue all read from
`data/products.ts`. Adding a gas is one object.

---

## ⚠️ Before this goes live

- [ ] **Verify every `specs` value in `data/products.ts`.** Purity grades and
      cylinder sizes are typical trade values used as scaffolding — they are
      *not* confirmed against what Shree Vinayak Gases actually fills.
      Publishing a purity you cannot supply is a commercial and safety problem.
- [ ] Fill in `NEXT_PUBLIC_PHONE` and `NEXT_PUBLIC_GSTIN` in `.env.local`
- [ ] Set up the enquiry endpoint — [`scripts/apps-script/README.md`](./scripts/apps-script/README.md)
- [ ] Buy a domain and set `NEXT_PUBLIC_SITE_URL` (note: `shreevinayakgases.com`
      is taken by an unrelated firm in Gujarat — see `PLAN.md` §7)
- [ ] Confirm the "since 1990 / est. 2017" framing reads correctly to you

---

## Deploying

The `out/` directory is a static site — any host will serve it. Cloudflare
Pages is the recommended free option:

1. Push this repo to GitHub
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
3. Build command `npm run build`, output directory `out`
4. Add the `NEXT_PUBLIC_*` variables under **Settings → Environment variables**
   — they are read at build time, so the site must be rebuilt after any change
5. Point the domain at it under **Custom domains**

---

## Known issues

`npm audit` reports 3 high-severity advisories in `sharp` and `postcss`. Both
are build-time dependencies that never execute in the shipped static output, and
`npm audit fix` resolves them only by downgrading Next.js to 9.3.3. Left as-is
deliberately; they'll clear when Next updates its transitive deps.

---

## Photographs

Every page has image slots. Until a real file exists, each renders a designed
placeholder naming the shot it wants — so an empty slot is obviously empty
rather than looking like a design decision.

To fill one:

1. Drop the file in `public/images/`
2. Pass `src="/images/your-file.jpg"` to the `ImageSlot` on that page

Real photographs of the premises, racked cylinders, the delivery vehicle and the
team will outperform stock badly here. A buyer in Sahibabad recognising the
actual godown is worth more than any stock image of a generic plant.

## The cylinder illustration

`components/Cylinder.tsx` draws a gas cylinder in **neutral steel, always**. It
is never filled with a product's identity colour — those colours are decorative
wayfinding, not IS 4379 cylinder colour codes, and painting a drawn cylinder
with one would teach a buyer to identify cylinders by colour. The identity
colour appears only on the label plate, which reads as a printed label.
