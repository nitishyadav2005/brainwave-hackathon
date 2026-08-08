import React, { useState } from 'react';
import { GridDayState } from '../types';
import { Check, Flame } from 'lucide-react';

export const MomentumGridSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(12);

  // Generate 60 days state as specified: Days 1-11 completed, Day 12 current, 13-60 upcoming
  const days: GridDayState[] = Array.from({ length: 60 }, (_, index) => {
    const day = index + 1;
    if (day <= 11) {
      return {
        day,
        status: 'completed',
        title: `Day ${day}: Completed submission`,
      };
    } else if (day === 12) {
      return {
        day,
        status: 'current',
        title: 'Day 12: Build something useful with an API (Active)',
      };
    } else {
      return {
        day,
        status: 'upcoming',
        title: `Day ${day}: Upcoming Challenge`,
      };
    }
  });

  const currentSelectedDayObj = days.find((d) => d.day === selectedDay);

  return (
    <section className="px-4 py-4 max-w-md md:max-w-2xl mx-auto">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-3 px-1">
        <div>
          <h2 className="text-xl font-bold text-[#1e293b] tracking-tight">
            Visualizing Momentum
          </h2>
        </div>
        <span className="font-mono-code text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
          THE 60-DAY GRID
        </span>
      </div>

      {/* Grid Container Card */}
      <div className="clay-card-shallow p-5 sm:p-6">
        {/* 60-Day Grid: 6 cols x 10 rows for 390px mobile view */}
        <div className="grid grid-cols-6 gap-2 sm:gap-2.5 max-w-xs sm:max-w-sm mx-auto">
          {days.map((item) => {
            const isCompleted = item.status === 'completed';
            const isCurrent = item.status === 'current';
            const isSelected = selectedDay === item.day;

            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                title={`Day ${item.day}: ${item.status}`}
                className={`
                  aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono-code font-bold transition-all relative cursor-pointer
                  ${
                    isCompleted
                      ? 'bg-[#505f76] text-white shadow-xs border border-[#4c5b71]'
                      : isCurrent
                      ? 'bg-[#64748b] text-white shadow-md ring-2 ring-[#4c5b71] ring-offset-2 ring-offset-white animate-pulse'
                      : 'bg-[#e0e3e5] text-slate-400 hover:bg-slate-200 border border-slate-200/60'
                  }
                  ${isSelected ? 'scale-105 z-10 ring-2 ring-slate-800' : ''}
                `}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : isCurrent ? (
                  <span className="relative flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-amber-300 relative" />
                  </span>
                ) : (
                  <span>{item.day}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Day Tooltip Banner */}
        {currentSelectedDayObj && (
          <div className="mt-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-center text-xs text-slate-700 font-medium transition-all">
            {currentSelectedDayObj.status === 'completed' && (
              <span className="flex items-center justify-center gap-1.5 text-emerald-700 font-semibold">
                <Check className="w-3.5 h-3.5" /> Day {currentSelectedDayObj.day} Completed — GitHub & LinkedIn Proof Verified
              </span>
            )}
            {currentSelectedDayObj.status === 'current' && (
              <span className="flex items-center justify-center gap-1.5 text-indigo-700 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Day {currentSelectedDayObj.day} Active — "Build something useful with an API"
              </span>
            )}
            {currentSelectedDayObj.status === 'upcoming' && (
              <span className="text-slate-500">
                Day {currentSelectedDayObj.day} — Unlocks after completing previous day
              </span>
            )}
          </div>
        )}

        {/* Grid Footer Legend */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#e0e3e5] border border-slate-300 inline-block" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#505f76] inline-block" />
            <span>Completed (11/60)</span>
          </div>
        </div>

        {/* Mandatory Quote Under Grid */}
        <p className="mt-4 text-center text-xs font-semibold text-slate-500 italic">
          “Every square is a day you showed up.”
        </p>
      </div>
    </section>
  );
};
