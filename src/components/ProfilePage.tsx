import React, { useState } from 'react';
import {
  ArrowLeft,
  Code,
  Flame,
  Award,
  LogOut,
  Edit2,
  Check,
  Building,
  User,
  Home,
  Rocket,
  BarChart2,
  User as UserIcon,
  CheckCircle2,
  Zap,
  Lock
} from 'lucide-react';
import { UserProfile } from '../types';
import { formatFirstName } from '../utils/nameUtils';

interface ProfilePageProps {
  user: UserProfile | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  user,
  onNavigate,
  onLogout,
  onUpdateUser
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Profile Form States
  const [nameInput, setNameInput] = useState(formatFirstName(user?.name));
  const [collegeInput, setCollegeInput] = useState(user?.college || 'ABES Engineering College');
  const [trackInput, setTrackInput] = useState(user?.track || 'Full Stack Development');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const currentDay = user?.currentDay ?? 12;
  const streakDays = user?.streak ?? 11;

  const isProfileEmpty = !nameInput.trim() || !collegeInput.trim();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const formattedName = formatFirstName(nameInput);
    const updatedProfile: UserProfile = {
      name: formattedName,
      email: user?.email || `${nameInput.toLowerCase().replace(/\s+/g, '')}@student.edu`,
      college: collegeInput.trim() || 'ABES Engineering College',
      track: trackInput.trim() || 'Full Stack Development',
      streak: user?.streak ?? 11,
      currentDay: user?.currentDay ?? 12,
      isAuthenticated: true,
    };

    localStorage.setItem('abtalks_user', JSON.stringify(updatedProfile));
    if (onUpdateUser) {
      onUpdateUser(updatedProfile);
    }
    setIsEditing(false);
    setSaveSuccessMsg('Profile saved successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] font-sans pb-36 selection:bg-[#4c5b71]/15 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full h-14 bg-[#f8f9fb]/90 backdrop-blur-md border-b border-slate-200/60 px-4">
        <div className="max-w-md mx-auto h-full flex items-center justify-between">
          <button
            onClick={() => onNavigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#4c5b71] hover:text-[#38485d] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <span className="font-extrabold text-sm text-[#4c5b71]">ABTalks Profile</span>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-5 space-y-5">
        {saveSuccessMsg && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccessMsg}</span>
          </div>
        )}

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 text-center space-y-4 relative">
          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 text-xs font-bold text-[#4c5b71] hover:bg-slate-100 p-2 rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          )}

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-[#4c5b71] text-white flex items-center justify-center font-extrabold text-2xl mx-auto shadow-md border-4 border-white">
            {(nameInput.charAt(0) || 'S').toUpperCase()}
          </div>

          {isEditing ? (
            /* EDIT PROFILE FORM */
            <form onSubmit={handleSaveProfile} className="space-y-3 text-left pt-2">
              <h2 className="text-sm font-bold text-[#191c1e] text-center">
                {isProfileEmpty ? 'Complete your profile' : 'Edit Profile Information'}
              </h2>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#191c1e] focus:outline-hidden focus:border-[#4c5b71] bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  College / Institution
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={collegeInput}
                    onChange={(e) => setCollegeInput(e.target.value)}
                    placeholder="e.g. ABES Engineering College"
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#191c1e] focus:outline-hidden focus:border-[#4c5b71] bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Coding Track
                </label>
                <select
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-[#191c1e] focus:outline-hidden focus:border-[#4c5b71] bg-slate-50/50"
                >
                  <option value="Full Stack Development">Full Stack Development</option>
                  <option value="AI Engineering & Agents">AI Engineering & Agents</option>
                  <option value="Backend Systems & DevOps">Backend Systems & DevOps</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save profile
                </button>
              </div>
            </form>
          ) : (
            /* VIEW PROFILE */
            <div className="space-y-3">
              <div>
                <h1 className="text-xl font-extrabold text-[#191c1e]">{nameInput}</h1>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{collegeInput}</p>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <Code className="w-3.5 h-3.5 text-emerald-600" />
                <span>{trackInput}</span>
              </div>
            </div>
          )}
        </div>

        {/* CHALLENGE STATS */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <Flame className="w-6 h-6 text-amber-500 fill-amber-500 mx-auto mb-1" />
            <div className="text-xl font-extrabold text-[#191c1e]">{streakDays} Days</div>
            <div className="text-[10px] font-mono-code text-slate-500 uppercase font-bold tracking-wider">
              Streak
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 text-center shadow-xs">
            <Award className="w-6 h-6 text-[#4c5b71] mx-auto mb-1" />
            <div className="text-xl font-extrabold text-[#191c1e]">Day {currentDay} / 60</div>
            <div className="text-[10px] font-mono-code text-slate-500 uppercase font-bold tracking-wider">
              Challenge
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <section className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-3 shadow-xs">
          <h3 className="text-sm font-bold text-[#191c1e]">Achievements</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              <div>
                <p className="text-xs font-bold text-[#191c1e]">First Commit</p>
                <p className="text-[10px] text-slate-400 font-mono-code">Unlocked</p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <div>
                <p className="text-xs font-bold text-[#191c1e]">7 Day Streak</p>
                <p className="text-[10px] text-slate-400 font-mono-code">Unlocked</p>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#4c5b71] fill-[#4c5b71]" />
              <div>
                <p className="text-xs font-bold text-[#191c1e]">10 Builds</p>
                <p className="text-[10px] text-slate-400 font-mono-code">Unlocked</p>
              </div>
            </div>

            <div className="bg-slate-50/60 p-2.5 rounded-xl border border-slate-200/40 flex items-center gap-2 opacity-60">
              <Lock className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-xs font-bold text-slate-500">30 Day Streak</p>
                <p className="text-[10px] text-slate-400 font-mono-code">Locked</p>
              </div>
            </div>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-2 shadow-xs">
          <button
            onClick={() => onNavigate('/')}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Back to ABTalks Landing</span>
            <ArrowLeft className="w-4 h-4 rotate-180 text-slate-400" />
          </button>

          <button
            onClick={onLogout}
            className="w-full text-left py-2.5 px-3 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Sign Out</span>
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* FIXED BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex justify-around items-center max-w-md mx-auto shadow-lg">
        {/* HOME */}
        <button
          onClick={() => onNavigate('/dashboard')}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Home</span>
        </button>

        {/* CHALLENGE */}
        <button
          onClick={() => onNavigate(`/day/${currentDay}`)}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <Rocket className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Challenge</span>
        </button>

        {/* PROGRESS */}
        <button
          onClick={() => onNavigate('/progress')}
          className="flex flex-col items-center justify-center py-1 px-3 text-slate-400 hover:text-[#4c5b71] transition-colors cursor-pointer"
        >
          <BarChart2 className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold mt-0.5">Progress</span>
        </button>

        {/* PROFILE (ACTIVE) */}
        <button
          onClick={() => onNavigate('/profile')}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#4c5b71] cursor-pointer"
        >
          <UserIcon className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
};
