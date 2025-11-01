import { useMutation, useQuery } from "@tanstack/react-query";
import api from "./api";

/**
 * Hook para registrar um novo paciente
 */
export function useRegisterPatient() {
  return useMutation({
    mutationFn: async (patientData) => {
      const formData = new FormData();

      formData.append("name", patientData.name);
      formData.append("email", patientData.email);
      formData.append("password", patientData.password);
      formData.append("cpf", patientData.cpf);
      formData.append("phone_number", patientData.phone);
      formData.append("birth_date", patientData.birthDate);
      formData.append("gender", patientData.gender);
      formData.append("city_id", patientData.cityId);

      const response = await api.post("/patients", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
}

/**
 * Hook para registrar um novo psicólogo
 */
export function useRegisterPsychologist() {
  return useMutation({
    mutationFn: async (psychologistData) => {
      const formData = new FormData();

      formData.append("name", psychologistData.name);
      formData.append("email", psychologistData.email);
      formData.append("password", psychologistData.password);
      formData.append("cpf", psychologistData.cpf);
      formData.append("phone_number", psychologistData.phone);
      formData.append("birth_date", psychologistData.birthDate);
      formData.append("gender", psychologistData.gender);
      formData.append("city_id", psychologistData.cityId);
      formData.append("crp", psychologistData.crp);

      if (psychologistData.valuePerAppointment) {
        formData.append(
          "value_per_appointment",
          psychologistData.valuePerAppointment
        );
      }

      if (
        psychologistData.specialties &&
        psychologistData.specialties.length > 0
      ) {
        psychologistData.specialties.forEach((specialtyId) => {
          formData.append("specialty_ids", specialtyId);
        });
      }

      if (
        psychologistData.approaches &&
        psychologistData.approaches.length > 0
      ) {
        psychologistData.approaches.forEach((approachId) => {
          formData.append("approach_ids", approachId);
        });
      }

      if (psychologistData.audiences && psychologistData.audiences.length > 0) {
        psychologistData.audiences.forEach((audience) => {
          formData.append("audiences", audience);
        });
      }

      const response = await api.post("/psychologists", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },
  });
}

/**
 * Hook para buscar todos os estados
 */
export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const response = await api.get("/states", { params: { size: 100 } });
      return response.data;
    },
    staleTime: 30 * 60 * 1000,
  });
}

/**
 * Hook para buscar cidades de um estado
 * @param {string} stateId - ID do estado
 */
export function useCitiesByState(stateId) {
  return useQuery({
    queryKey: ["cities", stateId],
    queryFn: async () => {
      const response = await api.get(`/cities/${encodeURIComponent(stateId)}`);
      return response.data;
    },
    enabled: !!stateId,
    staleTime: 30 * 60 * 1000,
  });
}
