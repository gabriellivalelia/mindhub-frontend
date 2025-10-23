import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

// Configuração base da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    indexes: null, // Remove índices dos arrays (transforma ?ids[0]=1&ids[1]=2 em ?ids=1&ids=2)
  },
});

// // Flag para evitar múltiplas tentativas de refresh simultâneas
// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// Interceptor de requisição: adiciona token de autenticação
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

// Interceptor de resposta: trata erros e refresh de token
api.interceptors.response.use(
  (response) => {
    // Resposta bem-sucedida, retorna os dados
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;

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
      // Limpar autenticação
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

// Funções auxiliares para requisições comuns
export const apiClient = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  patch: (url, data, config) => api.patch(url, data, config),
  delete: (url, config) => api.delete(url, config),
};

export default api;
