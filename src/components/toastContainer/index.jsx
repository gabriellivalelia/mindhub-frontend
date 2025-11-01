import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useToastStore } from "../../stores/useToastStore";

/**
 * Componente ToastContainer - Container para exibição de notificações toast.
 *
 * Renderiza todos os toasts ativos da store, empilhando-os verticalmente
 * no canto superior direito da tela. Cada toast é automaticamente removido
 * após 4 segundos ou quando o usuário fecha manualmente.
 *
 * Tipos de toast suportados (severity):
 * - success: Notificação de sucesso (verde)
 * - error: Notificação de erro (vermelho)
 * - warning: Notificação de aviso (amarelo)
 * - info: Notificação informativa (azul)
 *
 * @component
 * @returns {JSX.Element} Lista de Snackbars com notificações ativas
 *
 * @example
 * // No App.jsx ou layout principal
 * <ToastContainer />
 *
 * // Para adicionar um toast de qualquer lugar
 * const addToast = useToastStore(state => state.addToast);
 * addToast("Operação concluída!", "success");
 */
const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <>
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={4000}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          style={{ top: `${80 + index * 70}px` }}
        >
          <Alert
            onClose={() => removeToast(toast.id)}
            severity={toast.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default ToastContainer;
