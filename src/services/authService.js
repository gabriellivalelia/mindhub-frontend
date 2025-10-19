import api from "./api";
import {
  setToken,
  removeToken,
  setUserType,
  removeUserType,
  setUserEmail,
  removeUserEmail,
} from "../utils/auth";

/**
 * Serviço de autenticação
 * Centraliza operações de login, logout e registro
 */

export const authService = {
  /**
   * Faz login do usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} Dados do usuário autenticado
   */
  async login(email, password) {
    try {
      const response = await api.post("/sessions/login", {
        email,
        password,
      });

      const { access_token: accessToken } = response.data;
      setToken(accessToken);

      const result = await this.getCurrentUser();
      if (!result.success) {
        return result;
      }

      const user = result.data;

      setUserType(user.type);
      setUserEmail(user.email);

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },

  /**
   * Verifica se o usuário está autenticado
   * @returns {Promise<Object>} Dados do usuário atual
   */
  async getCurrentUser() {
    try {
      const response = await api.get("/sessions/me");
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  },

  /**
   * Faz logout do usuário
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      // Chamar endpoint de logout no backend (opcional, para invalidar refreshToken)
      await api.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Erro ao fazer logout no servidor:", error);
    } finally {
      // Limpar dados locais independentemente do resultado
      removeToken();
      removeUserType();
      removeUserEmail();
    }
  },
};

export default authService;
