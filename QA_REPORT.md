# Website QA + UI/UX Report — eltonchang1.github.io

**Date:** June 9, 2026
**Scope:** Full QA / UI-UX pass of the live portfolio at https://eltonchang1.github.io/ —
broken/placeholder images, links and routing, and copy that needs polishing.
**Status:** ✅ **Fixes applied (June 9, 2026).** Every item below has been implemented in
`react-app/`; `npm run build` passes cleanly. Deploy by pushing `main` (GitHub Actions rebuilds). See
§8 for the change log.

---

## 0. How the site is actually built (read this first)

The live site is **not** the static HTML at the repo root. It is the **Vite + React app in
`react-app/`**, deployed by GitHub Actions (`.github/workflows/deploy-github-pages.yml`), which
builds `react-app/` and publishes `react-app/dist`.

- To change the live site, edit files under **`react-app/`** (then push to `main`).
- Root-level `index.html`, `projects.html`, `resume.html`, `images/`, etc. are **legacy and not served**.
- Assets the React app links to must live in **`react-app/public/`**.
- Page copy lives in two data files: `react-app/src/data/projects.ts` and
  `react-app/src/data/resume-content.ts`.

---

## 1. Priority summary

| # | Severity | Issue | Where |
|---|---|---|---|
| 1 | 🔴 **Critical** | `/resume` direct visit is an **infinite redirect loop** (résumé page unreachable on refresh/bookmark/share) | `react-app/public/resume.html` |
| 2 | 🟠 High | **Zoe is a literal placeholder** image ("replace with product screenshots") | `projects.ts` → Zoe |
| 3 | 🟠 High | **Ashe (flagship)** card + only screenshot are the *same* marketing image | `projects.ts` → Ashe |
| 4 | 🟡 Medium | **Job Search Tool** card + only screenshot are the same file; 4 real screenshots sit unused | `projects.ts` → jobsearch |
| 5 | 🟡 Medium | **Very large images** (up to ~6 MB) cause blank/slow paint — can look like "image not showing" | `public/images/` |
| 6 | 🟡 Medium | `object-cover` **crops tall screenshots** awkwardly on cards | `home-page.tsx`, `projects-page.tsx` |
| 7 | 🟡 Medium | Several **confusing / awkward sentences** | `projects.ts` |
| 8 | 🔵 Low | `/projects` (and `/resume` after fix) return **HTTP 404 status** (SPA fallback) | GH Pages |
| 9 | 🔵 Low | No **headshot**; dead component references unused `elton.jpg` | `hero-block-shadcnui.tsx` |
| 10 | 🔵 Low | Unused / orphan images + straight-vs-curly quote inconsistency | repo-wide |

---

## 2. Functional bugs

### 2.1 🔴 `/resume` is an infinite redirect loop (highest priority)
- **What happens:** `react-app/public/resume.html` is a stub containing
  `<meta http-equiv="refresh" content="0; url=/resume" />`. GitHub Pages serves this file at the
  clean URL **`/resume`** (verified: `GET /resume` → HTTP 200, 430 bytes, the stub — **not** the
  React page). The stub then redirects the browser to `/resume`, which serves the stub again →
  **loop**.
- **Who hits it:** anyone who opens https://eltonchang1.github.io/resume directly, refreshes while
  on the résumé page, uses a bookmark, or follows a shared résumé link. (In-app clicks from the nav
  work because React Router handles them client-side without a server round-trip — which is why this
  is easy to miss.)
- **Proposed fix:** delete the legacy `react-app/public/resume.html` (and the root `resume.html`).
  With it gone, `/resume` falls through to the SPA `404.html` fallback and React renders the real
  résumé page — exactly how `/projects` already works. Also drop the now-unused
  `RESUME_LEGACY_HTML_PATH` constant.

### 2.2 🔵 `/projects` returns HTTP 404 (and `/resume` will too after the fix)
- **What happens:** `GET /projects` → HTTP **404** but the body is the SPA shell, so the page renders
  fine in a browser. This is standard GitHub-Pages SPA behavior (`404.html` fallback).
- **Impact:** cosmetic for humans, but link unfurlers / crawlers / some embeds see a 404 status.
- **Options (your call):** accept it (typical for SPA on Pages), or move to hash routing, or
  pre-render per-route HTML. Low priority — note it so the 404 status isn't a surprise.

---

## 3. Images: placeholders, duplicates, and "not showing"

> Good news: **every one of the 30 image paths referenced in `projects.ts` returns HTTP 200** on the
> live site, and the brand logo, favicons, and résumé PDF all return 200. So nothing is truly broken
> by a wrong path. The "not showing / placeholder" perception comes from the items below.

### 3.1 🟠 Zoe — actual placeholder
- Card image and the **only** expanded "screenshot" both point at `/images/zoe-card.svg`, a generated
  gradient that literally renders the text **"Placeholder — replace with app visuals,"** and whose
  caption reads **"Placeholder — replace with product screenshots when available."**
- This is the placeholder you spotted. **Fix:** capture real Zoe mobile screenshots (home/discovery,
  a ranked list, profile, the Shorts lane) and replace both the card image and the screenshot gallery.
  Until real shots exist, at minimum tighten the SVG (it has a double-space typo: "Placeholder  replace").

### 3.2 🟠 Ashe System (your flagship) — single, duplicated marketing image
- `card.image` and the lone `expanded.screenshots[0]` are **the same file**
  (`/images/Ashesystem_homepage.png`). The expanded "Screenshots" section just repeats the card —
  thin for the project you've placed first.
- **Fix:** add real product shots (dashboard, a risk score with evidence, the readiness report PDF,
  a recommendations view). If only the homepage exists for now, relabel and don't repeat it as a
  "screenshot."

### 3.3 🟡 Job Search Tool — duplicate hero + unused real screenshots
- `card.image` and the only screenshot are both `/images/job-search-tool.png` (byte-identical to
  `jobsearch-main.png`).
- Meanwhile **four real screenshots already exist on disk but are never used:**
  `jobsearch-applied.png`, `jobsearch-detail.png`, `jobsearch-filters.png`, `jobsearch-listings.png`.
- **Fix:** build the expanded gallery from those four (filters, listings, detail, applied) instead of
  repeating the card.

### 3.4 🟡 MarketPulse — card image duplicated in the gallery
- `card.image` (`mp-3-market-overview.png`) also appears as the 3rd item in the screenshot gallery.
- **Fix:** minor — either pick a distinct hero or drop the duplicate from the gallery.

### 3.5 🟡 Heavy images → blank/slow paint (likely the "image not showing" you saw)
Several card heroes are multi-megabyte PNGs. On a normal connection they pop in after a beat; on a
slow one the card looks empty first. Worst offenders:

| File | ~Size | Used as |
|---|---|---|
| `pokemon-radar-main.png` | 6.1 MB | PokeFind card hero |
| `location-search-modal.png` | 5.8 MB | PokeFind screenshot |
| `torflix-rows-genres.png` | 4.7 MB | Torflix screenshot |
| `torflix-home.png` | 4.2 MB | Torflix card hero |
| `torflix-rows-recent-top10.png` | 4.2 MB | Torflix screenshot |
| `torflix-rows-picked.png` | 3.7 MB | Torflix screenshot |
| `Ashesystem_homepage.png` | 1.8 MB | Ashe card + screenshot |

- **Fix:** compress/resize to web sizes (target ≤ ~400 KB, WebP). `loading="lazy"` is already set,
  but the above are card heroes pulled at full size. This is the single biggest perceived-speed win.

### 3.6 🟡 `object-cover` crops tall screenshots
- Home and `/projects` cards render images with `object-cover`, which crops tall marketing/portrait
  screenshots (Ashe homepage, some MarketPulse shots) to a thin strip and can cut off the meaningful
  part of the UI.
- **Fix:** add `object-top` for the card heroes, or use landscape-cropped hero variants, or
  `object-contain` on a neutral background so nothing important is sliced off.

---

## 4. Copy: sentences to polish

Concrete before → after suggestions (final wording is your call):

### 4.1 🟡 Torflix tagline (confusing metaphors)
- **Now:** "A movie library on your hardware, aimed at a century of film in the wild, not this
  month's licensed row."
- **Why:** "a century of film in the wild" and "this month's licensed row" are cryptic.
- **Suggest:** "A self-hosted movie library that runs BitTorrent on your own machine — browse a
  catalog, add magnets, and stream titles while they finish downloading."

### 4.2 🟡 MarketPulse card description (awkward ending)
- **Now:** "…Ask AI can answer with your watchlist and portfolio in context when it's on."
- **Suggest:** "…and an optional Ask AI assistant answers questions using your watchlist and
  portfolio for context."

### 4.3 🟡 Zoe overview (vague)
- **Now:** "…so the app stays useful on Monday and expressive on Friday."
- **Suggest:** "…so it's practical for everyday recommendations and expressive enough to show off
  your taste." Also consider easing the jargon ("taste graph," "glass-forward chrome") for a general
  audience.

### 4.4 🟡 Quantifying Meritocracy (slightly negative framing)
- **Now:** "…The repo walks you through charts and experiments—no GUI, but the story reads like a
  research paper you can rerun."
- **Suggest:** "…It reads like a reproducible research paper: every chart and experiment can be
  rerun from the repo."

### 4.5 🔵 About paragraph (home) — tone check
- **Now:** "…full-stack products that have to behave in the wild—where 'works on my machine' is a
  bug, not a punchline."
- This is a deliberate voice line; keep it if you like the personality, just confirm it's the tone
  you want for recruiters.

### 4.6 🔵 Typography consistency
- `projects.ts` and `resume-content.ts` mix straight (`'` `"`) and curly (`'` `"` `"`) marks — e.g.
  "Catania's" (curly) vs "month's" / "you're" (straight). Normalize to curly for a polished look.
- Zoe SVG has a double space where an em dash belongs: "Placeholder  replace with app visuals."

---

## 5. Smaller UX / cleanup items

- **No headshot anywhere.** A profile photo (`public/elton.jpg`, returns 200) is referenced only by
  `react-app/src/components/ui/hero-block-shadcnui.tsx` (`HeroBlock`), which is **never imported** —
  dead code. Either add a headshot to the About section or delete the dead component + unused image.
- **Orphan / unused images** inflate the deploy: `pokemon-popup-tyranitar.png` (3.6 MB, unreferenced)
  and the entire legacy MarketPulse set (`01-…`, `1-…17-`, `10-news-feed.png`, etc.) that predate the
  `mp-*` screenshots actually used. Safe to prune from `react-app/public/images/`.
- **Legacy root files** (`index.html`, `projects.html`, root `resume.html`, root `images/`) are stale
  and not served by Pages. Consider deleting to avoid confusion.

---

## 6. Verified working (no change needed)

- **All 30 referenced project images** → HTTP 200 live; brand logo, favicons, apple-touch-icon,
  `icons.svg` → 200.
- **Routes** `/`, `/torflix-userguide.html`, `/userguide.html`, `/jobsearch-userguide.html`,
  `/Elton_Chang_Resume.pdf` → 200. (`/projects` renders but returns 404 status — see §2.2.)
- **Résumé PDF** is the current version; on-page résumé data reconciled in a prior pass.
- **Deploy** is GitHub Actions (build `react-app/`, publish `dist`, SPA `404.html` fallback present).
- **External links** to ashesystem.com, MarketPulse, and the GitHub repos / user guides are wired up.

---

## 8. Change log — what was actually done

**Critical / routing**
- ✅ Deleted `react-app/public/resume.html` and root `resume.html` → `/resume` now renders the React
  résumé page via the SPA fallback (no more redirect loop). Removed the dead
  `RESUME_LEGACY_HTML_PATH` constant.
- ✅ Deleted stale legacy root files: `index.html`, `projects.html`, `userguide.html`,
  `jobsearch-userguide.html` (not served by Pages; were out of sync with the live app).

**Images**
- ✅ **Zoe placeholder replaced.** Built a polished concept hero (`zoe-card.svg`) plus three concept
  tiles (`zoe-discovery.svg`, `zoe-rankings.svg`, `zoe-social.svg`) for the gallery, all clearly
  labeled "design concept." No more "replace me" text.
- ✅ **Ashe** card image kept as the live homepage; screenshot caption now points to the live product,
  and the **primary CTA is now "Visit the live site — ashesystem.com"** (also surfaced first on the
  home card as "Visit live site").
- ✅ **Job Search** gallery now uses the four real screenshots (filters, listings, detail, applied)
  instead of repeating the card image.
- ✅ **MarketPulse** card hero (`mp-3-market-overview`) removed from the gallery list to de-dupe.
- ✅ **Heavy images optimized in place** via `scripts/optimize-images.mjs` (resize ≤1600px +
  palette PNG): **40.8 MB → 5.6 MB total (~86% smaller)**, every deployed image now < 1 MB
  (e.g. `pokemon-radar-main` 6.1 MB → 0.68 MB, `torflix-home` 4.2 MB → 0.28 MB). Brand-logo trim
  script now emits an optimized PNG too.
- ✅ Pruned orphan images (legacy numbered MarketPulse set, `pokemon-popup-tyranitar.png`).
- ✅ Moved the untrimmed logo source out of `public/` to `react-app/brand-assets/` so it no longer
  ships to production; updated `scripts/trim-brand-logo.mjs` accordingly.

**Layout / copy**
- ✅ Card heroes now use `object-top` so tall screenshots aren't cropped through the middle.
- ✅ Rewrote confusing copy: Torflix tagline + overview, MarketPulse "Ask AI … when it's on,"
  Zoe overview ("Monday/Friday"), and the Meritocracy "no GUI" framing. Normalized straight
  apostrophes to curly.
- ✅ Removed dead component `hero-block-shadcnui.tsx` and its unused `public/elton.jpg`.

**Verification**
- ✅ `npm run build` (tsc + Vite) passes with no type/lint errors; all 30 image references resolve.

> **Still open (your call, non-blocking):** `/projects` and `/resume` return HTTP 404 *status* (normal
> SPA-on-Pages behavior — they render fine); the JS bundle is ~270 KB gzipped (fine for a portfolio);
> and there is still no headshot. None of these block deploy.
