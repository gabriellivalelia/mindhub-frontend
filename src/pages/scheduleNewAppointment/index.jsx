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
  FullWidth,
  FilterTitle,
  LabelSmall,
  RowBetween,
  RatingRow,
  Section,

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
import TextField from '@mui/material/TextField';
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
import { useLocation } from 'react-router-dom';
import ScheduleComponent from "../../components/scheduleComponent";


function ScheduleNewAppointment() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [selectedSlots, setSelectedSlots] = React.useState({});



  const navigate = useNavigate();
  console.log(psychologists[0].slots);
  const [selectedCategories, setSelectedCategories] = React.useState([]);
  const [genderFilter, setGenderFilter] = React.useState('Todos');
  const [approachesFilter, setApproachesFilter] = React.useState([]);
  const [audienceFilter, setAudienceFilter] = React.useState('Todos');
  const [dateFilter, setDateFilter] = React.useState('');
  const [timeFilter, setTimeFilter] = React.useState('');

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
      minHeight: 44,
      height: 'auto',
  boxShadow: 'none',
      background: 'transparent',
      '&:hover': { borderColor: Colors.ORANGE },
      outline: 'none',
      overflow: 'visible',
      alignItems: 'flex-start',
      // ensure no blue focus ring from default browser/react-select
      borderColor: Colors.ORANGE,
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 6,
      padding: '0.2rem 0.6rem 0.4rem 0.4rem',
      minHeight: 44,
      height: 'auto',
      fontSize: FontSizes.SMALL,
      overflow: 'visible',
    }),
    singleValue: (provided) => ({ ...provided, fontSize: FontSizes.SMALL, color: Colors.DARK_GREY }),
    placeholder: (provided) => ({ ...provided, fontSize: FontSizes.SMALL, color: Colors.GREY }),
    input: (provided) => ({ ...provided, margin: 0, padding: 0, fontSize: FontSizes.SMALL }),
  indicatorsContainer: (provided) => ({ ...provided, height: 44, paddingTop: 6 }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: Colors.LIGHT_ORANGE,
      color: Colors.WHITE,
      fontSize: FontSizes.SMALL,
      maxWidth: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 6,
      padding: '0 6px',
      margin: '2px 6px 2px 0',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      overflow: 'visible',
      textOverflow: 'clip',
      whiteSpace: 'normal',
      maxWidth: 'none',
      fontSize: FontSizes.SMALL,
      color: Colors.WHITE,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      marginLeft: 6,
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

  // smallSelectStyles keeps the compact 36px height for the specialties search
  const smallSelectStyles = React.useMemo(() => ({
    ...selectStyles,
    control: (provided) => ({
      ...provided,
      minHeight: 36,
      height: 36,
      alignItems: 'center',
      border: `2px solid ${Colors.ORANGE}`,
      background: 'transparent',
      '&:hover': { borderColor: Colors.ORANGE },
    }),
    valueContainer: (provided) => ({
      ...provided,
      minHeight: 36,
      height: 36,
      alignItems: 'center',
      padding: '0 6px',
    }),
    indicatorsContainer: (provided) => ({ ...provided, height: 36, paddingTop: 0 }),
  }), [selectStyles]);

  // build approaches options from data
  const approachOptions = React.useMemo(() => {
    const set = new Set();
    psychologists.forEach(p => p.approaches.forEach(a => set.add(a)));
    return Array.from(set).map(a => ({ value: a, label: a }));
  }, []);

  const applyFilters = () => {
    setPage(1);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setGenderFilter('Todos');
    setApproachesFilter([]);
    setAudienceFilter('Todos');
    setDateFilter('');
    setTimeFilter('');
    setPage(1);
  };

  const filteredPsychologists = React.useMemo(() => {
    return psychologists.filter((p) => {
      // specialties (selectedCategories) filtering if set
      if (selectedCategories && selectedCategories.length) {
        const selected = selectedCategories.map(c => c.label.toLowerCase());
        const hasAny = p.specialties.some(s => selected.includes(s.toLowerCase()));
        if (!hasAny) return false;
      }

      // gender filter
      if (genderFilter && genderFilter !== 'Todos' && p.gender !== genderFilter) return false;

      // approaches multi-select
      if (approachesFilter && approachesFilter.length) {
        const sel = approachesFilter.map(a => a.value.toLowerCase());
        const hasApproach = p.approaches.some(ap => sel.includes(ap.toLowerCase()));
        if (!hasApproach) return false;
      }

      // audience filter - data doesn't currently include audience field
      // if you later add p.audience, enable this filter. For now we skip.
      if (audienceFilter && audienceFilter !== 'Todos') {
        if (p.audience && p.audience !== audienceFilter) return false;
      }

      // date/time filter: keep psychologists that have at least one slot matching date/time
      if (dateFilter || timeFilter) {
        const matches = p.slots.some(s => {
          const slotDate = new Date(s.date);
          const slotDay = slotDate.toISOString().slice(0,10);
          const slotTime = slotDate.toISOString().slice(11,16);
          if (dateFilter && slotDay !== dateFilter) return false;
          if (timeFilter && slotTime !== timeFilter) return false;
          return s.available !== false; // ensure slot available
        });
        if (!matches) return false;
      }

      return true;
    });
  }, [selectedCategories, genderFilter, approachesFilter, audienceFilter, dateFilter, timeFilter]);
  const location = useLocation();
  const preselectIdRaw = location?.state?.preselectId;
  const preselectId = preselectIdRaw !== undefined && preselectIdRaw !== null ? Number(preselectIdRaw) : null;

  const displayedPsychologists = React.useMemo(() => {
    const list = filteredPsychologists || [];
    if (!preselectId) return list;
    const idx = list.findIndex(p => Number(p.id) === preselectId);
    if (idx <= 0) return list;
    const copy = [...list];
    const [item] = copy.splice(idx, 1);
    copy.unshift(item);
    return copy;
  }, [filteredPsychologists, preselectId]);
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
            <FullWidth>
              <ReactSelect
                isMulti
                options={categoryOptions}
                value={selectedCategories}
                onChange={(v) => setSelectedCategories(v)}
                styles={smallSelectStyles}
                placeholder="Buscar por especialidade"
                closeMenuOnSelect={false}
              />
            </FullWidth>
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
            <Box sx={{ width: 360, padding: 2 }} role="presentation">
            <FilterTitle>Filtros</FilterTitle>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <FormControl fullWidth size="small" sx={{ '& .MuiInputLabel-root.Mui-focused': { color: Colors.ORANGE }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: Colors.ORANGE } }}>
                <InputLabel id="gender-filter-label">Gênero</InputLabel>
                <Select
                  labelId="gender-filter-label"
                  id="gender-filter"
                  value={genderFilter}
                  label="Gênero"
                  onChange={(e) => setGenderFilter(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { '& .MuiMenuItem-root.Mui-selected': { backgroundColor: Colors.ORANGE, color: Colors.WHITE }, '& .MuiMenuItem-root:hover': { backgroundColor: Colors.LIGHT_ORANGE } } } }}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="Feminino">Feminino</MenuItem>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                </Select>
              </FormControl>

              <div>
                <LabelSmall>Abordagens</LabelSmall>
                <FullWidth>
                  <ReactSelect
                    isMulti
                    options={approachOptions}
                    value={approachesFilter}
                    onChange={(v) => setApproachesFilter(v || [])}
                    styles={selectStyles}
                    placeholder="Selecionar abordagens"
                    closeMenuOnSelect={false}
                  />
                </FullWidth>
              </div>

              <FormControl fullWidth size="small" sx={{ '& .MuiInputLabel-root.Mui-focused': { color: Colors.ORANGE }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: Colors.ORANGE } }}>
                <InputLabel id="audience-filter-label">Público</InputLabel>
                <Select
                  labelId="audience-filter-label"
                  id="audience-filter"
                  value={audienceFilter}
                  label="Público"
                  onChange={(e) => setAudienceFilter(e.target.value)}
                  MenuProps={{ PaperProps: { sx: { '& .MuiMenuItem-root.Mui-selected': { backgroundColor: Colors.ORANGE, color: Colors.WHITE }, '& .MuiMenuItem-root:hover': { backgroundColor: Colors.LIGHT_ORANGE } } } }}
                >
                  <MenuItem value="Todos">Todos</MenuItem>
                  <MenuItem value="Adultos">Adultos</MenuItem>
                  <MenuItem value="Crianças">Crianças</MenuItem>
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

              <TextField
                label="Hora"
                type="time"
                size="small"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
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

        <PsychologistsContainer>
          <FullWidth>
            <Stack alignItems="flex-start" spacing={2}>
            {displayedPsychologists?.slice((page - 1) * pageSize, page * pageSize).map((psychologist) => (
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

            <RowBetween>
              <Pagination
                count={Math.max(1, Math.ceil((displayedPsychologists?.length || 0) / pageSize))}
                page={page}
                onChange={(e, value) => setPage(value)}
                sx={{
                  '& .MuiPaginationItem-root.Mui-selected': {
                    backgroundColor: Colors.ORANGE,
                    color: Colors.WHITE,
                  },
                }}
              />

              <FormControl sx={{ minWidth: 180, width: 180, '& .MuiInputLabel-root.Mui-focused': { color: Colors.ORANGE }, '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: Colors.ORANGE } }}>
                <InputLabel id="page-size-label">Linhas por página</InputLabel>
                <Select
                  size="small"
                  sx={{ height: 44, minWidth: 180, width: 180, '& .MuiSvgIcon-root': { color: Colors.ORANGE } }}
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
                          sx: { minWidth: 180 }
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
                      <RatingRow>
                        <Rating value={dialogData.psychologist.rating} precision={0.1} readOnly size="small" sx={{ color: Colors.ORANGE }} />
                          <span>{Number(dialogData.psychologist.rating).toFixed(1)}</span>
                        </RatingRow>
                    </DialogInfo>
                  </DialogProfile>

                  <Section mt="12px">
                    <DialogLabel>Especialidades</DialogLabel>
                    <DialogValue>{dialogData.psychologist.specialties.join(', ')}</DialogValue>
                  </Section>

                  <Section mt="8px">
                    <DialogLabel>Abordagens</DialogLabel>
                    <DialogValue>{dialogData.psychologist.approaches.join(', ')}</DialogValue>
                  </Section>

                  <Section mt="8px">
                    <DialogLabel>Duração</DialogLabel>
                    <DialogValue>{dialogData.psychologist.duration}</DialogValue>
                  </Section>

                  <Section mt="12px">
                    <DialogLabel>Horário selecionado</DialogLabel>
                    <DialogValue>{dialogData.slot?.day} {dialogData.slot?.time}</DialogValue>
                  </Section>

                  <Section mt="8px">
                    <DialogLabel>Valor</DialogLabel>
                    <DialogValue>{dialogData.psychologist.price}</DialogValue>
                  </Section>
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

