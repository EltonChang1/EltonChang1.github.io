# EltonChang1 — Personal Site UI Style Guide

## Purpose

This style guide defines a **clean, editorial portfolio system** for [eltonchang1.github.io](https://eltonchang1.github.io): a static GitHub Pages site that feels personal and polished without visual clutter.

**Repository layout (two layers):**

| Layer | Location | Use |
|--------|----------|-----|
| **Static site (current live)** | Repo root (`index.html`, `css/`, `js/`, images) | GitHub Pages as-is; no build step. |
| **React + shadcn (next iteration)** | [`react-app/`](./react-app/) | TypeScript, Tailwind CSS v4, shadcn/ui (Nova / Radix). Build with Vite; deploy `react-app/dist` when you switch hosting to the SPA or a hybrid. |

Keep **one style guide**: tokens and principles below apply to both; the React section maps them to shadcn CSS variables and file paths.

Goals:

- Present **you** clearly: name, role, work, and ways to connect.
- Stay **interactive** through motion, hover, and focus states that feel intentional—not decorative noise.
- Honor **GitHub Pages** constraints: fast first paint, simple hosting, no required backend.
- Keep **one coherent aesthetic** across future pages (home, projects, optional blog).

---

## Design Principles

1. **Calm confidence**  
   The site should read like a quiet introduction: strong hierarchy, generous space, one accent voice.

2. **Whitespace is the frame**  
   Separate sections with rhythm and alignment before reaching for borders or background bands.

3. **Interaction earns attention**  
   Use hover, focus, and small transitions to reward exploration; avoid autoplay, parallax overload, or busy cursors.

4. **One primary action per viewport**  
   Hero or section: one main CTA (e.g. “View projects”, “Get in touch”). Secondary links stay visually quieter.

5. **Static-first, enhance progressively**  
   Core content and navigation work without JavaScript; interactivity layers on top for capable browsers.

---

## GitHub Pages & Repo Conventions

- **URL**: User/organization Pages serves from the default branch; site root is often `/` or `/repo-name/` for project sites—use a **single base path** variable in CSS/build so links and assets never break.
- **HTTPS**: Assume TLS; use absolute `https://` for external assets when needed.
- **Performance**: Prefer self-hosted or system fonts; limit webfont weights; compress images (WebP/AVIF where supported with fallbacks).
- **Repo layout** (suggested): `index.html`, `css/`, `js/`, `assets/` (images, favicon). Optional: Jekyll (`_config.yml`, `_layouts/`) only if you want markdown posts—same tokens apply.
- **React app**: `react-app/src/` — see [React / shadcn stack](#react--shadcn-stack-react-app) below.

---

## React / shadcn stack (`react-app/`)

### Default paths (important)

| What | Path | Notes |
|------|------|--------|
| **UI components** | `react-app/src/components/ui/` | **This is the shadcn default** (via `@/components/ui` in `components.json`). The CLI installs primitives here (`button`, `input`, …). **Custom composites** (e.g. `hero-block-shadcnui.tsx`) belong in the same folder when they are design-system-level blocks built from those primitives—imports stay consistent: `import { Button } from "@/components/ui/button"`. |
| **Utilities** | `react-app/src/lib/utils.ts` | `cn()` helper from shadcn. |
| **Global styles / tokens** | `react-app/src/index.css` | Tailwind v4 `@import "tailwindcss"`, shadcn theme (`@import "shadcn/tailwind.css"`), `:root` **semantic tokens** (`--background`, `--primary`, `--muted-foreground`, …). |

**Why `components/ui` specifically?** The shadcn CLI and docs assume `@/components/ui` so that `npx shadcn@latest add …` drops files in the right place and import paths match every registry example. Putting composites elsewhere works, but you will fight the tooling and copy-paste ergonomics.

**TypeScript path alias:** `@/*` → `react-app/src/*` (see `tsconfig.json`, `tsconfig.app.json`, and `vite.config.ts`).

### If you clone fresh: setup commands

From the repo root:

```bash
cd react-app
npm install
npm run dev
```

**Initialize shadcn** (already done in this repo; repeat only on a new Vite app):

```bash
cd react-app
# Ensure Tailwind v4 + @tailwindcss/vite are configured and src/index.css imports tailwindcss.
# Ensure tsconfig.json has: "paths": { "@/*": ["./src/*"] }
npx shadcn@latest init -t vite -b radix -p nova -y
```

Add more primitives anytime:

```bash
npx shadcn@latest add dialog card input
```

**Dependencies for the hero block:**

```bash
npm install framer-motion
```

`lucide-react` is already pulled in by shadcn. **Note:** Lucide v1+ may not ship every brand glyph; `hero-block-shadcnui.tsx` uses **inline SVGs** for GitHub and LinkedIn and `lucide-react` for `Mail` and `ArrowDown`.

### Entry points

- `react-app/src/App.tsx` — mounts the demo shell.
- `react-app/src/demo.tsx` — wraps `HeroBlock` for local preview.
- `react-app/src/components/ui/hero-block-shadcnui.tsx` — hero section component.

### HeroBlock — structure and integration

| Topic | Answer |
|--------|--------|
| **Props / data** | None today; headline, body, and CTA targets are **hardcoded**. When you personalize, prefer optional props (`title`, `subtitle`, `avatarSrc`, `links`) and keep defaults for the demo. |
| **State** | Stateless; no internal state or data fetching. |
| **Context / providers** | None required. |
| **Assets** | Avatar uses a **stable Unsplash URL** (`photo-1507003211169`); replace with your photo under `public/` or your CDN and update `HERO_AVATAR_SRC`. |
| **Responsive behavior** | Full-viewport hero (`min-h-screen`), centered column `max-w-5xl`, typography `text-5xl` → `md:text-7xl`, wrapping button row. |
| **Motion** | `framer-motion` with `useReducedMotion()` so animations collapse when the user prefers reduced motion (aligns with [Interactive & Motion](#interactive--motion)). |
| **Where to use** | Home/landing hero above the fold; one **h1** per page—don’t duplicate on the same route. |

CTAs are wired to your existing static content where possible: **mailto:** `eltonchangtac@gmail.com`, **GitHub** `https://github.com/EltonChang1`, **View Projects** → `#projects` (add `id="projects"` on a section or change `href` to `/projects` when you route in React).

### Aligning static CSS with React tokens

Your static `css/style.css` uses `--primary-color: #6366f1` (indigo). The shadcn Nova preset uses neutral OKLCH primaries. To match the static brand in React, override in `react-app/src/index.css` inside `:root` (e.g. set `--primary` / `--ring` to hues that match `#6366f1`) and verify contrast (WCAG AA).

### Deploying the React app to GitHub Pages

The repo includes [`.github/workflows/deploy-github-pages.yml`](./.github/workflows/deploy-github-pages.yml). On every push to **`main`**, it runs `npm ci` and `npm run build` in `react-app/`, copies `index.html` → `404.html` for SPA-friendly deep links, and publishes **`react-app/dist`** via the official Pages actions.

**One-time GitHub settings** (required or the workflow will not update the live site):

1. Open the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Push to `main` (or run the workflow manually under **Actions**). The first run may need you to approve **Pages** deployment permissions.

**Vite `base`:** [`react-app/vite.config.ts`](./react-app/vite.config.ts) uses `base: '/'` for **https://eltonchang1.github.io/** (user site at domain root). For a **project** site (`https://<user>.github.io/<repo>/`), set `base: '/<repo>/'` instead.

**Local build:** `cd react-app && npm run build` → `react-app/dist/`. Do not commit `dist/`; CI builds it on deploy.

**Static parity for Pages:** Anything the live site must serve as a plain file (e.g. `resume.html`, `userguide.html`, `jobsearch-userguide.html`, `images/*`, `elton.jpg`, `css/` for the resume page) lives under **`react-app/public/`** so Vite copies it into `dist/` on build. The React app uses client routes (`/`, `/projects`) plus those static URLs.

---

## Layout System

### Page container

- Max content width: `min(1120px, 100% - 48px)` on desktop; full width with **horizontal padding `24px`** (mobile **`16px`**).
- Vertical rhythm between major sections: **`64–96px`** desktop, **`48px`** mobile.

### Grid

- Desktop: **12-column** mental model; main column often **8–10** for reading, **sidebar 2–4** for meta/links if needed.
- Project grids: **2 columns** tablet, **1 column** mobile; consistent gap **`24px`** ( **`16px`** on small screens).

### Section pattern

Each major block follows:

1. Eyebrow or label (optional)
2. Heading
3. Short supporting line
4. Content (cards, list, or prose)
5. Optional single CTA row

---

## Color Palette

Use **CSS custom properties** so light/dark or theme tweaks stay centralized.

**Light (default)**

| Token | Role | Suggested value |
|--------|------|-----------------|
| `--bg` | Page background | `#fafafa` |
| `--surface` | Cards, elevated panels | `#ffffff` |
| `--surface-muted` | Subtle bands, code blocks | `#f4f4f5` |
| `--text-primary` | Headings, body | `#18181b` |
| `--text-secondary` | Meta, captions | `#71717a` |
| `--border` | Dividers, hairlines | `#e4e4e7` |
| `--accent` | Links, primary buttons, focus emphasis | `#2563eb` (or a single personal accent) |
| `--accent-muted` | Hover backgrounds, chips | `rgba(37, 99, 235, 0.08)` |
| `--focus-ring` | Focus visible | `rgba(37, 99, 235, 0.4)` |

**Dark (optional)**

- Preserve the same **roles**: deep `--bg`, slightly lifted `--surface`, light `--text-primary`, muted `--text-secondary`, visible `--border`, same accent family adjusted for contrast.

Rules:

- **One accent family** per page; avoid rainbow section backgrounds.
- Meet **WCAG AA** for text and interactive targets.

---

## Typography

- **Primary**: **Inter** or **DM Sans** (Google Fonts) with `system-ui, sans-serif` fallback—or a distinctive but readable display for **headings only** plus neutral body (keep to **two families max**).
- **Scale** (clamp for fluid type where helpful):  
  - Display / hero name: `clamp(2rem, 5vw, 3rem)`, semibold  
  - Page / section title: `1.5rem–1.875rem`, semibold  
  - Subsection: `1.125rem–1.25rem`, medium  
  - Body: `1rem` (16px base)  
  - Small / meta: `0.875rem`, `--text-secondary`
- **Line length**: ~`65ch` for long prose.
- **Letter-spacing**: slight tightening on large headings (`-0.02em`); body default.

Avoid all-caps except tiny labels; avoid more than **three** distinct sizes in one fold.

---

## Spacing Scale

Base unit **4px**. Use:

`4, 8, 12, 16, 24, 32, 48, 64, 96`

- Tight UI (tags, inline controls): `8–12`
- Card padding: `20–24`
- Between cards: `24`
- Section gaps: `48–64`

---

## Border Radius

- **Inputs, small controls**: `8px`
- **Cards, buttons**: `12px`
- **Large panels**: `16px`
- **Pills / avatars**: `9999px`

---

## Shadows

Portfolio aesthetic: **border-first**, shadow sparingly.

- **Hairline**: `0 1px 0 rgba(0,0,0,0.06)` or `1px solid var(--border)`
- **Lift (cards on hover)**: `0 8px 24px rgba(0,0,0,0.08)`—only on hover or featured item
- Avoid heavy default shadows on every card

---

## Surfaces & Dividers

- Default card: `--surface`, `1px solid var(--border)`, `border-radius: 12px`, minimal shadow.
- Section separation: **space first**; optional `1px` divider full-bleed or inset.
- Code snippets: `--surface-muted`, monospace, comfortable padding.

---

## Component Standards

### Navigation

- Sticky optional; height ~`56–64px`; clear active state (underline, color, or pill).
- Mobile: hamburger or bottom sheet—**keyboard and focus** order preserved.

### Buttons & links

- **Primary**: solid `--accent`, high contrast text; one per logical section.
- **Secondary**: ghost or outline using `--border` + `--text-primary`.
- **Text links**: underline on hover/focus or persistent subtle underline for body links.
- Min touch target: **44×44px** where applicable.
- **`:focus-visible`**: ring using `--focus-ring`; never remove focus styles.

### Project cards

- Thumbnail or placeholder block, title, one-line description, tech tags (muted chips).
- Entire card clickable **or** explicit “View” control—pick one pattern sitewide.
- Hover: subtle lift or border darkening + **150ms** transition.

### Tags / chips

- Low-saturation background, small radius, `--text-secondary` or slightly stronger for text.

### Footer

- Compact: copyright, GitHub, LinkedIn, email; same type scale as meta text.

---

## Interactive & Motion

### Principles

- **Purpose**: feedback (hover, press), guidance (focus), delight (small stagger on load—optional).
- **Duration**: `120–200ms` for UI; `300–400ms` max for section reveals if used.
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` or standard `ease-out`.

### Ideas that stay “clean”

- Link underline draw or color shift on hover.
- Project cards: `translateY(-2px)` + shadow on hover.
- Sticky nav background blur + border on scroll (lightweight CSS).
- Respect **`prefers-reduced-motion`**: reduce or disable non-essential transitions.

### Avoid

- Autoplay video/audio.
- Cursor trails, excessive particle effects, scroll-jacking.

---

## Accessibility

- Semantic HTML: `header`, `nav`, `main`, `footer`, heading order `h1` → `h2` → …
- Skip link to `#main` for keyboard users.
- Visible focus on all interactive elements.
- Sufficient contrast; do not rely on color alone for state.
- Meaningful `alt` on images; decorative images `alt=""`.

---

## Page-Type Guidelines

### Home / landing

- Single **h1** (your name or positioning line).
- Hero: short value prop + primary CTA + secondary link (e.g. résumé PDF).
- Optional: **one** subtle background (gradient or grid) behind hero only—keep rest calm.

### Projects index

- Scannable grid or list; consistent card pattern; filter chips optional—keep chip count low.

### Project detail (if added)

- Title, role, stack, links (repo, demo), screenshots with captions.
- Long body: readable measure, optional TOC for lengthy writeups.

### About

- Photo optional; prose blocks; timeline or skills as simple lists—not flashy infographics unless on-brand.

### Contact

- `mailto:` / form (if using external form service) / socials; duplicate critical link in footer.

---

## Implementation Checklist (GitHub Pages)

1. Set **canonical base URL** in meta and internal links if using project Pages.
2. Define **:root** tokens in one stylesheet; components consume tokens only.
3. **Mobile-first** breakpoints; test **375px** and **1280px+**.
4. **Favicon** + **Open Graph** meta for link previews.
5. **Lighthouse**: aim for strong performance and accessibility scores on static assets.

---

## Do / Don’t

**Do**

- Let typography and spacing carry the design.
- Use one accent and consistent radius/shadow language.
- Make interactivity **predictable** (hover matches focus where possible).

**Don’t**

- Stack competing gradients, patterns, and shadows.
- Hide navigation or contact behind unexplained icons.
- Ship large uncropped hero images without lazy loading.

---

## Definition of Done (UI)

A page or feature is ready when:

- It matches tokens (color, type, spacing, radius).
- Keyboard and screen-reader users can complete primary tasks.
- It loads quickly on GitHub Pages (reasonable image and font choices).
- Motion respects `prefers-reduced-motion`.
- It feels cohesive with the rest of **EltonChang1** on desktop and mobile.

---

*This guide is the single source of truth for visual and interaction decisions on the personal site; evolve it here when the brand or layout changes.*
