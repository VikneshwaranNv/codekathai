import { useState } from 'react';
import Navbar, { type Page } from '@/components/Navbar';
import LandingPage from '@/pages/LandingPage';
import LevelsPage from '@/pages/LevelsPage';
import DashboardPage from '@/pages/DashboardPage';
import LessonPage from '@/pages/LessonPage';
import QuizPage from '@/pages/QuizPage';
import ProfilePage from '@/pages/ProfilePage';
import VariablesStoryPage from '@/pages/VariablesStoryPage';
import PlaygroundPage from '@/pages/PlaygroundPage';
import PracticePage from '@/pages/PracticePage';
import PatternsPage from '@/pages/PatternsPage';
import AITutorPage from '@/pages/AITutorPage';
import LevelDashboardPage from '@/pages/LevelDashboardPage';
import IntermediateStoryPage from '@/pages/IntermediateStoryPage';
import AdvancedStoryPage from '@/pages/AdvancedStoryPage';
import AuthPage from '@/pages/AuthPage';
import type { ModuleId } from '@/data/course';
import type { Level, LevelInfo } from '@/data/levels';
import { intermediateLessons, advancedLessons } from '@/data/levelCourses';
import { useProgress } from '@/lib/useProgress';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';

interface LessonTarget {
  moduleId: ModuleId;
  lessonId: string;
}

export default function App() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState<Page>('home');
  const [selectedLevel, setSelectedLevel] = useState<Level>('intermediate');
  const [lesson, setLesson] = useState<LessonTarget>({ moduleId: 'variables', lessonId: 'what-is-var' });
  const progress = useProgress();

  const navigate = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startLesson = (moduleId: ModuleId, lessonId: string) => {
    setLesson({ moduleId, lessonId });
    setPage('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectLevel = (levelInfo: LevelInfo) => {
    if (levelInfo.id === 'beginner') {
      navigate('dashboard');
    } else if (levelInfo.id === 'intermediate') {
      setSelectedLevel('intermediate');
      navigate('intermediate-story');
    } else if (levelInfo.id === 'advanced') {
      setSelectedLevel('advanced');
      navigate('advanced-story');
    }
  };

  const startLevelLesson = (lessonId: string, _lvl: Level) => {
    const allL = [...intermediateLessons, ...advancedLessons];
    const found = allL.find((l) => l.id === lessonId);
    if (found) {
      setLesson({ moduleId: found.moduleId as ModuleId, lessonId: found.id });
      setPage('lesson');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bamboo-50 dark:bg-ink-950">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-bamboo-600" />
          <p className="mt-3 text-sm font-semibold text-bamboo-700 dark:text-bamboo-300">Loading Code Kathai...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar current={page} onNavigate={navigate} />
      <main className="flex-1">
        {page === 'home' && <LandingPage onNavigate={navigate} />}
        {page === 'levels' && <LevelsPage onNavigate={navigate} onSelectLevel={selectLevel} />}
        {page === 'intermediate-story' && <IntermediateStoryPage onNavigate={navigate} />}
        {page === 'advanced-story' && <AdvancedStoryPage onNavigate={navigate} />}
        {page === 'level-dashboard' && (
          <LevelDashboardPage
            level={selectedLevel}
            onNavigate={navigate}
            onStartLevelLesson={startLevelLesson}
            progress={progress}
          />
        )}
        {page === 'dashboard' && <DashboardPage onNavigate={navigate} onStartLesson={startLesson} progress={progress} />}
        {page === 'lesson' && (
          <LessonPage
            moduleId={lesson.moduleId}
            lessonId={lesson.lessonId}
            onNavigate={navigate}
            onStartLesson={startLesson}
            progress={progress}
          />
        )}
        {page === 'quiz' && <QuizPage onNavigate={navigate} />}
        {page === 'profile' && <ProfilePage onNavigate={navigate} progress={progress} />}
        {page === 'story' && <VariablesStoryPage onNavigate={navigate} />}
        {page === 'playground' && <PlaygroundPage onNavigate={navigate} />}
        {page === 'practice' && <PracticePage onNavigate={navigate} />}
        {page === 'patterns' && <PatternsPage onNavigate={navigate} />}
        {page === 'tutor' && <AITutorPage onNavigate={navigate} />}
      </main>

      <footer className="border-t border-bamboo-100 bg-white/60 py-8 dark:border-bamboo-800 dark:bg-ink-950/60">
        <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-bamboo-600 text-white">
              <span className="font-display text-sm font-bold">CK</span>
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-bamboo-950">Code Kathai</p>
              <p className="text-xs text-ink-500">Learn coding through stories · கதைகள் வழியாக</p>
            </div>
          </div>
          <p className="text-xs text-ink-400">A premium EdTech prototype · Built with care for Tamil learners</p>
        </div>
      </footer>
    </div>
  );
}
