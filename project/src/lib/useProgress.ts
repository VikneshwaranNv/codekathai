import { useState, useEffect, useCallback } from 'react';
import {
  fetchLessonProgress,
  fetchLearnerStats,
  markLessonComplete,
  type LessonProgressRow,
  type LearnerStats,
} from '@/lib/progress';
import { useAuth } from '@/lib/auth';
import { lessons, modules } from '@/data/course';
import type { ModuleId } from '@/data/course';

export interface ProgressState {
  completed: Record<string, boolean>;
  stats: LearnerStats | null;
  loading: boolean;
  completeLesson: (moduleId: ModuleId, lessonId: string) => Promise<void>;
  moduleProgress: (moduleId: string) => number;
  isCompleted: (moduleId: string, lessonId: string) => boolean;
}

export function useProgress(): ProgressState {
  const { user } = useAuth();
  const [rows, setRows] = useState<LessonProgressRow[]>([]);
  const [stats, setStats] = useState<LearnerStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    if (!user) {
      setRows([]);
      setStats(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    (async () => {
      const [p, s] = await Promise.all([
        fetchLessonProgress(user.id),
        fetchLearnerStats(user.id),
      ]);
      if (!active) return;
      setRows(p);
      setStats(s);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [user]);

  const completed: Record<string, boolean> = {};
  for (const r of rows) {
    completed[`${r.module_id}:${r.lesson_id}`] = r.completed;
  }

  const completeLesson = useCallback(
    async (moduleId: ModuleId, lessonId: string) => {
      if (!user) return;
      const lesson = lessons.find((l) => l.id === lessonId && l.moduleId === moduleId);
      const xp = lesson?.xp ?? 50;
      const updated = await markLessonComplete(user.id, moduleId, lessonId, xp);
      if (updated) setStats(updated);
      setRows((prev) => {
        const key = `${moduleId}:${lessonId}`;
        const exists = prev.some((r) => `${r.module_id}:${r.lesson_id}` === key);
        if (exists) {
          return prev.map((r) =>
            `${r.module_id}:${r.lesson_id}` === key
              ? { ...r, completed: true, completed_at: new Date().toISOString() }
              : r,
          );
        }
        return [
          ...prev,
          {
            id: crypto.randomUUID(),
            lesson_id: lessonId,
            module_id: moduleId,
            completed: true,
            completed_at: new Date().toISOString(),
            user_id: user.id,
          },
        ];
      });
    },
    [user],
  );

  const moduleProgress = useCallback(
    (moduleId: string): number => {
      const mod = modules.find((m) => m.id === moduleId);
      if (!mod) return 0;
      const total = mod.topics.length;
      if (total === 0) return 0;
      const done = mod.topics.filter((t) => completed[`${moduleId}:${t.id}`]).length;
      return Math.round((done / total) * 100);
    },
    [completed],
  );

  const isCompleted = useCallback(
    (moduleId: string, lessonId: string): boolean => !!completed[`${moduleId}:${lessonId}`],
    [completed],
  );

  return { completed, stats, loading, completeLesson, moduleProgress, isCompleted };
}
