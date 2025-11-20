import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { adminLoginApi } from '../api/api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      login: async (username, password) => {
        const data = await adminLoginApi(username, password);
        
        set({ token: data.token, isAuthenticated: true });
      },
      logout: () => set({ token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // This saves the state to localStorage automatically
    }
  )
);