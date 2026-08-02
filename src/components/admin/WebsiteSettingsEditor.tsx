import React, { useState } from 'react';
import { WebsiteSettings } from '../../types';
import { Save, CheckCircle2 } from 'lucide-react';

interface Props {
  settings: WebsiteSettings;
  onSave: (updated: WebsiteSettings) => void;
}

export const WebsiteSettingsEditor: React.FC<Props> = ({ settings, onSave }) => {
  const [formData, setFormData] = useState<WebsiteSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
          <h2 className="text-xl font-bold text-white font-mono">Website & SEO Settings</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure site metadata, browser title, and toggle visible portfolio sections.
          </p>
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Website settings saved successfully!</span>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Portfolio Page Title (SEO)
          </label>
          <input
            type="text"
            name="siteTitle"
            value={formData.siteTitle}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Meta Description (SEO)
          </label>
          <textarea
            name="metaDescription"
            rows={3}
            value={formData.metaDescription}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#161616] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Section Visibility Toggles */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Public Portfolio Section Visibility
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#181818] border border-white/5 cursor-pointer hover:bg-[#202020] transition-colors">
              <input
                type="checkbox"
                name="showProjects"
                checked={formData.showProjects}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-xs font-semibold text-white">Show Projects Section</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#181818] border border-white/5 cursor-pointer hover:bg-[#202020] transition-colors">
              <input
                type="checkbox"
                name="showSkills"
                checked={formData.showSkills}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-xs font-semibold text-white">Show Skills Section</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#181818] border border-white/5 cursor-pointer hover:bg-[#202020] transition-colors">
              <input
                type="checkbox"
                name="showWorkflow"
                checked={formData.showWorkflow}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-xs font-semibold text-white">Show Workflow Section</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#181818] border border-white/5 cursor-pointer hover:bg-[#202020] transition-colors">
              <input
                type="checkbox"
                name="showStats"
                checked={formData.showStats}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-xs font-semibold text-white">Show Statistics Counters</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#181818] border border-white/5 cursor-pointer hover:bg-[#202020] transition-colors">
              <input
                type="checkbox"
                name="showContact"
                checked={formData.showContact}
                onChange={handleChange}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-xs font-semibold text-white">Show Contact Section</span>
            </label>
          </div>
        </div>
      </div>
    </form>
  );
};
