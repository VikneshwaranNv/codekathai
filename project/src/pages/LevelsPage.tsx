import { ArrowRight, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import * as Icons from 'lucide-react';
import { levels, type LevelInfo } from '@/data/levels';
import { modules } from '@/data/course';
import type { Page } from '@/components/Navbar';

interface LevelsPageProps {
  onNavigate: (page: Page) => void;
  onSelectLevel: (level: LevelInfo) => void;
}

export default function LevelsPage({ onNavigate, onSelectLevel }: LevelsPageProps) {
  return (
    <div className="container-page py-10">
      <div className="mb-10 text-center">
        <span className="eyebrow">Learning Paths</span>
        <h1 className="section-title mt-2">Choose Your Level</h1>
        <p className="mx-auto mt-3 max-w-2xl text-ink-600">
          Three structured paths — from your first line of code to interview-ready problem solving.
          All lessons are unlocked. Learn at your own pace.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {levels.map((level, idx) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[level.icon] ?? Icons.Sparkles;
          return (
            <button
              key={level.id}
              onClick={() => onSelectLevel(level)}
              className="group card relative overflow-hidden p-7 text-left transition-all hover:shadow-glow hover:-translate-y-1"
            >
              <div className={`absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br ${level.gradient} opacity-10 transition-all group-hover:opacity-20 group-hover:scale-125`} />

              <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${level.gradient} text-white shadow-soft`}>
                <Icon className="h-7 w-7" strokeWidth={2.2} />
              </div>

              <div className="mt-5 flex items-center gap-2">
                <span className="chip bg-bamboo-100 text-bamboo-700">Path {idx + 1}</span>
                <span className="chip bg-golden-100 text-golden-700">{level.categories.length} Topics</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-semibold text-bamboo-950">{level.title}</h3>
              <p className="font-tamil text-sm text-bamboo-600">{level.tamilTitle}</p>

              <p className="mt-3 text-sm leading-relaxed text-ink-600">{level.description}</p>
              <p className="mt-1 font-tamil text-sm leading-relaxed text-ink-500">{level.tamilDescription}</p>

              <div className="mt-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">You will learn</p>
                <div className="flex flex-wrap gap-1.5">
                  {level.categories.slice(0, 6).map((cat) => (
                    <span key={cat} className="chip bg-bamboo-50 text-bamboo-700 border border-bamboo-100">
                      {cat}
                    </span>
                  ))}
                  {level.categories.length > 6 && (
                    <span className="chip bg-bamboo-50 text-bamboo-600">+{level.categories.length - 6} more</span>
                  )}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 font-semibold text-bamboo-700 group-hover:gap-3 transition-all">
                Start Path <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 card p-7">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold text-bamboo-950">All Concepts Unlocked</h3>
            <p className="mt-1 text-sm text-ink-600">
              Jump into any module directly — no prerequisites, no locks. Every topic is available right now.
            </p>
          </div>
          <button onClick={() => onNavigate('dashboard')} className="btn-primary whitespace-nowrap">
            Browse All Modules
          </button>
        </div>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <div key={m.id} className="flex items-center gap-2 rounded-xl bg-bamboo-50 px-3 py-2">
              <CheckCircle2 className="h-4 w-4 text-bamboo-600" />
              <span className="text-sm font-medium text-bamboo-800">{m.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
