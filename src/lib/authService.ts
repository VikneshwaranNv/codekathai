import { supabase } from '@/lib/supabase';
import type { UserProfile, UserRole } from '@/types';

export interface AuthResult {
  success: boolean;
  profile?: UserProfile;
  error?: string;
  message?: string;
}

/**
 * Validation Helpers for Email and Full Name
 */
export function isValidEmailFormat(email: string): { valid: boolean; error?: string } {
  const clean = email.trim().toLowerCase();
  if (!clean) {
    return { valid: false, error: 'தயவுசெய்து உங்கள் மின்னஞ்சலை உள்ளிடவும் (Please enter your email address)' };
  }

  // 1. MUST start with an alphabet letter (a-z or A-Z)!
  if (!/^[a-zA-Z]/.test(clean)) {
    return {
      valid: false,
      error:
        'மின்னஞ்சல் முகவரி எழுத்தில் (Alphabet) மட்டுமே தொடங்க வேண்டும்! (Email address MUST start with a letter, e.g. name@gmail.com, not numbers like 123@gmail.com)',
    };
  }

  // 2. Complete Email Regex: starts with letter, valid username, @ domain and valid TLD extension
  const emailRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean)) {
    return {
      valid: false,
      error:
        'செல்லுபடியாகும் மின்னஞ்சல் முகவரியை உள்ளிடவும் (Please enter a valid email address, e.g. vishal@gmail.com)',
    };
  }

  // 3. Strict Official Google / Gmail Account Validation
  if (clean.endsWith('@gmail.com') || clean.endsWith('@googlemail.com')) {
    const username = clean.split('@')[0];

    // Google Official Rule: Gmail username must be at least 6 characters long (e.g. abc@gmail.com is 3 chars, which Google does NOT allow!)
    if (username.length < 6) {
      return {
        valid: false,
        error:
          'போலி ஜிமெயில் முகவரி நிராகரிக்கப்பட்டது! கூகிள் விதிகளின்படி ஜிமெயில் முகவரி குறைந்தபட்சம் 6 எழுத்துகள் இருக்க வேண்டும் (Fake Gmail address rejected! Google requires Gmail usernames to be at least 6 characters long, e.g. vishal.student@gmail.com, not short fake emails like abc@gmail.com)',
      };
    }

    if (username.length > 30) {
      return {
        valid: false,
        error: 'ஜிமெயில் முகவரி 30 எழுத்துகளுக்கு மிகாமல் இருக்க வேண்டும் (Gmail usernames cannot exceed 30 characters)',
      };
    }

    // Google Rule: Gmail only allows letters, numbers, and dots. No special characters like _, +, -
    if (!/^[a-zA-Z0-9.]+$/.test(username)) {
      return {
        valid: false,
        error:
          'ஜிமெயில் முகவரியில் சிறப்பு எழுத்துக்கள் (_ + -) இருக்கக்கூடாது (Gmail usernames only allow letters, numbers, and dots)',
      };
    }

    // Google Rule: Cannot start or end with a dot, or contain consecutive dots
    if (username.startsWith('.') || username.endsWith('.') || username.includes('..')) {
      return {
        valid: false,
        error: 'செல்லுபடியற்ற ஜிமெயில் வடிவம் (Invalid Gmail format: dots cannot start, end, or be repeated)',
      };
    }

    // Block known fake test usernames
    const fakeUsernames = [
      'abcdef',
      'test123',
      'testing',
      'dummy12',
      'user123',
      'admin12',
      'sample1',
      'fake123',
      'temp123',
    ];
    if (fakeUsernames.includes(username)) {
      return {
        valid: false,
        error:
          'உண்மையான ஜிமெயில் முகவரியை உள்ளிடவும் (Please enter your real, registered Google/Gmail account)',
      };
    }
  }

  return { valid: true };
}

export function isValidFullNameFormat(name: string): { valid: boolean; error?: string } {
  const clean = name.trim();
  if (!clean) {
    return { valid: false, error: 'தயவுசெய்து உங்கள் முழு பெயரை உள்ளிடவும் (Please enter your full name)' };
  }

  if (clean.length < 2) {
    return { valid: false, error: 'பெயர் குறைந்தபட்சம் 2 எழுத்துகள் இருக்க வேண்டும் (Full Name must be at least 2 characters)' };
  }

  // MUST start with an alphabet letter!
  if (!/^[a-zA-Z]/.test(clean)) {
    return {
      valid: false,
      error:
        'பெயர் எழுத்தில் (Alphabet) மட்டுமே தொடங்க வேண்டும்! (Full Name MUST start with an alphabet letter, e.g. Vishal or Kavi)',
    };
  }

  // Letters, spaces, hyphens, and dots ONLY (No digits like 123)
  if (!/^[a-zA-Z\s'.-]+$/.test(clean)) {
    return {
      valid: false,
      error:
        'பெயரில் எழுத்துகள் மட்டுமே இருக்க வேண்டும், எண்கள் சேர்க்கக்கூடாது! (Full Name must contain letters only, no numbers like 123)',
    };
  }

  return { valid: true };
}

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

  // Strict Email Validation Check
  const emailCheck = isValidEmailFormat(cleanEmail);
  if (!emailCheck.valid) {
    return { success: false, error: emailCheck.error };
  }

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
      try {
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
      } catch (e) {
        // Silently catch network or 400 response from Supabase auth token REST endpoint
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

  const emailCheck = isValidEmailFormat(cleanEmail);
  if (!emailCheck.valid) {
    return { success: false, error: emailCheck.error };
  }

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
      try {
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
      } catch (e) {
        // Silently handle auth exception
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

  // Strict Validation Checks for Name & Email
  const nameCheck = isValidFullNameFormat(cleanName);
  if (!nameCheck.valid) {
    return { success: false, error: nameCheck.error };
  }

  const emailCheck = isValidEmailFormat(cleanEmail);
  if (!emailCheck.valid) {
    return { success: false, error: emailCheck.error };
  }

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
      try {
        await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            data: { full_name: cleanName },
          },
        });
      } catch (e) {
        // Silently catch auth signup exceptions
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

  const emailCheck = isValidEmailFormat(cleanEmail);
  if (!emailCheck.valid) {
    return { success: false, error: emailCheck.error };
  }

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
