import React from 'react';

interface CheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tamilTitle?: string;
  conceptSummaryEn?: string;
  conceptSummaryTa?: string;
  codeSnippet: string;
  challengeTitle?: string;
  challengeDescription?: string;
}

export default function CheatSheetModal({
  isOpen,
  onClose,
  title,
  tamilTitle,
  conceptSummaryEn,
  conceptSummaryTa,
  codeSnippet,
  challengeTitle,
  challengeDescription,
}: CheatSheetModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-3xl bg-ink-950 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-gray-100 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto printable-area">
        {/* HEADER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-bamboo-600 to-golden-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/50">
              📚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-emerald-400">{title}</h2>
                {tamilTitle && (
                  <span className="text-sm font-bold text-golden-300 bg-ink-900 px-2.5 py-0.5 rounded-full border border-golden-500/30">
                    {tamilTitle}
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-300">
                Code Kathai (கோட் கதை) — Official C Programming Reference Cheat Sheet
              </p>
            </div>
          </div>

          {/* ACTIONS: PRINT & CLOSE */}
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-400 text-ink-950 hover:brightness-110 shadow-lg shadow-emerald-950/60 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              🖨️ Print / Save as PDF (அச்சிடுக)
            </button>

            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl text-xs font-bold bg-ink-900 hover:bg-ink-800 text-gray-300 border border-ink-800 transition-all cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* BILINGUAL CONCEPT SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-ink-900/80 p-4 rounded-2xl border border-ink-800 flex flex-col gap-2">
            <h3 className="text-xs font-extrabold text-emerald-400 flex items-center gap-1.5">
              🇬🇧 English Summary
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              {conceptSummaryEn ||
                'Master key C programming concepts through structured logic, memory allocation rules, and clean code syntax.'}
            </p>
          </div>

          <div className="bg-[#051505] p-4 rounded-2xl border border-[#00ff66]/30 flex flex-col gap-2">
            <h3 className="text-xs font-extrabold text-golden-300 flex items-center gap-1.5">
              🇮🇳 தமிழ் விளக்கம் (Tamil Summary)
            </h3>
            <p className="text-xs text-emerald-300 leading-relaxed font-medium">
              {conceptSummaryTa ||
                'சி நிரலாக்கத்தின் அடிப்படை தத்துவங்களை எளிய தமிழ் கதைகள் மற்றும் வரைபடங்கள் வழியாக எளிதாக கற்றுக்கொள்ளலாம்.'}
            </p>
          </div>
        </div>

        {/* CODE SNIPPET REFERENCE */}
        <div className="bg-[#020702] p-4 rounded-2xl border border-[#00ff66]/40 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#00ff66] border-b border-[#0a200a] pb-2">
            <span className="flex items-center gap-1.5">💻 C Source Code Reference</span>
            <span className="text-[10px] text-gray-400">Matrix Hacker IDE</span>
          </div>
          <pre className="font-mono text-xs text-[#00ff66] bg-[#010301] p-4 rounded-xl border border-[#00ff66]/20 overflow-x-auto whitespace-pre leading-relaxed select-text">
            {codeSnippet}
          </pre>
        </div>

        {/* MINI CHALLENGE & SOLUTION */}
        {(challengeTitle || challengeDescription) && (
          <div className="bg-gradient-to-r from-ink-900 via-ink-950 to-emerald-950/40 p-4 rounded-2xl border border-golden-500/30 flex flex-col gap-2">
            <h3 className="text-xs font-extrabold text-golden-400 flex items-center gap-1.5">
              🚀 Mini Challenge & Problem Solving (நடைமுறை பயிற்சி)
            </h3>
            <p className="text-xs text-gray-200 font-semibold">{challengeTitle}</p>
            <p className="text-xs text-ink-300 leading-relaxed">{challengeDescription}</p>
          </div>
        )}

        {/* FOOTER STAMP */}
        <div className="flex items-center justify-between border-t border-ink-800 pt-4 text-[11px] text-gray-400">
          <span>Code Kathai Platform © 2026</span>
          <span className="text-emerald-400 font-bold">
            https://codekathai.vercel.app/
          </span>
        </div>
      </div>
    </div>
  );
}
