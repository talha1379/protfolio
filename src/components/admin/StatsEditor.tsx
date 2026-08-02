import React, { useState } from 'react';
import { ProfileData } from '../../types';
import { Save, Plus, Trash2, CheckCircle2, MoveUp, MoveDown } from 'lucide-react';

interface Props {
  profile: ProfileData;
  onSave: (updated: ProfileData) => void;
}

export const StatsEditor: React.FC<Props> = ({ profile, onSave }) => {
  const [stats, setStats] = useState([...(profile.stats || [])]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStatChange = (index: number, field: string, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const handleAddStat = () => {
    setStats([
      ...stats,
      { label: 'New Metric', value: '100+', description: 'Metric description details' }
    ]);
  };

  const handleRemoveStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === stats.length - 1)) return;
    const updated = [...stats];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setStats(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...profile, stats });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono">Statistics & Highlights</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage key numeric callouts (e.g. Projects Built, Tech Stack Tools, Years of Experience).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddStat}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Metric</span>
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
          <span>Statistics saved successfully!</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 rounded-xl bg-[#121212] border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="font-bold text-blue-400">Metric Card #{index + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(index, 'up')}
                  disabled={index === 0}
                  className="p-1 hover:text-white disabled:opacity-20"
                  title="Move Up"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(index, 'down')}
                  disabled={index === stats.length - 1}
                  className="p-1 hover:text-white disabled:opacity-20"
                  title="Move Down"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveStat(index)}
                  className="p-1 text-red-400 hover:text-red-300"
                  title="Delete Metric"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Metric Label
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  className="w-full px-3 py-2 bg-[#181818] border border-white/10 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Display Value (e.g. 15+)
                </label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                  className="w-full px-3 py-2 bg-[#181818] border border-white/10 rounded-lg text-white text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Description / Details
              </label>
              <input
                type="text"
                value={stat.description}
                onChange={(e) => handleStatChange(index, 'description', e.target.value)}
                className="w-full px-3 py-2 bg-[#181818] border border-white/10 rounded-lg text-white text-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
