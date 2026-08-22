-- Add user_id to existing tables and create user_profiles table for auth-based per-user progress

-- 1) Add user_id column to lesson_progress
ALTER TABLE lesson_progress ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop the old unique constraint that didn't include user_id
ALTER TABLE lesson_progress DROP CONSTRAINT IF EXISTS lesson_progress_module_id_lesson_id_key;

-- Add new unique constraint scoped per user
CREATE UNIQUE INDEX IF NOT EXISTS lesson_progress_user_module_lesson_uniq
  ON lesson_progress (user_id, module_id, lesson_id);

-- Index for filtering by user
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON lesson_progress (user_id);

-- 2) Add user_id column to learner_stats
ALTER TABLE learner_stats ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Make user_id unique (one stats row per user)
CREATE UNIQUE INDEX IF NOT EXISTS learner_stats_user_uniq ON learner_stats (user_id);

-- 3) Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  learning_level text NOT NULL DEFAULT 'beginner',
  quiz_scores jsonb NOT NULL DEFAULT '{}'::jsonb,
  course_progress jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_lesson_module text,
  last_lesson_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 4) Replace RLS policies on lesson_progress (drop old anon policies, add user-scoped)
DROP POLICY IF EXISTS "anon_select_lesson_progress" ON lesson_progress;
DROP POLICY IF EXISTS "anon_insert_lesson_progress" ON lesson_progress;
DROP POLICY IF EXISTS "anon_update_lesson_progress" ON lesson_progress;
DROP POLICY IF EXISTS "anon_delete_lesson_progress" ON lesson_progress;

CREATE POLICY "select_own_lesson_progress" ON lesson_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_lesson_progress" ON lesson_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_lesson_progress" ON lesson_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_lesson_progress" ON lesson_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- 5) Replace RLS policies on learner_stats
DROP POLICY IF EXISTS "anon_select_learner_stats" ON learner_stats;
DROP POLICY IF EXISTS "anon_insert_learner_stats" ON learner_stats;
DROP POLICY IF EXISTS "anon_update_learner_stats" ON learner_stats;
DROP POLICY IF EXISTS "anon_delete_learner_stats" ON learner_stats;

CREATE POLICY "select_own_learner_stats" ON learner_stats FOR SELECT
  TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "insert_own_learner_stats" ON learner_stats FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "update_own_learner_stats" ON learner_stats FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "delete_own_learner_stats" ON learner_stats FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- 6) RLS policies on user_profiles
CREATE POLICY "select_own_profile" ON user_profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);
CREATE POLICY "insert_own_profile" ON user_profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "update_own_profile" ON user_profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "delete_own_profile" ON user_profiles FOR DELETE
  TO authenticated USING (auth.uid() = id);

-- 7) Trigger to auto-create a user_profiles row on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email, created_at)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email, now())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
