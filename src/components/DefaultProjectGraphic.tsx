import React from 'react';
import { ShieldAlert, Navigation, Home, Cpu, Layers, Layout, Server, Database } from 'lucide-react';

interface Props {
  title: string;
  technologies: string[];
}

export const DefaultProjectGraphic: React.FC<Props> = ({ title, technologies }) => {
  const isRoadSafety = title.toLowerCase().includes('road') || title.toLowerCase().includes('safety');
  const isRailway = title.toLowerCase().includes('railway') || title.toLowerCase().includes('train');
  const isHostel = title.toLowerCase().includes('hostel') || title.toLowerCase().includes('student');

  return (
    <div className="relative w-full h-48 sm:h-56 bg-black border-b border-white/5 p-5 flex flex-col justify-between overflow-hidden group-hover:border-blue-500/30 transition-colors">
      {/* Background Tech Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Header Bar Mock */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-700" />
            <span className="w-2 h-2 rounded-full bg-slate-700" />
            <span className="w-2 h-2 rounded-full bg-slate-700" />
          </div>
          <span className="text-[10px] text-slate-400 bg-[#141414] px-2 py-0.5 rounded border border-white/10">
            {title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.app
          </span>
        </div>
        <div className="flex gap-1">
          {technologies.slice(0, 2).map((tech) => (
            <span key={tech} className="text-[10px] px-2 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-500/30">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Center Dynamic Visual Mockup */}
      <div className="my-auto z-10 flex items-center justify-center py-2">
        {isRoadSafety && (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-900/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg mb-2">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white">{title}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">React.js • Tailwind • Supabase</span>
          </div>
        )}

        {isRailway && (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-900/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg mb-2">
              <Navigation className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white">{title}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Route Automation & Passenger Logs</span>
          </div>
        )}

        {isHostel && (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-900/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg mb-2">
              <Home className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white">{title}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Occupancy Records & Fee Tracking</span>
          </div>
        )}

        {!isRoadSafety && !isRailway && !isHostel && (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-900/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg mb-2">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-white">{title}</span>
            <span className="text-[10px] text-slate-400 mt-0.5">Full-Stack Application</span>
          </div>
        )}
      </div>

      {/* Bottom Mock Stats Bar */}
      <div className="w-full z-10 grid grid-cols-3 gap-2 text-[10px] text-slate-400 bg-[#141414] rounded-lg p-2 border border-white/5">
        <div className="flex items-center gap-1">
          <Layout className="w-3 h-3 text-blue-400" />
          <span>UI: React</span>
        </div>
        <div className="flex items-center gap-1 justify-center">
          <Server className="w-3 h-3 text-blue-400" />
          <span>API: REST</span>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <Database className="w-3 h-3 text-blue-400" />
          <span>DB: Sync</span>
        </div>
      </div>
    </div>
  );
};
