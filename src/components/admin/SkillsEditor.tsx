import React, { useState } from 'react';
import { SkillCategory, SkillItem } from '../../types';
import { Save, Plus, Trash2, CheckCircle2, Code2 } from 'lucide-react';

interface Props {
  skillsData: SkillCategory[];
  onSave: (updated: SkillCategory[]) => void;
}

export const SkillsEditor: React.FC<Props> = ({ skillsData, onSave }) => {
  const [categories, setCategories] = useState<SkillCategory[]>([...skillsData]);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Category Actions
  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: 'cat-' + Date.now(),
      title: 'New Skill Category',
      skills: [
        { id: 'sk-1', name: 'Sample Skill', icon: 'Code2', level: 'Intermediate' }
      ]
    };
    setCategories([...categories, newCat]);
  };

  const handleCategoryTitleChange = (catIdx: number, title: string) => {
    const updated = [...categories];
    updated[catIdx].title = title;
    setCategories(updated);
  };

  const handleRemoveCategory = (catIdx: number) => {
    setCategories(categories.filter((_, i) => i !== catIdx));
  };

  // Skill Item Actions
  const handleAddSkillItem = (catIdx: number) => {
    const updated = [...categories];
    const newSkill: SkillItem = {
      id: 'sk-' + Date.now(),
      name: 'New Skill',
      icon: 'Code2',
      level: 'Advanced'
    };
    updated[catIdx].skills.push(newSkill);
    setCategories(updated);
  };

  const handleSkillItemChange = (catIdx: number, skillIdx: number, field: keyof SkillItem, value: string) => {
    const updated = [...categories];
    updated[catIdx].skills[skillIdx] = {
      ...updated[catIdx].skills[skillIdx],
      [field]: value
    };
    setCategories(updated);
  };

  const handleRemoveSkillItem = (catIdx: number, skillIdx: number) => {
    const updated = [...categories];
    updated[catIdx].skills = updated[catIdx].skills.filter((_, i) => i !== skillIdx);
    setCategories(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(categories);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white font-mono">Skills & Technology Editor</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Organize frontend, backend, database, and dev tools categories and individual skill badges.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold text-xs border border-white/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
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
          <span>Skills and categories saved successfully!</span>
        </div>
      )}

      <div className="space-y-6">
        {categories.map((category, catIdx) => (
          <div key={category.id || catIdx} className="p-5 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
            
            {/* Category Header */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Category Title
                </label>
                <input
                  type="text"
                  value={category.title}
                  onChange={(e) => handleCategoryTitleChange(catIdx, e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#181818] border border-white/10 rounded-xl text-white font-bold text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <button
                  type="button"
                  onClick={() => handleAddSkillItem(catIdx)}
                  className="px-3 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-xs font-semibold border border-blue-500/20 flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>

                {categories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveCategory(catIdx)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs border border-red-500/20 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Skill Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="p-3 rounded-xl bg-[#181818] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Code2 className="w-3 h-3 text-blue-400" />
                      Skill #{skillIdx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkillItem(catIdx, skillIdx)}
                      className="text-red-400 hover:text-red-300 text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Skill name (e.g. React.js)"
                    value={skill.name}
                    onChange={(e) => handleSkillItemChange(catIdx, skillIdx, 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-[#121212] border border-white/10 rounded text-white text-xs"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Icon name (e.g. Code2)"
                      value={skill.icon || ''}
                      onChange={(e) => handleSkillItemChange(catIdx, skillIdx, 'icon', e.target.value)}
                      className="w-full px-2 py-1 bg-[#121212] border border-white/10 rounded text-slate-300 text-[11px]"
                    />
                    <input
                      type="text"
                      placeholder="Level (e.g. Advanced)"
                      value={skill.level || ''}
                      onChange={(e) => handleSkillItemChange(catIdx, skillIdx, 'level', e.target.value)}
                      className="w-full px-2 py-1 bg-[#121212] border border-white/10 rounded text-slate-300 text-[11px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
