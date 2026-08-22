import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProfile, Level } from '@/types';

const STORAGE_KEY = 'codekathai_user_profile_v2';

interface AuthContextValue {
  user: UserProfile | null;
  profile: UserProfile | null;
  loading: boolean;
  createProfile: (name: string, email?: string) => UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setLevel: (level: Level) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const defaultProfile: UserProfile = {
  id: 'usr_default',
  name: 'Learner',
  email: '',
  xp: 150,
  streak: 3,
  completedLessons: ['intro-what-is-c', 'variables-beginner-lunchbox'],
  badges: ['🌱 Starter', '📖 First Kathai'],
  currentLevel: 'beginner',
  createdAt: new Date().toISOString(),
};

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

  const createProfile = useCallback((name: string, email?: string): UserProfile => {
    const cleanName = name.trim() || 'Learner';
    const newProf: UserProfile = {
      id: 'usr_' + Date.now(),
      name: cleanName,
      email: email?.trim() || '',
      xp: 100,
      streak: 1,
      completedLessons: [],
      badges: ['🌱 Welcome Learner'],
      currentLevel: 'beginner',
      createdAt: new Date().toISOString(),
    };
    saveProfile(newProf);
    return newProf;
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState((prev) => {
      if (!prev) return null;
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setLevel = useCallback((level: Level) => {
    setProfileState((prev) => {
      if (!prev) return null;
      const next = { ...prev, currentLevel: level };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

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
