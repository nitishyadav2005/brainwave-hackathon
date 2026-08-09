export interface TrackOption {
  id: string;
  title: string;
  tagline: string;
  skills: string[];
  totalDays: number;
  featuredProject: string;
  badge: string;
}

export interface GridDayState {
  day: number;
  status: 'completed' | 'current' | 'upcoming';
  title?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  college?: string;
  track?: string;
  streak: number;
  longestStreak?: number;
  currentDay?: number;
  completedDays?: number;
  day12Completed?: boolean;
  missedYesterday?: boolean;
  streakSaversTotal?: number;
  streakSaversUsed?: number;
  streakSaversRemaining?: number;
  streakSaverProtectedYesterday?: boolean;
  extensionUsed?: boolean;
  extensionTotalDays?: number;
  extensionDaysRemaining?: number;
  extensionStartDate?: string | null;
  extensionEndDate?: string | null;
  challengeStatus?: 'active' | 'extension' | 'completed' | 'extension_expired';
  isAuthenticated: boolean;
}

export type AuthMode = 'select' | 'signin' | 'signup';
