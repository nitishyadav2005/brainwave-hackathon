import React from 'react';
import { Check, Flame } from 'lucide-react';

export const JourneyMomentumSection: React.FC = () => {
  const totalDays = 60;
  const currentDay = 12;

  return (
    <section className="px-4 py-4 max-w-md md:max-w-2xl mx-auto">
      <div className="clay-card-shallow p-4 sm:p-5 relative overflow-hidden">
        {/* Header Label & Heading */}
        <div className="text-center mb-4">
          <span className="font-mono-code text-[11px] font-semibold text-[#505f76] tracking-widest uppercase block mb-1">
            VISUALIZING MOMENTUM
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
            Your 60-day journey.
          </h2>
        </div>

        {/* Compact 60-Cell Grid (10 columns x 6 rows) */}
        <div className="grid grid-cols-10 gap-1 sm:gap-1.5">
          {Array.from({ length: totalDays }, (_, i) => {
            const day = i + 1;
            const isCompleted = day < currentDay; // Days 1 to 11
            const isCurrent = day === currentDay; // Day 12

            if (isCompleted) {
              return (
                <div
                  key={day}
                  title={`Day ${day}: Completed`}
                  className="bg-[#d3e4fe] border border-blue-200/80 text-[#0b1c30] flex items-center justify-center font-mono-code text-[9px] sm:text-[10px] font-bold h-6 sm:h-7 rounded-md transition-all hover:scale-105"
                >
                  <Check className="w-3 h-3 text-[#0b1c30]" />
                </div>
              );
            }

            if (isCurrent) {
              return (
                <div
                  key={day}
                  title={`Day ${day}: Today's Active Mission`}
                  className="bg-[#4c5b71] text-white flex items-center justify-center font-mono-code text-[10px] sm:text-xs font-extrabold h-6 sm:h-7 rounded-md shadow-sm ring-2 ring-[#4c5b71] ring-offset-1 scale-105 z-10 transition-all"
                >
                  {day}
                </div>
              );
            }

            return (
              <div
                key={day}
                title={`Day ${day}: Upcoming`}
                className="bg-slate-100/90 text-slate-400 border border-slate-200/60 flex items-center justify-center font-mono-code text-[9px] sm:text-[10px] font-medium h-6 sm:h-7 rounded-md"
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Supporting Caption */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <p className="font-medium text-slate-600">
            Every square is a day you showed up.
          </p>
          <span className="font-mono-code text-[11px] font-semibold text-[#4c5b71] flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full">
            <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
            11/60
          </span>
        </div>
      </div>
    </section>
  );
};
