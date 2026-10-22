import { create } from 'zustand';
import { apiClient } from '../api/client';
import { AuthUser } from '../types/models';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (payload: { phone?: string; email?: string; password: string; pseudo: string; fullName?: string }) => Promise<void>;
  logout: () => void;
}

const storedUser = localStorage.getItem('afrivibe_user');

export const useAuthStore = create<AuthState>((set) => ({
  user: storedUser ? (JSON.parse(storedUser) as AuthUser) : null,
  isLoading: false,

  login: async (identifier, password) => {
    set({ isLoading: true });
    try {
      const { data } = await apiClient.post('/auth/login', { identifier, password });
      localStorage.setItem('afrivibe_token', data.accessToken);
      localStorage.setItem('afrivibe_user', JSON.stringify(data.user));
      set({ user: data.user });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (payload) => {
    set({ isLoading: true });
    try {
      const { data } = await apiClient.post('/auth/register', payload);
      localStorage.setItem('afrivibe_token', data.accessToken);
      localStorage.setItem('afrivibe_user', JSON.stringify(data.user));
      set({ user: data.user });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('afrivibe_token');
    localStorage.removeItem('afrivibe_user');
    set({ user: null });
  },
}));
