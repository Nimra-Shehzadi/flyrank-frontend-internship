import { NextResponse } from "next/server";
import { chatWithCareerCoach, isAiConfigured } from "@/lib/ai";
import type { ApiErrorResponse } from "@/lib/types";
import { validateChatMessage } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: string;
      context?: string;
    };

    const message = body.message ?? "";
    const context = body.context?.trim();

    const validation = validateChatMessage(message);
    if (!validation.valid) {
      const errorResponse: ApiErrorResponse = {
        error: validation.error ?? "Invalid message.",
        code: "VALIDATION_ERROR",
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

    const result = await chatWithCareerCoach(message, context);
    return NextResponse.json(result);
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "UNKNOWN";
    const code =
      errMessage === "AI_UNAVAILABLE"
        ? "AI_UNAVAILABLE"
        : errMessage === "RATE_LIMIT"
          ? "RATE_LIMIT"
          : errMessage === "AI_ERROR"
            ? "AI_ERROR"
            : "UNKNOWN";

    const errorResponse: ApiErrorResponse = {
      error:
        code === "RATE_LIMIT"
          ? "Too many requests. Please wait a moment."
          : "Failed to get a response. Please try again.",
      code,
    };

    const status = code === "RATE_LIMIT" ? 429 : code === "AI_UNAVAILABLE" ? 503 : 500;
    return NextResponse.json(errorResponse, { status });
  }
}
