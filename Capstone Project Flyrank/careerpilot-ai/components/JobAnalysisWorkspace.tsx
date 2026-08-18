"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/Textarea";
import { Alert } from "@/components/ui/Alert";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { ApiErrorResponse, JobAnalysisResult, RequestStatus } from "@/lib/types";
import { validateAnalyzeInput } from "@/lib/validation";

interface JobAnalysisWorkspaceProps {
  onAnalysisComplete: (result: JobAnalysisResult) => void;
  onStatusChange: (status: RequestStatus) => void;
}

interface FieldErrors {
  jobDescription?: string;
  userSkills?: string;
  experience?: string;
}

export function JobAnalysisWorkspace({
  onAnalysisComplete,
  onStatusChange,
}: JobAnalysisWorkspaceProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [userSkills, setUserSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  const updateStatus = (next: RequestStatus) => {
    setStatus(next);
    onStatusChange(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setErrorMessage("");

    const validation = validateAnalyzeInput(jobDescription, userSkills, experience);
    if (!validation.valid) {
      updateStatus("invalid");
      setFieldErrors(validation.fieldErrors ?? {});
      setErrorMessage(validation.error ?? "Please check your input.");
      return;
    }

    updateStatus("loading");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription, userSkills, experience }),
      });

      let data: JobAnalysisResult | ApiErrorResponse;
      try {
        data = await response.json();
      } catch {
        updateStatus("error");
        setErrorMessage("Received an invalid response from the server. Please try again.");
        return;
      }

      if (!response.ok) {
        const err = data as ApiErrorResponse;

        if (err.code === "AI_UNAVAILABLE") {
          updateStatus("ai_unavailable");
          setErrorMessage(
            err.error ??
              "AI service is unavailable. Ensure OPENAI_API_KEY is set on the server."
          );
          return;
        }

        if (err.code === "VALIDATION_ERROR") {
          updateStatus("invalid");
          if (err.fieldErrors) setFieldErrors(err.fieldErrors);
          setErrorMessage(err.error ?? "Please fix the highlighted fields.");
          return;
        }

        if (err.code === "RATE_LIMIT") {
          updateStatus("error");
          setErrorMessage(err.error ?? "Too many requests. Please wait and try again.");
          return;
        }

        updateStatus("error");
        setErrorMessage(
          err.error ?? "Analysis failed. Please try again in a few seconds."
        );
        return;
      }

      updateStatus("success");
      onAnalysisComplete(data as JobAnalysisResult);
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    } catch {
      updateStatus("error");
      setErrorMessage(
        "Network error — could not reach the server. Check your connection and try again."
      );
    }
  };

  const isLoading = status === "loading";

  return (
    <section
      id="workspace"
      aria-labelledby="workspace-heading"
      className="px-3 py-12 xs:px-4 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          id="workspace-heading"
          title="Job Analysis"
          subtitle="Paste the role details and your background — we'll handle the rest."
        />

        <Card className="animate-fade-in-up">
          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate aria-busy={isLoading}>
            <Textarea
              label="Job Description"
              inputSize="large"
              hint="Paste the full job posting (minimum 50 characters)."
              placeholder="We are looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern CSS. You will lead UI architecture, mentor junior developers, and collaborate with product and design teams..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              error={fieldErrors.jobDescription}
              disabled={isLoading}
            />

            <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              <Textarea
                label="Skills"
                hint="Technical and soft skills (min. 10 characters)."
                placeholder="React, Next.js, TypeScript, Tailwind CSS, REST APIs, Git, Agile, Figma..."
                value={userSkills}
                onChange={(e) => setUserSkills(e.target.value)}
                error={fieldErrors.userSkills}
                disabled={isLoading}
              />

              <Textarea
                label="Experience"
                hint="Work history and key projects (min. 10 characters)."
                placeholder="4 years frontend dev at a SaaS startup. Built dashboards, led Next.js migration, mentored 2 juniors..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                error={fieldErrors.experience}
                disabled={isLoading}
              />
            </div>

            {isLoading && (
              <div
                className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-3 sm:px-4"
                role="status"
                aria-live="polite"
              >
                <div
                  className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-emerald-500/30 border-t-emerald-400"
                  aria-hidden="true"
                />
                <p className="text-xs text-emerald-200 sm:text-sm">
                  Analyzing your profile — this usually takes a few seconds...
                </p>
              </div>
            )}

            {(status === "error" || status === "invalid" || status === "ai_unavailable") &&
              errorMessage && (
                <Alert
                  title={
                    status === "ai_unavailable"
                      ? "AI Service Unavailable"
                      : status === "invalid"
                        ? "Invalid Input"
                        : "Analysis Failed"
                  }
                  message={errorMessage}
                  variant={status === "ai_unavailable" ? "warning" : "error"}
                />
              )}

            <div className="flex flex-col gap-4 border-t border-white/5 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-slate-500">
                Secure server-side analysis. Your API key never reaches the browser.
              </p>
              <Button type="submit" loading={isLoading} size="lg" className="w-full sm:w-auto sm:min-w-[180px]">
                {isLoading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
