import { useQuery } from "@tanstack/react-query";
import api from "./api";

/**
 * Hook para buscar especialidades
 */
export function useSpecialties(params = {}) {
  return useQuery({
    queryKey: ["specialties", params],
    queryFn: async () => {
      const response = await api.get("/specialties", { params });
      return response.data;
    },
    staleTime: 30 * 60 * 1000,
  });
}
