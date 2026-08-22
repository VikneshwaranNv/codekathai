import { supabase } from './supabase';

export interface LessonProgressRow {
  id: string;
  lesson_id: string;
  module_id: string;
  completed: boolean;
  completed_at: string | null;
  user_id: string;
}

export interface LearnerStats {
  id: string;
  xp: number;
  streak: number;
  level: number;
  last_active_date: string | null;
  user_id: string;
}

export async function fetchLessonProgress(userId: string): Promise<LessonProgressRow[]> {
  const { data, error } = await supabase
    .from('lesson_progress')
    .select('id, lesson_id, module_id, completed, completed_at, user_id')
    .eq('user_id', userId);
  if (error) {
    console.error('fetchLessonProgress error', error.message);
    return [];
  }
  return (data ?? []) as LessonProgressRow[];
}

export async function fetchLearnerStats(userId: string): Promise<LearnerStats | null> {
  const { data, error } = await supabase
    .from('learner_stats')
    .select('id, xp, streak, level, last_active_date, user_id')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) {
    console.error('fetchLearnerStats error', error.message);
    return null;
  }
  if (!data) {
    const created = {
      user_id: userId,
      xp: 0,
      streak: 0,
      level: 1,
      last_active_date: null,
    };
    const { data: inserted, error: insErr } = await supabase
      .from('learner_stats')
      .insert(created)
      .select('id, xp, streak, level, last_active_date, user_id')
      .maybeSingle();
    if (insErr) {
      console.error('createLearnerStats error', insErr.message);
      return { ...created, id: '' } as LearnerStats;
    }
    return (inserted ?? ({ ...created, id: '' } as LearnerStats)) as LearnerStats;
  }
  return data as LearnerStats;
}

export async function markLessonComplete(
  userId: string,
  moduleId: string,
  lessonId: string,
  xpGained: number,
): Promise<LearnerStats | null> {
  const today = new Date().toISOString().slice(0, 10);

  const { data: existing } = await supabase
    .from('lesson_progress')
    .select('id, completed')
    .eq('module_id', moduleId)
    .eq('lesson_id', lessonId)
    .eq('user_id', userId)
    .maybeSingle();

  let alreadyComplete = false;
  if (existing) {
    alreadyComplete = existing.completed;
    if (!alreadyComplete) {
      await supabase
        .from('lesson_progress')
        .update({ completed: true, completed_at: new Date().toISOString() })
        .eq('id', existing.id);
    }
  } else {
    await supabase.from('lesson_progress').insert({
      user_id: userId,
      lesson_id: lessonId,
      module_id: moduleId,
      completed: true,
      completed_at: new Date().toISOString(),
    });
  }

  if (alreadyComplete) {
    return fetchLearnerStats(userId);
  }

  const { data: stats } = await supabase
    .from('learner_stats')
    .select('id, xp, streak, level, last_active_date, user_id')
    .eq('user_id', userId)
    .maybeSingle();

  const current = stats ?? ({ id: '', user_id: userId, xp: 0, streak: 0, level: 1, last_active_date: null } as LearnerStats);
  let newStreak = current.streak;
  if (current.last_active_date) {
    const last = new Date(current.last_active_date);
    const diffDays = Math.round((Date.parse(today) - last.getTime()) / 86400000);
    if (diffDays === 1) newStreak = current.streak + 1;
    else if (diffDays > 1) newStreak = 1;
  } else {
    newStreak = 1;
  }

  const newXp = current.xp + xpGained;
  const newLevel = Math.floor(newXp / 500) + 1;

  const updated = {
    user_id: userId,
    xp: newXp,
    streak: newStreak,
    level: newLevel,
    last_active_date: today,
    updated_at: new Date().toISOString(),
  };

  const { data: upserted, error } = await supabase
    .from('learner_stats')
    .upsert(updated)
    .select('id, xp, streak, level, last_active_date, user_id')
    .maybeSingle();

  if (error) {
    console.error('updateLearnerStats error', error.message);
    return { ...updated, ...current, id: current.id || '' } as LearnerStats;
  }
  return (upserted ?? ({ ...updated, id: current.id || '' } as LearnerStats)) as LearnerStats;
}

export async function saveQuizScore(
  userId: string,
  quizId: string,
  scorePct: number,
): Promise<void> {
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('quiz_scores')
    .eq('id', userId)
    .maybeSingle();

  const existing = (profile?.quiz_scores as Record<string, number>) ?? {};
  const prev = existing[quizId] ?? 0;
  if (scorePct > prev) {
    existing[quizId] = scorePct;
    await supabase
      .from('user_profiles')
      .update({ quiz_scores: existing, updated_at: new Date().toISOString() })
      .eq('id', userId);
  }
}

export async function updateLastLesson(
  userId: string,
  moduleId: string,
  lessonId: string,
): Promise<void> {
  await supabase
    .from('user_profiles')
    .update({
      last_lesson_module: moduleId,
      last_lesson_id: lessonId,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);
}
