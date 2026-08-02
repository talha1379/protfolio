import { Project } from '../types';

export const initialProjectsData: Project[] = [
  {
    id: 'proj-1',
    number: '01',
    title: 'Road & Safety Management System',
    description: 'A modern web application designed to support road safety awareness and help organize traffic-related information through an accessible and responsive interface.',
    technologies: ['React.js', 'Tailwind CSS', 'Supabase'],
    githubUrl: 'https://github.com/talha1379/road-safety-system',
    liveUrl: 'https://road-safety-demo.vercel.app',
    featured: true
  },
  {
    id: 'proj-2',
    number: '02',
    title: 'Railway Management System',
    description: 'A responsive management platform designed to organize railway-related information, schedules, and operational data.',
    technologies: ['React.js', 'JavaScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/talha1379/railway-management-system',
    liveUrl: 'https://railway-system-demo.vercel.app',
    featured: true
  },
  {
    id: 'proj-3',
    number: '03',
    title: 'Hostel Management System',
    description: 'A management application designed to organize student records, room information, attendance, and hostel-related operations.',
    technologies: ['React.js', 'SQLite', 'JavaScript'],
    githubUrl: 'https://github.com/talha1379/hostel-management-system',
    liveUrl: 'https://hostel-system-demo.vercel.app',
    featured: true
  }
];
