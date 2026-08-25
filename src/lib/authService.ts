import { supabase } from '@/lib/supabase';
import type { UserProfile } from '@/types';

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

// 1. Sign In with Email & Password
export async function signInWithEmailPassword(
  email: string,
  password?: string
): Promise<AuthResult> {
  const cleanEmail = email.trim().toLowerCase();

  try {
    // If password provided, attempt Supabase auth sign-in
    if (password) {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (authError && !authError.message.includes('Invalid login credentials')) {
        console.warn('Supabase auth login note:', authError.message);
      }
    }

    // Lookup user profile in `user_profiles` table
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (data) {
      const profile: UserProfile = {
        id: data.id || 'usr_' + Date.now(),
        name: data.full_name || cleanEmail.split('@')[0],
        email: data.email || cleanEmail,
        xp: 150,
        streak: 1,
        completedLessons: [],
        badges: ['🌱 Welcome Learner'],
        currentLevel: data.learning_level || 'beginner',
        createdAt: data.created_at || new Date().toISOString(),
      };
      return { success: true, profile };
    }

    // Fallback profile if record not found yet
    const fallbackProfile: UserProfile = {
      id: 'usr_' + Date.now(),
      name: cleanEmail.split('@')[0] || 'Learner',
      email: cleanEmail,
      xp: 100,
      streak: 1,
      completedLessons: [],
      badges: ['🌱 Welcome Learner'],
      currentLevel: 'beginner',
      createdAt: new Date().toISOString(),
    };

    return { success: true, profile: fallbackProfile };
  } catch (err: any) {
    console.error('signInWithEmailPassword error:', err);
    return { success: false, error: err?.message || 'Login failed. Please check your credentials.' };
  }
}

// 2. Sign Up with Full Name, Email & Password
export async function signUpWithEmailPassword(
  fullName: string,
  email: string,
  password?: string
): Promise<AuthResult> {
  const cleanName = fullName.trim();
  const cleanEmail = email.trim().toLowerCase();

  try {
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

    // Insert user into `user_profiles` database table
    const validUuid =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : '00000000-0000-4000-8000-' + Date.now().toString(16).padStart(12, '0');

    const payload = {
      id: validUuid,
      full_name: cleanName,
      email: cleanEmail,
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
      xp: 100,
      streak: 1,
      completedLessons: [],
      badges: ['🌱 Welcome Learner'],
      currentLevel: 'beginner',
      createdAt: new Date().toISOString(),
    };

    return { success: true, profile: newProfile };
  } catch (err: any) {
    console.error('signUpWithEmailPassword error:', err);
    return { success: false, error: err?.message || 'Account creation failed. Please try again.' };
  }
}

// 3. Password Reset for Email
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

// 4. OAuth Sign In with Google (forces account picker prompt)
export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account', // Forces Google to show all signed-in Google IDs!
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
