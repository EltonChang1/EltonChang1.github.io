import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  Calendar,
  ChartLine,
  CheckCircle2,
  Code2,
  Database,
  Download,
  Briefcase,
  GraduationCap,
  Layers,
  Home,
  Mail,
  MapPin,
  Microscope,
  Phone,
  Settings2,
  User,
} from "lucide-react";

import { IconGithub, IconLinkedin } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RESUME_PDF_URL } from "@/constants/resume";
import { LINKEDIN_URL } from "@/constants/social";
import {
  EDUCATION,
  EXPERIENCE,
  INTERESTS,
  LANGUAGES,
  PROFESSIONAL_SUMMARY,
  RESUME_HEADER,
  RESUME_PROJECTS,
  SKILL_CATEGORIES,
  TECHNICAL_AREAS,
  type ResumeProjectCard,
} from "@/data/resume-content";
import { cn } from "@/lib/utils";

const projectIcons: Record<
  ResumeProjectCard["icon"],
  React.ComponentType<{ className?: string }>
> = {
  microscope: Microscope,
  chart: ChartLine,
  home: Home,
  map: MapPin,
};

const categoryIcons = {
  database: Database,
  code: Code2,
  gears: Settings2,
} as const;

function SkillBar({
  name,
  level,
  percent,
}: {
  name: string;
  level: string;
  percent: number;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <Badge variant="outline" className="text-[10px] font-normal">
          {level}
        </Badge>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary/80"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export function ResumePage() {
  useEffect(() => {
    document.title = "Resume — Elton Chang";
  }, []);

  return (
    <div className="relative min-h-full bg-background">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <header className="mb-12 text-center md:mb-16">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {RESUME_HEADER.name}
          </h1>
          <p className="mb-6 text-lg text-primary md:text-xl">
            {RESUME_HEADER.title}
          </p>
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <a
              href={`tel:${RESUME_HEADER.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Phone className="h-4 w-4 shrink-0 text-primary" />
              {RESUME_HEADER.phone}
            </a>
            <a
              href={`mailto:${RESUME_HEADER.email}`}
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="h-4 w-4 shrink-0 text-primary" />
              {RESUME_HEADER.email}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" className="gap-2" asChild>
              <a href={`mailto:${RESUME_HEADER.email}`}>
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a
                href="https://github.com/EltonChang1"
                target="_blank"
                rel="noreferrer"
              >
                <IconGithub className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                <IconLinkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <a href={RESUME_PDF_URL} download>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Main column */}
          <div className="space-y-12">
            <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                <User className="h-5 w-5 text-primary" />
                Professional Summary
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {PROFESSIONAL_SUMMARY}
              </p>
            </section>

            <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-8 flex items-center gap-2 text-xl font-semibold text-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
                Experience
              </h2>
              <div className="space-y-6">
                {EXPERIENCE.map((job, i) => (
                  <div
                    key={`${job.company}-${i}`}
                    className="rounded-xl border border-border/60 bg-muted/15 p-5 md:p-6"
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {job.role}
                    </h3>
                    <p className="mb-1 font-medium text-primary">{job.company}</p>
                    <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {job.date}
                    </p>
                    <ul className="mb-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
                      {job.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                <Layers className="h-5 w-5 text-primary" />
                Featured Projects
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {RESUME_PROJECTS.map((p) => {
                  const Icon = projectIcons[p.icon];
                  return (
                    <div
                      key={p.title}
                      className="flex flex-col rounded-xl border border-border/60 bg-muted/20 p-4"
                    >
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 font-semibold text-foreground">
                        {p.title}
                      </h3>
                      <p className="mb-3 flex-1 text-sm text-muted-foreground">
                        {p.description}
                      </p>
                      <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {p.stats.map((s) => (
                          <span
                            key={s}
                            className="rounded-md bg-background/80 px-2 py-0.5"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      {p.href ? (
                        <Button variant="outline" size="sm" className="mt-auto w-fit gap-1" asChild>
                          <Link to={p.href}>
                            View Details
                            <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm md:p-8">
              <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-foreground">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h2>
              <div className="space-y-8">
                {EDUCATION.map((ed) => (
                  <div key={ed.school}>
                    <h3 className="text-lg font-semibold text-foreground">
                      {ed.degree}
                    </h3>
                    <p className="font-medium text-primary">{ed.school}</p>
                    <p className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {ed.dateLocation}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Relevant Coursework:{" "}
                      </span>
                      {ed.coursework}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <Brain className="h-5 w-5 text-primary" />
                Core Competencies
              </h3>
              <div className="space-y-8">
                {SKILL_CATEGORIES.map((cat) => {
                  const CatIcon = categoryIcons[cat.icon];
                  return (
                    <div key={cat.title}>
                      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
                        <CatIcon className="h-4 w-4 text-primary" />
                        {cat.title}
                      </div>
                      <div className="space-y-4">
                        {cat.skills.map((s) => (
                          <SkillBar
                            key={s.name}
                            name={s.name}
                            level={s.level}
                            percent={s.percent}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <ChartLine className="h-5 w-5 text-primary" />
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <Badge key={i} variant="secondary">
                    {i}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Technical Areas
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {TECHNICAL_AREAS.map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Languages
              </h3>
              <div className="space-y-3">
                {LANGUAGES.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <span className="text-foreground">{lang.name}</span>
                    <div className="flex gap-1" aria-hidden>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-2 w-2 rounded-full",
                            i < lang.filled ? "bg-primary" : "bg-muted",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
