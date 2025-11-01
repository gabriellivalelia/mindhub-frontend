import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useState } from "react";
import {
  PageContainer,
  Container,
  FiltersContainer,
  SearchContainer,
  SearchIconWrapper,
  SearchBar,
  FilterButton,
  ConsultationsContainer,
  ConsultationCard,
  PatientPictureContainer,
  PatientPicture,
  ConsultationInfo,
  PatientName,
  ConsultationDateTime,
  ConsultationStatus,
  StatusAndActionsContainer,
  FullWidth,
  RowBetween,
  FilterTitle,
  SectionTitle,
  SectionContainer,
  LabelSmall,
} from "./styles";

import { SubHeader } from "../../components";
import Colors from "../../globalConfigs/globalStyles/colors";
import { FontSizes } from "../../globalConfigs";
import Schedule from "@mui/icons-material/Schedule";
import Brightness1 from "@mui/icons-material/Brightness1";
import FilterAlt from "@mui/icons-material/FilterAlt";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PriceCheck from "@mui/icons-material/PriceCheck";
import TaskAlt from "@mui/icons-material/TaskAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import {
  useAppointments,
  usePsychologistConfirmPayment,
  useCancelAppointment,
  useCompleteAppointment,
} from "../../services/useAppointments";
import { useToastStore } from "../../stores/useToastStore";
import { usePatients } from "../../services/usePatients";
import { useCurrentUser } from "../../services/useCurrentUser";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { formatDateTime, parseServerDateToLocal } from "../../utils/formatDate";
import { appointmentStatusDict, genderDict } from "../../utils/dictionaries";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

/**
 * Componente PsychologistAppointments - Gerenciamento de consultas para psicólogos.
 *
 * Funcionalidades:
 * - Lista todas as consultas do psicólogo com filtros e busca
 * - Exibe informações detalhadas do paciente em modal
 * - Permite confirmar pagamento de consultas pendentes
 * - Permite marcar consultas como realizadas
 * - Permite cancelar consultas (respeitando regras de tempo)
 * - Filtros por status, data de início e fim
 * - Busca por nome do paciente
 * - Paginação configurável
 *
 * @component
 * @returns {JSX.Element} Página de gerenciamento de consultas do psicólogo
 */
function PsychologistAppointments() {
  const [openPatientInfo, setOpenPatientInfo] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  /**
   * Abre o modal com informações detalhadas do paciente.
   *
   * @param {Object} consultation - Dados da consulta contendo informações do paciente
   */
  function handleOpenPatientInfo(consultation) {
    setSelectedPatient(consultation);
    setOpenPatientInfo(true);
  }

  /**
   * Fecha o modal de informações do paciente.
   */
  function handleClosePatientInfo() {
    setOpenPatientInfo(false);
  }
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedConsultation, setSelectedConsultation] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const addToast = useToastStore((state) => state.addToast);
  const confirmPaymentMutation = usePsychologistConfirmPayment();
  const cancelAppointmentMutation = useCancelAppointment();
  const completeAppointmentMutation = useCompleteAppointment();
  const { data: currentUser } = useCurrentUser();

  const handleCancel = async (appointmentId, status) => {
    try {
      await cancelAppointmentMutation.mutateAsync(appointmentId);

      const paymentWasMade = ["pending_confirmation", "confirmed"].includes(
        status
      );
      const message = paymentWasMade
        ? "Consulta cancelada com sucesso. O estorno do pagamento será realizado em até 5 dias úteis."
        : "Consulta cancelada com sucesso";

      addToast(message, "success");
      handleMenuClose();
    } catch (err) {
      console.error("Erro ao cancelar consulta:", err);
      addToast(
        err.response?.data?.message ||
          "Erro ao cancelar consulta. Tente novamente.",
        "error"
      );
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      await completeAppointmentMutation.mutateAsync(appointmentId);
      addToast("Consulta marcada como concluída", "success");
      handleMenuClose();
    } catch (err) {
      console.error("Erro ao marcar consulta como concluída:", err);
      addToast(
        err.response?.data?.message ||
          "Erro ao marcar consulta como concluída. Tente novamente.",
        "error"
      );
    }
  };

  const {
    data: appointmentsData,
    isLoading,
    error,
  } = useAppointments({
    page: page,
    size: pageSize,
    start_date: startDate,
    end_date: endDate,
    status: statusFilter,
    psychologist_id: currentUser?.id,
  });

  const { data: patientsData } = usePatients({
    page: 1,
    size: 1000,
  });

  const handleMenuOpen = (e, consultation) => {
    setAnchorEl(e.currentTarget);
    setSelectedConsultation(consultation);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConsultation(null);
  };

  const getStatusColor = (status) => {
    const normalizedStatus = appointmentStatusDict[status] || status;
    switch (normalizedStatus) {
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

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
    setStatusFilter("");
    setPage(1);
  };

  const handleConfirmPayment = async (appointmentId) => {
    try {
      await confirmPaymentMutation.mutateAsync(appointmentId);
      addToast("Pagamento confirmado com sucesso!", "success");
      handleMenuClose();
    } catch (error) {
      console.error("Erro ao confirmar pagamento:", error);
      addToast(
        error.response?.data?.message ||
          "Erro ao confirmar pagamento. Tente novamente.",
        "error"
      );
    }
  };

  const mappedAppointments = React.useMemo(() => {
    if (!appointmentsData?.items) return [];

    const patientsMap = (patientsData?.items || []).reduce((acc, patient) => {
      acc[patient.id] = patient;
      return acc;
    }, {});

    return appointmentsData.items.map((appointment) => {
      const patient = patientsMap[appointment.patient_id] || {};

      const apptDate = parseServerDateToLocal(appointment.date);
      const msUntil = apptDate.getTime() - new Date().getTime();
      const allowedByTime = msUntil >= 12 * 60 * 60 * 1000;
      const allowedByStatus = [
        "waiting_for_payment",
        "pending_confirmation",
      ].includes(appointment.status);

      const isExpiredAndPending = msUntil < 0 && allowedByStatus;
      const hasDatePassed = msUntil < 0;

      const forbiddenStatus = ["canceled", "completed"].includes(
        appointment.status
      );

      const canCancel =
        !forbiddenStatus &&
        (allowedByTime || allowedByStatus || isExpiredAndPending);
      const canConfirmPayment =
        appointment.status === "pending_confirmation" && !hasDatePassed;
      const canComplete =
        appointment.status === "confirmed" && apptDate < new Date();

      const hasMenuOptions = canConfirmPayment || canComplete || canCancel;

      return {
        id: appointment.id,
        datetime: appointment.date,
        patient: patient.name || "Paciente não encontrado",
        patientPicture: patient.profile_picture?.src || "/default-avatar.png",
        status: appointmentStatusDict[appointment.status] || appointment.status,
        rawStatus: appointment.status,
        psychologist_id: appointment.psychologist_id,
        patient_id: appointment.patient_id,
        price: appointment.pix_payment?.value || 0,
        cpf: patient.cpf,
        phone_number: patient.phone_number,
        birth_date: patient.birth_date,
        gender: patient.gender,
        email: patient.email,
        city: patient.city,
        canCancel,
        canConfirmPayment,
        canComplete,
        hasMenuOptions,
      };
    });
  }, [appointmentsData, patientsData]);

  const filteredAppointments = React.useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    return mappedAppointments.filter((a) => {
      if (term && !a.patient.toLowerCase().includes(term)) return false;
      return true;
    });
  }, [mappedAppointments, searchTerm]);
  return (
    <PageContainer>
      <SubHeader text="Minhas Consultas" />
      <Container>
        <FiltersContainer>
          <SearchContainer>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: Colors.ORANGE }} />
            </SearchIconWrapper>
            <SearchBar
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <FilterButton onClick={() => setIsFilterOpen(true)}>
            <FilterAlt sx={{ color: Colors.ORANGE }} />
          </FilterButton>
        </FiltersContainer>

        <Drawer
          anchor="right"
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        >
          <Box sx={{ width: 320, padding: 2 }} role="presentation">
            <FilterTitle>Filtros</FilterTitle>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <div>
                <LabelSmall>Status</LabelSmall>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      { borderColor: Colors.ORANGE },
                  }}
                >
                  <Select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    displayEmpty
                    sx={{
                      height: 36,
                      "& .MuiSvgIcon-root": { color: Colors.ORANGE },
                    }}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="waiting_for_payment">
                      Aguardando pagamento
                    </MenuItem>
                    <MenuItem value="pending_confirmation">
                      Aguardando confirmação
                    </MenuItem>
                    <MenuItem value="confirmed">Confirmada</MenuItem>
                    <MenuItem value="completed">Realizada</MenuItem>
                    <MenuItem value="canceled">Cancelada</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <LabelSmall>Data de início</LabelSmall>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onKeyDown={(e) => e.preventDefault()}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: FontSizes.SMALL,
                      cursor: "pointer",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      { borderColor: Colors.ORANGE },
                  }}
                />
              </div>

              <div>
                <LabelSmall>Data de fim</LabelSmall>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  onKeyDown={(e) => e.preventDefault()}
                  sx={{
                    "& .MuiInputBase-input": {
                      fontSize: FontSizes.SMALL,
                      cursor: "pointer",
                    },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      { borderColor: Colors.ORANGE },
                  }}
                />
              </div>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 1,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={clearFilters}
                  sx={{
                    borderColor: Colors.ORANGE,
                    color: Colors.ORANGE,
                    textTransform: "none",
                  }}
                >
                  Limpar
                </Button>
              </Box>
            </Stack>
          </Box>
        </Drawer>

        <ConsultationsContainer>
          <FullWidth>
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <CircularProgress sx={{ color: Colors.ORANGE }} />
              </Box>
            ) : error ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <p style={{ color: Colors.RED }}>
                  Erro ao carregar consultas: {error.message}
                </p>
                <Button
                  variant="outlined"
                  onClick={() => window.location.reload()}
                  sx={{
                    borderColor: Colors.ORANGE,
                    color: Colors.ORANGE,
                    "&:hover": { borderColor: Colors.LIGHT_ORANGE },
                  }}
                >
                  Tentar novamente
                </Button>
              </Box>
            ) : filteredAppointments.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: Colors.GREY,
                  width: "100%",
                }}
              >
                Nenhuma consulta encontrada.
              </div>
            ) : (
              <Stack alignItems="flex-start" spacing={2}>
                {filteredAppointments?.map((consultation) => (
                  <ConsultationCard key={consultation.id}>
                    <PatientPictureContainer>
                      <PatientPicture
                        src={consultation.patientPicture}
                        alt={consultation.patient}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleOpenPatientInfo(consultation)}
                      />
                      <Dialog
                        open={openPatientInfo}
                        onClose={handleClosePatientInfo}
                      >
                        <DialogTitle sx={{ color: Colors.ORANGE }}>
                          Informações do Paciente
                          <IconButton
                            aria-label="close"
                            onClick={handleClosePatientInfo}
                            sx={{ position: "absolute", right: 8, top: 8 }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </DialogTitle>
                        <DialogContent>
                          {selectedPatient && (
                            <>
                              <DialogContentText>
                                <b>Nome:</b> {selectedPatient.patient}
                              </DialogContentText>
                              {selectedPatient.phone_number && (
                                <DialogContentText>
                                  <b>Telefone:</b>{" "}
                                  {selectedPatient.phone_number}
                                </DialogContentText>
                              )}
                              {selectedPatient.email && (
                                <DialogContentText>
                                  <b>E-mail:</b> {selectedPatient.email}
                                </DialogContentText>
                              )}
                              {selectedPatient.birth_date && (
                                <DialogContentText>
                                  <b>Data de nascimento:</b>{" "}
                                  {(() => {
                                    const d = parseServerDateToLocal(
                                      selectedPatient.birth_date
                                    );
                                    if (!d) return "";
                                    return d.toLocaleDateString("pt-BR");
                                  })()}
                                </DialogContentText>
                              )}
                              {selectedPatient.gender && (
                                <DialogContentText>
                                  <b>Gênero:</b>{" "}
                                  {genderDict[selectedPatient.gender] ||
                                    selectedPatient.gender}
                                </DialogContentText>
                              )}
                              {selectedPatient.city && (
                                <DialogContentText>
                                  <b>Cidade:</b>{" "}
                                  {typeof selectedPatient.city === "object" &&
                                  selectedPatient.city !== null
                                    ? `${selectedPatient.city.name}${selectedPatient.city.state ? ", " + selectedPatient.city.state.name : ""}`
                                    : selectedPatient.city}
                                </DialogContentText>
                              )}
                            </>
                          )}
                        </DialogContent>
                      </Dialog>
                    </PatientPictureContainer>
                    <ConsultationInfo>
                      <PatientName>{consultation.patient}</PatientName>
                      <ConsultationDateTime>
                        <Schedule sx={{ fontSize: FontSizes.MEDIUM }} />{" "}
                        {formatDateTime(consultation.datetime)}
                      </ConsultationDateTime>
                    </ConsultationInfo>
                    <StatusAndActionsContainer>
                      <ConsultationStatus status={consultation.status}>
                        <Brightness1
                          sx={{
                            fontSize: FontSizes.SMALLEST,
                            color: getStatusColor(consultation.status),
                          }}
                        />{" "}
                        {consultation.status}
                      </ConsultationStatus>
                      {consultation.hasMenuOptions ? (
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, consultation)}
                          sx={{ color: Colors.GREY, p: "6px" }}
                          aria-controls={
                            menuOpen
                              ? "psychologist-appointment-menu"
                              : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={menuOpen ? "true" : undefined}
                        >
                          <MoreHoriz />
                        </IconButton>
                      ) : (
                        <Box sx={{ width: "34px", height: "34px" }} />
                      )}
                    </StatusAndActionsContainer>
                  </ConsultationCard>
                ))}

                <RowBetween>
                  <Pagination
                    count={Math.max(1, appointmentsData?.total_pages || 1)}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    sx={{
                      "& .MuiPaginationItem-root.Mui-selected": {
                        backgroundColor: Colors.ORANGE,
                        color: Colors.WHITE,
                      },
                    }}
                  />

                  <FormControl
                    sx={{
                      minWidth: 160,
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: Colors.ORANGE,
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        { borderColor: Colors.ORANGE },
                    }}
                  >
                    <InputLabel id="page-size-label">
                      Linhas por página
                    </InputLabel>
                    <Select
                      size="small"
                      sx={{
                        height: 36,
                        "& .MuiSvgIcon-root": { color: Colors.ORANGE },
                      }}
                      label="Linhas por página"
                      onChange={(event) => {
                        setPageSize(Number(event.target.value));
                        setPage(1);
                      }}
                      value={pageSize}
                      id="page-size"
                      labelId="page-size-label"
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            "& .MuiMenuItem-root.Mui-selected": {
                              backgroundColor: Colors.ORANGE,
                              color: Colors.WHITE,
                            },
                            "& .MuiMenuItem-root.Mui-selected:hover": {
                              backgroundColor: Colors.ORANGE,
                            },
                          },
                        },
                      }}
                    >
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={25}>25</MenuItem>
                    </Select>
                  </FormControl>
                </RowBetween>
              </Stack>
            )}
          </FullWidth>
        </ConsultationsContainer>
        <Menu
          id="psychologist-appointment-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {selectedConsultation?.canConfirmPayment && (
            <MenuItem
              onClick={() => handleConfirmPayment(selectedConsultation.id)}
              disabled={confirmPaymentMutation.isPending}
            >
              <ListItemIcon>
                <PriceCheck
                  sx={{ color: Colors.LIGHT_ORANGE }}
                  fontSize="small"
                />
              </ListItemIcon>
              {confirmPaymentMutation.isPending
                ? "Confirmando..."
                : "Confirmar pagamento"}
            </MenuItem>
          )}
          {selectedConsultation?.canComplete && (
            <MenuItem
              onClick={() => handleComplete(selectedConsultation.id)}
              disabled={completeAppointmentMutation.isPending}
            >
              <ListItemIcon>
                <TaskAlt sx={{ color: Colors.LIGHT_ORANGE }} fontSize="small" />
              </ListItemIcon>
              {completeAppointmentMutation.isPending
                ? "Marcando..."
                : "Marcar como concluída"}
            </MenuItem>
          )}
          {selectedConsultation?.canCancel && (
            <MenuItem
              onClick={() => {
                handleCancel(
                  selectedConsultation.id,
                  selectedConsultation.rawStatus
                );
              }}
            >
              <ListItemIcon>
                <CancelIcon sx={{ color: Colors.GREY }} fontSize="small" />
              </ListItemIcon>
              Cancelar consulta
            </MenuItem>
          )}
        </Menu>
      </Container>
    </PageContainer>
  );
}

export default PsychologistAppointments;
