import { describe, it, expect } from "vitest";
import {
  validateAnalyzeInput,
  validateChatMessage,
  clampMatchScore,
  normalizeAnalysisResponse,
} from "@/lib/validation";

describe("validateAnalyzeInput", () => {
  it("rejects empty fields with field errors", () => {
    const result = validateAnalyzeInput("", "", "");
    expect(result.valid).toBe(false);
    expect(result.fieldErrors?.jobDescription).toBeDefined();
    expect(result.fieldErrors?.userSkills).toBeDefined();
    expect(result.fieldErrors?.experience).toBeDefined();
  });

  it("rejects short job description", () => {
    const result = validateAnalyzeInput("short", "React, TypeScript", "3 years dev");
    expect(result.valid).toBe(false);
    expect(result.fieldErrors?.jobDescription).toContain("50");
  });

  it("rejects short skills", () => {
    const result = validateAnalyzeInput("a".repeat(55), "React", "3 years dev experience");
    expect(result.valid).toBe(false);
    expect(result.fieldErrors?.userSkills).toBeDefined();
  });

  it("rejects short experience", () => {
    const result = validateAnalyzeInput(
      "a".repeat(55),
      "React, TypeScript, Node.js",
      "short"
    );
    expect(result.valid).toBe(false);
    expect(result.fieldErrors?.experience).toBeDefined();
  });

  it("accepts valid input", () => {
    const result = validateAnalyzeInput(
      "a".repeat(55),
      "React, TypeScript, Node.js",
      "4 years frontend development at a SaaS company"
    );
    expect(result.valid).toBe(true);
  });
});

describe("normalizeAnalysisResponse", () => {
  it("normalizes a valid AI response", () => {
    const result = normalizeAnalysisResponse({
      matchScore: 78.4,
      matchingSkills: ["React"],
      missingSkills: ["GraphQL"],
      recommendations: ["Learn GraphQL"],
      professionalSummary: "Strong frontend candidate.",
      interviewQuestions: ["Q1", "Q2", "Q3", "Q4", "Q5"],
    });

    expect(result.valid).toBe(true);
    expect(result.data?.matchScore).toBe(78);
    expect(result.data?.recommendations).toEqual(["Learn GraphQL"]);
  });

  it("rejects invalid response", () => {
    expect(normalizeAnalysisResponse(null).valid).toBe(false);
  });
});

describe("validateChatMessage", () => {
  it("rejects empty message", () => {
    expect(validateChatMessage("").valid).toBe(false);
  });

  it("rejects too short message", () => {
    expect(validateChatMessage("hi").valid).toBe(false);
  });

  it("accepts valid message", () => {
    expect(validateChatMessage("How do I prepare for interviews?").valid).toBe(true);
  });
});

describe("clampMatchScore", () => {
  it("clamps to 0-100 range", () => {
    expect(clampMatchScore(-10)).toBe(0);
    expect(clampMatchScore(150)).toBe(100);
    expect(clampMatchScore(72.6)).toBe(73);
  });
});
