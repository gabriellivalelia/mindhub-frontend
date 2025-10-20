import React from "react";
import { useEffect, useState } from "react";
import { SubHeader } from "../../components";
import AddAvailabilitiesComponent from "../../components/addAvailabilitiesComponent";
import {
  PageContainer,
  Container,
  BottomRow,
  Actions,
  MainCard,
} from "./styles";
import Button from "@mui/material/Button";
import Colors from "../../globalConfigs/globalStyles/colors";

import {
  useAddAvailabilities,
  useRemoveAvailabilities,
  useCurrentPsychologist,
} from "../../services/usePsychologists";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "../../stores/useToastStore";

// Função para normalizar datetime removendo milissegundos do formato ISO
const normalizeDatetime = (isoString) => {
  // Remove .000 ou qualquer milissegundo da string ISO
  return isoString.replace(/\.\d{3}Z$/, "Z");
};

const AddAvailabilitiesPage = () => {
  const [selectedSlots, setSelectedSlots] = React.useState([]);
  const [slotsToRemove, setSlotsToRemove] = React.useState([]);
  const [daysVisible, setDaysVisible] = useState(7);

  const navigate = useNavigate();
  const addToast = useToastStore((state) => state.addToast);
  const addAvailabilitiesMutation = useAddAvailabilities();
  const removeAvailabilitiesMutation = useRemoveAvailabilities();
  const { data: psychologistData, isLoading: isLoadingPsychologist } =
    useCurrentPsychologist();

  // Separar availabilities em disponíveis e agendadas
  const availableSlots = React.useMemo(() => {
    if (!psychologistData?.availabilities) return [];
    const slots = psychologistData.availabilities
      .filter((av) => av.available)
      .map((av) => {
        // Normalizar para ISO string para comparação consistente
        const date = new Date(av.date);
        return date.toISOString();
      });
    return slots;
  }, [psychologistData]);

  const bookedSlots = React.useMemo(() => {
    if (!psychologistData?.availabilities) return [];
    const slots = psychologistData.availabilities
      .filter((av) => !av.available)
      .map((av) => {
        const date = new Date(av.date);
        return date.toISOString();
      });
    return slots;
  }, [psychologistData]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 480) setDaysVisible(3);
      else if (w <= 768) setDaysVisible(5);
      else setDaysVisible(7);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleSelectionChange = (slots) => {
    setSelectedSlots(slots);
  };

  const handleRemovalChange = (slots) => {
    setSlotsToRemove(slots);
  };

  const handleSave = async () => {
    try {
      const newSlots = selectedSlots.filter(
        (slot) => !availableSlots.includes(slot.iso)
      );

      const hasNewSlots = newSlots.length > 0;
      const hasSlotsToRemove = slotsToRemove.length > 0;

      if (!hasNewSlots && !hasSlotsToRemove) {
        addToast("Nenhuma alteração para salvar.", "info");
        return;
      }

      if (hasNewSlots) {
        await addAvailabilitiesMutation.mutateAsync(
          newSlots.map((slot) => normalizeDatetime(slot.iso))
        );
      }

      if (hasSlotsToRemove) {
        const slotsToRemoveIso = slotsToRemove.map((slot) =>
          normalizeDatetime(slot.iso)
        );
        await removeAvailabilitiesMutation.mutateAsync(slotsToRemoveIso);
      }

      const message = [];
      if (hasNewSlots) message.push(`${newSlots.length} adicionada(s)`);
      if (hasSlotsToRemove) message.push(`${slotsToRemove.length} removida(s)`);

      addToast(
        `Disponibilidades atualizadas: ${message.join(", ")}!`,
        "success"
      );
      navigate("/");
    } catch (error) {
      console.error("Error saving availabilities:", error);

      let errorMessage = "Erro desconhecido. Tente novamente.";

      if (error.data?.errors) {
        if (Array.isArray(error.data.errors)) {
          errorMessage = error.data.errors.join(", ");
        } else if (typeof error.data.errors === "string") {
          errorMessage = error.data.errors;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      addToast(`Erro ao salvar disponibilidades: ${errorMessage}`, "error");
    }
  };

  if (isLoadingPsychologist) {
    return (
      <PageContainer>
        <SubHeader text="Gerencie seus horários" />
        <Container>
          <p>Carregando disponibilidades...</p>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SubHeader text="Gerencie seus horários" />
      <Container>
        <MainCard>
          <AddAvailabilitiesComponent
            daysVisible={daysVisible}
            onSelectionChange={handleSelectionChange}
            onRemovalChange={handleRemovalChange}
            existingAvailableSlots={availableSlots}
            existingBookedSlots={bookedSlots}
          />
        </MainCard>
        <BottomRow>
          <Button
            variant="contained"
            sx={{
              backgroundColor: Colors.BROWN,
              color: Colors.WHITE,
              boxShadow: "none",
              width: { xs: "45%", md: "200px" },
              height: "45px",
              textTransform: "none",
              "&:hover": { boxShadow: "none", backgroundColor: Colors.GREY },
            }}
            onClick={handleSave}
            disabled={
              addAvailabilitiesMutation.isLoading ||
              removeAvailabilitiesMutation.isLoading
            }
          >
            {addAvailabilitiesMutation.isLoading ||
            removeAvailabilitiesMutation.isLoading
              ? "Salvando..."
              : "Salvar"}
          </Button>
        </BottomRow>
      </Container>
    </PageContainer>
  );
};

export default AddAvailabilitiesPage;
