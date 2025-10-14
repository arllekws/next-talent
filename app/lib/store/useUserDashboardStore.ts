// src/lib/store/useUserDashboardStore.ts
import { create } from 'zustand';
import * as dashboardService from '../services/dashboardService';

interface Program {
  id: string | number;
  title: string;
  companyName: string;
  type: string;
  deadline: string;
  status: string;
  participants: number;
}

interface UserDashboardState {
  user: any;
  stats: any[];
  savedPrograms: Program[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
  toggleFavorite: (program: Program) => void;
  isFavorite: (id: string | number) => boolean;
}

export const useUserDashboardStore = create<UserDashboardState>((set, get) => ({
  user: null,
  stats: [],
  savedPrograms: [],
  isLoading: true,
  error: null,

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [userData, statsData, savedProgramsData] = await Promise.all([
        dashboardService.fetchMockUser(),
        dashboardService.fetchMockStats(),
        dashboardService.fetchMockSavedPrograms(),
      ]);

      // 👇 Aqui está o segredo: forçamos os tipos do que vem da service
      set({
        user: userData as any,
        stats: statsData as any[],
        savedPrograms: savedProgramsData as Program[],
        isLoading: false,
        error: null,
      });
    } catch (e) {
      set({
        error: 'Falha ao carregar dados do dashboard.',
        isLoading: false,
        stats: [],
        savedPrograms: [],
      });
    }
  },

  toggleFavorite: (program) => {
    const { savedPrograms } = get();
    const alreadySaved = savedPrograms.some((p) => p.id === program.id);

    if (alreadySaved) {
      set({ savedPrograms: savedPrograms.filter((p) => p.id !== program.id) });
    } else {
      set({ savedPrograms: [...savedPrograms, program] });
    }
  },

  isFavorite: (id) => get().savedPrograms.some((p) => p.id === id),
}));
