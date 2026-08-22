/*
# Create lesson progress and learner stats tables (single-tenant, no auth)

1. Purpose
   This is a no-sign-in single-tenant learning app. We persist two things:
   - Which lessons the learner has completed.
   - The learner's running stats: total XP, day streak, level, and last active date.

2. New Tables
   - `lesson_progress`
     - `id` (uuid, primary key)
     - `lesson_id` (text, not null) — matches the lesson id in course data, e.g. "what-is-var"
     - `module_id` (text, not null) — matches the module id, e.g. "variables"
     - `completed` (boolean, default false)
     - `completed_at` (timestamptz, nullable) — set when marked complete
     - `created_at` (timestamptz, default now())
     - Unique constraint on (module_id, lesson_id) so each lesson has one row.
   - `learner_stats`
     - `id` (uuid, primary key)
     - `xp` (integer, default 0) — total experience points
     - `streak` (integer, default 0) — consecutive day streak
     - `level` (integer, default 1) — current learner level
     - `last_active_date` (date, nullable) — last day the learner completed a lesson
     - `updated_at` (timestamptz, default now())
     - Singleton row enforced by a unique index on id (only one row expected).

3. Security
   - Enable RLS on both tables.
   - This is a single-tenant no-auth app, so the anon-key frontend must be able to
     read and write. Policies use `TO anon, authenticated` with `USING (true)` /
     `WITH CHECK (true)` because the data is intentionally shared/public.

4. Notes
   - No user_id column — there is no sign-in flow.
   - An index on module_id helps future module-level queries.
*/

CREATE TABLE IF NOT EXISTS lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id text NOT NULL,
  module_id text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (module_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_lesson_progress_module ON lesson_progress (module_id);

ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_select_lesson_progress" ON lesson_progress FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_insert_lesson_progress" ON lesson_progress FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_update_lesson_progress" ON lesson_progress FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_lesson_progress" ON lesson_progress;
CREATE POLICY "anon_delete_lesson_progress" ON lesson_progress FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS learner_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  xp integer NOT NULL DEFAULT 0,
  streak integer NOT NULL DEFAULT 0,
  level integer NOT NULL DEFAULT 1,
  last_active_date date,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE learner_stats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_learner_stats" ON learner_stats;
CREATE POLICY "anon_select_learner_stats" ON learner_stats FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_learner_stats" ON learner_stats;
CREATE POLICY "anon_insert_learner_stats" ON learner_stats FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_learner_stats" ON learner_stats;
CREATE POLICY "anon_update_learner_stats" ON learner_stats FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_learner_stats" ON learner_stats;
CREATE POLICY "anon_delete_learner_stats" ON learner_stats FOR DELETE
  TO anon, authenticated USING (true);
