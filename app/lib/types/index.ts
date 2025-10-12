// lib/types/index.ts
export interface Program {
  id: string;
  title: string;
  companyName: string;
  type: string;
  deadline: string;
  description: string;
  participants: number;
  status: string,
  tags: ('frontend' | 'backend' | 'dados' | 'devops')[];
  enrollmentEndDate: string;
}