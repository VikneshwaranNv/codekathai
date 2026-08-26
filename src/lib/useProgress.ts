import { useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import type { ModuleId } from '@/types';

export interface ProgressState {
  completed: Record<string, boolean>;
  xp: number;
  streak: number;
  level: number;
  completedCount: number;
  solvedPracticeCount: number;
  completedPatternsCount: number;
  completedBugLevelsCount: number;
  playgroundRunsCount: number;
  aiVisualsCount: number;
  completeLesson: (moduleId: ModuleId, lessonId: string, xpGained?: number) => void;
  isCompleted: (lessonId: string) => boolean;
  moduleProgress: (moduleId: string, topicIds: string[]) => number;
  recordSolvedPractice: (problemId: string) => void;
  recordCompletedPattern: (patternId: string) => void;
  recordCompletedBugLevel: (levelId: string, xpReward: number) => void;
  isBugLevelCompleted: (levelId: string) => boolean;
  recordPlaygroundRun: () => void;
  recordAiVisual: () => void;
}

export function useProgress(): ProgressState {
  const { profile, updateProfile } = useAuth();

  const completedList = profile?.completedLessons ?? [];
  const completedMap: Record<string, boolean> = {};
  for (const id of completedList) {
    completedMap[id] = true;
  }

  const xp = profile?.xp ?? 100;
  const streak = profile?.streak ?? 1;
  const levelNum = Math.floor(xp / 200) + 1;

  // Stored secondary section progress
  const solvedPracticeList = profile?.solvedPractice ?? [];
  const completedPatternsList = profile?.completedPatterns ?? [];
  const completedBugLevelsList = profile?.completedBugLevels ?? [];
  const playgroundRunsCount = profile?.playgroundRunsCount ?? 3;
  const aiVisualsCount = profile?.aiVisualsCount ?? 2;

  const completeLesson = useCallback(
    (moduleId: ModuleId, lessonId: string, xpGained: number = 50) => {
      if (!profile) return;
      const currentCompleted = profile.completedLessons || [];
      if (!currentCompleted.includes(lessonId)) {
        const nextCompleted = [...currentCompleted, lessonId];
        const nextXp = (profile.xp || 0) + xpGained;
        
        const badges = [...(profile.badges || [])];
        if (nextCompleted.length === 1 && !badges.includes('🌱 First Step')) {
          badges.push('🌱 First Step');
        }
        if (nextCompleted.length === 5 && !badges.includes('⭐ Kathai Explorer')) {
          badges.push('⭐ Kathai Explorer');
        }
        if (nextCompleted.length === 10 && !badges.includes('🔥 Code Master')) {
          badges.push('🔥 Code Master');
        }

        updateProfile({
          completedLessons: nextCompleted,
          xp: nextXp,
          badges,
        });
      }
    },
    [profile, updateProfile],
  );

  const recordSolvedPractice = useCallback(
    (problemId: string) => {
      if (!profile) return;
      const current = profile.solvedPractice || [];
      if (!current.includes(problemId)) {
        updateProfile({
          solvedPractice: [...current, problemId],
          xp: (profile.xp || 0) + 20,
        });
      }
    },
    [profile, updateProfile]
  );

  const recordCompletedPattern = useCallback(
    (patternId: string) => {
      if (!profile) return;
      const current = profile.completedPatterns || [];
      if (!current.includes(patternId)) {
        updateProfile({
          completedPatterns: [...current, patternId],
          xp: (profile.xp || 0) + 15,
        });
      }
    },
    [profile, updateProfile]
  );

  const recordCompletedBugLevel = useCallback(
    (levelId: string, xpReward: number = 100) => {
      if (!profile) return;
      const currentLevels = profile.completedBugLevels || [];
      const badges = [...(profile.badges || [])];

      if (!currentLevels.includes(levelId)) {
        const nextLevels = [...currentLevels, levelId];
        const nextXp = (profile.xp || 0) + xpReward;

        if (nextLevels.length >= 1 && !badges.includes('🐛 Bug Hunter')) {
          badges.push('🐛 Bug Hunter');
        }
        if (nextLevels.length >= 10 && !badges.includes('🏆 Dragon Slayer')) {
          badges.push('🏆 Dragon Slayer');
        }

        updateProfile({
          completedBugLevels: nextLevels,
          xp: nextXp,
          badges,
        });
      }
    },
    [profile, updateProfile]
  );

  const isBugLevelCompleted = useCallback(
    (levelId: string): boolean => {
      return (profile?.completedBugLevels || []).includes(levelId);
    },
    [profile]
  );

  const recordPlaygroundRun = useCallback(() => {
    if (!profile) return;
    updateProfile({
      playgroundRunsCount: (profile.playgroundRunsCount || 0) + 1,
    });
  }, [profile, updateProfile]);

  const recordAiVisual = useCallback(() => {
    if (!profile) return;
    updateProfile({
      aiVisualsCount: (profile.aiVisualsCount || 0) + 1,
    });
  }, [profile, updateProfile]);

  const isCompleted = useCallback(
    (lessonId: string): boolean => {
      return !!completedMap[lessonId];
    },
    [completedMap],
  );

  const moduleProgress = useCallback(
    (moduleId: string, topicIds: string[]): number => {
      if (!topicIds || topicIds.length === 0) return 0;
      const done = topicIds.filter((tId) => !!completedMap[tId] || !!completedMap[`${moduleId}-${tId}`]).length;
      return Math.round((done / topicIds.length) * 100);
    },
    [completedMap],
  );

  return {
    completed: completedMap,
    xp,
    streak,
    level: levelNum,
    completedCount: completedList.length,
    solvedPracticeCount: solvedPracticeList.length,
    completedPatternsCount: completedPatternsList.length,
    completedBugLevelsCount: completedBugLevelsList.length,
    playgroundRunsCount,
    aiVisualsCount,
    completeLesson,
    isCompleted,
    moduleProgress,
    recordSolvedPractice,
    recordCompletedPattern,
    recordCompletedBugLevel,
    isBugLevelCompleted,
    recordPlaygroundRun,
    recordAiVisual,
  };
}
