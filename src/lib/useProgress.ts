import { useCallback } from 'react';
import { useAuth } from '@/lib/auth';
import type { ModuleId } from '@/types';

export interface ProgressState {
  completed: Record<string, boolean>;
  xp: number;
  streak: number;
  level: number;
  completedCount: number;
  completeLesson: (moduleId: ModuleId, lessonId: string, xpGained?: number) => void;
  isCompleted: (lessonId: string) => boolean;
  moduleProgress: (moduleId: string, topicIds: string[]) => number;
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

  const completeLesson = useCallback(
    (moduleId: ModuleId, lessonId: string, xpGained: number = 50) => {
      if (!profile) return;
      const currentCompleted = profile.completedLessons || [];
      if (!currentCompleted.includes(lessonId)) {
        const nextCompleted = [...currentCompleted, lessonId];
        const nextXp = (profile.xp || 0) + xpGained;
        
        // Award badge based on milestones
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
    completeLesson,
    isCompleted,
    moduleProgress,
  };
}
