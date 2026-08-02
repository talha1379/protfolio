import React from 'react';
import { Terminal } from 'lucide-react';

export const DefaultAvatar: React.FC = () => {
  return (
    <div className="relative w-full h-full rounded-full bg-[#141414] flex flex-col items-center justify-center overflow-hidden border border-white/10 shadow-inner group select-none">
      {/* Subtle Radial Grid Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Ambient Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-blue-600/10 pointer-events-none" />

      {/* Avatar Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-blue-600/15 border-2 border-blue-500/30 flex items-center justify-center mb-2 shadow-lg group-hover:scale-105 transition-transform duration-300">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wider">
            TA
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
          Talha Ahmad
        </h3>
        <p className="text-[11px] sm:text-xs text-blue-400 font-semibold uppercase tracking-wider mt-0.5">
          Full-Stack Developer
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-slate-300">
          <Terminal className="w-3 h-3 text-blue-500" />
          <span>React • Node.js</span>
        </div>
      </div>
    </div>
  );
};
