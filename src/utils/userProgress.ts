import { UserProfile } from '../types';

export function getEffectiveUserProgress(user: UserProfile | null) {
  const currentDay = user?.currentDay ?? 55;
  const completedDays = Math.max(0, currentDay - 1); // 54 completed days
  const streakDays = Math.max(0, currentDay - 1); // 54 day streak

  if (typeof window !== 'undefined') {
    // Mark days 1 to 54 as completed and submitted
    for (let i = 1; i <= completedDays; i++) {
      if (!localStorage.getItem(`abtalks_day${i}_submitted`)) {
        localStorage.setItem(`abtalks_day${i}_submitted`, 'true');
      }
      if (!localStorage.getItem(`abtalks_day${i}_completed`)) {
        localStorage.setItem(`abtalks_day${i}_completed`, 'true');
      }
    }
    // Remove completed status for active day 55 onwards
    for (let i = currentDay; i <= 60; i++) {
      localStorage.removeItem(`abtalks_day${i}_submitted`);
      localStorage.removeItem(`abtalks_day${i}_completed`);
    }
  }

  const completionPercentage = Math.round((completedDays / 60) * 100);

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
  let projectCompleted = false;
  let challengeStatus: 'active' | 'day60_decision' | 'grace_period' | 'completed' | 'grace_expired' | 'extension' | 'extension_expired' = 'active';

  const currentDay = user?.currentDay ?? 55;

  if (typeof window !== 'undefined') {
    extensionUsed =
      localStorage.getItem('abtalks_grace_used') === 'true' ||
      localStorage.getItem('abtalks_extension_used') === 'true' ||
      !!user?.gracePeriodUsed ||
      !!user?.extensionUsed;

    startDate =
      localStorage.getItem('abtalks_grace_start_date') ||
      localStorage.getItem('abtalks_extension_start_date') ||
      user?.graceStartDate ||
      user?.extensionStartDate ||
      null;

    endDate =
      localStorage.getItem('abtalks_grace_end_date') ||
      localStorage.getItem('abtalks_extension_end_date') ||
      user?.graceEndDate ||
      user?.extensionEndDate ||
      null;

    projectCompleted =
      localStorage.getItem('abtalks_project_completed') === 'true' || !!user?.projectCompleted;

    const storedStatus = localStorage.getItem('abtalks_challenge_status') as any;
    if (storedStatus) {
      challengeStatus = storedStatus;
    } else if (user?.challengeStatus) {
      challengeStatus = user.challengeStatus;
    } else {
      challengeStatus = currentDay >= 60 ? 'day60_decision' : 'active';
    }
  } else {
    extensionUsed = !!user?.gracePeriodUsed || !!user?.extensionUsed;
    startDate = user?.graceStartDate || user?.extensionStartDate || null;
    endDate = user?.graceEndDate || user?.extensionEndDate || null;
    projectCompleted = !!user?.projectCompleted;
    challengeStatus = user?.challengeStatus || (currentDay >= 60 ? 'day60_decision' : 'active');
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

  if (isExpired && (challengeStatus === 'grace_period' || challengeStatus === 'extension')) {
    challengeStatus = 'grace_expired';
  }

  return {
    extensionUsed,
    extensionTotalDays: 5,
    extensionDaysRemaining,
    extensionStartDate: startDate,
    extensionEndDate: endDate,
    projectCompleted,
    challengeStatus,
    isExpired,
  };
}
