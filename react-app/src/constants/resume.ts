/** Index of purpose-specific résumés, matching the site's shared navigation. */
export const RESUME_PAGE_PATH = "/resume";

/** Served from site root via Vite `public/` (file: `public/Elton_Chang_Resume.pdf`). */
export const RESUME_PDF_URL = "/Elton_Chang_Resume.pdf";

export type ResumeSlug =
  | "general"
  | "software-engineering"
  | "robotics"
  | "research"
  | "data-science";

export type ResumeVersion = {
  slug: ResumeSlug;
  title: string;
  purpose: string;
  description: string;
  focus: string[];
  pdfUrl: string;
  downloadFilename: string;
};

/** Each PDF is copied from its canonical, text-based résumé by the full builder. */
export const RESUME_VERSIONS: ResumeVersion[] = [
  {
    slug: "general",
    title: "General",
    purpose: "Software, data analytics, and machine learning roles",
    description:
      "A broad overview of software development, AI systems, infrastructure experience, and selected projects.",
    focus: ["Software development", "AI systems", "Infrastructure"],
    pdfUrl: RESUME_PDF_URL,
    downloadFilename: "Elton_Chang_Resume.pdf",
  },
  {
    slug: "software-engineering",
    title: "Software Engineering",
    purpose: "Full-stack and AI engineering roles",
    description:
      "Shows full-stack web and mobile development, LLM applications, and cloud infrastructure through experience, projects, and open-source contributions.",
    focus: ["Full-stack development", "AI engineering", "Cloud infrastructure"],
    pdfUrl: "/resumes/software-engineering.pdf",
    downloadFilename: "Elton_Chang_Software_Engineering_Resume.pdf",
  },
  {
    slug: "robotics",
    title: "Robotics Research",
    purpose: "Robotics research assistant and engineering roles",
    description:
      "Emphasizes independent tactile prediction and contact-mechanics research, with an interest in action-conditioned world models.",
    focus: ["Tactile prediction", "Contact mechanics", "Model evaluation"],
    pdfUrl: "/resumes/robotics.pdf",
    downloadFilename: "Elton_Chang_Robotics_Research_Resume.pdf",
  },
  {
    slug: "research",
    title: "Research Engineering",
    purpose: "Research software and experimental engineering roles",
    description:
      "Leads with Squid’s C++ firmware and ROS 2 data-collection software, tactile experiments, and reproducible research tooling.",
    focus: ["C++ and ROS 2", "Experimental methods", "Reproducibility"],
    pdfUrl: "/resumes/research.pdf",
    downloadFilename: "Elton_Chang_Research_Engineering_Resume.pdf",
  },
  {
    slug: "data-science",
    title: "Data Science",
    purpose: "Data science and research analytics roles",
    description:
      "Emphasizes traceable analytics, machine-learning evaluation, data-quality checks, and agent-based policy simulation.",
    focus: ["Machine learning", "Data quality", "Policy simulation"],
    pdfUrl: "/resumes/data-science.pdf",
    downloadFilename: "Elton_Chang_Data_Science_Resume.pdf",
  },
];

export function resumePagePath(slug: ResumeSlug): string {
  return `${RESUME_PAGE_PATH}/${slug}`;
}

export function getResumeVersion(slug: string | undefined): ResumeVersion | undefined {
  return RESUME_VERSIONS.find((version) => version.slug === slug);
}
