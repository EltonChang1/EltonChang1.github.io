/** Public research summary: implementation and evaluation scope reviewed 2026-10-13. */
export const PROPOSAL_UPDATED = "2026-10-13";

export const PROPOSAL_SECTIONS = [
  { id: "question", label: "Research question" },
  { id: "context", label: "Context" },
  { id: "completed", label: "Completed work" },
  { id: "aims", label: "Specific aims" },
  { id: "evaluation", label: "Evaluation" },
  { id: "milestones", label: "Milestones" },
  { id: "feasibility", label: "Feasibility" },
  { id: "references", label: "References" },
] as const;

export const COMPLETED_WORK = [
  {
    title: "Brief-touch prediction",
    status: "Recorded-data development",
    description:
      "Built a Python/PyTorch vibration-prediction pipeline; reproduced 1,878 sensor windows and 22 saved prediction arrays. Retrieval leads the current encoder. Evaluation specimens were reused; reserved-specimen testing remains pending.",
    sources: [
      { label: "Study and code", url: "https://github.com/EltonChang1/tactile-contact-research" },
      { label: "Verification", url: "https://github.com/EltonChang1/tactile-contact-research/blob/main/docs/matched_validation_review.md" },
    ],
  },
  {
    title: "Contact mechanics",
    status: "Software and synthetic pilot",
    description:
      "Implemented eight force estimators and controls, calibrated-data import, and analytical stopping/release calculations. A 450-trial synthetic pilot exercised the pipeline. Physical force and free-motion validation remain pending.",
    sources: [
      { label: "Code and report", url: "https://github.com/EltonChang1/brief-touch-mechanics/blob/main/docs/execution-report.md" },
    ],
  },
  {
    title: "Squid collection stack",
    status: "Software and mechanical design",
    description:
      "Built RP2040 firmware, ROS 2 publishers, MCAP logging, synchronization/fault-injection tools, and mechanical design files. Physical assembly, calibration, and measured acquisition performance still require validation.",
    sources: [
      { label: "Collection stack", url: "https://github.com/EltonChang1/squid" },
      { label: "Verification scope", url: "https://github.com/EltonChang1/squid/blob/main/docs/verification.md" },
    ],
  },
  {
    title: "Data foundations",
    status: "Tools and proposed protocol",
    description:
      "Built tactile ingestion/export tools, published-dataset adapters, and Open X-Embodiment interfaces. Drafted a synchronized-contact protocol and data contract. Dataset coverage, new physical recordings, and tactile policy training remain separate milestones.",
    sources: [
      { label: "Data toolkit", url: "https://github.com/EltonChang1/tactile-data-toolkit" },
      { label: "Protocol proposal", url: "https://github.com/EltonChang1/tactile-collection-standard/blob/main/docs/PROPOSAL.md" },
    ],
  },
] as const;

export const RESEARCH_AIMS = [
  {
    title: "Calibrate contact prediction",
    description:
      "Measure whether brief touch improves vibration and tangential-force prediction across unseen surfaces and motion conditions. Produce a calibrated dataset and a reproducible baseline comparison.",
  },
  {
    title: "Represent an object's surface",
    description:
      "Attach local tactile and mechanical properties, with uncertainty, to a registered 3D object. Test held-out surface locations before combining objects into a reusable asset library.",
  },
  {
    title: "Predict the consequences of actions",
    description:
      "Couple surface maps to a physics engine. Validate free sliding and stopping before evaluating a bounded slide-to-target task, then extend to room scenes and multi-step rollouts.",
  },
] as const;

export const EVALUATION_PLAN = [
  {
    output: "Vibration",
    comparison: "Retrieval, regression, encoder; matched support budgets",
    measures: "Log-spectrum MAE and relative RMS-amplitude error; unseen specimens/actions",
  },
  {
    output: "Contact force",
    comparison: "Global friction; conditions/force-only vs tactile-assisted estimators; wrong-support controls",
    measures: "Group-balanced force MAE (N); whole-surface and session holdouts",
  },
  {
    output: "Motion and task",
    comparison: "Constant-friction dynamics and the coupled contact model",
    measures: "Trajectory, stopping and target error (mm); task success and runtime",
  },
] as const;

export const RESEARCH_MILESTONES = [
  {
    title: "Freeze the scientific study",
    exit: "Lock support/query rules, complete familiar-condition coverage, and score the 20 reserved specimens with a frozen protocol.",
  },
  {
    title: "Measure one controlled contact pair",
    exit: "Calibrate force, position and timing; collect repeatable sliding trials with one known pad and registered surface.",
  },
  {
    title: "Validate one reusable asset",
    exit: "Test local maps, independent free-motion trials, engine calibration, and one matched slide-to-target task.",
  },
  {
    title: "Expand to a tactile world",
    exit: "Add heterogeneous objects and spatially varying surfaces; evaluate held-out locations, room scenes and multi-step action rollouts.",
  },
] as const;

export const RESEARCH_RISKS = [
  {
    title: "Ambiguous contact parameters",
    response: "Control pad, geometry and load; add measurements when friction cannot be separated from contact conditions.",
  },
  {
    title: "Weak generalization",
    response: "Keep the strongest simple baseline and narrow the asset scope if learned models fail on held-out data.",
  },
  {
    title: "Simulation mismatch",
    response: "Calibrate independently; retain a prediction benchmark if coupling does not improve physical task outcomes.",
  },
] as const;

export const SCIENTIFIC_REFERENCES = [
  { title: "Touch and Go", year: "2022", description: "Human-collected paired vision and touch in natural environments.", url: "https://touch-and-go.github.io/" },
  { title: "Sparsh", year: "2024", description: "Self-supervised representations and benchmarks for vision-based tactile sensors.", url: "https://sparsh-ssl.github.io/" },
  { title: "TacSL", year: "2024; revised 2025", description: "Visuotactile sensor simulation and learning for contact-rich manipulation.", url: "https://arxiv.org/abs/2408.06506" },
  { title: "ContactWorld", year: "2026, preprint", description: "Representation comparisons for vision-tactile world models and predictive planning.", url: "https://arxiv.org/abs/2606.13877" },
] as const;

export const PROPOSAL_WRITING_REFERENCES = [
  { title: "MIT EECS", url: "https://mitcommlab.mit.edu/eecs/commkit/thesis-proposal/" },
  { title: "Stanford", url: "https://undergradresearch.stanford.edu/apply/writing-project-proposal/detailed-project-proposal-guidelines" },
  { title: "DARPA's Heilmeier questions", url: "https://www.darpa.mil/about/heilmeier-catechism" },
] as const;
