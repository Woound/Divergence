"use client";

import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { PrayerCheckbox } from "@/components/dashboard/PrayerCheckbox";

type Task = {
  id: string;
  label: string;
  hint: string;
};

const tasks: Task[] = [
  { id: "quran", label: "Quran", hint: "A page, or more" },
  { id: "workout", label: "Work out", hint: "Move the body" },
  { id: "study-1", label: "Study · Block 1", hint: "Morning deep work" },
  { id: "study-2", label: "Study · Block 2", hint: "Evening review" },
  { id: "read", label: "Read", hint: "20 minutes" },
];

function TaskRow({ task }: { task: Task }) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      htmlFor={task.id}
      className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-2
                 text-left transition-colors hover:bg-muted/50"
    >
      <Checkbox
        id={task.id}
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
        className="size-7 rounded-lg border bg-muted/40 transition-all
                   data-checked:border-[#6EE7A8] data-checked:bg-[#6EE7A8]
                   dark:data-checked:bg-[#6EE7A8]
                   data-checked:text-emerald-950
                   data-checked:shadow-[0_0_6px_1px_rgba(110,231,168,0.6)]
                   [&>span>svg]:size-4"
      />

      <span className="flex min-w-0 flex-col">
        <span
          data-done={checked ? "" : undefined}
          className="text-sm font-medium text-foreground data-done:text-muted-foreground"
        >
          {task.label}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {task.hint}
        </span>
      </span>
    </label>
  );
}

export function NonNegotiables() {
  return (
    // 2-column grid: items flow down each column, so the list stays balanced
    // as you add more non-negotiables later (3/3, 4/4, etc.).
    <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
      <PrayerCheckbox
      // value={progress.prayers ?? 0}
      // onChange={(v) => setProgress('prayers', v)}
      />
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
    </div>
  );
}
