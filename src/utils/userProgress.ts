import { UserProfile } from '../types';

export function getEffectiveUserProgress(user: UserProfile | null) {
  let highestSubmittedDay = 0;
  if (typeof window !== 'undefined') {
    for (let i = 1; i <= 60; i++) {
      if (
        localStorage.getItem(`abtalks_day${i}_submitted`) === 'true' ||
        localStorage.getItem(`abtalks_day${i}_completed`) === 'true'
      ) {
        highestSubmittedDay = Math.max(highestSubmittedDay, i);
      }
    }
  }

  const isFirstDay = user?.currentDay === 1 && user?.streak === 0;
  if (isFirstDay && highestSubmittedDay === 0) {
    return {
      currentDay: 1,
      streakDays: 0,
      completedDays: 0,
      completionPercentage: 0,
    };
  }

  const baseCompleted = user?.completedDays ?? 11;
  const baseStreak = user?.streak ?? 11;
  const baseCurrentDay = user?.currentDay ?? 12;

  const completedDays = Math.max(baseCompleted, highestSubmittedDay);
  const streakDays = Math.max(baseStreak, highestSubmittedDay);
  const currentDay = Math.max(
    baseCurrentDay,
    highestSubmittedDay > 0 ? highestSubmittedDay + 1 : 12
  );
  const completionPercentage = Math.round((completedDays / 60) * 100);

  return {
    currentDay,
    streakDays,
    completedDays,
    completionPercentage,
  };
}
