import { Program } from '../types';

const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Oportunidade DevOps',
    companyName: 'DIO',
    type: 'Curso',
    deadline: '2025-11-15',
    participants: 234,
    status: 'open',
    description: 'Aprenda práticas de CI/CD, containers e automação de infraestrutura com especialistas.',
    tags: ['devops'],
    area: 'DevOps',
    level: 'Pleno',
  },
  {
    id: '2',
    title: 'Bootcamp Full Stack',
    companyName: 'TechAcademy',
    type: 'Bootcamp',
    deadline: '2025-10-20',
    participants: 412,
    status: 'open',
    description: 'Formação intensiva para desenvolver aplicações completas com React e Node.js.',
    tags: ['frontend', 'backend'],
    area: 'Full Stack',
    level: 'Sênior',
  },
  {
    id: '3',
    title: 'Mentoria de Carreira em TI',
    companyName: 'NexTalent',
    type: 'Mentoria',
    deadline: '2025-12-28',
    participants: 92,
    status: 'closing-soon',
    description: 'Acompanhe profissionais experientes e trace seu plano de crescimento na área de tecnologia.',
    tags: [],
    area: 'Pesquisa',
    level: 'Júnior',
  },
  {
    id: '4',
    title: 'Desafio Front-End React',
    companyName: 'Cesar Labs',
    type: 'Desafio Técnico',
    deadline: '2025-11-05',
    participants: 189,
    status: 'open',
    description: 'Construa uma aplicação moderna com React e Chakra UI para resolver um problema real.',
    tags: ['frontend'],
    area: 'Tecnologia',
    level: 'Pleno',
  },
  {
    id: '5',
    title: 'Formação em Data Science',
    companyName: 'Alura',
    type: 'Curso',
    deadline: '2025-11-30',
    participants: 850,
    status: 'open',
    description: 'Aprenda Python, estatística e machine learning com especialistas do mercado.',
    tags: ['dados'],
    area: 'Tecnologia',
    level: 'Sênior',
  },
];

export const getAllPrograms = async (): Promise<Program[]> => {
  console.log('Buscando todos os programas (mock)...');
  return new Promise((resolve) => setTimeout(() => resolve(mockPrograms), 1000));
};
