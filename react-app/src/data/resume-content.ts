import { SITE_EMAIL } from "@/constants/social";

export const RESUME_HEADER = {
  name: "Elton Chang",
  title: "Governed AI Systems, Data Analytics & Software Engineering",
  phone: "(510) 513-2561",
  email: SITE_EMAIL,
} as const;

export const PROFESSIONAL_SUMMARY =
  "Carnegie Mellon M.S. graduate in Data Analytics for Science and co-founder of AMOS, focused on governed AI systems, scalable data pipelines, production machine learning, and reliable software. Built products spanning verified enterprise analysis, aviation risk decision support, local-first data evidence, infrastructure automation, and applied ML.";

export type ExperienceItem = {
  role: string;
  company: string;
  date: string;
  bullets: string[];
  tech: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Co-Founder",
    company: "AMOS",
    date: "2026 – Present",
    bullets: [
      "Co-founded an internally deployed analyst system that connects to company data and tools, performs verified analysis, and produces reviewable charts, reports, and presentation plans",
      "Built the Rust control-layer foundation for permission-first context, governed execution, typed claims, evidence, review, invalidation, replay, and customer-controlled deployment",
    ],
    tech: ["Rust", "Axum", "SQLite", "AI governance"],
  },
  {
    role: "Founder / Technical Lead",
    company: "Ashe System",
    date: "August 2025 – Present",
    bullets: [
      "Modeled up to $15K per month in avoidable downtime opportunity per operator with a 1.2K+ record risk-engine demonstration that flags grounding risk, diagnoses causes, and recommends preventive actions",
      "Translated validation with cargo and small-aircraft owner-operators into more than 50 MVP requirements across maintenance, inventory, suppliers, certification, and scheduling",
    ],
    tech: ["Python", "FastAPI", "Next.js", "Decision support"],
  },
  {
    role: "Undergraduate Research Assistant",
    company: "University of California, Santa Cruz",
    date: "September 2024 – June 2025",
    bullets: [
      "Developed scalable and automated data pipelines to clean, standardize, and structure around 600 research files (~24 GB) of data, cutting processing time from days of manual work to under an hour",
      "Optimized CNN-based image classification models, improving predictive accuracy from 63% to 82%",
    ],
    tech: ["Python", "CNN", "Data pipelines", "TensorFlow"],
  },
  {
    role: "Infrastructure Engineer Intern",
    company: "Wintec Industries Inc.",
    date: "July 2023 – September 2023",
    bullets: [
      "Implemented IaC-defined provisioning for non-production testing environments, standardizing builds and reducing manual configuration drift across 15+ hosts",
      "Engineered telemetry and alerting across enterprise backup and replication pipelines, turning operational signals into reliability dashboards and cutting anomaly detection time by 40%",
    ],
    tech: ["IaC", "Telemetry", "Monitoring", "Networking"],
  },
  {
    role: "Software Engineer Intern",
    company: "Wintec Industries Inc.",
    date: "July 2022 – September 2022",
    bullets: [
      "Built an internal file management system on cloud infrastructure for elastic capacity, with a pipeline for automated ingestion, metadata indexing, and lifecycle tracking of company data",
      "Created developer- and user-facing documentation for platform architecture, workflows, and system usage, improving onboarding and adoption by 35%",
    ],
    tech: ["Cloud", "Java", "Documentation", "SQL"],
  },
];

export type ResumeProjectCard = {
  title: string;
  description: string;
  stats: string[];
  href?: string;
  icon: "microscope" | "chart" | "home" | "map" | "film" | "shield";
};

export const RESUME_PROJECTS: ResumeProjectCard[] = [
  {
    title: "AMOS",
    description:
      "An internally deployed AI analyst with a Rust control layer for permissions, governed execution, verified claims, review, invalidation, replay, and customer-controlled deployment.",
    stats: ["Rust", "Governed AI"],
    href: "/projects#amos",
    icon: "shield",
  },
  {
    title: "Next Best Action (PNC collaboration)",
    description:
      "A product-adoption ranking pipeline using HistGradientBoosting, LightGBM, XGBoost, and an ensemble strategy; achieved 0.811 ROC AUC and a 95% top-three hit rate on supported recommendations.",
    stats: ["0.811 ROC AUC", "95% Top-3"],
    href: "/projects#next-best-action",
    icon: "chart",
  },
  {
    title: "TraceFrame (open source)",
    description:
      "A local-first evidence tracker for data science workflows that records datasets, transforms, SQL outputs, metrics, charts, claims, checks, and lineage under a project-local `.traceframe/` directory — no cloud or telemetry by default.",
    stats: ["Data Science", "Python"],
    href: "/projects#traceframe",
    icon: "microscope",
  },
  {
    title: "Torflix (open source)",
    description:
      "A BitTorrent-backed movie library with a FastAPI service that owns swarm I/O, storage, and progressive streaming, plus web clients for catalog, magnet enqueue, and playback while transfers complete.",
    stats: ["Systems", "Full-Stack"],
    href: "/projects#torflix",
    icon: "film",
  },
  {
    title: "Quantifying Meritocracy (research)",
    description:
      "Extended the University of Catania’s Talent vs. Luck model by introducing a solidarity parameter and applying statistical modeling with agent-based simulations to quantify systemic drivers of inequality.",
    stats: ["Research", "Simulation"],
    href: "/projects#meritocracy",
    icon: "microscope",
  },
];

export type EducationItem = {
  degree: string;
  school: string;
  dateLocation: string;
  coursework: string;
};

export const EDUCATION: EducationItem[] = [
  {
    degree: "Master of Science in Data Analytics for Science, GPA: 3.97/4.0",
    school: "Carnegie Mellon University",
    dateLocation: "May 2026 | Pittsburgh, PA",
    coursework:
      "Competition Programming, Large Scale Computing, Neural Networks & Deep Learning, Machine Learning in Production, Computational Modeling, Computational Linear Algebra",
  },
  {
    degree: "Bachelor of Science in Computer Science, GPA: 3.7/4.0",
    school: "University of California, Santa Cruz",
    dateLocation: "June 2025 | Santa Cruz, CA",
    coursework:
      "Data Structures & Algorithms, Computer Systems Design & Assembly Language, Computer Architecture, Applied Machine Learning, Web Applications, Probability Theory",
  },
];

export type SkillEntry = { name: string; level: string; percent: number };

export type SkillCategory = {
  title: string;
  icon: "database" | "code" | "gears";
  skills: SkillEntry[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & data",
    icon: "database",
    skills: [
      { name: "Python", level: "Advanced", percent: 92 },
      { name: "TypeScript", level: "Advanced", percent: 85 },
      { name: "Rust", level: "Advanced", percent: 84 },
      { name: "C / C++ / Go / Java", level: "Proficient", percent: 82 },
      { name: "SQL", level: "Advanced", percent: 86 },
    ],
  },
  {
    title: "Web & interfaces",
    icon: "code",
    skills: [
      { name: "React", level: "Advanced", percent: 86 },
      { name: "Next.js", level: "Advanced", percent: 82 },
      { name: "Vue", level: "Proficient", percent: 76 },
    ],
  },
  {
    title: "Engineering focus",
    icon: "gears",
    skills: [
      { name: "Full-stack development", level: "Advanced", percent: 88 },
      { name: "Governed AI systems", level: "Advanced", percent: 86 },
      { name: "RESTful API design", level: "Advanced", percent: 84 },
      { name: "Database architecture", level: "Advanced", percent: 82 },
      { name: "System design", level: "Advanced", percent: 82 },
    ],
  },
];

export const INTERESTS = [
  "Governed AI",
  "Machine Learning",
  "Data Analytics",
  "System Design",
  "Open Source",
  "Research",
  "Collaboration",
] as const;

export const TECHNICAL_AREAS = [
  "Governed AI and evidence systems",
  "Large-scale computing",
  "Machine learning in production",
  "System design & reliability",
  "Full-stack web applications",
] as const;

export const LANGUAGES: { name: string; filled: number }[] = [
  { name: "English", filled: 5 },
  { name: "Mandarin Chinese", filled: 4 },
];
