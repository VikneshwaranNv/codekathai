import { useState } from 'react';
import { Trophy, Zap, RotateCcw, CheckCircle2, XCircle, ArrowRight, Award } from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { quizQuestions } from '@/data/course';
import QuizCard from '@/components/QuizCard';
import ProgressBar from '@/components/ProgressBar';

interface QuizPageProps {
  onNavigate: (page: Page) => void;
}

export default function QuizPage({ onNavigate }: QuizPageProps) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];
  const score = answers.filter(Boolean).length;
  const total = quizQuestions.length;

  const handleAnswer = (correct: boolean) => {
    setAnswers((a) => {
      const next = [...a];
      next[current] = correct;
      return next;
    });
  };

  const handleNext = () => {
    if (current + 1 === total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
    }
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 70;
    return (
      <div className="container-page py-12">
        <div className="mx-auto max-w-2xl">
          <div className={`card overflow-hidden ${passed ? 'ring-2 ring-bamboo-300' : 'ring-2 ring-golden-300'}`}>
            <div className={`p-8 text-center ${passed ? 'bg-gradient-to-br from-bamboo-600 to-bamboo-800' : 'bg-gradient-to-br from-golden-500 to-golden-700'} text-white`}>
              <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-white/15 animate-pop">
                <Trophy className="h-10 w-10" />
              </div>
              <h1 className="font-display text-3xl font-semibold">
                {passed ? 'Excellent work!' : 'Keep practicing!'}
              </h1>
              <p className="mt-2 text-white/80">
                {passed ? 'You truly understand the concepts.' : 'Review the stories and try again — you\u2019ve got this.'}
              </p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl bg-bamboo-50 p-4">
                  <p className="font-display text-3xl font-semibold text-bamboo-700">{score}</p>
                  <p className="text-xs font-semibold text-ink-500">Correct</p>
                </div>
                <div className="rounded-2xl bg-red-50 p-4">
                  <p className="font-display text-3xl font-semibold text-red-500">{total - score}</p>
                  <p className="text-xs font-semibold text-ink-500">Wrong</p>
                </div>
                <div className="rounded-2xl bg-golden-50 p-4">
                  <p className="font-display text-3xl font-semibold text-golden-600">{pct}%</p>
                  <p className="text-xs font-semibold text-ink-500">Score</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink-600">Overall accuracy</span>
                  <span className="font-bold text-bamboo-700">{pct}%</span>
                </div>
                <ProgressBar value={pct} size="lg" />
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-sm font-semibold text-ink-600">Question review</p>
                {quizQuestions.map((qq, i) => (
                  <div key={qq.id} className="flex items-center gap-3 rounded-xl bg-bamboo-50/60 p-3">
                    {answers[i] ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-bamboo-600" />
                    ) : (
                      <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                    )}
                    <p className="flex-1 text-sm text-ink-700">{qq.question}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={restart} className="btn-ghost text-sm">
                  <RotateCcw className="h-4 w-4" /> Retake Quiz
                </button>
                <button onClick={() => onNavigate('dashboard')} className="btn-primary text-sm">
                  Back to Course <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <span className="chip bg-golden-100 text-golden-700">
            <Award className="h-3.5 w-3.5" /> C Programming Quiz
          </span>
          <h1 className="section-title mt-3">Test Your Knowledge</h1>
          <p className="mt-2 text-ink-600">10 questions across all modules. Score 70% to earn the Quiz Master badge.</p>
        </div>

        <div className="mb-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-ink-600">Progress</span>
            <span className="font-bold text-bamboo-700">{current} / {total}</span>
          </div>
          <ProgressBar value={(current / total) * 100} size="md" />
        </div>

        <QuizCard
          key={q.id}
          question={q}
          index={current}
          total={total}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />

        <div className="mt-5 flex items-center justify-center gap-4 text-sm text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <Zap className="h-4 w-4 text-golden-500" /> {score} correct so far
          </span>
        </div>
      </div>
    </div>
  );
}
