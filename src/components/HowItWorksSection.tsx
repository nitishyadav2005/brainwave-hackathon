import React from 'react';
import { Target, Code2, Share2, Github, Linkedin, ArrowRight } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'CHOOSE YOUR TRACK',
      description: 'Pick a challenge track that matches what you want to learn.',
      icon: Target,
    },
    {
      number: '02',
      title: 'BUILD EVERY DAY',
      description: 'Complete one practical coding task and keep your learning streak alive.',
      icon: Code2,
    },
    {
      number: '03',
      title: 'PROVE YOUR WORK',
      description: 'Submit your GitHub commit and LinkedIn post.',
      icon: Share2,
      isSpecial: true,
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Section Header */}
      <div className="text-center mb-6 sm:mb-8">
        <span className="font-mono-code text-[11px] font-semibold text-[#505f76] tracking-widest uppercase block mb-1.5">
          THE DAILY SYSTEM
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1e293b] tracking-tight leading-tight">
          Build it. Prove it. Repeat.
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
          Every day, you complete one practical coding task and submit proof of what you built.
        </p>

        {/* Visual Hierarchy Flow Badge: BUILD -> PROVE -> REPEAT */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/60 border border-slate-300/60 text-[11px] font-mono-code font-bold text-[#4c5b71] mt-3">
          <span>BUILD</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span>PROVE</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span>REPEAT</span>
        </div>
      </div>

      {/* 3 Compact Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className={`clay-card-shallow p-5 flex flex-col justify-between transition-all ${
                step.isSpecial ? 'ring-1 ring-slate-300 bg-slate-50/50' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between w-full mb-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0">
                    <span className="font-mono-code font-bold text-xs text-[#4c5b71]">
                      {step.number}
                    </span>
                  </div>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm text-[#1e293b] mb-1.5 tracking-tight uppercase font-mono-code">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Visual Emphasis for Step 3: GitHub + LinkedIn */}
              {step.isSpecial && (
                <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-2">
                  <span className="text-[10px] font-mono-code font-bold text-slate-500 uppercase shrink-0">
                    PROOF:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono-code font-bold text-slate-800 shadow-xs">
                      <Github className="w-3 h-3" /> GitHub
                    </span>
                    <span className="text-slate-300 font-mono-code text-xs">+</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-[11px] font-mono-code font-bold text-blue-800 shadow-xs">
                      <Linkedin className="w-3 h-3 text-[#0a66c2]" /> LinkedIn
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
