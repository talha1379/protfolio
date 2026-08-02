import React from 'react';

interface Props {
  badge: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<Props> = ({ badge, title, subtitle, centered = true }) => {
  return (
    <div className={`mb-10 sm:mb-14 ${centered ? 'text-center max-w-2xl mx-auto' : ''}`}>
      <div className={`inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 ${centered ? 'justify-center' : ''}`}>
        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
        {badge}
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2.5 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};
