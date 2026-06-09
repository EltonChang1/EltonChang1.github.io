// One-off image optimizer: resizes oversized screenshots and recompresses PNGs
// in place (same filenames) so no source references need to change.
//
//   node scripts/optimize-images.mjs
//
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve("public/images");
const MAX_WIDTH = 1600; // plenty for full-width hero/screenshot display

const files = (await readdir(IMAGES_DIR)).filter((f) =>
  /\.png$/i.test(f),
);

let before = 0;
let after = 0;

for (const file of files) {
  const full = path.join(IMAGES_DIR, file);
  const orig = (await stat(full)).size;
  before += orig;

  const img = sharp(full, { limitInputPixels: false });
  const meta = await img.metadata();

  const pipeline = sharp(full, { limitInputPixels: false });
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  pipeline.png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 });

  const tmp = full + ".tmp";
  await pipeline.toFile(tmp);

  const next = (await stat(tmp)).size;
  // Keep the smaller of the two.
  if (next < orig) {
    await rename(tmp, full);
    after += next;
    console.log(
      `${file}: ${(orig / 1e6).toFixed(2)}MB -> ${(next / 1e6).toFixed(2)}MB`,
    );
  } else {
    await unlink(tmp);
    after += orig;
    console.log(`${file}: kept original (${(orig / 1e6).toFixed(2)}MB)`);
  }
}

console.log(
  `\nTotal: ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB ` +
    `(${(100 * (1 - after / before)).toFixed(0)}% smaller)`,
);
