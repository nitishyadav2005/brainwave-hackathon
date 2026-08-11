import { UserProfile } from '../types';
import { formatFirstName } from './nameUtils';

export function createNewUser(
  name: string,
  email: string,
  college?: string,
  track?: string
): UserProfile {
  return {
    name: formatFirstName(name),
    email: email.trim(),
    college: college?.trim() || 'ABES Engineering College',
    track: track?.trim() || 'Full Stack Development',
    currentDay: 1,
    completedDays: 0,
    streak: 0,
    day12Completed: false,
    projectCompleted: false,
    challengeStatus: 'active',
    isAuthenticated: true,
  };
}

export function saveUserProfile(user: UserProfile): void {
  if (typeof window === 'undefined' || !user) return;
  const userJson = JSON.stringify(user);
  localStorage.setItem('abtalks_user', userJson);
  if (user.email) {
    const emailKey = user.email.toLowerCase().trim();
    localStorage.setItem(`abtalks_user_${emailKey}`, userJson);
  }
}

export function loadUserProfile(email?: string): UserProfile | null {
  if (typeof window === 'undefined') return null;

  if (email) {
    const emailKey = email.toLowerCase().trim();
    const specific = localStorage.getItem(`abtalks_user_${emailKey}`);
    if (specific) {
      try {
        return JSON.parse(specific);
      } catch {
        // fallback
      }
    }
  }

  const active = localStorage.getItem('abtalks_user');
  if (active) {
    try {
      const parsed = JSON.parse(active);
      if (parsed && parsed.email) {
        const emailKey = parsed.email.toLowerCase().trim();
        const specific = localStorage.getItem(`abtalks_user_${emailKey}`);
        if (specific) {
          return JSON.parse(specific);
        }
      }
      return parsed;
    } catch {
      // fallback
    }
  }

  return null;
}

export function getEffectiveUserProgress(user: UserProfile | null) {
  const currentDay = user?.currentDay ?? 1;
  const completedDays = user?.completedDays ?? Math.max(0, currentDay - 1);
  const streakDays = user?.streak ?? completedDays;

  const userEmail = user?.email?.toLowerCase().trim() || 'default';

  if (typeof window !== 'undefined') {
    // Sync completed state for days up to completedDays
    for (let i = 1; i <= completedDays; i++) {
      const subKey = `abtalks_${userEmail}_day${i}_submitted`;
      const compKey = `abtalks_${userEmail}_day${i}_completed`;
      if (!localStorage.getItem(subKey)) {
        localStorage.setItem(subKey, 'true');
      }
      if (!localStorage.getItem(compKey)) {
        localStorage.setItem(compKey, 'true');
      }
      if (!localStorage.getItem(`abtalks_day${i}_submitted`)) {
        localStorage.setItem(`abtalks_day${i}_submitted`, 'true');
      }
      if (!localStorage.getItem(`abtalks_day${i}_completed`)) {
        localStorage.setItem(`abtalks_day${i}_completed`, 'true');
      }
    }
    // Clear submission flags for upcoming/uncompleted days starting from currentDay
    for (let i = Math.max(1, completedDays + 1); i <= 60; i++) {
      if (i > completedDays) {
        localStorage.removeItem(`abtalks_${userEmail}_day${i}_submitted`);
        localStorage.removeItem(`abtalks_${userEmail}_day${i}_completed`);
        localStorage.removeItem(`abtalks_day${i}_submitted`);
        localStorage.removeItem(`abtalks_day${i}_completed`);
      }
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


