import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProfile, Level, UserRole } from '@/types';
import { supabase } from '@/lib/supabase';

const STORAGE_KEY = 'codekathai_user_profile_v2';

interface AuthContextValue {
  user: UserProfile | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  createProfile: (name: string, email?: string) => Promise<UserProfile>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setLevel: (level: Level) => void;
  setAdminProfile: (profile: UserProfile) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse user profile from localStorage', e);
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const saveProfile = (p: UserProfile | null) => {
    setProfileState(p);
    if (p) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Sync profile directly into your exact Supabase `user_profiles` table
  const syncToSupabase = async (p: UserProfile) => {
    try {
      const validUuid =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : '00000000-0000-4000-8000-' + Date.now().toString(16).padStart(12, '0');

      const payload: Record<string, any> = {
        id: p.id && p.id.includes('-') ? p.id : validUuid,
        full_name: p.name,
        email: p.email || null,
        role: p.role || 'student',
        learning_level: p.currentLevel || 'beginner',
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .insert([payload])
        .select();

      if (error) {
        console.warn('Supabase user_profiles insert note:', error.message);
      } else {
        console.log('Successfully inserted user profile into Supabase:', data);
      }
    } catch (err) {
      console.error('Supabase user_profiles sync catch error:', err);
    }
  };

  const createProfile = useCallback(
    async (name: string, email?: string): Promise<UserProfile> => {
      setLoading(true);
      const cleanName = name.trim() || 'Learner';
      const cleanEmail = email?.trim() || '';

      // 1. Check if user already exists in `user_profiles` by email
      if (cleanEmail) {
        try {
          const { data } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('email', cleanEmail)
            .order('created_at', { ascending: false })
            .limit(1);

          if (data && data.length > 0) {
            const row = data[0];
            const existingProf: UserProfile = {
              id: row.id || 'usr_' + Date.now(),
              name: row.full_name || cleanName,
              email: row.email || cleanEmail,
              role: (row.role as UserRole) || 'student',
              xp: row.xp ?? 150,
              streak: row.streak ?? 1,
              completedLessons: Array.isArray(row.completed_lessons)
                ? row.completed_lessons
                : [],
              solvedPractice: Array.isArray(row.solved_practice) ? row.solved_practice : [],
              completedPatterns: Array.isArray(row.completed_patterns) ? row.completed_patterns : [],
              playgroundRunsCount: row.playground_runs_count ?? 0,
              aiVisualsCount: row.ai_visuals_count ?? 0,
              badges: Array.isArray(row.badges) ? row.badges : ['🌱 Welcome Learner'],
              currentLevel: row.learning_level || 'beginner',
              createdAt: row.created_at || new Date().toISOString(),
              lastActiveAt: new Date().toISOString(),
            };
            saveProfile(existingProf);
            setLoading(false);
            return existingProf;
          }
        } catch (e) {
          console.warn('Supabase lookup warning:', e);
        }
      }

      // 2. Create new profile object
      const newProf: UserProfile = {
        id: 'usr_' + Date.now(),
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

      saveProfile(newProf);
      await syncToSupabase(newProf);
      setLoading(false);
      return newProf;
    },
    []
  );

  const updateProfile = useCallback(
    (updates: Partial<UserProfile>) => {
      setProfileState((prev) => {
        if (!prev) return null;
        const next = { ...prev, ...updates };
        saveProfile(next);
        syncToSupabase(next);
        return next;
      });
    },
    []
  );

  const setLevel = useCallback(
    (level: Level) => {
      setProfileState((prev) => {
        if (!prev) return null;
        const next = { ...prev, currentLevel: level };
        saveProfile(next);
        syncToSupabase(next);
        return next;
      });
    },
    []
  );

  const setAdminProfile = useCallback((p: UserProfile) => {
    saveProfile(p);
  }, []);

  const signOut = useCallback(() => {
    saveProfile(null);
  }, []);

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user: profile,
        profile,
        loading,
        isAdmin,
        createProfile,
        updateProfile,
        setLevel,
        setAdminProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
