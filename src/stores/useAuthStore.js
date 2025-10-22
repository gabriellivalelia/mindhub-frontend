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

      clearAuth: () => {
        set({
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      // Apenas persistir token e isAuthenticated, não o user
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
