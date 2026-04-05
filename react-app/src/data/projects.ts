export type ProjectId = "marketpulse" | "meritocracy" | "jobsearch" | "pokefind";

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
  /** Short title for home featured cards (optional) */
  homeTitle?: string;
  homeLinks?: ProjectLink[];
  card: {
    title: string;
    tagline: string;
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
    id: "marketpulse",
    homeTitle: "MarketPulse AI - Market, Portfolio & Stock Intelligence",
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
        "Market overview + portfolio insights + deep single-stock intelligence",
      description:
        "Full-stack web app for market monitoring and stock research. It unifies macro context, watchlist and portfolio views, and detailed individual-stock analysis including chart review, reversal intelligence, prediction calculations, pattern matching, technical indicators, and latest news.",
      tech: [
        "React",
        "Node.js",
        "Express",
        "Yahoo Finance API",
        "Technical Analysis",
      ],
      stats: [
        { label: "Market Overview", icon: "globe" },
        { label: "Stock Intelligence", icon: "chart" },
        { label: "Latest News", icon: "news" },
      ],
      image: "/images/1-market-overview.png",
    },
    expanded: {
      title: "MarketPulse AI - Market, Portfolio & Stock Intelligence",
      featureList: [
        "Market Overview Layer: Quick context with market dashboard, commodities, largest companies, and movers",
        "Watchlist Workflow: Fast symbol tracking and one-click navigation into detailed stock review",
        "Portfolio Monitoring: Personal portfolio snapshot with deeper breakdown for position-level visibility",
        "Stock Review Pipeline: Chart, reversal intelligence, prediction calculations, and pattern match analysis",
        "Technical Indicator Stack: Indicator-rich interpretation for trend, momentum, and risk context",
        "Comprehensive Analysis: Combined reasoning layer to summarize actionable stock context",
        "Latest News Section: Recent article feed integrated into each individual-stock page",
        "Refresh-Safe Routing: Hash-based routing keeps deep links stable on reload",
        "Full-Stack Architecture: React frontend with Express backend and market/news integrations",
      ],
      screenshots: [
        {
          src: "/images/1-market-overview.png",
          caption: "High-level market snapshot and context",
        },
        {
          src: "/images/2-commodities.png",
          caption: "Commodities view for macro-aware monitoring",
        },
        {
          src: "/images/3-largest-companies.png",
          caption: "Largest-company panel for big-cap leadership tracking",
        },
        {
          src: "/images/4-market-movers.png",
          caption: "Market movers section for volatility and momentum",
        },
        {
          src: "/images/5-watchlist-sidebar.png",
          caption: "Watchlist sidebar for personalized symbol tracking",
        },
        {
          src: "/images/6-personal-portfolio.png",
          caption: "Portfolio-level monitoring view",
        },
        {
          src: "/images/7-portfolio-details.png",
          caption: "Detailed portfolio breakdown and position context",
        },
        {
          src: "/images/8-individual-stock-review.png",
          caption: "Entry point for symbol-level analysis",
        },
        {
          src: "/images/9-individual-stock-chart.png",
          caption: "Chart view for trend and price-action inspection",
        },
        {
          src: "/images/10-individual-stock-reversal-intelligence.png",
          caption: "Reversal signal insights for directional shifts",
        },
        {
          src: "/images/11-individual-stock-prediction-calculation.png",
          caption: "Prediction calculation transparency for projected moves",
        },
        {
          src: "/images/12-individual-stock-pattern-match.png",
          caption: "Pattern matching output to support chart interpretation",
        },
        {
          src: "/images/13-individual-stock-technical-indicators.png",
          caption: "Technical indicators panel for momentum/trend analysis",
        },
        {
          src: "/images/14-individual-stock-comprehensive-analysis.png",
          caption: "Combined analysis summary for decision context",
        },
        {
          src: "/images/15-individual-stock-latest-news.png",
          caption: "Latest related news feed with source and time context",
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
    homeTitle: "Quantifying Meritocracy: Talent vs. Luck",
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
      tagline: "Computational research validating that luck dominates success",
      description:
        'Agent-based simulation extending the "Talent vs. Luck" model to test whether solidarity-based redistribution can correct meritocracy\'s inherent randomness. Demonstrates 92% inequality reduction with moderate policies.',
      tech: [
        "Python",
        "NumPy",
        "Matplotlib",
        "Agent-Based Modeling",
        "Statistical Analysis",
      ],
      stats: [
        { label: "Data Science", icon: "chart" },
        { label: "1000 Agents", icon: "users" },
        { label: "6 Experiments", icon: "flask" },
      ],
      image: "/images/meritocracy-tvl.png",
    },
    expanded: {
      title: "Quantifying Meritocracy: Talent vs. Luck Extended",
      overviewParagraphs: [
        'This two-part computational research project validates the landmark paper "Talent vs Luck" (Pluchino et al., 2018) and extends it to test solidarity-based redistribution policies. Through agent-based simulation, it demonstrates that success in pure meritocracies depends more on random luck than talent—and that moderate redistribution (15-25%) can reduce inequality by 92% while achieving perfect social mobility.',
      ],
      findingsList: [
        "Luck Dominates Success: Weak correlation (r=0.31) between talent and wealth; most talented individuals rank ~184th in wealth distribution",
        "Pure Meritocracy Creates Extreme Inequality: Without intervention, Gini coefficient reaches 0.393 (comparable to U.S. inequality)",
        "15-25% Redistribution Optimal: Reduces inequality by 92% (Gini: 0.39 → 0.03) while maintaining 100% upward mobility",
        "Preventive Policies Win: Early intervention prevents 50-80 years of unnecessary inequality vs. reactive approaches",
        "Robust to Tax Avoidance: Even with 60% non-compliance, system achieves 90% inequality reduction",
        "Simple Beats Complex: Fixed-rate redistribution outperforms progressive taxation and multi-mechanism policies",
      ],
      methodologyParagraphs: [
        "Part 1: Recreated the original TvL model simulating 1,000 agents with normally distributed talent over 40-year careers, validating that random events determine success more than ability.",
        "Part 2: Extended the model with 6 comprehensive experiments testing fixed redistribution, dynamic policies, tax avoidance scenarios, policy timing, multi-dimensional mechanisms, and parameter sensitivity across 100 economic iterations.",
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
    homeTitle: "Job Search Tool",
    homeLinks: [
      {
        label: "Interactive User Guide",
        href: "/jobsearch-userguide.html",
      },
    ],
    card: {
      title: "Job Search Tool",
      tagline: "Multi-source CS/DS/ML job aggregator with applied-job tracking",
      description:
        "A React-based job aggregator that pulls Computer Science, Data Science, and Machine Learning jobs from major platforms, supports advanced filtering/sorting, and tracks applied jobs with local persistence.",
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
      title: "Job Search Tool - CS/DS/ML Aggregator",
      featureList: [
        "Aggregated Search: Pulls jobs from major listing sites (Remotive, Arbeitnow, The Muse) in parallel",
        "Tech-Only Relevance: Focuses on Computer Science, Data Science, and Machine Learning roles",
        "Human-Readable Descriptions: Cleans and normalizes job descriptions to remove noisy formatting",
        "Applied Job Tracker: One-click apply tracking with a dedicated applied-jobs dashboard",
        "Advanced Controls: Filter by category/location/full-time and sort by relevance/date/company/title",
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
    homeTitle: "PokeFind - Real-Time Pokémon Tracker",
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
        "Full-stack web application with interactive maps and real-time data",
      description:
        "Comprehensive web application designed to enhance the Pokémon Go experience by providing real-time Pokémon radar, Gym and Raid information, and GPS route import/export features.",
      tech: ["React.js", "Node.js", "MongoDB", "Leaflet.js", "Express"],
      stats: [
        { label: "Full-Stack", icon: "code" },
        { label: "Interactive Maps", icon: "map" },
        { label: "Real-Time Data", icon: "clock" },
      ],
      image: "/images/pokemon-radar-main.png",
    },
    expanded: {
      title: "PokeFind - Real-Time Pokémon Tracker",
      featureList: [
        "Real-Time Pokémon Radar: Displays nearby Pokémon spawns on an interactive map with customizable search radius",
        "Location Search: Search any location worldwide using address or GPS coordinates",
        "GPS Route Import/Export: Upload and download GPX files for optimized Pokémon hunting routes",
        "Gym & Raid Battle Information: Live updates on nearby Gym battles and Raid participation",
        "Detailed Pokémon Info: View IV stats, spawn/despawn times, rarity levels, and accuracy ratings",
        "Interactive Maps: Powered by Leaflet with smooth recentering and zoom controls",
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
  "React",
  "Node.js",
  "Machine Learning",
  "Data Analytics",
  "MongoDB",
  "TensorFlow",
  "AWS",
  "Express",
  "API Integration",
] as const;

export const ABOUT_PARAGRAPH =
  "I'm currently studying Data Analytics for Science at Carnegie Mellon. I like solving problems by using code and data to make sense out of the challenge. My work sits at the intersection of software engineering, machine learning, and data science, where I build projects that aim to be both technically solid and actually useful. I enjoy creating things that are useful and make sense. I used my own projects like PokeFind and MarketPulse daily. Feel free to check them out below!";

export function projectById(id: ProjectId): ProjectDefinition | undefined {
  return PROJECTS.find((p) => p.id === id);
}
