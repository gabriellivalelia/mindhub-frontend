import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

/**
 * Hook para buscar disponibilidades do psicólogo
 * @param {string} psychologistId - ID do psicólogo
 * @param {Object} params - Parâmetros de filtro (data inicial, data final)
 */
export function useAvailabilities(psychologistId, params = {}) {
  return useQuery({
    queryKey: ["availabilities", psychologistId, params],
    queryFn: async () => {
      const response = await api.get(
        `/psychologists/${psychologistId}/availabilities`,
        { params }
      );
      return response.data;
    },
    enabled: !!psychologistId,
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}

/**
 * Hook para atualizar disponibilidades do psicólogo
 */
export function useUpdateAvailabilities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ psychologistId, availabilities }) => {
      const response = await api.put(
        `/psychologists/${psychologistId}/availabilities`,
        { availabilities }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["availabilities", variables.psychologistId],
      });
    },
  });
}

/**
 * Hook para buscar psicólogos (com filtros)
 */
export function usePsychologists(params = {}) {
  return useQuery({
    queryKey: ["psychologists", params],
    queryFn: async () => {
      const response = await api.get("/psychologists", { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para buscar perfil de psicólogo específico
 */
export function usePsychologist(psychologistId) {
  return useQuery({
    queryKey: ["psychologist", psychologistId],
    queryFn: async () => {
      const response = await api.get(`/psychologists/${psychologistId}`);
      return response.data;
    },
    enabled: !!psychologistId,
    staleTime: 5 * 60 * 1000,
  });
}
