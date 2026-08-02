import React from 'react';
import { ProfileData, Project, CustomCVData, SkillCategory } from '../../types';
import { AdminTab } from './AdminSidebar';
import {
  FolderGit2,
  Code2,
  FileCheck,
  User,
  Sparkles,
  Database,
  ArrowRight,
  CheckCircle2,
  Download
} from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabase';
import { handleCVDownload } from '../../utils/cvUtils';

interface Props {
  profile: ProfileData;
  projects: Project[];
  skills: SkillCategory[];
  customCV: CustomCVData | null;
  setActiveTab: (tab: AdminTab) => void;
}

export const DashboardOverview: React.FC<Props> = ({
  profile,
  projects,
  skills,
  customCV,
  setActiveTab
}) => {
  const totalSkills = skills.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-[#121212] to-[#121212] border border-blue-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest font-mono">
              Admin Overview
            </span>
            <h2 className="text-2xl font-bold text-white font-mono mt-1">
              Welcome back, {profile.name}!
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Manage your personal portfolio content, featured software projects, technical skills, profile imagery, and PDF CV document.
            </p>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-600/20 self-start md:self-auto"
          >
            <span>View Public Site</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <FolderGit2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">{projects.length}</div>
            <div className="text-xs text-slate-400">Projects Managed</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white font-mono">{totalSkills}</div>
            <div className="text-xs text-slate-400">Total Skills</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-white font-mono truncate max-w-[120px]">
              {customCV ? customCV.fileName : 'Default Text CV'}
            </div>
            <div className="text-[11px] text-slate-400">
              {customCV ? `PDF Uploaded (${customCV.updatedAt})` : 'No Custom PDF Uploaded'}
            </div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#121212] border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-white font-mono">
              {isSupabaseConfigured ? 'Supabase Database' : 'LocalStorage Cache'}
            </div>
            <div className="text-[11px] text-slate-400">
              {isSupabaseConfigured ? 'Live Cloud Sync' : 'Ready for Supabase keys'}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts & CV Test */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Shortcuts */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Quick Content Management</span>
          </h3>
          <p className="text-xs text-slate-400">
            Select a section below to edit content live without code changes:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setActiveTab('projects')}
              className="p-4 rounded-xl bg-[#181818] hover:bg-[#202020] border border-white/5 text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Manage Projects
                </div>
                <div className="text-xs text-slate-400">Add, edit, duplicate or upload cover images</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </button>

            <button
              onClick={() => setActiveTab('cv')}
              className="p-4 rounded-xl bg-[#181818] hover:bg-[#202020] border border-white/5 text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Manage PDF CV Document
                </div>
                <div className="text-xs text-slate-400">Upload, replace, or download PDF CV</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </button>

            <button
              onClick={() => setActiveTab('general')}
              className="p-4 rounded-xl bg-[#181818] hover:bg-[#202020] border border-white/5 text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  General Info & Bio
                </div>
                <div className="text-xs text-slate-400">Update contact info, location, phone & title</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </button>

            <button
              onClick={() => setActiveTab('profile-image')}
              className="p-4 rounded-xl bg-[#181818] hover:bg-[#202020] border border-white/5 text-left transition-colors flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Profile Avatar Image
                </div>
                <div className="text-xs text-slate-400">Upload portrait image from local disk</div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
            </button>
          </div>
        </div>

        {/* CV Card Status & Test Download */}
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>Current CV Document</span>
            </h3>

            {customCV ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="truncate">{customCV.fileName}</span>
                </div>
                <p className="text-[11px] text-emerald-400/80">
                  Uploaded: {customCV.updatedAt} • Connected to portfolio
                </p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                No custom PDF file uploaded yet. The default text CV will be generated on download.
              </div>
            )}
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={() => handleCVDownload(customCV, profile.email)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Test Download CV</span>
            </button>

            <button
              onClick={() => setActiveTab('cv')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10 transition-colors"
            >
              <span>Upload / Replace CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
