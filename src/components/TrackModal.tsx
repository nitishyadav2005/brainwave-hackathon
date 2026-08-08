import React, { useState } from 'react';
import { CODING_TRACKS } from '../data/mockData';
import { TrackOption } from '../types';
import { X, Check, ArrowRight, Sparkles, BookOpen, Clock } from 'lucide-react';

interface TrackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackModal: React.FC<TrackModalProps> = ({ isOpen, onClose }) => {
  const [selectedTrack, setSelectedTrack] = useState<TrackOption>(CODING_TRACKS[0]);
  const [enrolled, setEnrolled] = useState(false);

  if (!isOpen) return null;

  const handleEnroll = () => {
    setEnrolled(true);
    setTimeout(() => {
      setEnrolled(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-[#f8f9fb]">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-mono-code font-bold text-[#505f76] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-500" />
              CHOOSE YOUR 60-DAY TRACK
            </div>
            <h3 className="font-extrabold text-lg text-[#1e293b]">
              Select Challenge Track
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {enrolled ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl animate-bounce">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <h4 className="text-xl font-extrabold text-[#1e293b]">
                Challenge Enrolled! 🎉
              </h4>
              <p className="text-sm text-slate-600 max-w-xs mx-auto">
                You selected <strong className="text-[#1e293b]">{selectedTrack.title}</strong>. Day 01 instructions are ready!
              </p>
              <div className="p-3 bg-slate-50 rounded-xl text-xs font-mono-code text-slate-500 max-w-xs mx-auto border border-slate-200">
                Starting Day 01: Environment Setup & First Commit
              </div>
            </div>
          ) : (
            <>
              {/* Track Selection Cards */}
              <div className="space-y-2.5">
                {CODING_TRACKS.map((track) => {
                  const isSelected = selectedTrack.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => setSelectedTrack(track)}
                      className={`
                        p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3
                        ${
                          isSelected
                            ? 'bg-slate-50/90 border-[#4c5b71] shadow-xs'
                            : 'bg-white border-slate-200/80 hover:border-slate-300'
                        }
                      `}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${isSelected ? 'border-[#4c5b71] bg-[#4c5b71]' : 'border-slate-300'}`}>
                        {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-bold text-sm text-[#1e293b]">
                            {track.title}
                          </h4>
                          <span className="text-[10px] font-mono-code font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {track.badge}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                          {track.tagline}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {track.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-slate-100 text-slate-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Featured Project Preview */}
              <div className="p-3.5 rounded-xl bg-[#f8f9fb] border border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1e293b] mb-1">
                  <BookOpen className="w-3.5 h-3.5 text-[#4c5b71]" />
                  <span>Capstone Portfolio Project:</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {selectedTrack.featuredProject}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] font-mono-code text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> 60 Daily Submissions
                  </span>
                  <span>•</span>
                  <span>GitHub + LinkedIn</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!enrolled && (
          <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleEnroll}
              className="flex-1 clay-btn-primary px-5 py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Confirm & Start Day 01</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
