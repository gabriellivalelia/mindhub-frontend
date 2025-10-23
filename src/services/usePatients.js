import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { useCurrentUser } from "./useCurrentUser";

/**
 * Hook para buscar perfil do paciente autenticado
 */
export function useCurrentPatient() {
  const { data: user } = useCurrentUser();
  const patientId = user?.id;
  const isPatient = user?.type === "patient";

  return useQuery({
    queryKey: ["currentPatient", patientId],
    queryFn: async () => {
      const response = await api.get(`/patients/${patientId}`);
      return response.data;
    },
    enabled: !!patientId && isPatient,
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para buscar pacientes (com filtros)
 */
export function usePatients(params = {}) {
  return useQuery({
    queryKey: ["patients", params],
    queryFn: async () => {
      const response = await api.get("/patients", { params });
      return response.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Hook para buscar perfil de paciente específico
 */
export function usePatient(patientId) {
  return useQuery({
    queryKey: ["patient", patientId],
    queryFn: async () => {
      const response = await api.get(`/patients/${patientId}`);
      return response.data;
    },
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
}
