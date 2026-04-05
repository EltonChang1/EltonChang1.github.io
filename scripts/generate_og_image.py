#!/usr/bin/env python3
"""Create og-image.png (1200×630) for Open Graph / Twitter cards. Requires Pillow.
   Run from repo root: python3 scripts/generate_og_image.py
"""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "og-image.png"
W, H = 1200, 630


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    paths: list[str] = []
    if bold:
        paths += [
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/System/Library/Fonts/Helvetica.ttc",
        ]
    paths += [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Helvetica.ttf",
        "/Library/Fonts/Arial.ttf",
    ]
    for p in paths:
        if os.path.isfile(p):
            try:
                return ImageFont.truetype(p, size, encoding="unic")
            except OSError:
                try:
                    return ImageFont.truetype(p, size, index=0)
                except OSError:
                    continue
    return ImageFont.load_default()


def main() -> None:
    img = Image.new("RGB", (W, H), "#0a0a0a")
    d = ImageDraw.Draw(img)
    font_title = load_font(80, bold=True)
    font_sub = load_font(32)
    font_url = load_font(24)

    x0, y0 = 88, 200
    d.rectangle([20, 20, W - 21, H - 21], outline="#262626", width=1)

    title = "Elton Chang"
    sub = "Software engineering \u00b7 Data science \u00b7 Machine learning"
    url = "eltonchang1.github.io"

    d.text((x0, y0), title, fill="#fafafa", font=font_title)
    bbox = d.textbbox((x0, y0), title, font=font_title)
    y1 = bbox[3] + 24
    d.text((x0, y1), sub, fill="#a3a3a3", font=font_sub)
    bbox2 = d.textbbox((x0, y1), sub, font=font_sub)
    y2 = bbox2[3] + 32
    d.line([(x0, y2), (x0 + 440, y2)], fill="#404040", width=2)
    y3 = y2 + 28
    d.text((x0, y3), url, fill="#737373", font=font_url)

    img.save(OUT, "PNG", optimize=True)
    print("Wrote", OUT, f"({W}x{H})")


if __name__ == "__main__":
    main()
