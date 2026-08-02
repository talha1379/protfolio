import { supabase, isSupabaseConfigured } from './supabase';
import { ProfileData, SkillCategory, WorkflowStep, Project, SocialLink, WebsiteSettings, CustomCVData } from '../types';

export const portfolioService = {
  // Sync state to Supabase if table exists
  async syncToSupabase(key: string, data: any): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      await supabase.from('portfolio_content').upsert({
        key,
        content: data,
        updated_at: new Date().toISOString()
      });
    } catch (err) {
      console.warn(`Supabase sync warning for ${key}:`, err);
    }
  },

  // Load state from Supabase if available
  async loadFromSupabase<T>(key: string): Promise<T | null> {
    if (!isSupabaseConfigured || !supabase) return null;
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('content')
        .eq('key', key)
        .single();
      
      if (!error && data?.content) {
        return data.content as T;
      }
    } catch (err) {
      console.warn(`Supabase load warning for ${key}:`, err);
    }
    return null;
  }
};
