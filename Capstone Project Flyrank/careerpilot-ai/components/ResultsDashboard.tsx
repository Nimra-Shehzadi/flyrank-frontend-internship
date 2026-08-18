"use client";

import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { JobAnalysisResult, RequestStatus } from "@/lib/types";
import { cn, getScoreColor, getScoreLabel } from "@/lib/utils";

interface ResultsDashboardProps {
  result: JobAnalysisResult | null;
  status: RequestStatus;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl sm:h-16 sm:w-16 sm:text-3xl"
        aria-hidden="true"
      >
        ◎
      </div>
      <h3 className="text-base font-semibold text-white sm:text-lg">No analysis yet</h3>
      <p className="mt-2 max-w-xs text-xs text-slate-400 sm:max-w-sm sm:text-sm">
        Complete the job analysis above to see your match score, skill gaps, and interview
        questions.
      </p>
    </div>
  );
}

function SkillCards({
  title,
  items,
  variant,
  emptyText,
  delayClass,
}: {
  title: string;
  items: string[];
  variant: "match" | "missing";
  emptyText: string;
  delayClass?: string;
}) {
  const isMatch = variant === "match";

  return (
    <Card
      ariaLabel={title}
      className={cn("animate-fade-in-up", delayClass)}
    >
      <div className="mb-4 flex items-center gap-2">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg text-sm",
            isMatch ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"
          )}
          aria-hidden="true"
        >
          {isMatch ? "✓" : "!"}
        </span>
        <h3 className="text-base font-semibold text-white sm:text-lg">{title}</h3>
        <span className="ml-auto rounded-full bg-white/5 px-2 py-0.5 text-xs text-slate-400">
          {items.length}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400">{emptyText}</p>
      ) : (
        <ul className="grid grid-cols-1 gap-2 xs:grid-cols-2" role="list">
          {items.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className={cn(
                "card-hover rounded-xl border px-3 py-2.5 text-sm transition-colors",
                isMatch
                  ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-100 hover:border-emerald-500/40"
                  : "border-amber-500/20 bg-amber-500/5 text-amber-100 hover:border-amber-500/40"
              )}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function MatchScoreRing({ score }: { score: number }) {
  const circumference = 264;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div
      className="relative mx-auto h-36 w-36 sm:h-40 sm:w-40"
      role="img"
      aria-label={`Match score: ${score} out of 100`}
    >
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-white/8"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-4xl font-bold sm:text-5xl", getScoreColor(score))}>
          {score}
        </span>
        <span className="text-xs text-slate-500">/ 100</span>
      </div>
    </div>
  );
}

export function ResultsDashboard({ result, status }: ResultsDashboardProps) {
  const isLoading = status === "loading";

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      className="px-3 py-12 xs:px-4 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="results-heading"
          title="Results"
          subtitle="Your personalized career analysis at a glance."
        />

        {!result && !isLoading && (
          <Card hover={false}>
            <EmptyState />
          </Card>
        )}

        {isLoading && (
          <Card ariaLabel="Loading analysis results" hover={false}>
            <div className="flex flex-col items-center py-12 sm:py-16" role="status" aria-live="polite">
              <div
                className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500/20 border-t-emerald-400"
                aria-hidden="true"
              />
              <p className="mt-4 text-sm text-slate-300 sm:text-base">
                Crunching your match score...
              </p>
            </div>
          </Card>
        )}

        {result && !isLoading && (
          <div className="space-y-5 sm:space-y-6">
            <Card ariaLabel="Match score" className="animate-scale-in">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between sm:gap-8">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Overall Match
                  </p>
                  <p className="mt-1 text-xl font-bold text-white sm:text-2xl">
                    {getScoreLabel(result.matchScore)}
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-slate-400">
                    Based on skills alignment, experience fit, and role requirements.
                  </p>
                </div>
                <MatchScoreRing score={result.matchScore} />
              </div>
            </Card>

            <div className="grid gap-5 md:grid-cols-2 md:gap-6">
              <SkillCards
                title="Matching Skills"
                items={result.matchingSkills}
                variant="match"
                emptyText="No direct matches identified."
                delayClass="animation-delay-100"
              />
              <SkillCards
                title="Missing Skills"
                items={result.missingSkills}
                variant="missing"
                emptyText="No significant gaps found."
                delayClass="animation-delay-200"
              />
            </div>

            <Card ariaLabel="Recommendations" className="animate-fade-in-up animation-delay-300">
              <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/15 text-cyan-400" aria-hidden="true">
                  ↗
                </span>
                Recommendations
              </h3>
              <ol className="space-y-3" role="list">
                {result.recommendations.map((rec, i) => (
                  <li
                    key={i}
                    className="card-hover flex gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3 text-sm text-slate-300 sm:p-4"
                  >
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 text-xs font-bold text-emerald-300"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {rec}
                  </li>
                ))}
              </ol>
            </Card>

            <Card ariaLabel="Professional summary" className="animate-fade-in-up animation-delay-400">
              <h3 className="mb-3 text-base font-semibold text-white sm:text-lg">
                Professional Summary
              </h3>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-7">
                {result.professionalSummary}
              </p>
            </Card>

            <Card ariaLabel="Interview questions" className="animate-fade-in-up animation-delay-500">
              <h3 className="mb-4 text-base font-semibold text-white sm:text-lg">
                Interview Questions
              </h3>
              <ol className="space-y-2 sm:space-y-3" role="list">
                {result.interviewQuestions.map((q, i) => (
                  <li
                    key={i}
                    className="card-hover rounded-xl border border-white/5 bg-navy-950/40 px-3 py-3 text-sm text-slate-300 sm:px-4 sm:py-3.5"
                  >
                    <span className="mr-2 font-semibold text-cyan-400">Q{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
