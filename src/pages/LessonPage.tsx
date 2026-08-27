import { ArrowLeft, BookOpen } from 'lucide-react';
import type { ModuleId, Level } from '@/types';
import { modules } from '@/data/course';
import { allLessons, getLessonForLevel } from '@/data/levelLessons';
import LessonViewer from '@/components/LessonViewer';
import type { Page } from '@/components/Navbar';

interface LessonPageProps {
  moduleId: ModuleId;
  lessonId: string;
  level: Level;
  onNavigate: (page: Page) => void;
  onStartLesson: (moduleId: ModuleId, lessonId: string) => void;
  completeLesson: (moduleId: ModuleId, lessonId: string, xp?: number) => void;
  isCompleted: (lessonId: string) => boolean;
}

export default function LessonPage({
  moduleId,
  lessonId,
  level,
  onNavigate,
  onStartLesson,
  completeLesson,
  isCompleted,
}: LessonPageProps) {
  const mod = modules.find((m) => m.id === moduleId) ?? modules[0];

  // Dynamically resolve exact level-specific lesson & unique level challenge
  const matchedLesson = getLessonForLevel(lessonId, level);

  // NO SILENT FALLBACK to lessons[0]!
  if (!matchedLesson) {
    return (
      <div className="container-page py-12 sm:py-16">
        <div className="card mx-auto max-w-xl p-8 text-center sm:p-12 border border-bamboo-100 dark:border-bamboo-800 shadow-soft">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            <BookOpen className="h-8 w-8" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-bamboo-950 dark:text-white">
            This lesson isn't written yet
          </h1>
          <p className="font-tamil mt-2 text-base font-semibold text-bamboo-700 dark:text-bamboo-300">
            இந்த lesson இன்னும் எழுதப்படவில்லை.
          </p>
          <p className="mt-3 text-xs text-ink-500">
            Requested Lesson ID: <code className="font-mono text-bamboo-600">{lessonId}</code> in level{' '}
            <span className="font-semibold capitalize">{level}</span>
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="btn-primary mx-auto mt-6 text-sm px-6 py-2.5 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Lessons & Modules
          </button>
        </div>
      </div>
    );
  }

  // Find prev/next lesson index across ALL lessons in order!
  const currentGlobalIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentGlobalIndex > 0 ? allLessons[currentGlobalIndex - 1] : undefined;
  const nextLesson =
    currentGlobalIndex >= 0 && currentGlobalIndex < allLessons.length - 1
      ? allLessons[currentGlobalIndex + 1]
      : undefined;

  const handleSelectLesson = (targetLessonId: string) => {
    const target = allLessons.find((l) => l.id === targetLessonId);
    if (target) {
      onStartLesson(target.moduleId, target.id);
    } else {
      onStartLesson(moduleId, targetLessonId);
    }
  };

  return (
    <LessonViewer
      lesson={matchedLesson}
      module={mod}
      level={level}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
      onNavigateModule={() => onNavigate('dashboard')}
      onSelectLesson={handleSelectLesson}
      onCompleteLesson={(id, xp) => completeLesson(moduleId, id, xp)}
      isCompleted={isCompleted(matchedLesson.id)}
    />
  );
}
