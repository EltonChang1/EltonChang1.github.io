import { SITE_EMAIL } from "@/constants/social";

export const RESUME_HEADER = {
  name: "Elton Chang",
  title: "Data Analytics & Software Engineering",
  phone: "(510) 513-2561",
  email: SITE_EMAIL,
} as const;

export const PROFESSIONAL_SUMMARY =
  "M.S. student in Data Analytics for Science at Carnegie Mellon, focused on scalable data pipelines, production machine learning, and reliable systems. Research experience automating large research corpora and improving CNN accuracy; industry internships spanning IaC-backed infrastructure, telemetry for backup pipelines, and cloud file platforms with strong documentation.";

export type ExperienceItem = {
  role: string;
  company: string;
  date: string;
  bullets: string[];
  tech: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
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
  icon: "microscope" | "chart" | "home" | "map" | "film";
};

export const RESUME_PROJECTS: ResumeProjectCard[] = [
  {
    title: "Next Best Action (PNC collaboration)",
    description:
      "An intelligent next-best-action engine for PNC Bank that uses client financial behavior, product holdings, and engagement signals to predict the most relevant high-impact opportunity for advisor outreach.",
    stats: ["ML", "Finance"],
    icon: "chart",
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
    title: "MarketPulse (public website)",
    description:
      "An end-to-end equity intelligence desk that unifies live market views, portfolio analytics, technical signals, and a contextual AI research copilot in one polished full-stack application.",
    stats: ["Full-Stack", "AI/ML"],
    href: "/projects#marketpulse",
    icon: "chart",
  },
  {
    title: "Zoe (entrepreneurial)",
    description:
      "A mobile social app where people discover lifestyle ideas, capture what they love in ranked lists, and follow how friends’ and creators’ tastes evolve—a living taste graph rather than generic feeds alone.",
    stats: ["Mobile", "Product"],
    href: "/projects#zoe",
    icon: "home",
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
    degree: "Master of Science in Data Analytics for Science, GPA: 4.0/4.0",
    school: "Carnegie Mellon University",
    dateLocation: "Expected May 2026 | Pittsburgh, PA",
    coursework:
      "Algorithm Design & Analysis, Competition Programming, Large Scale Computing, Neural Networks & Deep Learning, Machine Learning in Production, Computational Modeling",
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
      { name: "C / C++ / Go / Java", level: "Advanced", percent: 85 },
      { name: "SQL & Spark", level: "Advanced", percent: 86 },
      { name: "R", level: "Proficient", percent: 78 },
    ],
  },
  {
    title: "Web & interfaces",
    icon: "code",
    skills: [
      { name: "React", level: "Advanced", percent: 86 },
      { name: "Vue", level: "Proficient", percent: 76 },
    ],
  },
  {
    title: "Engineering focus",
    icon: "gears",
    skills: [
      { name: "Full-stack development", level: "Advanced", percent: 88 },
      { name: "Large-scale computing", level: "Advanced", percent: 85 },
      { name: "Machine learning", level: "Advanced", percent: 88 },
      { name: "System design", level: "Advanced", percent: 82 },
    ],
  },
];

export const INTERESTS = [
  "Machine Learning",
  "Data Analytics",
  "System Design",
  "Open Source",
  "Research",
  "Collaboration",
] as const;

export const TECHNICAL_AREAS = [
  "Large-scale computing",
  "Machine learning in production",
  "System design & reliability",
  "Full-stack web applications",
] as const;

export const LANGUAGES: { name: string; filled: number }[] = [
  { name: "English", filled: 5 },
  { name: "Mandarin Chinese", filled: 4 },
];
