/**
 * Converts the raw images in /images into web-ready WebP in /public/images.
 *
 * Run after adding or replacing a source image:
 *   node scripts/optimise-images.mjs
 *
 * Sources stay untouched. Output is cropped to the aspect ratio each slot
 * actually renders, so the browser never downloads pixels it will letterbox
 * away, and sized for retina at the widest the slot is ever displayed.
 */
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "images");
const OUT = path.join(ROOT, "public/images");

/**
 * width  — the widest this image is ever displayed, times ~1.7 for retina.
 * aspect — cropped to the ratio the slot actually renders, so the browser
 *          never downloads pixels it will letterbox away.
 */
const JOBS = [
  // Site-level
  ["Home Hero.png", "hero.webp", 1400, 4 / 3],
  ["Who we supply.png", "delivery.webp", 1200, 3 / 2],

  // Industries — rendered 16:9
  ["Factories & Manufacturing.png", "industry-manufacturing.webp", 1400, 16 / 9],
  ["Engineering & Fabrication.jpg", "industry-fabrication.webp", 1400, 16 / 9],
  ["Hospitals & Healthcare.png", "industry-healthcare.webp", 1400, 16 / 9],
  ["Laboratories & Research.png", "industry-laboratories.webp", 1400, 16 / 9],
  ["Food & Beverage.png", "industry-food-beverage.webp", 1400, 16 / 9],
  ["Pharmaceutical & Chemical.png", "industry-pharmaceutical.webp", 1400, 16 / 9],
  ["Automotive & Ancillary.png", "industry-automotive.webp", 1400, 16 / 9],
  ["Construction & Infrastructure.png", "industry-construction.webp", 1400, 16 / 9],
  ["Electronics & Precision.png", "industry-electronics.webp", 1400, 16 / 9],

  // Products — rendered 4:3 in the sidebar
  ["oxygen.png", "gas-oxygen-gas.webp", 900, 4 / 3],
  ["medical oxygen.png", "gas-medical-oxygen.webp", 900, 4 / 3],
  ["nitrogen.png", "gas-nitrogen-gas.webp", 900, 4 / 3],
  ["argon.png", "gas-argon-gas.webp", 900, 4 / 3],
  ["carbon dioxide.png", "gas-carbon-dioxide-gas.webp", 900, 4 / 3],
  ["acetylene.png", "gas-acetylene-da-gas.webp", 900, 4 / 3],
  ["helium.png", "gas-helium-gas.webp", 900, 4 / 3],
  ["hydrogen.png", "gas-hydrogen-gas.webp", 900, 4 / 3],
  ["nitrous oxide.png", "gas-nitrous-oxide-gas.webp", 900, 4 / 3],
  ["ammonia.png", "gas-ammonia-gas.webp", 900, 4 / 3],
  ["argon co2 mixture.png", "gas-argon-co2-welding-mixture.webp", 900, 4 / 3],
  ["dry ice.png", "gas-dry-ice.webp", 900, 4 / 3],
];

fs.mkdirSync(OUT, { recursive: true });

(async () => {
  let totalIn = 0;
  let totalOut = 0;
  const rows = [];

  for (const [src, out, width, aspect] of JOBS) {
    const srcPath = path.join(SRC, src);
    if (!fs.existsSync(srcPath)) {
      console.error("MISSING SOURCE:", src);
      continue;
    }

    const inBytes = fs.statSync(srcPath).size;
    const height = Math.round(width / aspect);

    await sharp(srcPath)
      // `cover` + `attention` crops to the ratio, keeping the most visually
      // salient region rather than blindly centring.
      .resize(width, height, { fit: "cover", position: sharp.strategy.attention })
      .webp({ quality: 78, effort: 6 })
      .toFile(path.join(OUT, out));

    const outBytes = fs.statSync(path.join(OUT, out)).size;
    totalIn += inBytes;
    totalOut += outBytes;

    rows.push([
      out,
      `${width}×${height}`,
      `${(inBytes / 1048576).toFixed(1)}M`,
      `${Math.round(outBytes / 1024)}K`,
    ]);
  }

  const w = [38, 10, 7, 6];
  console.log(
    ["file", "size", "before", "after"].map((h, i) => h.padEnd(w[i])).join(" "),
  );
  console.log("-".repeat(64));
  for (const r of rows) {
    console.log(r.map((c, i) => String(c).padEnd(w[i])).join(" "));
  }
  console.log("-".repeat(64));
  console.log(
    `${rows.length} images · ${(totalIn / 1048576).toFixed(0)} MB → ${(totalOut / 1048576).toFixed(1)} MB` +
      `  (${(100 - (totalOut / totalIn) * 100).toFixed(1)}% smaller)`,
  );
  const biggest = Math.max(...rows.map((r) => parseInt(r[3])));
  console.log(`largest single file: ${biggest} KB`);
})();
