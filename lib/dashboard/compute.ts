export type DailyLog = {
  date: string; // "YYYY-MM-DD"
  mood: string | null;
  rating: number | null;
  note: string | null;
  completion_percent: number | null;
};

export type Habit = {
  id: string;
  name: string;
  hint: string | null;
  target_count: number;
  sort_order: number | null;
};

export type HabitEntry = {
  habit_id: string;
  value: number;
};

function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayPoints(
  habits: Habit[],
  entries: HabitEntry[],
): {
  earned: number;
  total: number;
  percent: number;
} {
  const total = habits.reduce((sum, habit) => sum + habit.target_count, 0);

  const earned: number = entries.reduce((sum, entry) => {
    const max_amount = habits.find(
      (habit) => habit.id == entry.habit_id,
    )?.target_count;
    let entered_amount = 0;
    if (max_amount) {
      entered_amount = Math.min(entry.value, max_amount);
    }
    sum += entered_amount;
    return sum;
  }, 0);

  const percent = total === 0 ? 0 : Math.round((earned / total) * 100);

  return { earned, total, percent };
}

export function monthStats(
  logs: DailyLog[],
  today: Date,
): { percent: number; complete: number; total: number } {
  // "2026-06", compare the string prefix to avoid Date/UTC parsing surprises.
  const prefix = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  const currentMonthLogs = logs.filter((log) => log.date.startsWith(prefix));

  // How many days this month hit 100%.
  const complete = currentMonthLogs.reduce(
    (sum, log) => (log.completion_percent === 100 ? sum + 1 : sum),
    0,
  );

  // Days elapsed so far this month (the "/ N" in "10/11 days complete").
  const total = today.getDate();

  // The headline %: average completion across the month's logged days.
  const percent =
    currentMonthLogs.length === 0
      ? 0
      : Math.round(
          currentMonthLogs.reduce(
            (sum, log) => sum + (log.completion_percent ?? 0),
            0,
          ) / currentMonthLogs.length,
        );

  return { percent, complete, total };
}

export function computeStreaks(
  logs: DailyLog[],
  today: Date,
): { current: number; best: number } {
  const completeDays = new Set(
    logs.filter((log) => log.completion_percent === 100).map((log) => log.date),
  );

  // --- current: walk backwards from today ---
  // Today might still be in progress, so an incomplete today doesn't break the
  // streak — we just start counting from yesterday in that case.
  const cursor = new Date(today);
  if (!completeDays.has(toISODate(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let current = 0;
  while (completeDays.has(toISODate(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // --- best: longest run of consecutive complete days ever ---
  // Sort the complete dates ascending, then scan: each date that is exactly one
  // day after the previous extends the run; any gap resets it.
  const sorted = [...completeDays].sort();

  let best = 0;
  let run = 0;
  let prev: string | null = null;

  for (const date of sorted) {
    if (prev !== null) {
      const expected = new Date(prev);
      expected.setDate(expected.getDate() + 1);
      run = toISODate(expected) === date ? run + 1 : 1;
    } else {
      run = 1;
    }
    if (run > best) best = run;
    prev = date;
  }

  return { current, best };
}
