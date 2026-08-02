import React, { useRef, useState } from 'react';
import { ProfileData } from '../../types';
import { DefaultAvatar } from '../DefaultAvatar';
import { processImageFile } from '../../utils/imageUtils';
import { storageService } from '../../services/storageService';
import { Upload, Trash2, CheckCircle2, RotateCcw, Loader2 } from 'lucide-react';

interface Props {
  profile: ProfileData;
  onSave: (updatedProfile: ProfileData) => void;
}

export const ProfileImageEditor: React.FC<Props> = ({ profile, onSave }) => {
  const [currentImage, setCurrentImage] = useState<string | null>(profile.customProfileImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChooseImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setIsUploading(true);

    try {
      // Validate & crop/resize locally
      const base64 = await processImageFile(file);
      
      // Also invoke storageService for Supabase cloud sync readiness
      const storageRes = await storageService.uploadFile(file, 'profile-images');
      const finalUrl = storageRes.url || base64;

      setCurrentImage(finalUrl);
      const updated = { ...profile, customProfileImage: finalUrl };
      onSave(updated);

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to process selected profile image.');
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleRemoveImage = () => {
    setCurrentImage(null);
    const updated = { ...profile, customProfileImage: null };
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white font-mono">Profile Image Management</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Upload and manage your hero section portrait photo. It will automatically render in a prominent circular frame with an accent ring.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Profile image updated and saved!</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center gap-8 p-6 rounded-2xl bg-[#121212] border border-white/10">
        
        {/* Live Circular Frame Preview */}
        <div className="relative flex-shrink-0">
          <div className="w-44 h-44 rounded-full p-1 bg-gradient-to-tr from-blue-600 via-blue-400 to-indigo-600 shadow-2xl shadow-blue-500/20">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#0A0A0A] border-2 border-[#0A0A0A] flex items-center justify-center">
              {currentImage ? (
                <img
                  src={currentImage}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <DefaultAvatar className="w-full h-full" />
              )}
            </div>
          </div>

          <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
            Preview
          </span>
        </div>

        {/* Controls */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              {currentImage ? 'Custom Portrait Active' : 'Default Avatar Displayed'}
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-md">
              Accepts JPG, PNG, WEBP, or SVG images under 8MB. Images are resized smoothly for optimal loading performance.
            </p>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="hidden"
          />

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              type="button"
              onClick={handleChooseImage}
              disabled={isUploading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>{currentImage ? 'Replace Profile Image' : 'Choose Profile Image'}</span>
                </>
              )}
            </button>

            {currentImage && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-xs border border-red-500/20 transition-all active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Remove Image</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
