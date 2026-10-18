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
  "I work on AI interpretability and tactile representation for physics engines.";

export const ABOUT_STORY = [
  "I enjoy reading, recently about existential philosophy. Recently read includes Nietzsche’s Thus Spoke Zarathustra, Kierkegaard’s Fear and Trembling, Camus’s The Myth of Sisyphus, and Sartre’s Nausea.",
  "I still build for an audience of one. My Pokémon Go radar and stock dashboard got daily use, which is the most honest review I know.",
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
