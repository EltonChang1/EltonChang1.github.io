import { Link } from "react-router-dom";

import { HeroBlock } from "@/components/ui/hero-block-shadcnui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ABOUT_PARAGRAPH,
  PROJECTS,
  SKILLS,
} from "@/data/projects";

import { IconGithub, IconLinkedin } from "@/components/brand-icons";
import { RESUME_HTML_URL, RESUME_PDF_URL } from "@/constants/resume";
import { LINKEDIN_URL } from "@/constants/social";
import { FileDown, Mail } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
      {children}
    </h2>
  );
}

export function HomePage() {
  return (
    <div className="bg-background">
      <HeroBlock />

      <section
        id="about"
        className="scroll-mt-16 border-t border-border/60 bg-muted/20 py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle>About Me</SectionTitle>
          <p className="mx-auto mb-10 max-w-3xl text-center text-lg text-muted-foreground">
            {ABOUT_PARAGRAPH}
          </p>
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {SKILLS.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1 text-sm transition-colors hover:bg-primary/15 hover:text-foreground"
              >
                {skill}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <a href={RESUME_HTML_URL}>View My Resume</a>
            </Button>
            <Button size="lg" variant="outline" className="gap-2" asChild>
              <a href={RESUME_PDF_URL} download>
                <FileDown className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="featured-projects"
        className="scroll-mt-16 border-t border-border/60 py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle>Featured Projects</SectionTitle>
          <div className="flex flex-col gap-12">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm"
              >
                <div className="grid gap-8 p-6 md:grid-cols-[1fr_1.2fr] md:p-8">
                  <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30">
                    <img
                      src={project.card.image}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col justify-center text-left">
                    <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
                      {project.homeTitle ?? project.card.title}
                    </h3>
                    <p className="mb-4 text-muted-foreground">
                      {project.card.description}
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
        id="contact"
        className="scroll-mt-16 border-t border-border/60 bg-muted/20 py-20"
      >
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <SectionTitle>Get In Touch</SectionTitle>
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/EltonChang1"
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="GitHub"
            >
              <IconGithub className="h-5 w-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="LinkedIn"
            >
              <IconLinkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:eltonchangtac@gmail.com"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
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
