import React from "react";
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
  MoreInfoButton,
  FullWidth,
  RowBetween,
  FilterTitle,
  SectionTitle,
  SectionContainer,
} from "./styles";

import { SubHeader } from "../../components";
import Colors from "../../globalConfigs/globalStyles/colors";
import { FontSizes } from "../../globalConfigs";
import { appointmentsPsychologist } from "./appointmentsPsychologist";
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
import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";

function PsychologistAppointments() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [dateFilter, setDateFilter] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedConsultation, setSelectedConsultation] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleMenuOpen = (e, consultation) => {
    setAnchorEl(e.currentTarget);
    setSelectedConsultation(consultation);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedConsultation(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Agendada":
        return Colors.ORANGE;
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

  const applyFilters = () => {
    setPage(1);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setDateFilter("");
    setSearchTerm("");
    setPage(1);
  };

  const filteredAppointments = React.useMemo(() => {
    const term = (searchTerm || "").trim().toLowerCase();
    return appointmentsPsychologist.filter((a) => {
      if (term && !a.patient.toLowerCase().includes(term)) return false;

      return true;
    });
  }, [searchTerm]);

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
              <FormControl
                fullWidth
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    { borderColor: Colors.ORANGE },
                  "& .MuiInputLabel-root.Mui-focused": { color: Colors.ORANGE },
                }}
              >
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{
                    height: 36,
                    "& .MuiSvgIcon-root": { color: Colors.ORANGE },
                  }}
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="Agendada">Agendada</MenuItem>
                  <MenuItem value="Confirmada">Confirmada</MenuItem>
                  <MenuItem value="Aguardando pagamento">
                    Aguardando pagamento
                  </MenuItem>
                  <MenuItem value="Realizada">Realizada</MenuItem>
                  <MenuItem value="Cancelada">Cancelada</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Data"
                type="date"
                size="small"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                onKeyDown={(e) => e.preventDefault()}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: FontSizes.SMALL,
                    cursor: "pointer",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    { borderColor: Colors.ORANGE },
                  "& .MuiInputLabel-root.Mui-focused": { color: Colors.ORANGE },
                }}
              />

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
                <Button
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
                </Button>
              </Box>
            </Stack>
          </Box>
        </Drawer>

        <ConsultationsContainer>
          <FullWidth>
            <Stack alignItems="flex-start" spacing={2}>
              {filteredAppointments
                ?.slice((page - 1) * pageSize, page * pageSize)
                .map((consultation) => (
                  <ConsultationCard key={consultation.id}>
                    <PatientPictureContainer>
                      <PatientPicture
                        src={consultation.patientPicture}
                        alt={consultation.patient}
                      />
                    </PatientPictureContainer>
                    <ConsultationInfo>
                      <PatientName>{consultation.patient}</PatientName>
                      <ConsultationDateTime>
                        <Schedule sx={{ fontSize: FontSizes.MEDIUM }} />{" "}
                        {new Date(consultation.datetime).toLocaleString()}
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
                        menuOpen ? "psychologist-appointment-menu" : undefined
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
          {selectedConsultation?.status === "Aguardando pagamento" && (
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/payment", {
                  state: {
                    psychologist: {
                      name: selectedConsultation.patient,
                      picture: selectedConsultation.patientPicture,
                      crp: selectedConsultation.crp || "",
                      rating: selectedConsultation.rating || 4.5,
                      specialties: selectedConsultation.specialties || [],
                      approaches: selectedConsultation.approaches || [],
                    },
                    slot: { datetime: selectedConsultation.datetime },
                    price: selectedConsultation.price || 150,
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
              Confirmar pagamento
            </MenuItem>
          )}
          {selectedConsultation?.status === "Confirmada" &&
            new Date(selectedConsultation?.datetime) < new Date() && (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/payment", {
                    state: {
                      psychologist: {
                        name: selectedConsultation.patient,
                        picture: selectedConsultation.patientPicture,
                        crp: selectedConsultation.crp || "",
                        rating: selectedConsultation.rating || 4.5,
                        specialties: selectedConsultation.specialties || [],
                        approaches: selectedConsultation.approaches || [],
                      },
                      slot: { datetime: selectedConsultation.datetime },
                      price: selectedConsultation.price || 150,
                    },
                  });
                }}
              >
                <ListItemIcon>
                  <TaskAlt
                    sx={{ color: Colors.LIGHT_ORANGE }}
                    fontSize="small"
                  />
                </ListItemIcon>
                Marcar como concluída
              </MenuItem>
            )}
          <MenuItem
            onClick={() => {
              handleMenuClose();
              console.log("Cancelar", selectedConsultation?.id);
            }}
          >
            <ListItemIcon>
              <CancelIcon sx={{ color: Colors.GREY }} fontSize="small" />
            </ListItemIcon>
            Cancelar consulta
          </MenuItem>
        </Menu>
      </Container>
    </PageContainer>
  );
}

export default PsychologistAppointments;
