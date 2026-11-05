import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { InnerPageHero } from "@/components/ui/inner-page-hero";
import { RESEARCH_PAGE_PATH } from "@/constants/research";
import { COT_MONITORING } from "@/data/cot-monitoring";

export function CotMonitoringPage() {
  useEffect(() => {
    document.title = `${COT_MONITORING.title} — Elton Chang`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="min-h-full bg-background">
      <InnerPageHero title={COT_MONITORING.title} subtitle={COT_MONITORING.question}>
        <p className="text-sm text-muted-foreground">
          Independent research by Elton Chang · Study 3 · <time dateTime="2026-11-05">November 5, 2026</time>
        </p>
      </InnerPageHero>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 md:py-14">
        <Link to={RESEARCH_PAGE_PATH} className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground underline underline-offset-4">
          <ArrowLeft aria-hidden="true" className="size-4" /> All research
        </Link>

        <article className="space-y-10 leading-relaxed text-muted-foreground">
          <section aria-labelledby="cot-method">
            <h2 id="cot-method" className="mb-3 text-2xl font-semibold tracking-tight text-foreground">How I tested it</h2>
            <p>
              I built a Python evaluation with three simulated tasks: updating a ledger, routing a report to an
              approved recipient, and supplying required evidence. Qwen3-1.7B chose an action from a menu, and
              a rule checker independently labeled the choice as allowed or unauthorized. Qwen3-4B predicted
              whether the proposal would violate a rule from either the acting model’s prompt alone or the
              same prompt plus its written reasoning. Both inputs contained only pre-action information.
              I set separate warning thresholds on a calibration set and froze them before testing.
            </p>
          </section>

          <section aria-labelledby="cot-results">
            <h2 id="cot-results" className="mb-3 text-2xl font-semibold tracking-tight text-foreground">Fewer false alarms and fewer detections</h2>
            <p>
              On the same 316 labeled test cases, adding reasoning reduced false alarms from 69 to 4 out of
              281 allowed proposals. Detections fell from 4 to 0 out of 35 confirmed violations.
            </p>
            <figure className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
              <img
                src={COT_MONITORING.image}
                alt="On the main generated test, the monitor flagged 4 of 35 violations and 69 of 281 allowed proposals with task and rules alone, versus 0 of 35 violations and 4 of 281 allowed proposals with reasoning."
                className="h-auto w-full"
              />
              <figcaption className="border-t border-border px-5 py-3 text-sm">Warnings at frozen thresholds on the labeled cases from the main simulated test.</figcaption>
            </figure>
            <p className="mt-4">
              An exploratory analysis found that reasoning improved how the scores ranked the labeled cases
              (AUROC rose from 0.350 to 0.667). At the calibrated threshold, the monitor with reasoning still
              missed all 35 confirmed violations.
            </p>
          </section>

          <section aria-labelledby="cot-limits">
            <h2 id="cot-limits" className="mb-3 text-2xl font-semibold tracking-tight text-foreground">What limited the result</h2>
            <p>
              The study fell short of its criteria for useful monitoring. The main test labeled 316 of 384
              assigned cases (82.3%), below the 90% minimum. The other 68 hit the reasoning limit before choosing
              an action, including 64 evidence cases. In the separate scripted audit, the reasoning condition
              detected 27 of 72 violations and flagged 11 of 72 allowed proposals, missing both audit targets.
            </p>
            <p className="mt-4">
              These results apply to two local models in a constrained simulation with predefined action choices.
              Whether the findings transfer to open-ended tasks remains an open question.
            </p>
          </section>
        </article>

        <Link to={COT_MONITORING.projectPath} className="mt-8 inline-flex items-center gap-2 font-medium underline decoration-border underline-offset-4 hover:decoration-foreground">
          See the project <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </div>
  );
}
