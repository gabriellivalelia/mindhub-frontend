import React from "react";
import {
  Container,
  FilterButton,
  CurrencyContainer,
  CurrencyLabel,
  CurrencyInput,
  FiltersContainer,
  PageContainer,
  ProfessionalPictureContainer,
  ProfessionalPicture,
  ProfessionalName,
  SearchContainer,
  SearchIconWrapper,
  PsychologistsContainer,
  PsychologistCard,
  ProfileContainer,
  PrimaryInfo,
  ProfessionalCrp,
  ProfessionalRating,
  ExtendButton,
  AnotherInfo,
  SecondaryInfo,
  Specialties,
  Approaches,
  TertiaryInfo,
  ScheduleContainer,
  ScheduleButton,
  Description,
  DialogProfile,
  DialogAvatar,
  DialogInfo,
  DialogLabel,
  DialogValue,
  InfoWithIcon,

} from "./styles";

import ReactSelect from 'react-select';

import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination';
import { SubHeader } from "../../components";
import Colors from "../../globalConfigs/globalStyles/colors";
import FontSizes from "../../globalConfigs/globalStyles/fontSizes";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Person from "@mui/icons-material/Person";
import LocationOn from "@mui/icons-material/LocationOn";
import Timer from "@mui/icons-material/Timer";
import Groups from "@mui/icons-material/Groups";
import Paid from "@mui/icons-material/Paid";
import { psychologists } from "./psychologists";
import ScheduleComponent from "../../components/scheduleComponent";


function ScheduleNewAppointment() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [selectedSlots, setSelectedSlots] = React.useState({});



  const navigate = useNavigate();
  console.log(psychologists[0].slots);
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const categoryOptions = React.useMemo(() => [
    { value: 'ansiedade', label: 'Ansiedade' },
    { value: 'depressao', label: 'Depressão' },
    { value: 'casais', label: 'Casais' },
    { value: 'trauma', label: 'Trauma' },
  ], []);

  const selectStyles = React.useMemo(() => ({
  control: (provided) => ({
      ...provided,
      border: `2px solid ${Colors.ORANGE}`,
      borderRadius: 6,
      minHeight: 36,
      height: 36,
      boxShadow: 'none',
      background: 'transparent',
      '&:hover': { borderColor: Colors.ORANGE },
      outline: 'none',
      overflow: 'hidden',
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 6,
      padding: '0.2rem 0.6rem 0.4rem 0.4rem',
      height: 36,
      fontSize: FontSizes.SMALL,
      overflow: 'hidden',
    }),
    singleValue: (provided) => ({ ...provided, fontSize: FontSizes.SMALL, color: Colors.DARK_GREY }),
    placeholder: (provided) => ({ ...provided, fontSize: FontSizes.SMALL, color: Colors.GREY }),
    input: (provided) => ({ ...provided, margin: 0, padding: 0, fontSize: FontSizes.SMALL }),
    indicatorsContainer: (provided) => ({ ...provided, height: 36 }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: Colors.WHITE,
      color: Colors.LIGHT_ORANGE,
      fontSize: FontSizes.SMALL,
      maxWidth: '100%',
      display: 'inline-flex',
      alignItems: 'center',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: '8rem',
      fontSize: FontSizes.SMALL,
      color: Colors.LIGHT_ORANGE,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: Colors.ORANGE,
      ':hover': { backgroundColor: Colors.ORANGE, color: Colors.WHITE },
    }),
    clearIndicator: (provided) => ({ ...provided, color: Colors.ORANGE, ':hover': { color: Colors.LIGHT_ORANGE } }),
    dropdownIndicator: (provided) => ({ ...provided, color: Colors.ORANGE }),
    indicatorSeparator: (provided) => ({ ...provided, backgroundColor: Colors.ORANGE }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? Colors.LIGHT_ORANGE : provided.backgroundColor,
      color: state.isSelected ? Colors.WHITE : Colors.GREY,
      ':hover': { backgroundColor: Colors.LIGHT_ORANGE, color: Colors.WHITE },
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      width: '100%',
      boxSizing: 'border-box',
      border: `none`,
      borderRadius: 6,
      overflow: 'hidden',
      marginTop: 6,
      background: Colors.WHITE,
      maxHeight: '240px',
    }),
  }), []);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(null);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogData(null);
  };

  const handleProceedToPayment = () => {
    if (!dialogData) return;
    const rawPrice = dialogData.psychologist.price || '';
    const numericPrice = Number(rawPrice.replace(/[^0-9,.-]+/g, '').replace(',', '.')) || 0;
    navigate('/payment', { state: { psychologist: dialogData.psychologist, slot: dialogData.slot, price: numericPrice } });
  };

  const handleSlotSelect = (psychologistId, slot) => {
    setSelectedSlots(prev => {
      if (!slot) {
        const copy = { ...prev };
        delete copy[psychologistId];
        return copy;
      }
      return { ...prev, [psychologistId]: slot };
    });
  };

  return (
    <PageContainer>
      <SubHeader text="Encontrar Psicólogo" />
      <Container>
        <FiltersContainer>
          <SearchContainer>
            <div style={{ width: '100%' }}>
              <ReactSelect
                isMulti
                options={categoryOptions}
                value={selectedCategories}
                onChange={(v) => setSelectedCategories(v)}
                styles={selectStyles}
                placeholder="Buscar por especialidade"
                closeMenuOnSelect={false}
              />
            </div>
            <CurrencyContainer>
              <CurrencyLabel>Valor máximo por consulta</CurrencyLabel>
              <CurrencyInput type="text" placeholder="R$ 0,00" />
            </CurrencyContainer>
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

        <PsychologistsContainer>
          <Stack style={{ width: '100%' }} alignItems="flex-start" spacing={2}>
            {psychologists?.slice((page - 1) * pageSize, page * pageSize).map((psychologist) => (
              <PsychologistCard key={psychologist.id}>
                <ProfileContainer>
                  <ProfessionalPictureContainer>
                    <ProfessionalPicture src={psychologist.picture} alt={psychologist.name} />
                  </ProfessionalPictureContainer>
                  <PrimaryInfo>
                    <ProfessionalName>{psychologist.name}</ProfessionalName>
                    <ProfessionalCrp>{psychologist.crp}</ProfessionalCrp>
                    <ProfessionalRating>
                      <Rating
                        name={`read-${psychologist.id}`}
                        value={psychologist.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                        sx={{ color: Colors.ORANGE }}
                      />
                      {Number(psychologist.rating).toFixed(1)}
                    </ProfessionalRating>
                  </PrimaryInfo>
                </ProfileContainer>
                <AnotherInfo>
                  <SecondaryInfo>
                    <Specialties>{psychologist.specialties.join(", ")}</Specialties>
                    <Approaches>{psychologist.approaches.join(", ")}</Approaches>
                    <Description>{psychologist.description}</Description>
                    <TertiaryInfo>
                      <InfoWithIcon><Paid sx={{ color: Colors.ORANGE }}/>{psychologist.price}</InfoWithIcon>
                      <InfoWithIcon><Timer sx={{ color: Colors.ORANGE }}/>{psychologist.duration}</InfoWithIcon>
                      <InfoWithIcon><Person sx={{ color: Colors.ORANGE }}/>Gênero {psychologist.gender}</InfoWithIcon>
                      <InfoWithIcon><Groups sx={{ color: Colors.ORANGE }}/>Atende Adultos e Crianças</InfoWithIcon>
                      <InfoWithIcon><LocationOn sx={{ color: Colors.ORANGE }}/>De Salvador, Bahia</InfoWithIcon>
                    </TertiaryInfo>
                  </SecondaryInfo>
                  <ScheduleContainer>
                    <ScheduleComponent allSlots={psychologist.slots} onSlotSelect={(slot) => handleSlotSelect(psychologist.id, slot)} />
                    <ScheduleButton
                      disabled={!selectedSlots[psychologist.id]}
                      onClick={() => {
                        const slot = selectedSlots[psychologist.id];
                        setDialogData({ psychologist, slot });
                        setDialogOpen(true);
                      }}
                    >
                      Agendar
                    </ScheduleButton>
                  </ScheduleContainer>
                </AnotherInfo>
              </PsychologistCard>
            ))}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Pagination
                count={Math.max(1, Math.ceil((psychologists?.length || 0) / pageSize))}
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
        </PsychologistsContainer>
        <Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="booking-dialog-title">
          <DialogTitle id="booking-dialog-title">Confirmar Agendamento</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogData ? (
                <div>
                  <DialogProfile>
                    <DialogAvatar src={dialogData.psychologist.picture} alt={dialogData.psychologist.name} />
                    <DialogInfo>
                      <DialogLabel>{dialogData.psychologist.name}</DialogLabel>
                      <DialogValue>{dialogData.psychologist.crp}</DialogValue>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Rating value={dialogData.psychologist.rating} precision={0.1} readOnly size="small" sx={{ color: Colors.ORANGE }} />
                        <span>{Number(dialogData.psychologist.rating).toFixed(1)}</span>
                      </div>
                    </DialogInfo>
                  </DialogProfile>

                  <div style={{ marginTop: 12 }}>
                    <DialogLabel>Especialidades</DialogLabel>
                    <DialogValue>{dialogData.psychologist.specialties.join(', ')}</DialogValue>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <DialogLabel>Abordagens</DialogLabel>
                    <DialogValue>{dialogData.psychologist.approaches.join(', ')}</DialogValue>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <DialogLabel>Duração</DialogLabel>
                    <DialogValue>{dialogData.psychologist.duration}</DialogValue>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <DialogLabel>Horário selecionado</DialogLabel>
                    <DialogValue>{dialogData.slot?.day} {dialogData.slot?.time}</DialogValue>
                  </div>

                  <div style={{ marginTop: 8 }}>
                    <DialogLabel>Valor</DialogLabel>
                    <DialogValue>{dialogData.psychologist.price}</DialogValue>
                  </div>
                </div>
              ) : 'Nenhuma seleção.'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} variant="outlined" sx={{ borderColor: Colors.ORANGE, color: Colors.ORANGE, textTransform: 'none' }}>
              Cancelar
            </Button>
            <Button onClick={handleProceedToPayment} variant="contained" sx={{ backgroundColor: Colors.ORANGE, color: Colors.WHITE, '&:hover': { backgroundColor: Colors.LIGHT_ORANGE }, textTransform: 'none' }}>
              Prosseguir para o pagamento
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </PageContainer>
  );
}

export default ScheduleNewAppointment;

