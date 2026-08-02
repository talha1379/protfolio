import { SkillCategory } from '../types';

export const initialSkillsData: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    skills: [
      { name: 'HTML5', icon: 'Code2', level: 'Advanced' },
      { name: 'CSS3', icon: 'Palette', level: 'Advanced' },
      { name: 'JavaScript', icon: 'FileCode2', level: 'Advanced' },
      { name: 'React.js', icon: 'Atom', level: 'Advanced' },
      { name: 'Tailwind CSS', icon: 'Layout', level: 'Advanced' },
      { name: 'Responsive Web Design', icon: 'Smartphone', level: 'Expert' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: 'Server', level: 'Intermediate' },
      { name: 'Express.js', icon: 'Cpu', level: 'Intermediate' },
      { name: 'Python', icon: 'Terminal', level: 'Intermediate' },
      { name: 'REST APIs', icon: 'Webhook', level: 'Advanced' }
    ]
  },
  {
    id: 'database',
    title: 'Databases & Backend Services',
    skills: [
      { name: 'MongoDB', icon: 'Database', level: 'Intermediate' },
      { name: 'Supabase', icon: 'Zap', level: 'Intermediate' },
      { name: 'SQLite', icon: 'HardDrive', level: 'Intermediate' }
    ]
  },
  {
    id: 'tools',
    title: 'Development Tools',
    skills: [
      { name: 'Git', icon: 'GitBranch', level: 'Advanced' },
      { name: 'GitHub', icon: 'Github', level: 'Advanced' },
      { name: 'Vite', icon: 'Zap', level: 'Advanced' },
      { name: 'Visual Studio Code', icon: 'Code', level: 'Advanced' },
      { name: 'Vercel', icon: 'Globe', level: 'Intermediate' },
      { name: 'Postman', icon: 'Send', level: 'Intermediate' }
    ]
  }
];
