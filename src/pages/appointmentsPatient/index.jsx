import React from "react";
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
  SearchIconWrapper

} from "./styles";
import { FilterTitle, FullWidth, RowBetween } from './styles';

import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import { SubHeader } from "../../components";
import Colors from "../../globalConfigs/globalStyles/colors";
import { FontSizes } from "../../globalConfigs";
import { appointmentsPatient } from "./appointmentsPatient";
import Schedule from "@mui/icons-material/Schedule";
import Brightness1 from "@mui/icons-material/Brightness1";
import FilterAlt from "@mui/icons-material/FilterAlt";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Search from "@mui/icons-material/Search";


function Consultations() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [statusFilter, setStatusFilter] = React.useState('Todos');
  const [dateFilter, setDateFilter] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Agendada':
        return Colors.ORANGE;
      case 'Confirmada':
        return Colors.GREEN;
      case 'Cancelada':
        return Colors.RED;
      case 'Realizada':
        return Colors.PURPLE;
      default:
        return Colors.GREY;
    }
  };

  const navigate = useNavigate();
  
  const applyFilters = () => {
    setPage(1);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setStatusFilter('Todos');
    setDateFilter('');
    setSearchTerm('');
    setPage(1);
  };

  const filteredAppointments = React.useMemo(() => {
    const term = (searchTerm || '').trim().toLowerCase();
    return appointmentsPatient.filter((a) => {
      // status filter
      if (statusFilter && statusFilter !== 'Todos' && a.status !== statusFilter) return false;

      // date filter (compare yyyy-mm-dd)
      const apptDate = new Date(a.datetime).toISOString().slice(0, 10);
      if (dateFilter && apptDate !== dateFilter) return false;

      // search by professional name
      if (term && !a.professional.toLowerCase().includes(term)) return false;

      return true;
    });
  }, [statusFilter, dateFilter, searchTerm]);
  

  return (
    <PageContainer>
      <SubHeader text="Minhas Consultas" />
      <Container>
        <FiltersContainer>
          <SearchContainer>
              <SearchIconWrapper>
                <Search sx={{ color: Colors.ORANGE }} />
              </SearchIconWrapper>
              <SearchBar placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
              <FormControl fullWidth size="small" sx={{ '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: Colors.ORANGE }, '& .MuiInputLabel-root.Mui-focused': { color: Colors.ORANGE } }}>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select
                  labelId="status-filter-label"
                  id="status-filter"
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ '& .MuiSvgIcon-root': { color: Colors.ORANGE } }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root.Mui-selected': {
                          backgroundColor: Colors.ORANGE,
                          color: Colors.WHITE,
                        },
                        '& .MuiMenuItem-root.Mui-selected:hover': {
                          backgroundColor: Colors.ORANGE,
                        },
                      }
                    }
                  }}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="Agendada">Agendada</MenuItem>
                  <MenuItem value="Confirmada">Confirmada</MenuItem>
                  <MenuItem value="Cancelada">Cancelada</MenuItem>
                  <MenuItem value="Realizada">Realizada</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Data"
                type="date"
                size="small"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                InputLabelProps={{ shrink: true }}
                sx={{ '& .MuiInputBase-input': { fontSize: FontSizes.SMALL }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: Colors.ORANGE }, '& .MuiInputLabel-root.Mui-focused': { color: Colors.ORANGE } }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                <Button variant="outlined" onClick={clearFilters} sx={{ borderColor: Colors.ORANGE, color: Colors.ORANGE, textTransform: 'none' }}>
                  Limpar
                </Button>
                <Button variant="contained" onClick={applyFilters} sx={{ backgroundColor: Colors.ORANGE, color: Colors.WHITE, textTransform: 'none', '&:hover': { backgroundColor: Colors.LIGHT_ORANGE } }}>
                  Aplicar
                </Button>
              </Box>
            </Stack>
          </Box>
        </Drawer>

        <ConsultationsContainer>
          <FullWidth>
            <Stack alignItems="flex-start" spacing={2}>
            {filteredAppointments?.slice((page - 1) * pageSize, page * pageSize).map((consultation) => (
              <ConsultationCard key={consultation.id}>
                <ProfessionalPictureContainer>
                  <ProfessionalPicture src={consultation.professionalPicture} alt={consultation.professional} />
                </ProfessionalPictureContainer>
                <ConsultationInfo>
                  <ProfessionalName>{consultation.professional}</ProfessionalName>
                  <ConsultationDateTime><Schedule sx={{ fontSize: FontSizes.MEDIUM }} /> {new Date(consultation.datetime).toLocaleString()}</ConsultationDateTime>
                </ConsultationInfo>
                <ConsultationStatus status={consultation.status}><Brightness1 sx={{ fontSize: FontSizes.SMALLEST, color: getStatusColor(consultation.status) }} /> {consultation.status}</ConsultationStatus>
                <MoreInfoButton><MoreHoriz /></MoreInfoButton>
              </ConsultationCard>
            ))}

            <RowBetween>
              <Pagination
                count={Math.max(1, Math.ceil((filteredAppointments?.length || 0) / pageSize))}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{
                  '& .MuiPaginationItem-root.Mui-selected': {
                    backgroundColor: Colors.ORANGE,
                    color: Colors.WHITE,
                  },
                }}
              />

              <FormControl sx={{ minWidth: 160, '& .MuiInputLabel-root.Mui-focused': { color: Colors.ORANGE }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: Colors.ORANGE } }}>
                <InputLabel id="page-size-label">Linhas por página</InputLabel>
                <Select
                  size="small"
                sx={{ height: 36, '& .MuiSvgIcon-root': { color: Colors.ORANGE } }}
                  label="Linhas por página"
                  onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}
                  value={pageSize}
                  id="page-size"
                  labelId="page-size-label"
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        '& .MuiMenuItem-root.Mui-selected': {
                          backgroundColor: Colors.ORANGE,
                          color: Colors.WHITE,
                        },
                        '& .MuiMenuItem-root.Mui-selected:hover': {
                          backgroundColor: Colors.ORANGE,
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>50</MenuItem>
                </Select>
              </FormControl>
            </RowBetween>
            </Stack>
          </FullWidth>
        </ConsultationsContainer>
      <ScheduleNewAppointmentButton onClick={() => navigate("/schedule-new-appointment")}>Agendar consulta</ScheduleNewAppointmentButton>
      </Container>

    </PageContainer>
  );
}

export default Consultations;

