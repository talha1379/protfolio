import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isSupabaseConfigured } from '../services/supabase';
import { Lock, Mail, Eye, EyeOff, ArrowLeft, Loader2, ShieldCheck, Database } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);

  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalErr(null);
    clearError();

    if (!email.trim()) {
      setLocalErr('Please enter your email address.');
      return;
    }
    if (!password) {
      setLocalErr('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const success = await login(email.trim(), password);
    setIsSubmitting(false);

    if (success) {
      navigate('/admin', { replace: true });
    }
  };

  const activeError = localErr || error;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-600 selection:text-white">
      {/* Back to Home Link */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition-colors bg-[#141414] px-4 py-2 rounded-lg border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Public Portfolio</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
        
        <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          Admin Authentication
        </h2>
        <p className="mt-2 text-center text-xs text-slate-400 max-w-xs mx-auto">
          Manage Talha Ahmad’s portfolio content, projects, profile & CV settings.
        </p>

        {/* Supabase Status Banner */}
        <div className="mt-4 p-3 rounded-lg bg-[#141414] border border-white/10 flex items-center gap-3 text-xs">
          <Database className={`w-4 h-4 flex-shrink-0 ${isSupabaseConfigured ? 'text-emerald-400' : 'text-amber-400'}`} />
          <div className="text-left">
            <span className="font-semibold text-slate-200">
              {isSupabaseConfigured ? 'Supabase Authentication Connected' : 'Supabase Environment Ready'}
            </span>
            <p className="text-[11px] text-slate-400">
              {isSupabaseConfigured
                ? 'Authenticating directly with Supabase Cloud.'
                : 'Local session active. Connect VITE_SUPABASE_URL to sync cloud auth.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#121212] py-8 px-6 sm:px-10 rounded-2xl border border-white/10 shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Error Notification */}
            {activeError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2 animate-fadeIn">
                <span className="font-bold flex-shrink-0">!</span>
                <div className="flex-1">{activeError}</div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@talhaahmad.dev"
                  className="block w-full pl-10 pr-3 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-3 bg-[#1A1A1A] border border-white/10 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In to Admin Dashboard</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
