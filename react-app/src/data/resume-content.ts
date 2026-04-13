export const RESUME_HEADER = {
  name: "Elton Chang",
  title: "Data Analytics & Software Engineering",
  phone: "(510) 513-2561",
  email: "eltonchangtac@gmail.com",
} as const;

export const PROFESSIONAL_SUMMARY =
  "Master's student in Data Analytics with strong software engineering fundamentals and hands-on experience in data preprocessing, machine learning, and system optimization. Proven track record at Wintec Industries and UC Santa Cruz in building scalable systems, implementing advanced ML models, and improving operational efficiency. Passionate about leveraging data-driven insights and cutting-edge technologies to solve complex real-world problems.";

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
    date: "September 2024 - June 2025",
    bullets: [
      "Preprocessed and structured over 600 files, enabling clean, analyzable datasets to accelerate faculty research",
      "Optimized data pipelines for large-scale experiments, cutting dataset preparation time from several hours to under 30 minutes",
      "Implemented convolutional neural networks for image classification, boosting prediction accuracy from baseline 65% to over 85%",
    ],
    tech: ["Python", "TensorFlow", "CNN", "Data Processing"],
  },
  {
    role: "Software Engineer Intern",
    company: "Wintec Industries Inc.",
    date: "July 2023 - September 2023",
    bullets: [
      "Built and automated backup & recovery pipelines for internal storage systems, cutting potential data loss incidents by ~80%",
      "Migrated legacy on-premise servers to cloud-based environment, enabling scalable data management and reducing maintenance overhead",
      "Enhanced system performance and security by refactoring critical code (10-30% faster processing) and implementing encryption protocols",
    ],
    tech: ["AWS", "Python", "Encryption", "DevOps"],
  },
  {
    role: "Software Engineer Intern",
    company: "Wintec Industries Inc.",
    date: "July 2022 - September 2022",
    bullets: [
      "Developed internal file management platform to process and organize company data daily, improving operational efficiency",
      "Created comprehensive technical documentation and user guides, boosting first-time user efficiency by ~35%",
      "Introduced role-based permissions and encryption layers to safeguard sensitive files with strong access control measures",
    ],
    tech: ["Java", "SQL", "Security", "Documentation"],
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
    title: "Torflix",
    description:
      "Local-first BitTorrent: Python engine and FastAPI daemon plus a React UI for catalog browsing, downloads, and watch-while-downloading in the browser — your machine runs the swarm",
    stats: ["Systems", "Full-Stack"],
    href: "/projects#torflix",
    icon: "film",
  },
  {
    title: "Quantifying Meritocracy (Research)",
    description:
      "Extended the Talent vs. Luck model with a solidarity parameter, applying statistical modeling and agent-based simulations to analyze systemic drivers of inequality",
    stats: ["Research", "Data Analysis"],
    href: "/projects#meritocracy",
    icon: "microscope",
  },
  {
    title: "MarketPulse AI",
    description:
      "Full-stack market intelligence app: accounts, home watchlist screener, portfolio analytics with benchmark charts, multi-horizon predictions and key signals, TradingView Classic workspace, technical indicators, narrative analysis, news, and context-aware Ask AI",
    stats: ["Full-Stack", "AI/ML"],
    href: "/projects#marketpulse",
    icon: "chart",
  },
  {
    title: "SCHouse (Entrepreneurial)",
    description:
      "Launched a housing marketplace for Santa Cruz applying data-driven analytics and matchmaking algorithms to improve transparency for renters and landlords",
    stats: ["Entrepreneurial", "Data Analytics"],
    icon: "home",
  },
  {
    title: "Pokemon Finder App",
    description:
      "Full-stack application with real-time Pokémon tracking, interactive maps, and GPS route management",
    stats: ["Full-Stack", "MERN Stack"],
    href: "/projects#pokefind",
    icon: "map",
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
      "Large Scale Computing, Computational Modeling, Computational Linear Algebra, Information Visualization, Neural Networks and Deep Learning",
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
    title: "Backend & Data Science",
    icon: "database",
    skills: [
      { name: "Python", level: "Expert", percent: 95 },
      { name: "Machine Learning & Neural Networks", level: "Advanced", percent: 90 },
      { name: "TensorFlow & PyTorch", level: "Advanced", percent: 88 },
      { name: "SQL & Data Pipeline", level: "Advanced", percent: 85 },
    ],
  },
  {
    title: "Frontend & Web",
    icon: "code",
    skills: [
      { name: "React & JavaScript", level: "Advanced", percent: 85 },
      { name: "Node.js & Express", level: "Advanced", percent: 80 },
      { name: "HTML, CSS & Responsive Design", level: "Advanced", percent: 82 },
      { name: "MongoDB & NoSQL", level: "Proficient", percent: 75 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "gears",
    skills: [
      { name: "Git & Version Control", level: "Advanced", percent: 85 },
      { name: "Docker & Cloud Deploy", level: "Proficient", percent: 75 },
      { name: "Linux & CLI", level: "Advanced", percent: 80 },
    ],
  },
];

export const INTERESTS = [
  "Machine Learning",
  "Data Analytics",
  "System Design",
  "Startups",
  "Research",
  "Collaboration",
] as const;

export const TECHNICAL_AREAS = [
  "Deep Learning & Neural Networks",
  "High-Performance Computing",
  "NLP & LLM Optimization",
  "Statistical Modeling",
] as const;

export const LANGUAGES: { name: string; filled: number }[] = [
  { name: "English", filled: 5 },
  { name: "Mandarin Chinese", filled: 4 },
];
