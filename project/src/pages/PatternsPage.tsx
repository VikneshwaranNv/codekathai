import { ArrowLeft, Lightbulb, Code2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { patternProblems, patternCategories, type PatternProblem } from '@/data/patterns';
import type { Page } from '@/components/Navbar';

interface PatternsPageProps {
  onNavigate: (page: Page) => void;
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-bamboo-100 text-bamboo-700',
  medium: 'bg-golden-100 text-golden-700',
  hard: 'bg-rose-100 text-rose-700',
};

export default function PatternsPage({ onNavigate }: PatternsPageProps) {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [active, setActive] = useState<PatternProblem | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [hintIdx, setHintIdx] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const filtered = activeCat === 'all' ? patternProblems : patternProblems.filter((p) => p.category === activeCat);

  const openPattern = (p: PatternProblem) => {
    setActive(p);
    setShowHints(false);
    setHintIdx(0);
    setShowSolution(false);
  };

  if (active) {
    return (
      <div className="container-page py-6">
        <button onClick={() => setActive(null)} className="btn-ghost mb-4 text-sm">
          <ArrowLeft className="h-4 w-4" /> All Patterns
        </button>

        <div className="card p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-semibold text-bamboo-950">{active.title}</h2>
              <p className="font-tamil text-sm text-bamboo-600">{active.tamilTitle}</p>
            </div>
            <span className={`chip ${difficultyColors[active.difficulty]}`}>{active.difficulty}</span>
          </div>

          <div className="mt-4">
            <p className="text-sm leading-relaxed text-ink-700">{active.description}</p>
            <p className="mt-1 font-tamil text-sm leading-relaxed text-ink-500">{active.tamilDescription}</p>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Example Output</p>
            <pre className="overflow-x-auto rounded-xl bg-ink-900 p-4 text-sm text-bamboo-100 font-mono">
              {active.example}
            </pre>
          </div>

          <div className="mt-5 border-t border-bamboo-100 pt-5">
            <button
              onClick={() => setShowHints((v) => !v)}
              className="flex w-full items-center justify-between"
            >
              <span className="flex items-center gap-2 font-semibold text-bamboo-800">
                <Lightbulb className="h-5 w-5 text-golden-500" /> Smart Hints
              </span>
              <span className="text-sm text-bamboo-600">{showHints ? 'Hide' : 'Show'}</span>
            </button>

            {showHints && (
              <div className="mt-4 space-y-3">
                {active.hints.slice(0, hintIdx + 1).map((h, i) => (
                  <div key={i} className="rounded-xl bg-golden-50 p-3 text-sm text-ink-700">
                    <span className="font-semibold text-golden-700">Hint {i + 1}:</span> {h}
                  </div>
                ))}
                <div className="flex gap-2">
                  {hintIdx < active.hints.length - 1 && (
                    <button onClick={() => setHintIdx((i) => i + 1)} className="btn-ghost text-xs">
                      Next Hint
                    </button>
                  )}
                  {hintIdx >= active.hints.length - 1 && !showSolution && (
                    <button onClick={() => setShowSolution(true)} className="btn-gold text-xs">
                      Reveal Solution
                    </button>
                  )}
                </div>
                {showSolution && (
                  <div className="mt-3">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">Solution</p>
                    <pre className="overflow-x-auto rounded-xl bg-ink-900 p-4 text-sm text-bamboo-100 font-mono">
                      {active.solution}
                    </pre>
                    <p className="mt-2 text-sm text-ink-600">{active.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <button onClick={() => onNavigate('dashboard')} className="btn-ghost mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Courses
      </button>

      <div className="mb-8">
        <span className="eyebrow">Pattern Practice</span>
        <h1 className="section-title mt-2">Pattern Printing Problems</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Master the most asked interview pattern problems — star, number, alphabet, pyramid, hollow,
          Pascal's triangle, diamond, and butterfly patterns.
        </p>
      </div>

      {/* Category filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCat('all')}
          className={`chip ${activeCat === 'all' ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700'}`}
        >
          All Patterns
        </button>
        {patternCategories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            className={`chip ${activeCat === c.id ? 'bg-bamboo-600 text-white' : 'bg-bamboo-50 text-ink-500 border border-bamboo-100'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Pattern cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <button
            key={p.id}
            onClick={() => openPattern(p)}
            className="card group p-5 text-left transition-all hover:shadow-glow hover:-translate-y-0.5"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-bamboo-100 text-bamboo-700">
                <Code2 className="h-5 w-5" />
              </span>
              <span className={`chip ${difficultyColors[p.difficulty]}`}>{p.difficulty}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-bamboo-950">{p.title}</h3>
            <p className="font-tamil text-xs text-bamboo-600">{p.tamilTitle}</p>
            <pre className="mt-3 overflow-hidden rounded-xl bg-ink-900 p-3 text-xs text-bamboo-100 font-mono max-h-24">
              {p.example.split('\n').slice(0, 4).join('\n')}
              {p.example.split('\n').length > 4 ? '\n...' : ''}
            </pre>
            <div className="mt-3 flex items-center gap-1.5 font-semibold text-bamboo-700 group-hover:gap-2.5 transition-all text-sm">
              Solve <ChevronRight className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
