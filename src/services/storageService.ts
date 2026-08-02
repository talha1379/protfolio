import { supabase, isSupabaseConfigured } from './supabase';

export const storageService = {
  // Upload file (Image or PDF)
  async uploadFile(file: File, bucket: string = 'portfolio-assets', path?: string): Promise<{ url: string; error: string | null }> {
    const filePath = path || `${bucket}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, { upsert: true });

        if (error) {
          console.warn('Supabase storage upload error, using local data URL fallback:', error.message);
        } else {
          const { data: publicUrlData } = supabase.storage
            .from(bucket)
            .getPublicUrl(filePath);

          if (publicUrlData?.publicUrl) {
            return { url: publicUrlData.publicUrl, error: null };
          }
        }
      } catch (err: any) {
        console.warn('Supabase upload exception:', err);
      }
    }

    // Local Data URL fallback conversion
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({ url: reader.result as string, error: null });
      };
      reader.onerror = () => {
        resolve({ url: '', error: 'Failed to read selected file locally.' });
      };
      reader.readAsDataURL(file);
    });
  }
};
