import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialProfileData } from '../data/profile';
import { initialProjectsData } from '../data/projects';
import { initialSkillsData } from '../data/skills';
import { workflowSteps as initialWorkflowData } from '../data/workflow';
import { initialSocialLinks } from '../data/socials';
import { initialWebsiteSettings } from '../data/settings';
import { ProfileData, Project, SkillCategory, WorkflowStep, SocialLink, WebsiteSettings, CustomCVData } from '../types';
import { portfolioService } from '../services/portfolioService';

import { AdminSidebar, AdminTab } from '../components/admin/AdminSidebar';
import { DashboardOverview } from '../components/admin/DashboardOverview';
import { GeneralInfoEditor } from '../components/admin/GeneralInfoEditor';
import { HeroEditor } from '../components/admin/HeroEditor';
import { ProfileImageEditor } from '../components/admin/ProfileImageEditor';
import { AboutEditor } from '../components/admin/AboutEditor';
import { StatsEditor } from '../components/admin/StatsEditor';
import { SkillsEditor } from '../components/admin/SkillsEditor';
import { WorkflowEditor } from '../components/admin/WorkflowEditor';
import { ProjectsEditor } from '../components/admin/ProjectsEditor';
import { ContactEditor } from '../components/admin/ContactEditor';
import { SocialsEditor } from '../components/admin/SocialsEditor';
import { CVManagementEditor } from '../components/admin/CVManagementEditor';
import { WebsiteSettingsEditor } from '../components/admin/WebsiteSettingsEditor';

import { Menu } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Local state + storage hooks
  const [profile, setProfile] = useLocalStorage<ProfileData>('talha_portfolio_profile', initialProfileData);
  const [projects, setProjects] = useLocalStorage<Project[]>('talha_portfolio_projects', initialProjectsData);
  const [skills, setSkills] = useLocalStorage<SkillCategory[]>('talha_portfolio_skills', initialSkillsData);
  const [workflow, setWorkflow] = useLocalStorage<WorkflowStep[]>('talha_portfolio_workflow', initialWorkflowData);
  const [socials, setSocials] = useLocalStorage<SocialLink[]>('talha_portfolio_socials', initialSocialLinks);
  const [settings, setSettings] = useLocalStorage<WebsiteSettings>('talha_portfolio_settings', initialWebsiteSettings);
  const [customCV, setCustomCV] = useLocalStorage<CustomCVData | null>('talha_portfolio_custom_cv', null);

  // Load cloud updates from Supabase if available
  useEffect(() => {
    portfolioService.loadFromSupabase<ProfileData>('profile').then((data) => data && setProfile(data));
    portfolioService.loadFromSupabase<Project[]>('projects').then((data) => data && setProjects(data));
    portfolioService.loadFromSupabase<SkillCategory[]>('skills').then((data) => data && setSkills(data));
    portfolioService.loadFromSupabase<WorkflowStep[]>('workflow').then((data) => data && setWorkflow(data));
    portfolioService.loadFromSupabase<SocialLink[]>('socials').then((data) => data && setSocials(data));
    portfolioService.loadFromSupabase<WebsiteSettings>('settings').then((data) => data && setSettings(data));
    portfolioService.loadFromSupabase<CustomCVData>('custom_cv').then((data) => data && setCustomCV(data));
  }, []);

  // Save Handlers (Persists to localStorage and syncs to Supabase)
  const handleSaveProfile = (updated: ProfileData) => {
    setProfile(updated);
    portfolioService.syncToSupabase('profile', updated);
  };

  const handleSaveProjects = (updated: Project[]) => {
    setProjects(updated);
    portfolioService.syncToSupabase('projects', updated);
  };

  const handleSaveSkills = (updated: SkillCategory[]) => {
    setSkills(updated);
    portfolioService.syncToSupabase('skills', updated);
  };

  const handleSaveWorkflow = (updated: WorkflowStep[]) => {
    setWorkflow(updated);
    portfolioService.syncToSupabase('workflow', updated);
  };

  const handleSaveSocials = (updated: SocialLink[]) => {
    setSocials(updated);
    portfolioService.syncToSupabase('socials', updated);
  };

  const handleSaveSettings = (updated: WebsiteSettings) => {
    setSettings(updated);
    portfolioService.syncToSupabase('settings', updated);
  };

  const handleSaveCV = (updated: CustomCVData | null) => {
    setCustomCV(updated);
    portfolioService.syncToSupabase('custom_cv', updated);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-200 flex flex-col lg:flex-row font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Sidebar Navigation */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onLogout={logout}
        userEmail={user?.email}
      />

      {/* Main Admin View Container */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Mobile Header */}
        <header className="lg:hidden p-4 bg-[#121212] border-b border-white/10 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-mono font-bold text-sm text-white">Admin Dashboard</span>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-blue-400 uppercase tracking-wider bg-blue-600/10 px-3 py-1.5 rounded-lg border border-blue-500/30"
          >
            Preview Site
          </a>
        </header>

        {/* Content Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              profile={profile}
              projects={projects}
              skills={skills}
              customCV={customCV}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'general' && (
            <GeneralInfoEditor profile={profile} onSave={handleSaveProfile} />
          )}

          {activeTab === 'hero' && (
            <HeroEditor profile={profile} onSave={handleSaveProfile} />
          )}

          {activeTab === 'profile-image' && (
            <ProfileImageEditor profile={profile} onSave={handleSaveProfile} />
          )}

          {activeTab === 'about' && (
            <AboutEditor profile={profile} onSave={handleSaveProfile} />
          )}

          {activeTab === 'stats' && (
            <StatsEditor profile={profile} onSave={handleSaveProfile} />
          )}

          {activeTab === 'skills' && (
            <SkillsEditor skillsData={skills} onSave={handleSaveSkills} />
          )}

          {activeTab === 'workflow' && (
            <WorkflowEditor workflowSteps={workflow} onSave={handleSaveWorkflow} />
          )}

          {activeTab === 'projects' && (
            <ProjectsEditor projects={projects} onSave={handleSaveProjects} />
          )}

          {activeTab === 'contact' && (
            <ContactEditor profile={profile} onSave={handleSaveProfile} />
          )}

          {activeTab === 'socials' && (
            <SocialsEditor socials={socials} onSave={handleSaveSocials} />
          )}

          {activeTab === 'cv' && (
            <CVManagementEditor
              customCV={customCV}
              onUpdateCV={handleSaveCV}
              userEmail={profile.email}
            />
          )}

          {activeTab === 'settings' && (
            <WebsiteSettingsEditor settings={settings} onSave={handleSaveSettings} />
          )}
        </main>
      </div>
    </div>
  );
};
