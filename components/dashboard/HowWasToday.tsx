"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * HowWasToday
 * -----------
 * Daily check-in: pick a mood, give the day a 1–10 rating, jot a quick note.
 *
 * WIRING NOTES (do this yourself later):
 * - Replace the local useState below with your real data source (store / server).
 * - `mood`        -> string | null   (one of MOODS[].id)
 * - `rating`      -> number | null   (1–10)
 * - `note`        -> string
 * - On change, persist to your backend (e.g. onSave({ mood, rating, note })).
 */

// The mood scale, ordered from worst -> best. `id` is what you store.
const MOODS = [
  { id: "rough", label: "Rough" },
  { id: "low", label: "Low" },
  { id: "okay", label: "Okay" },
  { id: "good", label: "Good" },
  { id: "great", label: "Great" },
] as const;

export function HowWasToday() {
  // --- local placeholder state (swap for real wiring) ---
  const [mood, setMood] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [note, setNote] = useState("");

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* LEFT: mood + rating */}
      <div className="flex flex-1 flex-col gap-5">
        {/* MOOD */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Mood
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {MOODS.map((m) => {
              const selected = mood === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(selected ? null : m.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors",
                    selected
                      ? "border-[#6EE7A8] bg-[#6EE7A8]/10 text-foreground"
                      : "border-border text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-colors",
                      selected ? "bg-[#6EE7A8]" : "bg-muted-foreground/40",
                    )}
                  />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* RATING (1–10) */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Rating
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {Array.from({ length: 10 }).map((_, i) => {
              const value = i + 1;
              const active = rating !== null && value <= rating;
              return (
                <button
                  key={value}
                  type="button"
                  aria-label={`Rate ${value} out of 10`}
                  onClick={() => setRating(rating === value ? null : value)}
                  className={cn(
                    "size-7 rounded-md border text-xs transition-colors",
                    active
                      ? "border-[#6EE7A8] bg-[#6EE7A8]/15 text-foreground"
                      : "border-border bg-muted/40 text-muted-foreground hover:bg-muted/60",
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT: note */}
      <div className="flex flex-1 flex-col">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Note
        </p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What did you get done today?"
          rows={5}
          className="mt-2 h-full min-h-28 w-full resize-none rounded-lg border border-input
                     bg-transparent px-3 py-2 text-sm outline-none transition-colors
                     placeholder:text-muted-foreground focus-visible:border-ring
                     focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
        />
      </div>
    </div>
  );
}
