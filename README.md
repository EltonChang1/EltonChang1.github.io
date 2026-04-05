Elton Chang — Personal Website

Live site: [https://eltonchang1.github.io](https://eltonchang1.github.io)

This repo hosts the portfolio (home, projects, resume), **writing hub**, standalone user guides, a **build log** (`data/log.json`), and **RSS** (`feed.xml`).

## Docs

- **[PRD.md](./PRD.md)** — product direction and roadmap.
- **[styleguide.md](./styleguide.md)** — visual and interaction rules (monochrome, minimal).

## Scripts (optional, from repo root)

| Script | Purpose |
|--------|---------|
| [`scripts/generate_feed.py`](./scripts/generate_feed.py) | Rebuild `feed.xml` after editing `data/log.json`. |
| [`scripts/generate_og_image.py`](./scripts/generate_og_image.py) | Regenerate **`og-image.png`** (1200×630) with Pillow. Requires macOS/Linux fonts or falls back to default bitmap font. |

```bash
python3 scripts/generate_feed.py
python3 scripts/generate_og_image.py
```

## SEO & sharing

- **`og-image.png`** — default Open Graph / Twitter image (absolute URLs in HTML `<meta>`).
- **`robots.txt`** — allows crawlers; points to sitemap.
- **`sitemap.xml`** — main pages + guides (update `<lastmod>` when you ship meaningful changes).
- **RSS** — [`feed.xml`](./feed.xml); discoverable via `<link rel="alternate" type="application/rss+xml">` on Home and Log.

## Build log (`data/log.json`)

Short updates appear on [log.html](https://eltonchang1.github.io/log.html) and in the “Latest from the log” section on the home page. Each rendered entry has `id="log-entry-YYYY-MM-DD"` for deep links and RSS items.

1. Edit [`data/log.json`](./data/log.json).
2. Add a new object to the `entries` array (order does not matter; entries are sorted by `date` descending).
3. Run `python3 scripts/generate_feed.py` to refresh **`feed.xml`**.
4. Commit and push; GitHub Pages will rebuild.

| Field | Required | Notes |
|--------|----------|--------|
| `date` | Yes | `YYYY-MM-DD` |
| `title` | No | Short headline |
| `tags` | No | Array of strings, e.g. `["build", "ml"]` |
| `body` | Yes | Plain text; use `\n\n` between paragraphs |
| `videoYoutubeId` | No | YouTube video id only (not full URL); embed uses youtube-nocookie |

**Local preview:** `fetch()` needs HTTP—use `python3 -m http.server 8000` in the repo root, then open `http://localhost:8000`.

## Writing hub

- [writing.html](./writing.html) — index of on-site guides, GitHub docs, and the log.

## Project guides

- [PokeFind user guide](./userguide.html)
- [Job search tool user guide](./jobsearch-userguide.html)

Source code for individual apps lives in linked GitHub repositories.
