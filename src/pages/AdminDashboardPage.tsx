import { useState, useEffect, useMemo } from 'react';
import {
  Users,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  LogOut,
  RefreshCw,
  Award,
  BookOpen,
  Calendar,
  Flame,
  ShieldCheck,
  ShieldAlert,
  Code2,
  Terminal,
  Activity,
  Layers,
  X,
  Clock,
  Sprout,
  Crown,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import type { StudentAdminRecord, AdminAnalytics, UserRole, Level } from '@/types';
import { allLessons } from '@/data/levelLessons';

interface AdminDashboardPageProps {
  onNavigate: (page: any) => void;
}

export default function AdminDashboardPage({ onNavigate }: AdminDashboardPageProps) {
  const { profile, signOut } = useAuth();
  const [students, setStudents] = useState<StudentAdminRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | Level>('all');
  const [sortBy, setSortBy] = useState<'progress' | 'joined' | 'name'>('progress');

  // Selected Student for Detail Modal
  const [selectedStudent, setSelectedStudent] = useState<StudentAdminRecord | null>(null);

  // Lesson counts by level for progress calculation
  const beginnerTotal = useMemo(() => allLessons.filter((l) => l.level === 'beginner').length, []);
  const intermediateTotal = useMemo(() => allLessons.filter((l) => l.level === 'intermediate').length, []);
  const advancedTotal = useMemo(() => allLessons.filter((l) => l.level === 'advanced').length, []);
  const totalAppLessons = useMemo(() => allLessons.length, []);

  const fetchStudentData = async () => {
    setRefreshing(true);
    setError('');
    try {
      // Query REAL data from Supabase `user_profiles` table
      const { data, error: dbError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) {
        console.error('Error fetching student profiles from Supabase:', dbError);
        setError(`Supabase error: ${dbError.message}`);
        setLoading(false);
        setRefreshing(false);
        return;
      }

      if (data) {
        // Map database records into StudentAdminRecord with real progress calculations
        const records: StudentAdminRecord[] = data.map((row) => {
          const completedList: string[] = Array.isArray(row.completed_lessons)
            ? row.completed_lessons
            : typeof row.completed_lessons === 'string'
            ? JSON.parse(row.completed_lessons || '[]')
            : [];

          const solvedPracticeList: string[] = Array.isArray(row.solved_practice)
            ? row.solved_practice
            : [];

          const completedPatternsList: string[] = Array.isArray(row.completed_patterns)
            ? row.completed_patterns
            : [];

          const badgesList: string[] = Array.isArray(row.badges) ? row.badges : [];

          // Count completed per level
          const completedSet = new Set(completedList);
          const beginnerDone = allLessons
            .filter((l) => l.level === 'beginner')
            .filter((l) => completedSet.has(l.id)).length;

          const intermediateDone = allLessons
            .filter((l) => l.level === 'intermediate')
            .filter((l) => completedSet.has(l.id)).length;

          const advancedDone = allLessons
            .filter((l) => l.level === 'advanced')
            .filter((l) => completedSet.has(l.id)).length;

          const begProg = beginnerTotal > 0 ? Math.round((beginnerDone / beginnerTotal) * 100) : 0;
          const intProg = intermediateTotal > 0 ? Math.round((intermediateDone / intermediateTotal) * 100) : 0;
          const advProg = advancedTotal > 0 ? Math.round((advancedDone / advancedTotal) * 100) : 0;
          const overallProg = totalAppLessons > 0 ? Math.round((completedList.length / totalAppLessons) * 100) : 0;

          return {
            id: row.id,
            email: row.email || 'No email provided',
            name: row.full_name || row.email?.split('@')[0] || 'Learner',
            role: (row.role as UserRole) || 'student',
            currentLevel: (row.learning_level as Level) || 'beginner',
            xp: row.xp ?? 100,
            completedLessons: completedList,
            solvedPractice: solvedPracticeList,
            completedPatterns: completedPatternsList,
            playgroundRunsCount: row.playground_runs_count ?? 0,
            aiVisualsCount: row.ai_visuals_count ?? 0,
            badges: badgesList,
            createdAt: row.created_at || new Date().toISOString(),
            lastActiveAt: row.last_active_at || row.created_at || new Date().toISOString(),
            overallProgress: Math.min(100, overallProg),
            beginnerProgress: Math.min(100, begProg),
            intermediateProgress: Math.min(100, intProg),
            advancedProgress: Math.min(100, advProg),
          };
        });

        setStudents(records);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err?.message || 'Failed to load student profiles.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  // Automatic redirect if non-admin user lands here
  useEffect(() => {
    if (!profile || profile.role !== 'admin') {
      onNavigate('home');
    }
  }, [profile, onNavigate]);

  // Filter & Search Calculations
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        // Search by name or email
        const matchesSearch =
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.email.toLowerCase().includes(searchQuery.toLowerCase());

        // Level filter
        const matchesLevel = levelFilter === 'all' || s.currentLevel === levelFilter;

        return matchesSearch && matchesLevel;
      })
      .sort((a, b) => {
        if (sortBy === 'progress') return b.overallProgress - a.overallProgress;
        if (sortBy === 'joined') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [students, searchQuery, levelFilter, sortBy]);

  // Analytics Metrics Calculations
  const analytics: AdminAnalytics = useMemo(() => {
    const studentOnly = students.filter((s) => s.role === 'student');
    const now = new Date().getTime();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

    const activeCount = studentOnly.filter((s) => {
      const lastActive = new Date(s.lastActiveAt).getTime();
      return now - lastActive <= sevenDaysMs;
    }).length;

    const totalLessons = studentOnly.reduce((acc, s) => acc + s.completedLessons.length, 0);
    const totalPractice = studentOnly.reduce(
      (acc, s) => acc + s.solvedPractice.length + s.completedPatterns.length + s.playgroundRunsCount,
      0
    );

    return {
      totalStudents: studentOnly.length > 0 ? studentOnly.length : students.length,
      activeStudents: activeCount,
      totalLessonsCompleted: totalLessons,
      totalPracticeAttempts: totalPractice,
    };
  }, [students]);

  // STRICT ACCESS SECURITY CHECK: Only allow role === 'admin'
  if (!profile || profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100 dark:bg-ink-950 p-4 font-sans">
        <div className="max-w-md w-full rounded-3xl bg-white dark:bg-ink-900 border border-rose-200 dark:border-rose-900/60 p-8 text-center shadow-2xl space-y-4">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-white">
            Access Denied / அனுமதி இல்லை
          </h2>
          <p className="text-xs text-ink-600 dark:text-ink-300 font-tamil leading-relaxed">
            இந்த நிர்வாகி பக்கத்தை அணுக உங்களுக்கு அனுமதி இல்லை (Admin role required).
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => onNavigate('home')}
              className="btn-primary py-3 text-xs font-bold w-full bg-bamboo-600 text-white rounded-xl"
            >
              Go to Student Home →
            </button>
            <button
              onClick={() => signOut()}
              className="btn-ghost py-2.5 text-xs font-bold w-full text-rose-600 hover:bg-rose-50"
            >
              Sign Out & Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-ink-950 text-ink-900 dark:text-white font-sans py-8">
      <div className="container-page space-y-8">
        
        {/* ================= TOP DASHBOARD HEADER ================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-ink-950 p-6 sm:p-8 text-white shadow-2xl border border-purple-800/40">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-bold border border-purple-400/30 backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5 text-golden-400" /> Administrator Portal
              </span>
              <span className="text-xs text-purple-300 font-mono">Code Kathai v2.0</span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight">
              Code Kathai Admin Dashboard 🛡️
            </h1>
            <p className="font-tamil mt-1 text-xs sm:text-sm text-purple-200/90">
              மாணவர்களின் C Programming கற்றல் மற்றும் முன்னேற்ற நேரடித் தரவு (Real Supabase Analytics).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchStudentData}
              disabled={refreshing}
              className="btn-secondary px-4 py-2.5 text-xs font-bold flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20 rounded-xl transition-all"
              title="Refresh Real-time Supabase Data"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin text-golden-400' : ''}`} />
              Refresh Data
            </button>
            <button
              onClick={() => signOut()}
              className="btn-ghost px-4 py-2.5 text-xs font-bold flex items-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border-rose-400/30 rounded-xl transition-all"
            >
              <LogOut className="h-4 w-4" /> Admin Logout
            </button>
          </div>
        </div>

        {/* ================= METRIC ANALYTICS CARDS ================= */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Stat 1: Total Students */}
          <div className="card p-5 border border-purple-100 dark:border-purple-900/40 bg-white dark:bg-ink-900 hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Total Students
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-bold group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5" />
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-purple-950 dark:text-white">
              {analytics.totalStudents}
            </p>
            <p className="font-tamil text-[11px] text-ink-500 mt-1">
              பதிவு செய்யப்பட்ட மாணவர்கள் எண்ணிக்கை
            </p>
          </div>

          {/* Stat 2: Active Students */}
          <div className="card p-5 border border-emerald-100 dark:border-emerald-900/40 bg-white dark:bg-ink-900 hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Active Students (7d)
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold group-hover:scale-110 transition-transform">
                <Activity className="h-5 w-5" />
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {analytics.activeStudents}
            </p>
            <p className="font-tamil text-[11px] text-ink-500 mt-1">
              சமீபத்தில் பயின்ற மாணவர்கள்
            </p>
          </div>

          {/* Stat 3: Lessons Completed */}
          <div className="card p-5 border border-bamboo-100 dark:border-bamboo-900/40 bg-white dark:bg-ink-900 hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Lessons Completed
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-bamboo-100 text-bamboo-700 dark:bg-bamboo-950 dark:text-bamboo-300 font-bold group-hover:scale-110 transition-transform">
                <BookOpen className="h-5 w-5" />
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-bamboo-600 dark:text-bamboo-400">
              {analytics.totalLessonsCompleted}
            </p>
            <p className="font-tamil text-[11px] text-ink-500 mt-1">
              மொத்தம் முடிக்கப்பட்ட C பாடங்கள்
            </p>
          </div>

          {/* Stat 4: Practice & Challenge Attempts */}
          <div className="card p-5 border border-golden-100 dark:border-golden-900/40 bg-white dark:bg-ink-900 hover:shadow-xl transition-all group">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-500 dark:text-ink-400">
                Practice Attempts
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-golden-100 text-golden-700 dark:bg-golden-950 dark:text-golden-300 font-bold group-hover:scale-110 transition-transform">
                <Code2 className="h-5 w-5" />
              </span>
            </div>
            <p className="font-display text-3xl font-bold text-golden-600 dark:text-golden-400">
              {analytics.totalPracticeAttempts}
            </p>
            <p className="font-tamil text-[11px] text-ink-500 mt-1">
              நிரல் பயிற்சி மற்றும் Playground பயன்பாடுகள்
            </p>
          </div>

        </div>

        {/* ================= CONTROLS: SEARCH, FILTER & SORT BAR ================= */}
        <div className="card p-5 bg-white dark:bg-ink-900 border border-bamboo-100 dark:border-bamboo-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-ink-400" />
              <input
                type="text"
                placeholder="Search student by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-bamboo-200 bg-stone-50/50 py-2 pl-10 pr-4 text-xs font-semibold text-ink-900 focus:border-purple-600 focus:bg-white focus:outline-none dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-ink-400 hover:text-ink-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filters & Sorting */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              
              {/* Level Filter Dropdown */}
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <Filter className="h-4 w-4 text-purple-600" />
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value as any)}
                  className="rounded-xl border border-bamboo-200 bg-white py-2 px-3 text-xs font-semibold text-ink-900 focus:border-purple-600 focus:outline-none dark:border-bamboo-800 dark:bg-ink-950 dark:text-white cursor-pointer"
                >
                  <option value="all">All Levels ({students.length})</option>
                  <option value="beginner">🌱 Beginner</option>
                  <option value="intermediate">🚀 Intermediate</option>
                  <option value="advanced">🧠 Advanced</option>
                </select>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <ArrowUpDown className="h-4 w-4 text-bamboo-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="rounded-xl border border-bamboo-200 bg-white py-2 px-3 text-xs font-semibold text-ink-900 focus:border-purple-600 focus:outline-none dark:border-bamboo-800 dark:bg-ink-950 dark:text-white cursor-pointer"
                >
                  <option value="progress">Highest Progress %</option>
                  <option value="joined">Recently Joined</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

            </div>
          </div>
        </div>

        {/* ================= STUDENT PROGRESS TABLE ================= */}
        <div className="card overflow-hidden border border-bamboo-100 dark:border-bamboo-800 bg-white dark:bg-ink-900 shadow-xl">
          <div className="p-5 border-b border-bamboo-100 dark:border-bamboo-800 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-bamboo-950 dark:text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" /> Student Progress Directory
              <span className="text-xs font-semibold text-ink-500 font-mono">
                ({filteredStudents.length} Students)
              </span>
            </h3>
            {error && <span className="text-xs font-bold text-rose-500">{error}</span>}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs">
              <thead className="bg-stone-100 dark:bg-ink-950 text-ink-600 dark:text-ink-400 uppercase text-[10px] font-bold tracking-wider select-none">
                <tr>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Role & Level</th>
                  <th className="py-3.5 px-4">Overall Progress</th>
                  <th className="py-3.5 px-4 text-center">Level Breakdown (B / I / A)</th>
                  <th className="py-3.5 px-4 text-center">Completed</th>
                  <th className="py-3.5 px-4 text-center">Practice Solved</th>
                  <th className="py-3.5 px-4">Joined / Last Active</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-bamboo-100 dark:divide-bamboo-900/60 font-medium">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-ink-400">
                      <RefreshCw className="h-6 w-6 animate-spin mx-auto text-purple-600 mb-2" />
                      Loading real student data from Supabase...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-ink-500 font-tamil">
                      <p className="font-bold text-base text-ink-700 dark:text-white">மாணவர்கள் யாரும் இல்லை (No Students Found)</p>
                      <p className="text-xs mt-1">தேடல் வினவலை அல்லது வடிகட்டியை மாற்றவும்.</p>
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((st) => {
                    const levelBadge =
                      st.currentLevel === 'beginner' ? (
                        <span className="chip bg-bamboo-100 text-bamboo-800 dark:bg-bamboo-950 dark:text-bamboo-300">
                          <Sprout className="h-3 w-3" /> Beginner
                        </span>
                      ) : st.currentLevel === 'intermediate' ? (
                        <span className="chip bg-golden-100 text-golden-800 dark:bg-golden-950 dark:text-golden-300">
                          <Flame className="h-3 w-3" /> Intermediate
                        </span>
                      ) : (
                        <span className="chip bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                          <Crown className="h-3 w-3" /> Advanced
                        </span>
                      );

                    return (
                      <tr
                        key={st.id}
                        className="hover:bg-stone-50 dark:hover:bg-ink-800/50 transition-colors"
                      >
                        {/* Student Name & Email */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold text-sm shadow-sm">
                              {st.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-bold text-ink-950 dark:text-white leading-snug">
                                {st.name}
                              </p>
                              <p className="text-[11px] text-ink-500 dark:text-ink-400 font-mono">
                                {st.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Role & Level Badge */}
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            {st.role === 'admin' ? (
                              <span className="chip bg-purple-600 text-white font-extrabold">
                                🛡️ Admin
                              </span>
                            ) : (
                              levelBadge
                            )}
                          </div>
                        </td>

                        {/* Overall Progress Bar */}
                        <td className="py-4 px-4 min-w-[140px]">
                          <div className="space-y-1">
                            <div className="flex justify-between text-[11px] font-bold">
                              <span>{st.overallProgress}%</span>
                              <span className="text-ink-500">{st.completedLessons.length}/{totalAppLessons}</span>
                            </div>
                            <div className="h-2 w-full bg-slate-200 dark:bg-ink-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-bamboo-500 to-emerald-500 transition-all duration-300"
                                style={{ width: `${st.overallProgress}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Level Progress Breakdown */}
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold">
                            <span className="text-bamboo-600 dark:text-bamboo-400" title="Beginner Progress">
                              {st.beginnerProgress}%
                            </span>
                            <span className="text-ink-300">/</span>
                            <span className="text-golden-600 dark:text-golden-400" title="Intermediate Progress">
                              {st.intermediateProgress}%
                            </span>
                            <span className="text-ink-300">/</span>
                            <span className="text-purple-600 dark:text-purple-400" title="Advanced Progress">
                              {st.advancedProgress}%
                            </span>
                          </div>
                        </td>

                        {/* Completed Lessons Count */}
                        <td className="py-4 px-4 text-center font-bold text-bamboo-700 dark:text-bamboo-300">
                          {st.completedLessons.length}
                        </td>

                        {/* Practice Solved Count */}
                        <td className="py-4 px-4 text-center font-bold text-golden-600 dark:text-golden-400">
                          {st.solvedPractice.length + st.completedPatterns.length}
                        </td>

                        {/* Joined Date & Last Active */}
                        <td className="py-4 px-4 text-[11px] text-ink-500 font-mono">
                          <p title="Joined Date">
                            📅 {new Date(st.createdAt).toLocaleDateString()}
                          </p>
                          <p title="Last Active" className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                            ⚡ {new Date(st.lastActiveAt).toLocaleDateString()}
                          </p>
                        </td>

                        {/* Action: View Details Button */}
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => setSelectedStudent(st)}
                            className="btn-ghost py-1.5 px-3 text-xs font-bold text-purple-700 hover:bg-purple-100 dark:text-purple-300 dark:hover:bg-purple-950/60 rounded-xl inline-flex items-center gap-1 transition-all"
                          >
                            <Eye className="h-3.5 w-3.5" /> Details
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= STUDENT DETAILS MODAL ================= */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fade-in">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-ink-900 border border-bamboo-800 shadow-2xl p-6 space-y-6">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-bamboo-100 dark:border-bamboo-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-purple-600 text-white font-bold text-xl shadow-md">
                    {selectedStudent.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-ink-900 dark:text-white">
                      {selectedStudent.name}
                    </h3>
                    <p className="text-xs text-ink-500 font-mono">{selectedStudent.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-stone-100 dark:bg-ink-800 text-ink-600 dark:text-ink-300 hover:bg-stone-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Student Metadata Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 dark:bg-ink-950 p-4 rounded-2xl border border-bamboo-100 dark:border-bamboo-900 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink-500 block">Total XP</span>
                  <span className="font-display font-bold text-golden-600 text-base">{selectedStudent.xp} XP</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink-500 block">Current Level</span>
                  <span className="font-bold text-bamboo-700 dark:text-bamboo-300 capitalize">{selectedStudent.currentLevel}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink-500 block">Account Joined</span>
                  <span className="font-mono">{new Date(selectedStudent.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-ink-500 block">Last Active</span>
                  <span className="font-mono text-emerald-600">{new Date(selectedStudent.lastActiveAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Level Progress Gauges Breakdown */}
              <div className="space-y-3">
                <h4 className="font-display text-sm font-bold text-bamboo-950 dark:text-white flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-purple-600" /> Level Breakdown & Mastery
                </h4>

                <div className="grid gap-3 sm:grid-cols-3">
                  {/* Beginner */}
                  <div className="rounded-2xl border border-bamboo-200 bg-bamboo-50/40 p-4 dark:border-bamboo-800 dark:bg-bamboo-950/30 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-bamboo-700">🌱 Beginner Level</span>
                    <p className="font-display text-xl font-bold text-bamboo-950 dark:text-white">{selectedStudent.beginnerProgress}%</p>
                    <div className="h-1.5 w-full bg-bamboo-200 dark:bg-bamboo-900 rounded-full overflow-hidden">
                      <div className="h-full bg-bamboo-600" style={{ width: `${selectedStudent.beginnerProgress}%` }} />
                    </div>
                  </div>

                  {/* Intermediate */}
                  <div className="rounded-2xl border border-golden-200 bg-golden-50/40 p-4 dark:border-golden-800 dark:bg-golden-950/30 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-golden-700">🚀 Intermediate Level</span>
                    <p className="font-display text-xl font-bold text-bamboo-950 dark:text-white">{selectedStudent.intermediateProgress}%</p>
                    <div className="h-1.5 w-full bg-golden-200 dark:bg-golden-900 rounded-full overflow-hidden">
                      <div className="h-full bg-golden-500" style={{ width: `${selectedStudent.intermediateProgress}%` }} />
                    </div>
                  </div>

                  {/* Advanced */}
                  <div className="rounded-2xl border border-purple-200 bg-purple-50/40 p-4 dark:border-purple-800 dark:bg-purple-950/30 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-purple-700">🧠 Advanced Level</span>
                    <p className="font-display text-xl font-bold text-bamboo-950 dark:text-white">{selectedStudent.advancedProgress}%</p>
                    <div className="h-1.5 w-full bg-purple-200 dark:bg-purple-900 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600" style={{ width: `${selectedStudent.advancedProgress}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity & Completed Lessons */}
              <div className="space-y-3">
                <h4 className="font-display text-sm font-bold text-bamboo-950 dark:text-white flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Completed Lessons ({selectedStudent.completedLessons.length})
                </h4>

                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 rounded-2xl bg-stone-50 dark:bg-ink-950 border border-bamboo-100 dark:border-bamboo-900">
                  {selectedStudent.completedLessons.length === 0 ? (
                    <span className="text-xs text-ink-400 italic">No lessons completed yet.</span>
                  ) : (
                    selectedStudent.completedLessons.map((lId) => (
                      <span key={lId} className="chip bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono text-[10px]">
                        ✓ {lId}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Secondary Practice Statistics */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs font-bold">
                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-ink-950 border border-bamboo-100">
                  <span className="text-ink-500 text-[10px] block">Solved Practice</span>
                  <span className="text-emerald-600 text-sm font-display">{selectedStudent.solvedPractice.length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-ink-950 border border-bamboo-100">
                  <span className="text-ink-500 text-[10px] block">Completed Patterns</span>
                  <span className="text-purple-600 text-sm font-display">{selectedStudent.completedPatterns.length}</span>
                </div>
                <div className="p-3 rounded-2xl bg-stone-100 dark:bg-ink-950 border border-bamboo-100">
                  <span className="text-ink-500 text-[10px] block">Playground Code Runs</span>
                  <span className="text-golden-600 text-sm font-display">{selectedStudent.playgroundRunsCount}</span>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-2">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="btn-primary py-2.5 text-xs font-bold w-full bg-stone-200 dark:bg-ink-800 text-ink-900 dark:text-white hover:bg-stone-300"
                >
                  Close Student Details
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
