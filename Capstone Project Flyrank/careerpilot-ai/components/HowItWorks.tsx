import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    step: "01",
    title: "Paste Job Description",
    description: "Copy the full posting from any job board into the analysis workspace.",
    icon: "📋",
  },
  {
    step: "02",
    title: "Add Skills & Experience",
    description: "Tell us what you know and where you've worked so we can compare your profile.",
    icon: "💼",
  },
  {
    step: "03",
    title: "Get AI Insights",
    description: "Receive a match score, skill gaps, recommendations, and interview questions.",
    icon: "✨",
  },
  {
    step: "04",
    title: "Chat with AI Coach",
    description: "Ask follow-up career questions for tailored advice and guidance.",
    icon: "💬",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="border-t border-white/5 px-3 py-12 xs:px-4 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          id="how-heading"
          title="How It Works"
          subtitle="Four simple steps to career clarity."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map((item, index) => {
            const delays = ["", "animation-delay-100", "animation-delay-200", "animation-delay-300"];
            return (
            <Card key={item.step} className={`relative text-center animate-fade-in-up ${delays[index]}`}>
              <span
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-3 py-0.5 text-xs font-bold text-navy-950"
                aria-hidden="true"
              >
                {item.step}
              </span>
              <div className="mt-3 text-2xl sm:mt-4 sm:text-3xl" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="mt-3 text-base font-semibold text-white sm:mt-4 sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-xs text-slate-400 sm:text-sm">{item.description}</p>
            </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
