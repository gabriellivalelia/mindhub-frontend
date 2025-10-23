import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
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

  const query = useQuery({
    queryKey: ["currentUser", token],
    queryFn: async () => {
      try {
        const response = await api.get("/sessions/me");
        return response.data;
      } catch (error) {
        // Se token inválido/expirado, limpar auth
        if (error.response?.status === 401 || error.response?.status === 403) {
          clearAuth();
        }
        throw error;
      }
    },
    enabled: isAuthenticated && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: false, // Não retry em erro de autenticação
    refetchOnMount: true, // Sempre revalidar ao montar
    refetchOnWindowFocus: true, // Revalidar ao focar janela
  });

  // Limpar auth se query falhar com erro de autenticação
  useEffect(() => {
    if (query.isError && query.error?.response?.status === 401) {
      clearAuth();
    }
  }, [query.isError, query.error, clearAuth]);

  return query;
}

export default useCurrentUser;
