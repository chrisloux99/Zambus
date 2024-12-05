import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from './types';
import { setAuthUser, removeAuthUser } from './storage';

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => {
        set({ user, isAuthenticated: true });
        setAuthUser(user);
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        removeAuthUser();
      },
    }),
    {
      name: 'auth-storage',
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    }
  )
);