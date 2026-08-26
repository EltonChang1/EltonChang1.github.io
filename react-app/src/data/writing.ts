export type EvidenceLink = {
  label: string;
  href: string;
};

export type EvidenceItem = {
  kind: string;
  title: string;
  description: string;
  meta: string;
  links: EvidenceLink[];
};

export const WRITING_AND_EVIDENCE: EvidenceItem[] = [
  {
    kind: "Research paper",
    title: "AMOS: A Memory Operating Layer for Autonomous Data Analysis",
    description:
      "Formalizes the governed memory and control layer behind AMOS, then evaluates correctness, auditability, replay, retrieval quality, and indexed scaling behavior.",
    meta: "21 pages · Systems research · 12-task benchmark",
    links: [
      {
        label: "Read the paper",
        href: "https://github.com/EltonChang1/AMOS/blob/main/papers/AMOS_research_paper.pdf",
      },
    ],
  },
  {
    kind: "Architecture guide",
    title: "AMOS Product Architecture + Rust Reference",
    description:
      "A production-oriented build guide covering analytical-state transactions, data and connector contracts, verification, security, deployment, operations, and quality gates.",
    meta: "63 pages · Architecture · Implementation contracts",
    links: [
      {
        label: "Open the architecture",
        href: "https://amoslabs.dev/amos-technical-architecture.pdf",
      },
    ],
  },
  {
    kind: "Reproducible research",
    title: "Quantifying Meritocracy: Talent, Luck, and Solidarity",
    description:
      "An agent-based simulation study extending the Talent vs. Luck model with redistribution, mobility, timing, and policy experiments.",
    meta: "Python · Statistical analysis · Agent-based modeling",
    links: [
      {
        label: "Read results",
        href: "https://github.com/EltonChang1/Quantifying-Meritocracy-TvL-Solidarity/blob/main/RESULTS.md",
      },
      {
        label: "View repository",
        href: "https://github.com/EltonChang1/Quantifying-Meritocracy-TvL-Solidarity",
      },
    ],
  },
  {
    kind: "Product evidence",
    title: "Reports That Show the Work",
    description:
      "Public examples of how the products communicate evidence: an AOG Shield product brief and readiness report, plus TraceFrame audit reports with lineage, checks, and claims.",
    meta: "Decision support · Auditability · Technical communication",
    links: [
      {
        label: "AOG product brief",
        href: "https://ashesystem.com/ashe-system-product-brief.pdf",
      },
      {
        label: "AOG sample report",
        href: "https://ashesystem.com/sample-aog-readiness-report.pdf",
      },
      {
        label: "TraceFrame audit",
        href: "/traceframe-ecommerce-audit.html",
      },
    ],
  },
];
