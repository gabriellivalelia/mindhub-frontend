import { useState, useMemo } from "react";
import {
  Container,
  ScheduleNewAppointmentButton,
  ConsultationCard,
  FilterButton,
  ConsultationsContainer,
  SearchBar,
  FiltersContainer,
  PageContainer,
  ProfessionalPictureContainer,
  ProfessionalPicture,
  ConsultationInfo,
  ProfessionalName,
  ConsultationDateTime,
  ConsultationStatus,
  MoreInfoButton,
  SearchContainer,
  SearchIconWrapper,
} from "./styles";
import { FilterTitle, FullWidth, RowBetween, LabelSmall } from "./styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../services/useAppointments";
import { usePsychologists } from "../../services/usePsychologists";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import { SubHeader } from "../../components";
import Colors from "../../globalConfigs/globalStyles/colors";
import { FontSizes } from "../../globalConfigs";
import Schedule from "@mui/icons-material/Schedule";
import { formatDateTime } from "../../utils/formatDate";
import ManageHistory from "@mui/icons-material/ManageHistory";
import PriceCheck from "@mui/icons-material/PriceCheck";
import Brightness1 from "@mui/icons-material/Brightness1";
import FilterAlt from "@mui/icons-material/FilterAlt";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Search from "@mui/icons-material/Search";

const STATUS_MAP = {
  waiting_for_payment: "Aguardando pagamento",
  pending_confirmation: "Aguardando confirmação",
  confirmed: "Confirmada",
  completed: "Realizada",
  canceled: "Cancelada",
};

const getStatusColor = (status) => {
  const normalizedStatus = STATUS_MAP[status] || status;
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

function AppointmentsPatient() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const menuOpen = Boolean(anchorEl);

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
  });

  // Buscar todos os psicólogos para mapear os dados
  const { data: psychologistsData } = usePsychologists({
    page: 1,
    size: 1000, // Buscar todos para ter disponível
  });

  const handleMenuOpen = (e, consultation) => {
    setAnchorEl(e.currentTarget);
    setSelectedConsultation(consultation);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConsultation(null);
  };

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
    setStatusFilter("");
    setPage(1);
  };

  // Mapear dados da API para o formato esperado pelo componente
  const mappedAppointments = useMemo(() => {
    if (!appointmentsData?.items) return [];

    const psychologistsMap = (psychologistsData?.items || []).reduce(
      (acc, p) => {
        acc[p.id] = p;
        return acc;
      },
      {}
    );

    return appointmentsData.items.map((appointment) => {
      const psychologist = psychologistsMap[appointment.psychologist_id] || {};

      return {
        id: appointment.id,
        datetime: appointment.date,
        professional: psychologist.name || "Psicólogo não encontrado",
        professionalPicture:
          psychologist.profile_picture?.src || "/default-avatar.png",
        status: STATUS_MAP[appointment.status] || appointment.status,
        rawStatus: appointment.status, // Guardar status original para lógica
        psychologist_id: appointment.psychologist_id,
        patient_id: appointment.patient_id,
        price: appointment.pix_payment?.value || 0,
        crp: psychologist.crp || "",
        rating: psychologist.rating || 0,
        specialties: psychologist.specialties || [],
        approaches: psychologist.approaches || [],
      };
    });
  }, [appointmentsData, psychologistsData]);

  const filteredAppointments = useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    return mappedAppointments.filter((a) => {
      if (term && !a.professional.toLowerCase().includes(term)) return false;
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
              <Search sx={{ color: Colors.ORANGE }} />
            </SearchIconWrapper>
            <SearchBar
              placeholder="Buscar..."
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
                {/* <Button
                  variant="contained"
                  onClick={applyFilters}
                  sx={{
                    backgroundColor: Colors.ORANGE,
                    color: Colors.WHITE,
                    textTransform: "none",
                    "&:hover": { backgroundColor: Colors.LIGHT_ORANGE },
                  }}
                >
                  Aplicar
                </Button> */}
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
            ) : (
              <Stack alignItems="flex-start" spacing={2}>
                {filteredAppointments
                  ?.slice((page - 1) * pageSize, page * pageSize)
                  .map((consultation) => (
                    <ConsultationCard key={consultation.id}>
                      <ProfessionalPictureContainer>
                        <ProfessionalPicture
                          src={consultation.professionalPicture}
                          alt={consultation.professional}
                        />
                      </ProfessionalPictureContainer>
                      <ConsultationInfo>
                        <ProfessionalName>
                          {consultation.professional}
                        </ProfessionalName>
                        <ConsultationDateTime>
                          <Schedule sx={{ fontSize: FontSizes.MEDIUM }} />{" "}
                          {formatDateTime(consultation.datetime)}
                        </ConsultationDateTime>
                      </ConsultationInfo>
                      <ConsultationStatus status={consultation.status}>
                        <Brightness1
                          sx={{
                            fontSize: FontSizes.SMALLEST,
                            color: getStatusColor(consultation.status),
                          }}
                        />{" "}
                        {consultation.status}
                      </ConsultationStatus>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, consultation)}
                        sx={{ color: Colors.GREY, p: "6px" }}
                        aria-controls={
                          menuOpen ? "next-appointment-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={menuOpen ? "true" : undefined}
                      >
                        <MoreHoriz />
                      </IconButton>
                    </ConsultationCard>
                  ))}

                <RowBetween>
                  <Pagination
                    count={Math.max(
                      1,
                      Math.ceil((filteredAppointments?.length || 0) / pageSize)
                    )}
                    // hideNextButton={!appointmentsData?.hasNext}
                    // hidePrevButton
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
          id="next-appointment-menu"
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          {selectedConsultation?.rawStatus === "waiting_for_payment" && (
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/payment", {
                  state: {
                    psychologist: {
                      id: selectedConsultation.psychologist_id,
                      name: selectedConsultation.professional,
                      picture: selectedConsultation.professionalPicture,
                      crp: selectedConsultation.crp || "",
                      rating: selectedConsultation.rating || 4.5,
                      specialties: selectedConsultation.specialties || [],
                      approaches: selectedConsultation.approaches || [],
                    },
                    slot: { datetime: selectedConsultation.datetime },
                    price: selectedConsultation.price || 150,
                    appointment_id: selectedConsultation.id,
                  },
                });
              }}
            >
              <ListItemIcon>
                <PriceCheck
                  sx={{ color: Colors.LIGHT_ORANGE }}
                  fontSize="small"
                />
              </ListItemIcon>
              Efetuar pagamento
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              handleMenuClose();
              console.log("Reschedule", selectedConsultation);
            }}
          >
            <ListItemIcon>
              <ManageHistory
                sx={{ color: Colors.LIGHT_ORANGE }}
                fontSize="small"
              />
            </ListItemIcon>
            Reagendar consulta
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              console.log("Cancel", selectedConsultation?.id);
            }}
          >
            <ListItemIcon>
              <CancelIcon sx={{ color: Colors.GREY }} fontSize="small" />
            </ListItemIcon>
            Cancelar consulta
          </MenuItem>
        </Menu>
        <ScheduleNewAppointmentButton
          onClick={() => navigate("/schedule-new-appointment")}
        >
          Agendar consulta
        </ScheduleNewAppointmentButton>
      </Container>
    </PageContainer>
  );
}

export default AppointmentsPatient;
