import React, { useState } from 'react';
import { SocialLink } from '../../types';
import { Save, Plus, Trash2, CheckCircle2, MoveUp, MoveDown, Share2 } from 'lucide-react';

interface Props {
  socials: SocialLink[];
  onSave: (updatedSocials: SocialLink[]) => void;
}

export const SocialsEditor: React.FC<Props> = ({ socials, onSave }) => {
  const [links, setLinks] = useState<SocialLink[]>([...socials]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  };

  const handleAddLink = () => {
    setLinks([
      ...links,
      {
        id: 'soc-' + Date.now(),
        platform: 'GitHub',
        url: 'https://github.com/talha1379',
        icon: 'Github'
      }
    ]);
  };

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === links.length - 1)) return;
    const updated = [...links];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setLinks(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(links);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono">Social Links Editor</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage external social media, developer profiles, and contact channels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddLink}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>Social links updated successfully!</span>
        </div>
      )}

      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={link.id || index} className="p-4 rounded-xl bg-[#121212] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="font-bold text-blue-400 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" />
                Social Link #{index + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:text-white disabled:opacity-20"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === links.length - 1}
                  className="p-1 hover:text-white disabled:opacity-20"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveLink(index)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={link.platform}
                  onChange={(e) => handleLinkChange(index, 'platform', e.target.value)}
                  className="w-full px-3 py-2 bg-[#181818] border border-white/10 rounded-lg text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Icon Identifier (e.g. Github, Linkedin, Mail)
                </label>
                <input
                  type="text"
                  value={link.icon}
                  onChange={(e) => handleLinkChange(index, 'icon', e.target.value)}
                  className="w-full px-3 py-2 bg-[#181818] border border-white/10 rounded-lg text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  URL / Target Link
                </label>
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                  className="w-full px-3 py-2 bg-[#181818] border border-white/10 rounded-lg text-white text-xs font-mono"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
