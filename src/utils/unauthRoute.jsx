import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

/**
 * Componente UnauthRoute - Proteção de rotas para usuários NÃO autenticados.
 *
 * Impede que usuários já autenticados acessem páginas públicas como
 * login e registro, redirecionando-os para a home.
 *
 * @component
 * @returns {JSX.Element} Outlet com rotas públicas ou redirecionamento para home
 *
 * @example
 * // Em routes.jsx
 * <Route element={<UnauthRoute />}>
 *   <Route path="/login" element={<Login />} />
 *   <Route path="/register" element={<Register />} />
 * </Route>
 */
export default function UnauthRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/" replace />;

  return <Outlet />;
}
