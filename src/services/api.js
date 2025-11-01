import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

/**
 * Instância configurada do Axios para comunicação com a API do backend.
 *
 * Configurações:
 * - Base URL: Obtida de variável de ambiente (VITE_API_URL) ou localhost:8000
 * - Timeout: 30 segundos
 * - Headers padrão: Content-Type application/json
 * - Interceptors: Adiciona token JWT automaticamente e trata erros globalmente
 *
 * Interceptor de Request:
 * - Adiciona token de autenticação em todas as requisições
 *
 * Interceptor de Response:
 * - 401 (Não autorizado): Limpa autenticação e força novo login
 * - 403 (Proibido): Mensagem de sem permissão
 * - 404 (Não encontrado): Mensagem de recurso não encontrado
 * - 500+ (Erro servidor): Mensagem de erro do servidor
 * - Network Error: Detecta falhas de conexão
 * - Outros: Retorna mensagem do backend ou genérica
 *
 * @constant
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null,
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Se não há resposta (erro de rede), rejeita imediatamente
    if (!error.response) {
      console.error("Erro de rede:", error.message);
      return Promise.reject({
        code: "NETWORK_ERROR",
        message: "Falha na conexão com o servidor. Verifique sua internet.",
      });
    }

    // Status 401 (Não autorizado) - token inválido/expirado
    if (error.response.status === 401) {
      useAuthStore.getState().clearAuth();

      return Promise.reject({
        code: "UNAUTHORIZED",
        message: "Sessão expirada. Faça login novamente.",
        status: 401,
        response: error.response,
      });
    }

    // Status 403 (Proibido) - sem permissão
    if (error.response.status === 403) {
      return Promise.reject({
        code: "FORBIDDEN",
        message: "Você não tem permissão para acessar este recurso.",
        status: 403,
      });
    }

    // Status 404 (Não encontrado)
    if (error.response.status === 404) {
      return Promise.reject({
        code: "NOT_FOUND",
        message: "Recurso não encontrado.",
        status: 404,
      });
    }

    // Status 500+ (Erro do servidor)
    if (error.response.status >= 500) {
      return Promise.reject({
        code: "SERVER_ERROR",
        message: "Erro no servidor. Tente novamente mais tarde.",
        status: error.response.status,
      });
    }

    // Outros erros: retornar mensagem do backend ou genérica
    return Promise.reject({
      code: error.response.data?.code || "API_ERROR",
      message:
        error.response.data?.message || "Erro ao processar sua solicitação.",
      status: error.response.status,
      data: error.response.data,
      response: error.response,
    });
  }
);

/**
 * Objeto com métodos auxiliares para requisições HTTP.
 * Wrapper simplificado sobre a instância do Axios.
 *
 * @constant
 * @type {Object}
 * @property {Function} get - Requisição GET
 * @property {Function} post - Requisição POST
 * @property {Function} put - Requisição PUT
 * @property {Function} patch - Requisição PATCH
 * @property {Function} delete - Requisição DELETE
 *
 * @example
 * import { apiClient } from './api';
 *
 * // GET request
 * const data = await apiClient.get('/users');
 *
 * // POST request
 * const result = await apiClient.post('/users', { name: 'John' });
 */
// Funções auxiliares para requisições comuns
export const apiClient = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  patch: (url, data, config) => api.patch(url, data, config),
  delete: (url, config) => api.delete(url, config),
};

export default api;
