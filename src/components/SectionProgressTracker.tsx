import { BookOpen, Target, Grid, Code2, Sparkles, Trophy, Award, CheckCircle2 } from 'lucide-react';
import type { ProgressState } from '@/lib/useProgress';

interface SectionProgressTrackerProps {
  progress: ProgressState;
}

export default function SectionProgressTracker({ progress }: SectionProgressTrackerProps) {
  // Total counts across all sections
  const totalLessons = 18;
  const totalPractice = 136; // 100 Easy MCQs + 21 Medium + 15 Hard
  const totalPatterns = 10;

  const lessonPct = Math.min(Math.round((progress.completedCount / totalLessons) * 100), 100);
  const practicePct = Math.min(Math.round((progress.solvedPracticeCount / totalPractice) * 100), 100);
  const patternPct = Math.min(Math.round((progress.completedPatternsCount / totalPatterns) * 100), 100);

  // Overall platform mastery percentage calculation
  const overallPct = Math.min(
    Math.round(
      (progress.completedCount / totalLessons) * 40 +
        (progress.solvedPracticeCount / totalPractice) * 35 +
        (progress.completedPatternsCount / totalPatterns) * 15 +
        (Math.min(progress.playgroundRunsCount, 10) / 10) * 10
    ),
    100
  );

  return (
    <div className="card p-6 border border-bamboo-200 dark:border-bamboo-800 bg-white dark:bg-ink-950 shadow-lg space-y-6">
      {/* 1. Header & Overall Platform Progress Meter */}
      <div className="bg-gradient-to-r from-bamboo-600 via-bamboo-700 to-bamboo-800 rounded-2xl p-6 text-white shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="chip bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider mb-2 inline-block">
              <Trophy className="h-3.5 w-3.5 inline mr-1 text-golden-400" /> Platform Mastery Tracker
            </span>
            <h2 className="font-display text-xl font-bold">Overall Platform Progress / ஒட்டுமொத்த வளர்ச்சி</h2>
            <p className="font-tamil text-xs text-white/80 mt-1">
              எல்லா பாடங்கள், வினாக்கள் மற்றும் நிரலாக்கப் பயிற்சிகளின் ஒட்டுமொத்த முன்னேற்றம்.
            </p>
          </div>
          <div className="text-right">
            <span className="font-display text-3xl font-bold text-golden-400">{overallPct}%</span>
            <span className="text-xs text-white/80 block font-bold">Mastery Level</span>
          </div>
        </div>

        {/* Overall Animated Progress Bar */}
        <div className="mt-4 w-full bg-black/30 rounded-full h-3 overflow-hidden p-0.5 border border-white/20">
          <div
            className="bg-gradient-to-r from-golden-400 via-emerald-400 to-emerald-300 h-full rounded-full transition-all duration-700 shadow-glow"
            style={{ width: `${Math.max(overallPct, 5)}%` }}
          />
        </div>
      </div>

      {/* 2. All-Sections Breakdown Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Section 1: Course Lessons & Modules */}
        <div className="rounded-2xl border border-bamboo-200 dark:border-bamboo-800 bg-bamboo-50/50 dark:bg-ink-900 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-bamboo-950 dark:text-white">
              <BookOpen className="h-4 w-4 text-bamboo-600" /> 1. Lessons & Modules
            </span>
            <span className="chip bg-bamboo-100 text-bamboo-800 font-bold text-[10px] dark:bg-bamboo-950 dark:text-bamboo-300">
              {lessonPct}%
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-600 dark:text-ink-300 font-medium">
            <span>Completed Lessons</span>
            <span className="font-bold text-bamboo-700 dark:text-bamboo-300">{progress.completedCount} / {totalLessons}</span>
          </div>
          <div className="w-full bg-bamboo-200 dark:bg-ink-800 rounded-full h-2 overflow-hidden">
            <div className="bg-bamboo-600 h-full rounded-full transition-all duration-500" style={{ width: `${lessonPct}%` }} />
          </div>
        </div>

        {/* Section 2: Technical Practice Problems (100 MCQs + Medium + Hard) */}
        <div className="rounded-2xl border border-bamboo-200 dark:border-bamboo-800 bg-bamboo-50/50 dark:bg-ink-900 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-bamboo-950 dark:text-white">
              <Target className="h-4 w-4 text-golden-600" /> 2. Practice Problems
            </span>
            <span className="chip bg-golden-100 text-golden-800 font-bold text-[10px] dark:bg-golden-950 dark:text-golden-300">
              {practicePct}%
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-600 dark:text-ink-300 font-medium">
            <span>Solved Questions</span>
            <span className="font-bold text-golden-600">{progress.solvedPracticeCount} / {totalPractice}</span>
          </div>
          <div className="w-full bg-golden-200 dark:bg-ink-800 rounded-full h-2 overflow-hidden">
            <div className="bg-golden-500 h-full rounded-full transition-all duration-500" style={{ width: `${practicePct}%` }} />
          </div>
        </div>

        {/* Section 3: C Patterns Practiced */}
        <div className="rounded-2xl border border-bamboo-200 dark:border-bamboo-800 bg-bamboo-50/50 dark:bg-ink-900 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-bamboo-950 dark:text-white">
              <Grid className="h-4 w-4 text-emerald-600" /> 3. C Pattern Programs
            </span>
            <span className="chip bg-emerald-100 text-emerald-800 font-bold text-[10px] dark:bg-emerald-950 dark:text-emerald-300">
              {patternPct}%
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-600 dark:text-ink-300 font-medium">
            <span>Patterns Solved</span>
            <span className="font-bold text-emerald-600">{progress.completedPatternsCount} / {totalPatterns}</span>
          </div>
          <div className="w-full bg-emerald-200 dark:bg-ink-800 rounded-full h-2 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: `${patternPct}%` }} />
          </div>
        </div>

        {/* Section 4: Playground GCC Compiler Submissions */}
        <div className="rounded-2xl border border-bamboo-200 dark:border-bamboo-800 bg-bamboo-50/50 dark:bg-ink-900 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-bamboo-950 dark:text-white">
              <Code2 className="h-4 w-4 text-cyan-600" /> 4. Compiler Playground
            </span>
            <span className="chip bg-cyan-100 text-cyan-800 font-bold text-[10px] dark:bg-cyan-950 dark:text-cyan-300">
              Active Compiler
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-600 dark:text-ink-300 font-medium">
            <span>Code Runs Executed</span>
            <span className="font-bold text-cyan-600">{progress.playgroundRunsCount} Runs</span>
          </div>
          <div className="w-full bg-cyan-200 dark:bg-ink-800 rounded-full h-2 overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(progress.playgroundRunsCount * 10, 100)}%` }} />
          </div>
        </div>

        {/* Section 5: AI Tutor & Visual Explanations */}
        <div className="rounded-2xl border border-bamboo-200 dark:border-bamboo-800 bg-bamboo-50/50 dark:bg-ink-900 p-4 space-y-3 sm:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-bamboo-950 dark:text-white">
              <Sparkles className="h-4 w-4 text-purple-600" /> 5. AI Tutor & Visual Explanations
            </span>
            <span className="chip bg-purple-100 text-purple-800 font-bold text-[10px] dark:bg-purple-950 dark:text-purple-300">
              Visual AI Active
            </span>
          </div>
          <div className="flex justify-between text-xs text-ink-600 dark:text-ink-300 font-medium">
            <span>AI Code Guide & Visual Explanations Generated</span>
            <span className="font-bold text-purple-600">{progress.aiVisualsCount} Explanations</span>
          </div>
          <div className="w-full bg-purple-200 dark:bg-ink-800 rounded-full h-2 overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(progress.aiVisualsCount * 20, 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
