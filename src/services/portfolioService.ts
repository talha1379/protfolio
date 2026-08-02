import { supabase, isSupabaseConfigured } from "./supabase";

export const portfolioService = {
  // Save or update portfolio data in Supabase
  async syncToSupabase(key: string, content: any): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) {
      console.warn("Supabase is not configured.");
      return false;
    }

    try {
      const { error } = await supabase.from("portfolio_content").upsert(
        {
          key,
          content,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "key",
        },
      );

      if (error) {
        console.error(`Supabase save error for "${key}":`, error);
        return false;
      }

      console.log(`"${key}" saved successfully to Supabase.`);
      return true;
    } catch (err) {
      console.error(`Supabase sync error for "${key}":`, err);
      return false;
    }
  },

  // Load portfolio data from Supabase
  async loadFromSupabase<T>(key: string): Promise<T | null> {
    if (!isSupabaseConfigured || !supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("portfolio_content")
        .select("content")
        .eq("key", key)
        .maybeSingle();

      if (error) {
        console.error(`Supabase load error for "${key}":`, error);
        return null;
      }

      return data?.content ? (data.content as T) : null;
    } catch (err) {
      console.error(`Supabase load error for "${key}":`, err);
      return null;
    }
  },
};
