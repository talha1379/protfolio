export interface ProfileData {
  name: string;
  role: string;
  degree: string;
  university: string;
  academicPeriod: string;
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  bio: string;
  aboutText: string[];
  heroGreeting?: string;
  heroHeading?: string;
  heroSubHeading?: string;
  heroIntro?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  stats: {
    id?: string;
    label: string;
    value: string;
    description: string;
    icon?: string;
  }[];
  customProfileImage?: string | null;
  contactTitle?: string;
  contactDescription?: string;
  contactSuccessMessage?: string;
  footerText?: string;
}

export interface CustomCVData {
  fileName: string;
  fileType: string;
  dataUrl: string;
  updatedAt: string;
  fileSize?: string;
}

export interface SkillItem {
  id?: string;
  name: string;
  icon: string;
  level?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface WorkflowStep {
  id?: string;
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
  status?: 'Completed' | 'In Progress' | 'Maintained';
  displayOrder?: number;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface WebsiteSettings {
  siteTitle: string;
  metaDescription: string;
  showStats: boolean;
  showWorkflow: boolean;
  showProjects: boolean;
  showSkills: boolean;
  showContact: boolean;
  themeAccentColor: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}
