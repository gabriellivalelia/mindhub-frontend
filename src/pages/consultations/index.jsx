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

import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import { SubHeader } from "../../components";
import Colors from "../../globalConfigs/globalStyles/colors";
import { FontSizes } from "../../globalConfigs";
import { consultations } from "./consultations";
import Schedule from "@mui/icons-material/Schedule";
import Brightness1 from "@mui/icons-material/Brightness1";
import FilterAlt from "@mui/icons-material/FilterAlt";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Search from "@mui/icons-material/Search";


function Consultations() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);

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
  

  return (
    <PageContainer>
      <SubHeader text="Minhas Consultas" />
      <Container>
        <FiltersContainer>
          <SearchContainer>
            <SearchIconWrapper>
              <Search sx={{ color: Colors.ORANGE }} />
            </SearchIconWrapper>
            <SearchBar placeholder="Buscar..." />
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
            <h3>Filtros</h3>
            <div>
              <label>
                Status:
                <select>
                  <option>Todos</option>
                  <option>Agendada</option>
                  <option>Confirmada</option>
                  <option>Cancelada</option>
                  <option>Realizada</option>
                </select>
              </label>
            </div>
          </Box>
        </Drawer>

        <ConsultationsContainer>
          <Stack style={{ width: '100%' }} alignItems="flex-start" spacing={2}>
            {consultations?.slice((page - 1) * pageSize, page * pageSize).map((consultation) => (
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Pagination
                count={Math.max(1, Math.ceil((consultations?.length || 0) / pageSize))}
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
            </div>
          </Stack>
        </ConsultationsContainer>
      <ScheduleNewAppointmentButton onClick={() => navigate("/schedule-new-appointment")}>Agendar consulta</ScheduleNewAppointmentButton>
      </Container>

    </PageContainer>
  );
}

export default Consultations;

