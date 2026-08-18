"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JobAnalysisWorkspace } from "@/components/JobAnalysisWorkspace";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import type { JobAnalysisResult, RequestStatus } from "@/lib/types";

const ResultsDashboard = dynamic(
  () => import("@/components/ResultsDashboard").then((m) => m.ResultsDashboard),
  { ssr: false }
);

const CareerChat = dynamic(
  () => import("@/components/CareerChat").then((m) => m.CareerChat),
  {
    ssr: false,
    loading: () => (
      <section id="chat" className="px-3 py-12 xs:px-4 sm:px-6">
        <div className="mx-auto max-w-4xl animate-pulse rounded-2xl border border-white/10 bg-navy-900/60 h-56 sm:h-64" />
      </section>
    ),
  }
);

export function HomePage() {
  const [analysisResult, setAnalysisResult] = useState<JobAnalysisResult | null>(null);
  const [status, setStatus] = useState<RequestStatus>("idle");

  return (
    <div className="dashboard-bg min-h-full">
      <Header />
      <main>
        <Hero />
        <JobAnalysisWorkspace
          onAnalysisComplete={setAnalysisResult}
          onStatusChange={setStatus}
        />
        <ResultsDashboard result={analysisResult} status={status} />
        <CareerChat analysisContext={analysisResult} />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
