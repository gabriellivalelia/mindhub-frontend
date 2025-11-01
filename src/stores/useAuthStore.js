import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Store Zustand para gerenciar o estado de autenticação do usuário.
 * Persiste o token e o status de autenticação no localStorage.
 *
 * @typedef {Object} AuthState
 * @property {string|null} token - Token JWT do usuário autenticado
 * @property {boolean} isAuthenticated - Indica se o usuário está autenticado
 * @property {Function} setToken - Define o token e atualiza o status de autenticação
 * @property {Function} clearAuth - Limpa o token e o status de autenticação
 *
 * @example
 * const { token, isAuthenticated, setToken, clearAuth } = useAuthStore();
 *
 * // Definir token após login
 * setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...");
 *
 * // Limpar autenticação no logout
 * clearAuth();
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,

      /**
       * Define o token de autenticação e atualiza o status.
       *
       * @param {string} token - Token JWT retornado pelo backend
       */
      setToken: (token) => {
        set({
          token,
          isAuthenticated: !!token,
        });
      },

      /**
       * Limpa os dados de autenticação (logout).
       */
      clearAuth: () => {
        set({
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
