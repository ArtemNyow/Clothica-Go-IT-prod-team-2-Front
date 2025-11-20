import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>(set => ({
  user: null,
  isAuthenticated: false,

  setUser: (user: User | null) =>
    set({ user, isAuthenticated: true }),
  clearAuth: () =>
    set({ user: null, isAuthenticated: false }),
}));
