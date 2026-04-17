export type ProjectId =
  | "torflix"
  | "marketpulse"
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
  | "clock";

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectDefinition {
  id: ProjectId;
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
    id: "torflix",
    homeLinks: [
      { label: "Interactive User Guide", href: "/torflix-userguide.html" },
      { label: "Interactive Project View", href: "/projects#torflix" },
      {
        label: "GitHub",
        href: "https://github.com/EltonChang1/PyTorrent",
        external: true,
      },
      {
        label: "User Guide (GitHub)",
        href: "https://github.com/EltonChang1/PyTorrent/blob/main/docs/USER_GUIDE.md",
        external: true,
      },
    ],
    card: {
      title: "Torflix",
      tagline:
        "A movie library on your hardware, aimed at a century of film in the wild, not this month's licensed row.",
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
        "A movie library on your hardware, aimed at a century of film in the wild, not this month's licensed row.",
        "The layout mirrors streaming: hero, rows, title details, downloads, dashboard. Use the Interactive User Guide below for a full click-through.",
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
          href: "https://github.com/EltonChang1/PyTorrent",
          external: true,
        },
        {
          label: "User guide (GitHub)",
          href: "https://github.com/EltonChang1/PyTorrent/blob/main/docs/USER_GUIDE.md",
          external: true,
        },
        {
          label: "README",
          href: "https://github.com/EltonChang1/PyTorrent/blob/main/README.md",
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
        "After you sign in, you get a market-style home: search tickers, a watchlist table with sparklines, index cards, and movers. Track a manual portfolio with performance and allocation charts. On a stock page you can read forecasts, signals, indicators, a written summary, and headlines—or switch to Classic for embedded TradingView. Ask AI can answer with your watchlist and portfolio in context when it’s on.",
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
          src: "/images/mp-3-market-overview.png",
          caption: "Market overview — index cards, mini candles, actions",
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
        "You explore results from thousands of simulated people and careers: how luck skews success, how unequal a “merit” system can get, and how redistribution shifts outcomes. The repo walks you through charts and experiments—no GUI, but the story reads like a research paper you can rerun.",
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
          src: "/images/job-search-tool.png",
          caption: "Main search dashboard with category filters",
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
  "Python",
  "Go",
  "Java",
  "C / C++",
  "React",
  "SQL",
  "Spark",
  "Machine Learning",
  "Large-scale systems",
  "Full-stack",
] as const;

export const ABOUT_PARAGRAPH =
  "I'm a master's student in Data Analytics for Science at Carnegie Mellon. I build data pipelines, ML models, and full-stack products that have to behave in the wild—where “works on my machine” is a bug, not a punchline. Browse the work below; the résumé is the shorter, slightly more serious cut.";

export function projectById(id: ProjectId): ProjectDefinition | undefined {
  return PROJECTS.find((p) => p.id === id);
}
