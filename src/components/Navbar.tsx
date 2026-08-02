import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ChevronRight, UserCheck } from 'lucide-react';
import { CustomCVData } from '../types';
import { useAuth } from '../context/AuthContext';

interface Props {
  customCV: CustomCVData | null;
  onDownloadCV: () => void;
  brandName?: string;
}

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'How I Work', href: '#workflow' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

export const Navbar: React.FC<Props> = ({ customCV, onDownloadCV, brandName = "TALHA AHMAD" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = navItems.map(item => item.href.replace('#', ''));
      const scrollPosition = window.scrollY + 120;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Personal Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1"
        >
          <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xl tracking-wider shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
            {brandName.substring(0, 2).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight leading-tight text-white group-hover:text-blue-400 transition-colors uppercase">
              {brandName}
            </span>
            <span className="text-[10px] text-slate-400 leading-tight">
              Full-Stack Developer
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#141414] px-4 py-2 rounded-2xl border border-white/5 backdrop-blur-sm text-xs font-medium uppercase tracking-widest text-slate-400">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-3 py-1 rounded transition-all duration-200 ${
                  isActive
                    ? 'text-blue-500 font-bold'
                    : 'hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated && (
            <a
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 font-bold text-xs border border-blue-500/30 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </a>
          )}

          <button
            onClick={onDownloadCV}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
            title={customCV ? `Download ${customCV.fileName}` : 'Download CV'}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CV</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onDownloadCV}
            className="p-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
            aria-label="Download CV"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs">CV</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-[#141414] border border-white/10 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/95 border-b border-white/10 backdrop-blur-xl px-4 pt-3 pb-6 shadow-2xl animate-fadeIn">
          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-500 border border-blue-500/30 font-bold'
                      : 'text-slate-300 hover:bg-[#141414] hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadCV();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>

              {isAuthenticated ? (
                <a
                  href="/admin"
                  className="w-full text-center py-2.5 rounded-xl bg-white/5 text-blue-400 font-bold text-xs border border-white/10"
                >
                  Open Admin Dashboard
                </a>
              ) : (
                <a
                  href="/login"
                  className="w-full text-center py-2.5 rounded-xl bg-white/5 text-slate-400 font-semibold text-xs border border-white/10"
                >
                  Admin Login
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
