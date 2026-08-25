import { useState, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Terminal,
  ShieldCheck,
  ArrowLeft,
  ShieldAlert,
  Wand2,
  Check,
  X,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';
import {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  resetPasswordForEmail,
  adminSignInWithEmailPassword,
} from '@/lib/authService';

type AuthMode = 'login' | 'signup' | 'forgot' | 'admin';

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

  const { createProfile, setAdminProfile } = useAuth();

  // Password Requirements Breakdown for Signup Mode
  const passwordRequirements = useMemo(() => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[^A-Za-z0-9]/.test(password),
    };
  }, [password]);

  const isPasswordStrong = useMemo(() => {
    return (
      passwordRequirements.minLength &&
      passwordRequirements.hasUppercase &&
      passwordRequirements.hasLowercase &&
      passwordRequirements.hasNumber &&
      passwordRequirements.hasSymbol
    );
  }, [passwordRequirements]);

  // Password Strength Percentage & Rating
  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: 'bg-slate-200' };
    let metCount = 0;
    if (passwordRequirements.minLength) metCount++;
    if (passwordRequirements.hasUppercase) metCount++;
    if (passwordRequirements.hasLowercase) metCount++;
    if (passwordRequirements.hasNumber) metCount++;
    if (passwordRequirements.hasSymbol) metCount++;

    const percent = Math.min(100, metCount * 20);

    if (metCount <= 2) return { score: percent, label: 'Weak ❌', color: 'bg-red-500' };
    if (metCount <= 4) return { score: percent, label: 'Medium ⚠️', color: 'bg-amber-500' };
    return { score: 100, label: 'Strong & Secure 💪', color: 'bg-emerald-500' };
  }, [password, passwordRequirements]);

  // Auto-Generate a Guaranteed Strong Password
  const generateStrongPassword = () => {
    const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowers = 'abcdefghijkmnopqrstuvwxyz';
    const numbers = '23456789';
    const symbols = '!@#$%^&*()_+-=';

    const getChar = (str: string) => str[Math.floor(Math.random() * str.length)];

    let pwd = [
      getChar(uppers),
      getChar(lowers),
      getChar(numbers),
      getChar(symbols),
      getChar(uppers),
      getChar(lowers),
      getChar(numbers),
      getChar(symbols),
      getChar(lowers),
      getChar(numbers),
    ];

    pwd = pwd.sort(() => Math.random() - 0.5);
    const generated = pwd.join('');

    setPassword(generated);
    setConfirmPassword(generated);
    setShowPassword(true);
    setShowConfirmPassword(true);
    setError('');
    setSuccessMsg('✨ Strong password generated & filled automatically!');
  };

  // Email Validation
  const validateEmail = (rawEmail: string): boolean => {
    const clean = rawEmail.trim().toLowerCase();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(clean);
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
      setError('தயவுசெய்து உங்கள் மின்னஞ்சலை உள்ளிடவும் (Please enter your email address)');
      return;
    }

    if (!validateEmail(cleanEmail)) {
      setError('செல்லுபடியாகும் மின்னஞ்சல் முகவரியை உள்ளிடவும் (Please enter a valid email address)');
      return;
    }

    // 2. Admin Login Handler
    if (mode === 'admin') {
      if (!password) {
        setError('Please enter your admin password');
        return;
      }

      setIsSubmitting(true);
      try {
        const res = await adminSignInWithEmailPassword(cleanEmail, password);
        if (res.success && res.profile) {
          setAdminProfile(res.profile);
        } else {
          setError(res.error || 'Admin authentication failed. Access denied.');
        }
      } catch (err: any) {
        setError(err?.message || 'Admin login failed.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // 3. Forgot Password Handler
    if (mode === 'forgot') {
      setIsSubmitting(true);
      try {
        const res = await resetPasswordForEmail(cleanEmail);
        setSuccessMsg(res.message || `Password reset link sent to ${cleanEmail}. Please check your inbox.`);
      } catch (err: any) {
        setError('Failed to send reset link. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // 4. Strict Signup Validation (Strong Password Enforced)
    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('தயவுசெய்து உங்கள் முழு பெயரை உள்ளிடவும் (Please enter your full name)');
        return;
      }
      if (!password) {
        setError('தயவுசெய்து கடவுச்சொல்லை உள்ளிடவும் (Please enter a password)');
        return;
      }
      
      // STRICT STRONG PASSWORD REQUIREMENT CHECK
      if (!isPasswordStrong) {
        setError(
          'கடவுச்சொல் போதுமான அளவு வலிமையாக இல்லை! (Password MUST contain at least 8 characters, 1 uppercase letter A-Z, 1 lowercase letter a-z, 1 number 0-9, and 1 symbol !@#$%^&*). Click "Generate Strong Password" to auto-create one.'
        );
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

    // 5. Student Login Handler
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

              {/* Terminal Code Snippet */}
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
          <div className="mx-auto w-full max-w-sm space-y-5">
            
            {/* PORTAL SELECTOR TAB TOGGLE (Student vs Admin) */}
            <div className="grid grid-cols-2 rounded-2xl bg-stone-100 p-1 dark:bg-ink-950 border border-bamboo-100 dark:border-bamboo-900/60 text-xs font-bold">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  mode !== 'admin'
                    ? 'bg-white text-bamboo-950 shadow-sm dark:bg-ink-900 dark:text-white'
                    : 'text-ink-500 hover:text-bamboo-800 dark:text-ink-400'
                }`}
              >
                <User className="h-3.5 w-3.5" /> Student Login
              </button>
              <button
                type="button"
                onClick={() => switchMode('admin')}
                className={`py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                  mode === 'admin'
                    ? 'bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-md'
                    : 'text-purple-700 hover:text-purple-900 dark:text-purple-400'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-golden-400" /> Admin Portal
              </button>
            </div>

            {/* Header Titles */}
            <div>
              <div className="flex items-center gap-2 text-bamboo-600 dark:text-bamboo-400 mb-1">
                {mode === 'admin' ? (
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                    <ShieldAlert className="h-4 w-4" /> Admin Authentication Required
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bamboo-600 dark:text-bamboo-400">
                    <ShieldCheck className="h-4 w-4" />
                    {mode === 'login' ? 'Welcome Back 👋' : mode === 'signup' ? 'Start Your Story 🚀' : 'Reset Password 🔑'}
                  </span>
                )}
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-bamboo-950 dark:text-white">
                {mode === 'login' && 'Continue your coding journey.'}
                {mode === 'signup' && 'Create your account'}
                {mode === 'forgot' && 'Reset your password'}
                {mode === 'admin' && 'Admin Portal Access 🛡️'}
              </h2>

              <p className="font-tamil text-xs text-ink-500 dark:text-ink-400 mt-1">
                {mode === 'login' && 'உங்கள் தமிழ் C Programming கற்றல் கணக்கிற்கு நுழையுங்கள்.'}
                {mode === 'signup' && 'கவி மற்றும் Code Buddy உடன் தமிழ் கதைகள் மூலம் பயிலுங்கள்.'}
                {mode === 'forgot' && 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிட்டு reset link பெறுங்கள்.'}
                {mode === 'admin' && 'நிர்வாகி தரவுப் பலகையை (Admin Dashboard) அணுக அங்கீகரிக்கப்பட்ட மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்.'}
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
                  {mode === 'admin' ? 'Admin Email Address *' : 'Email Address *'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-ink-400" />
                  <input
                    type="email"
                    required
                    placeholder={mode === 'admin' ? 'admin@codekathai.com' : 'yourname@gmail.com'}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className="w-full rounded-2xl border border-bamboo-200 bg-stone-50/50 py-2.5 pl-10 pr-4 text-sm font-semibold text-bamboo-950 focus:border-bamboo-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bamboo-500/20 dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
                  />
                </div>
              </div>

              {/* Password Field (Login, Signup & Admin Mode) */}
              {mode !== 'forgot' && (
                <div className="space-y-1.5">
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

                  {/* AUTO-GENERATE STRONG PASSWORD BUTTON (Signup mode) */}
                  {mode === 'signup' && (
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={generateStrongPassword}
                        className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-purple-100 via-indigo-100 to-emerald-100 hover:from-purple-200 hover:to-emerald-200 text-purple-900 dark:bg-purple-950/60 dark:text-purple-200 dark:border dark:border-purple-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                      >
                        <Wand2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                        🎲 Generate Strong Password / பலமான கடவுச்சொல்லை உருவாக்கு
                      </button>
                    </div>
                  )}

                  {/* Password Strength Meter & Interactive Requirements Checklist (Signup mode) */}
                  {mode === 'signup' && (
                    <div className="pt-2 space-y-2 rounded-2xl bg-stone-50 dark:bg-ink-950 p-3 border border-bamboo-100 dark:border-bamboo-900">
                      {/* Strength Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-ink-500 uppercase tracking-wider">Password Strength:</span>
                          <span className="text-bamboo-700 dark:text-bamboo-300 font-mono">
                            {password ? passwordStrength.label : 'Enter Password'}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-ink-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${passwordStrength.color} transition-all duration-300`}
                            style={{ width: `${passwordStrength.score}%` }}
                          />
                        </div>
                      </div>

                      {/* Real-time Strong Password Checklist */}
                      <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold pt-1 border-t border-stone-200 dark:border-ink-800">
                        <div className={`flex items-center gap-1 ${passwordRequirements.minLength ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                          {passwordRequirements.minLength ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          Min 8 Characters
                        </div>

                        <div className={`flex items-center gap-1 ${passwordRequirements.hasUppercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                          {passwordRequirements.hasUppercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          1 Uppercase (A-Z)
                        </div>

                        <div className={`flex items-center gap-1 ${passwordRequirements.hasLowercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                          {passwordRequirements.hasLowercase ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          1 Lowercase (a-z)
                        </div>

                        <div className={`flex items-center gap-1 ${passwordRequirements.hasNumber ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                          {passwordRequirements.hasNumber ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          1 Number (0-9)
                        </div>

                        <div className={`flex items-center gap-1 col-span-2 ${passwordRequirements.hasSymbol ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-400'}`}>
                          {passwordRequirements.hasSymbol ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                          1 Symbol (!@#$%^&*)
                        </div>
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
                className={`btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md text-white rounded-2xl transition-all duration-300 disabled:opacity-50 ${
                  mode === 'admin'
                    ? 'bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-900'
                    : 'bg-gradient-to-r from-bamboo-600 via-bamboo-700 to-emerald-700 hover:from-bamboo-700 hover:to-emerald-800'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying Credentials...
                  </>
                ) : (
                  <>
                    {mode === 'login' && 'Enter Code Kathai →'}
                    {mode === 'signup' && 'Start Learning →'}
                    {mode === 'forgot' && 'Send Reset Link →'}
                    {mode === 'admin' && 'Access Admin Dashboard 🛡️ →'}
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

              {mode === 'admin' && (
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="inline-flex items-center gap-1 font-bold text-ink-600 hover:underline dark:text-ink-300"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Student Login
                </button>
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
