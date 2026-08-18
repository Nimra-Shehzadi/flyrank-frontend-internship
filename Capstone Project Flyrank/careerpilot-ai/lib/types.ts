export interface JobAnalysisResult {
  matchScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  professionalSummary: string;
  interviewQuestions: string[];
}

export interface AnalyzeRequest {
  jobDescription: string;
  userSkills: string;
  experience: string;
}

export interface ChatRequest {
  message: string;
  context?: string;
}

export interface ChatResponse {
  reply: string;
}

export type ApiErrorCode =
  | "VALIDATION_ERROR"
  | "AI_UNAVAILABLE"
  | "AI_ERROR"
  | "RATE_LIMIT"
  | "UNKNOWN";

export interface ApiErrorResponse {
  error: string;
  code: ApiErrorCode;
  fieldErrors?: Record<string, string>;
}

export type RequestStatus =
  | "idle"
  | "loading"
  | "success"
  | "error"
  | "invalid"
  | "ai_unavailable";
