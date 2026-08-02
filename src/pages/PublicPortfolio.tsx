import React, { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialProfileData } from '../data/profile';
import { initialSkillsData } from '../data/skills';
import { initialProjectsData } from '../data/projects';
import { workflowSteps as initialWorkflowData } from '../data/workflow';
import { initialWebsiteSettings } from '../data/settings';
import { ProfileData, SkillCategory, Project, WorkflowStep, WebsiteSettings, CustomCVData } from '../types';
import { handleCVDownload } from '../utils/cvUtils';
import { portfolioService } from '../services/portfolioService';

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { Workflow } from '../components/Workflow';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const PublicPortfolio: React.FC = () => {
  const [profile, setProfile] = useLocalStorage<ProfileData>('talha_portfolio_profile', initialProfileData);
  const [skills, setSkills] = useLocalStorage<SkillCategory[]>('talha_portfolio_skills', initialSkillsData);
  const [projects, setProjects] = useLocalStorage<Project[]>('talha_portfolio_projects', initialProjectsData);
  const [workflow, setWorkflow] = useLocalStorage<WorkflowStep[]>('talha_portfolio_workflow', initialWorkflowData);
  const [settings, setSettings] = useLocalStorage<WebsiteSettings>('talha_portfolio_settings', initialWebsiteSettings);
  const [customCV, setCustomCV] = useLocalStorage<CustomCVData | null>('talha_portfolio_custom_cv', null);

  // Sync from Supabase cloud database if available
  useEffect(() => {
    portfolioService.loadFromSupabase<ProfileData>('profile').then((data) => data && setProfile(data));
    portfolioService.loadFromSupabase<SkillCategory[]>('skills').then((data) => data && setSkills(data));
    portfolioService.loadFromSupabase<Project[]>('projects').then((data) => data && setProjects(data));
    portfolioService.loadFromSupabase<WorkflowStep[]>('workflow').then((data) => data && setWorkflow(data));
    portfolioService.loadFromSupabase<WebsiteSettings>('settings').then((data) => data && setSettings(data));
    portfolioService.loadFromSupabase<CustomCVData>('custom_cv').then((data) => data && setCustomCV(data));
  }, []);

  // Set browser tab title dynamically
  useEffect(() => {
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }
  }, [settings.siteTitle]);

  const triggerDownload = () => {
    handleCVDownload(customCV, profile.email);
  };

  const visibleProjects = projects.filter((p) => p.featured !== false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-300 font-sans selection:bg-blue-600 selection:text-white antialiased">
      
      {/* Navigation Bar */}
      <Navbar
        customCV={customCV}
        onDownloadCV={triggerDownload}
        brandName={profile.name || "TALHA AHMAD"}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          profile={profile}
          customCV={customCV}
          onDownloadCV={triggerDownload}
        />

        {/* 2. About Section */}
        <About profile={profile} />

        {/* 3. Skills Section */}
        {settings.showSkills !== false && (
          <Skills categories={skills} />
        )}

        {/* 4. Workflow / How I Work Section */}
        {settings.showWorkflow !== false && (
          <Workflow steps={workflow} />
        )}

        {/* 5. Projects Section */}
        {settings.showProjects !== false && (
          <Projects projects={visibleProjects} />
        )}

        {/* 6. Contact Section */}
        {settings.showContact !== false && (
          <Contact profile={profile} />
        )}
      </main>

      {/* Footer */}
      <Footer profile={profile} />

    </div>
  );
};
