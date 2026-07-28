import { describe, expect, it } from "vitest";
import { Habit, HabitEntry, monthStats, todayPoints } from "./compute";

const testHabits: Habit[] = [
  {
    id: "1",
    name: "Dishes",
    hint: null,
    target_count: 1,
    sort_order: null,
  },
  {
    id: "2",
    name: "Read",
    hint: null,
    target_count: 1,
    sort_order: null,
  },
  {
    id: "3",
    name: "Exercise",
    hint: "Any movement counts",
    target_count: 1,
    sort_order: null,
  },
  {
    id: "4",
    name: "Take Vitamins",
    hint: "Morning and evening",
    target_count: 2,
    sort_order: null,
  },
];

const testEntries: HabitEntry[] = [
  { habit_id: "1", value: 1 }, // Dishes - done
  { habit_id: "2", value: 1 }, // Read - done
  { habit_id: "3", value: 1 }, // Exercise - done
  { habit_id: "4", value: 2 }, // Vitamins - done
];

describe("todayPoints", () => {
  // Asserts the whole object so the `total === 0` guard stays covered:
  // without it, percent would be NaN rather than 0.
  it("returns zeroed points when no habits are added", () => {
    expect(todayPoints([], [])).toEqual({ earned: 0, total: 0, percent: 0 });
  });

  it("returns earned as 0 when no habits are completed", () => {
    expect(todayPoints(testHabits, []).earned).toBe(0);
  });

  it("returns percent as 0 when no habits are completed", () => {
    expect(todayPoints(testHabits, []).percent).toBe(0);
  });

  it("caps earned to target_count value when entry value is greater than maximum allowed", () => {
    const overshootingEntries: HabitEntry[] = [
      { habit_id: "4", value: 5 }, // Vitamins - value higher than target_count
    ];
    expect(todayPoints(testHabits, overshootingEntries).earned).toBe(2);
  });

  it("returns percent as 100 when everything is complete", () => {
    expect(todayPoints(testHabits, testEntries).percent).toBe(100);
  });

  it("excludes earned for a habit that no longer exists", () => {
    expect(todayPoints(testHabits, [{ habit_id: "5", value: 2 }]).earned).toBe(
      0,
    );
  });
});

describe("monthStats", () => {
  const AUG_28 = new Date(2026, 7, 28);

  it("returns 0 complete when monthly logs are empty", () => {
    expect(monthStats([], AUG_28).complete).toBe(0);
  });

  it("uses the days elapsed this month as the total", () => {
    expect(monthStats([], AUG_28).total).toBe(28);
  });

  it("ignores logs belonging to a different month", () => {
    const logs = [
      { date: "2026-07-15", completion_percent: 100 },
      { date: "2026-08-15", completion_percent: 100 },
    ];
    expect(monthStats(logs, AUG_28).complete).toBe(1);
  });

  it("counts only fully complete days towards complete", () => {
    const logs = [
      { date: "2026-08-01", completion_percent: 100 },
      { date: "2026-08-02", completion_percent: 99 },
      { date: "2026-08-03", completion_percent: 100 },
    ];
    expect(monthStats(logs, AUG_28).complete).toBe(2);
  });

  it("treats a null completion percent as zero", () => {
    const logs = [
      { date: "2026-08-01", completion_percent: null },
      { date: "2026-08-02", completion_percent: 100 },
    ];
    // Two days elapsed, so the average is 100 / 2.
    expect(monthStats(logs, new Date(2026, 7, 2)).percent).toBe(50);
  });

  it("counts unlogged days as zero when averaging completion", () => {
    const logs = [
      { date: "2026-08-01", completion_percent: 100 },
      { date: "2026-08-02", completion_percent: 100 },
    ];
    // Four days elapsed but only two logged, so the average is 200 / 4.
    expect(monthStats(logs, new Date(2026, 7, 4)).percent).toBe(50);
  });
});
