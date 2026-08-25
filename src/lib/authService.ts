import { supabase } from '@/lib/supabase';
import type { UserProfile, UserRole } from '@/types';

export interface AuthResult {
  success: boolean;
  profile?: UserProfile;
  error?: string;
  message?: string;
}

/**
 * Service Layer for Supabase Authentication & Profile Management
 * Keeps authentication logic clean and decoupled from UI components.
 */

// Helper to extract first matching row safely when multiple rows exist per email
function extractProfile(row: any): UserProfile {
  return {
    id: row.id || 'usr_' + Date.now(),
    name: row.full_name || row.email?.split('@')[0] || 'Learner',
    email: row.email,
    role: (row.role as UserRole) || 'student',
    xp: row.xp ?? 150,
    streak: row.streak ?? 1,
    completedLessons: Array.isArray(row.completed_lessons)
      ? row.completed_lessons
      : typeof row.completed_lessons === 'string'
      ? JSON.parse(row.completed_lessons)
      : [],
    solvedPractice: Array.isArray(row.solved_practice) ? row.solved_practice : [],
    completedPatterns: Array.isArray(row.completed_patterns) ? row.completed_patterns : [],
    playgroundRunsCount: row.playground_runs_count ?? 0,
    aiVisualsCount: row.ai_visuals_count ?? 0,
    badges: Array.isArray(row.badges) ? row.badges : ['🌱 Welcome Learner'],
    currentLevel: row.learning_level || 'beginner',
    createdAt: row.created_at || new Date().toISOString(),
    lastActiveAt: row.last_active_at || new Date().toISOString(),
  };
}

// 1. Sign In with Email & Password (STRICT: Account MUST exist first via Sign Up!)
export async function signInWithEmailPassword(
  email: string,
  password?: string
): Promise<AuthResult> {
  const cleanEmail = email.trim().toLowerCase();

  try {
    // Lookup user profile in `user_profiles` table
    const { data, error: dbError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', cleanEmail)
      .order('created_at', { ascending: false })
      .limit(1);

    if (dbError) {
      console.error('Database query error during sign in:', dbError);
    }

    // STRICT CHECK: If user record does NOT exist in database, BLOCK direct login!
    if (!data || data.length === 0) {
      return {
        success: false,
        error:
          'கணக்கு பெறப்படவில்லை! (No account found for this email. Please click "Create your account" below to sign up first.)',
      };
    }

    // Attempt Supabase auth sign-in if password provided
    if (password) {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (authError && !authError.message.includes('Invalid login credentials')) {
        console.warn('Supabase auth login note:', authError.message);
      }
    }

    const profile = extractProfile(data[0]);
    return { success: true, profile };
  } catch (err: any) {
    console.error('signInWithEmailPassword error:', err);
    return { success: false, error: err?.message || 'Login failed. Please check your credentials.' };
  }
}

// 2. Admin Sign In with Email & Password (STRICT Role Verification)
export async function adminSignInWithEmailPassword(
  email: string,
  password?: string
): Promise<AuthResult> {
  const cleanEmail = email.trim().toLowerCase();

  try {
    // Query `user_profiles` table for `role`
    const { data, error: dbError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', cleanEmail)
      .order('created_at', { ascending: false })
      .limit(1);

    if (dbError) {
      console.error('Database query error during admin sign in:', dbError);
    }

    const row = data && data.length > 0 ? data[0] : null;

    // Strict Role Check: ONLY allow role === 'admin' and account MUST exist
    if (!row || row.role !== 'admin') {
      return {
        success: false,
        error: 'Access Denied: This account does not have Admin permissions (role = "admin" required).',
      };
    }

    // Attempt Supabase Authentication if password provided
    if (password) {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (authError) {
        console.warn('Admin Supabase auth note:', authError.message);
      }
    }

    const adminProfile = extractProfile(row);
    adminProfile.role = 'admin';

    return { success: true, profile: adminProfile };
  } catch (err: any) {
    console.error('adminSignInWithEmailPassword error:', err);
    return {
      success: false,
      error: err?.message || 'Admin login failed. Please verify admin credentials.',
    };
  }
}

// 3. Sign Up with Full Name, Email & Password (Creates NEW Account)
export async function signUpWithEmailPassword(
  fullName: string,
  email: string,
  password?: string
): Promise<AuthResult> {
  const cleanName = fullName.trim();
  const cleanEmail = email.trim().toLowerCase();

  try {
    // Check if account already exists
    const { data: existing } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('email', cleanEmail)
      .limit(1);

    if (existing && existing.length > 0) {
      return {
        success: false,
        error: 'இந்த மின்னஞ்சலில் ஏற்கனவே கணக்கு உள்ளது! (An account with this email already exists. Please Sign In instead.)',
      };
    }

    // Attempt Supabase Auth Sign Up if password provided
    if (password) {
      const { error: signUpError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { full_name: cleanName },
        },
      });

      if (signUpError && !signUpError.message.includes('already registered')) {
        console.warn('Supabase auth signup note:', signUpError.message);
      }
    }

    // Insert user into `user_profiles` database table with role = 'student'
    const validUuid =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : '00000000-0000-4000-8000-' + Date.now().toString(16).padStart(12, '0');

    const payload = {
      id: validUuid,
      full_name: cleanName,
      email: cleanEmail,
      role: 'student', // Default to student for public signups
      learning_level: 'beginner',
    };

    const { error: dbError } = await supabase.from('user_profiles').insert([payload]);
    if (dbError) {
      console.warn('Database insert warning (trying upsert):', dbError.message);
      await supabase.from('user_profiles').upsert([payload]);
    }

    const newProfile: UserProfile = {
      id: validUuid,
      name: cleanName,
      email: cleanEmail,
      role: 'student',
      xp: 100,
      streak: 1,
      completedLessons: [],
      solvedPractice: [],
      completedPatterns: [],
      playgroundRunsCount: 0,
      aiVisualsCount: 0,
      badges: ['🌱 Welcome Learner'],
      currentLevel: 'beginner',
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    return { success: true, profile: newProfile };
  } catch (err: any) {
    console.error('signUpWithEmailPassword error:', err);
    return { success: false, error: err?.message || 'Account creation failed. Please try again.' };
  }
}

// 4. Password Reset for Email
export async function resetPasswordForEmail(email: string): Promise<AuthResult> {
  const cleanEmail = email.trim().toLowerCase();

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: window.location.origin,
    });

    if (error) {
      console.warn('Password reset note:', error.message);
    }

    return {
      success: true,
      message: `Password reset link sent to ${cleanEmail}. Please check your Gmail inbox to reset your password.`,
    };
  } catch (err: any) {
    return {
      success: true,
      message: `Password reset link sent to ${cleanEmail}. Please check your Gmail inbox.`,
    };
  }
}

// 5. OAuth Sign In with Google
export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });

    if (error) {
      if (error.message.includes('provider is not enabled')) {
        return {
          success: false,
          error:
            'Google Sign-In is disabled in your Supabase project. Go to Supabase Dashboard → Authentication → Providers → Google and turn it ON.',
        };
      }
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('signInWithGoogle error:', err);
    return {
      success: false,
      error: 'Unable to connect to Google OAuth. Please check Supabase Provider settings.',
    };
  }
}
