import { useState } from 'react';
import {
  Sparkles,
  Search,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Play,
  Copy,
  Check,
  Download,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Code2,
  Terminal,
  HelpCircle,
  Lightbulb,
  ExternalLink,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { VISUAL_TOPICS, type VisualTopic } from '@/data/visualLearningData';
import { compileAndRunJavaProgram } from '@/lib/javaSimulator';

interface VisualLearningPageProps {
  onNavigate: (page: Page) => void;
}

export default function VisualLearningPage({ onNavigate }: VisualLearningPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active modal lightbox state
  const [lightboxTopic, setLightboxTopic] = useState<VisualTopic | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Active running state for embedded code execution
  const [executingId, setExecutingId] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<Record<string, { text: string; error: boolean }>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTabs, setActiveTabs] = useState<Record<string, 'visual' | 'code' | 'syntax'>>({});

  // Filter topics
  const filteredTopics = VISUAL_TOPICS.filter((topic) => {
    const matchesCategory =
      selectedCategory === 'all' || topic.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      topic.title.toLowerCase().includes(query) ||
      topic.tamilTitle.toLowerCase().includes(query) ||
      topic.concept.toLowerCase().includes(query) ||
      topic.metaphor.toLowerCase().includes(query) ||
      topic.tamilMetaphor.toLowerCase().includes(query) ||
      topic.whenToUse.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleOpenLightbox = (topic: VisualTopic) => {
    setLightboxTopic(topic);
    setZoomLevel(1);
  };

  const handleCloseLightbox = () => {
    setLightboxTopic(null);
    setZoomLevel(1);
  };

  const handleNextLightbox = () => {
    if (!lightboxTopic) return;
    const currentIndex = VISUAL_TOPICS.findIndex((t) => t.id === lightboxTopic.id);
    const nextIndex = (currentIndex + 1) % VISUAL_TOPICS.length;
    setLightboxTopic(VISUAL_TOPICS[nextIndex]);
    setZoomLevel(1);
  };

  const handlePrevLightbox = () => {
    if (!lightboxTopic) return;
    const currentIndex = VISUAL_TOPICS.findIndex((t) => t.id === lightboxTopic.id);
    const prevIndex = (currentIndex - 1 + VISUAL_TOPICS.length) % VISUAL_TOPICS.length;
    setLightboxTopic(VISUAL_TOPICS[prevIndex]);
    setZoomLevel(1);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunCode = async (topic: VisualTopic) => {
    setExecutingId(topic.id);
    try {
      const result = await compileAndRunJavaProgram(topic.codeSnippet);
      setOutputs((prev) => ({
        ...prev,
        [topic.id]: {
          text: result.output || result.error || 'Done.',
          error: !result.passed,
        },
      }));
    } catch {
      setOutputs((prev) => ({
        ...prev,
        [topic.id]: {
          text: 'Execution failed. Please try again.',
          error: true,
        },
      }));
    } finally {
      setExecutingId(null);
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 bg-bamboo-50/30 dark:bg-ink-950">
      <div className="container-page space-y-10">
        {/* Hero Header */}
        <section className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bamboo-100 text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300 font-semibold text-xs border border-bamboo-200 dark:border-bamboo-800 shadow-xs">
            <Sparkles className="h-4 w-4 text-golden-500 animate-pulse" />
            <span>Visual Concept Infographics · நிஜ வாழ்க்கை விளக்கப்படங்கள்</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-bamboo-950 dark:text-white tracking-tight">
            Visual Learning Hub
          </h1>

          <p className="font-tamil text-base sm:text-lg text-ink-700 dark:text-ink-300 max-w-2xl mx-auto leading-relaxed">
            கடினமான Java நிரலாக்க கருத்துகளை (Loops, Switch Case, OOP) வண்ணமயமான நிஜ வாழ்க்கை கிராமிய உவமைகள் &amp; இன்ஃபோகிராபிக்ஸ் வழியே சுலபமாகப் புரிந்து கொள்ளுங்கள்!
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-ink-900 border border-bamboo-100 dark:border-bamboo-800 text-xs font-semibold text-ink-600 dark:text-ink-300 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              5 Real-Life Posters
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-ink-900 border border-bamboo-100 dark:border-bamboo-800 text-xs font-semibold text-ink-600 dark:text-ink-300 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-golden-500"></span>
              Bilingual (Tamil + English)
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-ink-900 border border-bamboo-100 dark:border-bamboo-800 text-xs font-semibold text-ink-600 dark:text-ink-300 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              Live Java Code Runner
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-ink-900 border border-bamboo-100 dark:border-bamboo-800 shadow-sm">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Topics (அனைத்தும்)' },
              { id: 'loops', label: '🔁 Loops (சுழல்கள்)' },
              { id: 'control-flow', label: '🔀 Control Flow (தேர்வு)' },
              { id: 'oop', label: '🐄 OOP Class & Object' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-bamboo-600 text-white shadow-soft'
                    : 'text-ink-600 hover:bg-bamboo-50 dark:text-ink-400 dark:hover:bg-ink-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-ink-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts, metaphors..."
              className="w-full rounded-xl border border-bamboo-200 bg-ink-50/50 pl-9 pr-4 py-2 text-xs text-ink-900 focus:border-bamboo-500 focus:bg-white focus:outline-none dark:border-bamboo-700 dark:bg-ink-950 dark:text-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-xs text-ink-400 hover:text-ink-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-ink-900 rounded-3xl border border-bamboo-100 dark:border-bamboo-800">
            <BookOpen className="h-12 w-12 text-ink-400 mx-auto mb-3" />
            <p className="font-display text-lg font-bold text-ink-800 dark:text-white">
              No matching visual topics found
            </p>
            <p className="text-xs text-ink-500 mt-1">
              Try searching for "loop", "switch", "cow", or reset your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 btn-secondary text-xs px-4 py-2"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTopics.map((topic) => {
            const currentTab = activeTabs[topic.id] || 'visual';
            const output = outputs[topic.id];
            const isExecuting = executingId === topic.id;

            return (
              <div
                key={topic.id}
                className="group flex flex-col rounded-3xl border border-bamboo-200/80 bg-white dark:border-bamboo-800 dark:bg-ink-900 overflow-hidden shadow-soft hover:shadow-xl transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-5 pb-4 border-b border-bamboo-100 dark:border-bamboo-800/80 bg-gradient-to-r from-bamboo-50/50 to-transparent dark:from-ink-950/50">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${topic.badgeColor}`}
                    >
                      {topic.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-ink-500 uppercase tracking-wider">
                      {topic.categoryLabel}
                    </span>
                  </div>

                  <h2 className="font-display text-xl font-bold text-bamboo-950 dark:text-white group-hover:text-bamboo-700 dark:group-hover:text-bamboo-300 transition-colors">
                    {topic.title}
                  </h2>
                  <p className="font-tamil text-xs font-semibold text-bamboo-700 dark:text-bamboo-400 mt-0.5">
                    {topic.tamilTitle}
                  </p>
                </div>

                {/* Tab Switcher: Poster / Story & Syntax / Runnable Code */}
                <div className="flex items-center border-b border-bamboo-100 dark:border-bamboo-800 bg-ink-50/60 dark:bg-ink-950/60 p-1">
                  <button
                    onClick={() =>
                      setActiveTabs((prev) => ({ ...prev, [topic.id]: 'visual' }))
                    }
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      currentTab === 'visual'
                        ? 'bg-white text-bamboo-800 dark:bg-ink-800 dark:text-white shadow-xs'
                        : 'text-ink-600 hover:text-ink-900 dark:text-ink-400'
                    }`}
                  >
                    <span>🖼️ Poster</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveTabs((prev) => ({ ...prev, [topic.id]: 'syntax' }))
                    }
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      currentTab === 'syntax'
                        ? 'bg-white text-bamboo-800 dark:bg-ink-800 dark:text-white shadow-xs'
                        : 'text-ink-600 hover:text-ink-900 dark:text-ink-400'
                    }`}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Story &amp; Syntax</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveTabs((prev) => ({ ...prev, [topic.id]: 'code' }))
                    }
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      currentTab === 'code'
                        ? 'bg-white text-bamboo-800 dark:bg-ink-800 dark:text-white shadow-xs'
                        : 'text-ink-600 hover:text-ink-900 dark:text-ink-400'
                    }`}
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    <span>Live Code</span>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-5">
                  {/* 1. VISUAL POSTER VIEW */}
                  {currentTab === 'visual' && (
                    <div className="space-y-4">
                      {/* Image Frame with Click to Zoom */}
                      <div
                        onClick={() => handleOpenLightbox(topic)}
                        className="relative rounded-2xl overflow-hidden border border-bamboo-200/70 dark:border-bamboo-700/60 bg-white dark:bg-ink-950 cursor-zoom-in group/img shadow-sm"
                      >
                        <img
                          src={topic.imageUrl}
                          alt={topic.imageAlt}
                          className="w-full h-auto object-contain max-h-[480px] group-hover/img:scale-[1.01] transition-transform duration-300"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-4 text-white">
                          <span className="text-xs font-bold flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full">
                            <Maximize2 className="h-3.5 w-3.5" /> Click to Enlarge Poster
                          </span>
                          <span className="text-[11px] text-white/90">High Resolution</span>
                        </div>
                      </div>

                      {/* Quick Metaphor Banner */}
                      <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60">
                        <div className="flex items-start gap-2.5">
                          <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="text-xs space-y-1">
                            <p className="font-bold text-amber-950 dark:text-amber-200">
                              {topic.storyTitle}
                            </p>
                            <p className="font-tamil text-amber-900/90 dark:text-amber-300">
                              {topic.tamilMetaphor}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. STORY & SYNTAX BREAKDOWN */}
                  {currentTab === 'syntax' && (
                    <div className="space-y-4">
                      {/* Full Story Metaphor */}
                      <div className="p-4 rounded-2xl bg-bamboo-50/60 dark:bg-ink-950 border border-bamboo-100 dark:border-bamboo-800 space-y-2">
                        <h4 className="font-display text-sm font-bold text-bamboo-950 dark:text-white flex items-center gap-1.5">
                          🌾 Real Life Analogy / கிராமிய உவமை
                        </h4>
                        <p className="text-xs text-ink-700 dark:text-ink-300 leading-relaxed">
                          {topic.metaphor}
                        </p>
                        <p className="font-tamil text-xs text-bamboo-800 dark:text-bamboo-300 leading-relaxed font-medium">
                          {topic.tamilMetaphor}
                        </p>
                      </div>

                      {/* Syntax Breakdown Cards */}
                      <div className="space-y-2">
                        <h4 className="font-display text-xs font-bold uppercase tracking-wider text-ink-500">
                          Syntax Mapping / குறியீடு விளக்கம்
                        </h4>
                        <div className="grid gap-2">
                          {topic.syntaxBreakdown.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start justify-between gap-3 p-3 rounded-xl bg-ink-50/80 dark:bg-ink-950/80 border border-bamboo-100/80 dark:border-bamboo-800/80 text-xs"
                            >
                              <div>
                                <p className="font-bold text-bamboo-900 dark:text-bamboo-200">
                                  {item.label}
                                </p>
                                <p className="font-tamil text-[11px] text-ink-500 dark:text-ink-400">
                                  {item.tamilLabel}
                                </p>
                                <p className="text-[11px] text-ink-600 dark:text-ink-300 mt-1">
                                  {item.explanation}
                                </p>
                              </div>
                              <code className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-ink-900 px-2 py-1 rounded-md border border-bamboo-200 dark:border-bamboo-700 shrink-0">
                                {item.code}
                              </code>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* When to Use Box */}
                      <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <div className="text-xs">
                            <p className="font-bold text-emerald-950 dark:text-emerald-200">
                              When to use? / எப்போது பயன்படுத்த வேண்டும்?
                            </p>
                            <p className="text-emerald-900 dark:text-emerald-300 mt-0.5">
                              {topic.whenToUse}
                            </p>
                            <p className="font-tamil text-emerald-800 dark:text-emerald-400 mt-0.5 text-[11px]">
                              {topic.tamilWhenToUse}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 3. RUNNABLE JAVA CODE VIEW */}
                  {currentTab === 'code' && (
                    <div className="space-y-3">
                      {/* Code Block */}
                      <div className="relative rounded-2xl overflow-hidden border border-ink-800 bg-ink-950 text-white font-mono text-xs shadow-inner">
                        <div className="flex items-center justify-between px-4 py-2 bg-ink-900/90 border-b border-ink-800">
                          <span className="text-[11px] font-semibold text-ink-400 flex items-center gap-1.5">
                            <Code2 className="h-3.5 w-3.5 text-golden-400" /> Main.java
                          </span>
                          <button
                            onClick={() => handleCopy(topic.id, topic.codeSnippet)}
                            className="flex items-center gap-1 text-[11px] text-ink-300 hover:text-white transition-colors cursor-pointer"
                          >
                            {copiedId === topic.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="h-3.5 w-3.5" /> Copy Code
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed text-emerald-300 selection:bg-emerald-900">
                          <code>{topic.codeSnippet}</code>
                        </pre>
                      </div>

                      {/* Code Controls */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          onClick={() => handleRunCode(topic)}
                          disabled={isExecuting}
                          className="btn-primary text-xs font-bold py-2 px-4 flex items-center gap-1.5 shadow-soft hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                          {isExecuting ? (
                            <>
                              <RotateCcw className="h-3.5 w-3.5 animate-spin" /> Running Java...
                            </>
                          ) : (
                            <>
                              <Play className="h-3.5 w-3.5 fill-current" /> Run Java Code
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onNavigate('playground')}
                          className="btn-ghost text-xs text-bamboo-700 dark:text-bamboo-300 flex items-center gap-1 hover:bg-bamboo-100 dark:hover:bg-ink-800 py-1.5 px-3"
                          title="Open Full Code Playground"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Open Playground
                        </button>
                      </div>

                      {/* Live Output Box */}
                      {output && (
                        <div
                          className={`rounded-2xl p-3.5 border text-xs font-mono transition-all ${
                            output.error
                              ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-900 text-red-700 dark:text-red-300'
                              : 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-ink-900 dark:text-ink-100'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider mb-1.5 text-ink-500">
                            <Terminal className="h-3.5 w-3.5" /> Console Output:
                          </div>
                          <pre className="whitespace-pre-wrap leading-relaxed font-semibold">
                            {output.text}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 pt-3 border-t border-bamboo-100 dark:border-bamboo-800 bg-white dark:bg-ink-900 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenLightbox(topic)}
                    className="flex items-center gap-1.5 text-xs font-bold text-bamboo-700 dark:text-bamboo-300 hover:text-bamboo-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5" /> Enlarge Poster
                  </button>

                  <a
                    href={topic.imageUrl}
                    download={`${topic.id}.jpg`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-ink-800 dark:text-ink-400 dark:hover:text-ink-200 transition-colors"
                    title="Download Poster Image"
                  >
                    <Download className="h-3.5 w-3.5" /> Save Poster
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout: Ready to practice in playground or quiz? */}
        <section className="rounded-3xl bg-gradient-to-r from-bamboo-700 to-emerald-800 p-8 text-white text-center shadow-xl space-y-4">
          <h3 className="font-display text-2xl font-bold">
            Ready to Practice What You Saw?
          </h3>
          <p className="font-tamil text-sm text-bamboo-100 max-w-xl mx-auto">
            விஷுவல் கருத்துகளைப் பார்த்த கையோடு C மற்றும் Java Code Editor-ல் உங்கள் சொந்த நிரல்களை எழுதி இயக்கிப் பாருங்கள்!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('playground')}
              className="btn-primary bg-golden-500 text-ink-950 font-bold px-6 py-2.5 hover:bg-golden-400 hover:scale-105 transition-all shadow-md flex items-center gap-2"
            >
              <Code2 className="h-4 w-4" /> Open Playground
            </button>
            <button
              onClick={() => onNavigate('dashboard')}
              className="btn-secondary bg-white/10 text-white font-bold px-6 py-2.5 border-white/20 hover:bg-white/20 hover:scale-105 transition-all"
            >
              Back to Courses
            </button>
          </div>
        </section>
      </div>

      {/* LIGHTBOX MODAL */}
      {lightboxTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-6 overflow-hidden animate-fade-in">
          <div className="relative w-full max-w-6xl max-h-full flex flex-col items-center justify-center">
            {/* Top Toolbar */}
            <div className="w-full flex items-center justify-between pb-3 text-white">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold">
                  {lightboxTopic.title}
                </h3>
                <p className="font-tamil text-xs text-white/80">
                  {lightboxTopic.tamilStoryTitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-1 rounded-xl border border-white/15">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                    className="p-1 text-white hover:text-golden-400 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </button>
                  <span className="text-xs font-mono px-1">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                    className="p-1 text-white hover:text-golden-400 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(1)}
                    className="p-1 text-white hover:text-golden-400 transition-colors ml-1 text-xs font-bold"
                    title="Reset Zoom"
                  >
                    1x
                  </button>
                </div>

                <a
                  href={lightboxTopic.imageUrl}
                  download={`${lightboxTopic.id}.jpg`}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all"
                  title="Download Poster"
                >
                  <Download className="h-4 w-4" />
                </a>

                <button
                  onClick={handleCloseLightbox}
                  className="p-2 rounded-xl bg-white/10 hover:bg-red-600 text-white transition-all cursor-pointer"
                  title="Close (Esc)"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Poster Display Container with Zoom */}
            <div className="relative w-full max-h-[82vh] overflow-auto rounded-2xl bg-ink-950 flex items-center justify-center p-2 sm:p-4 border border-white/10 shadow-2xl">
              <img
                src={lightboxTopic.imageUrl}
                alt={lightboxTopic.imageAlt}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
                className="max-h-[78vh] w-auto object-contain rounded-lg transition-transform duration-200"
              />
            </div>

            {/* Bottom Navigator Buttons */}
            <div className="w-full flex items-center justify-between pt-3 text-white text-xs">
              <button
                onClick={handlePrevLightbox}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-semibold cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" /> Previous Poster
              </button>

              <span className="font-semibold text-white/70">
                {VISUAL_TOPICS.findIndex((t) => t.id === lightboxTopic.id) + 1} /{' '}
                {VISUAL_TOPICS.length}
              </span>

              <button
                onClick={handleNextLightbox}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all font-semibold cursor-pointer"
              >
                Next Poster <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
