import axios from "axios";
import { getToken } from "../utils/auth";

// Configuração base da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
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
    const token = getToken();

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

    // // Status 401 (Não autorizado) - tentar refresh do token
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   if (isRefreshing) {
    //     // Já estamos tentando refresh, enfileirar esta requisição
    //     return new Promise((resolve, reject) => {
    //       failedQueue.push({ resolve, reject });
    //     })
    //       .then((token) => {
    //         originalRequest.headers.Authorization = `Bearer ${token}`;
    //         return api(originalRequest);
    //       })
    //       .catch((err) => {
    //         return Promise.reject(err);
    //       });
    //   }

    //   originalRequest._retry = true;
    //   isRefreshing = true;

    //   try {
    //     // Tentar refresh do token (adapte este endpoint conforme sua API)
    //     const response = await axios.post(
    //       `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/auth/refresh`,
    //       {},
    //       {
    //         withCredentials: true, // Envia cookies (refreshToken)
    //       }
    //     );

    //     const { accessToken } = response.data;
    //     setToken(accessToken);

    //     // Processar fila de requisições que aguardavam o refresh
    //     processQueue(null, accessToken);

    //     // Repetir requisição original com novo token
    //     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
    //     return api(originalRequest);
    //   } catch (refreshError) {
    //     // Falha no refresh - fazer logout
    //     processQueue(refreshError, null);
    //     removeToken();

    //     // Redirecionar para login (se não estiver lá)
    //     if (
    //       window.location.pathname !== "/login" &&
    //       window.location.pathname !== "/"
    //     ) {
    //       window.location.href = "/login";
    //     }

    //     return Promise.reject(refreshError);
    //   } finally {
    //     isRefreshing = false;
    //   }
    // }

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
