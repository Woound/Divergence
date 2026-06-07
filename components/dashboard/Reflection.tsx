"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Reflection
 * ----------
 * AI-generated insights you can page through. Each insight has a short
 * heading (e.g. "Correlation") and a sentence or two of body text.
 *
 * WIRING NOTES:
 * - Replace `INSIGHTS` with whatever your AI returns.
 *   Shape: { heading: string, body: string }.
 * - `index` tracks the visible insight; "Next insight" advances it.
 *   Swap for real pagination / fetch-on-demand if you stream them in.
 */

type Insight = { heading: string; body: string };

// --- placeholder data (swap for real AI output) ---
const INSIGHTS: Insight[] = [
  {
    heading: "Correlation",
    body: "On days you work out, your evening rating averages about two points higher. Movement is quietly carrying your mood.",
  },
  {
    heading: "Pattern",
    body: "Your strongest streaks start on Mondays. Front-loading the week seems to set the tone.",
  },
  {
    heading: "Nudge",
    body: "Reading slips most on busy days. A 5-minute floor might keep the habit alive when time is tight.",
  },
];

export function Reflection() {
  // --- local placeholder state (swap for real wiring) ---
  const [index, setIndex] = useState(0);
  const insight = INSIGHTS[index];

  const next = () => setIndex((i) => (i + 1) % INSIGHTS.length);

  return (
    <div className="flex h-full flex-col">
      {/* Header with AI badge */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Reflection
        </p>
        <span className="flex size-6 items-center justify-center rounded-md bg-[#6EE7A8]/15 text-[#6EE7A8]">
          <Sparkles className="size-3.5" />
        </span>
      </div>

      {/* Body */}
      <div className="mt-4 flex-1">
        <p className="text-sm font-semibold text-[#6EE7A8]">
          {insight.heading}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          {insight.body}
        </p>
      </div>

      {/* Footer: pagination dots + next */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {INSIGHTS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show insight ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-4 bg-[#6EE7A8]"
                  : "w-1.5 bg-muted-foreground/30",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Next insight →
        </button>
      </div>
    </div>
  );
}
