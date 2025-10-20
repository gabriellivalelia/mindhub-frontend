import { create } from "zustand";

export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message, severity = "success") => {
    const id = Date.now();
    set((state) => ({
      toasts: [...state.toasts, { id, message, severity }],
    }));
    // Auto-remove após 4 segundos
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 4000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
