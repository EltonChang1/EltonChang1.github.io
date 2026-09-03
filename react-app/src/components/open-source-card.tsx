import { ArrowUpRight, GitMerge, GitPullRequest } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { OpenSourceContribution } from "@/data/open-source";
import { cn } from "@/lib/utils";

export function OpenSourceCard({
  contribution,
}: {
  contribution: OpenSourceContribution;
}) {
  const merged = contribution.status === "merged";
  const draft = contribution.status === "open" && contribution.draft;
  const StatusIcon = merged ? GitMerge : GitPullRequest;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <a
            href={contribution.repositoryUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            {contribution.repository}
          </a>
          <p className="mt-1 text-lg font-semibold text-foreground">
            {contribution.project}
          </p>
        </div>
        <Badge
          variant="outline"
          className={cn(
            "shrink-0 gap-1.5",
            merged
              ? "border-emerald-600/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : draft
                ? "border-amber-600/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                : "border-sky-600/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
          )}
        >
          <StatusIcon className="h-3.5 w-3.5" />
          {merged ? "Merged" : draft ? "Draft" : "Open"}
        </Badge>
      </div>

      <h3 className="mb-3 text-xl font-semibold leading-snug text-foreground">
        {contribution.title}
      </h3>
      <p className="mb-5 flex-1 leading-relaxed text-muted-foreground">
        {contribution.summary}
      </p>

      <div className="mb-5 flex flex-wrap gap-2">
        {contribution.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-normal">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>+{contribution.additions} additions</span>
        <span>
          {contribution.deletions > 0 ? "-" : ""}
          {contribution.deletions}{" "}
          {contribution.deletions === 1 ? "deletion" : "deletions"}
        </span>
        <span>
          {contribution.files} {contribution.files === 1 ? "file" : "files"}
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
        <span className="text-sm text-muted-foreground">
          {contribution.date}
        </span>
        <Button size="sm" variant="outline" asChild>
          <a
            href={contribution.url}
            target="_blank"
            rel="noreferrer"
            className="gap-1.5"
          >
            PR #{contribution.pullRequest}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </Button>
      </div>
    </article>
  );
}
