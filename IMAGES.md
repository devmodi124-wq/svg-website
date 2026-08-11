# Images

**Status:** all photo slots filled.

The About page no longer has a photo slot — it carries an abstract diagram of
the range instead (`components/RangeDiagram.tsx`), so no photograph of the
premises is needed. If you ever want a real one there, put it back as an
`ImageSlot` with `kind="own"`.

Source files live in `/images` (large, uncompressed, not served). Web-ready
versions live in `/public/images` and are generated from them.

## Adding or replacing an image

1. Drop the new file into `/images` using the **same filename** as the one it
   replaces
2. Run `node scripts/optimise-images.mjs`
3. Rebuild

That script crops each image to the ratio its slot actually renders and sizes it
for retina, then encodes WebP. It turned 69 MB of source PNGs into 1.5 MB —
largest single file 135 KB, which is what makes the site usable on 4G in a
workshop.

To add a **new** slot, add a line to the `JOBS` table in that script and set
the matching `image` field in `data/products.ts` or `data/industries.ts`.

---

Every placeholder on the site tells you which of two kinds it is. Get this
distinction right and everything else is detail.

| Kind | Placeholder says | What is allowed |
|---|---|---|
| **Own** | "Real photograph required — this one depicts the business itself" | **A real photo you took.** Nothing else. |
| **Illustrative** | "Stock or generated image is fine here" | Licensed stock, or AI-generated. |

**Why the line is drawn there.** An "own" slot's alt text says *"Shree Vinayak
Gas premises in Sahibabad"*. If the image behind that text is generated, the
page is making a false statement about your company — to customers, and to
Google, which reads alt text. That is a different thing from a generic photo of
cylinders used decoratively, which is ordinary marketing.

No slot currently claims to depict this business, so nothing on the site is
making an ownership claim it cannot support. If you later add a real photo of
the yard or the vehicle, mark that slot `kind="own"` and write alt text that
says so — that is the point at which the rule above starts to bite.

Shoot both on an overcast day or in the hour after sunrise; harsh midday sun
blows out steel cylinders badly. Landscape, hold the phone level, and take ten
so you can pick. These two will outperform anything generated, because a buyer
in Sahibabad recognising your actual yard is worth more than any stock image.

---

## Which AI tool

| Tool | Use it for | Notes |
|---|---|---|
| **Adobe Firefly** | Anything commercial where you want zero licensing doubt | Trained only on licensed content, and Adobe indemnifies commercial use. Weakest realism of the three, strongest legal position. |
| **Midjourney** (v7) | The hero image and anything that has to look expensive | Best-looking output by some distance. Needs a Discord/web subscription. Commercial use allowed on paid plans. |
| **Flux 1.1 Pro** (via fal.ai or Replicate) | Photoreal industrial scenes, and the most control | Cheapest per image, pay-as-you-go, no subscription. Best at plain photographic realism rather than "cinematic" styling. |

**My recommendation:** Flux 1.1 Pro for the product and industry images —
they need to look like ordinary photographs, not art — and Midjourney for the
hero if you want it to carry the page. If either the licensing question or your
father's comfort with it matters more than the look, use Firefly for everything.

### Getting Indian context

Every generator defaults to a Western industrial setting unless you stop it.
What actually works:

- Say **"India"** *and* a specific cue — "Indian industrial estate", "North
  Indian workshop", "Indian factory floor"
- Name the light: **"overcast daylight"** or "hazy afternoon light" reads far
  more like NCR than the golden-hour look these tools default to
- Ask for **"documentary photograph"** or "editorial photograph, unposed" —
  otherwise you get glossy stock-image staging
- Add **"no text, no logos, no watermarks"** — generators put garbled fake
  lettering on cylinders, which looks obviously wrong on a gas supplier's site

### Things to reject and regenerate

Gas cylinders are a known weak point for these models. Check every image for:

- **Valve assemblies that make no sense** — the single most common failure
- **Wrong cylinder proportions** — too short and fat, or bottle-shaped
- **Fabricated text** on cylinder shoulders or labels
- **Colour-banded cylinders.** Regenerate these. A cylinder painted in an
  obviously meaningful colour band implies a colour code you have not verified,
  which is the one thing this site is careful not to do. Ask for **plain,
  unpainted or uniformly grey cylinders**.
- Six-fingered hands, if people are in shot. Prefer prompts with no people.

---

## Prompts, slot by slot

Paste these as-is. Add `--ar 4:3` (or the ratio noted) if you are using
Midjourney; the other tools have an aspect-ratio field.

### Home → hero *(illustrative, 4:3)*

> Documentary photograph of industrial gas cylinders standing racked in a
> supplier's yard in an Indian industrial estate. Tall steel cylinders, plain
> unpainted grey, secured upright with a chain. Overcast daylight, slightly low
> camera angle, shallow depth of field falling off behind the front row.
> Realistic, unposed, no people, no text, no logos, no watermarks.

### Home → Who we supply *(**OWN PHOTO** — do not generate, 3:2)*

Your delivery vehicle loaded with cylinders, or the godown with stock racked.

### About → What we do *(**OWN PHOTO** — do not generate, 3:2)*

The premises at Sahibabad. Wide enough to show the operation, level horizon.

### Industries *(illustrative, 16:9 each)*

**Factories & Manufacturing**
> Documentary photograph of an Indian manufacturing plant floor, industrial gas
> cylinders standing chained at the end of a production line. Overcast daylight
> through high windows. Realistic, unposed, no people, no text, no logos.

**Engineering & Fabrication**
> Documentary photograph of a North Indian metal fabrication workshop. Steel
> sections on a bench, a gas cutting torch and hose, cylinders upright on a
> trolley in the background. Natural light, working environment, slightly worn.
> Realistic, no people, no text, no logos.

**Hospitals & Healthcare**
> Documentary photograph of a hospital medical gas manifold room in India.
> Cylinders secured in a rack, copper pipework and pressure gauges on a clean
> wall. Even fluorescent light. Clinical, realistic, no people, no text.

**Laboratories & Research**
> Documentary photograph of an Indian analytical laboratory. Gas cylinders
> secured against the wall with regulators and thin tubing running to an
> instrument bench. Even daylight. Realistic, no people, no text, no logos.

**Food & Beverage**
> Documentary photograph of an Indian beverage bottling line, stainless steel
> tanks and pipework, gas cylinders in a rack at the side. Clean production
> environment, even light. Realistic, no people, no text.

**Pharmaceutical & Chemical**
> Documentary photograph of an Indian pharmaceutical plant interior. Stainless
> reactor vessels and pipework, nitrogen cylinders secured in a rack. Clean,
> even light. Realistic, no people, no text, no logos.

**Automotive & Ancillary**
> Documentary photograph of an Indian automotive component workshop. A welding
> bay with a shielding gas cylinder on a trolley, jigs and steel parts. Working
> environment, natural light. Realistic, no people, no text.

**Construction & Infrastructure**
> Documentary photograph of an Indian construction site, structural steelwork,
> an oxygen and acetylene cylinder trolley standing ready. Hazy daylight.
> Realistic, no people, no text, no logos.

**Electronics & Precision**
> Documentary photograph of an Indian electronics assembly area. A reflow line
> and benches, high-purity gas cylinders secured at the wall with regulators.
> Clean, even light. Realistic, no people, no text.

### Product pages *(illustrative, 4:3)*

Each product slot wants **the gas in use**, not a cylinder on white. Pattern:

> Documentary photograph of [APPLICATION] in an Indian workshop. Overcast or
> even artificial light, realistic and unposed. No people, no text, no logos,
> no watermarks.

Substituting, in catalogue order:

| Gas | `[APPLICATION]` |
|---|---|
| Oxygen | oxy-fuel flame cutting a steel plate, sparks falling |
| Medical Oxygen | a hospital bedside oxygen flowmeter and humidifier bottle |
| Nitrogen | a CNC laser cutting stainless sheet, clean bright cut edge |
| Argon | TIG welding a stainless steel joint, close on the torch and arc |
| Carbon Dioxide | MIG welding a mild steel fillet joint, close on the weld pool |
| Acetylene (DA) | an oxy-acetylene cutting torch mid-cut on thick steel plate |
| Helium | a helium leak detector instrument connected to a test rig |
| Hydrogen | a laboratory gas chromatograph with tubing to a cylinder rack |
| Nitrous Oxide | a dental surgery gas delivery unit with flowmeters |
| Ammonia | an industrial cold-storage refrigeration plant room, pipework and gauges |
| Argon-CO₂ Mixture | a production MAG welding station with a jig and torch |
| Dry Ice | dry ice pellets being packed into an insulated shipping box |

---

## Putting an image into the site

1. Save the file into `public/images/` — lowercase, hyphenated, e.g.
   `hero-cylinder-yard.jpg`
2. Compress it first. Aim under **250 KB**; [Squoosh](https://squoosh.app) is
   free and does this in the browser. These load over 4G in a workshop.
3. Add `src` to that slot:

```tsx
<ImageSlot
  src="/images/hero-cylinder-yard.jpg"
  wants="…"
  alt="…"
/>
```

The `alt` text is already written for each slot and is read by Google. If you
change what the image shows, change the alt to match — especially on the two
own-photo slots, where the alt makes a claim about your business.
