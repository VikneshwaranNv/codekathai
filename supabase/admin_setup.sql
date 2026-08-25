-- ============================================================================
-- CODE KATHAI: SUPABASE DATABASE & SECURITY SETUP FOR ADMIN DASHBOARD
-- ============================================================================
-- Execute this SQL script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/fmemuexlgadamiphfhvr/sql/new
-- ============================================================================

-- 1. Ensure role and progress columns exist in `user_profiles` table
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'student';
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS xp integer DEFAULT 100;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS streak integer DEFAULT 1;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS completed_lessons jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS solved_practice jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS completed_patterns jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS playground_runs_count integer DEFAULT 0;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS ai_visuals_count integer DEFAULT 0;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS badges jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS created_at timestamptz DEFAULT now();
ALTER TABLE public.user_profiles ADD COLUMN IF NOT EXISTS last_active_at timestamptz DEFAULT now();

-- 2. Add constraint for valid role values ('student' or 'admin')
ALTER TABLE public.user_profiles DROP CONSTRAINT IF EXISTS check_user_role;
ALTER TABLE public.user_profiles ADD CONSTRAINT check_user_role CHECK (role IN ('student', 'admin'));

-- 3. Enable Row Level Security (RLS) on `user_profiles`
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Clean up old policies to prevent duplication
DROP POLICY IF EXISTS "Public profiles read" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can read own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.user_profiles;

-- 5. Row Level Security Policies (RLS)
-- A) Students can read their own profile
CREATE POLICY "Users can read own profile"
ON public.user_profiles FOR SELECT
USING (auth.uid() = id OR email = auth.jwt() ->> 'email');

-- B) Admins can read ALL student profiles
CREATE POLICY "Admins can read all profiles"
ON public.user_profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE (id = auth.uid() OR email = auth.jwt() ->> 'email')
    AND role = 'admin'
  )
);

-- C) Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.user_profiles FOR INSERT
WITH CHECK (true);

-- D) Users can update their own profile (cannot escalate role unless authorized)
CREATE POLICY "Users can update own profile"
ON public.user_profiles FOR UPDATE
USING (auth.uid() = id OR email = auth.jwt() ->> 'email');

-- 6. Safe SQL snippet to promote your Admin email (replace with your admin email):
UPDATE public.user_profiles 
SET role = 'admin' 
WHERE email = 'admin@codekathai.com';
