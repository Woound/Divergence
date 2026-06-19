-- ============================================================
-- Divergence — habit seed script
-- ------------------------------------------------------------
-- HOW TO RUN:
--   1. Sign up / log in to the app at least once (creates your
--      auth.users row + profiles row via the handle_new_user trigger).
--   2. Get your user id: Supabase → Authentication → Users → copy the
--      UUID of your account.
--   3. Paste it into the single quotes on BOTH `PASTE-YOUR-USER-UUID-HERE`
--      lines below.
--   4. Open Supabase → SQL Editor → New query, paste this file, Run.
--
-- WHY NOT auth.uid()? The SQL editor runs with elevated privileges,
-- not as your logged-in user, so auth.uid() is NULL here. We pass the
-- id explicitly instead.
--
-- Inserts your 6 daily non-negotiables, totalling 10 points/day
-- (5 Prayers counts as 5, the rest as 1 each).
-- ============================================================

insert into habits (user_id, name, hint, target_count, sort_order)
select
  seed_user.id,
  habit.name,
  habit.hint,
  habit.target_count,
  habit.sort_order
from
  (select 'PASTE-YOUR-USER-UUID-HERE'::uuid as id) as seed_user
  cross join (
    values
      ('5 Prayers',       'Fajr · Dhuhr · Asr · Maghrib · Isha', 5, 0),
      ('Quran',           'A page, or more',                     1, 1),
      ('Work out',        'Move the body',                       1, 2),
      ('Study · Block 1', 'Morning deep work',                   1, 3),
      ('Study · Block 2', 'Evening review',                      1, 4),
      ('Read',            '20 minutes',                          1, 5)
  ) as habit (name, hint, target_count, sort_order);

-- Sanity check — should return 6 rows, total target_count = 10.
select name, hint, target_count, sort_order
from habits
where user_id = 'PASTE-YOUR-USER-UUID-HERE'::uuid
order by sort_order;
