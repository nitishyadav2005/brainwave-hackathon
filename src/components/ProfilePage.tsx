import React, { useState, useRef, useEffect } from 'react';
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
  Lock,
  Trophy,
  Moon,
  Sun,
  Share2,
  Megaphone,
  Code2,
  Camera,
  Trash2,
  Upload,
  X
} from 'lucide-react';
import { UserProfile } from '../types';
import { formatFirstName } from '../utils/nameUtils';
import { getEffectiveUserProgress, saveUserProfile } from '../utils/userProgress';

interface ProfilePageProps {
  user: UserProfile | null;
  onNavigate: (route: string) => void;
  onLogout: () => void;
  onUpdateUser?: (updated: UserProfile) => void;
}

interface AchievementDef {
  id: string;
  title: string;
  requirement: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const NEW_ACHIEVEMENTS: AchievementDef[] = [
  {
    id: 'late_night_coder',
    title: 'LATE NIGHT CODER',
    requirement: 'Complete a challenge task after 10:00 PM.',
    description: 'Complete a task after 10 PM',
    icon: Moon,
    iconBg: 'bg-indigo-50 border-indigo-200/90',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'early_bird',
    title: 'EARLY BIRD',
    requirement: 'Complete a challenge task before 8:00 AM.',
    description: 'Complete a task before 8 AM',
    icon: Sun,
    iconBg: 'bg-amber-50 border-amber-200/90',
    iconColor: 'text-amber-500 fill-amber-500',
  },
  {
    id: 'linkedin_builder',
    title: 'LINKEDIN BUILDER',
    requirement: "Submit the user's first LinkedIn post.",
    description: 'Submit your first LinkedIn post',
    icon: Share2,
    iconBg: 'bg-sky-50 border-sky-200/90',
    iconColor: 'text-sky-600',
  },
  {
    id: 'build_in_public',
    title: 'BUILD IN PUBLIC',
    requirement: 'Submit 10 LinkedIn posts.',
    description: 'Submit 10 LinkedIn posts',
    icon: Megaphone,
    iconBg: 'bg-blue-50 border-blue-200/90',
    iconColor: 'text-blue-600',
  },
  {
    id: 'commit_machine',
    title: 'COMMIT MACHINE',
    requirement: 'Submit 10 GitHub commits.',
    description: '10 GitHub commits submitted',
    icon: Code2,
    iconBg: 'bg-slate-100 border-slate-300/90',
    iconColor: 'text-slate-800',
  },
  {
    id: 'challenge_champion',
    title: 'CHALLENGE CHAMPION',
    requirement: 'Complete all 60 challenge days AND complete the required submissions.',
    description: 'Complete all 60 days + required submissions',
    icon: Trophy,
    iconBg: 'bg-amber-100/80 border-amber-300',
    iconColor: 'text-amber-600 fill-amber-500',
  },
];

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

  // Profile Picture States & Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string>(user?.avatar || '');

  useEffect(() => {
    if (user?.avatar !== undefined) {
      setAvatar(user.avatar);
    }
  }, [user?.avatar]);

  // Profile Picture Modal States
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string>('');

  const progress = getEffectiveUserProgress(user);
  const currentDay = progress.currentDay;
  const streakDays = progress.streakDays;
  const completedDays = progress.completedDays;
  const userEmail = user?.email?.toLowerCase().trim() || 'default';

  // Helper to check if a specific day challenge is submitted
  const isDaySubmitted = (i: number): boolean => {
    if (typeof window === 'undefined') return false;
    return (
      localStorage.getItem(`abtalks_day${i}_submitted`) === 'true' ||
      localStorage.getItem(`abtalks_${userEmail}_day${i}_submitted`) === 'true' ||
      (completedDays > 0 && i <= completedDays)
    );
  };

  // Evaluate time-based task completions (only for actually submitted challenge days)
  let hasLateNight = false;
  let hasEarlyBird = false;

  if (typeof window !== 'undefined') {
    for (let i = 1; i <= 60; i++) {
      if (isDaySubmitted(i)) {
        const ts =
          localStorage.getItem(`abtalks_day${i}_submitted_at`) ||
          localStorage.getItem(`abtalks_${userEmail}_day${i}_submitted_at`);
        if (ts) {
          try {
            const d = new Date(ts);
            if (!isNaN(d.getTime())) {
              const hour = d.getHours();
              if (hour >= 22) hasLateNight = true;
              if (hour < 8) hasEarlyBird = true;
            }
          } catch {
            // ignore
          }
        } else {
          // If submitted without explicit timestamp, check global flags
          if (localStorage.getItem('abtalks_late_night_unlocked') === 'true') hasLateNight = true;
          if (localStorage.getItem('abtalks_early_bird_unlocked') === 'true') hasEarlyBird = true;
        }
      }
    }
  }

  // Evaluate submission counts for GitHub and LinkedIn
  let githubCount = 0;
  let linkedinCount = 0;

  if (typeof window !== 'undefined') {
    let subG = 0;
    let subL = 0;
    for (let i = 1; i <= 60; i++) {
      if (isDaySubmitted(i)) {
        subG++;
        subL++;
      }
    }
    githubCount = Math.max(completedDays, subG);
    linkedinCount = Math.max(completedDays, subL);

    const storedGithub = localStorage.getItem('abtalks_github_commits') || localStorage.getItem('abtalks_github_count');
    const storedLinkedin = localStorage.getItem('abtalks_linkedin_posts') || localStorage.getItem('abtalks_linkedin_count');

    if (storedGithub && (completedDays > 0 || subG > 0)) {
      const p = parseInt(storedGithub, 10);
      if (!isNaN(p)) githubCount = Math.max(githubCount, p);
    }
    if (storedLinkedin && (completedDays > 0 || subL > 0)) {
      const p = parseInt(storedLinkedin, 10);
      if (!isNaN(p)) linkedinCount = Math.max(linkedinCount, p);
    }
  }

  // Calculate dynamic achievement status and progress
  const processedAchievements = NEW_ACHIEVEMENTS.map((def) => {
    let isUnlocked = false;
    let currentValue = 0;
    let target = 1;
    let progressLabel = '';
    let hasProgressBar = false;
    let progressRatio = 0;

    if (def.id === 'late_night_coder') {
      isUnlocked = hasLateNight;
      hasProgressBar = false;
      progressLabel = isUnlocked ? 'Unlocked' : 'Locked';
    } else if (def.id === 'early_bird') {
      isUnlocked = hasEarlyBird;
      hasProgressBar = false;
      progressLabel = isUnlocked ? 'Unlocked' : 'Locked';
    } else if (def.id === 'linkedin_builder') {
      target = 1;
      currentValue = Math.min(linkedinCount, 1);
      isUnlocked = linkedinCount >= 1;
      hasProgressBar = true;
      progressRatio = currentValue / target;
      progressLabel = `${currentValue} / 1 posts`;
    } else if (def.id === 'build_in_public') {
      target = 10;
      currentValue = Math.min(linkedinCount, 10);
      isUnlocked = linkedinCount >= 10;
      hasProgressBar = true;
      progressRatio = currentValue / target;
      progressLabel = `${currentValue} / 10 posts`;
    } else if (def.id === 'commit_machine') {
      target = 10;
      currentValue = Math.min(githubCount, 10);
      isUnlocked = githubCount >= 10;
      hasProgressBar = true;
      progressRatio = currentValue / target;
      progressLabel = `${currentValue} / 10 commits`;
    } else if (def.id === 'challenge_champion') {
      target = 60;
      currentValue = Math.min(completedDays, 60);
      isUnlocked = completedDays >= 60 && githubCount >= 60 && linkedinCount >= 60;
      hasProgressBar = true;
      progressRatio = currentValue / target;
      progressLabel = `${currentValue} / 60 days`;
    }

    return {
      ...def,
      isUnlocked,
      currentValue,
      target,
      progressLabel,
      hasProgressBar,
      progressRatio,
    };
  });

  const unlockedCount = processedAchievements.filter((a) => a.isUnlocked).length;

  const isProfileEmpty = !nameInput.trim() || !collegeInput.trim();

  // Profile Picture File Selection & Validation
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file format (JPG, PNG, WEBP)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const isImage = validTypes.includes(file.type) || file.type.startsWith('image/');

    if (!isImage) {
      setPhotoError('Please select a valid image (JPG, PNG, or WEBP).');
      setPreviewImage(null);
      setIsPhotoModalOpen(true);
      e.target.value = '';
      return;
    }

    // Validate max file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Image is too large. Please choose an image smaller than 5MB.');
      setPreviewImage(null);
      setIsPhotoModalOpen(true);
      e.target.value = '';
      return;
    }

    setPhotoError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewImage(result);
        setIsPhotoModalOpen(true);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAvatarClick = () => {
    if (avatar) {
      setIsOptionsModalOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleSavePhoto = () => {
    if (!previewImage) return;

    setAvatar(previewImage);
    const formattedName = formatFirstName(nameInput);
    const updatedProfile: UserProfile = {
      ...user,
      name: formattedName,
      college: collegeInput.trim() || 'ABES Engineering College',
      track: trackInput.trim() || 'Full Stack Development',
      avatar: previewImage,
      email: user?.email || `${nameInput.toLowerCase().replace(/\s+/g, '')}@student.edu`,
      streak: streakDays,
      currentDay: currentDay,
      completedDays: completedDays,
      isAuthenticated: true,
    };

    saveUserProfile(updatedProfile);
    if (onUpdateUser) {
      onUpdateUser(updatedProfile);
    }

    setIsPhotoModalOpen(false);
    setPreviewImage(null);
    setSaveSuccessMsg('Profile picture updated.');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleRemovePhoto = () => {
    setAvatar('');
    const formattedName = formatFirstName(nameInput);
    const updatedProfile: UserProfile = {
      ...user,
      name: formattedName,
      college: collegeInput.trim() || 'ABES Engineering College',
      track: trackInput.trim() || 'Full Stack Development',
      avatar: '',
      email: user?.email || `${nameInput.toLowerCase().replace(/\s+/g, '')}@student.edu`,
      streak: streakDays,
      currentDay: currentDay,
      completedDays: completedDays,
      isAuthenticated: true,
    };

    saveUserProfile(updatedProfile);
    if (onUpdateUser) {
      onUpdateUser(updatedProfile);
    }

    setIsOptionsModalOpen(false);
    setSaveSuccessMsg('Profile picture removed.');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const formattedName = formatFirstName(nameInput);
    const updatedProfile: UserProfile = {
      ...user,
      name: formattedName,
      email: user?.email || `${nameInput.toLowerCase().replace(/\s+/g, '')}@student.edu`,
      college: collegeInput.trim() || 'ABES Engineering College',
      track: trackInput.trim() || 'Full Stack Development',
      avatar: avatar,
      streak: streakDays,
      currentDay: currentDay,
      completedDays: completedDays,
      isAuthenticated: true,
    };

    saveUserProfile(updatedProfile);
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
      <header className="sticky top-0 z-40 w-full h-14 bg-[#f8f9fb]/90 backdrop-blur-md border-b border-slate-200/60 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md lg:max-w-3xl mx-auto h-full flex items-center justify-between">
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

      <main className="w-full max-w-md lg:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 space-y-5">
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

          {/* Avatar with Camera Badge */}
          <div className="relative inline-block mx-auto group">
            <button
              type="button"
              onClick={handleAvatarClick}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#4c5b71] text-white flex items-center justify-center font-extrabold text-2xl sm:text-3xl mx-auto shadow-md border-4 border-white overflow-hidden cursor-pointer hover:opacity-95 transition-all relative select-none"
              title="Click to change profile picture"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={nameInput}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                (nameInput.charAt(0) || 'S').toUpperCase()
              )}

              {/* Hover Camera Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Camera className="w-6 h-6" />
              </div>
            </button>

            {/* Camera Badge Icon at bottom right */}
            <button
              type="button"
              onClick={handleAvatarClick}
              className="absolute bottom-0 right-0 bg-[#4c5b71] hover:bg-[#38485d] text-white p-2 rounded-full border-2 border-white shadow-xs transition-transform cursor-pointer hover:scale-105"
              title="Change profile picture"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          {isEditing ? (
            /* EDIT PROFILE FORM */
            <form onSubmit={handleSaveProfile} className="space-y-3 text-left pt-2">
              <h2 className="text-sm font-bold text-[#191c1e] text-center">
                {isProfileEmpty ? 'Complete your profile' : 'Edit Profile Information'}
              </h2>

              {/* Quick Profile Picture Actions in Edit Mode */}
              <div className="flex items-center justify-center gap-2 pt-1 pb-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-[#4c5b71] hover:text-[#38485d] bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{avatar ? 'Change Profile Picture' : 'Upload Profile Picture'}</span>
                </button>
                {avatar && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>

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
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 min-w-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="text-sm sm:text-base font-extrabold text-[#191c1e]">Achievements</h3>
                <span className="text-[10px] font-mono-code font-extrabold text-[#4c5b71] bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full shrink-0">
                  {unlockedCount} / {processedAchievements.length} Unlocked
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1 break-words">
                Complete daily challenge tasks, log commits, and share posts to unlock rewards.
              </p>
            </div>
          </div>

          {/* DYNAMIC ACHIEVEMENTS GRID (2 columns desktop, 1 column mobile) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full min-w-0">
            {processedAchievements.map((item) => {
              const IconComp = item.icon;

              if (item.isUnlocked) {
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border flex flex-col justify-between gap-3 min-w-0 w-full transition-all duration-300 bg-emerald-50/60 border-emerald-200/90 shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
                  >
                    {/* TOP: ICON + TITLE & DESCRIPTION */}
                    <div className="flex items-start gap-3 min-w-0 w-full">
                      <div className="w-9 h-9 rounded-xl bg-emerald-100/90 border border-emerald-300/80 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                        <IconComp className="w-4.5 h-4.5 text-emerald-600" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-xs font-extrabold tracking-tight text-[#191c1e] leading-snug break-words min-w-0"
                          style={{ wordBreak: 'normal', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                        >
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 font-medium leading-relaxed mt-1 break-words min-w-0">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* BOTTOM: COMPLETED STATUS & GREEN BAR */}
                    <div className="space-y-1.5 w-full min-w-0 pt-2 border-t border-emerald-200/60">
                      <div className="flex items-center justify-between text-[11px] font-mono-code">
                        <span className="font-bold text-emerald-700 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                          <span>Completed</span>
                        </span>
                        {item.hasProgressBar && (
                          <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200/80">
                            {item.progressLabel}
                          </span>
                        )}
                      </div>
                      <div className="h-1.5 w-full bg-emerald-200/70 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-full" />
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border flex flex-col justify-between gap-3 min-w-0 w-full transition-all duration-300 bg-slate-50/80 border-slate-200/70 hover:bg-slate-50"
                >
                  {/* TOP: ICON + TITLE & DESCRIPTION */}
                  <div className="flex items-start gap-3 min-w-0 w-full">
                    <div className="w-9 h-9 rounded-xl bg-slate-100/90 border border-slate-200/80 text-slate-400 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-slate-400 stroke-[2]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-xs font-extrabold tracking-tight text-slate-800 leading-snug break-words min-w-0"
                        style={{ wordBreak: 'normal', overflowWrap: 'break-word', whiteSpace: 'normal' }}
                      >
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1 break-words min-w-0">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM: PROGRESS BAR OR LOCKED STATUS */}
                  <div className="space-y-1.5 w-full min-w-0 pt-2 border-t border-slate-200/60">
                    {item.hasProgressBar ? (
                      <div className="space-y-1 w-full min-w-0">
                        <div className="flex items-center justify-between text-[10px] font-mono-code gap-1">
                          <span className="text-slate-500 font-medium flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-slate-400" />
                            <span>Progress</span>
                          </span>
                          <span className="bg-slate-100 text-slate-600 border border-slate-200/80 font-bold px-2 py-0.5 rounded-full shrink-0 text-[10px]">
                            {item.progressLabel}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#4c5b71]/70 rounded-full transition-all duration-300"
                            style={{ width: `${Math.round(item.progressRatio * 100)}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500">
                          <Lock className="w-3 h-3 text-slate-400" />
                          <span>Status</span>
                        </span>
                        <span className="font-bold text-slate-600 text-[10px] bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/80">
                          Locked
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] flex justify-around items-center max-w-md mx-auto shadow-lg">
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
      {/* HIDDEN FILE INPUT FOR PROFILE PICTURE UPLOAD */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
      />

      {/* OPTIONS MODAL (When avatar clicked and photo already exists) */}
      {isOptionsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 shadow-xl border border-slate-200/90 max-w-xs w-full text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-sm font-bold text-[#191c1e]">Profile Picture Options</h3>
              <button
                type="button"
                onClick={() => setIsOptionsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsOptionsModalOpen(false);
                  fileInputRef.current?.click();
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-[#191c1e] font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#4c5b71]" />
                <span>Change Profile Picture</span>
              </button>

              <button
                type="button"
                onClick={handleRemovePhoto}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>Remove Profile Picture</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOptionsModalOpen(false)}
                className="w-full text-slate-500 font-semibold text-xs py-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE PICTURE PREVIEW / UPLOAD MODAL */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200/90 max-w-sm w-full text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-[#191c1e]">Profile Picture</h3>
              <button
                type="button"
                onClick={() => {
                  setIsPhotoModalOpen(false);
                  setPreviewImage(null);
                  setPhotoError('');
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {photoError ? (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3.5 rounded-xl text-left">
                {photoError}
              </div>
            ) : (
              <>
                {/* Circular Preview Container */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#4c5b71]/20 shadow-md mx-auto relative bg-slate-100 flex items-center justify-center">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Profile Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-3xl font-black text-slate-400">
                      {(nameInput.charAt(0) || 'S').toUpperCase()}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-500 font-medium">
                  Choose a photo for your ABTalks profile
                </p>
              </>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsPhotoModalOpen(false);
                  setPreviewImage(null);
                  setPhotoError('');
                }}
                className="w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>

              {!photoError && (
                <button
                  type="button"
                  onClick={handleSavePhoto}
                  className="w-1/2 bg-[#4c5b71] hover:bg-[#38485d] text-white font-bold text-xs py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  Save Photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

