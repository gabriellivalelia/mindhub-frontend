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
import { useAppointments } from "../../services/useAppointments";
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
      };
    });
  }, [appointmentsData, psychologistsData, patientsData]);

  const upcoming = useMemo(() => {
    const now = new Date();
    const future = (appointments || []).filter((c) => {
      const d = parseServerDateToLocal(c.datetime);
      return d && d >= now;
    });
    future.sort((a, b) => {
      const da = parseServerDateToLocal(a.datetime);
      const db = parseServerDateToLocal(b.datetime);
      return (da?.getTime() || 0) - (db?.getTime() || 0);
    });
    return future;
  }, [appointments]);

  const next = upcoming[0] || null;
  const lastPast = useMemo(() => {
    const now = new Date();
    const past = (appointments || []).filter((c) => {
      const d = parseServerDateToLocal(c.datetime);
      return d && d < now;
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
        return dt && dt >= start && dt < end;
      })
      .sort((a, b) => {
        const da = parseServerDateToLocal(a.datetime);
        const db = parseServerDateToLocal(b.datetime);
        return (da?.getTime() || 0) - (db?.getTime() || 0);
      });
  }, [user?.type, appointments]);

  const markAsCompleted = (id) => {
    console.log("Marking as completed:", id);
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

  const handleCancel = (appointmentId) => {
    handleMenuClose();
    // Não é possível atualizar state local, pois agora os dados vêm da API
    // Aqui deveria chamar uma mutation para cancelar a consulta
    console.log("Cancelling appointment:", appointmentId);
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
                        {new Date(c.datetime) < new Date() ? (
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{
                              backgroundColor: Colors.ORANGE,
                              color: Colors.WHITE,
                              textTransform: "none",
                              boxShadow: "none",
                              minWidth: 185,
                            }}
                            onClick={() => markAsCompleted(c.id)}
                          >
                            Marcar como concluída
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            disableElevation
                            sx={{
                              backgroundColor: Colors.GREY,
                              color: Colors.WHITE,
                              textTransform: "none",
                              boxShadow: "none",
                              minWidth: 185,
                            }}
                            onClick={() => markAsCompleted(c.id)}
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
                    <Menu
                      id="next-appointment-menu"
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleMenuClose}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <MenuItem onClick={() => handleReschedule(next)}>
                        <ListItemIcon>
                          <ScheduleIcon
                            sx={{ color: Colors.LIGHT_ORANGE }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        Reagendar consulta
                      </MenuItem>
                      <MenuItem onClick={() => handleCancel(next.id)}>
                        <ListItemIcon>
                          <CancelIcon
                            sx={{ color: Colors.GREY }}
                            fontSize="small"
                          />
                        </ListItemIcon>
                        Cancelar consulta
                      </MenuItem>
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
