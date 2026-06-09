# Website QA Report — eltonchang1.github.io

**Date:** June 8, 2026
**Scope:** Full QA of the live portfolio at https://eltonchang1.github.io/, reconciling the
updated résumé and images, and ensuring projects across the repo are clearly showcased.

---

## 0. Most important thing to know about this site

The live site is **not** the static HTML at the repo root. It is the **Vite + React app in
`react-app/`**, deployed by GitHub Actions (`.github/workflows/deploy-github-pages.yml`), which
builds `react-app/` and publishes `react-app/dist`.

**Consequences:**

- To change the live site, edit files under **`react-app/`** (then push to `main` — Actions rebuilds and deploys).
- The root-level files (`index.html`, `projects.html`, `userguide.html`, `resume.html`,
  `Elton_Chang_Resume.pdf`, root `images/`, etc.) are **legacy and not served** by Pages.
- Assets the React app links to (PDF, screenshots, user guides) must live in **`react-app/public/`**,
  not just at the repo root. This was the root cause of several issues below.

---

## 1. Issues found & fixes applied

### 1.1 Updated résumé PDF was not reaching the live site  — FIXED
- **Found:** You added a new `Resume.pdf` at the repo root (Jun 8), but the site serves
  `react-app/public/Elton_Chang_Resume.pdf`, which was the **old April version**. The "Download PDF"
  / "View résumé" buttons would have downloaded stale content.
- **Fix:** Copied the new `Resume.pdf` → `react-app/public/Elton_Chang_Resume.pdf` (also refreshed the
  legacy root `Elton_Chang_Resume.pdf` for old links).

### 1.2 On-page résumé content was out of sync with the new PDF — FIXED
The in-app `/resume` page is rendered from `react-app/src/data/resume-content.ts`. The new PDF changed
several things that the page still showed the old way:

| Field | Was (site) | Now (matches new PDF) |
|---|---|---|
| CMU GPA | `4.0/4.0` | `3.97/4.0` |
| CMU coursework | included "Algorithm Design & Analysis" | replaced with "Computational Linear Algebra" |
| Featured projects | Next Best Action, Torflix, **MarketPulse, Zoe** | Next Best Action, Torflix, **Quantifying Meritocracy, Ashe System** |
| Skills (Languages & data) | Python, C/C++/Go/Java, SQL & Spark, R | Python, **TypeScript**, C/C++/Go/Java, SQL |
| Skills (Web) | React, Vue | React, **Next.js**, Vue |
| Skills (Engineering) | Full-stack, Large-scale computing, ML, System design | Full-stack, **RESTful API design, Database architecture**, System design |

> Note: Machine Learning / Large-scale computing are still surfaced on the résumé page under
> **Interests** and **Technical Areas**, so the profile still reflects that work.

### 1.3 Ashe System (AOG Shield) was missing from the site — FIXED (new project added)
- **Found:** Your newest and most significant project — **Ashe System / AOG Shield**
  (live at https://ashesystem.com/) — was on the new résumé as a key project and you'd added
  `images/Ashesystem_homepage.png`, but it was not on the website at all.
- **Fix:**
  - Copied `images/Ashesystem_homepage.png` → `react-app/public/images/Ashesystem_homepage.png`.
  - Added a full project entry in `react-app/src/data/projects.ts` (card + expandable detail panel,
    tech stack, feature list, tech details, screenshot, and a "Go to Website" link to
    https://ashesystem.com).
  - Registered the new `ashe` id and a `shield` stat icon in `react-app/src/pages/projects-page.tsx`.
  - **Placed Ashe first** in Featured Projects (home + `/projects`) so the active startup leads.
    *(Judgment call — easy to reorder in `PROJECTS` if you'd rather it sit lower.)*
  - Added the matching `shield` icon to the résumé page (`resume-page.tsx`).

### 1.4 Skills cloud on the home page — UPDATED
- Added **TypeScript** and **Next.js** to the About skills badges (`SKILLS` in `projects.ts`) so the
  home page matches the stack reflected in the new résumé and projects.

---

## 2. Verified working (no change needed)

- **Build:** `npm run build` in `react-app/` completes cleanly (TypeScript + Vite). No type/lint errors.
- **Routes:** `/`, `/projects`, `/resume` all render; SPA 404 fallback is configured in the workflow.
- **All project screenshots** referenced in `projects.ts` exist in `react-app/public/images/` — no broken `<img>` tags.
- **Static assets** serve over the preview server (HTTP 200): résumé PDF, Ashe image, Torflix user guide.
- **External links all return HTTP 200:**
  - https://ashesystem.com/
  - https://marketpulse-ai-rho.vercel.app
  - GitHub repos: PyTorrent (Torflix), MarketPulse-AI, Zoe, Quantifying-Meritocracy-TvL-Solidarity, Pokemon-Finder-App
  - User guides / PRD markdown links (PyTorrent USER_GUIDE, MarketPulse USERGUIDE, Zoe PRD)
- **Legacy in-app HTML** (`torflix-userguide.html`, `userguide.html`, `jobsearch-userguide.html`,
  `resume.html`) are present in `react-app/public/` and reachable.

---

## 3. Projects: repo vs. showcased

Projects now featured on the site (7): **Ashe System, Torflix, MarketPulse AI, Zoe,
Quantifying Meritocracy, Job Search Tool, PokeFind.**

Repo folders that are **not** featured (intentional — utilities, experiments, or duplicates):

- `LeetCode-Solutions`, `LeetCode-Tracker` — practice/tracking, not portfolio pieces.
- `Enterprise-AI-Assistant`, `Enterprise-AI-Suite`, `Notebook2.0`, `AeroGuard`, `public-apis` —
  appear to be earlier/experimental or third-party; **no live demo or polished assets found**.
- `Zoef` — looks like a duplicate/variant of `Zoe` (Zoe is featured).
- `Github_Job` — this is the **Job Search Tool** (already featured).

> **Recommendation / your call:** If any of AeroGuard, Enterprise-AI-Assistant/Suite, or
> Notebook2.0 are portfolio-worthy, tell me and I'll add them the same way as Ashe (they currently
> lack screenshots and a one-line "what it does for you" description, which the site format needs).

---

## 4. Remaining recommendations (not blocking)

1. **Large images.** Several screenshots are very heavy and slow first paint:
   - `pokemon-radar-main.png` (~6 MB), `location-search-modal.png` (~5.8 MB), the Torflix
     screenshots (~3–4.7 MB each), and the new `Ashesystem_homepage.png` (~1.8 MB).
   - Suggest down-sizing/compressing to web sizes (e.g. ≤ ~400 KB, WebP). Images are already
     `loading="lazy"`, which helps, but the home hero/cards still pull full-size files.
2. **JS bundle > 500 KB** (gzip ~270 KB). Mostly fine for a portfolio; if you want, code-split
   `three`/`framer-motion` heavy bits via dynamic `import()`.
3. **Legacy root files are stale** (`index.html`, `projects.html` don't include Ashe/Torflix and
   point at the old résumé). They aren't served by Pages, so this is cosmetic — but consider
   deleting them to avoid confusion, or keep only the React app.
4. **Ashe GitHub link** intentionally omitted from the card (repo `ashesystem.com` appears to be a
   private/commercial repo). Add a link if you want it public.
5. **Untracked files** in the repo: `Resume.pdf`, `Resume.1.jpeg`, `images/Ashesystem_homepage.png`.
   These are copied into `react-app/` where needed; commit or remove the root copies as you prefer.

---

## 5. Files changed in this pass

- `react-app/public/Elton_Chang_Resume.pdf` — replaced with new résumé.
- `react-app/public/images/Ashesystem_homepage.png` — added.
- `react-app/src/data/projects.ts` — added Ashe project; `ashe` id + `shield` icon; TypeScript/Next.js in skills.
- `react-app/src/pages/projects-page.tsx` — registered `ashe` + `shield` icon.
- `react-app/src/data/resume-content.ts` — GPA, coursework, featured projects, skills reconciled.
- `react-app/src/pages/resume-page.tsx` — added `shield` icon mapping.
- `Elton_Chang_Resume.pdf` (root, legacy) — refreshed.

## 6. How to deploy

```bash
cd react-app
npm ci          # if dependencies changed
npm run build   # sanity check locally
# then commit & push react-app/ changes to main — GitHub Actions deploys to Pages
```

The workflow rebuilds and publishes automatically on push to `main`.
