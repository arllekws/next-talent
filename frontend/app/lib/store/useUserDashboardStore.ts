import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { fetchUser, fetchStats, fetchSavedProgramsList } from '../services/dashboardService';
import { saveProgram, unsaveProgram } from '../services/api';

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
  fetchDashboardData: (token: string) => Promise<void>;
  toggleFavorite: (program: Program, token: string) => Promise<void>;
  isFavorite: (id: string | number) => boolean;
}

export const useUserDashboardStore = create<UserDashboardState>()(
  persist(
    (set, get) => ({
      user: null,
      stats: [],
      savedPrograms: [],
      isLoading: true,
      error: null,

      fetchDashboardData: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          const [userData, statsData, savedProgramsData] = await Promise.all([
            fetchUser(token),
            fetchStats(token),
            fetchSavedProgramsList(token),
          ]);

          set({
            user: userData as any,
            stats: statsData as any[],
            savedPrograms: savedProgramsData as Program[],
            isLoading: false,
            error: null,
          });
        } catch (e) {
          console.error('Erro ao buscar dados do dashboard:', e);
          set({
            error: 'Falha ao carregar dados do dashboard.',
            isLoading: false,
            stats: [],
            savedPrograms: [],
          });
        }
      },

      toggleFavorite: async (program, token) => {
        const { savedPrograms } = get();
        const alreadySaved = savedPrograms.some((p) => p.id === program.id);

        try {
          if (alreadySaved) {
            // Remove do backend
            await unsaveProgram(String(program.id), token);
            // Atualiza o estado local
            set({ savedPrograms: savedPrograms.filter((p) => p.id !== program.id) });
          } else {
            // Salva no backend
            await saveProgram(String(program.id), token);
            // Atualiza o estado local
            set({ savedPrograms: [...savedPrograms, program] });
          }
        } catch (error) {
          console.error('Erro ao favoritar/desfavoritar programa:', error);
          // Em caso de erro, não atualiza o estado local
        }
      },

      isFavorite: (id) => get().savedPrograms.some((p) => p.id === id),
    }),
    {
      name: 'user-dashboard', // chave no localStorage
      storage: typeof window !== 'undefined' ? createJSONStorage(() => localStorage) : undefined, // agora usamos storage
      partialize: (state) => ({ savedPrograms: state.savedPrograms }), // só persiste favoritos
    }
  )
);
