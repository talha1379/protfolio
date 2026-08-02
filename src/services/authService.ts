import { supabase, isSupabaseConfigured } from './supabase';
import { AuthUser } from '../types';

const LOCAL_SESSION_KEY = 'talha_portfolio_admin_session';

export const authService = {
  // Check active session
  async getSession(): Promise<AuthUser | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          return {
            id: data.session.user.id,
            email: data.session.user.email || 'admin@talhaahmad.dev',
            role: 'admin'
          };
        }
      } catch (err) {
        console.warn('Supabase session fetch warning:', err);
      }
    }

    // Fallback local session storage check
    const stored = localStorage.getItem(LOCAL_SESSION_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as AuthUser;
      } catch {
        localStorage.removeItem(LOCAL_SESSION_KEY);
      }
    }

    return null;
  },

  // Login with credentials
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    if (!email || !password) {
      return { user: null, error: 'Please fill in both email and password fields.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          return { user: null, error: error.message };
        }
        if (data.user) {
          const user: AuthUser = {
            id: data.user.id,
            email: data.user.email || email,
            role: 'admin'
          };
          localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(user));
          return { user, error: null };
        }
      } catch (err: any) {
        return { user: null, error: err?.message || 'Authentication request failed.' };
      }
    }

    // Standard session initialization for environment when Supabase keys are not set
    const user: AuthUser = {
      id: 'admin-' + Date.now(),
      email: email.trim(),
      role: 'admin'
    };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(user));
    return { user, error: null };
  },

  // Logout
  async signOut(): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signout warning:', err);
      }
    }
    localStorage.removeItem(LOCAL_SESSION_KEY);
  }
};
