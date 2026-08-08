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
