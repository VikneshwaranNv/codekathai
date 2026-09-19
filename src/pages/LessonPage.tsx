import { ArrowLeft, BookOpen } from 'lucide-react';
import type { ModuleId, Level } from '@/types';
import { modules as cModules } from '@/data/course';
import { javaModules, getJavaLessonForLevel } from '@/data/javaCourse';
import { allLessons, getLessonForLevel } from '@/data/levelLessons';
import LessonViewer from '@/components/LessonViewer';
import type { Page } from '@/components/Navbar';
import { useLanguage } from '@/lib/languageContext';

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
  const { language } = useLanguage();
  const activeModules = language === 'java' ? javaModules : cModules;
  const mod = activeModules.find((m) => m.id === moduleId) ?? activeModules[0];

  // Dynamically resolve exact level-specific lesson & unique level challenge
  const matchedLesson = language === 'java' ? getJavaLessonForLevel(lessonId, level) : getLessonForLevel(lessonId, level);

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

  // Find ordered list of all topic items across modules in course order
  const allTopicItems = activeModules.flatMap((m) =>
    m.topics.map((t) => ({ moduleId: m.id, topicId: t.id }))
  );

  const currentTopicIdx = allTopicItems.findIndex((t) => t.topicId === lessonId);

  const prevItem = currentTopicIdx > 0 ? allTopicItems[currentTopicIdx - 1] : undefined;
  const nextItem =
    currentTopicIdx >= 0 && currentTopicIdx < allTopicItems.length - 1
      ? allTopicItems[currentTopicIdx + 1]
      : undefined;

  const resolveLesson = (tId: string) =>
    language === 'java' ? getJavaLessonForLevel(tId, level) : getLessonForLevel(tId, level);

  const prevLesson = prevItem ? resolveLesson(prevItem.topicId) : undefined;
  const nextLesson = nextItem ? resolveLesson(nextItem.topicId) : undefined;

  const handleSelectLesson = (targetLessonId: string) => {
    const target = resolveLesson(targetLessonId);
    if (target) {
      onStartLesson(target.moduleId, target.id);
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
