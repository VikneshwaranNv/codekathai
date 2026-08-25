import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProfile, Level } from '@/types';
import { supabase } from '@/lib/supabase';

const STORAGE_KEY = 'codekathai_user_profile_v2';

interface AuthContextValue {
  user: UserProfile | null;
  profile: UserProfile | null;
  loading: boolean;
  createProfile: (name: string, email?: string) => Promise<UserProfile>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setLevel: (level: Level) => void;
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
      // Generate valid UUID string for PostgreSQL uuid column
      const validUuid =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : '00000000-0000-4000-8000-' + Date.now().toString(16).padStart(12, '0');

      const payload = {
        id: validUuid,
        full_name: p.name,
        email: p.email || null,
        learning_level: p.currentLevel || 'beginner',
      };

      console.log('Inserting into Supabase user_profiles:', payload);

      const { data, error } = await supabase.from('user_profiles').insert([payload]).select();
      if (error) {
        console.error('Supabase user_profiles insert error:', error.message, error.details);
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
            .maybeSingle();

          if (data) {
            const existingProf: UserProfile = {
              id: data.id || 'usr_' + Date.now(),
              name: data.full_name || cleanName,
              email: data.email || cleanEmail,
              xp: 150,
              streak: 1,
              completedLessons: [],
              badges: ['🌱 Welcome Learner'],
              currentLevel: data.learning_level || 'beginner',
              createdAt: new Date().toISOString(),
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
        xp: 100,
        streak: 1,
        completedLessons: [],
        badges: ['🌱 Welcome Learner'],
        currentLevel: 'beginner',
        createdAt: new Date().toISOString(),
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        syncToSupabase(next);
        return next;
      });
    },
    []
  );

  const signOut = useCallback(() => {
    saveProfile(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: profile,
        profile,
        loading,
        createProfile,
        updateProfile,
        setLevel,
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
