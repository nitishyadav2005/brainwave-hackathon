import React from 'react';
import { Check, Flame } from 'lucide-react';

export const JourneyMomentumSection: React.FC = () => {
  const totalDays = 60;
  const currentDay = 12;
  const completedDays = currentDay - 1; // 11
  const completionPercentage = Math.round((currentDay / totalDays) * 100); // 20%

  return (
    <section className="px-4 py-5 max-w-md md:max-w-2xl mx-auto">
      <div className="clay-card-shallow p-4 sm:p-5 relative overflow-hidden">
        {/* Header Label, Heading & Supporting Text */}
        <div className="text-center mb-4">
          <span className="font-mono-code text-[11px] font-semibold text-[#505f76] tracking-widest uppercase block mb-1">
            VISUALIZING MOMENTUM
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
            Your 60-day journey.
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Every square is a day you showed up.
          </p>
        </div>

        {/* 60-Cell Grid: Exactly 6 columns x 10 rows */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2 my-4">
          {Array.from({ length: totalDays }, (_, i) => {
            const day = i + 1;
            const isCompleted = day < currentDay; // Days 1 to 11
            const isCurrent = day === currentDay; // Day 12

            if (isCompleted) {
              return (
                <div
                  key={day}
                  title={`Day ${day}: Completed`}
                  className="bg-[#d3e4fe] border border-blue-200/80 text-[#0b1c30] flex items-center justify-center font-mono-code text-[10px] sm:text-xs font-bold h-7 sm:h-8 rounded-md transition-all hover:scale-105"
                >
                  <Check className="w-3.5 h-3.5 text-[#0b1c30]" />
                </div>
              );
            }

            if (isCurrent) {
              return (
                <div
                  key={day}
                  title={`Day ${day}: Today's Active Mission`}
                  className="bg-[#4c5b71] text-white flex items-center justify-center font-mono-code text-[11px] sm:text-xs font-extrabold h-7 sm:h-8 rounded-md shadow-sm ring-2 ring-[#4c5b71] ring-offset-1 scale-105 z-10 transition-all"
                >
                  {day}
                </div>
              );
            }

            return (
              <div
                key={day}
                title={`Day ${day}: Upcoming`}
                className="bg-slate-100/90 text-slate-400 border border-slate-200/60 flex items-center justify-center font-mono-code text-[10px] sm:text-xs font-medium h-7 sm:h-8 rounded-md"
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* Stats & Subtle Progress Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-2">
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {completedDays} days completed
            </span>
            <span className="font-mono-code text-[11px] text-slate-500">
              12 / 60 days
            </span>
            <span className="font-bold text-[#4c5b71]">
              {completionPercentage}% complete
            </span>
          </div>

          {/* Subtle Progress Bar */}
          <div className="w-full bg-slate-100 border border-slate-200/80 h-2 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-[#4c5b71] h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
