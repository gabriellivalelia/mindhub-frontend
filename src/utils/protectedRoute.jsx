import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useCurrentUser } from "../services/useCurrentUser";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
