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

  return useQuery({
    queryKey: ["currentUser", token],
    queryFn: async () => {
      const response = await api.get("/sessions/me");
      return response.data;
    },
    enabled: isAuthenticated && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
    onError: (error) => {
      // Se falhar ao buscar o usuário (ex: token inválido), fazer logout
      if (error.response?.status === 401) {
        useAuthStore.getState().clearAuth();
      }
    },
  });
}

export default useCurrentUser;
