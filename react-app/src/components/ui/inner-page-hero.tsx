import * as React from "react";

import { cn } from "@/lib/utils";

type InnerPageHeroProps = {
  title: string;
  subtitle?: string;
  /** Extra content below subtitle (e.g. résumé contact row) */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Page title band for Projects / Résumé — no dotted or WebGL background (those stay on Home only).
 * Top padding clears the fixed app header (same offset rhythm as the home hero content).
 */
export function InnerPageHero({
  title,
  subtitle,
  children,
  className,
}: InnerPageHeroProps) {
  return (
    <section
      aria-labelledby="page-hero-heading"
      className={cn(
        "border-b border-border/60 bg-muted/20",
        "pt-24 pb-14 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center sm:mx-auto">
          <h1
            id="page-hero-heading"
            className="mx-auto max-w-4xl text-balance text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
              {subtitle}
            </p>
          ) : null}
          {children ? (
            <div className="mx-auto mt-8 max-w-3xl">{children}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
