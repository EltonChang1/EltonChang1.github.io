/**
 * Writes a tight-cropped PNG from the full logo (less transparent / uniform padding).
 * Source: public/images/elegant-elton-chang-logo.png
 * Output: public/images/elegant-elton-chang-logo-tight.png
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const source = path.join(root, "public/images/elegant-elton-chang-logo.png");
const dest = path.join(root, "public/images/elegant-elton-chang-logo-tight.png");

await sharp(source).trim({ threshold: 32 }).png().toFile(dest);

const before = await sharp(source).metadata();
const after = await sharp(dest).metadata();
console.log(
  `Brand logo trim: ${before.width}×${before.height} → ${after.width}×${after.height} → ${path.relative(root, dest)}`,
);
