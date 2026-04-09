# EltonChang1 — Personal Site UI Style Guide

## Purpose

This guide defines how **your** personal site ([eltonchang1.github.io](https://eltonchang1.github.io)) looks and behaves: a **portfolio-first** experience—name, work, résumé, contact—hosted on GitHub Pages and built as a small React app.

**The site is not a Tailark or SaaS marketing clone.** Content, IA, and tone stay yours. A single external reference is used **only** for a narrow slice of polish (see [Scoped reference](#scoped-reference-21stdev--tailark-hero-section-1) below).

**Repository layout (two layers):**

| Layer | Location | Use |
|--------|----------|-----|
| **Static site (legacy / assets)** | Repo root (`index.html`, `css/`, `js/`, images) | Optional parity; primary UI is the React app when deployed from CI. |
| **React + shadcn (`react-app/`)** | TypeScript, Tailwind CSS v4, shadcn/ui (Nova / Radix), Vite | **Canonical UI** for `/`, `/projects`, `/resume`. Build: `react-app/dist`. |

---

## Scoped reference: [21st.dev — Tailark “Hero Section 1”](https://21st.dev/community/components/tailark/hero-section-1/default)

Use that component **only** as inspiration for:

| Borrow | What it means on *your* site |
|--------|------------------------------|
| **Top banner / nav chrome** | Fixed bar, rounded floating capsule when scrolled, backdrop blur, border, compact actions—**wired to your links** (Home, Projects, Résumé, Contact, PDF, GitHub, email). |
| **Motion language** | Spring-y entrance, staggered reveals, pill CTA hover (arrow slide)—via `AnimatedGroup` + Framer Motion, with **`prefers-reduced-motion`** respected. |
| **Surface & atmosphere** | Subtle diagonal light streaks, optional dark-mode background wash, radial fade into page background, pill + primary/secondary CTAs—**not** a fake “app screenshot,” **not** a customer logo wall. |

**Do not** treat the reference as a template for site structure. Skip wholesale SaaS patterns (mock product UI, “meet our customers” grids, generic marketing copy). If something does not support *your* story, it does not ship.

---

## North-star: first impression (yours)

When someone lands on the home page:

- **They meet you** — headline and subcopy describe *you* and what to do next (projects, résumé, contact).
- **The top feels intentional** — banner behavior and motion echo the reference above; everything else follows this guide’s portfolio rhythm.
- **Motion supports content** — stagger and springs draw the eye once; no endless or decorative animation.
- **Accessibility** — semantic `header` / `nav` / `section`, one **`h1`** on the home route, readable `muted-foreground` body text.

Supporting goals:

- Honor **GitHub Pages** (fast load, simple hosting, no backend).
- Keep **one coherent look** across `/`, `/projects`, `/resume`.

---

## Design Principles

1. **Portfolio leads, polish follows**  
   Sections below the fold stay **editorial**: About, projects, contact—not a marketing funnel.

2. **Depth without SaaS cosplay**  
   Atmosphere (gradients, blur, borders) supports **your** intro; avoid mock dashboards and third-party “logo clouds” unless they are *your* real affiliations.

3. **Interaction earns attention**  
   Pill link hover, nav blur-on-scroll, button hovers—predictable and light.

4. **One primary action per viewport**  
   In the hero: one primary CTA + one secondary; same discipline in other sections.

5. **Static-first, enhance progressively**  
   Links and structure work without motion; `AnimatedGroup` degrades to static layout when reduced motion is requested.

---

## GitHub Pages & Repo Conventions

- **URL / `base`**: Set Vite `base` to match user vs project Pages.
- **HTTPS** for external assets where used.
- **Images**: Prefer optimized assets; optional Unsplash only for **ambient** hero background—not as a stand-in for product UI.

---

## React / shadcn stack (`react-app/`)

### Default paths

| What | Path |
|------|------|
| **UI** | `react-app/src/components/ui/` (`components.json` → `@/components/ui`) |
| **Utils** | `react-app/src/lib/utils.ts` (`cn`) |
| **Tokens** | `react-app/src/index.css` |

**Why `components/ui`?** Matches shadcn CLI defaults and copy-paste imports.

**Vite + React Router:** use `<Link to="…">` / `<NavLink>`, not `next/link`.

### Setup (already in repo)

```bash
cd react-app && npm install && npm run dev
```

**Motion / UI deps:** `framer-motion`, `class-variance-authority`, `lucide-react`; buttons use `radix-ui`’s `Slot.Root`.

### Layout: home vs other routes

- **`SiteLayout`** hides **`SiteHeader`** on **`/`** so **`HeroHeader`** in `hero-section-1.tsx` is the only top bar on the home page.
- **`/projects`**, **`/resume`**: standard **`SiteHeader`** + footer.
- One **`<main>`** in `SiteLayout`; the hero uses a **`<div>`** wrapper (no nested `<main>`).

### Home hero — `hero-section-1.tsx` + `animated-group.tsx`

| Topic | Answer |
|--------|--------|
| **Scope vs [Tailark on 21st.dev](https://21st.dev/community/components/tailark/hero-section-1/default)** | Implements **banner + motion + surface** only; **no** framed product mockup block, **no** customer logo strip. |
| **Files** | `hero-section-1.tsx` (`HeroSection`, `HeroHeader`), `animated-group.tsx`. |
| **Copy / nav** | Editable in-file (`menuItems`, headline, pill text, CTAs)—keep it **personal**, not generic SaaS. |
| **State** | Mobile menu + scroll-compacted nav in `HeroHeader`. |
| **Motion** | `AnimatedGroup` + springs; **`useReducedMotion()`** → static children. |
| **Where** | **Home** only (`home-page.tsx`). One **`h1`**. |
| **Alternate** | `hero-block-shadcnui.tsx` if you want a quieter fold. |

### Deploy

GitHub Actions builds `react-app/` → **`dist`**. Static files live in **`react-app/public/`**.

---

## Layout System

- Hero: `max-w-7xl`, `px-6`; section ends with comfortable **`pb-16 md:pb-24`** before About.
- Below: `max-w-6xl`, existing section spacing (**64–96px** desktop, **48px** mobile).

---

## Color, type, components

- **Tokens:** `--background`, `--foreground`, `--muted-foreground`, `--primary`, etc., from `index.css`.
- **Type:** Geist Variable + system fallbacks; hero display scale as implemented in `hero-section-1.tsx`.
- **Nav:** Home = `HeroHeader` (fixed, blur capsule on scroll); other routes = `SiteHeader`.
- **Buttons:** shadcn `Button`; primary + ghost/outline in hero.

---

## Motion

- **Hero:** stagger + spring (reference-aligned **feel**, not a full component clone).
- **Rest of site:** short hovers only.
- **`prefers-reduced-motion`:** honor via `AnimatedGroup`.

---

## Accessibility

Semantic landmarks, one home **`h1`**, meaningful image `alt` (decorative backgrounds `alt=""`), hash links (`/#contact`) with existing scroll behavior.

---

## Home page structure (intended)

1. **Hero** — your intro + pill + CTAs + atmosphere (**reference-scoped** as above).  
2. **About → Featured projects → Contact** — portfolio sections in `home-page.tsx` (not part of the Tailark reference).

---

## Do / Don’t

**Do**

- Write hero copy and CTAs for **your** goals.
- Keep the 21st.dev link in this doc as **“what we borrowed”**, not **“what we are.”**

**Don’t**

- Add logo strips or product screenshots **for decoration** to mimic a startup landing page.
- Duplicate top nav on home (`SiteLayout` already avoids this).

---

## Definition of done

- Matches tokens and **portfolio-first** structure.
- Reference influence is limited to **top banner look + motion + surface** as documented.
- **`npm run build`** passes; a11y and reduced-motion behavior hold.

---

*Single source of truth for EltonChang1 visual and interaction decisions; update here when your brand or layout changes.*
