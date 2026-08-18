import type { ChatResponse, JobAnalysisResult } from "./types";
import { clampMatchScore } from "./validation";

/**
 * API-free CareerPilot AI
 * Uses local keyword/skill matching.
 * No OpenAI API, no HuggingFace model, no external requests.
 */

export function isAiConfigured(): boolean {
  return true;
}

const SKILLS = [
  "react",
  "react.js",
  "next.js",
  "nextjs",
  "typescript",
  "javascript",
  "python",
  "java",
  "c++",
  "c#",
  "html",
  "html5",
  "css",
  "css3",
  "tailwind",
  "tailwind css",
  "bootstrap",
  "node.js",
  "nodejs",
  "express",
  "rest api",
  "rest apis",
  "api",
  "git",
  "github",
  "sql",
  "mysql",
  "mongodb",
  "figma",
  "responsive design",
  "accessibility",
  "testing",
  "jest",
  "vitest",
  "vercel",
  "aws",
  "docker",
  "redux",
  "graphql",
  "ai",
  "artificial intelligence",
  "machine learning",
  "ai-assisted development",
  "typescript",
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s.+#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function containsSkill(text: string, skill: string): boolean {
  const normalizedText = normalize(text);
  const normalizedSkill = normalize(skill);

  return normalizedText.includes(normalizedSkill);
}

function extractSkills(text: string): string[] {
  return SKILLS.filter((skill) => containsSkill(text, skill));
}

function prettySkill(skill: string): string {
  const names: Record<string, string> = {
    react: "React",
    "react.js": "React.js",
    "next.js": "Next.js",
    nextjs: "Next.js",
    typescript: "TypeScript",
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
    "c++": "C++",
    "c#": "C#",
    html: "HTML",
    html5: "HTML5",
    css: "CSS",
    css3: "CSS3",
    tailwind: "Tailwind CSS",
    "tailwind css": "Tailwind CSS",
    bootstrap: "Bootstrap",
    "node.js": "Node.js",
    nodejs: "Node.js",
    express: "Express.js",
    "rest api": "REST APIs",
    "rest apis": "REST APIs",
    api: "APIs",
    git: "Git",
    github: "GitHub",
    sql: "SQL",
    mysql: "MySQL",
    mongodb: "MongoDB",
    figma: "Figma",
    "responsive design": "Responsive Design",
    accessibility: "Accessibility",
    testing: "Testing",
    jest: "Jest",
    vitest: "Vitest",
    vercel: "Vercel",
    aws: "AWS",
    docker: "Docker",
    redux: "Redux",
    graphql: "GraphQL",
    ai: "AI",
    "artificial intelligence": "Artificial Intelligence",
    "machine learning": "Machine Learning",
    "ai-assisted development": "AI-assisted Development",
  };

  return names[skill] ?? skill;
}

function createRecommendations(
  matchingSkills: string[],
  missingSkills: string[]
): string[] {
  const recommendations: string[] = [];

  if (missingSkills.length > 0) {
    recommendations.push(
      `Strengthen your knowledge of ${missingSkills
        .slice(0, 3)
        .join(", ")} to better match this role.`
    );
  }

  if (!matchingSkills.some((s) => s.toLowerCase().includes("testing"))) {
    recommendations.push(
      "Add practical testing experience with Jest, Vitest, or another frontend testing tool."
    );
  }

  if (!matchingSkills.some((s) => s.toLowerCase().includes("accessibility"))) {
    recommendations.push(
      "Improve accessibility knowledge and demonstrate WCAG-friendly UI practices."
    );
  }

  if (!matchingSkills.some((s) => s.toLowerCase().includes("git"))) {
    recommendations.push(
      "Highlight Git and GitHub workflows, including branching, commits, and pull requests."
    );
  }

  if (!matchingSkills.some((s) => s.toLowerCase().includes("vercel"))) {
    recommendations.push(
      "Add a deployed production project and document the deployment process."
    );
  }

  return recommendations.slice(0, 5);
}

function createInterviewQuestions(
  jobDescription: string,
  matchingSkills: string[]
): string[] {
  const questions: string[] = [];

  if (matchingSkills.some((s) => s.toLowerCase().includes("react"))) {
    questions.push(
      "How do you structure and manage reusable components in a React application?"
    );
  }

  if (
    matchingSkills.some(
      (s) =>
        s.toLowerCase().includes("next") ||
        s.toLowerCase().includes("typescript")
    )
  ) {
    questions.push(
      "How have you used Next.js and TypeScript to build a production-ready application?"
    );
  }

  if (
    matchingSkills.some(
      (s) =>
        s.toLowerCase().includes("api") ||
        s.toLowerCase().includes("rest")
    )
  ) {
    questions.push(
      "How would you handle API loading, success, error, and empty states in a frontend application?"
    );
  }

  if (
    matchingSkills.some(
      (s) =>
        s.toLowerCase().includes("git") ||
        s.toLowerCase().includes("github")
    )
  ) {
    questions.push(
      "How do you use Git and GitHub in your development workflow?"
    );
  }

  if (
    matchingSkills.some(
      (s) =>
        s.toLowerCase().includes("tailwind") ||
        s.toLowerCase().includes("css") ||
        s.toLowerCase().includes("responsive")
    )
  ) {
    questions.push(
      "How do you build responsive and maintainable user interfaces?"
    );
  }

  // Always make sure exactly 5 questions are returned.
  const fallbackQuestions = [
    "How do you make a frontend application accessible?",
    "Describe a challenging frontend project you built and explain the decisions you made.",
    "How do you handle loading, error, and empty states in a web application?",
    "How do you test and improve the quality of your frontend applications?",
    "How would you optimize the performance of a production frontend application?",
  ];

  for (const question of fallbackQuestions) {
    if (questions.length >= 5) break;

    if (!questions.includes(question)) {
      questions.push(question);
    }
  }

  return questions.slice(0, 5);
}

function createSummary(
  matchingSkills: string[],
  missingSkills: string[],
  experience: string
): string {
  const topSkills = matchingSkills.slice(0, 5).join(", ");

  if (matchingSkills.length === 0) {
    return "The candidate currently shows limited direct alignment with the listed requirements. Building practical experience with the technologies mentioned in the job description would improve their fit.";
  }

  return `The candidate demonstrates relevant experience with ${topSkills}${
    experience.trim() ? " through practical project and development experience" : ""
  }. The profile is a reasonable match for this role, with ${
    missingSkills.length
  } notable skill gap${missingSkills.length === 1 ? "" : "s"} to address.`;
}

export async function analyzeJobMatch(
  jobDescription: string,
  userSkills: string,
  experience: string
): Promise<JobAnalysisResult> {
  const jobText = normalize(jobDescription);
  const candidateText = `${normalize(userSkills)} ${normalize(experience)}`;

  const jobSkills = extractSkills(jobText);

  const matchingRaw = jobSkills.filter((skill) =>
    containsSkill(candidateText, skill)
  );

  const missingRaw = jobSkills.filter(
    (skill) => !containsSkill(candidateText, skill)
  );

  const matchingSkills = [
    ...new Set(matchingRaw.map(prettySkill)),
  ];

  const missingSkills = [
    ...new Set(missingRaw.map(prettySkill)),
  ];

  let matchScore = 0;

  if (jobSkills.length > 0) {
    matchScore = Math.round(
      (matchingRaw.length / jobSkills.length) * 100
    );
  } else {
    matchScore = 50;
  }

  // Give a small experience bonus when the candidate has substantial experience.
  if (experience.trim().length > 100 && matchScore < 100) {
    matchScore += 5;
  }

  matchScore = clampMatchScore(Math.min(matchScore, 100));

  const recommendations = createRecommendations(
    matchingSkills,
    missingSkills
  );

  const professionalSummary = createSummary(
    matchingSkills,
    missingSkills,
    experience
  );

  const interviewQuestions = createInterviewQuestions(
    jobDescription,
    matchingSkills
  );

  return {
    matchScore,
    matchingSkills,
    missingSkills,
    recommendations,
    professionalSummary,
    interviewQuestions,
  };
}

export async function chatWithCareerCoach(
  message: string,
  context?: string
): Promise<ChatResponse> {
  const question = normalize(message);

  let reply =
    "CareerPilot recommends focusing on the skills most relevant to your target role and building practical projects that demonstrate them.";

  if (
    question.includes("interview") ||
    question.includes("question")
  ) {
    reply =
      "For interviews, prepare concise examples of your projects, technical decisions, challenges you solved, API integration, responsive design, accessibility, testing, and deployment. Use the STAR structure when answering behavioral questions.";
  } else if (
    question.includes("resume") ||
    question.includes("cv")
  ) {
    reply =
      "Keep your resume focused on measurable project outcomes, technologies used, and your specific contribution. Highlight React, Next.js, TypeScript, AI-assisted development, accessibility, testing, Git, and deployed projects when they are relevant to the target role.";
  } else if (
    question.includes("skill") ||
    question.includes("learn")
  ) {
    reply =
      "Prioritize the skills appearing most frequently in your target job descriptions. Build one strong project using those technologies and document the architecture, accessibility decisions, testing, error handling, and deployment.";
  } else if (
    question.includes("job") ||
    question.includes("career")
  ) {
    reply =
      "For your job search, target roles where your existing frontend skills overlap strongly with the requirements. Keep improving the missing skills and maintain a portfolio with live, production-ready projects.";
  } else if (question.includes("react")) {
    reply =
      "For React roles, focus on reusable components, state management, hooks, API integration, performance, accessibility, responsive design, and testing. Be ready to explain the architecture of your projects.";
  }

  if (context && context.length > 0) {
    reply +=
      " You can also use your latest CareerPilot analysis to focus specifically on the skill gaps identified for that job.";
  }

  return { reply };
}