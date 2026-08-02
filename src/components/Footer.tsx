import React, { useState, useEffect } from 'react';
import { ProfileData } from '../types';
import { Github, Linkedin, ArrowUp, Heart, Code2 } from 'lucide-react';

interface Props {
  profile: ProfileData;
}

export const Footer: React.FC<Props> = ({ profile }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-16 pb-12 text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                TA
              </div>
              <span className="text-lg font-bold text-white">
                Talha Ahmad
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Full-Stack Developer and Computer Science student at CECOS University (2024–2028). Building practical, scalable, and responsive web applications.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#141414] hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-blue-500" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-[#141414] hover:bg-white/5 text-slate-300 hover:text-white border border-white/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-blue-500" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs font-medium">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">About Me</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-blue-400 transition-colors">How I Work</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Professional Info */}
          <div className="md:col-span-3 space-y-2 text-xs text-slate-400">
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">
              Professional Details
            </h4>
            <p className="text-slate-300 font-semibold">Full-Stack Web Engineering</p>
            <p>React • Node.js • Supabase</p>
            <p>Khyber Pakhtunkhwa, PK</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Talha Ahmad. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Designed & Built with React & Tailwind</span>
          </p>
        </div>

      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Back to top"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}
    </footer>
  );
};
