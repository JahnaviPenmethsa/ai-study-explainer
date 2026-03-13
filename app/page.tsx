"use client";

import { useState } from "react";
import TopicInput from "@/components/TopicInput";
import ExplanationCard from "@/components/ExplanationCard";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExplain = async (inputTopic: string) => {
    if (!inputTopic.trim()) {
      setError("Please enter a topic to continue.");
      return;
    }

    setTopic(inputTopic);
    setIsLoading(true);
    setError(null);
    setExplanation("");

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: inputTopic }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setExplanation(data.explanation);
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative z-10 min-h-screen px-4 py-12 md:py-20">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-12 text-center animate-fade-up stagger-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(15,14,13,0.1)] bg-white px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-sage animate-pulse" />
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-[rgba(15,14,13,0.5)]">
              AI-Powered Learning
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-ink leading-[1.1] mb-4">
            Study<span className="shimmer-text">Lens</span>
          </h1>

          <p className="font-body text-lg text-[rgba(15,14,13,0.55)] max-w-md mx-auto leading-relaxed">
            Enter any topic and get a clear, student-friendly explanation in seconds.
          </p>
        </div>

        {/* Input card */}
        <div className="card-elevated rounded-3xl p-7 mb-6 animate-fade-up stagger-2">
          <TopicInput onSubmit={handleExplain} isLoading={isLoading} />
        </div>

        {/* Explanation output */}
        <ExplanationCard
          topic={topic}
          explanation={explanation}
          isLoading={isLoading}
          error={error}
        />

        {/* Footer */}
        <p className="mt-16 text-center font-body text-xs text-[rgba(15,14,13,0.25)]">
          Built with Next.js · Gemini AI · Tailwind CSS
        </p>
      </div>
    </main>
  );
}
