import { useState, useMemo, useRef } from 'react';
import {
  ArrowLeft,
  Bug,
  Trophy,
  Sparkles,
  Lock,
  CheckCircle2,
  Play,
  RotateCcw,
  Lightbulb,
  Bot,
  AlertCircle,
  Flame,
  Award,
  ChevronRight,
  Code2,
  Terminal,
  ShieldCheck,
  Zap,
  Check,
  X,
  Swords,
  Heart,
  Skull,
  Volume2,
  VolumeX,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import { useProgress } from '@/lib/useProgress';
import { BUG_HUNTER_LEVELS, type BugLevel } from '@/data/bugHunterData';
import { compileAndRunCProgram } from '@/lib/cSimulator';
import { explainLineByLine, explainAsTamilStory, explainError } from '@/data/aiTutor';
import CCodeEditor from '@/components/CCodeEditor';
import {
  isSoundMuted,
  toggleSoundMuted,
  playLaserZapSound,
  playExplosionSound,
  playShieldDeflectSound,
  playVictoryJingleSound,
  playButtonClickSound,
} from '@/lib/soundEffects';

interface BugHunterPageProps {
  onNavigate: (page: Page) => void;
}

export default function BugHunterPage({ onNavigate }: BugHunterPageProps) {
  const { profile } = useAuth();
  const progress = useProgress();

  // Selected Active Level State
  const [activeLevel, setActiveLevel] = useState<BugLevel | null>(null);

  // Gameplay State
  const [userCode, setUserCode] = useState<string>('');
  const [bossHp, setBossHp] = useState<number>(100);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileOutput, setCompileOutput] = useState<string>('');
  const [compileError, setCompileError] = useState<string | null>(null);
  const [attackStatus, setAttackStatus] = useState<'idle' | 'hit' | 'miss'>('idle');
  const [combatLog, setCombatLog] = useState<string[]>([]);

  // Hint & AI Tutor Modal State
  const [hintIndex, setHintIndex] = useState<number>(-1);
  const [showAiModal, setShowAiModal] = useState<boolean>(false);
  const [aiMode, setAiMode] = useState<'hint' | 'explain' | 'story' | 'error'>('hint');
  const [aiResponseText, setAiResponseText] = useState<string>('');

  // Victory Celebration Modal State
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [earnedXp, setEarnedXp] = useState<number>(100);

  // Arcade Sound Effects State
  const [muted, setMuted] = useState<boolean>(() => isSoundMuted());

  const handleToggleSound = () => {
    const next = toggleSoundMuted();
    setMuted(next);
    if (!next) {
      playButtonClickSound();
    }
  };

  // Compute Unlocked / Completed State for 10 Levels (ALL UNLOCKED BY DEFAULT)
  const levelStates = useMemo(() => {
    const states: Record<string, { unlocked: boolean; completed: boolean }> = {};

    for (const lvl of BUG_HUNTER_LEVELS) {
      const completed = progress.isBugLevelCompleted(lvl.id);
      // All 10 levels unlocked by default for instant access
      states[lvl.id] = { unlocked: true, completed };
    }

    return states;
  }, [progress]);

  // Find Current Next Available Level
  const nextAvailableLevel = useMemo(() => {
    for (const lvl of BUG_HUNTER_LEVELS) {
      if (!levelStates[lvl.id]?.completed) {
        return lvl;
      }
    }
    return BUG_HUNTER_LEVELS[0];
  }, [levelStates]);

  // Start Bug Hunt Game
  const startHunt = (level: BugLevel) => {
    playButtonClickSound();
    setActiveLevel(level);
    setUserCode(level.brokenCode);
    setBossHp(level.bossMaxHp);
    setCompileOutput('');
    setCompileError(null);
    setAttackStatus('idle');
    setCombatLog([`⚔️ Mission Started! Defeat ${level.bugName} by fixing the C code!`]);
    setHintIndex(-1);
    setShowVictoryModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Run C Code & Verify Solution against Bug Boss
  const handleRunCode = async () => {
    if (!activeLevel) return;
    playLaserZapSound();
    setIsCompiling(true);
    setCompileOutput('');
    setCompileError(null);
    setAttackStatus('idle');

    try {
      const res = await compileAndRunCProgram(userCode, '');
      setCompileOutput(res.output || '');
      setCompileError(res.error || null);

      const normalize = (str: string) => str.replace(/\r\n/g, '\n').trim();
      const actual = normalize(res.output || '');
      const expected = normalize(activeLevel.expectedOutput || '');

      const isCorrect = !res.error && actual === expected;

      if (isCorrect) {
        // Calculate Damage
        const damage = Math.ceil(activeLevel.bossMaxHp * 0.5);
        const nextHp = Math.max(0, bossHp - damage);
        setBossHp(nextHp);
        setAttackStatus('hit');
        playExplosionSound();

        const newLog = [
          `💥 CRITICAL HIT! Fixed C bug!`,
          `💥 BUG DAMAGED! ${activeLevel.bugName} HP: ${bossHp} → ${nextHp}`,
          ...combatLog,
        ];
        setCombatLog(newLog);

        if (nextHp <= 0 || bossHp <= 50) {
          // Defeated!
          playVictoryJingleSound();
          setBossHp(0);
          setEarnedXp(activeLevel.xpReward);
          progress.recordCompletedBugLevel(activeLevel.id, activeLevel.xpReward);
          setShowVictoryModal(true);
        }
      } else {
        playShieldDeflectSound();
        setAttackStatus('miss');
        setCombatLog([
          `❌ ATTACK MISSED! The bug is still alive. Check compiler output for syntax errors!`,
          ...combatLog,
        ]);
      }
    } catch (err: any) {
      playShieldDeflectSound();
      setCompileError(err?.message || 'Execution error during bug validation.');
      setAttackStatus('miss');
    } finally {
      setIsCompiling(false);
    }
  };

  // Advance to Next Bug Level
  const handleNextLevel = () => {
    if (!activeLevel) return;
    const currentIdx = BUG_HUNTER_LEVELS.findIndex((l) => l.id === activeLevel.id);
    const nextIdx = (currentIdx + 1) % BUG_HUNTER_LEVELS.length;
    startHunt(BUG_HUNTER_LEVELS[nextIdx]);
  };

  // Next Hint Toggle
  const handleNextHint = () => {
    if (!activeLevel) return;
    const nextIdx = (hintIndex + 1) % activeLevel.hints.length;
    setHintIndex(nextIdx);
  };

  // Open AI Tutor Drawer
  const handleOpenAiTutor = (selectedMode: 'hint' | 'explain' | 'story' | 'error') => {
    if (!activeLevel) return;
    setAiMode(selectedMode);

    if (selectedMode === 'explain') {
      const lineExps = explainLineByLine(userCode);
      const text = lineExps.map((l) => `• ${l.line}\n  En: ${l.explanation}\n  Ta: ${l.tamilExplanation}`).join('\n\n');
      setAiResponseText(text);
    } else if (selectedMode === 'story') {
      const storyText = explainAsTamilStory(userCode);
      setAiResponseText(storyText);
    } else if (selectedMode === 'error') {
      const errExpl = explainError(compileError || 'Syntax error in C program');
      setAiResponseText(`Error: ${errExpl.explanation}\n\nTamil: ${errExpl.tamilExplanation}\n\nFix Suggestion: ${errExpl.fix}`);
    } else {
      const currentHint = activeLevel.hints[0] || 'Check syntax and variable declarations.';
      setAiResponseText(`💡 Level Concept: ${activeLevel.concept}\n\nHint: ${currentHint}\n\nExpected Output: "${activeLevel.expectedOutput}"`);
    }

    setShowAiModal(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-ink-950 text-ink-900 dark:text-white font-sans py-8">
      {/* Live Bug Battle Keyframe Animations */}
      <style>{`
        @keyframes liveBugFloat {
          0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
          20% { transform: translate(75px, -35px) rotate(10deg) scale(1.12); }
          40% { transform: translate(-70px, 28px) rotate(-10deg) scale(0.9); }
          60% { transform: translate(65px, 35px) rotate(12deg) scale(1.08); }
          80% { transform: translate(-65px, -32px) rotate(-12deg) scale(0.94); }
          100% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
        }

        @keyframes liveBugHit {
          0% { transform: scale(1) translate(0, 0); filter: brightness(1); }
          15% { transform: scale(1.4) translate(-25px, -18px) rotate(-15deg); filter: brightness(2.5) drop-shadow(0 0 25px #f59e0b); }
          30% { transform: scale(1.35) translate(25px, 18px) rotate(15deg); filter: brightness(3) drop-shadow(0 0 30px #ef4444); }
          45% { transform: scale(1.2) translate(-18px, 12px) rotate(-10deg); filter: brightness(2) drop-shadow(0 0 20px #10b981); }
          60% { transform: scale(1.1) translate(12px, -10px) rotate(8deg); }
          100% { transform: scale(1) translate(0, 0); filter: brightness(1); }
        }

        @keyframes liveBugDodge {
          0% { transform: translateX(0); }
          20% { transform: translateX(50px) rotate(22deg); }
          40% { transform: translateX(-50px) rotate(-22deg); }
          60% { transform: translateX(30px) rotate(12deg); }
          100% { transform: translateX(0); }
        }

        @keyframes compilerBeam {
          0% { width: 0%; opacity: 1; }
          50% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }

        @keyframes floatDamageText {
          0% { opacity: 0; transform: translateY(0) scale(0.6); }
          40% { opacity: 1; transform: translateY(-35px) scale(1.3); }
          100% { opacity: 0; transform: translateY(-70px) scale(1); }
        }

        @keyframes jailSlam {
          0% { transform: translateY(-120%) scale(1.4); opacity: 0; }
          60% { transform: translateY(12px) scale(0.95); opacity: 1; }
          80% { transform: translateY(-6px) scale(1.02); }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        .animate-bug-float {
          animation: liveBugFloat 4.5s ease-in-out infinite;
        }

        .animate-bug-hit {
          animation: liveBugHit 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
        }

        .animate-bug-dodge {
          animation: liveBugDodge 0.6s ease-in-out;
        }

        .animate-compiler-beam {
          animation: compilerBeam 0.7s ease-out forwards;
        }

        .animate-damage-float {
          animation: floatDamageText 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }

        .animate-jail-slam {
          animation: jailSlam 0.65s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
      <div className="container-page space-y-8">
        
        {/* TOP BAR / NAVIGATION */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="btn-ghost text-xs font-bold text-ink-600 dark:text-ink-300 hover:text-bamboo-700 flex items-center gap-1.5"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Courses
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className={`chip py-1.5 px-3 font-bold text-xs shadow-soft flex items-center gap-1.5 transition-all cursor-pointer ${
                muted
                  ? 'bg-stone-200 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                  : 'bg-gradient-to-r from-golden-400 to-amber-500 text-ink-950 shadow-md'
              }`}
              title={muted ? 'Unmute Arcade Sound FX' : 'Mute Arcade Sound FX'}
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 animate-pulse" />}
              {muted ? 'SFX Muted' : '🔊 Arcade SFX ON'}
            </button>

            <span className="chip bg-bamboo-600 text-white font-bold text-xs shadow-soft flex items-center gap-1.5">
              <Bug className="h-3.5 w-3.5 text-golden-300" /> Code Kathai Bug Hunter
            </span>
          </div>
        </div>

        {/* BAMBOO GREEN HEADER & PLAYER STATS BANNER */}
        <div className="rounded-3xl bg-gradient-to-r from-bamboo-950 via-bamboo-900 to-emerald-950 p-6 sm:p-8 text-white shadow-2xl border border-bamboo-700/50 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="grid h-8 w-8 place-items-center rounded-xl bg-bamboo-500/20 text-bamboo-200 border border-bamboo-400/30">
                  <Bug className="h-4 w-4 text-bamboo-400" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-bamboo-300 font-mono">
                  Code Kathai Bug Hunter
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-2 text-white">
                🐛 BUG HUNTER
              </h1>
              <p className="font-tamil mt-1 text-xs sm:text-sm text-bamboo-200/90">
                Find the bug. Fix the code. Defeat the boss.
              </p>
            </div>

            {/* Quick Action: Start/Continue Hunt */}
            {!activeLevel && nextAvailableLevel && (
              <button
                onClick={() => startHunt(nextAvailableLevel)}
                className="btn-primary py-3 px-6 text-xs font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-bamboo-500 via-emerald-500 to-golden-400 text-ink-950 hover:from-bamboo-400 hover:to-golden-300 shadow-lg rounded-2xl transition-all shrink-0"
              >
                <Swords className="h-4 w-4" /> Play Level {nextAvailableLevel.levelNumber} Hunt →
              </button>
            )}
          </div>

          {/* Player Stats Card Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-golden-400/20 text-golden-300 font-bold text-base">
                ⭐
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-bamboo-200 block">Total XP</span>
                <span className="font-display text-lg font-bold text-golden-300">{progress.xp} XP</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-bamboo-500/20 text-bamboo-300 font-bold text-base">
                🏆
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-bamboo-200 block">Player Level</span>
                <span className="font-bold text-white">Level {progress.level}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300 font-bold text-base">
                🐛
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-bamboo-200 block">Bugs Defeated</span>
                <span className="font-display text-lg font-bold text-emerald-300">{progress.completedBugLevelsCount}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-golden-500/20 text-golden-300 font-bold text-base">
                🎯
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold text-bamboo-200 block">Challenges</span>
                <span className="font-display text-lg font-bold text-golden-300">
                  {progress.completedBugLevelsCount} / 10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* IF A LEVEL IS ACTIVE: SHOW SPLIT BATTLE GAMEPLAY WORKSPACE */}
        {activeLevel ? (
          <div className="space-y-6 animate-fade-in">
            
            {/* Level Action Header Bar */}
            <div className="card p-5 bg-white dark:bg-ink-900 border border-bamboo-200 dark:border-bamboo-900/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <button
                    onClick={() => setActiveLevel(null)}
                    className="text-xs font-bold text-bamboo-700 hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to Level Select
                  </button>
                  <span className="text-ink-300">|</span>
                  <span className="chip bg-bamboo-100 text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300 text-[10px]">
                    Level {activeLevel.levelNumber} of 10
                  </span>
                  <span className="chip bg-golden-100 text-golden-800 dark:bg-golden-950 dark:text-golden-300 text-[10px]">
                    ⭐ +{activeLevel.xpReward} XP
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white flex items-center gap-2">
                  🐛 LEVEL {activeLevel.levelNumber}: {activeLevel.title}
                  {progress.isBugLevelCompleted(activeLevel.id) && (
                    <span className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs">
                      ✓ Completed
                    </span>
                  )}
                </h2>
                <p className="text-xs text-ink-600 dark:text-ink-400 mt-1">
                  {activeLevel.mission}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleNextHint}
                  className="btn-secondary py-2 px-3 text-xs font-bold flex items-center gap-1.5 bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800 rounded-xl"
                >
                  <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                  {hintIndex >= 0 ? `Hint (${hintIndex + 1}/${activeLevel.hints.length})` : 'Get Hint'}
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isCompiling}
                  className="btn-primary py-2.5 px-5 text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-bamboo-600 via-emerald-600 to-bamboo-700 text-white rounded-xl shadow-md disabled:opacity-50"
                >
                  <Play className={`h-4 w-4 ${isCompiling ? 'animate-spin' : ''}`} />
                  {isCompiling ? 'Compiling C Code...' : '🚀 ▶ RUN CODE & ATTACK BUG'}
                </button>

                <button
                  onClick={handleNextLevel}
                  className="btn-secondary py-2.5 px-4 text-xs font-bold flex items-center gap-1.5 bg-bamboo-100 text-bamboo-900 border-bamboo-300 hover:bg-bamboo-200 dark:bg-bamboo-950 dark:text-bamboo-200 dark:border-bamboo-800 rounded-xl"
                >
                  Next Level ({activeLevel.levelNumber < 10 ? activeLevel.levelNumber + 1 : 1}) →
                </button>
              </div>
            </div>

            {/* Hint Display Box */}
            {hintIndex >= 0 && (
              <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Bug Hunter Hint #{hintIndex + 1}:</span>
                  <p className="mt-0.5">{activeLevel.hints[hintIndex]}</p>
                </div>
              </div>
            )}

            {/* SPLIT BATTLE LAYOUT (LEFT: 🎮 BAMBOO GAME, RIGHT: 💻 C CODE EDITOR) */}
            <div className="grid gap-6 lg:grid-cols-2">
              
              {/* LEFT COLUMN: 🎮 BAMBOO GREEN BUG BOSS GAME PANEL */}
              <div className="card p-6 bg-gradient-to-b from-bamboo-950 via-ink-950 to-emerald-950 border border-bamboo-800/60 shadow-2xl text-white space-y-6 flex flex-col justify-between min-h-[420px]">
                
                {/* Boss Status Card Header */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-bamboo-800/80 pb-3">
                    <div className="flex items-center gap-2">
                      <Swords className="h-5 w-5 text-bamboo-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-bamboo-300 font-mono">
                        BUG BOSS BATTLE
                      </span>
                    </div>
                    <span className="chip bg-bamboo-950 text-bamboo-300 text-[10px] border border-bamboo-800 font-mono">
                      Concept: {activeLevel.concept}
                    </span>
                  </div>

                  {/* LIVE ANIMATED BATTLE ARENA STAGE */}
                  <div className="rounded-3xl bg-gradient-to-b from-black/90 via-bamboo-950/70 to-black/95 p-6 border border-bamboo-700/80 text-center space-y-4 relative overflow-hidden shadow-2xl min-h-[270px] flex flex-col justify-between">
                    
                    {/* Live Compiler Laser Attack Beam */}
                    {(isCompiling || attackStatus === 'hit') && (
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-5 bg-gradient-to-r from-transparent via-golden-400 to-emerald-400 blur-sm animate-compiler-beam z-20 pointer-events-none" />
                    )}

                    {/* Arena Stage Grid Pattern */}
                    <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-bamboo-500/20 rounded-full blur-2xl pointer-events-none" />

                    {/* Floating Damage Text Overlay */}
                    {attackStatus === 'hit' && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-damage-float text-center">
                        <span className="font-display font-extrabold text-2xl text-golden-300 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] bg-black/80 px-4 py-1.5 rounded-full border border-golden-400">
                          💥 -{Math.ceil(activeLevel.bossMaxHp * 0.5)} HP! CRITICAL HIT!
                        </span>
                      </div>
                    )}

                    {/* Floating Miss / Dodge Overlay */}
                    {attackStatus === 'miss' && (
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-damage-float text-center">
                        <span className="font-display font-extrabold text-sm text-rose-300 bg-black/80 px-3.5 py-1.5 rounded-full border border-rose-500 shadow-lg">
                          🛡️ DODGED! Fix C Bug!
                        </span>
                      </div>
                    )}

                    {/* ARRESTED BUG JAIL CAGE OVERLAY (Slams down when error is solved / HP <= 0) */}
                    {(bossHp <= 0 || attackStatus === 'hit' || progress.isBugLevelCompleted(activeLevel.id)) && (
                      <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-jail-slam p-3">
                        <div className="relative w-48 h-48 rounded-2xl border-4 border-stone-400 bg-stone-950/90 shadow-2xl flex flex-col items-center justify-between p-3 overflow-hidden">
                          {/* Vertical Metallic Jail Steel Bars */}
                          <div className="absolute inset-0 flex justify-between pointer-events-none px-4 z-20">
                            <div className="w-2.5 h-full bg-gradient-to-r from-stone-400 via-stone-200 to-stone-600 shadow-md border-r border-black/40" />
                            <div className="w-2.5 h-full bg-gradient-to-r from-stone-400 via-stone-200 to-stone-600 shadow-md border-r border-black/40" />
                            <div className="w-2.5 h-full bg-gradient-to-r from-stone-400 via-stone-200 to-stone-600 shadow-md border-r border-black/40" />
                            <div className="w-2.5 h-full bg-gradient-to-r from-stone-400 via-stone-200 to-stone-600 shadow-md border-r border-black/40" />
                          </div>

                          {/* Top Jail Lock Badge */}
                          <div className="z-30 flex items-center gap-1 bg-rose-950/90 text-rose-200 px-3 py-1 rounded-full border border-rose-600 text-[10px] font-mono font-bold shadow-md">
                            <Lock className="h-3.5 w-3.5 text-golden-400 animate-pulse" /> JAIL LOCKED 🔒
                          </div>

                          {/* Imprisoned Bug Character Trapped Behind Bars */}
                          <div className="text-6xl filter grayscale brightness-90 relative z-10 my-1 animate-pulse">
                            {activeLevel.bugAvatar}
                          </div>

                          {/* Bottom Arrest Status Banner */}
                          <div className="z-30 bg-gradient-to-r from-emerald-600 to-bamboo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                            🚨 BUG ARRESTED & DEFEATED!
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Live Moving Boss Character Stage */}
                    <div className="relative py-4 flex flex-col items-center justify-center min-h-[140px]">
                      {/* Boss Shadow / Energy Platform */}
                      <div className="absolute bottom-1 h-5 w-28 rounded-full bg-emerald-500/30 blur-md border border-emerald-500/40 animate-pulse" />

                      {/* Boss Avatar Sprite with Live Floatable Motion */}
                      <div
                        className={`text-7xl cursor-pointer select-none transition-all duration-300 transform-gpu relative z-10 ${
                          attackStatus === 'hit'
                            ? 'animate-bug-hit'
                            : attackStatus === 'miss'
                            ? 'animate-bug-dodge'
                            : 'animate-bug-float'
                        }`}
                        title={`${activeLevel.bugName} - Floatable Bug Boss`}
                      >
                        {activeLevel.bugAvatar}
                      </div>

                      {/* Live Boss Name Tag */}
                      <h3 className="font-display text-2xl font-bold text-bamboo-200 mt-2 tracking-wide flex items-center justify-center gap-2">
                        {activeLevel.bugName}
                      </h3>
                    </div>

                    {/* Health Bar */}
                    <div className="space-y-1 relative z-10">
                      <div className="flex justify-between items-center text-xs font-bold font-mono">
                        <span className="text-rose-400 flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5 fill-current text-rose-500 animate-pulse" /> HP:
                        </span>
                        <span className="text-bamboo-300 font-bold">{bossHp} / {activeLevel.bossMaxHp} HP</span>
                      </div>
                      <div className="h-4 w-full bg-stone-900/90 rounded-full overflow-hidden p-0.5 border border-bamboo-700/80 shadow-inner">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            (bossHp / activeLevel.bossMaxHp) > 0.5
                              ? 'bg-gradient-to-r from-emerald-500 via-bamboo-400 to-golden-400'
                              : (bossHp / activeLevel.bossMaxHp) > 0.2
                              ? 'bg-gradient-to-r from-amber-500 to-golden-400'
                              : 'bg-gradient-to-r from-rose-600 to-rose-400 animate-pulse'
                          }`}
                          style={{ width: `${Math.max(0, (bossHp / activeLevel.bossMaxHp) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Player Status & Combat Log Console */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono border-t border-bamboo-800/80 pt-3 text-bamboo-300">
                    <span>🧑‍💻 Player: Ready</span>
                    <span>Weapon: GCC C Compiler</span>
                  </div>

                  {/* Combat Messages Box */}
                  <div className="rounded-xl bg-black/60 p-3 border border-bamboo-900/60 font-mono text-[11px] text-stone-300 space-y-1.5 max-h-36 overflow-y-auto">
                    {combatLog.map((log, idx) => (
                      <p key={idx} className={log.includes('💥') ? 'text-emerald-400 font-bold' : log.includes('❌') ? 'text-rose-400' : 'text-stone-300'}>
                        {log}
                      </p>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: 💻 C CODE EDITOR & TERMINAL */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400 flex items-center gap-1.5">
                    <Code2 className="h-4 w-4 text-bamboo-600" /> Broken C Code Editor
                  </span>
                  <button
                    onClick={() => setUserCode(activeLevel.brokenCode)}
                    className="text-[11px] font-bold text-ink-500 hover:text-bamboo-600 flex items-center gap-1"
                  >
                    <RotateCcw className="h-3 w-3" /> Reset Broken Code
                  </button>
                </div>

                {/* Real C Code Editor */}
                <CCodeEditor
                  value={userCode}
                  onChange={setUserCode}
                  rows={13}
                />

                {/* Compiler Output Console */}
                <div className="rounded-2xl border border-stone-800 bg-ink-950 p-4 font-mono text-xs text-emerald-300 min-h-[160px] space-y-2 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2 text-[10px] text-stone-400 uppercase font-bold">
                    <span>GCC Compiler Output</span>
                    <span>Expected Output: "{activeLevel.expectedOutput}"</span>
                  </div>

                  {isCompiling ? (
                    <div className="py-8 text-center text-amber-300 animate-pulse">
                      Compiling C code with GCC compiler...
                    </div>
                  ) : compileError ? (
                    <div className="text-rose-400 space-y-1">
                      <p className="font-bold flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" /> GCC Compiler Error:
                      </p>
                      <pre className="whitespace-pre-wrap font-mono text-[11px] text-rose-300">{compileError}</pre>
                    </div>
                  ) : compileOutput ? (
                    <pre className="whitespace-pre-wrap font-mono text-emerald-300">{compileOutput}</pre>
                  ) : (
                    <div className="py-8 text-center text-stone-500 italic">
                      Click "RUN CODE & ATTACK BUG" to compile code and strike the bug!
                    </div>
                  )}
                </div>

                {/* Dedicated Next Level Action Bar under Editor & Console */}
                <div className="card p-4 bg-white dark:bg-ink-900 border border-bamboo-200 dark:border-bamboo-800 flex items-center justify-between shadow-md">
                  <button
                    onClick={() => setActiveLevel(null)}
                    className="btn-ghost text-xs font-bold text-ink-600 dark:text-ink-300 hover:text-bamboo-700 flex items-center gap-1.5"
                  >
                    ← Level Selection Map
                  </button>

                  <button
                    onClick={handleNextLevel}
                    className="btn-primary py-2.5 px-5 text-xs font-bold bg-gradient-to-r from-bamboo-600 via-emerald-600 to-golden-500 text-white rounded-xl shadow-md flex items-center gap-2 hover:scale-[1.02] transition-transform"
                  >
                    ▶ Next Level Hunt (Level {activeLevel.levelNumber < 10 ? activeLevel.levelNumber + 1 : 1}) →
                  </button>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* LEVEL SELECTION SCREEN (ALL 10 LEVELS UNLOCKED) */
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white flex items-center gap-2">
                  🐛 Select Bug Level (All 10 Unlocked)
                </h2>
                <p className="text-xs text-ink-600 dark:text-ink-400 mt-0.5">
                  Choose any level to fix C code bugs, defeat bug bosses, and earn XP!
                </p>
              </div>
            </div>

            {/* Grid of 10 Levels */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              {BUG_HUNTER_LEVELS.map((lvl) => {
                const st = levelStates[lvl.id];
                const isBoss = lvl.levelNumber === 10;

                return (
                  <div
                    key={lvl.id}
                    className={`card p-5 border text-left flex flex-col justify-between space-y-4 transition-all duration-300 ${
                      isBoss
                        ? 'bg-gradient-to-b from-bamboo-900/20 to-emerald-900/20 border-2 border-bamboo-500 shadow-xl'
                        : st?.completed
                        ? 'bg-emerald-50/60 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900'
                        : 'bg-white dark:bg-ink-900 border-bamboo-200 dark:border-bamboo-800 hover:border-bamboo-400 hover:ring-4 hover:ring-bamboo-500/10 shadow-sm'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="chip bg-bamboo-100 text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300 text-[10px] font-bold">
                          LEVEL {lvl.levelNumber}
                        </span>
                        {st?.completed && (
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white font-bold text-xs">
                            ✓
                          </span>
                        )}
                      </div>

                      <div className="text-3xl my-1">{lvl.bugAvatar}</div>

                      <h3 className="font-display text-base font-bold text-ink-900 dark:text-white">
                        {lvl.title}
                      </h3>

                      <div className="text-[11px] space-y-1">
                        <p className="text-ink-500 font-bold">Learn: <span className="text-bamboo-700 dark:text-bamboo-300 font-mono">{lvl.concept}</span></p>
                        <p className="text-amber-500 font-bold">Difficulty: {'⭐'.repeat(lvl.difficulty)}</p>
                        <p className="text-golden-600 dark:text-golden-400 font-bold">⭐ +{lvl.xpReward} XP</p>
                      </div>
                    </div>

                    <button
                      onClick={() => startHunt(lvl)}
                      className={`w-full py-2.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                        st?.completed
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          : 'bg-gradient-to-r from-bamboo-600 via-emerald-600 to-bamboo-700 text-white hover:from-bamboo-700 shadow-md'
                      }`}
                    >
                      {st?.completed ? (
                        <>✓ Replay Hunt</>
                      ) : (
                        <><Play className="h-3.5 w-3.5 fill-current" /> START HUNT</>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VICTORY CELEBRATION MODAL */}
        {showVictoryModal && activeLevel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-ink-900 border border-emerald-400 shadow-2xl p-6 text-center space-y-5">
              
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-emerald-500 to-bamboo-600 text-white font-bold text-3xl shadow-lg animate-bounce">
                🏆
              </div>

              <div>
                <span className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
                  BUG DEFEATED
                </span>
                <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-white mt-2">
                  💥 {activeLevel.bugName} Defeated!
                </h3>
                <p className="text-xs text-ink-600 dark:text-ink-300 mt-1">
                  Fantastic C programming work! You fixed the bug and conquered Level {activeLevel.levelNumber}!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 space-y-1">
                <span className="text-xs uppercase font-bold text-emerald-600 block">Reward Earned</span>
                <p className="font-display text-3xl font-bold text-golden-500">
                  +{earnedXp} XP
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    setShowVictoryModal(false);
                    handleNextLevel();
                  }}
                  className="btn-primary py-3 text-xs font-bold w-full bg-gradient-to-r from-bamboo-600 via-emerald-600 to-golden-500 text-white rounded-xl shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                >
                  ▶ Next Level Hunt (Level {activeLevel.levelNumber < 10 ? activeLevel.levelNumber + 1 : 1}) →
                </button>
                <button
                  onClick={() => {
                    setShowVictoryModal(false);
                    setActiveLevel(null);
                  }}
                  className="btn-ghost py-2 text-xs font-bold w-full text-ink-600 dark:text-ink-400"
                >
                  Back to Level Selection Map
                </button>
              </div>

            </div>
          </div>
        )}

        {/* AI TUTOR INTEGRATION DRAWER */}
        {showAiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto rounded-3xl bg-white dark:bg-ink-900 border border-purple-500 shadow-2xl p-6 space-y-5">
              
              <div className="flex items-center justify-between border-b border-stone-200 dark:border-ink-800 pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  <h3 className="font-display text-lg font-bold text-ink-900 dark:text-white">
                    AI Tutor Bug Assistant
                  </h3>
                </div>
                <button
                  onClick={() => setShowAiModal(false)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-stone-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-ink-950 border border-stone-200 dark:border-ink-800 font-mono text-xs text-ink-800 dark:text-ink-200 space-y-2 max-h-72 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-xs">{aiResponseText}</pre>
              </div>

              <button
                onClick={() => setShowAiModal(false)}
                className="btn-primary py-2.5 text-xs font-bold w-full bg-purple-600 text-white rounded-xl"
              >
                Got It! Close Assistant
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
