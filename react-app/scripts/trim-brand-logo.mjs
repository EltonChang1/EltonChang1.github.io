/**
 * Writes a tight-cropped, web-optimized PNG from the full logo.
 * Source: brand-assets/elegant-elton-chang-logo.png  (not deployed)
 * Output: public/images/elegant-elton-chang-logo-tight.png  (referenced by the site)
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "brand-assets/elegant-elton-chang-logo.png");
const dest = path.join(root, "public/images/elegant-elton-chang-logo-tight.png");

await sharp(source)
  .trim({ threshold: 32 })
  .png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 })
  .toFile(dest);

const before = await sharp(source).metadata();
const after = await sharp(dest).metadata();
console.log(
  `Brand logo trim: ${before.width}×${before.height} → ${after.width}×${after.height} → ${path.relative(root, dest)}`,
);
