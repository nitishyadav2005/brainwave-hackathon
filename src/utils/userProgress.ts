import { UserProfile } from '../types';

export function getEffectiveUserProgress(user: UserProfile | null) {
  if (typeof window !== 'undefined') {
    for (let i = 1; i <= 60; i++) {
      if (!localStorage.getItem(`abtalks_day${i}_submitted`)) {
        localStorage.setItem(`abtalks_day${i}_submitted`, 'true');
      }
      if (!localStorage.getItem(`abtalks_day${i}_completed`)) {
        localStorage.setItem(`abtalks_day${i}_completed`, 'true');
      }
    }
  }

  const baseCompleted = user?.completedDays ?? 60;
  const baseStreak = user?.streak ?? 60;
  const baseCurrentDay = user?.currentDay ?? 60;

  const completedDays = Math.max(baseCompleted, 60);
  const streakDays = Math.max(baseStreak, 60);
  const currentDay = 60;
  const completionPercentage = 100;

  return {
    currentDay,
    streakDays,
    completedDays,
    completionPercentage,
  };
}

export function getExtensionInfo(user: UserProfile | null) {
  let extensionUsed = false;
  let startDate: string | null = null;
  let endDate: string | null = null;
  let challengeStatus: 'active' | 'extension' | 'completed' | 'extension_expired' = 'active';

  if (typeof window !== 'undefined') {
    extensionUsed = localStorage.getItem('abtalks_extension_used') === 'true' || !!user?.extensionUsed;
    startDate = localStorage.getItem('abtalks_extension_start_date') || user?.extensionStartDate || null;
    endDate = localStorage.getItem('abtalks_extension_end_date') || user?.extensionEndDate || null;
    const storedStatus = localStorage.getItem('abtalks_challenge_status') as any;
    if (storedStatus) {
      challengeStatus = storedStatus;
    } else if (user?.challengeStatus) {
      challengeStatus = user.challengeStatus;
    }
  } else {
    extensionUsed = !!user?.extensionUsed;
    startDate = user?.extensionStartDate || null;
    endDate = user?.extensionEndDate || null;
    challengeStatus = user?.challengeStatus || 'active';
  }

  let extensionDaysRemaining = 5;
  let isExpired = false;

  if (extensionUsed && endDate) {
    const endMs = new Date(endDate).getTime();
    const nowMs = Date.now();
    const diffMs = endMs - nowMs;
    if (diffMs <= 0) {
      extensionDaysRemaining = 0;
      isExpired = true;
    } else {
      extensionDaysRemaining = Math.min(5, Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24))));
    }
  }

  if (isExpired && challengeStatus === 'extension') {
    challengeStatus = 'extension_expired';
  }

  return {
    extensionUsed,
    extensionTotalDays: 5,
    extensionDaysRemaining,
    extensionStartDate: startDate,
    extensionEndDate: endDate,
    challengeStatus,
    isExpired,
  };
}
