import {
  ASSAY_REPORT_URL,
  RESEARCH_PROPOSAL_PAGE_PATH,
} from "@/constants/research";
import { TACTILE_ULTIMATE_OBJECTIVE } from "@/data/research-proposal";

export const AMOS_PAPER_URL =
  "https://github.com/EltonChang1/AMOS/blob/main/papers/AMOS_research_paper.pdf";

export type ResearchLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type ResearchEntry = {
  id: string;
  kind: string;
  title: string;
  summary: string;
  /** Prominent end-state statement. Present only for Tactile World. */
  objective?: string;
  pointsLabel?: string;
  points?: readonly string[];
  links: readonly ResearchLink[];
};

export const RESEARCH_ENTRIES: readonly ResearchEntry[] = [
  {
    id: "amos",
    kind: "Paper",
    title: "AMOS: A Memory Operating Layer for Autonomous Data Analysis",
    summary:
      "The research paper for AMOS, an internally deployed analyst system. It studies the memory and control kernel between the analyst agent and the systems it uses: bounded model-visible context, permission filtering before that context is built, verification against current schema and semantic state, and claim-level provenance with replay metadata. Raw data stays in existing platforms.",
    pointsLabel: "The paper reports",
    points: [
      "Every outcome on a 12-task invariant benchmark, compared with 6 of 12 for the strongest local baseline.",
      "All twelve seeded capability-contract variants in each of three domains — payment failure, subscription churn, and warehouse quality — across three deterministic repetitions.",
      "Indexed studies of 1,000,001 memory objects and 1,000,000 provenance edges. A governed retrieval comparison through 100,000 distractors reports zero restricted-item or superseded-item leaks.",
    ],
    links: [
      { label: "Read the paper", href: AMOS_PAPER_URL, external: true },
      { label: "See the project", href: "/projects#amos" },
    ],
  },
  {
    id: "tactile-world",
    kind: "Proposal",
    title: "Tactile World",
    objective: TACTILE_ULTIMATE_OBJECTIVE,
    summary:
      "The current question is narrower: can a brief touch build a reusable model of a surface that predicts what a new action will feel like and how the object will move? Recorded-data vibration prediction, contact-mechanics software, and collection tooling are in place. Physical force and free-motion validation are still ahead.",
    links: [
      {
        label: "Read the proposal",
        href: `${RESEARCH_PROPOSAL_PAGE_PATH}#question`,
      },
      {
        label: "Study and code",
        href: "https://github.com/EltonChang1/tactile-contact-research",
        external: true,
      },
    ],
  },
  {
    id: "assay",
    kind: "Report",
    title: "Assay",
    summary:
      "Assay asks whether executable checks and data provenance reduce unsupported quantitative conclusions from an AI data analyst, while still keeping useful answers. The technical report records a repaired relation-binding gap and a fresh local run of 441 passing tests, including 28 real Docker cases. A 24-episode development pilot called gpt-5.4-mini; every episode used its six analyst calls and stopped before any claim, so nothing was released and the reviewer comparison did not run. The confirmation study is still ahead, so this is not a safety result.",
    pointsLabel: "The report records",
    points: [
      "October 18 local validation: 441 passes, one Windows-inapplicable skip, and all 28 real Docker cases.",
      "A common table expression that shadows the public tables, or a positional column alias, can change the measured population. Those shapes now return unknown on the query-semantic checks, and the checked publisher withholds.",
      "October 19 development pilot: 24 assigned episodes, 144 calls to gpt-5.4-mini, zero claims, zero reviews, and zero releases. Required-answer coverage on that list is 0/24.",
    ],
    links: [
      { label: "Read the report", href: ASSAY_REPORT_URL, external: true },
      { label: "See the project", href: "/projects#assay" },
      {
        label: "Read the charter",
        href: "https://github.com/EltonChang1/Assay/blob/main/docs/CHARTER.md",
        external: true,
      },
    ],
  },
];
