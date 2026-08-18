"use client";

import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-3 py-16 xs:px-4 sm:px-6 sm:py-24 lg:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(16,185,129,0.18)_0%,_transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 top-10 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl sm:-right-32 sm:h-72 sm:w-72"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-0 h-40 w-40 rounded-full bg-emerald-500/8 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Badge variant="info" className="mb-5 animate-fade-in sm:mb-6">
          AI-Powered Career Intelligence
        </Badge>

        <h1
          id="hero-heading"
          className="animate-fade-in-up text-[1.75rem] font-bold leading-tight tracking-tight text-white xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.15]"
        >
          Know Where You Stand{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
            Before You Apply.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 animate-fade-in-up animation-delay-100 sm:mt-6 sm:text-lg sm:leading-8">
          CareerPilot AI analyzes your skills against real job requirements and shows you
          exactly what to improve.
        </p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 animate-fade-in-up animation-delay-200 xs:items-center sm:mt-10 sm:flex-row sm:gap-4">
          <Button
            size="lg"
            className="w-full xs:w-auto"
            onClick={() =>
              document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Analyze a Job
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full xs:w-auto"
            onClick={() =>
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            See How It Works
          </Button>
        </div>

        <dl className="mt-12 grid grid-cols-1 gap-3 animate-fade-in-up animation-delay-300 xs:grid-cols-3 xs:gap-4 sm:mt-16 sm:gap-6">
          {[
            { label: "Match Score", value: "0–100", icon: "◎" },
            { label: "Skill Analysis", value: "Instant", icon: "◆" },
            { label: "Interview Prep", value: "5 Qs", icon: "▸" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-hover group rounded-xl border border-white/5 bg-navy-900/50 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-5"
            >
              <dt className="flex items-center justify-center gap-1.5 text-xs text-slate-400 sm:text-sm">
                <span className="text-emerald-400/70 transition-colors group-hover:text-emerald-400" aria-hidden="true">
                  {stat.icon}
                </span>
                {stat.label}
              </dt>
              <dd className="mt-1 text-xl font-bold text-emerald-400 sm:text-2xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
