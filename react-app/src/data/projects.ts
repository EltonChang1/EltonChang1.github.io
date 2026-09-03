export type ProjectId =
  | "amos"
  | "ashe"
  | "next-best-action"
  | "traceframe"
  | "torflix"
  | "marketpulse"
  | "zoe"
  | "meritocracy"
  | "jobsearch"
  | "pokefind";

export type StatIcon =
  | "globe"
  | "chart"
  | "news"
  | "users"
  | "flask"
  | "briefcase"
  | "filter"
  | "check"
  | "code"
  | "map"
  | "clock"
  | "shield";

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectDefinition {
  id: ProjectId;
  /** A small, intentional set shown on the home page. */
  featured?: boolean;
  homeLinks?: ProjectLink[];
  card: {
    /** Display name on home and /projects */
    title: string;
    /** One-sentence, user-facing summary (home featured + accent line on /projects) */
    tagline: string;
    /** Longer explainer on the /projects card (below tagline) */
    description: string;
    tech: string[];
    stats: { label: string; icon: StatIcon }[];
    image: string;
  };
  expanded: {
    title: string;
    /** MarketPulse-style bullet features */
    featureList?: string[];
    overviewParagraphs?: string[];
    findingsList?: string[];
    methodologyParagraphs?: string[];
    techDetails?: { title: string; items: string[] }[];
    screenshots: { src: string; caption: string }[];
    links: ProjectLink[];
  };
}

export const PROJECTS: ProjectDefinition[] = [
  {
    id: "amos",
    featured: true,
    homeLinks: [
      {
        label: "Visit AMOS",
        href: "https://amoslabs.dev",
        external: true,
      },
      { label: "Interactive Project View", href: "/projects#amos" },
      {
        label: "GitHub",
        href: "https://github.com/EltonChang1/AMOS",
        external: true,
      },
    ],
    card: {
      title: "AMOS",
      tagline:
        "An internally deployed AI analyst that verifies the work behind every answer.",
      description:
        "AMOS connects to company data and tools, proposes analytical work with a local agent, runs authoritative calculations outside the model, checks claims against evidence, and produces reviewable reports, charts, and slides. The Rust control layer keeps permissions, execution, provenance, review, and replay explicit.",
      tech: [
        "Rust",
        "Axum",
        "SQLite",
        "AI governance",
        "Data systems",
      ],
      stats: [
        { label: "Permission-first control", icon: "shield" },
        { label: "Verified claims", icon: "check" },
        { label: "Review & replay", icon: "chart" },
      ],
      image: "/images/amos-overview.png",
    },
    expanded: {
      title: "AMOS — Verified AI Analysis Inside the Enterprise",
      overviewParagraphs: [
        "**AMOS** is an internally deployed analyst system for business questions that require more than a plausible model response. A local analyst agent proposes the work; the AMOS control layer decides what is permitted, runs deterministic calculations, verifies the resulting claims, and preserves the evidence needed for review or replay.",
        "I co-founded AMOS after seeing the same analytical workflow repeat across finance, aviation, and research projects: reconcile the right data and definitions, choose the right computation, validate the result, and communicate it in a decision-ready form.",
      ],
      featureList: [
        "Permission-first context compilation filters inaccessible, stale, revoked, or superseded memory before it reaches the model.",
        "Governed SQL, statistics, and chart workers perform authoritative computation outside the language model.",
        "Typed claims, dependency edges, evidence records, and independent validity dimensions make results inspectable.",
        "Human review, correction, invalidation, and level-3 replay preserve control after an analysis is produced.",
        "A hardened customer-evaluation package supports installation on a customer-controlled Linux server.",
      ],
      techDetails: [
        {
          title: "Control layer",
          items: [
            "Rust application, CLI, API, UI rendering, persistence, connectors, workers, and tests",
            "Atomic analytical-state transactions with idempotency, leases, fencing, audit, and outbox delivery",
            "Capability-bound tool execution with schema, metric, column, row, byte, and time controls",
          ],
        },
        {
          title: "Evidence & operations",
          items: [
            "Typed reports, claims, provenance, review, invalidation, and replay",
            "Analysis Workspace, Memory Studio, Review Queue, and Operations Console",
            "OCI image, hardened Docker Compose evaluation topology, backups, and diagnostics",
          ],
        },
      ],
      screenshots: [
        {
          src: "/images/amos-overview.png",
          caption: "AMOS — verified analysis inside the company environment",
        },
        {
          src: "/images/amos-product-flow.png",
          caption: "Product flow from business question to governed artifact",
        },
        {
          src: "/images/amos-analysis-chart.png",
          caption: "Deterministically generated analysis artifact",
        },
      ],
      links: [
        {
          label: "Visit AMOS",
          href: "https://amoslabs.dev",
          external: true,
        },
        {
          label: "View repository",
          href: "https://github.com/EltonChang1/AMOS",
          external: true,
        },
        {
          label: "Read the research paper",
          href: "https://github.com/EltonChang1/AMOS/blob/main/papers/AMOS_research_paper.pdf",
          external: true,
        },
        {
          label: "Technical architecture",
          href: "https://amoslabs.dev/amos-technical-architecture.pdf",
          external: true,
        },
      ],
    },
  },
  {
    id: "ashe",
    featured: true,
    homeLinks: [
      {
        label: "Visit live site",
        href: "https://ashesystem.com",
        external: true,
      },
      { label: "Interactive Project View", href: "/projects#ashe" },
      {
        label: "Sample readiness report",
        href: "https://ashesystem.com/sample-aog-readiness-report.pdf",
        external: true,
      },
    ],
    card: {
      title: "Ashe System — AOG Shield",
      tagline: "Predict risk. Prepare parts. Reduce downtime.",
      description:
        "AOG Shield turns an aviation operator’s existing maintenance, inventory, supplier, certificate, and schedule exports into explainable 0–100 AOG risk scores, prioritized recommendations, and an executive-ready readiness report—so teams catch parts-driven Aircraft-on-Ground risk before it grounds a plane.",
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "Tailwind CSS",
      ],
      stats: [
        { label: "1.2K+ record risk engine", icon: "chart" },
        { label: "Modeled $15K/mo opportunity", icon: "news" },
        { label: "Explainable decision support", icon: "shield" },
      ],
      image: "/images/Ashesystem_homepage.png",
    },
    expanded: {
      title: "Ashe System — AOG Shield",
      overviewParagraphs: [
        "**AOG Shield** helps airlines, cargo operators, MROs, and aviation materials teams identify parts-driven AOG (Aircraft on Ground) risk before a missing or unavailable certified part creates avoidable downtime.",
        "As founder and technical lead, I translated operator validation into more than 50 MVP requirements and built a 1.2K+ record risk-engine demonstration that modeled up to $15K per month in avoidable downtime opportunity per operator.",
        "It is decision-support and risk advisory only—it surfaces risk and the evidence behind it so maintenance, quality, supply-chain, and planning teams can act faster, without replacing human review or determining airworthiness.",
      ],
      featureList: [
        "Turns existing operator CSV exports into explainable 0–100 risk scores for aircraft, stations, parts, suppliers, and documentation.",
        "Generates prioritized recommendations—transfer, source, repair, borrow/exchange, supplier review, stock-level review, certificate review, or quarantine pending review.",
        "Shows the evidence behind every recommendation so teams can trust and verify each call.",
        "Compiles an executive-ready AOG Readiness Diagnostic Report from anonymized data.",
        "Includes a dashboard for operational exploration of risk across the fleet.",
      ],
      techDetails: [
        {
          title: "Product & data",
          items: [
            "Python data pipeline (pandas, numpy) for ingest and scoring",
            "FastAPI backend serving read-oriented risk APIs",
            "Explainable scoring with per-recommendation evidence",
          ],
        },
        {
          title: "Web & reports",
          items: [
            "Next.js App Router, React, TypeScript dashboard",
            "Tailwind CSS marketing site at ashesystem.com",
            "Generated PDF AOG Readiness Diagnostic Reports",
          ],
        },
      ],
      screenshots: [
        {
          src: "/images/Ashesystem_homepage.png",
          caption: "AOG Shield landing page — explore the full live product at ashesystem.com",
        },
      ],
      links: [
        {
          label: "Visit the live site — ashesystem.com",
          href: "https://ashesystem.com",
          external: true,
        },
        {
          label: "Product brief",
          href: "https://ashesystem.com/ashe-system-product-brief.pdf",
          external: true,
        },
        {
          label: "Sample readiness report",
          href: "https://ashesystem.com/sample-aog-readiness-report.pdf",
          external: true,
        },
      ],
    },
  },
  {
    id: "next-best-action",
    featured: true,
    homeLinks: [
      {
        label: "Interactive Project View",
        href: "/projects#next-best-action",
      },
    ],
    card: {
      title: "Next Best Action",
      tagline:
        "Rank the most relevant high-impact opportunity for each advisor conversation.",
      description:
        "Built through a Carnegie Mellon collaboration with PNC, this machine-learning pipeline used client behavior, product holdings, and engagement signals to predict next-month product adoption and rank supported recommendations for advisor outreach.",
      tech: [
        "Python",
        "HistGradientBoosting",
        "LightGBM",
        "XGBoost",
        "Ranking",
      ],
      stats: [
        { label: "0.811 ROC AUC", icon: "chart" },
        { label: "95% top-3 hit rate", icon: "check" },
        { label: "Multi-model ensemble", icon: "flask" },
      ],
      image: "/images/next-best-action.svg",
    },
    expanded: {
      title: "Next Best Action — PNC Collaboration",
      overviewParagraphs: [
        "This project reframed product propensity modeling as a decision-support problem: instead of returning a single opaque score, the system ranks the most relevant supported opportunities an advisor could discuss with a client.",
        "The portfolio case study intentionally stays at the methodology-and-results level. Client data, implementation details governed by the collaboration, and proprietary business logic are not published.",
      ],
      featureList: [
        "Prepared behavioral, holdings, product, and engagement signals for next-month adoption prediction.",
        "Compared histogram gradient boosting, LightGBM, XGBoost, and ensemble strategies.",
        "Evaluated both discrimination and recommendation usefulness rather than relying on accuracy alone.",
        "Produced a ranked top-three opportunity set suitable for human advisor review.",
      ],
      methodologyParagraphs: [
        "Model selection used ROC AUC to assess ranking quality across positive and negative outcomes, while a top-three hit-rate metric tested whether the supported next action appeared in the short list an advisor would realistically inspect.",
        "The selected pipeline achieved 0.811 ROC AUC and a 95% top-three hit rate on supported recommendations.",
      ],
      techDetails: [
        {
          title: "Modeling",
          items: [
            "HistGradientBoosting baseline",
            "LightGBM and XGBoost candidates",
            "LightGBM–XGBoost ensemble",
          ],
        },
        {
          title: "Evaluation",
          items: [
            "Next-month adoption target",
            "ROC AUC for ranking quality",
            "Top-three hit rate for advisor usefulness",
          ],
        },
      ],
      screenshots: [
        {
          src: "/images/next-best-action.svg",
          caption: "Confidentiality-safe project summary and evaluation results",
        },
      ],
      links: [{ label: "View résumé", href: "/resume" }],
    },
  },
  {
    id: "traceframe",
    featured: true,
    homeLinks: [
      { label: "Sample Audit Report", href: "/traceframe-ecommerce-audit.html" },
      { label: "Interactive Project View", href: "/projects#traceframe" },
      {
        label: "GitHub",
        href: "https://github.com/EltonChang1/traceframe",
        external: true,
      },
    ],
    card: {
      title: "TraceFrame",
      tagline:
        "A local-first evidence tracker for data science workflows — record datasets, transforms, metrics, charts, claims, and lineage on your machine.",
      description:
        "TraceFrame writes project evidence under a local `.traceframe/` directory: no cloud service, telemetry, or external API by default. Use the Python API or CLI to capture what you ran, validate results with checks, trace lineage upstream and downstream, and export an HTML audit report.",
      tech: [
        "Python",
        "DuckDB",
        "pandas",
        "Polars",
        "SQLite",
        "Local-first",
      ],
      stats: [
        { label: "Local evidence store", icon: "shield" },
        { label: "Lineage & checks", icon: "flask" },
        { label: "Audit reports", icon: "check" },
      ],
      image: "/images/traceframe-home.png",
    },
    expanded: {
      title: "TraceFrame",
      overviewParagraphs: [
        "**TraceFrame** is a local-first evidence tracker for data science workflows. It records datasets, transformations, SQL outputs, metrics, charts, claims, checks, source-row samples, and lineage under a project-local `.traceframe/` directory.",
        "Nothing leaves your disk unless you export it — built for reproducibility, debugging, and explaining results when a metric or chart needs to be audited.",
      ],
      featureList: [
        "Track pandas, Polars, and DuckDB SQL workflows with an explicit Python API (`tf.read_csv`, `tf.sql`, `tf.metric`, `tf.chart`, `tf.claim`).",
        "Run data quality checks (`expect_not_null`, `expect_unique`, schema and range validators) and surface failures in reports or CI via `--json`.",
        "Inspect upstream and downstream lineage from any artifact with `traceframe lineage` or `tf.lineage_graph`.",
        "Sample source rows and drill into chart points locally — chart drilldown data stays in DuckDB under `.traceframe/source_rows/`.",
        "Export a self-contained HTML audit report with datasets, lineage, metrics, charts, claims, checks, and project health.",
        "Ships runnable ecommerce and Olist-inspired examples; deterministic local assistant planning when you want guided analysis setup.",
      ],
      techDetails: [
        {
          title: "Evidence model",
          items: [
            "JSON metadata in `.traceframe/` — project, lineage, metrics, charts, claims, checks, runs",
            "Source-row samples as local JSON; chart drilldown in DuckDB",
            "Audit logs per evidence record for change history",
          ],
        },
        {
          title: "API & CLI",
          items: [
            "Python 3.10+ library: `pip install -e .` from the repo",
            "CLI: `traceframe init`, `status`, `lineage`, `checks`, `report`, `doctor`, `verify`",
            "Notebook context via `tf.start(..., notebook_name=...)` and `tf.note_cell`",
          ],
        },
        {
          title: "MVP scope (v0.1)",
          items: [
            "Explicit instrumentation — not automatic full operation tracing",
            "No cloud sync, hosted dashboards, telemetry, or notebook extensions yet",
            "MIT licensed; CI with pytest, ruff, black, and mypy",
          ],
        },
      ],
      screenshots: [
        {
          src: "/images/traceframe-home.png",
          caption: "Audit report — project health, datasets, and evidence summary",
        },
        {
          src: "/images/traceframe-lineage.png",
          caption: "Full audit report with lineage, metrics, charts, claims, and checks",
        },
        {
          src: "/images/traceframe-olist.png",
          caption: "Multi-table Olist example — join lineage across orders, items, and customers",
        },
      ],
      links: [
        {
          label: "Ecommerce sample audit report",
          href: "/traceframe-ecommerce-audit.html",
        },
        {
          label: "Olist sample audit report",
          href: "/traceframe-olist-audit.html",
        },
        {
          label: "Repository",
          href: "https://github.com/EltonChang1/traceframe",
          external: true,
        },
        {
          label: "Getting started",
          href: "https://github.com/EltonChang1/traceframe/blob/main/docs/getting-started.md",
          external: true,
        },
        {
          label: "Evidence model",
          href: "https://github.com/EltonChang1/traceframe/blob/main/docs/evidence-model.md",
          external: true,
        },
      ],
    },
  },
  {
    id: "torflix",
    homeLinks: [
      { label: "Interactive User Guide", href: "/torflix-userguide.html" },
      { label: "Interactive Project View", href: "/projects#torflix" },
      {
        label: "GitHub",
        href: "https://github.com/EltonChang1/Torflix",
        external: true,
      },
      {
        label: "User Guide (GitHub)",
        href: "https://github.com/EltonChang1/Torflix/blob/main/docs/USER_GUIDE.md",
        external: true,
      },
    ],
    card: {
      title: "Torflix",
      tagline:
        "A self-hosted movie library that runs BitTorrent on your own machine — browse a catalog, add magnets, and stream titles while they finish downloading.",
      description:
        "A local daemon (torflixd) runs BitTorrent on your machine; a web UI in your browser lets you browse the catalog, add magnets, track downloads, and play video. The browser only talks to your daemon, not the swarm.",
      tech: [
        "Python",
        "FastAPI",
        "React",
        "TypeScript",
        "Vite",
        "WebSocket",
        "BitTorrent",
      ],
      stats: [
        { label: "Runs on your machine", icon: "globe" },
        { label: "Browse & track", icon: "code" },
        { label: "Optional in-browser play", icon: "check" },
      ],
      image: "/images/torflix-home.png",
    },
    expanded: {
      title: "Torflix",
      overviewParagraphs: [
        "Torflix is a self-hosted movie library: a local daemon runs BitTorrent on your machine while a familiar streaming-style web UI lets you browse, queue magnets, track downloads, and watch.",
        "The layout mirrors streaming services — hero, rows, title details, downloads, dashboard. Use the Interactive User Guide below for a full click-through.",
      ],
      featureList: [
        "Browse Home rows or search; open a title to add to My List, pick quality if offered, then download or start watch-while-downloading.",
        "Follow jobs and files in My downloads; open Watch when you chose in-browser playback (best with common web video formats).",
        "Adjust which rows you see and in what order in Dashboard; sign in optionally to sync preferences and continue watching.",
        "Check Connection & BitTorrent at the bottom if something feels stuck—listener status helps you or whoever runs the machine debug network issues.",
      ],
      techDetails: [
        {
          title: "Daemon & engine",
          items: [
            "Python: BitTorrent engine library + FastAPI app (torflixd)",
            "HTTP API for torrents, health, user settings; WebSocket for live updates",
            "Environment: TORFLIX_* (ports, data dir, catalog API, BT listen port)",
          ],
        },
        {
          title: "Web UI",
          items: [
            "React 18, TypeScript, Vite, React Router",
            "Dev: Vite proxy to daemon; prod: static build served by torflixd or any host",
            "Service worker shell for offline-friendly app loading (precache)",
          ],
        },
        {
          title: "Limits (honest)",
          items: [
            "In-browser playback depends on codec/container",
            "Magnets need tracker URLs (tr=); no DHT in this stack yet",
            "Inbound peers need TORFLIX_BT_PORT reachable if you want remote peers",
          ],
        },
      ],
      screenshots: [
        {
          src: "/images/torflix-welcome.png",
          caption: "First visit — welcome / important message",
        },
        {
          src: "/images/torflix-home.png",
          caption: "Home — hero, navigation, catalog rows",
        },
        {
          src: "/images/torflix-rows-recent-top10.png",
          caption: "Recently added, Top 10, horizontal scrolling",
        },
        {
          src: "/images/torflix-rows-genres.png",
          caption: "Genre rows (e.g. Sci-Fi, Action)",
        },
        {
          src: "/images/torflix-rows-picked.png",
          caption: "Highly rated, classics, picked for you",
        },
        {
          src: "/images/torflix-downloads.png",
          caption: "My downloads — jobs and status",
        },
        {
          src: "/images/torflix-dashboard.png",
          caption: "Dashboard — Home customization and account",
        },
      ],
      links: [
        {
          label: "Interactive User Guide",
          href: "/torflix-userguide.html",
        },
        {
          label: "Repository",
          href: "https://github.com/EltonChang1/Torflix",
          external: true,
        },
        {
          label: "User guide (GitHub)",
          href: "https://github.com/EltonChang1/Torflix/blob/main/docs/USER_GUIDE.md",
          external: true,
        },
        {
          label: "README",
          href: "https://github.com/EltonChang1/Torflix/blob/main/README.md",
          external: true,
        },
      ],
    },
  },
  {
    id: "marketpulse",
    homeLinks: [
      { label: "Interactive Project View", href: "/projects#marketpulse" },
      {
        label: "Go to Website",
        href: "https://marketpulse-ai-rho.vercel.app",
        external: true,
      },
      {
        label: "GitHub",
        href: "https://github.com/EltonChang1/MarketPulse-AI",
        external: true,
      },
      {
        label: "User Guide",
        href: "https://github.com/EltonChang1/MarketPulse-AI/blob/main/USERGUIDE.md",
        external: true,
      },
    ],
    card: {
      title: "MarketPulse AI",
      tagline:
        "See movers and your watchlist at a glance, log trades, then open any stock for forecasts, charts, news, and analysis.",
      description:
        "After you sign in, you get a market-style home: search tickers, a watchlist table with sparklines, index cards, and movers. Track a manual portfolio with performance and allocation charts. On a stock page you can read forecasts, signals, indicators, a written summary, and headlines — or switch to Classic for embedded TradingView. An optional Ask AI assistant answers questions using your watchlist and portfolio for context.",
      tech: [
        "React",
        "Vite",
        "Node.js",
        "Express",
        "Technical Analysis",
        "TradingView",
      ],
      stats: [
        { label: "Market overview", icon: "globe" },
        { label: "Your portfolio", icon: "chart" },
        { label: "Per-stock intel", icon: "news" },
      ],
      image: "/images/mp-3-market-overview.png",
    },
    expanded: {
      title: "MarketPulse AI",
      overviewParagraphs: [
        "**You** use it to watch the market and your own positions in one place: home dashboards, a portfolio you enter by hand, and a deep stock page when you want forecasts and news beyond a headline.",
        "Dark/light theme and navigation (Home · Portfolio · Classic) keep it usable for long sessions; Classic is there when you want the full TradingView charting experience.",
      ],
      featureList: [
        "Sign up to save a watchlist and portfolio between visits.",
        "On Home: search, screener-style table with sparklines, market index cards, featured names, and gainers/losers movers.",
        "Portfolio: add buys and sells, see performance, allocation, vs indexes, holdings, and history.",
        "Stock page: pick a time horizon, read forecast and signals, open indicators and pattern context, scan a narrative summary, and read latest headlines.",
        "Optional Ask AI chat uses your watchlist and portfolio when enabled.",
      ],
      screenshots: [
        {
          src: "/images/mp-1-signup.png",
          caption: "Sign-up — dot backdrop, pill nav, auth fields",
        },
        {
          src: "/images/mp-2-watchlist-screener.png",
          caption: "Home — search, watchlist screener table, sidebar",
        },
        {
          src: "/images/mp-4-stocks-movers.png",
          caption: "Featured stock cards and market movers columns",
        },
        {
          src: "/images/mp-5-portfolio-overview.png",
          caption: "Portfolio — transactions, performance, allocation, vs indexes",
        },
        {
          src: "/images/mp-6-holdings-transactions.png",
          caption: "Holdings table and transaction history",
        },
        {
          src: "/images/mp-7-stock-predictions.png",
          caption: "Stock page — prediction periods and forecast strip",
        },
        {
          src: "/images/mp-8-tradingview-classic.png",
          caption: "Classic — full TradingView embed and toolbar",
        },
        {
          src: "/images/mp-9-key-signals.png",
          caption: "Reversal intelligence — Bollinger, RSI, volume, ATR, Fib, touches",
        },
        {
          src: "/images/mp-10-prediction-reasoning.png",
          caption: "Prediction reasoning — weighted signals and pattern matches",
        },
        {
          src: "/images/mp-11-technical-indicators.png",
          caption: "Technical indicators — MAs, momentum, bands, trend/volume grid",
        },
        {
          src: "/images/mp-12-comprehensive-analysis.png",
          caption: "Comprehensive analysis — summary, sentiment, risks, opportunities",
        },
        {
          src: "/images/mp-13-latest-news.png",
          caption: "Latest news — headlines, time, and sources",
        },
      ],
      links: [
        {
          label: "Visit Website",
          href: "https://marketpulse-ai-rho.vercel.app",
          external: true,
        },
        {
          label: "User Guide (GitHub)",
          href: "https://github.com/EltonChang1/MarketPulse-AI/blob/main/USERGUIDE.md",
          external: true,
        },
        {
          label: "View on GitHub",
          href: "https://github.com/EltonChang1/MarketPulse-AI",
          external: true,
        },
      ],
    },
  },
  {
    id: "zoe",
    homeLinks: [
      { label: "Interactive Project View", href: "/projects#zoe" },
      {
        label: "GitHub",
        href: "https://github.com/EltonChang1/Zoe",
        external: true,
      },
      {
        label: "Product brief (PRD)",
        href: "https://github.com/EltonChang1/Zoe/blob/main/PRD/Zoe_PRD.md",
        external: true,
      },
    ],
    card: {
      title: "Zoe",
      tagline:
        "A social app for discovering what’s worth loving — and ranking it.",
      description:
        "Zoe (from the Greek ζωή, “life”) is a mobile taste platform that blends an Instagram-familiar shell, RedNote-style recommendation utility, and Beli-style ranking. You discover lifestyle ideas, build living ranked lists, and follow how friends’, creators’, and celebrities’ tastes evolve — all in a custom “Soft Editorial Luxury” design system. Built as a real Expo + React Native app (v1.2, submitted to Y Combinator S26).",
      tech: [
        "React Native",
        "Expo",
        "expo-router",
        "TypeScript",
        "NativeWind",
        "Product design",
      ],
      stats: [
        { label: "Taste graph", icon: "users" },
        { label: "Ranked lists", icon: "chart" },
        { label: "Discovery + Shorts", icon: "globe" },
      ],
      image: "/images/zoe-icon-preview.png",
    },
    expanded: {
      title: "Zoe",
      overviewParagraphs: [
        "**Zoe** (from the Greek *ζωή*, “life”) is a mobile social app for discovering, saving, discussing, and **ranking** the things that shape your taste. It deliberately combines three proven ideas: an **Instagram-familiar shell**, **RedNote-style** recommendation utility, and **Beli-style** ranking that turns favorites into living, followable lists.",
        "The build is a real Expo + React Native vertical slice with five tabs — **Discover · Search · Rankings · Shorts · Profile** — three editorial post-detail templates, and a pairwise add-to-ranking flow, all rendered in a custom *Soft Editorial Luxury* design system (Newsreader / Cormorant Garamond / Inter type, warm neutrals, glass navigation).",
        "A companion vertical, **Zoe Fashion**, points the same taste-and-ranking model at shopping: a unified catalog with effortless **side-by-side comparison** (price, brand, fit, material) so you can decide before you buy.",
      ],
      featureList: [
        "Discover — a two-column editorial masonry feed with category chips and interleaved curator quote cards.",
        "Search / Following Activity — an italic editorial search plus a stacked feed of what people you follow just ranked, saved, or reviewed.",
        "Rankings hub — community and personal taste libraries with a pairwise add flow (category → compare → caption) that returns an insertion rank, not a flat 1–10 score.",
        "Shorts — an immersive vertical-video lane with a glass right rail (Rank · Like · Comment · Save) and curator attribution.",
        "Profile — identity-first, with Posts / Shorts / Rankings tabs, highlights, and taste badges.",
        "Three editorial post-detail templates (discovery photo, album review, product hero) selected automatically from the linked object’s category.",
      ],
      techDetails: [
        {
          title: "Mobile app",
          items: [
            "Expo SDK 52 + expo-router v4 (file-based navigation)",
            "React Native with TypeScript (strict mode)",
            "NativeWind v4 — Tailwind utility model for React Native",
          ],
        },
        {
          title: "Design system",
          items: [
            "“Soft Editorial Luxury” — warm neutrals, tonal depth, no divider lines",
            "Newsreader / Cormorant Garamond / Inter type system",
            "Glassmorphic nav + gradient CTAs (expo-blur, expo-linear-gradient)",
          ],
        },
      ],
      screenshots: [
        {
          src: "/images/zoe-screen-home-framed.png",
          caption: "Discover — editorial masonry feed with curator quote cards",
        },
        {
          src: "/images/zoe-screen-search-framed.png",
          caption: "Search / Following Activity — what people you follow just ranked",
        },
        {
          src: "/images/zoe-screen-rankings-framed.png",
          caption: "Rankings — a community hub of living, curated lists",
        },
        {
          src: "/images/zoe-screen-shorts-framed.png",
          caption: "Shorts — immersive vertical video with a glass action rail",
        },
        {
          src: "/images/zoe-screen-profile-framed.png",
          caption: "Profile — identity-first, with posts, shorts, and rankings",
        },
        {
          src: "/images/zoe-screen-album-framed.png",
          caption: "Post detail — one of three editorial templates (album review)",
        },
        {
          src: "/images/zoe-fashion-compare-framed.png",
          caption: "Zoe Fashion — side-by-side comparison to decide before you buy",
        },
      ],
      links: [
        {
          label: "View repository",
          href: "https://github.com/EltonChang1/Zoe",
          external: true,
        },
        {
          label: "Product brief (PRD)",
          href: "https://github.com/EltonChang1/Zoe/blob/main/PRD/Zoe_PRD.md",
          external: true,
        },
      ],
    },
  },
  {
    id: "meritocracy",
    homeLinks: [
      { label: "Interactive Project View", href: "/projects#meritocracy" },
      {
        label: "GitHub",
        href: "https://github.com/EltonChang1/Quantifying-Meritocracy-TvL-Solidarity",
        external: true,
      },
    ],
    card: {
      title: "Quantifying Meritocracy",
      tagline: "See how luck and simple rules change who gets rich in simulated economies.",
      description:
        "You explore results from thousands of simulated people and careers: how luck skews success, how unequal a “merit” system can get, and how redistribution shifts outcomes. It reads like a reproducible research paper — every chart and experiment can be rerun straight from the repo.",
      tech: [
        "Python",
        "NumPy",
        "Matplotlib",
        "Agent-Based Modeling",
        "Statistical Analysis",
      ],
      stats: [
        { label: "Simulation results", icon: "chart" },
        { label: "Many agents", icon: "users" },
        { label: "Policy experiments", icon: "flask" },
      ],
      image: "/images/meritocracy-tvl.png",
    },
    expanded: {
      title: "Quantifying Meritocracy",
      overviewParagraphs: [
        "**You** read the write-up and figures to understand: in a simple world where talent exists but luck matters, who ends up rich—and whether sharing rules can flatten the ladder without killing mobility.",
      ],
      findingsList: [
        "Talent and wealth don’t line up: luck explains most of the spread.",
        "A pure merit-style run can look as unequal as real economies unless you add policy.",
        "Moderate redistribution in the model cuts inequality sharply while keeping mobility high.",
        "Early, simple rules often beat late, complicated ones in the simulations.",
      ],
      methodologyParagraphs: [
        "Part 1: Replays the classic Talent vs. Luck setup with many agents over simulated careers.",
        "Part 2: Tries different redistribution and timing experiments so you can compare outcomes side by side.",
      ],
      techDetails: [
        {
          title: "Core Stack",
          items: [
            "Python 3.11 for agent-based simulation",
            "NumPy for statistical distributions",
            "Matplotlib/Seaborn for publication-quality visualizations",
            "SciPy for advanced analytics",
          ],
        },
        {
          title: "Key Metrics",
          items: [
            "Gini coefficient (inequality measurement)",
            "Upward mobility rates",
            "Wealth concentration ratios",
            "Talent-wealth correlation analysis",
          ],
        },
      ],
      screenshots: [
        {
          src: "/images/meritocracy-tvl.png",
          caption: "Talent vs. Luck Validation",
        },
        {
          src: "/images/meritocracy-solidarity.png",
          caption: "Solidarity Mechanisms Analysis",
        },
      ],
      links: [
        {
          label: "View Repository",
          href: "https://github.com/EltonChang1/Quantifying-Meritocracy-TvL-Solidarity",
          external: true,
        },
        {
          label: "Full Results & Analysis",
          href: "https://github.com/EltonChang1/Quantifying-Meritocracy-TvL-Solidarity/blob/main/RESULTS.md",
          external: true,
        },
      ],
    },
  },
  {
    id: "jobsearch",
    homeLinks: [
      {
        label: "Interactive User Guide",
        href: "/jobsearch-userguide.html",
      },
    ],
    card: {
      title: "Job Search Tool",
      tagline: "Search CS, data science, and ML jobs from several boards and remember what you already applied to.",
      description:
        "You filter by role type and preferences, sort results, read cleaned-up postings, and mark jobs as applied so your list doesn’t get messy. Everything stays in your browser for privacy.",
      tech: [
        "React",
        "Vite",
        "React Router",
        "Remotive API",
        "Arbeitnow API",
      ],
      stats: [
        { label: "Multi-Source Jobs", icon: "briefcase" },
        { label: "Smart Filtering", icon: "filter" },
        { label: "Applied Tracking", icon: "check" },
      ],
      image: "/images/job-search-tool.png",
    },
    expanded: {
      title: "Job Search Tool",
      featureList: [
        "Search keywords and location; results pull from multiple public job sources.",
        "Focus on software, data science, and ML categories so you’re not wading through unrelated roles.",
        "Descriptions are cleaned up so they’re easier to scan on the page.",
        "Mark applied roles and revisit them on a dedicated applied list.",
        "Sort and filter to match how you actually hunt (date, company, relevance, etc.).",
      ],
      screenshots: [
        {
          src: "/images/jobsearch-filters.png",
          caption: "Filter by role type and preferences",
        },
        {
          src: "/images/jobsearch-listings.png",
          caption: "Results list with cleaned-up postings",
        },
        {
          src: "/images/jobsearch-detail.png",
          caption: "Full posting detail, easy to scan",
        },
        {
          src: "/images/jobsearch-applied.png",
          caption: "Track roles you’ve already applied to",
        },
      ],
      links: [
        { label: "Interactive User Guide", href: "/jobsearch-userguide.html" },
      ],
    },
  },
  {
    id: "pokefind",
    homeLinks: [
      { label: "Interactive User Guide", href: "/userguide.html" },
      { label: "View Details", href: "/projects#pokefind" },
      {
        label: "GitHub",
        href: "https://github.com/EltonChang1/Pokemon-Finder-App",
        external: true,
      },
    ],
    card: {
      title: "PokeFind",
      tagline:
        "Open a map to see spawns, raids, and gyms near you—or anywhere you search.",
      description:
        "You pan and zoom the map, tap Pokémon for details, check raid and gym activity, and import or export GPX routes to plan how you move. Built for players who want situational awareness beyond the game’s default map.",
      tech: ["React.js", "Node.js", "MongoDB", "Leaflet.js", "Express"],
      stats: [
        { label: "Full-Stack", icon: "code" },
        { label: "Interactive Maps", icon: "map" },
        { label: "Real-Time Data", icon: "clock" },
      ],
      image: "/images/pokemon-radar-main.png",
    },
    expanded: {
      title: "PokeFind",
      featureList: [
        "See Pokémon on a map around your location or after you search elsewhere.",
        "Adjust how wide you search and recenter the map when you move.",
        "Open a Pokémon to check timing, rarity-style info, and how trustworthy the signal is.",
        "Watch gyms and raids so you know what’s active before you go.",
        "Load or save GPX routes when you want a planned path instead of wandering.",
      ],
      screenshots: [
        {
          src: "/images/pokemon-map-view.png",
          caption: "Interactive Map View",
        },
        { src: "/images/raids-view.png", caption: "Raid Battles" },
        {
          src: "/images/pokemon-popup-gengar.png",
          caption: "Detailed Pokémon Info",
        },
        {
          src: "/images/location-search-modal.png",
          caption: "Location Search",
        },
      ],
      links: [
        { label: "Interactive User Guide", href: "/userguide.html" },
        {
          label: "View on GitHub",
          href: "https://github.com/EltonChang1/Pokemon-Finder-App",
          external: true,
        },
      ],
    },
  },
];

export const SKILLS = [
  "Rust",
  "Python",
  "TypeScript",
  "Go",
  "Java",
  "C / C++",
  "React",
  "Next.js",
  "SQL",
  "Spark",
  "Machine Learning",
  "AI Governance",
  "Large-scale systems",
  "Full-stack",
] as const;

export const ABOUT_PARAGRAPH =
  "I’m a Carnegie Mellon M.S. graduate in Data Analytics for Science and a co-founder of AMOS. I build governed AI systems, data pipelines, ML models, and full-stack products that have to behave in the wild—where “works on my machine” is a bug, not a punchline. Browse the work below; the résumé is the shorter, slightly more serious cut.";

export const FEATURED_PROJECTS = PROJECTS.filter(
  (project) => project.featured,
);

export function projectById(id: ProjectId): ProjectDefinition | undefined {
  return PROJECTS.find((p) => p.id === id);
}
