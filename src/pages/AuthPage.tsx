import { useState, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Terminal,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  resetPasswordForEmail,
} from '@/lib/authService';

type AuthMode = 'login' | 'signup' | 'forgot';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createProfile } = useAuth();

  // Password Strength Calculation (for Signup mode)
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: 'bg-slate-200' };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 10) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 1) return { score: 25, label: 'Weak', color: 'bg-red-500' };
    if (score === 2) return { score: 50, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3) return { score: 75, label: 'Strong', color: 'bg-emerald-500' };
    return { score: 100, label: 'Very Strong', color: 'bg-bamboo-600' };
  }, [password]);

  // Strict @gmail.com Validation
  const validateEmail = (rawEmail: string): boolean => {
    const clean = rawEmail.trim().toLowerCase();
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(clean);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError('');
    setSuccessMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();

    // 1. Common Email Validation
    if (!cleanEmail) {
      setError('தயவுசெய்து உங்கள் @gmail.com மின்னஞ்சலை உள்ளிடவும் (Please enter your Gmail address)');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError('மின்னஞ்சல் @gmail.com வடிவில் மட்டுமே இருக்க வேண்டும் (Must be a valid @gmail.com address, e.g. name@gmail.com)');
      return;
    }

    // 2. Forgot Password Handler
    if (mode === 'forgot') {
      setIsSubmitting(true);
      try {
        const res = await resetPasswordForEmail(cleanEmail);
        setSuccessMsg(res.message || `Password reset link sent to ${cleanEmail}. Please check your Gmail inbox.`);
      } catch (err: any) {
        setError('Failed to send reset link. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // 3. Signup Validation
    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('தயவுசெய்து உங்கள் முழு பெயரை உள்ளிடவும் (Please enter your full name)');
        return;
      }
      if (!password) {
        setError('தயவுசெய்து கடவுச்சொல்லை உள்ளிடவும் (Please enter a password)');
        return;
      }
      if (password.length < 6) {
        setError('கடவுச்சொல் குறைந்தபட்சம் 6 எழுத்துகள் இருக்க வேண்டும் (Password must be at least 6 characters)');
        return;
      }
      if (password !== confirmPassword) {
        setError('கடவுச்சொற்கள் பொருந்தவில்லை (Passwords do not match)');
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await signUpWithEmailPassword(fullName, cleanEmail, password);
        if (res.success && res.profile) {
          await createProfile(res.profile.name, res.profile.email);
        } else {
          setError(res.error || 'Signup failed. Please try again.');
        }
      } catch (err: any) {
        setError(err?.message || 'An error occurred during account creation.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // 4. Login Handler
    if (mode === 'login') {
      if (!password) {
        setError('தயவுசெய்து கடவுச்சொல்லை உள்ளிடவும் (Please enter your password)');
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await signInWithEmailPassword(cleanEmail, password);
        if (res.success && res.profile) {
          await createProfile(res.profile.name, res.profile.email);
        } else {
          setError(res.error || 'Login failed. Please check your credentials.');
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to sign in.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-stone-100 p-3 sm:p-6 dark:bg-ink-950 font-sans relative">
      
      {/* ================= MAIN TWO-COLUMN STORY TERMINAL CARD ================= */}
      <div className="flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-bamboo-200/80 bg-white shadow-2xl dark:border-bamboo-900/60 dark:bg-ink-900 lg:flex-row min-h-[620px]">
        
        {/* ================= LEFT SECTION: STORY TERMINAL VISUAL ================= */}
        <div className="relative flex flex-1 flex-col justify-between bg-gradient-to-br from-ink-950 via-bamboo-950 to-emerald-950 p-6 sm:p-10 text-white overflow-hidden border-b lg:border-b-0 lg:border-r border-bamboo-800/50">
          
          {/* Subtle Floating Code Symbols Backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
            <span className="absolute top-10 left-8 font-mono text-4xl text-bamboo-400 animate-pulse">{`{ }`}</span>
            <span className="absolute top-1/4 right-12 font-mono text-3xl text-emerald-300 animate-bounce">{`</>`}</span>
            <span className="absolute bottom-1/3 left-12 font-mono text-sm text-golden-300 font-bold">while(true)</span>
            <span className="absolute bottom-12 right-16 font-mono text-base text-cyan-300 font-bold">printf("Hello");</span>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-bamboo-600/10 blur-3xl" />
          </div>

          {/* Top Brand Tag */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-bamboo-600 text-white shadow-soft">
                <BookOpen className="h-5 w-5" strokeWidth={2.4} />
              </span>
              <div>
                <span className="font-display text-lg font-bold tracking-tight text-white block leading-none">
                  Code Kathai
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-bamboo-400">
                  கோட் கதை
                </span>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-bamboo-200 border border-white/10 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-golden-400" /> Story Terminal Mode
            </span>
          </div>

          {/* Core Visual & Headlines */}
          <div className="relative z-10 my-8 space-y-6">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Where Code <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-bamboo-300 via-emerald-300 to-golden-300">
                  Becomes a Story.
                </span>
              </h1>
              <p className="font-tamil mt-3 text-xs sm:text-sm text-bamboo-100/90 leading-relaxed max-w-md">
                Learn programming concepts through simple stories, conversations and interactive practice.
              </p>
            </div>

            {/* Modern Animated Story Terminal Window */}
            <div className="rounded-2xl border border-bamboo-700/60 bg-black/60 backdrop-blur-md p-4 shadow-xl font-mono text-xs sm:text-sm space-y-2">
              {/* Window Controls */}
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-[10px] text-white/50 font-sans uppercase font-bold tracking-wider flex items-center gap-1">
                  <Terminal className="h-3 w-3 text-bamboo-400" /> story_terminal.c
                </span>
              </div>

              {/* Terminal Code Snippet with Blinking Cursor */}
              <div className="text-emerald-300 space-y-1">
                <p className="text-purple-300">#include &lt;stdio.h&gt;</p>
                <p className="text-amber-300">int main() &#123;</p>
                <p className="pl-4 text-emerald-200">
                  <span className="text-cyan-300 font-bold">Story</span> kathai = init_tamil_story();
                </p>
                <p className="pl-4 text-emerald-200">
                  <span className="text-purple-300 font-bold">while</span>(true) &#123;
                </p>
                <p className="pl-8 text-amber-200">
                  printf(<span className="text-emerald-300 font-semibold">"Where Code Becomes a Story...\n"</span>);
                </p>
                <p className="pl-8 text-emerald-200">learn_concept(kathai);</p>
                <p className="pl-4 text-emerald-200">&#125;</p>
                <p className="pl-4 text-cyan-300">
                  return <span className="text-orange-300">0</span>;
                </p>
                <p className="text-amber-300">&#125;</p>
              </div>

              {/* Blinking Cursor Indicator */}
              <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-white/70 text-[11px]">
                <span className="text-bamboo-400 font-bold">❯</span>
                <span className="text-white/90">Executing Tamil storytelling engine</span>
                <span className="w-2 h-4 bg-bamboo-400 inline-block animate-pulse" />
              </div>
            </div>
          </div>

          {/* Bottom Kavi & Code Buddy Highlight */}
          <div className="relative z-10 flex items-center justify-between rounded-2xl bg-white/10 p-3.5 backdrop-blur-sm border border-white/10 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-xl bg-bamboo-500 text-white font-bold text-xs">
                க
              </span>
              <div>
                <p className="font-display font-semibold text-white">Kavi & Code Buddy</p>
                <p className="font-tamil text-[10px] text-bamboo-200">தமிழ் கதைகள் + C Compiler</p>
              </div>
            </div>
            <span className="chip bg-golden-400/20 text-golden-300 font-bold text-[10px] border border-golden-400/30">
              Premium EdTech
            </span>
          </div>
        </div>

        {/* ================= RIGHT SECTION: AUTHENTICATION PANEL ================= */}
        <div className="flex flex-1 flex-col justify-center p-6 sm:p-10 bg-white dark:bg-ink-900">
          <div className="mx-auto w-full max-w-sm space-y-6">
            
            {/* Header Titles */}
            <div>
              <div className="flex items-center gap-2 text-bamboo-600 dark:text-bamboo-400 mb-1">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {mode === 'login' ? 'Welcome Back 👋' : mode === 'signup' ? 'Start Your Story 🚀' : 'Reset Password 🔑'}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-bamboo-950 dark:text-white">
                {mode === 'login' && 'Continue your coding journey.'}
                {mode === 'signup' && 'Create your account'}
                {mode === 'forgot' && 'Reset your password'}
              </h2>

              <p className="font-tamil text-xs text-ink-500 dark:text-ink-400 mt-1">
                {mode === 'login' && 'உங்கள் தமிழ் C Programming கற்றல் கணக்கிற்கு நுழையுங்கள்.'}
                {mode === 'signup' && 'கவி மற்றும் Code Buddy உடன் தமிழ் கதைகள் மூலம் பயிலுங்கள்.'}
                {mode === 'forgot' && 'உங்கள் @gmail.com முகவரியை உள்ளிட்டு reset link பெறுங்கள்.'}
              </p>
            </div>

            {/* Error & Success Alert Banners */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-rose-50 p-3.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800 animate-shake">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {successMsg && (
              <div className="flex items-start gap-2.5 rounded-2xl bg-emerald-50 p-3.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name Field (Signup Mode only) */}
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                    Full Name / முழு பெயர் *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 h-4 w-4 text-ink-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vishal or Kavi"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setError('');
                      }}
                      className="w-full rounded-2xl border border-bamboo-200 bg-stone-50/50 py-2.5 pl-10 pr-4 text-sm font-semibold text-bamboo-950 focus:border-bamboo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bamboo-500/20 dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Email Address Field */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                  Email Address (*@gmail.com) *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-ink-400" />
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full rounded-2xl border border-bamboo-200 bg-stone-50/50 py-2.5 pl-10 pr-4 text-sm font-semibold text-bamboo-950 focus:border-bamboo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bamboo-500/20 dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
                  />
                </div>
              </div>

              {/* Password Field (Login & Signup Mode) */}
              {mode !== 'forgot' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                      Password / கடவுச்சொல் *
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        className="text-xs font-semibold text-bamboo-600 hover:underline dark:text-bamboo-400"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-ink-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                      }}
                      className="w-full rounded-2xl border border-bamboo-200 bg-stone-50/50 py-2.5 pl-10 pr-10 text-sm font-semibold text-bamboo-950 focus:border-bamboo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bamboo-500/20 dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3 text-ink-400 hover:text-ink-600"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter (Signup mode) */}
                  {mode === 'signup' && password && (
                    <div className="pt-1.5 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-ink-500">Password Strength:</span>
                        <span className="text-bamboo-700 dark:text-bamboo-300">{passwordStrength.label}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 dark:bg-ink-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: `${passwordStrength.score}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Confirm Password Field (Signup Mode) */}
              {mode === 'signup' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-ink-700 dark:text-ink-300 uppercase tracking-wider">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 h-4 w-4 text-ink-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError('');
                      }}
                      className="w-full rounded-2xl border border-bamboo-200 bg-stone-50/50 py-2.5 pl-10 pr-10 text-sm font-semibold text-bamboo-950 focus:border-bamboo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bamboo-500/20 dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3 text-ink-400 hover:text-ink-600"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-bamboo-600 via-bamboo-700 to-emerald-700 hover:from-bamboo-700 hover:to-emerald-800 shadow-md text-white rounded-2xl transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Opening your story...
                  </>
                ) : (
                  <>
                    {mode === 'login' && 'Enter Code Kathai →'}
                    {mode === 'signup' && 'Start Learning →'}
                    {mode === 'forgot' && 'Send Reset Link →'}
                  </>
                )}
              </button>
            </form>

            {/* Bottom Mode Switcher Links */}
            <div className="pt-2 text-center text-xs font-semibold text-ink-600 dark:text-ink-400">
              {mode === 'login' && (
                <p>
                  New to Code Kathai?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('signup')}
                    className="font-bold text-bamboo-600 hover:underline dark:text-bamboo-400 ml-1"
                  >
                    Create your account
                  </button>
                </p>
              )}

              {mode === 'signup' && (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="font-bold text-bamboo-600 hover:underline dark:text-bamboo-400 ml-1"
                  >
                    Sign in
                  </button>
                </p>
              )}

              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="inline-flex items-center gap-1 font-bold text-bamboo-600 hover:underline dark:text-bamboo-400"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                </button>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
