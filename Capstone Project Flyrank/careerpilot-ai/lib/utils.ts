export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent match";
  if (score >= 60) return "Good match";
  if (score >= 40) return "Moderate match";
  return "Needs improvement";
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-cyan-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}
