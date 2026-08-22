import type { UserProfile, Level, ModuleId } from '@/types';

export interface LearnerStats {
  xp: number;
  streak: number;
  level: number;
}

export function calculateLevelFromXp(xp: number): number {
  return Math.floor(xp / 200) + 1;
}
