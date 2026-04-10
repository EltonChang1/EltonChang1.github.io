/**
 * Builds favicon PNGs with a solid white backing so the logo reads on dark browser tabs.
 * Source: public/images/elegant-elton-chang-logo.png (no query string)
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const input = path.join(root, "public/images/elegant-elton-chang-logo.png");
const outDir = path.join(root, "public");

async function squareFavicon(size, padRatio = 0.1) {
  const pad = Math.max(2, Math.round(size * padRatio));
  const inner = size - 2 * pad;

  const resized = await sharp(input)
    .resize(inner, inner, {
      fit: "contain",
      position: "centre",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();

  const meta = await sharp(resized).metadata();
  const w = meta.width ?? inner;
  const h = meta.height ?? inner;
  const left = Math.max(0, Math.floor((size - w) / 2));
  const top = Math.max(0, Math.floor((size - h) / 2));

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: { r: 255, g: 255, b: 255 },
    },
  })
    .composite([{ input: resized, left, top }])
    .png();
}

await mkdir(outDir, { recursive: true });

// Tab + general (crisp at small sizes)
await (await squareFavicon(64, 0.12)).toFile(path.join(outDir, "favicon.png"));

// Explicit sizes some clients request
await (await squareFavicon(32, 0.1)).toFile(path.join(outDir, "favicon-32.png"));
await (await squareFavicon(192, 0.1)).toFile(path.join(outDir, "favicon-192.png"));
await (await squareFavicon(180, 0.1)).toFile(path.join(outDir, "apple-touch-icon.png"));

console.log("Favicons written: favicon.png, favicon-32.png, favicon-192.png, apple-touch-icon.png");
