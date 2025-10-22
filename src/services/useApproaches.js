import { useQuery } from "@tanstack/react-query";
import api from "./api";

/**
 * Hook para buscar abordagens
 */
export function useApproaches(params = {}) {
  return useQuery({
    queryKey: ["approaches", params],
    queryFn: async () => {
      const response = await api.get("/approaches", { params });
      return response.data;
    },
    staleTime: 30 * 60 * 1000, // 30 minutos
  });
}
