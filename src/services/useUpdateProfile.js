import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "./api";

/**
 * Hook para atualizar perfil do paciente
 */
export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      if (data.name) formData.append("name", data.name);
      if (data.email) formData.append("email", data.email);
      if (data.phone) formData.append("phone_number", data.phone);
      if (data.birthDate) formData.append("birth_date", data.birthDate);
      if (data.gender) formData.append("gender", data.gender);
      if (data.cityId) formData.append("city_id", data.cityId);
      if (data.profilePicture)
        formData.append("profile_picture", data.profilePicture);
      if (data.deleteProfilePicture)
        formData.append("delete_profile_picture", "true");

      const response = await api.put("/patients", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidar cache do usuário atual
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
}

/**
 * Hook para atualizar perfil do psicólogo
 */
export function useUpdatePsychologist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();

      if (data.name) formData.append("name", data.name);
      if (data.email) formData.append("email", data.email);
      if (data.phone) formData.append("phone_number", data.phone);
      if (data.birthDate) formData.append("birth_date", data.birthDate);
      if (data.gender) formData.append("gender", data.gender);
      if (data.cityId) formData.append("city_id", data.cityId);
      if (data.crp) formData.append("crp", data.crp);
      if (data.description) formData.append("description", data.description);
      if (data.valuePerAppointment)
        formData.append("value_per_appointment", data.valuePerAppointment);
      if (data.profilePicture)
        formData.append("profile_picture", data.profilePicture);
      if (data.deleteProfilePicture)
        formData.append("delete_profile_picture", "true");
      if (data.specialties && Array.isArray(data.specialties)) {
        data.specialties.forEach((id) => {
          formData.append("specialty_ids", id);
        });
      }
      if (data.approaches && Array.isArray(data.approaches)) {
        data.approaches.forEach((id) => {
          formData.append("approach_ids", id);
        });
      }
      if (data.audiences && Array.isArray(data.audiences)) {
        data.audiences.forEach((audience) => {
          formData.append("audiences", audience);
        });
      }

      const response = await api.put("/psychologists", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // Invalidar cache do usuário atual
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
}
