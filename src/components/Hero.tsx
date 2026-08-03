import React from "react";
import {
  Github,
  Linkedin,
  ArrowRight,
  Mail,
  Code2,
  Download,
} from "lucide-react";
import { ProfileData, CustomCVData } from "../types";
import { DefaultAvatar } from "./DefaultAvatar";

interface Props {
  profile: ProfileData;
  customCV: CustomCVData | null;
  onDownloadCV: () => void;
}

export const Hero: React.FC<Props> = ({ profile, customCV, onDownloadCV }) => {
  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden"
    >
      {/* Background Decorative Ambient Flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Intro Column (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Greeting Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141414] border border-white/10 text-slate-400 text-xs font-mono mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>{profile.heroGreeting || "Hello, I’m"}</span>
            </div>

            {/* Main Heading & Role */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none mb-3">
              {profile.name}
            </h1>

            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-500">
                {profile.role}
              </span>
              <span className="text-slate-600 font-mono text-sm hidden sm:inline">
                |
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-mono flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-blue-500" />
                {profile.degree
                  ? `${profile.degree} • ${profile.university}`
                  : "Software Developer"}
              </span>
            </div>

            {/* Introduction Paragraph */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              {profile.bio}
            </p>

            {/* Actions & Social Links */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <a
                href={profile.primaryCtaLink || "#projects"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all shadow-lg shadow-blue-600/20 active:scale-95 group"
              >
                <span>{profile.primaryCtaText || "View My Work"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={profile.secondaryCtaLink || "#contact"}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#141414] hover:bg-white/5 text-slate-200 font-semibold text-sm border border-white/10 transition-all shadow-sm active:scale-95"
              >
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{profile.secondaryCtaText || "Contact Me"}</span>
              </a>

              <div className="flex items-center gap-2 ml-auto sm:ml-2">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#141414] hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    aria-label="GitHub Profile"
                    title="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-[#141414] hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors"
                    aria-label="LinkedIn Profile"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Spec Badges */}
            <div className="pt-6 border-t border-white/5 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-400 font-mono w-full">
              <div>
                <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  Role
                </span>
                <span className="text-white font-medium">{profile.role}</span>
              </div>
              <div>
                <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  Degree
                </span>
                <span className="text-white font-medium">
                  {profile.degree || "BS Computer Science"}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                  Location
                </span>
                <span className="text-white font-medium">
                  {profile.location}
                </span>
              </div>
            </div>
          </div>

          {/* Right Profile Image Area Column (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* Circular Profile Container */}
            <div className="relative group flex flex-col items-center">
              {/* Circular Outer Accent Ring & Frame */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[350px] lg:h-[350px] p-2.5 rounded-full bg-[#141414] border-2 border-white/10 shadow-2xl shadow-black/90 ring-2 ring-blue-500/20 group-hover:ring-blue-500/40 transition-all duration-300 relative">
                {/* Inner Circle Overflow Hidden */}
                <div className="w-full h-full rounded-full overflow-hidden bg-black border border-white/10 relative flex items-center justify-center">
                  {profile.customProfileImage ? (
                    <img
                      src={profile.customProfileImage}
                      alt={profile.name}
                      className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <DefaultAvatar />
                  )}
                </div>

                {/* Status Badge */}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-[#141414]/90 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-white tracking-wide">
                    Available for Projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
