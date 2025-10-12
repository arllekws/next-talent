import { create } from 'zustand';
import * as dashboardService from '../services/dashboardService';

interface UserDashboardState {
  user: any;
  stats: any[];
  savedPrograms: any[];
  isLoading: boolean;
  error: string | null;
  fetchDashboardData: () => Promise<void>;
}

export const useUserDashboardStore = create<UserDashboardState>((set) => ({
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
      
      set({
        user: userData,
        stats: statsData as any[],
        savedPrograms: savedProgramsData as any[],
        isLoading: false
      });

    } catch (e) {
      set({ error: 'Falha ao carregar dados do dashboard.', isLoading: false });
    }
  },
}));