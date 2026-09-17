import { ArrowUpRight, Star } from "lucide-react";

import { IconGithub } from "@/components/brand-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import {
  CONTRIBUTOR_REPOSITORIES,
  REPOSITORY_STARS_CHECKED_AT,
} from "@/data/open-source";

const repositories = [...CONTRIBUTOR_REPOSITORIES].sort(
  (a, b) => b.stars - a.stars || a.repository.localeCompare(b.repository),
);

export function OpenSourcePage() {
  return (
    <div className="bg-background">
      <InnerPageHero
        title="Open Source"
        subtitle="Projects I contribute to, from AI infrastructure to scientific Python."
      >
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
      </InnerPageHero>

      <section className="border-b border-border/60 py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Repositories
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Most stars first · GitHub star counts as of{" "}
              <time dateTime={REPOSITORY_STARS_CHECKED_AT}>
                {REPOSITORY_STARS_CHECKED_AT}
              </time>
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {repositories.map((repository) => (
              <article
                key={repository.repository}
                className="flex min-w-0 flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <Badge variant="secondary">{repository.role}</Badge>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Star aria-hidden="true" className="h-4 w-4" />
                    {repository.stars.toLocaleString("en-US")}
                    <span className="sr-only">stars</span>
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {repository.project}
                </h3>
                <p className="mt-1 break-words text-sm text-muted-foreground">
                  {repository.repository}
                </p>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">
                  {repository.description}
                </p>
                <div className="mt-5 border-t border-border/70 pt-4">
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={repository.repositoryUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${repository.project} on GitHub`}
                    >
                      Repository
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
