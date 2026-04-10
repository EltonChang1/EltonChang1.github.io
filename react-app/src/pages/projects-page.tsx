import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  CircleCheck,
  Clock,
  Code2,
  Filter,
  FlaskConical,
  Globe,
  LineChart,
  MapPin,
  Maximize2,
  Newspaper,
  Users,
  X,
} from "lucide-react";

import { BrandMark } from "@/components/brand-logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type ProjectDefinition,
  type ProjectId,
  PROJECTS,
  type StatIcon,
} from "@/data/projects";
import { cn } from "@/lib/utils";

const statIcons: Record<
  StatIcon,
  React.ComponentType<{ className?: string }>
> = {
  globe: Globe,
  chart: LineChart,
  news: Newspaper,
  users: Users,
  flask: FlaskConical,
  briefcase: Briefcase,
  filter: Filter,
  check: CircleCheck,
  code: Code2,
  map: MapPin,
  clock: Clock,
};

const PROJECT_IDS: ProjectId[] = [
  "marketpulse",
  "meritocracy",
  "jobsearch",
  "pokefind",
];

function isProjectId(s: string): s is ProjectId {
  return PROJECT_IDS.includes(s as ProjectId);
}

function ExpandedPanel({ project, onClose }: { project: ProjectDefinition; onClose: () => void }) {
  const e = project.expanded;

  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-md md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {e.title}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-full"
          onClick={onClose}
          aria-label="Close details"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {e.featureList && e.featureList.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            Key Features
          </h3>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {e.featureList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {e.overviewParagraphs && (
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Overview</h3>
          {e.overviewParagraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      )}

      {e.findingsList && e.findingsList.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-3 text-lg font-semibold text-foreground">
            Key Findings
          </h3>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            {e.findingsList.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {e.methodologyParagraphs && e.methodologyParagraphs.length > 0 && (
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Methodology</h3>
          {e.methodologyParagraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      )}

      {e.techDetails && e.techDetails.length > 0 && (
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {e.techDetails.map((col) => (
            <div key={col.title}>
              <h4 className="mb-2 font-semibold text-foreground">{col.title}</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
                {col.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {e.screenshots.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Screenshots
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {e.screenshots.map((shot) => (
              <figure
                key={shot.src}
                className="overflow-hidden rounded-xl border border-border/80 bg-muted/20"
              >
                <img
                  src={shot.src}
                  alt={shot.caption}
                  className="aspect-video w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="p-3 text-center text-sm text-muted-foreground">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {e.links.map((l) =>
          l.external || l.href.startsWith("http") ? (
            <Button key={l.label} size="lg" asChild>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </Button>
          ) : l.href.endsWith(".html") ? (
            <Button key={l.label} size="lg" variant="secondary" asChild>
              <a href={l.href}>{l.label}</a>
            </Button>
          ) : (
            <Button key={l.label} size="lg" variant="outline" asChild>
              <Link to={l.href}>{l.label}</Link>
            </Button>
          ),
        )}
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const [expandedId, setExpandedId] = useState<ProjectId | null>(null);

  const toggle = useCallback((id: ProjectId) => {
    setExpandedId((cur) => (cur === id ? null : id));
  }, []);

  const close = useCallback(() => setExpandedId(null), []);

  useEffect(() => {
    const raw = window.location.hash.replace("#", "");
    if (raw && isProjectId(raw)) {
      setExpandedId(raw);
    }
  }, []);

  useEffect(() => {
    if (!expandedId) return;
    const t = window.setTimeout(() => {
      document
        .getElementById(`project-${expandedId}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(t);
  }, [expandedId]);

  useEffect(() => {
    const onDocClick = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement;
      if (
        expandedId &&
        !target.closest("[data-project-card]") &&
        !target.closest("[data-expanded-panel]")
      ) {
        setExpandedId(null);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [expandedId]);

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-20 lg:py-24 sm:px-6">
        <header className="mb-12 text-center md:mb-14">
          <div className="mb-6 flex justify-center">
            <BrandMark
              className="h-14 w-auto drop-shadow-sm md:h-16"
              alt=""
              aria-hidden
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            My Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            My work sits at the intersection of software engineering, machine
            learning, and data analytics, and these are projects I use
            daily—like PokeFind and MarketPulse.
          </p>
        </header>

        <div className="flex flex-col gap-10">
          {PROJECTS.map((project) => {
            const isExpanded = expandedId === project.id;
            const dimmed = expandedId !== null && !isExpanded;

            return (
              <section
                key={project.id}
                id={`project-${project.id}`}
                className="scroll-mt-24"
              >
                <button
                  type="button"
                  data-project-card
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(project.id);
                  }}
                  className={cn(
                    "w-full rounded-2xl border border-border/80 bg-card text-left shadow-sm transition-all",
                    "hover:border-primary/30 hover:shadow-md",
                    dimmed && "pointer-events-none opacity-35",
                    isExpanded && "ring-2 ring-primary/40",
                  )}
                >
                  <div className="grid gap-6 p-6 md:grid-cols-[1fr_1.25fr] md:p-8">
                    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/20">
                      <img
                        src={project.card.image}
                        alt={`Preview for ${project.card.title}`}
                        className="aspect-video w-full object-cover md:aspect-auto md:h-full md:min-h-[200px]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/60 opacity-0 transition-opacity hover:opacity-100">
                        <Maximize2 className="h-8 w-8 text-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {isExpanded ? "Click to collapse" : "Click to expand"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-2 text-2xl font-semibold text-foreground">
                        {project.card.title}
                      </h2>
                      <p className="mb-3 text-sm font-medium text-primary">
                        {project.card.tagline}
                      </p>
                      <p className="mb-4 text-muted-foreground">
                        {project.card.description}
                      </p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.card.tech.map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        {project.card.stats.map((s) => {
                          const Icon = statIcons[s.icon];
                          return (
                            <div
                              key={s.label}
                              className="flex items-center gap-2"
                            >
                              <Icon className="h-4 w-4 shrink-0 text-primary" />
                              <span>{s.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div data-expanded-panel>
                    <ExpandedPanel project={project} onClose={close} />
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
