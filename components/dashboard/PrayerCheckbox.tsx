"use client";

import { Check } from "lucide-react";
import { useState } from "react";

type Props = {
  label?: string;
  hint?: string;
  target?: number;
  value?: number;
  onChange?: (next: Number) => void;
};

export function PrayerCheckbox({
  label = "5 Prayers",
  hint = "Fajr · Dhuhr · Asr · Maghrib · Isha",
  target = 5,
  value,
  onChange,
}: Props) {
  const [internal, setInternal] = useState(0);
  const count = value ?? internal;

  const done = count >= target;
  const partial = !done && count > 0;

  const click = () => {
    const next = done ? 0 : count + 1;
    onChange?.(next);
    if (value === undefined) setInternal(next);
  };
  return (
    <button
      type="button"
      onClick={click}
      aria-label={`${label}: ${count} of ${target}`}
      className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left
                 transition-colors hover:bg-muted/50 cursor-pointer"
    >
      <span
        data-done={done ? "" : undefined}
        data-partial={partial ? "" : undefined}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border bg-muted/40
                   text-emerald-950 transition-all
                   data-done:border-[#6EE7A8] data-done:bg-[#6EE7A8]
                   data-done:shadow-[0_0_6px_1px_rgba(110,231,168,0.6)]
                   data-partial:border-[#6EE7A8]/60"
      >
        {done ? (
          <Check className="h-4 w-4" strokeWidth={3} />
        ) : (
          <span className="text-[13px] font-semibold tabular-nums text-[#6EE7A8]">
            {count || ""}
          </span>
        )}
      </span>

      <span className="flex min-w-0 flex-col">
        <span
          data-done={done ? "" : undefined}
          className="text-sm font-medium text-foreground data-done:text-muted-foreground"
        >
          {label}
        </span>
        <span className="truncate text-xs text-muted-foreground">{hint}</span>
      </span>

      <span className="ml-auto flex shrink-0 gap-1" aria-hidden="true">
        {Array.from({ length: target }).map((_, i) => (
          <i
            key={i}
            data-on={i < count ? "" : undefined}
            className="h-1.5 w-1.5 rounded-full bg-muted-foreground/25
                       data-on:bg-[#6EE7A8]"
          />
        ))}
      </span>
    </button>
  );
}
