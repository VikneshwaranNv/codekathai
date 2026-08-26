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
  ShieldCheck,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';
import type { Page } from '@/components/Navbar';
import { useAuth } from '@/lib/auth';
import {
  signInWithEmailPassword,
  signUpWithEmailPassword,
  resetPasswordForEmail,
  adminSignInWithEmailPassword,
  isValidEmailFormat,
  isValidFullNameFormat,
} from '@/lib/authService';

type AuthMode = 'login' | 'signup' | 'forgot' | 'admin';

interface AuthPageProps {
  onNavigate?: (page: Page) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps = {}) {
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

  const { setAdminProfile } = useAuth();

  // Strict Real-time Password Strength Meter Calculation
  const passwordRequirements = useMemo(() => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    const validCount = [minLength, hasUppercase, hasLowercase, hasNumber, hasSymbol].filter(Boolean).length;
    return { minLength, hasUppercase, hasLowercase, hasNumber, hasSymbol, validCount };
  }, [password]);

  const passwordStrength = useMemo(() => {
    if (!password) return { label: '', color: 'bg-slate-200', score: 0 };
    const count = passwordRequirements.validCount;
    if (count <= 2) return { label: 'Weak 🔴', color: 'bg-rose-500', score: 25 };
    if (count <= 4) return { label: 'Medium 🟡', color: 'bg-amber-500', score: 65 };
    return { label: 'Strong 🟢', color: 'bg-emerald-500', score: 100 };
  }, [password, passwordRequirements]);

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

    // 1. Strict Common Email Validation (MUST start with an alphabet letter!)
    const emailValidation = isValidEmailFormat(cleanEmail);
    if (!emailValidation.valid) {
      setError(emailValidation.error || 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'admin') {
        const res = await adminSignInWithEmailPassword(cleanEmail, password);
        if (!res.success) {
          setError(res.error || 'Admin login failed.');
        } else if (res.profile) {
          setAdminProfile(res.profile);
        }
      } else if (mode === 'login') {
        const res = await signInWithEmailPassword(cleanEmail, password);
        if (!res.success) {
          setError(res.error || 'Login failed.');
        } else if (res.profile) {
          setAdminProfile(res.profile);
        }
      } else if (mode === 'signup') {
        const nameValidation = isValidFullNameFormat(fullName);
        if (!nameValidation.valid) {
          setError(nameValidation.error || 'Please enter a valid full name.');
          setIsSubmitting(false);
          return;
        }

        if (passwordRequirements.validCount < 5) {
          setError(
            'கடவுச்சொல் அனைத்து 5 விதிகளையும் பூர்த்தி செய்ய வேண்டும் (Password MUST satisfy all 5 requirements: Min 8 chars, A-Z, a-z, 0-9, symbol).'
          );
          setIsSubmitting(false);
          return;
        }

        if (password !== confirmPassword) {
          setError('கடவுச்சொற்கள் பொருந்தவில்லை! (Passwords do not match)');
          setIsSubmitting(false);
          return;
        }

        const res = await signUpWithEmailPassword(fullName, cleanEmail, password);
        if (!res.success) {
          setError(res.error || 'Account creation failed.');
        } else if (res.profile) {
          setAdminProfile(res.profile);
        }
      } else if (mode === 'forgot') {
        const res = await resetPasswordForEmail(cleanEmail);
        if (!res.success) {
          setError(res.error || 'Failed to send reset email.');
        } else {
          setSuccessMsg(
            'கடவுச்சொல் மீட்டமைப்பு இணைப்பு உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது! (Password reset instructions sent to your email.)'
          );
        }
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-stone-100 p-4 sm:p-6 dark:bg-ink-950 font-sans relative">
      
      {/* ================= CLEAN CENTERED AUTHENTICATION CONTAINER ================= */}
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-bamboo-200/80 bg-white p-6 sm:p-8 shadow-2xl dark:border-bamboo-900/60 dark:bg-ink-900">
        <div className="w-full space-y-5">
          
          {/* Code Kathai Brand Header */}
          <div className="flex flex-col items-center text-center space-y-2 border-b border-bamboo-100 dark:border-bamboo-900/60 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-bamboo-600 text-white shadow-soft">
                <BookOpen className="h-6 w-6" strokeWidth={2.4} />
              </span>
              <div className="text-left">
                <span className="font-display text-xl font-bold tracking-tight text-bamboo-950 dark:text-white block leading-none">
                  Code Kathai
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-bamboo-600 dark:text-bamboo-400">
                  கோட் கதை
                </span>
              </div>
            </div>
          </div>

          {/* PORTAL SELECTOR TAB TOGGLE (Student vs Admin) - Shown ONLY during Login / Admin Mode, hidden on Account Creation (Signup) */}
          {mode !== 'signup' && (
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
                    ? 'bg-gradient-to-r from-bamboo-600 to-emerald-700 text-white shadow-md font-bold'
                    : 'text-bamboo-700 hover:text-bamboo-900 dark:text-bamboo-400 font-semibold'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5 text-golden-400" /> Admin Portal
              </button>
            </div>
          )}

          {/* Header Titles */}
          <div>
            <div className="flex items-center gap-2 text-bamboo-600 dark:text-bamboo-400 mb-1">
              {mode === 'admin' ? (
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bamboo-600 dark:text-bamboo-400">
                  <ShieldAlert className="h-4 w-4 text-bamboo-600" /> Admin Authentication Required
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bamboo-600 dark:text-bamboo-400">
                  <ShieldCheck className="h-4 w-4" />
                  {mode === 'login' ? 'Welcome Back 👋' : mode === 'signup' ? 'Start Your Story 🚀' : 'Reset Password 🔑'}
                </span>
              )}
            </div>

            <h2 className="font-display text-2xl font-bold text-bamboo-950 dark:text-white">
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
              className="btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md text-white rounded-2xl transition-all duration-300 disabled:opacity-50 bg-gradient-to-r from-bamboo-600 via-bamboo-700 to-emerald-700 hover:from-bamboo-700 hover:to-emerald-800"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === 'signup' && 'Creating account...'}
                  {mode === 'login' && 'Signing in...'}
                  {mode === 'admin' && 'Authenticating Admin...'}
                  {mode === 'forgot' && 'Sending reset link...'}
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
                className="inline-flex items-center gap-1 font-bold text-ink-600 hover:underline dark:text-ink-300 text-xs"
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
  );
}
