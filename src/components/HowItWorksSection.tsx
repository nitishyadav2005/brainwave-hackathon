import React from 'react';
import { Target, Code2, Share2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Choose your track',
      description: 'Pick a challenge that matches what you want to learn.',
      icon: Target,
    },
    {
      number: '02',
      title: 'Build every day',
      description: 'Complete one practical coding task each day.',
      icon: Code2,
    },
    {
      number: '03',
      title: 'Submit your proof',
      description: 'Share your GitHub commit and LinkedIn post.',
      icon: Share2,
    },
  ];

  return (
    <section id="how-it-works" className="w-full max-w-md md:max-w-4xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="text-center mb-6 sm:mb-8">
        <span className="font-mono-code text-[11px] font-semibold text-[#505f76] tracking-widest uppercase block mb-1">
          SIMPLE DAILY SYSTEM
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1e293b] tracking-tight">
          How ABTalks works
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div
              key={step.number}
              className="clay-card-shallow p-5 flex flex-col items-start gap-3.5 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between w-full">
                <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0">
                  <span className="font-mono-code font-bold text-sm text-[#4c5b71]">
                    {step.number}
                  </span>
                </div>
                <Icon className="w-5 h-5 text-slate-400" />
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-base text-[#1e293b] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
