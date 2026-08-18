"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { JobAnalysisResult } from "@/lib/types";
import { validateChatMessage } from "@/lib/validation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface CareerChatProps {
  analysisContext: JobAnalysisResult | null;
}

export function CareerChat({ analysisContext }: CareerChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm your AI career coach. Ask me about interview prep, resume tips, skill development, or anything career-related.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const buildContext = (): string | undefined => {
    if (!analysisContext) return undefined;
    return `Match score: ${analysisContext.matchScore}. Matching skills: ${analysisContext.matchingSkills.join(", ")}. Missing skills: ${analysisContext.missingSkills.join(", ")}.`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validation = validateChatMessage(input);
    if (!validation.valid) {
      setError(validation.error ?? "Invalid message.");
      return;
    }

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, context: buildContext() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Failed to get a response.");
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setError("Network error. Please try again.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="chat"
      aria-labelledby="chat-heading"
      className="border-t border-white/5 px-3 py-12 xs:px-4 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          id="chat-heading"
          title="AI Career Chat"
          subtitle="Ask follow-up questions about interviews, resumes, or skill development."
        />

        <Card className="flex flex-col animate-fade-in-up" ariaLabel="Career chat panel">
          <div
            className="mb-4 max-h-72 space-y-3 overflow-y-auto pr-1 sm:max-h-96 sm:space-y-4 sm:pr-2"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] rounded-2xl px-3 py-2.5 text-xs leading-relaxed sm:max-w-[85%] sm:px-4 sm:py-3 sm:text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white"
                      : "border border-white/5 bg-white/5 text-slate-300"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start" role="status">
                <div className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-slate-400">
                  <span className="inline-flex gap-1">
                    <span className="animate-pulse">●</span>
                    <span className="animate-pulse animation-delay-100">●</span>
                    <span className="animate-pulse animation-delay-200">●</span>
                  </span>
                  <span className="sr-only">Assistant is typing</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {error && (
            <Alert title="Chat Error" message={error} variant="error" className="mb-4" />
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 xs:flex-row xs:gap-3">
            <label htmlFor="chat-input" className="sr-only">
              Type your career question
            </label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about interviews, resumes, skills..."
              disabled={loading}
              className="flex-1 rounded-xl border border-white/10 bg-navy-950/50 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900 disabled:opacity-50 sm:px-4 sm:py-3"
            />
            <Button type="submit" loading={loading} disabled={!input.trim()} className="w-full xs:w-auto">
              Send
            </Button>
          </form>
        </Card>
      </div>
    </section>
  );
}
