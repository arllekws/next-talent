import { create } from 'zustand';
import { Program } from '../types';
import { fetchPrograms } from '../services/api';

interface ProgramState {
  programs: Program[];
  isLoading: boolean;
  error: string | null;
  fetchPrograms: (filters?: {
    area?: string;
    type?: string;
    level?: string;
    status?: string;
    tags?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;
}

export const useProgramStore = create<ProgramState>((set) => ({
  programs: [],
  isLoading: false,
  error: null,
  
  fetchPrograms: async (filters?: {
    area?: string;
    type?: string;
    level?: string;
    status?: string;
    tags?: string;
    page?: number;
    limit?: number;
  }) => {
    console.log('🏪 Store: fetchPrograms chamado');
    set({ isLoading: true, error: null });
    try {
      const data = await fetchPrograms(filters);
      console.log('🏪 Store: programas recebidos:', data);
      set({ programs: data, isLoading: false });
    } catch (e) {
      console.error('🏪 Store: erro ao buscar programas:', e);
      set({ error: 'Falha ao carregar os programas.', isLoading: false });
    }
  },
}));