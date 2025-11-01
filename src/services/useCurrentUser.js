import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { useAuthStore } from "../stores/useAuthStore";

/**
 * Hook para buscar o usuário atual autenticado
 * @returns {Object} Query object com dados do usuário
 */
export function useCurrentUser() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  console.log(
    "useCurrentUser called with isAuthenticated:",
    isAuthenticated,
    "token:",
    token
  );
  return useQuery({
    queryKey: ["currentUser", token],
    queryFn: async () => {
      try {
        const response = await api.get("/sessions/me");
        return response.data;
      } catch (error) {
        // Se token inválido/expirado, limpar auth
        if (error?.status === 401 || error?.status === 403) {
          clearAuth();
        }
        throw error;
      }
    },
    enabled: isAuthenticated && !!token,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export default useCurrentUser;
