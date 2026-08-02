import React, { useState } from 'react';
import { SectionHeading } from './SectionHeading';
import { SkillCategory } from '../types';
import { 
  Code2, Palette, FileCode2, Atom, Layout, Smartphone, 
  Server, Cpu, Terminal, Webhook, Database, Zap, HardDrive, 
  GitBranch, Github, Code, Globe, Send, Check, Layers
} from 'lucide-react';

interface Props {
  categories: SkillCategory[];
}

// Icon mapping dictionary
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Code2,
  Palette,
  FileCode2,
  Atom,
  Layout,
  Smartphone,
  Server,
  Cpu,
  Terminal,
  Webhook,
  Database,
  Zap,
  HardDrive,
  GitBranch,
  Github,
  Code,
  Globe,
  Send,
  Layers
};

export const Skills: React.FC<Props> = ({ categories }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredCategories = activeTab === 'all' 
    ? categories 
    : categories.filter(c => c.id === activeTab);

  return (
    <section id="skills" className="py-20 bg-[#0A0A0A] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Technical Proficiency"
          title="Skills & Technologies"
          subtitle="A comprehensive overview of tools, languages, frameworks, and backend technologies I work with."
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                : 'bg-[#141414] text-slate-400 hover:text-white border border-white/5'
            }`}
          >
            All Categories ({categories.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === cat.id
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/20'
                  : 'bg-[#141414] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat.title} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-[#141414] rounded-2xl p-6 border border-white/5 shadow-lg hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {category.title}
                </h3>
                <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                  {category.skills.length} Items
                </span>
              </div>

              {/* Skill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {category.skills.map((skill) => {
                  const IconComponent = iconMap[skill.icon] || Code;
                  return (
                    <div
                      key={skill.name}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all duration-200 group flex items-center gap-3"
                    >
                      <div className="w-7 h-7 rounded bg-[#1A1A1A] border border-white/10 flex items-center justify-center text-blue-500 shrink-0 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-semibold text-slate-200 block truncate group-hover:text-blue-400 transition-colors">
                          {skill.name}
                        </span>
                        {skill.level && (
                          <span className="text-[10px] text-slate-500 block truncate">
                            {skill.level}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
