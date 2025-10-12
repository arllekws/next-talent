import { create } from 'zustand';
import { Program } from '../types';
import * as programService from '../services/programService';

interface ProgramState {
  programs: Program[];
  isLoading: boolean;
  error: string | null;
  fetchPrograms: () => Promise<void>;
}

export const useProgramStore = create<ProgramState>((set) => ({
  programs: [],
  isLoading: false,
  error: null,
  
  fetchPrograms: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await programService.getAllPrograms();
      set({ programs: data, isLoading: false });
    } catch (e) {
      set({ error: 'Falha ao carregar os programas.', isLoading: false });
    }
  },
}));