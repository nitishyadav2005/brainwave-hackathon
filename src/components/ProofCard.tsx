import React, { useState } from 'react';
import { Check, Flame, Share2, Copy } from 'lucide-react';
import { UserProfile } from '../types';

interface ProofCardProps {
  dayNumber: number;
  missionTitle: string;
  user: UserProfile | null;
  completionPercentage: number;
  githubRepo?: string;
  linkedinPost?: string;
}

export const ProofCard: React.FC<ProofCardProps> = ({
  dayNumber,
  missionTitle,
  user,
  completionPercentage,
}) => {
  const [shareCopied, setShareCopied] = useState(false);
  const [copyCopied, setCopyCopied] = useState(false);

  const userName = user?.name || 'Nitish';
  const userTrack = user?.track || 'Full Stack Development';
  const userCollege = user?.college || 'ABES Engineering College';

  const shareText = `Day ${dayNumber} of my ABTalks coding challenge complete! 🔥\n\nI built something useful with an API and maintained my ${dayNumber}-day streak.\n\n#ABTalks #60DayChallenge #BuildInPublic`;

  const copyText = `ABTalks — Day ${dayNumber} / 60 ✓\n\n${missionTitle}\nGitHub ✓\nLinkedIn ✓\n${dayNumber} Day Streak 🔥\n\n${userName}\n${userTrack}\n\n#ABTalks #60DayChallenge #BuildInPublic`;

  const handleShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `ABTalks - Day ${dayNumber} Complete`,
          text: shareText,
        });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareText);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopyCopied(true);
      setTimeout(() => setCopyCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-3.5 text-left pt-1">
      {/* SECTION HEADER */}
      <div className="space-y-0.5">
        <h3 className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] uppercase tracking-wider">
          YOUR PROOF OF WORK
        </h3>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          “You showed up. You built it. Now make your progress visible.”
        </p>
      </div>

      {/* THE PROOF CARD */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4 relative overflow-hidden">
        {/* Top Header: Brand & Day Badge */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="font-black text-lg tracking-tight text-[#191c1e]">
            ABTalks
          </span>
          <span className="font-mono-code text-[11px] font-extrabold text-[#4c5b71] bg-slate-100 border border-slate-200/80 px-2.5 py-0.5 rounded-full">
            DAY {dayNumber} / 60
          </span>
        </div>

        {/* Mission Title */}
        <div>
          <h4 className="text-base font-extrabold text-[#191c1e] leading-snug">
            {missionTitle}
          </h4>
        </div>

        {/* Verification Badges & Streak */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code font-bold">
          <span className="text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Check className="w-3.5 h-3.5 stroke-[3]" /> GitHub verified
          </span>
          <span className="text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Check className="w-3.5 h-3.5 stroke-[3]" /> LinkedIn verified
          </span>
          <span className="text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {dayNumber} DAY STREAK
          </span>
        </div>

        {/* User Identity Details */}
        <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4c5b71] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs border border-white overflow-hidden select-none">
            {user?.avatar ? (
              <img src={user.avatar} alt={userName} className="w-full h-full object-cover rounded-full" />
            ) : (
              userName.charAt(0).toUpperCase()
            )}
          </div>
          <div className="space-y-0.5 min-w-0 flex-1">
            <p className="text-sm font-extrabold text-[#191c1e] truncate">{userName}</p>
            <p className="text-xs text-slate-600 font-medium truncate">{userTrack}</p>
            <p className="text-[11px] text-slate-500 font-medium truncate">{userCollege}</p>
          </div>
        </div>

        {/* Challenge Completion Progress */}
        <div className="flex items-center justify-between text-xs font-medium border-t border-slate-100 pt-3">
          <span className="font-mono-code font-bold text-[#4c5b71]">
            {completionPercentage}% of the challenge complete
          </span>
          <span className="font-mono-code text-[10px] font-extrabold text-slate-400 tracking-wider">
            BUILD. SHIP. PROVE.
          </span>
        </div>
      </div>

      {/* SHARE ACTIONS */}
      <div className="space-y-2 pt-0.5">
        {/* Primary Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="w-full bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[44px]"
        >
          <Share2 className="w-4 h-4" />
          <span>{shareCopied ? 'Copied ✓' : 'Share My Progress →'}</span>
        </button>

        {/* Secondary Copy Progress Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-3 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] min-h-[44px]"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>{copyCopied ? 'Copied ✓' : 'Copy Progress'}</span>
        </button>
      </div>
    </div>
  );
};
