import { describe, it, expect } from "vitest";
import { getScoreLabel, getScoreColor } from "@/lib/utils";

describe("getScoreLabel", () => {
  it("returns correct labels for score ranges", () => {
    expect(getScoreLabel(85)).toBe("Excellent match");
    expect(getScoreLabel(65)).toBe("Good match");
    expect(getScoreLabel(45)).toBe("Moderate match");
    expect(getScoreLabel(20)).toBe("Needs improvement");
  });
});

describe("getScoreColor", () => {
  it("returns emerald for high scores", () => {
    expect(getScoreColor(90)).toContain("emerald");
  });

  it("returns red for low scores", () => {
    expect(getScoreColor(10)).toContain("red");
  });
});
