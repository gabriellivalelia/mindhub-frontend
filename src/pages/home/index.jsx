import React, { useMemo, useState } from "react";
import {
  PageContainer,
  Container,
  Card,
  NextAppointment,
  UpcomingList,
  BottomActions,
  AppointmentItem,
  ActionsRow,
  TopActions,
  SectionTitle,
  Row,
  Avatar,
  StrongText,
  MutedText,
  Padded,
  RightText,
  ScheduleButton,
  Info,
} from "./styles";
import { SubHeader } from "../../components";
import {
  useAppointments,
  useCancelAppointment,
  useCompleteAppointment,
  usePsychologistConfirmPayment,
} from "../../services/useAppointments";
import { usePsychologists } from "../../services/usePsychologists";
import { usePatients } from "../../services/usePatients";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CancelIcon from "@mui/icons-material/Cancel";
import Colors from "../../globalConfigs/globalStyles/colors";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../services/useCurrentUser";
import { useToastStore } from "../../stores/useToastStore";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Brightness1 from "@mui/icons-material/Brightness1";
import { FontSizes } from "../../globalConfigs";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  formatDateTime,
  formatTime,
  parseServerDateToLocal,
} from "../../utils/formatDate";

const STATUS_MAP = {
  waiting_for_payment: "Aguardando pagamento",
  pending_confirmation: "Aguardando confirmação",
  confirmed: "Confirmada",
  completed: "Realizada",
  canceled: "Cancelada",
};

const getStatusColor = (status) => {
  switch (status) {
    case "Aguardando pagamento":
      return Colors.ORANGE;
    case "Aguardando confirmação":
      return Colors.YELLOW;
    case "Confirmada":
      return Colors.GREEN;
    case "Cancelada":
      return Colors.RED;
    case "Realizada":
      return Colors.PURPLE;
    default:
      return Colors.GREY;
  }
};

function Home() {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  // Buscar consultas do usuário
  const { data: appointmentsData, isLoading } = useAppointments({
    page: 1,
    size: 1000, // Buscar todas para filtrar localmente
    ...(user?.type === "psychologist" && { psychologist_id: user?.id }),
    ...(user?.type === "patient" && { patient_id: user?.id }),
  });

  // Buscar psicólogos (para pacientes)
  const { data: psychologistsData } = usePsychologists({
    page: 1,
    size: 1000,
  });

  // Buscar pacientes (para psicólogos)
  const { data: patientsData } = usePatients({
    page: 1,
    size: 1000,
  });

  const cancelAppointmentMutation = useCancelAppointment();
  const completeAppointmentMutation = useCompleteAppointment();
  const confirmPaymentMutation = usePsychologistConfirmPayment();
  const addToast = useToastStore((state) => state.addToast);

  // Mapear dados das consultas
  const appointments = useMemo(() => {
    if (!appointmentsData?.items) return [];

    const psychologistsMap = (psychologistsData?.items || []).reduce(
      (acc, psychologist) => {
        acc[psychologist.id] = psychologist;
        return acc;
      },
      {}
    );

    const patientsMap = (patientsData?.items || []).reduce((acc, patient) => {
      acc[patient.id] = patient;
      return acc;
    }, {});

    return appointmentsData.items.map((appointment) => {
      const psychologist = psychologistsMap[appointment.psychologist_id] || {};
      const patient = patientsMap[appointment.patient_id] || {};

      const apptDate = parseServerDateToLocal(appointment.date);
      const msUntil = apptDate ? apptDate.getTime() - new Date().getTime() : 0;
      const allowedByTime = msUntil >= 12 * 60 * 60 * 1000; // at least 12 hours ahead
      const allowedByStatus = [
        "waiting_for_payment",
        "pending_confirmation",
      ].includes(appointment.status);
      const forbiddenStatus = ["canceled", "completed"].includes(
        appointment.status
      );

      // Permitir reagendar apenas se não cancelada/realizada E com pelo menos 12h
      const canReschedule =
        !forbiddenStatus &&
        allowedByTime &&
        ["confirmed", "pending_confirmation"].includes(appointment.status);

      return {
        id: appointment.id,
        datetime: appointment.date,
        professional: psychologist.name || "Psicólogo não encontrado",
        professionalPicture:
          psychologist.profile_picture?.src || "/default-avatar.png",
        professionalId: appointment.psychologist_id,
        patient: patient.name || "Paciente não encontrado",
        patientPicture: patient.profile_picture?.src || "/default-avatar.png",
        patientId: appointment.patient_id,
        status: STATUS_MAP[appointment.status] || appointment.status,
        rawStatus: appointment.status,
        price: appointment.pix_payment?.value || 0,
        canCancel: !forbiddenStatus && (allowedByTime || allowedByStatus),
        canReschedule: canReschedule,
      };
    });
  }, [appointmentsData, psychologistsData, patientsData]);

  const upcoming = useMemo(() => {
    const now = new Date();
    // For patients: any status except canceled
    // For psychologists: only confirmed appointments
    const future = (appointments || []).filter((c) => {
      const d = parseServerDateToLocal(c.datetime);
      if (user?.type === "patient") {
        return d && d >= now && c.rawStatus !== "canceled";
      }
      return d && d >= now && c.rawStatus === "confirmed";
    });
    future.sort((a, b) => {
      const da = parseServerDateToLocal(a.datetime);
      const db = parseServerDateToLocal(b.datetime);
      return (da?.getTime() || 0) - (db?.getTime() || 0);
    });
    return future;
  }, [appointments, user?.type]);

  const next = upcoming[0] || null;
  const lastPast = useMemo(() => {
    const now = new Date();
    // Only consider past appointments that were completed for the 'lastPast' slot
    const past = (appointments || []).filter((c) => {
      const d = parseServerDateToLocal(c.datetime);
      return d && d < now && c.rawStatus === "completed";
    });
    past.sort((a, b) => {
      const da = parseServerDateToLocal(a.datetime);
      const db = parseServerDateToLocal(b.datetime);
      return (db?.getTime() || 0) - (da?.getTime() || 0);
    });
    return past[0] || null;
  }, [appointments]);

  const todaysAppointments = useMemo(() => {
    if (user?.type !== "psychologist") return [];
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    return (appointments || [])
      .filter((c) => {
        const dt = parseServerDateToLocal(c.datetime);
        // Excluir consultas canceladas
        return dt && dt >= start && dt < end && c.rawStatus !== "canceled";
      })
      .sort((a, b) => {
        const da = parseServerDateToLocal(a.datetime);
        const db = parseServerDateToLocal(b.datetime);
        return (da?.getTime() || 0) - (db?.getTime() || 0);
      });
  }, [user?.type, appointments]);

  const markAsCompleted = async (id) => {
    try {
      await completeAppointmentMutation.mutateAsync(id);
      addToast("Consulta marcada como concluída", "success");
      // Recarregar a página para atualizar a lista
      window.location.reload();
    } catch (err) {
      console.error("Erro ao marcar consulta como concluída:", err);
      addToast(
        err.response?.data?.message ||
          "Erro ao marcar consulta como concluída. Tente novamente.",
        "error"
      );
    }
  };

  const confirmPayment = async (id) => {
    try {
      await confirmPaymentMutation.mutateAsync(id);
      addToast("Pagamento confirmado com sucesso", "success");
      // Recarregar a página para atualizar a lista
      window.location.reload();
    } catch (err) {
      console.error("Erro ao confirmar pagamento:", err);
      addToast(
        err.response?.data?.message ||
          "Erro ao confirmar pagamento. Tente novamente.",
        "error"
      );
    }
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleReschedule = (appointment) => {
    handleMenuClose();
    if (!appointment) return;
    navigate("/schedule-new-appointment", {
      state: { preselectId: appointment.professionalId },
    });
  };

  const handleCancel = async (appointmentId) => {
    handleMenuClose();
    try {
      await cancelAppointmentMutation.mutateAsync(appointmentId);
      addToast("Consulta cancelada com sucesso", "success");
      // Recarregar a página para atualizar próxima/última consulta
      window.location.reload();
    } catch (err) {
      console.error("Erro ao cancelar consulta:", err);
      addToast(
        err.response?.data?.message ||
          "Erro ao cancelar consulta. Tente novamente.",
        "error"
      );
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <SubHeader text="Home" />
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            <CircularProgress sx={{ color: Colors.ORANGE }} />
          </Box>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SubHeader text="Home" />
      <Container>
        {user?.type === "psychologist" && (
          <Card>
            <SectionTitle>Consultas de Hoje</SectionTitle>
            {todaysAppointments.length ? (
              <UpcomingList>
                {todaysAppointments.map((c) => {
                  const displayName =
                    user?.type === "psychologist"
                      ? c.patient || c.professional
                      : c.professional;
                  const displayPicture =
                    user?.type === "psychologist"
                      ? c.patientPicture || c.professionalPicture
                      : c.professionalPicture;
                  return (
                    <AppointmentItem key={c.id}>
                      <Row p="6px">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            minWidth: "45%",
                          }}
                        >
                          <Avatar
                            src={displayPicture}
                            alt={displayName}
                            size={48}
                          />
                          <Info>
                            <StrongText>{displayName}</StrongText>
                            <MutedText>
                              <ScheduleIcon
                                sx={{
                                  color: Colors.GREY,
                                  fontSize: FontSizes.MEDIUM,
                                }}
                              />
                              {formatTime(c.datetime)}
                            </MutedText>
                          </Info>
                        </div>
                        <RightText>
                          <Brightness1
                            sx={{
                              fontSize: FontSizes.NORMAL,
                              color: getStatusColor(c.status),
                            }}
                          />
                          {c.status}
                        </RightText>
                        {c.rawStatus === "confirmed" &&
                        parseServerDateToLocal(c.datetime) < new Date() ? (
                          <Button
                            variant="contained"
                            disableElevation
                            disabled={completeAppointmentMutation.isPending}
                            sx={{
                              backgroundColor: Colors.ORANGE,
                              color: Colors.WHITE,
                              textTransform: "none",
                              boxShadow: "none",
                              minWidth: 185,
                            }}
                            onClick={() => markAsCompleted(c.id)}
                          >
                            {completeAppointmentMutation.isPending
                              ? "Marcando..."
                              : "Marcar como concluída"}
                          </Button>
                        ) : c.rawStatus === "pending_confirmation" ? (
                          <Button
                            variant="contained"
                            disableElevation
                            disabled={confirmPaymentMutation.isPending}
                            sx={{
                              backgroundColor: Colors.ORANGE,
                              color: Colors.WHITE,
                              textTransform: "none",
                              boxShadow: "none",
                              minWidth: 185,
                            }}
                            onClick={() => confirmPayment(c.id)}
                          >
                            {confirmPaymentMutation.isPending
                              ? "Confirmando..."
                              : "Confirmar pagamento"}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{
                              backgroundColor: c.canCancel
                                ? Colors.LIGHT_ORANGE
                                : Colors.GREY,
                              color: Colors.WHITE,
                              textTransform: "none",
                              boxShadow: "none",
                              minWidth: 185,
                            }}
                            onClick={() => c.canCancel && handleCancel(c.id)}
                          >
                            Cancelar consulta
                          </Button>
                        )}
                      </Row>
                    </AppointmentItem>
                  );
                })}
              </UpcomingList>
            ) : (
              <Padded p="8px">Nenhuma consulta para hoje.</Padded>
            )}
          </Card>
        )}

        {user?.type === "patient" && (
          <>
            <Card>
              <SectionTitle>Próxima Consulta</SectionTitle>
              {next ? (
                <NextAppointment>
                  <Row p="2%">
                    <Avatar
                      src={next.professionalPicture}
                      alt={next.professional}
                    />
                    <Info>
                      <StrongText>{next.professional}</StrongText>
                      <MutedText>
                        <ScheduleIcon
                          sx={{
                            color: Colors.GREY,
                            fontSize: FontSizes.MEDIUM,
                          }}
                        />
                        {formatDateTime(next.datetime)}
                      </MutedText>
                    </Info>
                  </Row>
                  <ActionsRow>
                    {(next.canReschedule || next.canCancel) && (
                      <IconButton
                        size="small"
                        onClick={handleMenuOpen}
                        sx={{ color: Colors.GREY }}
                        aria-controls={
                          menuOpen ? "next-appointment-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={menuOpen ? "true" : undefined}
                      >
                        <MoreHoriz />
                      </IconButton>
                    )}
                    <Menu
                      id="next-appointment-menu"
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      {next.canReschedule && (
                        <MenuItem onClick={() => handleReschedule(next)}>
                          <ListItemIcon>
                            <ScheduleIcon
                              sx={{ color: Colors.LIGHT_ORANGE }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          Reagendar consulta
                        </MenuItem>
                      )}
                      {next.canCancel ? (
                        <MenuItem onClick={() => handleCancel(next.id)}>
                          <ListItemIcon>
                            <CancelIcon
                              sx={{ color: Colors.GREY }}
                              fontSize="small"
                            />
                          </ListItemIcon>
                          Cancelar consulta
                        </MenuItem>
                      ) : null}
                    </Menu>
                  </ActionsRow>
                </NextAppointment>
              ) : (
                <div>Nenhuma consulta agendada.</div>
              )}
            </Card>

            <Card>
              <SectionTitle>Última Consulta</SectionTitle>
              {lastPast ? (
                <AppointmentItem>
                  {(() => {
                    const hasReagendar = !next;
                    return (
                      <Row
                        p="2%"
                        style={{
                          justifyContent: hasReagendar
                            ? undefined
                            : "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <Avatar
                            src={lastPast.professionalPicture}
                            alt={lastPast.professional}
                            size={48}
                          />
                          <Info>
                            <StrongText>{lastPast.professional}</StrongText>
                            <MutedText>
                              <ScheduleIcon
                                sx={{
                                  color: Colors.GREY,
                                  fontSize: FontSizes.MEDIUM,
                                }}
                              />
                              {formatDateTime(lastPast.datetime)}
                            </MutedText>
                          </Info>
                        </div>
                        <RightText>
                          <Brightness1
                            sx={{
                              fontSize: FontSizes.NORMAL,
                              color: getStatusColor(lastPast.status),
                            }}
                          />
                          {lastPast.status}
                        </RightText>
                        {user?.type === "patient" && !next && (
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{
                              backgroundColor: Colors.LIGHT_ORANGE,
                              color: Colors.WHITE,
                              textTransform: "none",
                              boxShadow: "none",
                            }}
                            onClick={() =>
                              navigate("/schedule-new-appointment", {
                                state: { preselectId: lastPast.professionalId },
                              })
                            }
                          >
                            Reagendar com esse psicólogo
                          </Button>
                        )}
                      </Row>
                    );
                  })()}
                </AppointmentItem>
              ) : (
                <Padded p="2%">Nenhuma consulta anterior registrada.</Padded>
              )}
            </Card>
          </>
        )}
      </Container>
      {user?.type === "patient" && (
        <BottomActions>
          <ScheduleButton onClick={() => navigate("/schedule-new-appointment")}>
            Agendar consulta
          </ScheduleButton>
        </BottomActions>
      )}
    </PageContainer>
  );
}

export default Home;
