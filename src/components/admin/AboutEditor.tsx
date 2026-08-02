import React, { useState } from 'react';
import { ProfileData } from '../../types';
import { Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface Props {
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
}

export const AboutEditor: React.FC<Props> = ({ profile, onSave }) => {
  const [aboutText, setAboutText] = useState<string[]>([...(profile.aboutText || [])]);
  const [bio, setBio] = useState(profile.bio || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleParagraphChange = (index: number, val: string) => {
    const updated = [...aboutText];
    updated[index] = val;
    setAboutText(updated);
  };

  const handleAddParagraph = () => {
    setAboutText([...aboutText, 'New paragraph content outlining your background and technical vision.']);
  };

  const handleRemoveParagraph = (index: number) => {
    setAboutText(aboutText.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...profile,
      bio,
      aboutText
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono">About Section Editor</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Edit the narrative paragraphs displayed in your portfolio’s About section.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>About section paragraphs updated successfully!</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Primary Bio Overview
        </label>
        <textarea
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Detailed About Paragraphs ({aboutText.length})
          </h3>
          <button
            type="button"
            onClick={handleAddParagraph}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 font-semibold text-xs border border-blue-500/20 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Paragraph</span>
          </button>
        </div>

        {aboutText.map((paragraph, index) => (
          <div key={index} className="p-4 rounded-xl bg-[#121212] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Paragraph #{index + 1}</span>
              {aboutText.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveParagraph(index)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}
            </div>
            <textarea
              rows={3}
              value={paragraph}
              onChange={(e) => handleParagraphChange(index, e.target.value)}
              className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
    </form>
  );
};
