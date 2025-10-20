import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      setToken: (token) => {
        set({
          token,
          isAuthenticated: !!token,
        });
      },

      setUser: (user) => {
        set({ user });
      },

      setAuthData: (token, user) => {
        set({
          token,
          user,
          isAuthenticated: !!token,
        });
      },

      clearAuth: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
