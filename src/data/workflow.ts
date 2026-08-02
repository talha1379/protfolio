import { WorkflowStep } from '../types';

export const workflowSteps: WorkflowStep[] = [
  {
    step: '01',
    title: 'Understand Requirements',
    description: 'I analyze the project goals, user needs, expected functionality, and technical requirements before development begins.',
    icon: 'FileSearch'
  },
  {
    step: '02',
    title: 'Plan and Design',
    description: 'I organize the application structure, user experience, components, data flow, and development approach.',
    icon: 'DraftingCompass'
  },
  {
    step: '03',
    title: 'Develop and Build',
    description: 'I create clean, responsive, maintainable, and functional applications using modern development practices.',
    icon: 'Code'
  },
  {
    step: '04',
    title: 'Test and Improve',
    description: 'I test functionality, identify issues, improve performance, and refine the user experience.',
    icon: 'CheckCircle2'
  },
  {
    step: '05',
    title: 'Deploy and Maintain',
    description: 'I deploy applications and continue improving them through updates, fixes, and new features.',
    icon: 'Rocket'
  }
];
