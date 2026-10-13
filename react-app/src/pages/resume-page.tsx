import { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import {
  getResumeVersion,
  RESUME_PAGE_PATH,
  RESUME_VERSIONS,
  resumePagePath,
} from "@/constants/resume";
import { cn } from "@/lib/utils";

export function ResumePage() {
  useEffect(() => {
    document.title = "Résumés — Elton Chang";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-full bg-background">
      <InnerPageHero
        title="Résumés"
        subtitle="Different perspectives on my work. Choose the résumé that fits your role or research interest."
        className="pb-10 md:pb-12 lg:pb-14"
      />

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <nav aria-labelledby="resume-contents-heading">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
            <h2
              id="resume-contents-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              Table of contents
            </h2>
            <p className="text-sm text-muted-foreground">
              {RESUME_VERSIONS.length} versions · Preview and download
            </p>
          </div>
          <ol className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
            {RESUME_VERSIONS.map((resume, index) => (
              <li key={resume.slug}>
                <Link
                  to={resumePagePath(resume.slug)}
                  className="group grid grid-cols-[1.5rem_minmax(0,1fr)] gap-3 px-5 py-6 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:grid-cols-[2rem_1fr_auto] sm:gap-6 sm:px-8 sm:py-8"
                >
                  <span
                    aria-hidden="true"
                    className="pt-1 font-mono text-sm text-muted-foreground"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                      {resume.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {resume.purpose}
                    </p>
                    <ul
                      aria-label={`${resume.title} focus areas`}
                      className="mt-4 hidden flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground sm:flex"
                    >
                      {resume.focus.map((focus) => (
                        <li key={focus}>{focus}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="col-start-2 flex items-center gap-2 self-center text-sm font-medium text-foreground sm:col-start-auto">
                    View résumé
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </div>
  );
}

function ResumeNavigation() {
  return (
    <nav aria-labelledby="resume-navigation-heading" className="lg:sticky lg:top-28">
      <h2
        id="resume-navigation-heading"
        className="mb-4 text-sm font-semibold text-foreground"
      >
        Browse résumés
      </h2>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {RESUME_VERSIONS.map((resume) => (
          <li key={resume.slug}>
            <NavLink
              to={resumePagePath(resume.slug)}
              end
              className={({ isActive }) =>
                cn(
                  "block rounded-lg border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "border-foreground/20 bg-muted font-semibold text-foreground"
                    : "border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )
              }
            >
              {resume.title}
            </NavLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ResumeDetailPage() {
  const { resumeSlug } = useParams<{ resumeSlug: string }>();
  const resume = getResumeVersion(resumeSlug);

  useEffect(() => {
    document.title = resume
      ? `${resume.title} Résumé — Elton Chang`
      : "Résumé not found — Elton Chang";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [resume]);

  if (!resume) {
    return (
      <InnerPageHero
        title="Résumé not found"
        subtitle="Choose one of the available résumé versions."
      >
        <Button asChild>
          <Link to={RESUME_PAGE_PATH}>
            <ArrowLeft aria-hidden="true" className="size-4" />
            All résumés
          </Link>
        </Button>
      </InnerPageHero>
    );
  }

  return (
    <div className="min-h-full bg-background">
      <InnerPageHero
        title={resume.title}
        subtitle={resume.purpose}
        className="pb-10 md:pb-12 lg:pb-14"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a href={resume.pdfUrl} download={resume.downloadFilename}>
              <Download aria-hidden="true" className="size-4" />
              Download PDF
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={resume.pdfUrl} target="_blank" rel="noreferrer">
              <ExternalLink aria-hidden="true" className="size-4" />
              Open PDF
            </a>
          </Button>
        </div>
      </InnerPageHero>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12">
        <Link
          to={RESUME_PAGE_PATH}
          className="mb-8 inline-flex items-center gap-2 rounded-sm text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          All résumés
        </Link>
        <div className="grid items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <ResumeNavigation />
          <div className="min-w-0">
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {resume.description}
            </p>
            <iframe
              key={resume.slug}
              src={`${resume.pdfUrl}#view=FitH`}
              title={`Elton Chang ${resume.title} résumé PDF`}
              className="h-[78svh] min-h-[500px] w-full rounded-2xl border border-border/80 bg-card shadow-sm md:min-h-[680px]"
            />
            <p className="mt-4 text-sm text-muted-foreground">
              If the preview is unavailable, use Open PDF or Download PDF above.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
