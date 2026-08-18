const MIN_JOB_LENGTH = 50;
const MIN_SKILLS_LENGTH = 10;
const MIN_EXPERIENCE_LENGTH = 10;
const MAX_INPUT_LENGTH = 8000;
const MIN_CHAT_LENGTH = 3;
const MAX_CHAT_LENGTH = 2000;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface AnalyzeValidationResult extends ValidationResult {
  fieldErrors?: {
    jobDescription?: string;
    userSkills?: string;
    experience?: string;
  };
}

export function validateAnalyzeInput(
  jobDescription: string,
  userSkills: string,
  experience: string
): AnalyzeValidationResult {
  const job = jobDescription.trim();
  const skills = userSkills.trim();
  const exp = experience.trim();
  const fieldErrors: AnalyzeValidationResult["fieldErrors"] = {};

  if (!job) fieldErrors.jobDescription = "Job description is required.";
  if (!skills) fieldErrors.userSkills = "Skills are required.";
  if (!exp) fieldErrors.experience = "Experience is required.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      valid: false,
      error: "Please fill in all required fields.",
      fieldErrors,
    };
  }

  if (job.length < MIN_JOB_LENGTH) {
    fieldErrors.jobDescription = `Must be at least ${MIN_JOB_LENGTH} characters.`;
  }

  if (skills.length < MIN_SKILLS_LENGTH) {
    fieldErrors.userSkills = `Must be at least ${MIN_SKILLS_LENGTH} characters.`;
  }

  if (exp.length < MIN_EXPERIENCE_LENGTH) {
    fieldErrors.experience = `Must be at least ${MIN_EXPERIENCE_LENGTH} characters.`;
  }

  if (job.length > MAX_INPUT_LENGTH) {
    fieldErrors.jobDescription = `Must be under ${MAX_INPUT_LENGTH} characters.`;
  }

  if (skills.length > MAX_INPUT_LENGTH) {
    fieldErrors.userSkills = `Must be under ${MAX_INPUT_LENGTH} characters.`;
  }

  if (exp.length > MAX_INPUT_LENGTH) {
    fieldErrors.experience = `Must be under ${MAX_INPUT_LENGTH} characters.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      valid: false,
      error: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  return { valid: true };
}

export function validateChatMessage(message: string): ValidationResult {
  const trimmed = message.trim();

  if (!trimmed) {
    return { valid: false, error: "Please enter a message." };
  }

  if (trimmed.length < MIN_CHAT_LENGTH) {
    return {
      valid: false,
      error: `Message must be at least ${MIN_CHAT_LENGTH} characters.`,
    };
  }

  if (trimmed.length > MAX_CHAT_LENGTH) {
    return {
      valid: false,
      error: `Message must be under ${MAX_CHAT_LENGTH} characters.`,
    };
  }

  return { valid: true };
}

export function clampMatchScore(score: number): number {
  return Math.min(100, Math.max(0, Math.round(score)));
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export function normalizeAnalysisResponse(raw: unknown): {
  valid: boolean;
  data?: {
    matchScore: number;
    matchingSkills: string[];
    missingSkills: string[];
    recommendations: string[];
    professionalSummary: string;
    interviewQuestions: string[];
  };
} {
  if (!raw || typeof raw !== "object") return { valid: false };

  const obj = raw as Record<string, unknown>;

  return {
    valid: true,
    data: {
      matchScore: clampMatchScore(Number(obj.matchScore) || 0),
      matchingSkills: asStringArray(obj.matchingSkills),
      missingSkills: asStringArray(obj.missingSkills),
      recommendations: asStringArray(obj.recommendations),
      professionalSummary:
        typeof obj.professionalSummary === "string" ? obj.professionalSummary : "",
      interviewQuestions: asStringArray(obj.interviewQuestions),
    },
  };
}
