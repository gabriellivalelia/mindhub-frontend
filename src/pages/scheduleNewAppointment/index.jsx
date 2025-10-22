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

import ReactSelect from "react-select";

import { useNavigate } from "react-router-dom";
import { usePsychologists } from "../../services/usePsychologists";
import { useSpecialties } from "../../services/useSpecialties";
import { useApproaches } from "../../services/useApproaches";
import { useToastStore } from "../../stores/useToastStore";

import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import { SubHeader } from "../../components";
import Colors from "../../globalConfigs/globalStyles/colors";
import FontSizes from "../../globalConfigs/globalStyles/fontSizes";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Person from "@mui/icons-material/Person";
import LocationOn from "@mui/icons-material/LocationOn";
import Timer from "@mui/icons-material/Timer";
import Groups from "@mui/icons-material/Groups";
import Paid from "@mui/icons-material/Paid";
import { useLocation } from "react-router-dom";
import ScheduleComponent from "../../components/scheduleComponent";
import { Menu } from "@mui/material";

import { useSolicitScheduleAppointment } from "../../services/useAppointments";

function ScheduleNewAppointment() {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [selectedSlots, setSelectedSlots] = React.useState({});

  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);
  const solicitScheduleAppointmentMutation = useSolicitScheduleAppointment();

  const [selectedSpecialties, setSelectedSpecialties] = React.useState([]);
  const [genderFilter, setGenderFilter] = React.useState("");
  const [selectedApproaches, setSelectedApproaches] = React.useState([]);
  const [audienceFilter, setAudienceFilter] = React.useState("");
  const [dateFilter, setDateFilter] = React.useState("");
  const [timeFilter, setTimeFilter] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");

  // Construir query params para a API
  const queryParams = React.useMemo(() => {
    const params = { page, size: pageSize };

    if (selectedSpecialties.length > 0) {
      // Backend espera specialty_ids como array/set de strings
      selectedSpecialties.forEach((s) => {
        if (!params.specialty_ids) params.specialty_ids = [];
        params.specialty_ids.push(s.value);
      });
    }

    if (genderFilter && genderFilter !== "all" && genderFilter !== "") {
      params.gender = genderFilter;
    }

    if (selectedApproaches.length > 0) {
      selectedApproaches.forEach((a) => {
        if (!params.approach_ids) params.approach_ids = [];
        params.approach_ids.push(a.value);
      });
    }

    if (audienceFilter && audienceFilter !== "") {
      params.audiences = [audienceFilter];
    }

    if (maxPrice) {
      params.max_price = parseFloat(maxPrice);
    }

    return params;
  }, [
    page,
    pageSize,
    selectedSpecialties,
    genderFilter,
    selectedApproaches,
    audienceFilter,
    maxPrice,
  ]);

  // Buscar psicólogos da API com filtros
  const {
    data: psychologistsPage,
    isLoading,
    isError,
  } = usePsychologists(queryParams);

  const psychologists = React.useMemo(
    () => psychologistsPage?.items || [],
    [psychologistsPage]
  );

  // Buscar especialidades do banco
  const { data: specialtiesData } = useSpecialties({ size: 100 });
  const specialties = React.useMemo(
    () => specialtiesData?.items || [],
    [specialtiesData]
  );

  // Buscar abordagens do banco
  const { data: approachesData } = useApproaches({ size: 100 });
  const approaches = React.useMemo(
    () => approachesData?.items || [],
    [approachesData]
  );

  // Transformar especialidades em options para o select
  const specialtyOptions = React.useMemo(
    () => specialties.map((s) => ({ value: s.id, label: s.name })),
    [specialties]
  );

  // Transformar abordagens em options para o select
  const approachOptions = React.useMemo(
    () => approaches.map((a) => ({ value: a.id, label: a.name })),
    [approaches]
  );

  const genderDict = {
    female: "Feminino",
    male: "Masculino",
    non_binary: "Não-binário",
    prefer_not_to_say: "Não informado",
  };

  const audiencesDict = {
    children: "Crianças",
    adolescents: "Adolescentes",
    adults: "Adultos",
    elderly: "Idosos",
    couples: "Casais",
  };

  const selectStyles = React.useMemo(
    () => ({
      control: (provided) => ({
        ...provided,
        border: `2px solid ${Colors.ORANGE}`,
        borderRadius: 6,
        minHeight: 44,
        height: "auto",
        boxShadow: "none",
        background: "transparent",
        "&:hover": { borderColor: Colors.ORANGE },
        outline: "none",
        overflow: "visible",
        alignItems: "flex-start",
        borderColor: Colors.ORANGE,
      }),
      valueContainer: (provided) => ({
        ...provided,
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: 6,
        padding: "0.2rem 0.6rem 0.4rem 0.4rem",
        minHeight: 44,
        height: "auto",
        fontSize: FontSizes.SMALL,
        overflow: "visible",
      }),
      singleValue: (provided) => ({
        ...provided,
        fontSize: FontSizes.SMALL,
        color: Colors.DARK_GREY,
      }),
      placeholder: (provided) => ({
        ...provided,
        fontSize: FontSizes.SMALL,
        color: Colors.GREY,
      }),
      input: (provided) => ({
        ...provided,
        margin: 0,
        padding: 0,
        fontSize: FontSizes.SMALL,
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        height: 44,
        paddingTop: 6,
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: Colors.LIGHT_ORANGE,
        color: Colors.WHITE,
        fontSize: FontSizes.SMALL,
        maxWidth: "none",
        display: "inline-flex",
        alignItems: "center",
        borderRadius: 6,
        padding: "0 6px",
        margin: "2px 6px 2px 0",
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        overflow: "visible",
        textOverflow: "clip",
        whiteSpace: "normal",
        maxWidth: "none",
        fontSize: FontSizes.SMALL,
        color: Colors.WHITE,
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        marginLeft: 6,
      }),
      clearIndicator: (provided) => ({
        ...provided,
        color: Colors.ORANGE,
        ":hover": { color: Colors.LIGHT_ORANGE },
      }),
      dropdownIndicator: (provided) => ({ ...provided, color: Colors.ORANGE }),
      indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: Colors.ORANGE,
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
          ? Colors.LIGHT_ORANGE
          : provided.backgroundColor,
        color: state.isSelected ? Colors.WHITE : Colors.GREY,
        ":hover": { backgroundColor: Colors.LIGHT_ORANGE, color: Colors.WHITE },
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }),
      menu: (provided) => ({
        ...provided,
        zIndex: 9999,
        width: "100%",
        boxSizing: "border-box",
        border: `none`,
        borderRadius: 6,
        overflow: "hidden",
        marginTop: 6,
        background: Colors.WHITE,
        maxHeight: "240px",
      }),
    }),
    []
  );

  const smallSelectStyles = React.useMemo(
    () => ({
      ...selectStyles,
      control: (provided) => ({
        ...provided,
        minHeight: 36,
        height: 36,
        alignItems: "center",
        border: `2px solid ${Colors.ORANGE}`,
        background: "transparent",
        "&:hover": { borderColor: Colors.ORANGE },
        boxShadow: "none",
        outline: "none",
      }),
      valueContainer: (provided) => ({
        ...provided,
        minHeight: 36,
        height: 36,
        alignItems: "center",
        padding: "0 6px",
      }),
      indicatorsContainer: (provided) => ({
        ...provided,
        height: 36,
        paddingTop: 0,
      }),
    }),
    [selectStyles]
  );

  const applyFilters = () => {
    setPage(1);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedSpecialties([]);
    setGenderFilter("");
    setSelectedApproaches([]);
    setAudienceFilter("");
    setDateFilter("");
    setTimeFilter("");
    setMaxPrice("");
    setPage(1);
  };
  const location = useLocation();
  const preselectIdRaw = location?.state?.preselectId;
  const preselectId =
    preselectIdRaw !== undefined && preselectIdRaw !== null
      ? Number(preselectIdRaw)
      : null;

  const displayedPsychologists = React.useMemo(() => {
    const list = psychologists || [];
    if (!preselectId) return list;
    const idx = list.findIndex((p) => Number(p.id) === preselectId);
    if (idx <= 0) return list;
    const copy = [...list];
    const [item] = copy.splice(idx, 1);
    copy.unshift(item);
    return copy;
  }, [psychologists, preselectId]);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(null);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogData(null);
  };

  const handleProceedToPayment = async () => {
    if (!dialogData) return;

    try {
      // Chamar o endpoint de agendamento
      const appointment = await solicitScheduleAppointmentMutation.mutateAsync({
        psychologist_id: dialogData.psychologist.id,
        appointment_date: dialogData.slot.iso, // Data em formato ISO 8601
      });

      console.log("Agendamento criado:", appointment);

      // Navegar para página de pagamento com os dados do appointment
      navigate("/payment", {
        state: {
          appointment: appointment,
          psychologist: {
            ...dialogData.psychologist,
            // keep legacy aliases used elsewhere
            picture:
              dialogData.psychologist.profile_picture?.src ||
              dialogData.psychologist.picture,
          },
          // normalize slot to include `datetime` which Payment page expects
          slot: {
            datetime: dialogData.slot?.iso || dialogData.slot?.datetime,
            day: dialogData.slot?.day,
            time: dialogData.slot?.time,
            iso: dialogData.slot?.iso,
          },
          // forward price and appointment id explicitly
          price:
            appointment?.value ||
            dialogData.psychologist.value_per_appointment ||
            0,
          appointment_id: appointment?.id,
        },
      });
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      addToast(
        "Erro ao criar agendamento: " +
          (error.response?.data?.detail || error.message),
        "error"
      );
    }
  };

  const handleSlotSelect = (psychologistId, slot) => {
    setSelectedSlots((prev) => {
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
                options={specialtyOptions}
                value={selectedSpecialties}
                onChange={(v) => setSelectedSpecialties(v)}
                styles={smallSelectStyles}
                placeholder="Buscar por especialidade"
                closeMenuOnSelect={false}
              />
            </FullWidth>
            <CurrencyContainer>
              <CurrencyLabel>Valor máximo por consulta</CurrencyLabel>
              <CurrencyInput
                type="number"
                placeholder="R$ 0,00"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
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
              <div>
                <LabelSmall>Gênero</LabelSmall>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      { borderColor: Colors.ORANGE },
                  }}
                >
                  <Select
                    id="gender-filter"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                    displayEmpty
                    sx={{
                      height: 36,
                      "& .MuiSvgIcon-root": { color: Colors.ORANGE },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root.Mui-selected": {
                            backgroundColor: Colors.ORANGE,
                            color: Colors.WHITE,
                          },
                          "& .MuiMenuItem-root:hover": {
                            backgroundColor: Colors.LIGHT_ORANGE,
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="all">Todos</MenuItem>
                    <MenuItem value="female">Feminino</MenuItem>
                    <MenuItem value="male">Masculino</MenuItem>
                    <MenuItem value="non_binary">Não-binário</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <LabelSmall>Abordagens</LabelSmall>
                <FullWidth>
                  <ReactSelect
                    isMulti
                    options={approachOptions}
                    value={selectedApproaches}
                    onChange={(v) => setSelectedApproaches(v || [])}
                    styles={selectStyles}
                    placeholder="Selecionar abordagens"
                    closeMenuOnSelect={false}
                  />
                </FullWidth>
              </div>

              <div>
                <LabelSmall>Público</LabelSmall>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      { borderColor: Colors.ORANGE },
                  }}
                >
                  <Select
                    id="audience-filter"
                    value={audienceFilter}
                    onChange={(e) => setAudienceFilter(e.target.value)}
                    displayEmpty
                    sx={{
                      height: 36,
                      "& .MuiSvgIcon-root": { color: Colors.ORANGE },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          "& .MuiMenuItem-root.Mui-selected": {
                            backgroundColor: Colors.ORANGE,
                            color: Colors.WHITE,
                          },
                          "& .MuiMenuItem-root:hover": {
                            backgroundColor: Colors.LIGHT_ORANGE,
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="">Todos</MenuItem>
                    <MenuItem value="adults">Adultos</MenuItem>
                    <MenuItem value="children">Crianças</MenuItem>
                    <MenuItem value="adolescents">Adolescentes</MenuItem>
                    <MenuItem value="elderly">Idosos</MenuItem>
                    <MenuItem value="couples">Casais</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div>
                <LabelSmall>Data</LabelSmall>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { fontSize: FontSizes.SMALL },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      { borderColor: Colors.ORANGE },
                  }}
                />
              </div>

              <div>
                <LabelSmall>Hora</LabelSmall>
                <TextField
                  type="time"
                  size="small"
                  fullWidth
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  sx={{
                    "& .MuiInputBase-input": { fontSize: FontSizes.SMALL },
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

        <PsychologistsContainer>
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
            ) : isError ? (
              <p>Erro ao carregar psicólogos. Tente novamente mais tarde.</p>
            ) : (
              <Stack alignItems="flex-start" spacing={2}>
                {displayedPsychologists?.map((psychologist) => (
                  <PsychologistCard key={psychologist.id}>
                    <ProfileContainer>
                      <ProfessionalPictureContainer>
                        <ProfessionalPicture
                          src={psychologist.profile_picture.src}
                          alt={psychologist.name}
                        />
                      </ProfessionalPictureContainer>
                      <PrimaryInfo>
                        <ProfessionalName>{psychologist.name}</ProfessionalName>
                        <ProfessionalCrp>{psychologist.crp}</ProfessionalCrp>
                        {/* <ProfessionalRating>
                            <Rating
                              name={`read-${psychologist.id}`}
                              value={0}
                              precision={0.1}
                              readOnly
                              size="small"
                              sx={{ color: Colors.ORANGE }}
                            />
                            0.0
                          </ProfessionalRating> */}
                      </PrimaryInfo>
                    </ProfileContainer>
                    <AnotherInfo>
                      <SecondaryInfo>
                        <Specialties>
                          {psychologist.specialties
                            ?.map((s) => s.name)
                            .join(", ") || ""}
                        </Specialties>
                        <Approaches>
                          {psychologist.approaches
                            ?.map((a) => a.name)
                            .join(", ") || ""}
                        </Approaches>
                        <Description>{psychologist.description}</Description>
                        <TertiaryInfo>
                          <InfoWithIcon>
                            <Paid sx={{ color: Colors.ORANGE }} />
                            R$ {psychologist.value_per_appointment?.toFixed(2)}
                          </InfoWithIcon>
                          <InfoWithIcon>
                            <Timer sx={{ color: Colors.ORANGE }} />
                            50 minutos
                          </InfoWithIcon>
                          <InfoWithIcon>
                            <Person sx={{ color: Colors.ORANGE }} />
                            Gênero {genderDict[psychologist.gender]}
                          </InfoWithIcon>
                          <InfoWithIcon>
                            <Groups sx={{ color: Colors.ORANGE }} />
                            Atende{" "}
                            {psychologist.audiences
                              ?.map((audience) => audiencesDict[audience])
                              .join(", ")}
                          </InfoWithIcon>
                          <InfoWithIcon>
                            <LocationOn sx={{ color: Colors.ORANGE }} />
                            De {psychologist.city?.name},{" "}
                            {psychologist.city?.state?.name}
                          </InfoWithIcon>
                        </TertiaryInfo>
                      </SecondaryInfo>
                      <ScheduleContainer>
                        <ScheduleComponent
                          allSlots={psychologist.availabilities || []}
                          onSlotSelect={(slot) =>
                            handleSlotSelect(psychologist.id, slot)
                          }
                        />
                        <ScheduleButton
                          onClick={() => {
                            const slot = selectedSlots[psychologist.id];
                            if (!slot) {
                              addToast(
                                "Por favor, selecione um horário antes de agendar.",
                                "warning"
                              );
                              return;
                            }
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
                    count={psychologistsPage?.total_pages || 1}
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
                      minWidth: 180,
                      width: 180,
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
                        height: 44,
                        minWidth: 180,
                        width: 180,
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
                            sx: { minWidth: 180 },
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
            )}
          </FullWidth>
        </PsychologistsContainer>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="booking-dialog-title"
        >
          <DialogTitle id="booking-dialog-title">
            Confirmar Agendamento
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {dialogData ? (
                <div>
                  <DialogProfile>
                    <DialogAvatar
                      src={dialogData.psychologist.profile_picture.src}
                      alt={dialogData.psychologist.name}
                    />
                    <DialogInfo>
                      <DialogLabel>{dialogData.psychologist.name}</DialogLabel>
                      <DialogValue>{dialogData.psychologist.crp}</DialogValue>
                      {/* <RatingRow>
                        <Rating
                          value={0}
                          precision={0.1}
                          readOnly
                          size="small"
                          sx={{ color: Colors.ORANGE }}
                        />
                        <span>0.0</span>
                      </RatingRow> */}
                    </DialogInfo>
                  </DialogProfile>

                  <Section mt="12px">
                    <DialogLabel>Especialidades</DialogLabel>
                    <DialogValue>
                      {dialogData.psychologist.specialties
                        ?.map((s) => s.name)
                        .join(", ") || ""}
                    </DialogValue>
                  </Section>

                  <Section mt="8px">
                    <DialogLabel>Abordagens</DialogLabel>
                    <DialogValue>
                      {dialogData.psychologist.approaches
                        ?.map((a) => a.name)
                        .join(", ") || ""}
                    </DialogValue>
                  </Section>

                  <Section mt="8px">
                    <DialogLabel>Duração</DialogLabel>
                    <DialogValue>50 minutos</DialogValue>
                  </Section>

                  <Section mt="12px">
                    <DialogLabel>Horário selecionado</DialogLabel>
                    <DialogValue>
                      {dialogData.slot?.day} {dialogData.slot?.time}
                    </DialogValue>
                  </Section>

                  <Section mt="8px">
                    <DialogLabel>Valor</DialogLabel>
                    <DialogValue>
                      R${" "}
                      {dialogData.psychologist.value_per_appointment?.toFixed(
                        2
                      )}
                    </DialogValue>
                  </Section>
                </div>
              ) : (
                "Nenhuma seleção."
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDialogClose}
              variant="outlined"
              sx={{
                borderColor: Colors.ORANGE,
                color: Colors.ORANGE,
                textTransform: "none",
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleProceedToPayment}
              variant="contained"
              sx={{
                backgroundColor: Colors.ORANGE,
                color: Colors.WHITE,
                "&:hover": { backgroundColor: Colors.LIGHT_ORANGE },
                textTransform: "none",
              }}
            >
              Prosseguir para o pagamento
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </PageContainer>
  );
}

export default ScheduleNewAppointment;
