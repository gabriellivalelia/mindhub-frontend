// Exemplo de uso da integração com API backend
// Este arquivo demonstra como usar os serviços criados

import {
  useAppointments,
  useAppointment,
  useCreateAppointment,
} from "./useAppointments";
import { useContents } from "./useContents";
import { authService } from "./authService";

// ==================================================
// EXEMPLO 1: Login e Autenticação
// ==================================================

export async function exampleLogin() {
  const result = await authService.login("usuario@example.com", "senha123");

  if (result.success) {
    console.log("Login bem-sucedido!", result.user);
    // Token já está salvo automaticamente
  } else {
    console.error("Erro no login:", result.error);
  }
}

// ==================================================
// EXEMPLO 2: Listar Consultas com Filtro
// ==================================================

export function AppointmentsList() {
  // Hook do TanStack Query
  const { data, isLoading, error, refetch } = useAppointments({
    status: "Confirmado",
    page: 1,
    limit: 10,
  });

  if (isLoading) return <div>Carregando consultas...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h2>Minhas Consultas</h2>
      <button onClick={() => refetch()}>Atualizar</button>

      {data?.items?.map((appointment) => (
        <div key={appointment.id}>
          <p>Data: {appointment.date}</p>
          <p>Horário: {appointment.time}</p>
          <p>Status: {appointment.status}</p>
        </div>
      ))}
    </div>
  );
}

// ==================================================
// EXEMPLO 3: Criar Nova Consulta
// ==================================================

export function CreateAppointmentForm() {
  const createAppointment = useCreateAppointment();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      psychologistId: "123",
      date: "2025-10-25",
      time: "14:00",
      type: "online",
    };

    try {
      const result = await createAppointment.mutateAsync(appointmentData);
      console.log("Consulta criada:", result);
      alert("Consulta agendada com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao agendar: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos do formulário aqui */}
      <button type="submit" disabled={createAppointment.isPending}>
        {createAppointment.isPending ? "Agendando..." : "Agendar Consulta"}
      </button>
    </form>
  );
}

// ==================================================
// EXEMPLO 4: Listar Conteúdos Educacionais
// ==================================================

export function ContentsList() {
  const { data, isLoading } = useContents({
    category: "ansiedade",
    page: 1,
  });

  if (isLoading) return <div>Carregando conteúdos...</div>;

  return (
    <div>
      <h2>Conteúdos Educacionais</h2>
      {data?.items?.map((content) => (
        <article key={content.id}>
          <h3>{content.title}</h3>
          <p>{content.description}</p>
        </article>
      ))}
    </div>
  );
}

// ==================================================
// EXEMPLO 5: Logout
// ==================================================

export async function exampleLogout() {
  await authService.logout();
  console.log("Logout realizado");
  // Redirecionar para /login
  window.location.href = "/login";
}

// ==================================================
// EXEMPLO 6: Verificar Usuário Atual
// ==================================================

export async function checkCurrentUser() {
  const result = await authService.getCurrentUser();

  if (result.success) {
    console.log("Usuário logado:", result.user);
  } else {
    console.log("Usuário não autenticado");
  }
}

// ==================================================
// EXEMPLO 7: Chamadas Diretas com axios (sem hooks)
// ==================================================

import api from "./api";

export async function exampleDirectApiCall() {
  try {
    // GET
    const response = await api.get("/appointments", {
      params: { status: "Confirmado" },
    });
    console.log("Consultas:", response.data);

    // POST
    const newAppointment = await api.post("/appointments", {
      psychologistId: "123",
      date: "2025-10-25",
      time: "14:00",
    });
    console.log("Criado:", newAppointment.data);

    // PUT
    const updated = await api.put("/appointments/456", {
      status: "Cancelado",
    });
    console.log("Atualizado:", updated.data);

    // DELETE
    await api.delete("/appointments/456");
    console.log("Deletado");
  } catch (error) {
    console.error("Erro na API:", error);
  }
}

// ==================================================
// EXEMPLO 8: Usar com useEffect
// ==================================================

import { useEffect } from "react";

export function AppointmentDetail({ appointmentId }) {
  const { data: appointment } = useAppointment(appointmentId);

  useEffect(() => {
    if (appointment) {
      console.log("Consulta carregada:", appointment);
    }
  }, [appointment]);

  return (
    <div>
      {appointment ? (
        <>
          <h2>Detalhes da Consulta</h2>
          <p>ID: {appointment.id}</p>
          <p>Data: {appointment.date}</p>
          <p>Horário: {appointment.time}</p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}
