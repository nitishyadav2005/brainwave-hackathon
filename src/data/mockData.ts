import { TrackOption } from '../types';

export const CODING_TRACKS: TrackOption[] = [
  {
    id: 'fullstack-react-node',
    title: 'Full-Stack Web Dev',
    tagline: 'Build 60 real web projects from simple UI components to full SaaS products.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
    totalDays: 60,
    featuredProject: 'AI Study Assistant & Student Community Portal',
    badge: 'Most Popular',
  },
  {
    id: 'ai-python-apps',
    title: 'AI & Python Engineering',
    tagline: 'From Python fundamentals to fine-tuning LLM agents and multi-modal apps.',
    skills: ['Python', 'Gemini API', 'FastAPI', 'LangChain', 'Vector DBs'],
    totalDays: 60,
    featuredProject: 'Autonomous Research & Resume Evaluator Agent',
    badge: 'High Demand',
  },
  {
    id: 'frontend-craft',
    title: 'Frontend & UI Engineering',
    tagline: 'Master animations, state management, design systems, and responsive craft.',
    skills: ['React 19', 'Next.js', 'Tailwind v4', 'Framer Motion', 'WebSockets'],
    totalDays: 60,
    featuredProject: 'Real-time Collaborative Canvas & Analytics Dashboard',
    badge: 'Design Focused',
  },
  {
    id: 'backend-systems',
    title: 'Backend & Cloud Systems',
    tagline: 'Architect scalable REST/GraphQL APIs, databases, microservices, and Docker.',
    skills: ['Go / Node.js', 'PostgreSQL', 'Docker', 'Redis', 'System Design'],
    totalDays: 60,
    featuredProject: 'Distributed Rate-Limiter & Notification Engine',
    badge: 'Hardcore',
  },
];
