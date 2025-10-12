import { Program } from '../types';

const mockPrograms: Program[] = [
  {
    id: '1',
    title: 'Oportunidade DevOps',
    companyName: 'DIO',
    type: 'Curso',
    deadline: '15 Nov 2025',
    participants: 234,
    status: 'open',
    description: 'Aprenda práticas de CI/CD, containers e automação de infraestrutura com especialistas.',
    tags: ['devops'],
    enrollmentEndDate: '10 Nov 2025',
  },
  {
    id: '2',
    title: 'Bootcamp Full Stack',
    companyName: 'TechAcademy',
    type: 'Bootcamp',
    deadline: '20 Out 2025',
    participants: 412,
    status: 'open',
    description: 'Formação intensiva para desenvolver aplicações completas com React e Node.js.',
    tags: ['frontend'],
    enrollmentEndDate: '15 Out 2025',
  },
  {
    id: '3',
    title: 'Mentoria de Carreira em TI',
    companyName: 'NexTalent',
    type: 'Mentoria',
    deadline: '28 Dez 2025',
    participants: 92,
    status: 'closing-soon',
    description: 'Acompanhe profissionais experientes e trace seu plano de crescimento na área de tecnologia.',
    tags: [],
    enrollmentEndDate: '25 Dez 2025',
  },
  {
    id: '4',
    title: 'Desafio Front-End React',
    companyName: 'Cesar Labs',
    type: 'Desafio Técnico',
    deadline: '05 Nov 2025',
    participants: 189,
    status: 'open',
    description: 'Construa uma aplicação moderna com React e Chakra UI para resolver um problema real.',
    tags: ['frontend'],
    enrollmentEndDate: '03 Nov 2025',
  },
  {
    id: '5',
    title: 'Formação em Data Science',
    companyName: 'Alura',
    type: 'Curso',
    deadline: '30 Nov 2025',
    participants: 850,
    status: 'open',
    description: 'Aprenda Python, estatística e machine learning com especialistas do mercado.',
    tags: ['dados'],
    enrollmentEndDate: '28 Nov 2025',
  },
];

export const getAllPrograms = async (): Promise<Program[]> => {
  console.log('Buscando todos os programas (mock)...');
  return new Promise((resolve) => setTimeout(() => resolve(mockPrograms), 1000));
};