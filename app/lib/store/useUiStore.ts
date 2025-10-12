// app/lib/store/useUiStore.ts
import { create } from 'zustand';

interface UiState {
  isRegisterModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isRegisterModalOpen: false,
  openRegisterModal: () => set({ isRegisterModalOpen: true }),
  closeRegisterModal: () => set({ isRegisterModalOpen: false }),
}));