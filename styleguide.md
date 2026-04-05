# EltonChang1.github.io — UI Style Guide

## Purpose

This style guide defines a **minimal, elegant** portfolio system for [eltonchang1.github.io](https://eltonchang1.github.io): a static **GitHub Pages** site that reads as **mainly black and white, with a restrained use of gray**—no chromatic UI accents.

**Visual direction**

- **Minimal**: few elements per screen, generous whitespace, border-first surfaces, shadows only when they clarify hierarchy (often on hover).
- **Elegant**: strong typographic hierarchy (weight and spacing, not decoration), subtle letter-spacing on large headings, smooth system fonts, calm motion.
- **Monochrome**: UI chrome (nav, buttons, tags, bands, focus) stays in **black / white / neutral gray**; screenshots, charts, or third-party embeds may still show color.

Goals:

- Present **you** clearly: name, positioning, work, and ways to connect.
- Match the **discipline** of a small design system (tokens, spacing, components) without corporate heaviness.
- Respect **GitHub Pages**: fast first paint, simple deploys, no required backend.
- Keep **interactivity intentional**: hover, focus, scroll-triggered reveals, and short motion—never noise or scroll-jacking.
- Maintain **one coherent look** across `index.html`, `projects.html`, `log.html`, `writing.html`, `resume.html`, `userguide.html`, `jobsearch-userguide.html`, and future pages.

---

## Design Principles

1. **Black, white, gray first**  
   **Near-black** (`#0a0a0a`) and **white** carry structure and emphasis; **gray** is for secondary text, borders, muted fills, and on-dark copy. **No saturated accent colors** in navigation, buttons, chips, or section chrome.

2. **Whitespace is structure**  
   Separate sections with vertical rhythm and alignment before adding borders, bands, or shadows.

3. **Quiet surfaces**  
   Prefer **1px** neutral borders and flat fills over gradients, glassmorphism stacks, and default drop shadows on every card.

4. **One primary action per area**  
   Each hero or major block has one clear main CTA; everything else reads as secondary.

5. **Static-first, enhance progressively**  
   Core content and navigation work without JavaScript; JS adds polish (smooth scroll, reveals, typing) where appropriate.

6. **GitHub.io-aware**  
   Paths and assets work at the site root or under a project path if you ever change hosting layout.

---

## GitHub Pages & Repository Conventions

- **Hosting**: Static files from the default branch; no server-side rendering unless you add Jekyll explicitly.
- **URLs**: Prefer a single **base path** strategy (relative links like `css/style.css`, `projects.html`) or a documented `base` tag / build variable if the site ever lives under a subpath.
- **HTTPS**: Use `https://` for external assets and social links.
- **Performance**: Prefer **system font stack** or one webfont family with limited weights; compress images (WebP with fallbacks); lazy-load below-the-fold media.
- **Suggested layout**: `index.html`, `projects.html`, `log.html`, `writing.html`, `resume.html`, `data/log.json`, `feed.xml`, `robots.txt`, `sitemap.xml`, `og-image.png`, `css/style.css` (+ `resume.css` where needed), `js/script.js`, `js/log.js`, `images/`, `favicon.svg`, Open Graph + Twitter meta.

**Implementation map (current repo)**

| Area        | Files |
|------------|--------|
| Global UI  | `css/style.css`, `js/script.js`, `js/nav.js`, `favicon.svg`, `og-image.png` |
| Build log  | `data/log.json`, `js/log.js`, `log.html`, `feed.xml`, `scripts/generate_feed.py` |
| Projects filters | `js/projects-filter.js` (loaded on `projects.html` only) |
| Resume     | `css/resume.css`, `js/resume.js` |
| SEO        | `robots.txt`, `sitemap.xml` |
| OG asset   | `scripts/generate_og_image.py` (regenerates `og-image.png`) |
| Pages      | `index.html`, `projects.html`, `log.html`, `writing.html`, `resume.html`, `userguide.html`, `jobsearch-userguide.html` |

When adding styles, **extend tokens** in `:root` rather than sprinkling one-off hex values in components.

---

## Layout System

### Page container

- Max width: **`min(1120px, 100% - 48px)`** on large screens (today’s `1200px` container is acceptable; align breakpoints across pages).
- Horizontal padding: **`24px`** desktop, **`16px`** mobile.
- Vertical rhythm between major sections: **`64–96px`** desktop, **`48px`** mobile (section padding in the **`5rem`** range is fine if consistent).

### Grid

- **12-column** mental model on desktop.
- Main reading column often **8–10**; side meta **2–4** if needed.
- Project grids: **2 columns** tablet, **1** mobile; gap **`24px`** (**`16px`** on small screens).

### Section structure

Each major block follows:

1. Optional eyebrow / label  
2. Heading  
3. One short supporting line  
4. Content (prose, cards, list)  
5. Optional single CTA row  

---

## Color Palette (black, white, and gray)

**Philosophy**: Color does not brand this site—**contrast and tone** do. Use a small **gray ramp** so the interface feels intentional, not empty.

**Gray ramp (reference)** — use these roles, not random hex between them:

| Step | Hex (reference) | Typical use |
|------|-----------------|-------------|
| White | `#ffffff` | Page surface, cards, inverse text on dark |
| Off-white | `#fafafa` | Optional hero text on dark bands |
| Light fill | `#f5f5f5` | Section bands, muted panels, table stripes |
| Border | `#e5e5e5` | Hairlines, chip outlines, dividers |
| Border strong | `#d4d4d4` | Hover border shift on cards |
| Secondary text | `#737373` | Captions, nav default, de-emphasized UI |
| Meta on dark | `#a3a3a3` | Subheads and supporting lines on `#0a0a0a` |
| Charcoal | `#404040` | Rare secondary emphasis, progress mid-tones |
| Near-black | `#0a0a0a` | Body, headings, primary buttons, dark bands |
| Dark hairline | `#262626` | Borders separating regions on dark backgrounds |

**CSS tokens** (`css/style.css` `:root`)

| Token | Maps to |
|--------|---------|
| `--text-dark` / `--primary-color` | Near-black UI and copy |
| `--dark-bg` | Hero, contact, page headers |
| `--white` | Light surfaces |
| `--light-bg` | Muted sections |
| `--text-light` | Secondary copy |
| `--border-color` | Default borders |
| `--secondary-color` | Deeper gray accents |
| `--focus-ring` | `rgba(10, 10, 10, 0.25)` on light; use light outline on dark regions |

**Rules**

- **No hue** in chrome: no blue links-as-brand, no rainbow hovers, no colored gradients behind nav or CTAs.
- **Hierarchy** = size, weight, spacing, and black vs gray—not color blocks.
- **Imagery** may be full color; do not “color-match” the UI to screenshots.
- Meet **WCAG AA** for text and controls (verify small type on `#a3a3a3` on black).

---

## Typography

Elegance here is **restraint**: one family, clear steps, no decorative type effects.

- **Family**: System stack (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, Roboto, …) with antialiasing on. Optional single webfont only if it stays neutral (e.g. Inter)—**one family sitewide** is ideal for this aesthetic.
- **Scale** (use `clamp` for the hero):
  - Hero / name: `clamp(2rem, 5vw, 3.5rem)`, **semibold** (600), tracking **-0.02em to -0.03em**
  - Section title: one consistent scale (e.g. `clamp(1.75rem, 4vw, 2.25rem)`), semibold
  - Subsection: `1.125rem–1.25rem`, medium
  - Body: **`1rem` (16px)**, regular, line height ~**1.65**
  - Meta / small: **`0.875rem`**, color **`--text-light`**
- **Line length**: ~**65ch** for long prose.
- **Color**: body and headings default to **`--text-dark`**; secondary lines use **`--text-light`** or **`#a3a3a3`** on dark bands.

**Rules**

- Avoid all-caps except tiny labels.
- Avoid more than **three** distinct sizes above the fold.
- Do not rely on **color** for hierarchy within running text; use weight and size.

---

## Spacing Scale

Base unit **4px**. Allowed values:

`4, 8, 12, 16, 24, 32, 40, 48, 64, 96`

- Compact controls / tags: **8–12**  
- Inside cards: **16–24**  
- Between cards: **24**  
- Between page-level groups: **32–48**  
- Hero / section breathing room: **64–96**  

---

## Border Radius

- Small (inputs, small controls): **`8px`**
- Medium (cards, buttons): **`12px`** (today’s `0.5rem` = 8px—consider bumping cards to **12px** for consistency)
- Large (modals, wide panels): **`16px`**
- Pills / avatars: **`9999px`**

---

## Shadows

- **Subtle**: `0 1px 2px rgba(0,0,0,0.05)`  
- **Medium**: `0 4px 12px rgba(0,0,0,0.08)`  
- **Lift (hover only)**: `0 8px 24px rgba(0,0,0,0.08)`  

**Usage**

- Default layout: **subtle or none**; prefer **border** for card definition.
- **Navbar**: very light shadow or bottom border is OK.
- Avoid **strong** default shadows on every card—reserve lift for **hover** or a **single** featured project.

---

## Divider and Surface Style

- Default card: `background: var(--white)`, `border: 1px solid var(--border-color)`, modest radius; **no** default heavy shadow.
- Use **horizontal dividers** (`1px` neutral) between dense lists when spacing alone is not enough.
- **Hero and key headers**: solid **`--dark-bg`** with light type; following sections alternate **`--white`** and **`--light-bg`** for calm rhythm—not loud color blocks.

---

## Component Standards

### Navigation

- Sticky nav: height ~**56–64px**; clear **active** state (class `active` + color or underline).
- Mobile: collapse menu with preserved **tab order** and focus styles.
- Optional: `.navbar.scrolled` with backdrop blur—keep performance reasonable.

### Buttons

- **Primary (light sections)**: filled **near-black**, white label.
- **Primary (dark hero / contact)**: filled **white**, near-black label.
- **Secondary (light sections)**: transparent, **gray border**, dark text; hover = light gray fill.
- **Secondary (dark bands)**: transparent, **white/low-opacity** border, light text; hover = white fill, dark text.
- One clear primary per block; height ~**40–44px** where touch matters.
- **Hover**: small **`translateY(-1px)`** or border/shadow shift—subtle, consistent.
- **Focus-visible**: visible outline (dark on light, light outline on dark); optional ripple kept **neutral** (e.g. soft black alpha).

### Links

- Default: inherit body color or **near-black**; hover/focus: underline or **slightly darker** gray—still monochrome.
- External links: `rel="noopener"` where appropriate.

### Project cards

- Image, title, one-line description, **gray-bordered** tech chips.
- **Entire card** clickable **or** explicit control—one pattern sitewide.
- **Hover**: small lift + **neutral** shadow or **#d4d4d4** border—**~150–200ms**.

### Skill tags / tech badges

- Idle: white or light gray fill, **gray border**, dark text.
- Hover: **invert** to near-black fill and white text (**CSS only**; no random or per-tag colors in JS).

### Footer

- Dark **near-black** bar or minimal border-top on white; meta text in **muted gray**; social targets invert on hover (black circle, white icon) to match the rest of the system.

---

## Interaction Patterns

### States

Interactive elements should account for:

- default  
- hover  
- active  
- focus-visible  
- disabled (if applicable)  

### Motion

- **Duration**: **120–200ms** for UI; hero entrance **≤ 800ms** if used.
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` or `ease-out`.
- **Scroll-triggered**: Intersection Observer reveals (e.g. `.visible` on `.project-card`)—stagger lightly or none.
- **`prefers-reduced-motion`**: shorten or disable non-essential animations (typing, parallax, pulse).

### Feedback

- Use clear copy for errors (forms, future contact flows); don’t rely on color alone.

---

## Interactive Features (Portfolio-Specific)

These are **on-brand** if kept bounded:

| Feature | Guideline |
|---------|-----------|
| Typing effect (hero) | Short string only; respect reduced motion. |
| Smooth scroll (`#` anchors) | Keep; ensure target `id` exists (`#contact`, `#about`). |
| Scroll fade-in | Subtle opacity/translate; avoid large delays. |
| Parallax on hero | Optional; keep subtle; disable or reduce under `prefers-reduced-motion`. |
| Pulse CTA | Avoid for this aesthetic; if kept, use **opacity** only—no scale bounce. |
| Easter eggs (e.g. party mode) | Must stay **monochrome** (e.g. brief invert), off by default, non-destructive. |

**Avoid**

- Autoplay sound/video  
- Scroll-jacking, custom cursor trails, heavy particle layers  

---

## Accessibility

- Semantic regions: `header`, `nav`, `main`, `footer`; heading order **h1 → h2 → h3**.
- **Skip link** to `#main` (add `id="main"` on primary content if missing).
- **Focus visible** on all controls and menu items.
- **Contrast**: AA minimum for text and interactive elements.
- Images: meaningful **`alt`**; decorative `alt=""`.
- Don’t convey state by color alone (pair with text or icon).

---

## Page-Type Guidelines

### Home (`index.html`)

- Single **h1** (name / positioning).
- Hero: dark band, light type; eyebrow line for triad positioning; one primary CTA + one secondary.
- About + skills + featured projects + **latest log teaser** + contact: follow section pattern above.

### Build log (`log.html`)

- **h1**: “Build log” (or equivalent); entries as **articles** with `time` (`datetime` ISO date).
- Typography: comfortable measure (~**65ch**); date in **muted gray**; optional **tags** as small outlined chips (grayscale).
- **Video**: optional YouTube embed via id; **no autoplay**; wrapper with border and **16:9** aspect ratio; title on iframe.
- Data: `data/log.json` loaded client-side; home teaser reuses the same source (see `js/log.js`).

### Projects (`projects.html`)

- Scannable grid; consistent cards; **role tags** (SWE / Data / ML) on each card in grayscale pills.
- **Filter bar**: `.project-filter-bar` with `.filter-pill` buttons (`active` = filled black). Filters use `data-project-tags` on `.project-card-interactive` (space-separated: `swe`, `ds`, `ml`). Changing filters calls `resetAllProjectsView()` so no orphan expanded panel stays open.
- Expanded detail blocks stay visually subordinate (border, single-column lists).

### Meta, favicon, and social preview

- **`favicon.svg`** at site root; `<link rel="icon" href="favicon.svg" type="image/svg+xml">` on main pages.
- **Open Graph**: `og:title`, `og:description`, `og:url`, `og:type`, `og:image` (absolute URL to **`og-image.png`**, 1200×630—regenerate via `scripts/generate_og_image.py`).
- **Twitter**: `twitter:card` = `summary_large_image` plus matching `twitter:title`, `twitter:description`, `twitter:image` (same URL as `og:image`).
- **RSS**: `feed.xml` mirrors the build log; refresh with `scripts/generate_feed.py` when `data/log.json` changes; expose with `<link rel="alternate" type="application/rss+xml">` on Home and Log.

### Resume (`resume.html`)

- Print-friendly rules live in `resume.css`; screen view should still use global tokens where possible.

### Writing hub (`writing.html`)

- Card grid (`.writing-grid` / `.writing-card`): border-first, hover lift; links may be internal or external (GitHub).
- Intro links in dark headers use `.projects-header p a` (muted + underline).

### Guides (`userguide.html`, etc.)

- Same **black / white / gray** chrome as the main site; optional content (e.g. tier labels) may use a **gray ramp** only, not rainbow semantics unless the doc truly requires it for meaning.

---

## Implementation Rules for Future Work

1. **Tokens first**: add or change variables in `:root` before hardcoding hex in selectors.
2. **Spacing scale**: use the allowed steps; avoid arbitrary `margin: 13px`-style values except in rare optical tweaks.
3. **One shadow language**: default subtle; hover lift where it matters.
4. **Reuse components**: `.btn`, `.project-card`, `.skill-tag` / `.tech-badge` patterns before inventing new classes.
5. **JS polish**: any new animation should check **`prefers-reduced-motion`** and avoid blocking content.

**Legacy alignment**

- Tokens live in `:root` as `--primary-color` (black), `--text-dark`, `--border-color`, etc.; extend this grayscale system rather than adding new hues.

---

## Do / Don’t

**Do**

- Let typography and spacing carry the layout.
- Stay **grayscale** and keep radius/shadow language consistent.
- Keep interactions **predictable** (hover and focus tell the same story).
- Project **filter pills**: show active state with filled black **and** `aria-pressed="true"` (not color alone).

**Don’t**

- Stack competing gradients, patterns, and heavy shadows on every block.
- Introduce saturated colors into chrome (tags, nav, buttons) outside this grayscale system.
- Hide contact or main nav behind unexplained icons only.

### Navigation (mobile)

- **≤768px**: `.nav-toggle` (three-bar button) visible; `#site-nav` is a vertical stack below the bar, hidden until `.nav-menu-open`. Toggle updates `aria-expanded`. **Escape** closes the menu (`js/nav.js`). Link click closes the menu.
- **Outside click**: document listener closes the menu when open and the event target is **outside** `.navbar`; the toggle button calls **`stopPropagation`** on its click so the same click doesn’t immediately dismiss the menu.

---

## Definition of Done (UI)

A page or update is ready when:

- It respects the **black / white / gray** system (no new hues in chrome without updating this guide).
- **Typography and spacing** do most of the work; decoration is minimal.
- **Keyboard** and screen-reader users can reach all primary actions.
- Layout is checked at **~375px** and **1280px+**.
- **Lighthouse**: strong performance for a static site.
- Motion respects **`prefers-reduced-motion`**.
- The result feels **calm, minimal, and cohesive** with **EltonChang1.github.io**.

---

*Single source of truth for visual and interaction decisions on this site; evolve it here if the palette or layout direction changes.*
