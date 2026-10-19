import { useEffect } from "react";
import { Link } from "react-router-dom";

import { HeroSection } from "@/components/ui/hero-section-1";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { OpenSourceCard } from "@/components/open-source-card";
import {
  ABOUT_LEDE,
  ABOUT_PHOTO,
  ABOUT_STORY,
  NOW_ITEMS,
  TOOLBOX,
} from "@/data/about";
import { FEATURED_PROJECTS } from "@/data/projects";
import {
  CONTRIBUTION_STATS,
  FEATURED_CONTRIBUTIONS,
} from "@/data/open-source";

import { IconGithub, IconLinkedin } from "@/components/brand-icons";
import { SITE_TITLE } from "@/constants/brand";
import { RESUME_PAGE_PATH, RESUME_PDF_URL } from "@/constants/resume";
import { LINKEDIN_URL, SITE_EMAIL } from "@/constants/social";
import { ArrowRight, FileDown, GitPullRequest, Mail } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
      {children}
    </h2>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </p>
  );
}

function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-28 border-t border-border/60 bg-muted/20 py-12 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="min-w-0">
            <Eyebrow>About</Eyebrow>
            <h2
              id="about-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              Hi, I’m Elton.
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-foreground md:text-2xl md:leading-relaxed">
              {ABOUT_LEDE}
            </p>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {ABOUT_STORY.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-12 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Right now
            </h3>
            <ul className="mt-4 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm">
              {NOW_ITEMS.map((item) => (
                <li key={item.title}>
                  <Link
                    to={item.link.to}
                    className="group flex flex-col gap-2 px-5 py-4 transition-colors duration-150 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                  >
                    <span className="min-w-0">
                      <span className="block font-medium text-foreground">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {item.detail}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground">
                      {item.link.label}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shown first visually; the heading stays first for screen readers. */}
          <figure className="order-first mx-auto w-full max-w-sm lg:sticky lg:top-28 lg:max-w-none">
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-muted/30 shadow-sm">
              <img
                src={ABOUT_PHOTO.src}
                alt={ABOUT_PHOTO.alt}
                width={ABOUT_PHOTO.width}
                height={ABOUT_PHOTO.height}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover object-[50%_85%] lg:aspect-[4/5] lg:object-[50%_75%]"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
              {ABOUT_PHOTO.caption}
            </figcaption>
          </figure>
        </div>

        <div className="mt-14 border-t border-border/70 pt-10 md:mt-16">
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            What I build with
          </h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLBOX.map((group) => (
              <div key={group.label}>
                <p className="mb-3 font-medium text-foreground">{group.label}</p>
                <ul aria-label={group.label} className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm transition-colors duration-150 hover:bg-muted-foreground/10 hover:text-foreground"
                      >
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to={RESUME_PAGE_PATH}>View résumé</Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a href={RESUME_PDF_URL} download>
                  <FileDown className="h-4 w-4" />
                  Download PDF
                </a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              The résumé is the shorter, slightly more serious cut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  useEffect(() => {
    document.title = SITE_TITLE;
  }, []);

  return (
    <div className="bg-background">
      <HeroSection />

      <AboutSection />

      <section
        id="featured-projects"
        className="scroll-mt-28 border-t border-border/60 py-12 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle>Featured Projects</SectionTitle>
          <div className="flex flex-col gap-12">
            {FEATURED_PROJECTS.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-shadow duration-150 hover:shadow-md"
              >
                <div className="grid gap-8 p-6 md:grid-cols-[1fr_1.2fr] md:p-8">
                  <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
                    <img
                      src={project.card.image}
                      alt={`Preview for ${project.card.title}`}
                      className="h-full w-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-left">
                    <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
                      {project.card.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      {project.card.tagline}
                    </p>
                    <div className="mb-6 flex flex-wrap gap-2">
                      {project.card.tech.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {(project.homeLinks ?? []).map((l) => {
                        if (l.external || l.href.startsWith("http")) {
                          return (
                            <Button key={l.label} size="sm" asChild>
                              <a
                                href={l.href}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {l.label}
                              </a>
                            </Button>
                          );
                        }
                        if (l.href.endsWith(".html")) {
                          return (
                            <Button
                              key={l.label}
                              size="sm"
                              variant="outline"
                              asChild
                            >
                              <a href={l.href}>{l.label}</a>
                            </Button>
                          );
                        }
                        return (
                          <Button key={l.label} size="sm" variant="outline" asChild>
                            <Link to={l.href}>{l.label}</Link>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="open-source"
        className="scroll-mt-28 border-t border-border/60 bg-muted/20 py-12 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle>Open Source Contributions</SectionTitle>
          <p className="mx-auto mb-8 max-w-3xl text-center text-lg leading-relaxed text-muted-foreground">
            I like the unglamorous fixes: a flaky test, parser settings that
            went stale between query files, a date slider that broke on
            same-day ranges. Here are a few that landed, with more in review
            across AI inference and data tooling.
          </p>
          <div className="mx-auto mb-10 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
            {CONTRIBUTION_STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/70 bg-muted/20 p-4 text-center"
              >
                <p className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {FEATURED_CONTRIBUTIONS.map((contribution) => (
              <OpenSourceCard
                key={contribution.url}
                contribution={contribution}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button size="lg" asChild>
              <Link to="/open-source" className="gap-2">
                <GitPullRequest className="h-4 w-4" />
                Explore all contributions
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-28 border-t border-border/60 py-12 md:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <SectionTitle>Say hello</SectionTitle>
          <p className="mx-auto mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Building something where the answer has to be right? Hiring for
            software, AI, data, or robotics research? Or just want to compare
            notes? Email is the fastest way to reach me.
          </p>
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="mb-8 inline-block rounded-sm text-lg font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {SITE_EMAIL}
          </a>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/EltonChang1"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors duration-150 hover:bg-primary hover:text-primary-foreground"
              aria-label="GitHub"
            >
              <IconGithub className="h-5 w-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors duration-150 hover:bg-primary hover:text-primary-foreground"
              aria-label="LinkedIn"
            >
              <IconLinkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors duration-150 hover:bg-primary hover:text-primary-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
