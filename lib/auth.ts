import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  type: 'passenger' | 'company';
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => {
        return {
          getItem: (name: string) => {
            if (typeof window === 'undefined') return null;
            return JSON.parse(window.localStorage.getItem(name) || 'null');
          },
          setItem: (name: string, value: unknown) => {
            if (typeof window === 'undefined') return;
            window.localStorage.setItem(name, JSON.stringify(value));
          },
          removeItem: (name: string) => {
            if (typeof window === 'undefined') return;
            window.localStorage.removeItem(name);
          },
        };
      }),
    }
  )
);