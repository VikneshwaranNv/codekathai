import { useState } from 'react';
import { ArrowLeft, ArrowRight, PlayCircle, Sparkles } from 'lucide-react';
import type { Page } from '@/components/Navbar';
import type { ModuleId } from '@/types';
import { modules } from '@/data/course';
import { allLessons } from '@/data/levelLessons';
import StoryCard from '@/components/StoryCard';

interface StoryModePageProps {
  onNavigate: (page: Page) => void;
}

export default function StoryModePage({ onNavigate }: StoryModePageProps) {
  const storyLessons = allLessons.filter((l) => l.story && l.story.length > 0);
  const [lessonIdx, setLessonIdx] = useState(0);
  const [sceneIdx, setSceneIdx] = useState(0);

  const lesson = storyLessons[lessonIdx] || allLessons[0];
  const mod = modules.find((m) => m.id === lesson.moduleId) || modules[0];
  const scenes = lesson.story || [];

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="eyebrow">Visual Stories Theater 🎭</span>
          <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl">
            Story Kathai Mode
          </h1>
          <p className="font-tamil text-xs text-ink-600 dark:text-ink-400">
            கவி மற்றும் கோட் புட்டியின் தமிழ் கதைகள் மூலம் C Programming கருத்துகளைப் புரிந்துகொள்ளுங்கள்.
          </p>
        </div>

        {/* Story Selection Selector */}
        <div className="flex flex-wrap gap-2">
          {storyLessons.map((sl, idx) => (
            <button
              key={sl.id}
              onClick={() => {
                setLessonIdx(idx);
                setSceneIdx(0);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                idx === lessonIdx
                  ? 'bg-bamboo-600 text-white shadow-soft'
                  : 'bg-bamboo-100 text-bamboo-800 hover:bg-bamboo-200 dark:bg-ink-800 dark:text-bamboo-300'
              }`}
            >
              {sl.title}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden border border-bamboo-200 p-6 sm:p-8 dark:border-bamboo-800">
        <div className="mb-6 flex items-center justify-between border-b border-bamboo-100 pb-4 dark:border-bamboo-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-bamboo-600">
              Module {mod.index} · {mod.title}
            </span>
            <h2 className="font-display text-xl font-bold text-bamboo-950 dark:text-white">
              {lesson.title}
            </h2>
          </div>
          <span className="rounded-full bg-golden-100 px-3 py-1 text-xs font-bold text-golden-800 dark:bg-golden-950 dark:text-golden-300">
            Scene {sceneIdx + 1} of {scenes.length}
          </span>
        </div>

        {/* Story Card Display */}
        {scenes[sceneIdx] && (
          <StoryCard scene={scenes[sceneIdx]} active={true} index={sceneIdx} />
        )}

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-bamboo-100 pt-6 dark:border-bamboo-800">
          <button
            disabled={sceneIdx === 0}
            onClick={() => setSceneIdx((s) => Math.max(0, s - 1))}
            className="btn-ghost flex items-center gap-1.5 text-xs disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Previous Scene
          </button>

          <button
            disabled={sceneIdx === scenes.length - 1}
            onClick={() => setSceneIdx((s) => Math.min(scenes.length - 1, s + 1))}
            className="btn-primary flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold disabled:opacity-40"
          >
            Next Scene <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
