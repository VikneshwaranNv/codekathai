import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from './supabase';

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  learning_level: string;
  quiz_scores: Record<string, number>;
  course_progress: Record<string, number>;
  last_lesson_module: string | null;
  last_lesson_id: string | null;
  created_at: string;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (name: string, email: string, password: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  updatePassword: (newPassword: string) => Promise<{ error: string | null }>;
  recoveryMode: boolean;
  clearRecoveryMode: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [recoveryMode, setRecoveryMode] = useState(false);

  const loadProfile = useCallback(async (uid: string) => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle();
    if (error) {
      console.error('loadProfile error', error.message);
      return;
    }
    if (data) {
      setProfile(data as UserProfile);
    } else {
      const created = {
        id: uid,
        full_name: user?.user_metadata?.full_name ?? '',
        email: user?.email ?? '',
        learning_level: 'beginner',
      };
      const { data: inserted } = await supabase
        .from('user_profiles')
        .insert(created)
        .select('*')
        .maybeSingle();
      if (inserted) setProfile(inserted as UserProfile);
    }
  }, [user]);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const sessionUser = data.session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) {
        loadProfile(sessionUser.id).finally(() => mounted && setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      if (event === 'PASSWORD_RECOVERY') {
        setRecoveryMode(true);
      }
      if (!sessionUser) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) await loadProfile(user.id);
  }, [user, loadProfile]);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user) return;
    const { error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    if (error) {
      console.error('updateProfile error', error.message);
      return;
    }
    setProfile((prev) => (prev ? { ...prev, ...updates } : prev));
  }, [user]);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    if (error) return { error: error.message };
    if (data.user) {
      const created = {
        id: data.user.id,
        full_name: name,
        email,
        learning_level: 'beginner',
      };
      await supabase.from('user_profiles').upsert(created, { onConflict: 'id' });
    }
    return { error: null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const redirectTo = `${window.location.origin}/`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const updatePassword = useCallback(async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) return { error: error.message };
    return { error: null };
  }, []);

  const clearRecoveryMode = useCallback(() => setRecoveryMode(false), []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut, refreshProfile, updateProfile, resetPassword, updatePassword, recoveryMode, clearRecoveryMode }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
