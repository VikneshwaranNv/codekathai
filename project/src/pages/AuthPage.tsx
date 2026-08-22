import { useState, useEffect } from 'react';
import {
  BookOpen, Mail, Lock, User as UserIcon, Eye, EyeOff,
  Loader2, AlertCircle, CheckCircle2, ArrowLeft, KeyRound, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/lib/auth';

type View = 'signin' | 'signup' | 'forgot' | 'recovery';

export default function AuthPage() {
  const { signIn, signUp, resetPassword, updatePassword, recoveryMode, clearRecoveryMode } = useAuth();

  const [view, setView] = useState<View>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNew, setShowConfirmNew] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (recoveryMode) {
      setView('recovery');
      setError(null);
      setSuccess(null);
    }
  }, [recoveryMode]);

  const emailOk = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const switchView = (v: View) => {
    setView(v);
    setError(null);
    setSuccess(null);
    if (v === 'signin' || v === 'signup') {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    }
    if (v === 'forgot') {
      setEmail('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (view === 'signin') {
      if (!email.trim()) return setError('Please enter your email.');
      if (!emailOk(email.trim())) return setError('Please enter a valid email address.');
      if (!password) return setError('Please enter your password.');
      setLoading(true);
      const { error: err } = await signIn(email.trim(), password);
      setLoading(false);
      if (err) setError(err);
      return;
    }

    if (view === 'signup') {
      if (!name.trim()) return setError('Please enter your full name.');
      if (name.trim().length < 2) return setError('Name must be at least 2 characters.');
      if (!email.trim()) return setError('Please enter your email.');
      if (!emailOk(email.trim())) return setError('Please enter a valid email address.');
      if (!password) return setError('Please enter a password.');
      if (password.length < 6) return setError('Password must be at least 6 characters.');
      if (password !== confirmPassword) return setError('Passwords do not match.');
      setLoading(true);
      const { error: err } = await signUp(name.trim(), email.trim(), password);
      setLoading(false);
      if (err) setError(err);
      else setSuccess('Account created! You are now signed in.');
      return;
    }

    if (view === 'forgot') {
      if (!email.trim()) return setError('Please enter your email.');
      if (!emailOk(email.trim())) return setError('Please enter a valid email address.');
      setLoading(true);
      const { error: err } = await resetPassword(email.trim());
      setLoading(false);
      if (err) setError(err);
      else {
        setSuccess('If an account exists for that email, a password reset link has been sent. Check your inbox.');
        setEmail('');
      }
      return;
    }

    if (view === 'recovery') {
      if (!newPassword) return setError('Please enter a new password.');
      if (newPassword.length < 6) return setError('Password must be at least 6 characters.');
      if (newPassword !== confirmNewPassword) return setError('Passwords do not match.');
      setLoading(true);
      const { error: err } = await updatePassword(newPassword);
      setLoading(false);
      if (err) {
        setError(err);
        return;
      }
      setSuccess('Password updated successfully! You can now sign in with your new password.');
      setNewPassword('');
      setConfirmNewPassword('');
      clearRecoveryMode();
      setTimeout(() => switchView('signin'), 2000);
    }
  };

  const inputClass =
    'w-full rounded-xl border border-bamboo-200 bg-white py-3.5 pl-11 pr-11 text-sm text-ink-900 outline-none transition-all placeholder:text-ink-300 focus:border-bamboo-500 focus:ring-2 focus:ring-bamboo-200 dark:border-bamboo-700 dark:bg-ink-900 dark:text-bamboo-50 dark:placeholder:text-ink-500 dark:focus:ring-bamboo-800';
  const labelClass = 'mb-2 block text-sm font-semibold text-ink-700 dark:text-ink-300';

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bamboo-50 px-4 py-8 dark:bg-ink-950">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-bamboo-200/30 blur-3xl dark:bg-bamboo-800/20" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-golden-200/20 blur-3xl dark:bg-golden-800/10" />

      <div className="relative w-full max-w-md animate-fade-up">
        {/* Logo header */}
        <div className="mb-8 text-center">
          <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-bamboo-600 text-white shadow-soft">
            <BookOpen className="h-7 w-7" strokeWidth={2.4} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold text-bamboo-950 dark:text-bamboo-50">
            Code Kathai
          </h1>
          <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Learn coding through stories · கதைகள் வழியாக
          </p>
        </div>

        <div className="card overflow-hidden">
          {/* Tab switcher — only for sign in / sign up */}
          {(view === 'signin' || view === 'signup') && (
            <div className="grid grid-cols-2 border-b border-bamboo-100 dark:border-bamboo-800">
              <button
                onClick={() => switchView('signin')}
                className={`py-4 text-sm font-semibold transition-all ${
                  view === 'signin'
                    ? 'border-b-2 border-bamboo-600 text-bamboo-700 dark:text-bamboo-300'
                    : 'text-ink-400 hover:text-ink-600 dark:hover:text-ink-300'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => switchView('signup')}
                className={`py-4 text-sm font-semibold transition-all ${
                  view === 'signup'
                    ? 'border-b-2 border-bamboo-600 text-bamboo-700 dark:text-bamboo-300'
                    : 'text-ink-400 hover:text-ink-600 dark:hover:text-ink-300'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          <div className="p-6 sm:p-8">
            {/* Heading */}
            <div className="mb-5">
              {view === 'forgot' && (
                <button
                  onClick={() => switchView('signin')}
                  className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-bamboo-700 hover:text-bamboo-900 dark:text-bamboo-300 dark:hover:text-bamboo-100"
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Sign In
                </button>
              )}
              {view === 'recovery' && (
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-bamboo-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-bamboo-700 dark:bg-bamboo-900/50 dark:text-bamboo-300">
                  <KeyRound className="h-3.5 w-3.5" /> Password Recovery
                </div>
              )}
              <h2 className="font-display text-xl font-semibold text-bamboo-950 dark:text-bamboo-50">
                {view === 'signin' && 'Welcome back!'}
                {view === 'signup' && 'Create your account'}
                {view === 'forgot' && 'Forgot Password?'}
                {view === 'recovery' && 'Set a New Password'}
              </h2>
              <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">
                {view === 'signin' && 'Sign in to continue your learning journey.'}
                {view === 'signup' && 'Start learning C programming today.'}
                {view === 'forgot' && "Enter your registered email and we'll send you a secure reset link."}
                {view === 'recovery' && 'Choose a new password for your account.'}
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="mb-4 flex items-start gap-2 rounded-xl bg-bamboo-50 px-4 py-3 text-sm text-bamboo-700 dark:bg-bamboo-950/40 dark:text-bamboo-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sign Up: Full Name */}
              {view === 'signup' && (
                <div>
                  <label className={labelClass}>Full Name</label>
                  <div className="relative">
                    <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Kavi Sri"
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Sign In / Sign Up / Forgot: Email */}
              {view !== 'recovery' && (
                <div>
                  <label className={labelClass}>Email</label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Sign In / Sign Up: Password */}
              {(view === 'signin' || view === 'signup') && (
                <div>
                  <label className={labelClass}>Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete={view === 'signin' ? 'current-password' : 'new-password'}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-600 dark:hover:text-ink-300"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Sign Up: Confirm Password */}
              {view === 'signup' && (
                <div>
                  <label className={labelClass}>Confirm Password</label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-600 dark:hover:text-ink-300"
                      aria-label={showConfirm ? 'Hide password' : 'Show password'}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Recovery: New Password */}
              {view === 'recovery' && (
                <>
                  <div>
                    <label className={labelClass}>New Password</label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-600 dark:hover:text-ink-300"
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Confirm New Password</label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                      <input
                        type={showConfirmNew ? 'text' : 'password'}
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmNew((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 transition-colors hover:text-ink-600 dark:hover:text-ink-300"
                        aria-label={showConfirmNew ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 text-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {view === 'signin' && 'Signing in...'}
                    {view === 'signup' && 'Creating account...'}
                    {view === 'forgot' && 'Sending reset link...'}
                    {view === 'recovery' && 'Updating password...'}
                  </>
                ) : (
                  <>
                    {view === 'signin' && 'Sign In'}
                    {view === 'signup' && 'Create Account'}
                    {view === 'forgot' && 'Send Reset Link'}
                    {view === 'recovery' && (
                      <>
                        <ShieldCheck className="h-4 w-4" /> Update Password
                      </>
                    )}
                  </>
                )}
              </button>
            </form>

            {/* Forgot password link — only on sign in */}
            {view === 'signin' && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => switchView('forgot')}
                  className="text-sm font-semibold text-bamboo-700 hover:text-bamboo-900 dark:text-bamboo-300 dark:hover:text-bamboo-100"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Switch between sign in / sign up */}
            {(view === 'signin' || view === 'signup') && (
              <p className="mt-5 text-center text-sm text-ink-500 dark:text-ink-400">
                {view === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  onClick={() => switchView(view === 'signin' ? 'signup' : 'signin')}
                  className="font-semibold text-bamboo-700 hover:text-bamboo-900 dark:text-bamboo-300 dark:hover:text-bamboo-100"
                >
                  {view === 'signin' ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-400 dark:text-ink-500">
          Your progress is saved securely and restored when you sign in.
        </p>
      </div>
    </div>
  );
}
