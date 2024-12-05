export interface User {
  id: string;
  email: string;
  type: 'passenger' | 'company';
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}