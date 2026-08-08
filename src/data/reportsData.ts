export interface ChallengeDayItem {
  day: number;
  title: string;
  description: string;
  githubUrl: string;
  linkedinUrl: string;
  skills: string[];
}

export interface ReportDef {
  id: number;
  title: string;
  subtitle: string;
  periodLabel: string;
  startDay: number;
  endDay: number;
  requiredCompletedDays: number;
  buildsCount: number;
  githubCommits: number;
  linkedinPosts: number;
  streak: number;
  skills: string[];
  isFinal?: boolean;
}

export const REPORT_LIST: ReportDef[] = [
  {
    id: 1,
    title: '10 Days of Building',
    subtitle: 'Your coding journey — Days 01 to 10',
    periodLabel: 'Days 01 — 10',
    startDay: 1,
    endDay: 10,
    requiredCompletedDays: 10,
    buildsCount: 10,
    githubCommits: 10,
    linkedinPosts: 10,
    streak: 10,
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'DOM Manipulation', 'APIs', 'Git', 'GitHub', 'Responsive Design'],
  },
  {
    id: 2,
    title: '20 Days of Consistency',
    subtitle: 'Your coding journey — Days 11 to 20',
    periodLabel: 'Days 11 — 20',
    startDay: 11,
    endDay: 20,
    requiredCompletedDays: 20,
    buildsCount: 10,
    githubCommits: 10,
    linkedinPosts: 10,
    streak: 20,
    skills: ['TypeScript', 'Full Stack', 'Express', 'Node.js', 'REST APIs', 'Cloud Deployment', 'State Management'],
  },
  {
    id: 3,
    title: '30 Days of Execution',
    subtitle: 'Your coding journey — Days 21 to 30',
    periodLabel: 'Days 21 — 30',
    startDay: 21,
    endDay: 30,
    requiredCompletedDays: 30,
    buildsCount: 10,
    githubCommits: 10,
    linkedinPosts: 10,
    streak: 30,
    skills: ['Authentication', 'JWT', 'PostgreSQL', 'Drizzle ORM', 'Database Architecture', 'Security'],
  },
  {
    id: 4,
    title: '40 Days of Mastery',
    subtitle: 'Your coding journey — Days 31 to 40',
    periodLabel: 'Days 31 — 40',
    startDay: 31,
    endDay: 40,
    requiredCompletedDays: 40,
    buildsCount: 10,
    githubCommits: 10,
    linkedinPosts: 10,
    streak: 40,
    skills: ['Performance Tuning', 'Caching', 'Redis', 'Unit Testing', 'CI/CD Pipelines', 'Docker'],
  },
  {
    id: 5,
    title: '50 Days of Scaling',
    subtitle: 'Your coding journey — Days 41 to 50',
    periodLabel: 'Days 41 — 50',
    startDay: 41,
    endDay: 50,
    requiredCompletedDays: 50,
    buildsCount: 10,
    githubCommits: 10,
    linkedinPosts: 10,
    streak: 50,
    skills: ['WebSockets', 'Realtime Sync', 'Microservices', 'GraphQL', 'Accessibility', 'Design Systems'],
  },
  {
    id: 6,
    title: '60 Days. 60 Builds. One Journey.',
    subtitle: 'ABTalks Final Project Report — 60-Day Coding Challenge',
    periodLabel: 'Days 51 — 60',
    startDay: 51,
    endDay: 60,
    requiredCompletedDays: 60,
    buildsCount: 60,
    githubCommits: 60,
    linkedinPosts: 60,
    streak: 60,
    isFinal: true,
    skills: ['Full Stack Architecture', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'CI/CD', 'Public Shipping', 'System Design'],
  },
];

export const MOCK_CHALLENGE_DAYS: Record<number, ChallengeDayItem> = {
  1: {
    day: 1,
    title: 'Welcome to ABTalks & First Commit',
    description: 'Set up local development workspace, create initial GitHub repository, and push working code.',
    githubUrl: 'https://github.com/nitish/abtalks-day01',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day01',
    skills: ['Git', 'GitHub', 'Markdown'],
  },
  2: {
    day: 2,
    title: 'Build a Form Validation System',
    description: 'Created a client-side form validator with real-time feedback and regex pattern matching.',
    githubUrl: 'https://github.com/nitish/abtalks-day02',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day02',
    skills: ['JavaScript', 'DOM', 'Regex'],
  },
  3: {
    day: 3,
    title: 'Build a Weather Interface',
    description: 'Built a clean weather card component fetching live weather data and rendering forecasts.',
    githubUrl: 'https://github.com/nitish/abtalks-day03',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day03',
    skills: ['Fetch API', 'Async/Await', 'CSS Grid'],
  },
  4: {
    day: 4,
    title: 'Interactive Calculator App',
    description: 'Created a responsive calculator with operation history logs and keyboard input shortcuts.',
    githubUrl: 'https://github.com/nitish/abtalks-day04',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day04',
    skills: ['React', 'State Hooks', 'CSS Flexbox'],
  },
  5: {
    day: 5,
    title: 'Task Manager & Todo Application',
    description: 'Implemented a local-storage todo application with task filters, priority tags, and persistence.',
    githubUrl: 'https://github.com/nitish/abtalks-day05',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day05',
    skills: ['LocalStorage', 'React Hooks', 'Tailwind CSS'],
  },
  6: {
    day: 6,
    title: 'Secure Password Generator',
    description: 'Built a customizable password generator with length controls, character sets, and copy action.',
    githubUrl: 'https://github.com/nitish/abtalks-day06',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day06',
    skills: ['JavaScript Math', 'Clipboard API'],
  },
  7: {
    day: 7,
    title: 'Pomodoro Productivity Timer',
    description: 'Designed a productivity timer with sound notifications, custom intervals, and break modes.',
    githubUrl: 'https://github.com/nitish/abtalks-day07',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day07',
    skills: ['HTML5 Audio', 'Interval Timers'],
  },
  8: {
    day: 8,
    title: 'Personal Expense Tracker',
    description: 'Built a budget tracking interface with categorical breakdowns and balance calculation.',
    githubUrl: 'https://github.com/nitish/abtalks-day08',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day08',
    skills: ['Data Visualization', 'Array Reduction'],
  },
  9: {
    day: 9,
    title: 'Live Markdown Previewer',
    description: 'Created a split-screen live markdown previewer with syntax highlighting and formatting controls.',
    githubUrl: 'https://github.com/nitish/abtalks-day09',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day09',
    skills: ['Markdown Parser', 'React UI'],
  },
  10: {
    day: 10,
    title: 'Recipe Finder & Filter App',
    description: 'Searchable recipe finder with ingredient tags, modal detail views, and bookmarking.',
    githubUrl: 'https://github.com/nitish/abtalks-day10',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day10',
    skills: ['REST APIs', 'UI Components'],
  },
  11: {
    day: 11,
    title: 'Interactive Quiz Application',
    description: 'Built a multi-question trivia quiz with countdown timer, score calculation, and recap.',
    githubUrl: 'https://github.com/nitish/abtalks-day11',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day11',
    skills: ['React State', 'Timer Hooks'],
  },
  12: {
    day: 12,
    title: 'Build something useful with an API',
    description: 'Built a practical public API client project displaying real-time structured data.',
    githubUrl: 'https://github.com/nitish/abtalks-day12',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day12',
    skills: ['Public API', 'Full Stack', 'Tailwind'],
  },
  13: {
    day: 13,
    title: 'Deploy your project to production',
    description: 'Package full-stack web application and deploy live to production server with custom domain.',
    githubUrl: 'https://github.com/nitish/abtalks-day13',
    linkedinUrl: 'https://linkedin.com/posts/nitish-abtalks-day13',
    skills: ['Deployment', 'Cloud Run', 'Vite'],
  },
};

export function getChallengeDaysForReport(startDay: number, endDay: number): ChallengeDayItem[] {
  const items: ChallengeDayItem[] = [];
  for (let i = startDay; i <= endDay; i++) {
    if (MOCK_CHALLENGE_DAYS[i]) {
      items.push(MOCK_CHALLENGE_DAYS[i]);
    } else {
      // Fallback generator for future mock days
      items.push({
        day: i,
        title: `Day ${i < 10 ? '0' + i : i} Project Mission`,
        description: `Practical full-stack engineering challenge and public shipping mission for Day ${i}.`,
        githubUrl: `https://github.com/nitish/abtalks-day${i}`,
        linkedinUrl: `https://linkedin.com/posts/nitish-abtalks-day${i}`,
        skills: ['Full Stack', 'TypeScript', 'Web Dev'],
      });
    }
  }
  return items;
}
