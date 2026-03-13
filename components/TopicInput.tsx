"use client";

import { useState, KeyboardEvent } from "react";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const EXAMPLE_TOPICS = [
  "Newton's Laws",
  "Photosynthesis",
  "Binary Search",
  "World War II",
  "The Water Cycle",
  "DNA & Genetics",
];

export default function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    const trimmed = topic.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePillClick = (pill: string) => {
    setTopic(pill);
    onSubmit(pill);
  };

  return (
    <div className="w-full">
      {/* Input area */}
      <div className="relative mb-4">
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter any study topic… e.g. Photosynthesis, Black Holes, The French Revolution"
          rows={3}
          disabled={isLoading}
          className="
            w-full resize-none rounded-2xl border-2 border-[rgba(15,14,13,0.1)]
            bg-white px-5 py-4 font-body text-base text-ink
            placeholder:text-[rgba(15,14,13,0.35)]
            transition-all duration-200 disabled:opacity-60
          "
        />
        <div className="absolute bottom-4 right-4 text-xs text-[rgba(15,14,13,0.3)] font-mono">
          {topic.length}/200
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading || !topic.trim()}
        className="explain-btn w-full rounded-2xl py-4 text-base font-semibold tracking-wide font-body"
      >
        <span className="flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating…
            </>
          ) : (
            <>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Explain Topic
            </>
          )}
        </span>
      </button>

      {/* Example pills */}
      <div className="mt-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[rgba(15,14,13,0.4)] font-body">
          Try an example
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_TOPICS.map((pill) => (
            <button
              key={pill}
              onClick={() => handlePillClick(pill)}
              disabled={isLoading}
              className="topic-pill rounded-full px-4 py-1.5 text-sm font-body font-medium text-ink disabled:opacity-50"
            >
              {pill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
