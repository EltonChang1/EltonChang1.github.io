import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { InnerPageHero } from "@/components/ui/inner-page-hero";
import {
  RESEARCH_PAGE_PATH,
  RESEARCH_PROPOSAL_PAGE_PATH,
} from "@/constants/research";
import { SITE_EMAIL } from "@/constants/social";
import {
  COMPLETED_WORK,
  EVALUATION_PLAN,
  PROPOSAL_SECTIONS,
  PROPOSAL_UPDATED,
  PROPOSAL_WRITING_REFERENCES,
  RESEARCH_AIMS,
  RESEARCH_MILESTONES,
  RESEARCH_RISKS,
  SCIENTIFIC_REFERENCES,
  TACTILE_ULTIMATE_OBJECTIVE,
} from "@/data/research-proposal";
import { cn } from "@/lib/utils";

type SectionId = (typeof PROPOSAL_SECTIONS)[number]["id"];

function ProposalSection({ id, title, children }: { id: SectionId; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-28">
      <h2 id={`${id}-heading`} className="mb-5 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SourceLink({ url, children }: { url: string; children: ReactNode }) {
  return (
    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      {children}
      <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" />
    </a>
  );
}

export function ResearchProposalPage() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Tactile World Research Proposal — Elton Chang";
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [hash]);

  return (
    <div className="min-h-full bg-background">
      <InnerPageHero
        title="Tactile World"
        subtitle="A research proposal for predicting touch, contact forces, and object motion from brief interactions."
        className="pb-10 md:pb-12 lg:pb-14"
      >
        <p className="text-sm text-muted-foreground">
          Independent research · Updated <time dateTime={PROPOSAL_UPDATED}>October 13, 2026</time>
          {" · "}
          <Link to={RESEARCH_PAGE_PATH} className="rounded-sm font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            All research
          </Link>
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to={`${RESEARCH_PROPOSAL_PAGE_PATH}#question`}>
              Read the proposal <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href={`mailto:${SITE_EMAIL}?subject=Tactile%20World%20research%20proposal`}>Discuss the research</a>
          </Button>
        </div>
      </InnerPageHero>

      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-14">
        <aside className="lg:sticky lg:top-28">
          <nav aria-labelledby="proposal-contents-heading">
            <h2 id="proposal-contents-heading" className="mb-3 text-sm font-semibold text-foreground">On this page</h2>
            <ol className="grid grid-cols-2 gap-1 sm:grid-cols-4 lg:grid-cols-1">
              {PROPOSAL_SECTIONS.map((section, index) => (
                <li key={section.id}>
                  <Link
                    to={`${RESEARCH_PROPOSAL_PAGE_PATH}#${section.id}`}
                    aria-current={hash === `#${section.id}` ? "location" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      hash === `#${section.id}` ? "bg-muted font-medium text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <span aria-hidden="true" className="font-mono text-xs">{String(index + 1).padStart(2, "0")}</span>
                    {section.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0 max-w-4xl space-y-12 text-base leading-relaxed text-muted-foreground md:space-y-16">
          <ProposalSection id="question" title="Research question">
            <p className="text-lg font-medium leading-relaxed text-foreground">
              Can brief touch establish a reusable model of an object's surface that predicts what a new action will feel like and how the object will move?
            </p>
            <div className="mt-6 rounded-xl border border-border bg-muted/50 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Ultimate objective</p>
              <p className="mt-2 text-lg font-medium leading-relaxed text-foreground">{TACTILE_ULTIMATE_OBJECTIVE}</p>
            </div>
            <p className="mt-4">
              The first study is narrower: controlled sliding with one contact pair. Room-scale scenes and multi-step planning follow only after contact prediction is validated.
            </p>
            <p className="mt-4"><strong className="text-foreground">Hypothesis:</strong> Local surface information and action conditions will improve prediction on unseen surfaces over matched retrieval and texture-agnostic friction baselines. This comparison remains to be tested.</p>
            <div className="mt-6 rounded-xl border border-border bg-muted/30 px-5 py-4 text-sm font-medium text-foreground">
              World state + surface map + action <span aria-hidden="true">→</span><span className="sr-only">predict</span> touch, force and motion, with uncertainty
            </div>
          </ProposalSection>

          <ProposalSection id="context" title="Context and contribution">
            <p>
              <SourceLink url="https://sparsh-ssl.github.io/">Sparsh</SourceLink> studies tactile representations, <SourceLink url="https://arxiv.org/abs/2408.06506">TacSL</SourceLink> simulates visuotactile sensors, and <SourceLink url="https://arxiv.org/abs/2606.13877">ContactWorld</SourceLink> evaluates predictive manipulation. This proposal tests a bounded contribution: registered surface maps that connect brief observations to reusable contact and motion predictions.
            </p>
            <p className="mt-4">Sensor modalities differ across these studies. The initial vibration/force experiments will use controlled sensing and contact conditions; cross-sensor transfer is a later question.</p>
          </ProposalSection>

          <ProposalSection id="completed" title="Work completed so far">
            <div className="grid gap-4 sm:grid-cols-2">
              {COMPLETED_WORK.map((work) => (
                <article key={work.title} className="min-w-0 rounded-xl border border-border bg-card p-5">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">{work.status}</p>
                  <h3 className="text-lg font-semibold text-foreground">{work.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{work.description}</p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {work.sources.map((source) => <SourceLink key={source.url} url={source.url}>{source.label}</SourceLink>)}
                  </div>
                </article>
              ))}
            </div>
          </ProposalSection>

          <ProposalSection id="aims" title="Three specific aims">
            <ol className="divide-y divide-border rounded-xl border border-border">
              {RESEARCH_AIMS.map((aim, index) => (
                <li key={aim.title} className="flex gap-4 p-5">
                  <span aria-hidden="true" className="pt-0.5 font-mono text-sm text-muted-foreground">{index + 1}.</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{aim.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed">{aim.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ProposalSection>

          <ProposalSection id="evaluation" title="Approach and evaluation">
            <p className="mb-5">Lock splits by surface/object and session before model selection. Separate support observations from query targets; match conditions and budgets across methods. Ablate spatial registration and action conditioning; score held-out locations separately from unseen specimens.</p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[600px] text-left text-sm">
                <caption className="sr-only">Planned comparisons and measurements for each predicted output</caption>
                <thead className="bg-muted/50 text-foreground">
                  <tr>
                    <th scope="col" className="px-5 py-3 font-semibold">Output</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Comparison</th>
                    <th scope="col" className="px-5 py-3 font-semibold">Measures</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {EVALUATION_PLAN.map((row) => (
                    <tr key={row.output}>
                      <th scope="row" className="px-5 py-4 align-top font-medium text-foreground">{row.output}</th>
                      <td className="px-5 py-4 align-top">{row.comparison}</td>
                      <td className="px-5 py-4 align-top">{row.measures}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-5 text-sm">Bootstrap paired results by surface/specimen, grouping sessions. Fix practical error margins from calibration data before held-out testing. If richer representations fail to improve prediction or task outcomes, report that result and retain the stronger simple baseline.</p>
          </ProposalSection>

          <ProposalSection id="milestones" title="What remains to be done">
            <ol className="space-y-5">
              {RESEARCH_MILESTONES.map((milestone, index) => (
                <li key={milestone.title} className="flex gap-4">
                  <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-foreground">{index + 1}</span>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-foreground">{milestone.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed">{milestone.exit}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm">Progress is gated by evidence. Dates will be set after access to a calibrated collection rig; scene-scale work depends on successful asset-level validation.</p>
          </ProposalSection>

          <ProposalSection id="feasibility" title="Resources, risks and outputs">
            <p>Existing code supports the next experiments. Physical studies require a tactile rig, calibrated force/position measurements, synchronized logging and compute; robot access is needed for the later task benchmark.</p>
            <dl className="mt-5 space-y-4 text-sm">
              {RESEARCH_RISKS.map((risk) => (
                <div key={risk.title}>
                  <dt className="font-semibold text-foreground">{risk.title}</dt>
                  <dd className="mt-1">{risk.response}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm"><strong className="text-foreground">Planned outputs:</strong> calibrated contact data, frozen benchmarks, a reusable surface-asset format, coupled prediction software, and a technical report covering positive and negative findings.</p>
          </ProposalSection>

          <ProposalSection id="references" title="Selected references">
            <ol className="space-y-4">
              {SCIENTIFIC_REFERENCES.map((reference) => (
                <li key={reference.title}>
                  <SourceLink url={reference.url}>{reference.title}</SourceLink>
                  <span className="ml-2 text-xs">{reference.year}</span>
                  <p className="mt-1 text-sm">{reference.description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 border-t border-border pt-5">
              <p className="mb-2 text-xs">Proposal structure informed by</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {PROPOSAL_WRITING_REFERENCES.map((reference) => <SourceLink key={reference.url} url={reference.url}>{reference.title}</SourceLink>)}
              </div>
            </div>
          </ProposalSection>
        </article>
      </div>
    </div>
  );
}
