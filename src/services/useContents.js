import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

/**
 * Hook para buscar conteúdos educacionais
 * @param {Object} params - Parâmetros de filtro
 * @param {string} params.category - Categoria do conteúdo
 * @param {string} params.search - Termo de busca
 * @param {number} params.page - Número da página
 * @param {number} params.limit - Itens por página
 */
export function useContents(params = {}) {
  return useQuery({
    queryKey: ["contents", params],
    queryFn: async () => {
      const response = await api.get("/contents", { params });
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
}

/**
 * Hook para buscar um conteúdo específico
 */
export function useContent(contentId) {
  return useQuery({
    queryKey: ["content", contentId],
    queryFn: async () => {
      const response = await api.get(`/contents/${contentId}`);
      return response.data;
    },
    enabled: !!contentId,
    staleTime: 10 * 60 * 1000,
  });
}

/**
 * Hook para criar novo conteúdo (apenas psicólogos)
 */
export function useCreateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentData) => {
      const response = await api.post("/contents", contentData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });
}

/**
 * Hook para atualizar conteúdo
 */
export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ contentId, data }) => {
      const response = await api.put(`/contents/${contentId}`, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      queryClient.invalidateQueries({
        queryKey: ["content", variables.contentId],
      });
    },
  });
}

/**
 * Hook para deletar conteúdo
 */
export function useDeleteContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contentId) => {
      await api.delete(`/contents/${contentId}`);
      return contentId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
  });
}
