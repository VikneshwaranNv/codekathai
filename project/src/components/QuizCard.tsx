import { useState } from 'react';
import { Check, X, Lightbulb, RotateCcw } from 'lucide-react';
import type { QuizQuestion } from '@/data/course';

interface QuizCardProps {
  question: QuizQuestion;
  index: number;
  total: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export default function QuizCard({ question, index, total, onAnswer, onNext }: QuizCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const choose = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    onAnswer(i === question.answerIndex);
  };

  const reset = () => {
    setSelected(null);
    setRevealed(false);
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-bamboo-100 bg-bamboo-50/60 px-5 py-3">
        <span className="chip bg-bamboo-100 text-bamboo-700">
          Question {index + 1} / {total}
        </span>
        <span className="text-xs font-semibold text-ink-500">Pick one answer</span>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="mb-5 font-display text-lg font-semibold text-bamboo-950 sm:text-xl">
          {question.question}
        </h3>

        <div className="grid gap-2.5">
          {question.options.map((opt, i) => {
            const isCorrect = i === question.answerIndex;
            const isPicked = i === selected;
            let cls = 'border-bamboo-100 bg-white hover:border-bamboo-300 hover:bg-bamboo-50';
            if (revealed && isCorrect) cls = 'border-bamboo-600 bg-bamboo-50';
            else if (revealed && isPicked && !isCorrect) cls = 'border-red-300 bg-red-50';
            else if (revealed) cls = 'border-bamboo-100 bg-white opacity-60';

            return (
              <button
                key={i}
                onClick={() => choose(i)}
                disabled={revealed}
                className={`flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${cls}`}
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-bamboo-100 text-xs font-bold text-bamboo-700">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-mono">{opt}</span>
                </span>
                {revealed && isCorrect && (
                  <Check className="h-5 w-5 text-bamboo-600" />
                )}
                {revealed && isPicked && !isCorrect && (
                  <X className="h-5 w-5 text-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {revealed && (
          <div className="mt-5 animate-fade-up">
            <div
              className={`rounded-2xl p-4 ${
                selected === question.answerIndex ? 'bg-bamboo-50' : 'bg-golden-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <Lightbulb className={`mt-0.5 h-5 w-5 shrink-0 ${selected === question.answerIndex ? 'text-bamboo-600' : 'text-golden-600'}`} />
                <div>
                  <p className={`text-sm font-bold ${selected === question.answerIndex ? 'text-bamboo-800' : 'text-golden-800'}`}>
                    {selected === question.answerIndex ? 'Correct! Nice work.' : 'Not quite \u2014 but you\u2019re learning!'}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-700">{question.explanation}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button onClick={reset} className="btn-ghost text-sm">
                <RotateCcw className="h-4 w-4" /> Try again
              </button>
              <button onClick={onNext} className="btn-primary text-sm">
                {index + 1 === total ? 'See Results' : 'Next Question'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
