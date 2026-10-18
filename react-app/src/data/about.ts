import { RESEARCH_PROPOSAL_PAGE_PATH } from "@/constants/research";
import { MERGED_CONTRIBUTION_COUNT } from "@/data/open-source";

export const ABOUT_PHOTO = {
  src: "/images/elton.jpg",
  alt: "Elton sitting on the floor checking his phone while a white-and-gray cat on the couch behind him rests a paw on his head.",
  caption: "A very paws-on code review.",
  width: 1024,
  height: 1536,
} as const;

export const ABOUT_LEDE =
  "I like building software that shows its work. If a system hands you a number, a risk score, or an AI-written conclusion, you should be able to ask “how do you know?” and get a real answer. (“It works on my machine” doesn’t count.)";

export const ABOUT_STORY = [
  "At Carnegie Mellon, the same job kept showing up in different outfits: a next-best-action model with PNC, an aircraft-parts risk tool that turned into Ashe System, and a stack of analytics projects. Each time, the real work was finding the right data, running the right analysis, checking it, and explaining it to someone who had to make a call.",
  "So after graduating, I started building AMOS and asked a close friend from high school to join. We’re now four technical founders who write the product ourselves. AMOS is an AI analyst that works inside a company’s own walls: the model proposes the work, and AMOS checks permissions, runs the math with real tools, and ties every claim to evidence.",
  "Outside of AMOS, I’m building Assay, a local lab that checks an AI analyst’s numbers against the query behind them before a report can be released. I’m also fixing small things in big open-source projects, testing whether a quick touch can teach a robot how a surface will behave, and building tools for an audience of one. I used my Pokémon Go radar and my stock dashboard every day, which is the most honest user research I know.",
] as const;

export type NowItem = {
  title: string;
  detail: string;
  link: { label: string; to: string };
};

export const NOW_ITEMS: NowItem[] = [
  {
    title: "Co-founding AMOS",
    detail:
      "Verified AI analysis that runs inside a company’s own walls. We’re looking for design partners.",
    link: { label: "See AMOS", to: "/projects#amos" },
  },
  {
    title: "Building Assay",
    detail:
      "A local research system for AI data analysts: isolated SQL, claim checks, and one fenced way to release a number. The study itself is still ahead.",
    link: { label: "See Assay", to: "/projects#assay" },
  },
  {
    title: "Running Ashe System",
    detail:
      "AOG Shield spots the missing part before it grounds a plane, and shows its reasoning.",
    link: { label: "See Ashe", to: "/projects#ashe" },
  },
  {
    title: "Researching touch",
    detail:
      "Can a brief touch predict how a surface will feel and how an object will slide? Independent research, in progress.",
    link: { label: "Read the proposal", to: RESEARCH_PROPOSAL_PAGE_PATH },
  },
  {
    title: "Fixing things upstream",
    detail: `${MERGED_CONTRIBUTION_COUNT} pull requests merged into projects like Apache DataFusion, Panel, and statsmodels, with inference fixes in review at vLLM and Dynamo.`,
    link: { label: "See contributions", to: "/open-source" },
  },
];

export const QUICK_FACTS = [
  { label: "Based in", value: "Pittsburgh and San Francisco" },
  {
    label: "Studied",
    value:
      "Data analytics at Carnegie Mellon (M.S., 2026) and computer science at UC Santa Cruz (B.S., 2025)",
  },
  { label: "Speaks", value: "English and Mandarin" },
  {
    label: "Ask me about",
    value:
      "Why planes get grounded, BitTorrent internals, and what robots can learn from touch",
  },
] as const;

export const TOOLBOX = [
  {
    label: "Languages",
    items: ["Python", "TypeScript", "Rust", "SQL", "Go", "Java", "C/C++"],
  },
  {
    label: "Apps & APIs",
    items: ["React", "Next.js", "React Native", "Node.js", "FastAPI", "Axum"],
  },
  {
    label: "Data & ML",
    items: ["pandas", "Polars", "DuckDB", "Spark", "PyTorch", "XGBoost"],
  },
  {
    label: "Infrastructure",
    items: ["Docker", "Kubernetes", "Terraform", "Google Cloud", "ROS 2"],
  },
] as const;
