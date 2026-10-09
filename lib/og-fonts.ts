import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Fonts for the build-time social preview images (opengraph-image.tsx files).
 * Satori, which renders them, needs the raw font bytes — it cannot use the
 * woff2 files next/font ships to the browser.
 */
export async function loadOgFonts() {
  const fontDir = join(process.cwd(), "app/assets/fonts");
  const [tinosRegular, tinosBold, plexRegular, plexSemibold] =
    await Promise.all([
      readFile(join(fontDir, "Tinos-Regular.ttf")),
      readFile(join(fontDir, "Tinos-Bold.ttf")),
      readFile(join(fontDir, "IBMPlexSans-Regular.ttf")),
      readFile(join(fontDir, "IBMPlexSans-SemiBold.ttf")),
    ]);

  return [
    { name: "Tinos", data: tinosRegular, weight: 400, style: "normal" },
    { name: "Tinos", data: tinosBold, weight: 700, style: "normal" },
    { name: "IBM Plex Sans", data: plexRegular, weight: 400, style: "normal" },
    {
      name: "IBM Plex Sans",
      data: plexSemibold,
      weight: 600,
      style: "normal",
    },
  ] as const;
}
