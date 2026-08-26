import { GitMerge, GitPullRequest, TestTube2 } from "lucide-react";

import { IconGithub } from "@/components/brand-icons";
import { OpenSourceCard } from "@/components/open-source-card";
import { Button } from "@/components/ui/button";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import {
  CONTRIBUTION_STATS,
  MERGED_CONTRIBUTIONS,
  OPEN_CONTRIBUTIONS,
} from "@/data/open-source";

const contributionPrinciples = [
  {
    title: "Correctness first",
    description:
      "Focused patches that resolve a reproducible behavior gap instead of widening scope unnecessarily.",
    icon: GitMerge,
  },
  {
    title: "Regression evidence",
    description:
      "Tests and fixtures accompany behavior changes so the fixed edge case stays fixed across releases.",
    icon: TestTube2,
  },
  {
    title: "Maintainer-ready",
    description:
      "Small, reviewable pull requests with issue context, implementation rationale, and direct public evidence.",
    icon: GitPullRequest,
  },
];

export function OpenSourcePage() {
  return (
    <div className="bg-background">
      <InnerPageHero
        title="Open Source Contributions"
        subtitle="Production fixes, regression tests, parsers, and documentation improvements contributed across the Python, data, and visualization ecosystems."
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a
              href="https://github.com/pulls?q=is%3Apr+author%3AEltonChang1"
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

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contributionPrinciples.map((principle) => {
              const Icon = principle.icon;
              return (
                <article
                  key={principle.title}
                  className="rounded-2xl border border-border/70 bg-muted/20 p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mb-2 text-lg font-semibold text-foreground">
                    {principle.title}
                  </h2>
                  <p className="leading-relaxed text-muted-foreground">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Accepted upstream
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Merged contributions
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Changes reviewed and merged by upstream maintainers, with direct
              links to the public discussion, diff, and test evidence.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {MERGED_CONTRIBUTIONS.map((contribution) => (
              <OpenSourceCard
                key={contribution.url}
                contribution={contribution}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20 py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Public review
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Open pull requests
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Submitted improvements currently visible in upstream review.
              GitHub is the source of truth for their latest status.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {OPEN_CONTRIBUTIONS.map((contribution) => (
              <OpenSourceCard
                key={contribution.url}
                contribution={contribution}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
