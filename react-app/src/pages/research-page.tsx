import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import { RESEARCH_ENTRIES } from "@/data/research";

export function ResearchPage() {
  useEffect(() => {
    document.title = "Research — Elton Chang";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-full bg-background">
      <InnerPageHero
        title="Research"
        subtitle="A paper on governed memory for analysis agents, a proposal for texture-conditioned contact dynamics, and a technical report on evidence checks for an AI data analyst."
        className="pb-10 md:pb-12 lg:pb-14"
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <h2 className="sr-only">Three research efforts</h2>
        <ol className="space-y-6">
          {RESEARCH_ENTRIES.map((entry, index) => (
            <li key={entry.id}>
              <article
                id={entry.id}
                aria-labelledby={`${entry.id}-heading`}
                className="scroll-mt-28 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="font-mono text-sm text-muted-foreground"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {entry.kind}
                  </p>
                </div>
                <h3
                  id={`${entry.id}-heading`}
                  className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                >
                  {entry.title}
                </h3>

                {entry.objective ? (
                  <div className="mt-6 rounded-xl border border-border bg-muted/50 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      Ultimate objective
                    </p>
                    <p className="mt-2 text-lg font-medium leading-relaxed text-foreground">
                      {entry.objective}
                    </p>
                  </div>
                ) : null}

                <p className="mt-5 leading-relaxed text-muted-foreground">
                  {entry.summary}
                </p>

                {entry.points && entry.points.length > 0 ? (
                  <div className="mt-5">
                    <h4 className="text-sm font-semibold text-foreground">
                      {entry.pointsLabel}
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                      {entry.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3">
                  {entry.links.map((link, linkIndex) => {
                    const primary = linkIndex === 0;
                    const className = "gap-1.5";
                    if (link.external || link.href.startsWith("http")) {
                      return (
                        <Button
                          key={link.href}
                          size="sm"
                          variant={primary ? "default" : "outline"}
                          className={className}
                          asChild
                        >
                          <a href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                            <ArrowUpRight aria-hidden="true" className="size-3.5" />
                          </a>
                        </Button>
                      );
                    }
                    return (
                      <Button
                        key={link.href}
                        size="sm"
                        variant={primary ? "default" : "outline"}
                        className={className}
                        asChild
                      >
                        <Link to={link.href}>
                          {link.label}
                          <ArrowRight aria-hidden="true" className="size-3.5" />
                        </Link>
                      </Button>
                    );
                  })}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
