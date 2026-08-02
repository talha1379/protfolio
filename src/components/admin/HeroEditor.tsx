import React, { useState } from 'react';
import { ProfileData } from '../../types';
import { Save, CheckCircle2 } from 'lucide-react';

interface Props {
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
}

export const HeroEditor: React.FC<Props> = ({ profile, onSave }) => {
  const [formData, setFormData] = useState<ProfileData>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono">Hero Section Editor</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Customize the main greeting, headlines, hero intro text, CTA buttons, and social profile links.
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
          <span>Hero section updated successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Hero Greeting Tag
          </label>
          <input
            type="text"
            name="heroGreeting"
            value={formData.heroGreeting || 'Welcome to my portfolio'}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Main Display Name / Heading
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Role Tag / Subtitle
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            GitHub Profile Link
          </label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            LinkedIn Profile Link
          </label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
          Hero Introduction Paragraph
        </label>
        <textarea
          name="bio"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* CTA Buttons Config */}
      <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
          Call-To-Action (CTA) Buttons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Primary Button Text
            </label>
            <input
              type="text"
              name="primaryCtaText"
              value={formData.primaryCtaText || 'View My Work'}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-lg text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Primary Button Link Target (e.g. #projects)
            </label>
            <input
              type="text"
              name="primaryCtaLink"
              value={formData.primaryCtaLink || '#projects'}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-lg text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Secondary Button Text
            </label>
            <input
              type="text"
              name="secondaryCtaText"
              value={formData.secondaryCtaText || 'Contact Me'}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-lg text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Secondary Button Link Target (e.g. #contact)
            </label>
            <input
              type="text"
              name="secondaryCtaLink"
              value={formData.secondaryCtaLink || '#contact'}
              onChange={handleChange}
              className="w-full px-3 py-2.5 bg-[#181818] border border-white/10 rounded-lg text-white text-xs"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
