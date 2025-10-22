import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

/**
 * Hook para buscar consultas (agendamentos)
 * @param {Object} params - Parâmetros de filtro
 * @param {string} params.status - Filtrar por status
 * @param {string} params.date - Filtrar por data
 * @param {number} params.page - Número da página
 * @param {number} params.size - Itens por página
 * @returns {Object} Query result com data, isLoading, error, etc.
 */
export function useAppointments(params = {}) {
  return useQuery({
    queryKey: ["appointments", params],
    queryFn: async () => {
      const response = await api.get("/appointments", { params });
      return response.data;
    },
  });
}

/**
 * Hook para buscar uma consulta específica
 * @param {string} appointmentId - ID da consulta
 */
export function useAppointment(appointmentId) {
  return useQuery({
    queryKey: ["appointment", appointmentId],
    queryFn: async () => {
      const response = await api.get(`/appointments/${appointmentId}`);
      return response.data;
    },
    enabled: !!appointmentId, // Só executa se houver ID
  });
}

/**
 * Hook para criar nova consulta
 */
export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentData) => {
      const response = await api.post("/appointments", appointmentData);
      return response.data;
    },
    onSuccess: () => {
      // Invalidar cache de consultas para refetch automático
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

/**
 * Hook para solicitar agendamento de consulta (paciente)
 * @example
 * const solicitAppointment = useSolicitScheduleAppointment();
 * await solicitAppointment.mutateAsync({
 *   psychologist_id: "uuid-do-psicologo",
 *   appointment_date: "2025-10-24T10:00:00Z"
 * });
 */
export function useSolicitScheduleAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ psychologist_id, appointment_date }) => {
      const response = await api.post(
        `/patients/solicit-schedule-appointment/${psychologist_id}`,
        appointment_date, // Body com a data
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["psychologists"] });
    },
  });
}

/**
 * Hook para atualizar consulta
 */
export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ appointmentId, data }) => {
      const response = await api.put(`/appointments/${appointmentId}`, data);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Invalidar lista de consultas
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      // Invalidar consulta específica
      queryClient.invalidateQueries({
        queryKey: ["appointment", variables.appointmentId],
      });
    },
  });
}

/**
 * Hook para cancelar consulta
 */
export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId) => {
      const response = await api.patch(`/appointments/${appointmentId}/cancel`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

/**
 * Hook para confirmar pagamento
 */
export function useConfirmPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ appointmentId, paymentData }) => {
      const response = await api.post(
        `/appointments/${appointmentId}/payment`,
        paymentData
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({
        queryKey: ["appointment", variables.appointmentId],
      });
    },
  });
}

/**
 * Hook para reagendar consulta
 */
export function useRescheduleAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ appointmentId, newDate, newTime }) => {
      const response = await api.patch(
        `/appointments/${appointmentId}/reschedule`,
        {
          date: newDate,
          time: newTime,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

/**
 * Hook para paciente marcar que enviou o pagamento
 */
export function useMarkPaymentSent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId) => {
      const response = await api.post(
        `/patients/appointments/${appointmentId}/mark-payment-sent`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}

/**
 * Hook para psicólogo confirmar recebimento do pagamento
 */
export function usePsychologistConfirmPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (appointmentId) => {
      const response = await api.post(
        `/psychologists/appointments/${appointmentId}/confirm-payment`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
