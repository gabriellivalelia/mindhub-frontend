import { create } from "zustand";

/**
 * Store Zustand para gerenciar notificações toast na aplicação.
 * Os toasts são automaticamente removidos após 4 segundos.
 *
 * @typedef {Object} Toast
 * @property {number} id - Identificador único do toast
 * @property {string} message - Mensagem a ser exibida
 * @property {string} severity - Tipo de notificação: "success", "error", "warning", "info"
 *
 * @typedef {Object} ToastState
 * @property {Toast[]} toasts - Array de toasts ativos
 * @property {Function} addToast - Adiciona um novo toast
 * @property {Function} removeToast - Remove um toast específico
 *
 * @example
 * const { toasts, addToast, removeToast } = useToastStore();
 *
 * // Adicionar toast de sucesso
 * addToast("Operação realizada com sucesso!", "success");
 *
 * // Adicionar toast de erro
 * addToast("Erro ao processar requisição", "error");
 *
 * // Remover toast manualmente
 * removeToast(toastId);
 */
export const useToastStore = create((set) => ({
  toasts: [],

  /**
   * Adiciona um novo toast à lista de notificações.
   * O toast é automaticamente removido após 4 segundos.
   *
   * @param {string} message - Mensagem a ser exibida no toast
   * @param {string} [severity="success"] - Tipo de notificação: "success", "error", "warning", "info"
   */
  addToast: (message, severity = "success") => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, severity }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 4000);
  },

  /**
   * Remove um toast específico da lista.
   *
   * @param {number} id - ID do toast a ser removido
   */
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
