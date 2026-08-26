import { useState, useEffect } from 'react';
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
import BugHunterPage from '@/pages/BugHunterPage';
import AuthPage from '@/pages/AuthPage';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import type { ModuleId, Level } from '@/types';
import { useProgress } from '@/lib/useProgress';
import { AuthProvider, useAuth } from '@/lib/auth';

interface LessonTarget {
  moduleId: ModuleId;
  lessonId: string;
}

function MainApp() {
  const { user, profile, setLevel, isAdmin } = useAuth();
  const [page, setPage] = useState<Page>(() => {
    if (isAdmin) return 'admin';
    if (!user) return 'login' as any;
    return 'home';
  });

  const [lessonTarget, setLessonTarget] = useState<LessonTarget>({
    moduleId: 'variables',
    lessonId: 'variables-what-is-var',
  });
  const progress = useProgress();

  // Redirect upon login or routing guard
  useEffect(() => {
    if (user && (page === ('login' as any) || !page)) {
      setPage(isAdmin ? 'admin' : 'home');
    } else if (!isAdmin && page === 'admin') {
      setPage('home');
    }
  }, [user, isAdmin, page]);

  const navigate = (p: Page) => {
    // Security check: if student attempts to navigate to 'admin', redirect to home
    if (p === 'admin' && !isAdmin) {
      setPage('home');
      return;
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startLesson = (moduleId: ModuleId, lessonId: string) => {
    setLessonTarget({ moduleId, lessonId });
    setPage('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLevel = (level: Level) => {
    setLevel(level);
    navigate('dashboard');
  };

  if (!user) {
    return <AuthPage />;
  }

  const currentLevel = profile?.currentLevel ?? 'beginner';

  return (
    <div className="flex min-h-screen flex-col bg-bamboo-50/20 dark:bg-ink-950">
      <Navbar current={page} onNavigate={navigate} />

      <main className="flex-1">
        {page === 'admin' && isAdmin && <AdminDashboardPage onNavigate={navigate} />}
        {page === 'home' && <LandingPage onNavigate={navigate} />}
        {page === 'levels' && (
          <LevelsPage onNavigate={navigate} onSelectLevel={handleSelectLevel} />
        )}
        {page === 'dashboard' && (
          <DashboardPage
            onNavigate={navigate}
            onStartLesson={startLesson}
            progress={progress}
          />
        )}
        {page === 'lesson' && (
          <LessonPage
            moduleId={lessonTarget.moduleId}
            lessonId={lessonTarget.lessonId}
            level={currentLevel}
            onNavigate={navigate}
            onStartLesson={startLesson}
            completeLesson={progress.completeLesson}
            isCompleted={progress.isCompleted}
          />
        )}
        {page === 'quiz' && <QuizPage onNavigate={navigate} />}
        {page === 'profile' && <ProfilePage onNavigate={navigate} progress={progress} />}
        {page === 'story' && <VariablesStoryPage onNavigate={navigate} />}
        {page === 'playground' && <PlaygroundPage onNavigate={navigate} />}
        {page === 'practice' && <PracticePage onNavigate={navigate} />}
        {page === 'patterns' && <PatternsPage onNavigate={navigate} />}
        {page === 'tutor' && <AITutorPage onNavigate={navigate} />}
        {page === 'bughunter' && <BugHunterPage onNavigate={navigate} />}
      </main>

      <footer className="border-t border-bamboo-100 bg-white/80 py-8 dark:border-bamboo-800 dark:bg-ink-950/80">
        <div className="container-page flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-bamboo-600 text-white font-bold text-sm">
              CK
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-bamboo-950 dark:text-white">
                Code Kathai (கோட் கதை)
              </p>
              <p className="text-xs text-ink-500">Learn C Programming Through Tamil Stories</p>
            </div>
          </div>
          <p className="text-xs text-ink-400">
            Premium Tamil-first EdTech platform · தமிழ் + Story + Visual + Practice
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
