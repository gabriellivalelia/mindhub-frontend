import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useCurrentUser } from "../services/useCurrentUser";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * Componente ProtectedRoute - Proteção de rotas que requerem autenticação.
 *
 * Verifica se o usuário está autenticado antes de permitir o acesso.
 * Exibe loader durante a validação e redireciona para login/unauthorized
 * se a autenticação falhar.
 *
 * Fluxo de verificação:
 * 1. Verifica se existe token no store (isAuthenticated)
 * 2. Valida o token com o backend via useCurrentUser
 * 3. Exibe loader durante a validação
 * 4. Redireciona se não autenticado ou token inválido
 * 5. Renderiza as rotas filhas se tudo OK
 *
 * @component
 * @returns {JSX.Element} Outlet com rotas protegidas ou redirecionamento
 *
 * @example
 * // Em routes.jsx
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/home" element={<Home />} />
 *   <Route path="/profile" element={<Profile />} />
 * </Route>
 */
export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { isLoading, isError } = useCurrentUser();

  // Se não está autenticado no store, redireciona
  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Se está carregando, mostra loader (evita flash de conteúdo)
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Se deu erro (token inválido), redireciona
  if (isError) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
