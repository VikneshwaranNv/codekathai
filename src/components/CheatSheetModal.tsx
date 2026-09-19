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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-3xl bg-[#090d16] border border-emerald-500/50 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col gap-6 max-h-[92vh] overflow-y-auto printable-area">
        {/* HEADER BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-bamboo-600 to-amber-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/80">
              📚
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-emerald-300">{title}</h2>
                {tamilTitle && (
                  <span className="text-xs sm:text-sm font-extrabold text-amber-300 bg-amber-950/80 px-3 py-0.5 rounded-full border border-amber-500/50">
                    {tamilTitle}
                  </span>
                )}
              </div>
              <p className="text-xs text-emerald-400/90 font-medium">
                CodeKathai (கோட் கதை) — Official Bilingual Programming Reference Cheat Sheet
              </p>
            </div>
          </div>

          {/* ACTIONS: PRINT & CLOSE */}
          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 text-ink-950 hover:brightness-110 shadow-lg shadow-emerald-950/60 flex items-center gap-1.5 transition-all cursor-pointer border border-amber-300/40"
            >
              🖨️ Print / Save as PDF (அச்சிடுக)
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-ink-900 hover:bg-ink-800 text-gray-200 border border-ink-700 transition-all cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        </div>

        {/* BILINGUAL CONCEPT SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-ink-900/90 p-4 rounded-2xl border border-emerald-500/30 flex flex-col gap-2">
            <h3 className="text-xs font-black text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              🇬🇧 English Concept Summary
            </h3>
            <p className="text-xs text-gray-100 font-medium leading-relaxed">
              {conceptSummaryEn ||
                'Master key programming concepts through structured logic, memory allocation rules, and clean syntax.'}
            </p>
          </div>

          <div className="bg-[#04180a] p-4 rounded-2xl border border-emerald-500/50 flex flex-col gap-2">
            <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              🇮🇳 தமிழ் விளக்கம் (Tamil Summary)
            </h3>
            <p className="text-xs text-amber-100 font-semibold leading-relaxed">
              {conceptSummaryTa ||
                'நிரலாக்கத்தின் அடிப்படை தத்துவங்களை எளிய தமிழ் கதைகள் மற்றும் வரைபடங்கள் வழியாக எளிதாக கற்றுக்கொள்ளலாம்.'}
            </p>
          </div>
        </div>

        {/* CODE SNIPPET REFERENCE */}
        <div className="bg-[#020a04] p-4.5 rounded-2xl border border-emerald-500/50 flex flex-col gap-2 shadow-inner">
          <div className="flex items-center justify-between text-xs font-extrabold text-[#00ff66] border-b border-emerald-900/80 pb-2">
            <span className="flex items-center gap-1.5">💻 Source Code Reference (மூல நிரல்)</span>
            <span className="text-[10px] text-emerald-400 font-mono">CodeKathai High-Contrast Reference</span>
          </div>
          <pre className="font-mono text-xs text-[#00ff66] bg-[#010602] p-4 rounded-xl border border-[#00ff66]/30 overflow-x-auto whitespace-pre leading-relaxed select-text font-bold">
            {codeSnippet}
          </pre>
        </div>

        {/* MINI CHALLENGE & SOLUTION */}
        {(challengeTitle || challengeDescription) && (
          <div className="bg-gradient-to-r from-ink-900 via-ink-950 to-emerald-950/60 p-4.5 rounded-2xl border border-amber-500/40 flex flex-col gap-2">
            <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              🚀 Practice Challenge & Solution (நடைமுறை பயிற்சி)
            </h3>
            {challengeTitle && <p className="text-xs text-white font-bold">{challengeTitle}</p>}
            {challengeDescription && <p className="text-xs text-amber-100 font-medium leading-relaxed">{challengeDescription}</p>}
          </div>
        )}

        {/* FOOTER STAMP */}
        <div className="flex items-center justify-between border-t border-emerald-500/30 pt-4 text-[11px] text-gray-300 font-mono">
          <span>CodeKathai Platform © 2026</span>
          <span className="text-emerald-300 font-extrabold">
            https://codekathai.vercel.app/
          </span>
        </div>
      </div>
    </div>
  );
}
