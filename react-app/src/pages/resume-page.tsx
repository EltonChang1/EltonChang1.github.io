import { useEffect } from "react";
import { Download, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import { RESUME_PDF_URL } from "@/constants/resume";

export function ResumePage() {
  useEffect(() => {
    document.title = "Résumé — Elton Chang";
  }, []);

  return (
    <div className="min-h-full bg-background">
      <InnerPageHero
        title="Résumé"
        subtitle="The current résumé is displayed directly from the same PDF used by every download link."
        className="pb-10 md:pb-12 lg:pb-14"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a href={RESUME_PDF_URL} download>
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={RESUME_PDF_URL} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4" />
              Open PDF
            </a>
          </Button>
        </div>
      </InnerPageHero>

      <section
        aria-label="Résumé PDF viewer"
        className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-12"
      >
        <iframe
          src={`${RESUME_PDF_URL}#view=FitH`}
          title="Elton Chang résumé PDF"
          className="h-[78svh] min-h-[680px] w-full rounded-2xl border border-border/80 bg-card shadow-sm"
        />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          If the embedded viewer is unavailable, use Open PDF or Download PDF
          above.
        </p>
      </section>
    </div>
  );
}
