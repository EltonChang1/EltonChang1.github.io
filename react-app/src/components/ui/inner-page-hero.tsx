import * as React from "react";

import { DottedSurface } from "@/components/ui/dotted-surface";
import { cn } from "@/lib/utils";

type InnerPageHeroProps = {
  title: string;
  subtitle?: string;
  /** Extra content below subtitle (e.g. résumé contact row) */
  children?: React.ReactNode;
  className?: string;
};

/**
 * Same visual language as the home hero: dotted field, WebGL dots, soft radial fades,
 * and large centered type — for inner routes (Projects, Résumé).
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
        "relative isolate overflow-hidden bg-background",
        "border-b border-border/60",
        className,
      )}
    >
      <div
        aria-hidden
        className="hero-dot-field pointer-events-none absolute inset-0 z-0"
      />
      <DottedSurface className="z-[1]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_100%_95%_at_50%_48%,transparent_28%,var(--background)_94%)] opacity-[0.16] dark:opacity-[0.22]"
      />

      <div className="relative z-[3] w-full min-w-0">
        <div className="relative">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_40%,var(--background)_95%)] opacity-55"
          />
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-20 lg:py-24">
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
        </div>
      </div>
    </section>
  );
}
