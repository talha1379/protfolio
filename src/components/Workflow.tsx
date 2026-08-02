import React from 'react';
import { SectionHeading } from './SectionHeading';
import { workflowSteps as defaultWorkflowSteps } from '../data/workflow';
import { WorkflowStep } from '../types';
import { FileSearch, DraftingCompass, Code, CheckCircle2, Rocket, ArrowRight, Sparkles } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  FileSearch,
  DraftingCompass,
  Code,
  CheckCircle2,
  Rocket,
  Sparkles
};

interface Props {
  steps?: WorkflowStep[];
}

export const Workflow: React.FC<Props> = ({ steps = defaultWorkflowSteps }) => {
  const activeSteps = steps.length > 0 ? steps : defaultWorkflowSteps;

  return (
    <section id="workflow" className="py-20 bg-[#0A0A0A] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Development Process"
          title="How I Work"
          subtitle="A structured, step-by-step approach ensuring software quality, maintainability, and user satisfaction from initial discovery to production deployment."
        />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative">
          
          {activeSteps.map((item, index) => {
            const IconComp = iconMap[item.icon] || Code;
            const isLast = index === activeSteps.length - 1;

            return (
              <div
                key={item.step || index}
                className="relative bg-[#141414] rounded-2xl p-5 border border-white/5 hover:border-blue-500/30 transition-all duration-300 shadow-lg flex flex-col justify-between group"
              >
                {/* Step Number Badge */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-500 font-mono text-xs font-bold">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-all">
                      <IconComp className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Connector Indicator */}
                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="uppercase font-semibold tracking-wider">Phase {item.step}</span>
                  {!isLast && (
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </div>
            );
          })}

        </div>

        {/* Summary Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-[#141414] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Need a custom web solution built with this workflow?</h4>
            <p className="text-xs text-slate-400 mt-0.5">I am available for freelance projects, internships, and full-stack developer roles.</p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 shadow-md shadow-blue-600/20"
          >
            Start a Conversation
          </a>
        </div>

      </div>
    </section>
  );
};
