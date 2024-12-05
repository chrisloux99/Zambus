import { User } from './types';

export const AUTH_STORAGE_KEY = 'zambus-auth';
export const USERS_STORAGE_KEY = 'zambus-users';

export const getStoredUsers = (): any[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const storeUser = (users: any[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const setAuthUser = (user: User) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
};

export const removeAuthUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_STORAGE_KEY);
};