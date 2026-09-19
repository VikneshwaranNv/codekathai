import { useState, useEffect, useRef } from 'react';
import { Sparkles, X, ChevronLeft, ChevronRight, Volume2, Play, Pause, Code2, Bot, User } from 'lucide-react';
import type { KathaiStory } from '@/types/kathaiAi';
import SceneVisual from './SceneVisual';

interface KathaiAiModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: KathaiStory | null;
  code: string;
}

export default function KathaiAiModal({ isOpen, onClose, story, code }: KathaiAiModalProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const autoPlayTimerRef = useRef<number | null>(null);

  const totalSteps = story?.totalSteps || 0;
  const currentStep = story?.steps[currentStepIndex] || null;

  // Reset state when story opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      setIsPlaying(false);
      setIsSpeaking(false);
    }
  }, [isOpen, story]);

  // Handle Auto-Play Mode
  useEffect(() => {
    if (isPlaying && totalSteps > 0) {
      autoPlayTimerRef.current = window.setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 4000);
    } else if (autoPlayTimerRef.current) {
      window.clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) window.clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, totalSteps]);

  // Audio Voice Narration (Web Speech API)
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try finding Tamil voice if available, otherwise fallback
    const voices = window.speechSynthesis.getVoices();
    const taVoice = voices.find((v) => v.lang.startsWith('ta'));
    if (taVoice) {
      utterance.voice = taVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen || !story || !currentStep) return null;

  const isKavi = currentStep.speaker === 'kavi';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative flex flex-col w-full max-w-4xl max-h-[92vh] bg-ink-950 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden text-white">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-ink-900 via-ink-950 to-emerald-950/80 border-b border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-teal-400 flex items-center justify-center p-0.5 shadow-glow-sm">
              <div className="h-full w-full rounded-[14px] bg-ink-950 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-300 flex items-center gap-2">
                <span>{story.title}</span>
                <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/40">
                  🪄 Kathai-AI
                </span>
              </h2>
              <p className="text-xs text-emerald-400/80 font-medium">{story.tamilTitle}</p>
            </div>
          </div>

          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="h-9 w-9 rounded-full bg-ink-900 border border-ink-700 hover:border-rose-500 text-gray-400 hover:text-rose-400 flex items-center justify-center transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="bg-ink-900/60 px-6 py-2.5 border-b border-ink-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-500/30">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
            <div className="w-32 sm:w-48 h-2 bg-ink-800 rounded-full overflow-hidden border border-ink-700">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isPlaying
                  ? 'bg-amber-500 text-ink-950 shadow-glow-sm'
                  : 'bg-ink-800 hover:bg-ink-700 text-amber-300 border border-amber-500/30'
              }`}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlaying ? 'Pause Movie' : '▶ Play Story'}</span>
            </button>

            <div className="flex items-center gap-1">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                className="p-1.5 rounded-lg bg-ink-800 hover:bg-ink-700 disabled:opacity-40 text-emerald-400 border border-ink-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                disabled={currentStepIndex === totalSteps - 1}
                onClick={() => setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
                className="p-1.5 rounded-lg bg-ink-800 hover:bg-ink-700 disabled:opacity-40 text-emerald-400 border border-ink-700"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Story & Visual Canvas Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-ink-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Column: Dialogue & Code Context */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              {/* Speaker Card & Speech Bubble */}
              <div
                className={`p-5 rounded-2xl border transition-all duration-300 ${
                  isKavi
                    ? 'bg-sky-950/40 border-sky-500/40 shadow-glow-sm'
                    : 'bg-emerald-950/40 border-emerald-500/40 shadow-glow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold shadow-md ${
                        isKavi ? 'bg-sky-500 text-white' : 'bg-emerald-500 text-ink-950'
                      }`}
                    >
                      {isKavi ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                        <span>{currentStep.speakerTitle}</span>
                      </h3>
                      <span className="text-[10px] text-gray-400 font-mono">Dialogue Step #{currentStep.stepNumber}</span>
                    </div>
                  </div>

                  {/* Audio Voice Narration Button */}
                  <button
                    onClick={() => handleSpeak(currentStep.dialogue)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isSpeaking
                        ? 'bg-amber-500 text-ink-950 border-amber-400 animate-pulse'
                        : 'bg-ink-900 hover:bg-ink-800 text-amber-300 border-amber-500/40'
                    }`}
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>{isSpeaking ? 'Speaking...' : '🔊 Listen (குரல்)'}</span>
                  </button>
                </div>

                {/* Tamil Dialogue Box */}
                <div className="relative bg-ink-900/90 p-4 rounded-xl border border-ink-700/80">
                  <p className="text-sm sm:text-base font-semibold leading-relaxed text-amber-200">
                    "{currentStep.dialogue}"
                  </p>
                  <p className="text-xs text-emerald-300 mt-2 italic font-sans border-t border-ink-800/80 pt-2">
                    💡 {currentStep.tamilExplanation}
                  </p>
                </div>
              </div>

              {/* Executing Code Snippet Highlight Card */}
              <div className="p-4 rounded-2xl bg-ink-900 border border-ink-800 font-mono text-xs">
                <div className="flex items-center justify-between text-gray-400 text-[11px] mb-2 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Code2 className="h-3.5 w-3.5" /> Executing Code Line #{currentStep.lineIndex}
                  </span>
                  <span className="text-amber-400 font-normal">Active Execution</span>
                </div>
                <div className="p-3 rounded-xl bg-ink-950 border border-emerald-500/40 text-emerald-300 overflow-x-auto whitespace-pre">
                  <span className="text-gray-500 mr-3 select-none">{currentStep.lineIndex} |</span>
                  <span className="font-bold text-amber-300">{currentStep.codeSnippet}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic SVG Visual Diagram Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 rounded-2xl bg-ink-900/80 border border-emerald-500/30 min-h-[300px]">
              <div className="w-full text-center mb-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  {currentStep.diagramMeta?.title || 'Visual Execution Map'}
                </h4>
              </div>

              <div className="w-full h-full flex items-center justify-center py-2">
                <SceneVisual visual={currentStep.diagramType} className="max-h-[260px] w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-6 py-3 bg-ink-900/90 border-t border-ink-800 flex items-center justify-between text-xs text-gray-400 font-mono">
          <span>Powered by CodeKathai AI Engine</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentStepIndex === 0}
              className="px-4 py-2 rounded-xl bg-ink-800 hover:bg-ink-700 disabled:opacity-40 text-white font-bold border border-ink-700 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={() => {
                if (currentStepIndex === totalSteps - 1) {
                  onClose();
                } else {
                  setCurrentStepIndex((prev) => Math.min(totalSteps - 1, prev + 1));
                }
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-ink-950 font-extrabold shadow-glow-sm flex items-center gap-1 transition-all"
            >
              {currentStepIndex === totalSteps - 1 ? 'Finish Story ✨' : 'Next Step ▶'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
