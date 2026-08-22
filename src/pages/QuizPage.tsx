import { useState } from 'react';
import {
  Trophy,
  Zap,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Award,
  BookOpen,
  Filter,
  Code,
  Sparkles,
  Check,
  Send,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { placement100Mcqs, type PlacementMCQ } from '@/data/placement100Mcqs';
import ProgressBar from '@/components/ProgressBar';

interface QuizPageProps {
  onNavigate: (page: Page) => void;
}

const LEVEL_TABS = [
  { id: 'easy', label: '🌱 Easy Part (100 Technical Placement MCQs)' },
  { id: 'intermediate', label: '🚀 Intermediate Part (Logic Building MCQs)' },
  { id: 'advanced', label: '🧠 Advanced Part (Memory & System MCQs)' },
];

const CATEGORIES = [
  { id: 'all', label: 'All 100 Questions 🎯' },
  { id: 'fundamentals', label: 'Fundamentals 💻' },
  { id: 'operators', label: 'Operators ⚡' },
  { id: 'controlflow', label: 'Control Flow 🔀' },
  { id: 'storage', label: 'Storage Classes 📦' },
  { id: 'pointers', label: 'Pointers & Memory 📍' },
  { id: 'arrays_strings', label: 'Arrays & Strings 🧵' },
  { id: 'structs_memory', label: 'Structs & Malloc 🏗️' },
];

export default function QuizPage({ onNavigate }: QuizPageProps) {
  const [selectedLevel, setSelectedLevel] = useState<'easy' | 'intermediate' | 'advanced'>('easy');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);

  // User selections & submitted answers
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);

  // Filter 100 questions for Easy level
  const filteredQuestions: PlacementMCQ[] =
    selectedCat === 'all'
      ? placement100Mcqs
      : placement100Mcqs.filter((q) => q.category === selectedCat);

  const totalQuestions = filteredQuestions.length;
  const currentQ = filteredQuestions[currentIdx] || filteredQuestions[0];

  const handleSelectRadio = (optIdx: number) => {
    if (submitted) return; // cannot change after submit
    setSelectedOption(optIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: selectedOption }));
  };

  const handleNext = () => {
    setSelectedOption(null);
    setSubmitted(false);
    if (currentIdx + 1 >= totalQuestions) {
      setFinished(true);
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIdx > 0) {
      setSelectedOption(null);
      setSubmitted(false);
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setUserAnswers({});
    setFinished(false);
  };

  // Score calculation
  let correctCount = 0;
  filteredQuestions.forEach((q) => {
    if (userAnswers[q.id] === q.answerIndex) correctCount++;
  });
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  /* ==================== QUIZ RESULTS SCREEN ==================== */
  if (finished) {
    const isMaster = percentage >= 90;
    const isPassed = percentage >= 70;

    return (
      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="card overflow-hidden border border-bamboo-200 dark:border-bamboo-800 shadow-xl">
            {/* Header Banner */}
            <div
              className={`p-8 text-center text-white ${
                isMaster
                  ? 'bg-gradient-to-br from-amber-500 via-golden-600 to-amber-700'
                  : isPassed
                  ? 'bg-gradient-to-br from-emerald-600 to-bamboo-800'
                  : 'bg-gradient-to-br from-golden-600 to-amber-700'
              }`}
            >
              <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-white/20 animate-pop">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <span className="text-xs uppercase tracking-widest font-bold text-white/90">
                College Technical Placement Scorecard
              </span>
              <h1 className="font-display text-3xl font-bold mt-1">
                {isMaster
                  ? '🌟 Placement Master (Interview Ready)!'
                  : isPassed
                  ? '👍 Strong Technical Foundation!'
                  : '💪 Keep Practicing & Review Explanations!'}
              </h1>
              <p className="mt-2 text-sm text-white/90 max-w-xl mx-auto">
                {isMaster
                  ? 'Awesome! You scored 90%+ in Easy Technical MCQs for TCS, Wipro, Infosys, Zoho & Accenture campus drives.'
                  : isPassed
                  ? 'Great effort! Review missed questions to reach 90%+ placement readiness.'
                  : 'Review the technical explanations below to master C output prediction questions.'}
              </p>
            </div>

            {/* Score Stats */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 dark:bg-emerald-950/60 dark:border-emerald-800">
                  <p className="font-display text-3xl font-bold text-emerald-600">{correctCount}</p>
                  <p className="text-xs font-semibold text-ink-600 dark:text-ink-400">Correct Answers</p>
                </div>
                <div className="rounded-2xl bg-red-50 p-4 border border-red-200 dark:bg-red-950/60 dark:border-red-800">
                  <p className="font-display text-3xl font-bold text-red-500">
                    {totalQuestions - correctCount}
                  </p>
                  <p className="text-xs font-semibold text-ink-600 dark:text-ink-400">Wrong Answers</p>
                </div>
                <div className="rounded-2xl bg-golden-50 p-4 border border-golden-200 dark:bg-golden-950/60 dark:border-golden-800">
                  <p className="font-display text-3xl font-bold text-golden-600">{percentage}%</p>
                  <p className="text-xs font-semibold text-ink-600 dark:text-ink-400">Accuracy Score</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="mb-2 flex items-center justify-between text-xs font-bold text-ink-700 dark:text-ink-300">
                  <span>Technical Placement Accuracy</span>
                  <span>{percentage}%</span>
                </div>
                <ProgressBar value={percentage} size="lg" />
              </div>

              {/* Question Review List */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-2 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">
                  100 MCQs Review & Explanations:
                </p>
                {filteredQuestions.map((q, idx) => {
                  const userAns = userAnswers[q.id];
                  const isRight = userAns === q.answerIndex;

                  return (
                    <div
                      key={q.id}
                      className={`rounded-xl p-4 border text-xs transition-all ${
                        isRight
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-200'
                          : 'bg-red-50/70 border-red-300 text-red-950 dark:bg-red-950/60 dark:border-red-800 dark:text-red-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {isRight ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                        ) : (
                          <XCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="font-bold">
                            Q{idx + 1}. {q.question}
                          </p>
                          {q.codeSnippet && (
                            <pre className="mt-2 rounded-lg bg-ink-950 p-2 font-mono text-[11px] text-emerald-400">
                              {q.codeSnippet}
                            </pre>
                          )}
                          <p className="mt-2 text-ink-700 dark:text-ink-300">
                            <span className="font-bold">Correct Option:</span> {q.options[q.answerIndex]}
                          </p>
                          <p className="mt-1 font-tamil text-[11px] text-bamboo-700 dark:text-bamboo-300">
                            💡 {q.tamilExplanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button onClick={restart} className="btn-ghost flex items-center gap-2 text-xs font-bold">
                  <RotateCcw className="h-4 w-4" /> Retake 100 MCQs
                </button>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="btn-primary flex items-center gap-2 text-xs font-bold bg-bamboo-600 hover:bg-bamboo-700 text-white"
                >
                  Back to Course <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== ACTIVE QUIZ SCREEN ==================== */
  const isCorrect = submitted && selectedOption === currentQ.answerIndex;
  const isIncorrect = submitted && selectedOption !== currentQ.answerIndex;

  return (
    <div className="container-page py-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        {/* Practice Header */}
        <div className="mb-6 text-center">
          <span className="chip bg-golden-100 text-golden-800 dark:bg-golden-950 dark:text-golden-300 font-bold">
            <Award className="h-3.5 w-3.5 inline mr-1" /> Practice Section - College Placement Prep
          </span>
          <h1 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white sm:text-3xl mt-2">
            C Programming Technical MCQs 🎯
          </h1>
          <p className="font-tamil text-xs text-ink-600 dark:text-ink-400 mt-1">
            Easy பகுதியின் கீழ் 100 முக்கிய C நிரலாக்க வினாக்கள் (Campus Interview MCQs).
          </p>
        </div>

        {/* Level Selector Tabs */}
        <div className="mb-6 flex border-b border-bamboo-200 bg-bamboo-50/60 p-1.5 rounded-2xl dark:border-bamboo-800 dark:bg-ink-900">
          {LEVEL_TABS.map((lvl) => (
            <button
              key={lvl.id}
              onClick={() => {
                setSelectedLevel(lvl.id as any);
                restart();
              }}
              className={`flex-1 rounded-xl py-2.5 px-3 text-xs font-bold transition-all text-center ${
                selectedLevel === lvl.id
                  ? 'bg-bamboo-600 text-white shadow-soft'
                  : 'text-ink-600 hover:text-bamboo-700 dark:text-ink-400'
              }`}
            >
              {lvl.label}
            </button>
          ))}
        </div>

        {/* Category Filters (Visible for Easy Part) */}
        {selectedLevel === 'easy' && (
          <div className="mb-6 flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCat(cat.id);
                  restart();
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                  selectedCat === cat.id
                    ? 'bg-bamboo-700 text-white shadow-soft'
                    : 'bg-bamboo-100 text-bamboo-800 hover:bg-bamboo-200 dark:bg-ink-800 dark:text-bamboo-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Question Counter & Progress Bar */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs font-bold text-ink-600 dark:text-ink-400">
            <span>
              Question {currentIdx + 1} of {totalQuestions}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400">
              {correctCount} Correct So Far
            </span>
          </div>
          <ProgressBar value={((currentIdx + 1) / totalQuestions) * 100} size="md" />
        </div>

        {/* Question Card */}
        <div className="card p-6 sm:p-8 border border-bamboo-200 dark:border-bamboo-800 shadow-lg">
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-bamboo-100 text-bamboo-800 px-3 py-1 rounded-full dark:bg-bamboo-950 dark:text-bamboo-300">
              {currentQ.category.toUpperCase()}
            </span>
            <span className="text-xs font-bold text-ink-400">Question {currentIdx + 1} / 100</span>
          </div>

          <h2 className="font-display text-lg font-bold text-bamboo-950 dark:text-white leading-relaxed mb-4">
            {currentQ.question}
          </h2>

          {/* Optional Code Snippet */}
          {currentQ.codeSnippet && (
            <div className="mb-6 rounded-xl bg-ink-950 p-4 font-mono text-xs text-emerald-400 border border-ink-800 overflow-x-auto">
              <pre>{currentQ.codeSnippet}</pre>
            </div>
          )}

          {/* Options List */}
          <div className="grid gap-3 mb-6">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;

              let cardStyle =
                'border-bamboo-200 bg-bamboo-50/50 hover:bg-bamboo-100 text-ink-900 dark:border-bamboo-800 dark:bg-ink-900 dark:text-white';

              if (submitted) {
                if (optIdx === currentQ.answerIndex) {
                  // CORRECT ANSWER -> ALWAYS VIBRANT GREEN
                  cardStyle =
                    'border-emerald-600 bg-emerald-500 text-white font-bold shadow-md dark:bg-emerald-600 dark:border-emerald-400';
                } else if (isSelected && optIdx !== currentQ.answerIndex) {
                  // WRONG SELECTION -> VIBRANT RED
                  cardStyle =
                    'border-red-600 bg-red-500 text-white font-bold shadow-md dark:bg-red-600 dark:border-red-400';
                } else {
                  cardStyle =
                    'opacity-40 border-bamboo-100 bg-bamboo-50 dark:border-bamboo-900 dark:bg-ink-950 text-ink-500';
                }
              } else if (isSelected) {
                cardStyle =
                  'border-bamboo-600 bg-bamboo-100 text-bamboo-950 font-bold ring-2 ring-bamboo-500 dark:bg-ink-800 dark:text-white';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectRadio(optIdx)}
                  disabled={submitted}
                  className={`w-full rounded-xl border p-4 text-left text-xs font-semibold transition-all flex items-center justify-between ${cardStyle}`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid h-6 w-6 place-items-center rounded-full font-bold text-[11px] shadow-sm ${
                        submitted && optIdx === currentQ.answerIndex
                          ? 'bg-white text-emerald-700'
                          : submitted && isSelected
                          ? 'bg-white text-red-700'
                          : 'bg-white/80 text-ink-800 dark:bg-ink-800 dark:text-white'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    {opt}
                  </span>

                  {/* Icon Feedback */}
                  {submitted && optIdx === currentQ.answerIndex && (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  )}
                  {submitted && isSelected && optIdx !== currentQ.answerIndex && (
                    <XCircle className="h-5 w-5 text-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit Option Button */}
          {!submitted && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="w-full btn-primary py-3 text-xs font-bold flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-40 shadow-soft mb-6"
            >
              <Send className="h-4 w-4" /> Submit Answer / விடையைச் சமர்ப்பி
            </button>
          )}

          {/* GREEN OR RED FEEDBACK BANNER AFTER SUBMIT */}
          {submitted && (
            <div className="mb-6 space-y-3 animate-fadeIn">
              {isCorrect ? (
                <div className="rounded-2xl bg-emerald-500/20 p-4 border border-emerald-500/50 text-emerald-900 dark:text-emerald-200">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" /> 🎉 Correct Answer! / சரியான விடை! (+10 XP)
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-red-500/20 p-4 border border-red-500/50 text-red-900 dark:text-red-200">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" /> ❌ Incorrect! / தவறான விடை! (Correct: {currentQ.options[currentQ.answerIndex]})
                  </div>
                </div>
              )}

              {/* Technical Explanation Box */}
              <div className="rounded-2xl bg-bamboo-50 p-5 border border-bamboo-200 dark:bg-ink-900 dark:border-bamboo-800">
                <div className="flex items-center gap-2 text-xs font-bold text-bamboo-800 dark:text-bamboo-300 mb-1">
                  <BookOpen className="h-4 w-4 text-golden-500" /> Technical Explanation:
                </div>
                <p className="text-xs text-ink-800 dark:text-ink-200 mb-2 leading-relaxed">
                  {currentQ.explanation}
                </p>
                <p className="font-tamil text-xs text-bamboo-700 dark:text-bamboo-300 leading-relaxed border-t border-bamboo-200/60 pt-2 dark:border-bamboo-800">
                  💡 {currentQ.tamilExplanation}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between border-t border-bamboo-100 pt-4 dark:border-bamboo-800">
            <button
              onClick={handlePrevious}
              disabled={currentIdx === 0}
              className="btn-ghost text-xs disabled:opacity-30"
            >
              Previous Question
            </button>
            <button
              onClick={handleNext}
              disabled={!submitted}
              className="btn-primary text-xs px-6 py-2.5 bg-bamboo-600 hover:bg-bamboo-700 text-white font-bold disabled:opacity-40"
            >
              {currentIdx + 1 === totalQuestions ? 'Finish & View Scorecard 🏆' : 'Next Question ➔'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
