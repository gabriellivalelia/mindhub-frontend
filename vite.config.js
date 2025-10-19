import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configuração de proxy para desenvolvimento (opcional)
    // Útil quando o backend está em domínio/porta diferente
    proxy: {
      "/api": {
        target: "http://localhost:3000", // URL do backend
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ''), // Descomente se o backend não usa /api no path
      },
    },
  },
});
