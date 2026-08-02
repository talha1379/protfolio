import React from 'react';
import {
  LayoutDashboard,
  User,
  Sparkles,
  Camera,
  FileText,
  BarChart2,
  Code2,
  Workflow,
  FolderGit2,
  Mail,
  Share2,
  FileCheck,
  Settings,
  ExternalLink,
  LogOut,
  X,
  Database
} from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabase';

export type AdminTab =
  | 'dashboard'
  | 'general'
  | 'hero'
  | 'profile-image'
  | 'about'
  | 'stats'
  | 'skills'
  | 'workflow'
  | 'projects'
  | 'contact'
  | 'socials'
  | 'cv'
  | 'settings';

interface Props {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onLogout: () => void;
  userEmail?: string;
}

const menuItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-[#141414]4" /> },
  { id: 'general', label: 'General Info', icon: <User className="w-4 h-4" /> },
  { id: 'hero', label: 'Hero Section', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'profile-image', label: 'Profile Image', icon: <Camera className="w-4 h-4" /> },
  { id: 'about', label: 'About', icon: <FileText className="w-4 h-4" /> },
  { id: 'stats', label: 'Statistics', icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'skills', label: 'Skills', icon: <Code2 className="w-4 h-4" /> },
  { id: 'workflow', label: 'Workflow', icon: <Workflow className="w-4 h-4" /> },
  { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
  { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  { id: 'socials', label: 'Social Links', icon: <Share2 className="w-4 h-4" /> },
  { id: 'cv', label: 'CV Management', icon: <FileCheck className="w-4 h-4" /> },
  { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
];

export const AdminSidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  onLogout,
  userEmail
}) => {
  const content = (
    <div className="flex flex-col h-full bg-[#121212] border-r border-white/10 text-slate-300">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold font-mono text-sm shadow-md">
            TA
          </div>
          <div>
            <h1 className="text-sm font-bold text-white font-mono leading-tight">Admin Portal</h1>
            <p className="text-[11px] text-slate-400 font-sans truncate max-w-[140px]">
              {userEmail || 'admin@talhaahmad.dev'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Supabase Indicator */}
      <div className="px-3 py-2 border-b border-white/5 bg-[#171717]">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5 font-medium">
            <Database className={`w-3.5 h-3.5 ${isSupabaseConfigured ? 'text-emerald-400' : 'text-amber-400'}`} />
            {isSupabaseConfigured ? 'Supabase Active' : 'Local Persistence'}
          </span>
          <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${isSupabaseConfigured ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
            {isSupabaseConfigured ? 'Cloud' : 'Local'}
          </span>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1 custom-scrollbar">
        <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Portfolio Sections
        </div>
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-3 border-t border-white/10 space-y-2 bg-[#101010]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          <span>Preview Live Site</span>
        </a>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold border border-red-500/20 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block w-64 flex-shrink-0 h-screen sticky top-0">
        {content}
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-64 max-w-full h-full z-10">
            {content}
          </div>
        </div>
      )}
    </>
  );
};
