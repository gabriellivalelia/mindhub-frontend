import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import { useCurrentUser } from "./useCurrentUser";

/**
 * Hook para buscar perfil do psicólogo autenticado
 */
export function useCurrentPsychologist() {
  const { data: user } = useCurrentUser();
  const psychologistId = user?.id;
  const isPsychologist = user?.type === "psychologist";

  return useQuery({
    queryKey: ["currentPsychologist", psychologistId],
    queryFn: async () => {
      const response = await api.get(`/psychologists/${psychologistId}`);
      return response.data;
    },
    enabled: !!psychologistId && isPsychologist,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para adicionar disponibilidades do psicólogo autenticado
 * @returns {Object} Mutation object com mutateAsync e outras propriedades
 * @example
 * const addAvailabilities = useAddAvailabilities();
 * await addAvailabilities.mutateAsync({
 *   availabilityDatetimes: [
 *     "2025-10-05T18:50:29.022Z",
 *     "2025-10-15T18:50:29.022Z"
 *   ]
 * });
 */
export function useAddAvailabilities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (availabilityDatetimes) => {
      const response = await api.post(
        "/psychologists/availabilities",
        availabilityDatetimes
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidar cache do psicólogo atual
      queryClient.invalidateQueries({
        queryKey: ["currentPsychologist", data.id],
      });
      // Invalidar cache de psicólogo individual
      queryClient.invalidateQueries({
        queryKey: ["psychologist", data.id],
      });
      // Invalidar lista de psicólogos
      queryClient.invalidateQueries({
        queryKey: ["psychologists"],
      });
    },
  });
}

export function useRemoveAvailabilities() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (availabilityDatetimes) => {
      const response = await api.delete("/psychologists/availabilities", {
        data: availabilityDatetimes,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidar cache do psicólogo atual
      queryClient.invalidateQueries({
        queryKey: ["currentPsychologist", data.id],
      });
      // Invalidar cache de psicólogo individual
      queryClient.invalidateQueries({
        queryKey: ["psychologist", data.id],
      });
      // Invalidar lista de psicólogos
      queryClient.invalidateQueries({
        queryKey: ["psychologists"],
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
