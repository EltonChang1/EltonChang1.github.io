# Product Requirements Document (PRD)

## EltonChang1.github.io — Portfolio & Daily Log

| Field | Value |
|--------|--------|
| **Product** | Personal website (GitHub Pages) |
| **Owner** | Elton Chang |
| **Design system** | [`styleguide.md`](./styleguide.md) — minimal black / white / gray, elegant typography, static-first |
| **Repository** | `eltonchang1.github.io` |
| **Live site** | `https://eltonchang1.github.io` |

---

## 1. Executive summary

This PRD defines how to **evolve** the existing personal site so it clearly positions you as a **software engineer**, **data scientist**, and **machine learning engineer**, while staying faithful to the monochrome, minimal aesthetic in `styleguide.md`. It adds a **daily log** surface (working title: **Log** or **Today**) where you can post short, frequent updates—text-first, with an optional path to embed **video** for a true vlog workflow.

**Primary outcome**: A recruiter or technical hiring manager can answer in under two minutes: *who you are*, *what you build*, *how strong your ML/data/engineering story is*, and *whether you are actively learning/shipping*.

---

## 2. Problem statement

### 2.1 Current gaps

The site already has solid project depth (especially MarketPulse and expanded `projects.html`), but:

1. **Positioning is uneven** — Home `<title>` says “Full Stack Developer” while body copy mentions CMU, data analytics, ML, and DS; the three roles are not framed as one coherent story.
2. **No “signal of motion”** — Aside from GitHub, there is no lightweight place to show *what you did today/this week* (learning, experiments, papers read, bugs fixed). That hurts differentiation for ML/DS roles where curiosity and iteration matter.
3. **Discoverability & polish** — Missing or weak SEO/social preview (`meta description`, Open Graph), placeholder LinkedIn on home (`href="#"`), no skip link / `main` landmark per styleguide accessibility notes.
4. **Information scent** — User guides (`userguide.html`, `jobsearch-userguide.html`) are valuable but disconnected from a clear “Documentation” or “Writing” hub; nav does not reflect full site map.
5. **Mobile nav** — Horizontal link row may crowd small screens; styleguide implies a collapsible pattern not fully implemented.

### 2.2 Opportunities

- **Triad positioning**: One headline + three pillars (Engineering / Data / ML) with projects tagged into those lanes.
- **Daily log**: Low-friction updates that prove consistency (even 2–3 sentences count) without maintaining a heavy blog.
- **Trust artifacts**: Links to PDF resume, GitHub, demos, and optional Kaggle/LinkedIn where real.

---

## 3. Goals and non-goals

### 3.1 Goals

| ID | Goal |
|----|------|
| G1 | Unify brand narrative: **Software Engineer · Data Science · ML Engineering** (exact wording TBD with owner). |
| G2 | Improve **first-impression** clarity on home: role, school/background, proof (projects + log), contact. |
| G3 | Add a **Daily Log** (and optional video embeds) updatable **without** a paid backend, aligned with GitHub Pages. |
| G4 | Implement UI per **`styleguide.md`** (monochrome, border-first, calm motion, accessible focus). |
| G5 | Strengthen **project showcase** for DS/ML (metrics, methods, datasets where appropriate—not only stack badges). |
| G6 | Add **SEO + share** basics: title/description per page, OG/Twitter cards, canonical URL. |

### 3.2 Non-goals

- Building a custom CMS with authentication on GitHub Pages alone.
- Real-time comments or user accounts on-site.
- Replacing GitHub as the source of truth for code (site links out).
- Colorful marketing-site aesthetics (explicitly out of scope per styleguide).

---

## 4. Users and scenarios

| Persona | Needs | Success |
|---------|--------|---------|
| **Technical recruiter** | Fast scan: role fit, stack, education, links | Clear hero + resume + GitHub + 3–5 strong projects |
| **Hiring manager (MLE/DS)** | Depth: problem, data, model, metrics, tradeoffs | Project detail sections + optional case-study tone |
| **Engineering hiring manager** | System design hints, full-stack proof, code quality | Repos, live demos, architecture bullets |
| **Peer / collaborator** | Contact, what you’re working on now | Log + contact + GitHub activity |
| **You (author)** | <10 min to post a daily note | Documented workflow (markdown or JSON commit) |

---

## 5. Current site inventory (audit)

| Asset | Path | Notes |
|--------|------|--------|
| Home | `index.html` | Hero, About, 4 featured projects, contact, footer |
| Projects (deep) | `projects.html` | Expandable cards, screenshots, feature lists |
| Resume | `resume.html` + `css/resume.css` + `js/resume.js` | Timeline, skills bars, PDF download |
| PokeFind guide | `userguide.html` | Standalone styled doc |
| Job search guide | `jobsearch-userguide.html` | Standalone styled doc |
| Global styles | `css/style.css` | Shared layout, monochrome tokens |
| Global scripts | `js/script.js` | Scroll, typing, observers, overlays |
| Images | `images/` | Project screenshots (referenced from HTML) |
| Design spec | `styleguide.md` | **Normative** for visual/interaction decisions |
| README | `README.md` | Minimal; can link PRD + styleguide |

**Gaps to close (cross-cutting)**  

- Consistent nav across all pages including new **Log** and any hub pages.  
- `id="main"` + skip link (styleguide).  
- Fix placeholder links (home LinkedIn `#`).  
- Year in footer (dynamic or manual update).  
- Optional: `robots.txt`, `sitemap.xml` for indexing.

---

## 6. Information architecture (target)

```
Home
├── Hero (positioning + CTAs)
├── About (triad + short story)
├── Highlights (optional: 3 pillars or stats)
├── Featured work (cards → projects)
├── Latest from log (teaser: last 3 entries + link)
└── Contact

Projects
├── Overview / filters (optional by tag: SWE | DS | ML)
└── Existing expanded detail pattern

Resume
└── (keep; align copy with home positioning)

Log  [NEW]
├── Index: reverse-chronological entries (paginate or “load more” later)
├── Entry (optional): permalink per day or per post slug
└── Optional: embedded video (YouTube/Vimeo) per entry

Writing / Docs [OPTIONAL HUB]
├── Links to userguide.html, jobsearch-userguide.html, off-site articles
```

**Navigation (primary)**  

`Home` · `Projects` · `Log` · `Resume` · `GitHub` (external) · `Contact` (anchor or section)

---

## 7. Functional requirements

### 7.1 Positioning & content (home + resume alignment)

| ID | Requirement | Priority |
|----|-------------|----------|
| C1 | Replace single “Full Stack” framing with explicit **triad** messaging (one line + short subtext). | P0 |
| C2 | About section: **one tight paragraph** + optional three bullets (Build / Analyze / Model). Remove redundant phrasing. | P0 |
| C3 | Skill tags grouped or ordered to reflect **SWE / DS / ML** (even if visual style stays monochrome chips). | P1 |
| C4 | Resume summary and home hero **do not contradict** (same degree, role labels, timeframe). | P0 |
| C5 | Each featured project: **one outcome metric or learning** when possible (e.g. accuracy delta, scale, latency). | P1 |

### 7.2 Daily Log (“vlog-ready”)

| ID | Requirement | Priority |
|----|-------------|----------|
| L1 | New top-level page **`log.html`** (or Jekyll collection routed to `/log/`) listing entries **newest first**. | P0 |
| L2 | Each entry has at minimum: **ISO date** (YYYY-MM-DD), **title** (optional), **body** (markdown or HTML). | P0 |
| L3 | Authoring workflow documented in README: e.g. “add file under `_posts/`” or “append to `data/log.json`”. | P0 |
| L4 | Optional **video**: embed block (iframe) for YouTube/Vimeo; **no autoplay**; respects `prefers-reduced-motion` where applicable. | P1 |
| L5 | Home section **“Latest log”** shows 2–3 recent entries with link to full log. | P1 |
| L6 | RSS feed **optional** (`feed.xml`) for subscribers. | P2 |

### 7.3 Implementation options for Log (choose one in planning)

| Option | Mechanism | Pros | Cons |
|--------|-----------|------|------|
| **A. Jekyll** (GitHub Pages native) | `_posts/YYYY-MM-DD-slug.md` + layout | Clean permalinks, markdown, scalable | Requires Jekyll conventions; build on push |
| **B. Static JSON** | `data/log.json` + small JS renderer on `log.html` | No Jekyll; simple mental model | Manual JSON escaping; need JS for rendering |
| **C. HTML fragments** | Include snippets or duplicated `<article>` blocks | Zero tooling | Error-prone, does not scale |

**Recommendation**: **Option A** if you want a sustainable daily habit; **Option B** if you want to stay pure HTML repo with minimal tooling.

### 7.4 Design & UX (must follow `styleguide.md`)

| ID | Requirement | Priority |
|----|-------------|----------|
| D1 | All new UI uses existing **CSS tokens** (`:root` in `style.css`); no chromatic accents in chrome. | P0 |
| D2 | Log entries styled as **editorial list**: date in muted gray, title semibold, body comfortable measure (~65ch). | P0 |
| D3 | Video embeds **responsive** (`aspect-ratio` or intrinsic wrapper), border per surface rules. | P1 |
| D4 | **Keyboard** and **focus-visible** for log links and pagination. | P0 |
| D5 | **Mobile**: nav does not overflow; consider hamburger or wrap pattern. | P1 |

### 7.5 SEO, meta, and sharing

| ID | Requirement | Priority |
|----|-------------|----------|
| S1 | Unique `<title>` and `meta name="description"` per major page (Home, Projects, Resume, Log). | P0 |
| S2 | Open Graph + Twitter Card tags on Home (minimum). | P1 |
| S3 | `favicon.ico` / `apple-touch-icon` present and linked. | P1 |
| S4 | Canonical URL if site is ever served under multiple paths. | P2 |

### 7.6 Accessibility

| ID | Requirement | Priority |
|----|-------------|----------|
| A1 | `main` landmark with `id="main"`; skip link “Skip to content”. | P0 |
| A2 | Logical `h1` per page; log index `h1` + entry `h2` or `article` + headings. | P0 |
| A3 | Video: title on iframe where possible; transcript or summary line encouraged for key posts. | P2 |

---

## 8. Non-functional requirements

| ID | Requirement |
|----|-------------|
| N1 | **Performance**: Lighthouse performance ≥ 90 on Home on mid-tier mobile (after image optimization). |
| N2 | **Privacy**: No third-party trackers required; any embed (YouTube) disclosed as third-party content. |
| N3 | **Maintainability**: New pages share `style.css`; avoid one-off inline styles except documented exceptions. |
| N4 | **Repo hygiene**: `styleguide.md` updated when new patterns (log cards, embeds) are introduced. |

---

## 9. Content guidelines for Log entries

To support **SWE / DS / MLE** positioning, encourage tags or short prefixes (optional):

- `[build]` — shipped code, infra, tooling  
- `[data]` — datasets, cleaning, EDA, viz  
- `[ml]` — models, training, eval, papers implemented  
- `[read]` — paper or article notes (1–3 bullets)

**Length**: Target 100–400 words or 3–7 bullets; **daily is optional**—“most weekdays” is a sustainable bar.

**Video (vlog)**: When used, 1–2 sentence summary above the embed for scanners and accessibility.

---

## 10. Project showcase enhancements (recommended)

Not all need ship in v1; prioritize by impact.

1. **Taxonomy**: Tag each project `swe` / `ds` / `ml` (and multi-tag). Optional filter on `projects.html`.  
2. **Case study blocks** (per project): Problem → Data → Approach → Result → What you’d do next.  
3. **Artifacts**: Link notebooks (GitHub), demos (Vercel), and **screenshots** already in `images/`.  
4. **ML specifics**: Baselines, metrics, validation strategy, failure modes (even short bullets build trust).

---

## 11. Phased roadmap

### Phase 1 — Foundation (P0)

- Align hero + about + `<title>` with triad positioning.  
- Add `main`, skip link, fix broken/placeholder links.  
- Implement **Log** MVP (choose Jekyll vs JSON).  
- Add Log to nav; home teaser for latest entries.  
- Per-page meta titles and descriptions.

### Phase 2 — Depth & polish (P1) — **shipped**

- Project tags + filters on `projects.html` (`swe` / `ds` / `ml`, pills + role tags on cards).  
- OG + Twitter Card meta + **`favicon.svg`** on Home, Projects, Resume, Log.  
- Mobile nav: hamburger, collapsible `#site-nav`, `js/nav.js`.  
- Sample **video** log entry + styleguide updates for filters, meta, nav, embeds.

### Phase 3 — Growth (P2) — **shipped**

- **RSS**: `feed.xml` generated from `data/log.json` via `scripts/generate_feed.py`; `<link rel="alternate">` on Home + Log.  
- **Writing hub**: `writing.html` + nav link; cards to PokeFind guide, job-search guide, MarketPulse USERGUIDE on GitHub, and log.  
- **`robots.txt`** + **`sitemap.xml`** (main pages + guides).  
- **Dedicated OG image**: `og-image.png` (1200×630), regenerate with `scripts/generate_og_image.py`; meta tags point at it sitewide.  
- **Mobile nav**: outside click closes menu; toggle uses `stopPropagation` so opening/closing doesn’t fight the document listener.  
- *Deferred:* dark mode (optional per styleguide).

---

## 12. Acceptance criteria (definition of done)

- [ ] Copy on **Home** and **Resume** reflects **Software Engineer · Data Science · ML** consistently.  
- [ ] **`log.html`** (or Jekyll equivalent) live, linked from nav, **monochrome** per `styleguide.md`.  
- [ ] Documented **author workflow** for new log entries (README or `CONTRIBUTING.md` section).  
- [ ] Home shows **recent log** entries linking to full log.  
- [ ] No placeholder social links; LinkedIn points to real profile or is removed.  
- [ ] Accessibility: skip link, `main`, heading order, focus states on new components.  
- [ ] `styleguide.md` lists **Log** page and embed pattern if video is supported.

---

## 13. Open questions

1. **Public vs. semi-private**: Should log entries ever be omitted from feed (drafts)? (GitHub branch workflow vs. `_drafts` in Jekyll.)  
2. **Video host**: YouTube vs. self-hosted—default recommendation is YouTube unlisted for cost/simplicity.  
3. **Frequency commitment**: Daily vs. “weekdays” vs. “when notable”—affects home copy (“Daily log” vs. “Build log”).  
4. **Analytics**: Plausible/GA or none—if none, prefer GitHub traffic or none stated.  
5. **Legal**: CMU / employer attribution for any work-related mentions in log.

---

## 14. References

- [`styleguide.md`](./styleguide.md) — authoritative UI/UX rules.  
- [GitHub Pages documentation](https://docs.github.com/en/pages) — hosting and Jekyll.  
- Existing pages: `index.html`, `projects.html`, `resume.html`, `userguide.html`, `jobsearch-userguide.html`.

---

*Version 1.0 — aligns site evolution with the monochrome minimal styleguide and adds a daily log/vlog-capable surface for ongoing professional storytelling.*
