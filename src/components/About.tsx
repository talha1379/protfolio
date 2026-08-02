import React from 'react';
import { SectionHeading } from './SectionHeading';
import { ProfileData } from '../types';
import { GraduationCap, Code2, Cpu, Sparkles, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';

interface Props {
  profile: ProfileData;
}

export const About: React.FC<Props> = ({ profile }) => {
  return (
    <section id="about" className="py-20 bg-[#0A0A0A] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="About Me"
          title="Software Engineer & Computer Science Student"
          subtitle="Passionate about architecture, clean code practices, and building functional applications that solve real-world problems."
        />

        {/* Top Highlight Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {profile.stats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-6 rounded-2xl bg-[#141414] border border-white/5 border-l-2 border-l-blue-500 transition-all duration-300 shadow-md group"
            >
              <span className="text-3xl sm:text-4xl font-extrabold text-white block mb-1">
                {stat.value}
              </span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-blue-500 transition-colors">
                {stat.label}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Bio Content (7 cols on lg) */}
          <div className="lg:col-span-7 bg-[#141414] rounded-2xl p-6 sm:p-8 border border-white/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">
                <UserCheck className="w-4 h-4" />
                <span>PROFILE OVERVIEW</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Full-Stack Development with a CS Foundation
              </h3>

              <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed">
                {profile.aboutText.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-slate-300 border border-white/10 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                Clean Code Architecture
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-slate-300 border border-white/10 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                Responsive Web Design
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 text-slate-300 border border-white/10 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                RESTful APIs & DBs
              </span>
            </div>
          </div>

          {/* Key Academic & Focus Highlights (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            <div className="p-6 rounded-2xl bg-[#141414] border border-white/5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-900/20 text-blue-500 border border-blue-500/20 shrink-0">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Core Technical Expertise</h4>
                <p className="text-xs text-blue-500 font-medium mt-0.5">Computer Science Fundamentals</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Proficient in software engineering principles, algorithm optimization, software design patterns, database architecture, and full-stack web development.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-900/20 text-blue-500 border border-blue-500/20 shrink-0">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Development Philosophy</h4>
                <p className="text-xs text-blue-500 font-medium mt-0.5">Practical & Scalable</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Building software isn't just about syntax — it's about engineering intuitive user experiences, writing maintainable modules, and ensuring seamless API and database integration.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#141414] border border-white/5 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-900/20 text-blue-500 border border-blue-500/20 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Continuous Growth</h4>
                <p className="text-xs text-blue-500 font-medium mt-0.5">Always Evolving</p>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Regularly exploring emerging web frameworks, serverless deployments, data structures, and contributing to open projects to continuously elevate code quality.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
