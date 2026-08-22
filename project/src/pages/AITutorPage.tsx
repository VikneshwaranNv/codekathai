import { ArrowLeft, Sparkles, BookOpen, Lightbulb, AlertCircle, Repeat, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { explainLineByLine, explainAsTamilStory, generateSimilarQuestion, explainError } from '@/data/aiTutor';
import type { Page } from '@/components/Navbar';

interface AITutorPageProps {
  onNavigate: (page: Page) => void;
}

type Mode = 'line-by-line' | 'tamil-story' | 'similar-question' | 'error-explain';

const modes: { id: Mode; label: string; icon: typeof BookOpen; description: string }[] = [
  { id: 'line-by-line', label: 'Explain Line by Line', icon: BookOpen, description: 'Understand each line of your code' },
  { id: 'tamil-story', label: 'Tamil Story Explanation', icon: Sparkles, description: 'Learn through a Tamil story' },
  { id: 'similar-question', label: 'Generate Similar Question', icon: Repeat, description: 'Practice with a new question' },
  { id: 'error-explain', label: 'Explain Compiler Error', icon: AlertCircle, description: 'Understand what went wrong' },
];

export default function AITutorPage({ onNavigate }: AITutorPageProps) {
  const [mode, setMode] = useState<Mode>('line-by-line');
  const [code, setCode] = useState(`#include <stdio.h>
int main() {
  int age;
  scanf("%d", &age);
  if (age >= 18)
    printf("Adult");
  else
    printf("Minor");
  return 0;
}`);
  const [errorText, setErrorText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [lineResults, setLineResults] = useState<{ line: string; explanation: string; tamilExplanation: string }[] | null>(null);
  const [category, setCategory] = useState('Variables');

  const run = () => {
    setResult(null);
    setLineResults(null);

    if (mode === 'line-by-line') {
      setLineResults(explainLineByLine(code));
    } else if (mode === 'tamil-story') {
      setResult(explainAsTamilStory(code));
    } else if (mode === 'similar-question') {
      const q = generateSimilarQuestion(category);
      setResult(`Question: ${q.question}\n\nTamil: ${q.tamilQuestion}\n\nHint: ${q.hint}`);
    } else if (mode === 'error-explain') {
      const expl = explainError(errorText || 'expected ;');
      setResult(`Explanation: ${expl.explanation}\n\nTamil: ${expl.tamilExplanation}\n\nFix: ${expl.fix}`);
    }
  };

  return (
    <div className="container-page py-10">
      <button onClick={() => onNavigate('dashboard')} className="btn-ghost mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Courses
      </button>

      <div className="mb-8">
        <span className="eyebrow">AI Tutor</span>
        <h1 className="section-title mt-2">Your Personal Code Guide</h1>
        <p className="mt-3 max-w-2xl text-ink-600">
          Get line-by-line explanations, Tamil story explanations, similar practice questions, and
          compiler error help — all powered by your AI tutor.
        </p>
      </div>

      {/* Mode selection */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {modes.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`card p-4 text-left transition-all ${
                mode === m.id ? 'ring-2 ring-bamboo-500 shadow-glow' : 'hover:shadow-card hover:-translate-y-0.5'
              }`}
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${mode === m.id ? 'bg-bamboo-600 text-white' : 'bg-bamboo-100 text-bamboo-700'}`}>
                <Icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-semibold text-bamboo-950 text-sm">{m.label}</p>
              <p className="mt-1 text-xs text-ink-500">{m.description}</p>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-bamboo-600" />
            <h3 className="font-semibold text-bamboo-800">
              {mode === 'error-explain' ? 'Paste Error Message' : mode === 'similar-question' ? 'Choose Category' : 'Paste Your Code'}
            </h3>
          </div>

          {mode === 'similar-question' ? (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-bamboo-200 bg-white px-4 py-3 text-sm font-medium text-bamboo-800 outline-none focus:border-bamboo-500"
            >
              {['Variables', 'Loops', 'Conditions', 'Arrays', 'Functions'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : mode === 'error-explain' ? (
            <textarea
              value={errorText}
              onChange={(e) => setErrorText(e.target.value)}
              placeholder="Paste your compiler error here, e.g. 'expected ; before token}'"
              className="h-48 w-full resize-none rounded-xl bg-ink-900 p-4 font-mono text-sm text-bamboo-100 outline-none"
              spellCheck={false}
            />
          ) : (
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-64 w-full resize-none rounded-xl bg-ink-900 p-4 font-mono text-sm text-bamboo-100 outline-none"
              spellCheck={false}
            />
          )}

          <button onClick={run} className="btn-primary mt-4 w-full">
            <Sparkles className="h-4 w-4" /> {mode === 'similar-question' ? 'Generate Question' : 'Explain'}
          </button>
        </div>

        {/* Output */}
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-golden-500" />
            <h3 className="font-semibold text-bamboo-800">AI Tutor Response</h3>
          </div>

          {!result && !lineResults && (
            <div className="flex h-64 items-center justify-center text-center">
              <p className="text-sm text-ink-400">Select a mode and click "Explain" to get your AI tutor response.</p>
            </div>
          )}

          {lineResults && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {lineResults.map((lr, i) => (
                <div key={i} className="rounded-xl bg-bamboo-50 p-3">
                  <p className="font-mono text-sm font-semibold text-bamboo-900">{lr.line}</p>
                  <p className="mt-1 text-sm text-ink-700">{lr.explanation}</p>
                  <p className="mt-1 font-tamil text-sm text-ink-500">{lr.tamilExplanation}</p>
                </div>
              ))}
            </div>
          )}

          {result && (
            <div className="rounded-xl bg-bamboo-50 p-4">
              <pre className="whitespace-pre-wrap text-sm text-ink-700">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
