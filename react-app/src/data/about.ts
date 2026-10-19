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

export const RECENTLY_READ_PAPERS = [
  {
    topic: "AI safety",
    papers: [
      {
        title: "Constitutional AI: Harmlessness from AI Feedback",
        href: "https://arxiv.org/abs/2212.08073",
      },
      {
        title: "Sleeper Agents: Training Deceptive LLMs that Persist Through Safety Training",
        href: "https://arxiv.org/abs/2401.05566",
      },
    ],
  },
  {
    topic: "Tactile sensing",
    papers: [
      {
        title: "DIGIT: A Novel Design for a Low-Cost Compact High-Resolution Tactile Sensor with Application to In-Hand Manipulation",
        href: "https://arxiv.org/abs/2005.14679",
      },
      {
        title: "AnySkin: Plug-and-play Skin Sensing for Robotic Touch",
        href: "https://arxiv.org/abs/2409.08276",
      },
    ],
  },
] as const;
