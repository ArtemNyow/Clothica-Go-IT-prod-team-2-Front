// authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean; // тут явно додаємо
  setUser: (user: User) => void;
  clearAuth: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      setUser: user => set({ user, isAuthenticated: true }),
      clearAuth: () =>
        set({ user: null, isAuthenticated: false }),
      setHasHydrated: hasHydrated => set({ hasHydrated }),
    }),
    {
      name: 'auth-store',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    }
  )
);
