"use server";

import {
  Habit,
  HabitEntry,
  todayPoints,
  toISODate,
} from "@/lib/dashboard/compute";
import { createClient } from "@/lib/supabase/server";
import { Points } from "@/lib/dashboard/compute";
import { revalidatePath } from "next/cache";

const recomputeCompletionPercent = (
  habits: Habit[],
  entries: HabitEntry[],
): Points => {
  const values = todayPoints(habits, entries);
  return values;
};

export async function setHabitValue(habitId: string, value: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const upsertingDailyLog = await supabase
    .from("daily_logs")
    .upsert(
      {
        date: toISODate(new Date()),
        user_id: user.id,
      },
      { onConflict: "user_id,date" },
    )
    .select("id")
    .single();
  if (!upsertingDailyLog.data) return;

  const upsertHabitEntry = await supabase
    .from("habit_entries")
    .upsert(
      {
        daily_log_id: upsertingDailyLog.data?.id,
        habit_id: habitId,
        user_id: user.id,
        value: value,
      },
      {
        onConflict: "daily_log_id,habit_id",
      },
    )
    .select();
  if (!upsertHabitEntry.data) return;

  const { data: habit_entries } = await supabase
    .from("habit_entries")
    .select()
    .eq("daily_log_id", upsertingDailyLog.data?.id);

  const { data: habits } = await supabase
    .from("habits")
    .select("id, name, hint, target_count, sort_order");

  if (habit_entries && habits) {
    const completionValues: Points = recomputeCompletionPercent(
      habits,
      habit_entries,
    );
    await supabase
      .from("daily_logs")
      .update({
        completion_percent: completionValues.percent,
      })
      .eq("id", upsertingDailyLog.data.id);
  }

  revalidatePath("/");
}
