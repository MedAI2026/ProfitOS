import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const demoCredentials = {
  username: 'demo.operator',
  password: 'ProfitOS2026!',
  displayName: '赵明远',
  title: '生产经营协同演示账号',
};

interface LoginResult {
  success: boolean;
  message?: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  username: string;
  displayName: string;
  title: string;
  lastLoginAt: string | null;
  login: (username: string, password: string) => LoginResult;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: '',
      displayName: '',
      title: '',
      lastLoginAt: null,
      login: (username, password) => {
        const trimmedUsername = username.trim();

        if (
          trimmedUsername !== demoCredentials.username ||
          password !== demoCredentials.password
        ) {
          return {
            success: false,
            message: '演示环境仅开放预置账号，请使用默认用户名和密码登录。',
          };
        }

        set({
          isAuthenticated: true,
          username: demoCredentials.username,
          displayName: demoCredentials.displayName,
          title: demoCredentials.title,
          lastLoginAt: new Date().toISOString(),
        });

        return { success: true };
      },
      logout: () =>
        set({
          isAuthenticated: false,
          username: '',
          displayName: '',
          title: '',
          lastLoginAt: null,
        }),
    }),
    {
      name: 'profitos-demo-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        username: state.username,
        displayName: state.displayName,
        title: state.title,
        lastLoginAt: state.lastLoginAt,
      }),
    },
  ),
);
