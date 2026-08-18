import { NextResponse } from "next/server";
import { analyzeJobMatch, isAiConfigured } from "@/lib/ai";
import type { ApiErrorResponse } from "@/lib/types";
import { validateAnalyzeInput } from "@/lib/validation";

function mapAiError(code: string): { message: string; status: number } {
  switch (code) {
    case "AI_UNAVAILABLE":
      return {
        message:
          "AI service is not configured. Add OPENAI_API_KEY to your server environment.",
        status: 503,
      };
    case "RATE_LIMIT":
      return {
        message: "Too many requests. Please wait a moment and try again.",
        status: 429,
      };
    case "AI_ERROR":
      return {
        message:
          "The AI could not complete the analysis. Please try again in a few seconds.",
        status: 502,
      };
    default:
      return {
        message: "Something went wrong while analyzing the job. Please try again.",
        status: 500,
      };
  }
}

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      const errorResponse: ApiErrorResponse = {
        error: "Invalid request body. Expected JSON.",
        code: "VALIDATION_ERROR",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const {
      jobDescription = "",
      userSkills = "",
      experience = "",
    } = (body ?? {}) as Record<string, unknown>;

    if (
      typeof jobDescription !== "string" ||
      typeof userSkills !== "string" ||
      typeof experience !== "string"
    ) {
      const errorResponse: ApiErrorResponse = {
        error: "jobDescription, userSkills, and experience must be strings.",
        code: "VALIDATION_ERROR",
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const validation = validateAnalyzeInput(jobDescription, userSkills, experience);
    if (!validation.valid) {
      const errorResponse: ApiErrorResponse = {
        error: validation.error ?? "Invalid input.",
        code: "VALIDATION_ERROR",
        fieldErrors: validation.fieldErrors,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    if (!isAiConfigured()) {
      const errorResponse: ApiErrorResponse = {
        error: "AI service is not configured. Please set OPENAI_API_KEY.",
        code: "AI_UNAVAILABLE",
      };
      return NextResponse.json(errorResponse, { status: 503 });
    }

    const result = await analyzeJobMatch(jobDescription, userSkills, experience);
    return NextResponse.json(result);
  } catch (error) {
    const code = error instanceof Error ? error.message : "UNKNOWN";
    const mapped = mapAiError(code);

    const errorResponse: ApiErrorResponse = {
      error: mapped.message,
      code:
        code === "AI_UNAVAILABLE"
          ? "AI_UNAVAILABLE"
          : code === "RATE_LIMIT"
            ? "RATE_LIMIT"
            : code === "AI_ERROR"
              ? "AI_ERROR"
              : "UNKNOWN",
    };

    return NextResponse.json(errorResponse, { status: mapped.status });
  }
}
