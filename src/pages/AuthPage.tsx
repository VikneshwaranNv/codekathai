import { useState } from 'react';
import { BookOpen, Sparkles, User, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth';

export default function AuthPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { createProfile } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('தயவுசெய்து உங்கள் பெயரை உள்ளிடவும் (Please enter your name)');
      return;
    }
    createProfile(name, email);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-bamboo-50 via-white to-emerald-50 p-4 dark:from-ink-950 dark:via-ink-900 dark:to-ink-950">
      <div className="w-full max-w-md">
        {/* Logo Branding */}
        <div className="mb-8 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-bamboo-600 text-white shadow-soft">
            <BookOpen className="h-8 w-8" strokeWidth={2.4} />
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-bamboo-950 dark:text-white">
            Code Kathai
          </h1>
          <p className="font-tamil mt-1 text-sm font-medium text-bamboo-700 dark:text-bamboo-300">
            தமிழ் + Stories + Practice மூலம் C Programming கற்றுக்கொள்ளலாம்!
          </p>
        </div>

        {/* Form Card */}
        <div className="card p-8 shadow-2xl border border-bamboo-100 dark:border-bamboo-800 bg-white dark:bg-ink-900">
          <div className="mb-6 flex items-center justify-between border-b border-bamboo-100 pb-4 dark:border-bamboo-800">
            <div>
              <h2 className="font-display text-lg font-bold text-bamboo-950 dark:text-white">
                Create Account / கணக்கு தொடங்குங்கள்
              </h2>
              <p className="text-xs text-ink-500">Enter your name to personalize your learning</p>
            </div>
            <Sparkles className="h-5 w-5 text-golden-500" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600 dark:bg-red-950/50 dark:text-red-300">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-ink-700 dark:text-ink-300 uppercase tracking-wider mb-1.5">
                Your Name / உங்கள் பெயர் *
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-ink-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Vishal or Kavi"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                  className="w-full rounded-xl border border-bamboo-200 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-bamboo-950 focus:border-bamboo-500 focus:outline-none focus:ring-2 focus:ring-bamboo-500/20 dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink-700 dark:text-ink-300 uppercase tracking-wider mb-1.5">
                Email / மின்னஞ்சல் (Optional)
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-ink-400" />
                <input
                  type="email"
                  placeholder="vishal@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-bamboo-200 bg-white py-2.5 pl-10 pr-4 text-sm font-semibold text-bamboo-950 focus:border-bamboo-500 focus:outline-none focus:ring-2 focus:ring-bamboo-500/20 dark:border-bamboo-800 dark:bg-ink-950 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-bamboo-600 to-emerald-600 shadow-soft hover:opacity-90"
            >
              Start Learning Now / கற்றலைத் தொடங்குங்கள் <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
