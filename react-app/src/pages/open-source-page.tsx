import {
  ArrowUpRight,
  BrainCircuit,
  ChartNoAxesCombined,
  DatabaseZap,
  GitPullRequest,
} from "lucide-react";

import { IconGithub } from "@/components/brand-icons";
import { OpenSourceCard } from "@/components/open-source-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import {
  AI_CONTRIBUTIONS,
  CONTRIBUTION_STATS,
  CONTRIBUTOR_REPOSITORIES,
  DATA_INFRASTRUCTURE_CONTRIBUTIONS,
  DATA_SCIENCE_CONTRIBUTIONS,
} from "@/data/open-source";

const contributionGroups = [
  {
    eyebrow: "AI systems",
    title: "AI inference and production infrastructure",
    description:
      "Model-serving correctness, accelerator-aware tests, cache infrastructure, container efficiency, and evaluation-data tooling.",
    icon: BrainCircuit,
    contributions: AI_CONTRIBUTIONS,
  },
  {
    eyebrow: "Data infrastructure",
    title: "Query engines, orchestration, and ML tooling",
    description:
      "Parser semantics, query correctness, workflow documentation, feature-engineering APIs, and the foundations behind reliable data systems.",
    icon: DatabaseZap,
    contributions: DATA_INFRASTRUCTURE_CONTRIBUTIONS,
  },
  {
    eyebrow: "Data science",
    title: "Statistics, visualization, and scientific Python",
    description:
      "Time-series machine learning, statistical documentation, visualization behavior, reactive data applications, and scientific-computing compatibility.",
    icon: ChartNoAxesCombined,
    contributions: DATA_SCIENCE_CONTRIBUTIONS,
  },
];

export function OpenSourcePage() {
  return (
    <div className="bg-background">
      <InnerPageHero
        title="Open Source Contributions"
        subtitle="Verified upstream work organized from AI systems and inference infrastructure through data engineering, statistics, visualization, and scientific Python."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a
              href="https://github.com/search?q=is%3Apr+author%3AEltonChang1&type=pullrequests"
              target="_blank"
              rel="noreferrer"
            >
              <GitPullRequest className="h-4 w-4" />
              View all pull requests
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://github.com/EltonChang1"
              target="_blank"
              rel="noreferrer"
            >
              <IconGithub className="h-4 w-4" />
              GitHub profile
            </a>
          </Button>
        </div>
      </InnerPageHero>

      <section className="border-b border-border/60 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {CONTRIBUTION_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/80 bg-card p-4 text-center shadow-sm sm:p-6"
              >
                <p className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border/60 bg-muted/20 py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Accepted upstream work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Repositories I contribute to
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Repositories whose public contributor history includes my merged
              work. Every entry links to the repository and accepted pull-request
              evidence.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CONTRIBUTOR_REPOSITORIES.map((repository) => (
              <article
                key={repository.repository}
                className="flex flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <Badge variant="secondary">{repository.ecosystem}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {repository.mergedPullRequests} merged
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {repository.project}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {repository.repository}
                </p>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                  {repository.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-border/70 pt-4">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={repository.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repository
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                  {repository.evidenceUrls.map((url) => (
                    <Button key={url} size="sm" variant="ghost" asChild>
                      <a href={url} target="_blank" rel="noreferrer">
                        PR #{url.split("/").at(-1)}
                      </a>
                    </Button>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {contributionGroups.map((group, index) => {
        const Icon = group.icon;
        return (
          <section
            key={group.title}
            className={
              index % 2 === 0
                ? "border-b border-border/60 py-12 md:py-20"
                : "border-b border-border/60 bg-muted/20 py-12 md:py-20"
            }
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="mb-10 max-w-3xl">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  {group.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {group.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                  {group.description}
                </p>
              </div>
              <div className="grid gap-5 lg:grid-cols-2">
                {group.contributions.map((contribution) => (
                  <OpenSourceCard
                    key={contribution.url}
                    contribution={contribution}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
