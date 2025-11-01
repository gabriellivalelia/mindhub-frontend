import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import {
  ScheduleWrapper,
  ScheduleGrid,
  HeaderRow,
  SlotsRowContainer,
  SlotsRow,
  ArrowButton,
  TopControls,
  DayColumn,
  DayHeader,
  DayName,
  DayNumber,
  TimeSlot,
  ScrollBar,
} from "./styles";

/**
 * Gera slots de horários para um dia específico.
 * Cria horários de 05:00 até 23:00 em intervalos de 1 hora.
 *
 * @param {Date} date - Data para gerar os slots
 * @returns {Array<Object>} Array de slots com data ISO e disponibilidade
 */
const generateDaySlots = (date) => {
  const slots = [];
  for (let hour = 5; hour <= 23; hour++) {
    const d = new Date(date);
    d.setHours(hour, 0, 0, 0);

    // toISOString() converte para UTC automaticamente
    slots.push({ date: d.toISOString(), available: true });
  }
  return slots;
};

/**
 * Agrupa slots por dia para facilitar a renderização.
 *
 * @param {Array<Object>} slots - Array de slots com data e disponibilidade
 * @returns {Map<string, Array<Object>>} Map com data como chave e horários como valor
 */
const groupSlotsByDay = (slots) => {
  const grouped = new Map();
  if (!slots) return grouped;

  slots.forEach((slot) => {
    const date = new Date(slot.date);
    const dayKey = date.toLocaleDateString("en-CA");
    const time = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    if (!grouped.has(dayKey)) grouped.set(dayKey, []);
    grouped
      .get(dayKey)
      .push({ time, available: slot.available, iso: slot.date });
  });

  grouped.forEach((times) =>
    times.sort((a, b) => a.time.localeCompare(b.time))
  );
  return grouped;
};

/**
 * Componente AddAvailabilitiesComponent - Gerenciamento de disponibilidades do psicólogo.
 *
 * Permite ao psicólogo adicionar e remover horários disponíveis na agenda.
 * Exibe slots existentes (disponíveis e agendados) e permite seleção de novos horários.
 *
 * Funcionalidades:
 * - Visualização de agenda semanal com navegação
 * - Geração automática de slots (05:00 - 23:00)
 * - Seleção/deseleção de múltiplos horários
 * - Diferenciação visual de slots disponíveis, agendados e novos
 * - Callbacks para adição e remoção de slots
 *
 * Estados dos slots:
 * - Disponível existente: Pode ser removido (azul)
 * - Agendado: Não pode ser alterado (cinza)
 * - Novo: Sendo adicionado (verde)
 * - Slot vazio: Pode ser selecionado (branco)
 *
 * @component
 * @param {Object} props - Props do componente
 * @param {number} [props.daysVisible=5] - Número de dias exibidos na grade
 * @param {Function} props.onSelectionChange - Callback quando novos slots são selecionados
 * @param {Function} props.onRemovalChange - Callback quando slots existentes são removidos
 * @param {Array<Object>} [props.existingAvailableSlots=[]] - Slots já disponíveis na agenda
 * @param {Array<Object>} [props.existingBookedSlots=[]] - Slots com consultas agendadas
 * @returns {JSX.Element} Grade de gerenciamento de disponibilidades
 *
 * @example
 * <AddAvailabilitiesComponent
 *   existingAvailableSlots={psychologist.availabilities}
 *   existingBookedSlots={bookedSlots}
 *   onSelectionChange={(slots) => setNewSlots(slots)}
 *   onRemovalChange={(slots) => setRemovedSlots(slots)}
 * />
 */
const AddAvailabilitiesComponent = ({
  daysVisible = 5,
  onSelectionChange,
  onRemovalChange,
  existingAvailableSlots = [],
  existingBookedSlots = [],
}) => {
  const [displayDate, setDisplayDate] = useState(new Date());

  // selectedSet: slots selecionados (novos OU existentes)
  const [selectedSet, setSelectedSet] = useState(() => {
    // Inicializar com slots disponíveis existentes (pré-marcados)
    const s = new Set();
    existingAvailableSlots.forEach((iso) => s.add(iso));
    return s;
  });

  // markedForRemoval: slots existentes que foram desmarcados para remoção (vermelho)
  const [markedForRemoval, setMarkedForRemoval] = useState(new Set());

  // Drag selection state
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragModeSelect, setDragModeSelect] = useState(true);

  // Sets para consulta rápida
  const existingAvailableSet = useMemo(
    () => new Set(existingAvailableSlots || []),
    [existingAvailableSlots]
  );
  const existingBookedSet = useMemo(
    () => new Set(existingBookedSlots || []),
    [existingBookedSlots]
  );

  const visibleDays = useMemo(() => {
    return Array.from({ length: daysVisible }).map((_, i) => {
      const date = new Date(displayDate);
      date.setDate(date.getDate() + i);
      date.setHours(0, 0, 0, 0);
      return date;
    });
  }, [displayDate, daysVisible]);

  const allSlots = useMemo(() => {
    const arr = [];
    const existingMap = new Map();

    // Primeiro, mapear todos os slots existentes (disponíveis + agendados) por horário normalizado
    [...existingAvailableSlots, ...existingBookedSlots].forEach((isoString) => {
      const date = new Date(isoString);
      const dayKey = date.toLocaleDateString("en-CA");
      const hourKey = date.getUTCHours(); // Usar hora UTC para comparação
      const key = `${dayKey}-${hourKey}`;
      existingMap.set(key, isoString);
    });

    // Gerar slots para os dias visíveis, usando ISO do backend quando existir
    visibleDays.forEach((d) => {
      const daySlots = generateDaySlots(d);
      daySlots.forEach((s) => {
        const date = new Date(s.date);
        const dayKey = date.toLocaleDateString("en-CA");
        const hourKey = date.getUTCHours();
        const key = `${dayKey}-${hourKey}`;

        // Se existe no backend, usar a ISO string do backend
        if (existingMap.has(key)) {
          arr.push({ date: existingMap.get(key), available: true });
        } else {
          arr.push(s);
        }
      });
    });
    return arr;
  }, [visibleDays, existingAvailableSlots, existingBookedSlots]);

  const slotsByDay = useMemo(() => groupSlotsByDay(allSlots), [allSlots]);

  useEffect(() => {
    const onUp = () => setIsMouseDown(false);
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  const navigateDays = (amount) => {
    setDisplayDate((current) => {
      const newDate = new Date(current);
      newDate.setDate(newDate.getDate() + amount);
      return newDate;
    });
  };

  return (
    <ScheduleWrapper>
      <TopControls>
        <ArrowButton onClick={() => navigateDays(-daysVisible)}>
          &lt;
        </ArrowButton>
        <ArrowButton onClick={() => navigateDays(daysVisible)}>
          &gt;
        </ArrowButton>
      </TopControls>
      <ScheduleGrid>
        <HeaderRow>
          {visibleDays.map((date) => (
            <DayHeader key={date.toLocaleDateString("en-CA")}>
              <DayName>
                {date
                  .toLocaleString("pt-BR", { weekday: "short" })
                  .replace(".", "")}
              </DayName>
              <DayNumber>
                {date
                  .toLocaleString("pt-BR", { day: "numeric", month: "short" })
                  .replace(" de ", " ")}
              </DayNumber>
            </DayHeader>
          ))}
        </HeaderRow>

        <SlotsRowContainer>
          <SlotsRow>
            {visibleDays.map((date) => {
              const dayKey = date.toLocaleDateString("en-CA");
              const daySlots = slotsByDay.get(dayKey) || [];

              return (
                <DayColumn key={dayKey}>
                  {daySlots.map((slotInfo) => {
                    const isBooked = existingBookedSet.has(slotInfo.iso);
                    const isExistingAvailable = existingAvailableSet.has(
                      slotInfo.iso
                    );
                    const isSelected = selectedSet.has(slotInfo.iso);
                    const isMarkedForRemoval = markedForRemoval.has(
                      slotInfo.iso
                    );
                    const isPast = new Date(slotInfo.iso) < new Date();

                    return (
                      <TimeSlot
                        key={slotInfo.time}
                        $available={slotInfo.available}
                        $selected={isSelected && !isMarkedForRemoval}
                        $readonly={isBooked}
                        $markedForRemoval={isMarkedForRemoval}
                        $isPast={isPast}
                        onMouseDown={() => {
                          if (isBooked || isPast) return; // Slots agendados e passados não podem ser alterados

                          setIsMouseDown(true);

                          let newSelectedSet;
                          let newMarkedForRemoval;

                          if (isExistingAvailable) {
                            if (isSelected) {
                              setSelectedSet((prev) => {
                                newSelectedSet = new Set(prev);
                                newSelectedSet.delete(slotInfo.iso);
                                return newSelectedSet;
                              });
                              setMarkedForRemoval((prev) => {
                                newMarkedForRemoval = new Set(prev);
                                newMarkedForRemoval.add(slotInfo.iso);
                                return newMarkedForRemoval;
                              });
                            } else {
                              setMarkedForRemoval((prev) => {
                                newMarkedForRemoval = new Set(prev);
                                newMarkedForRemoval.delete(slotInfo.iso);
                                return newMarkedForRemoval;
                              });
                              setSelectedSet((prev) => {
                                newSelectedSet = new Set(prev);
                                newSelectedSet.add(slotInfo.iso);
                                return newSelectedSet;
                              });
                            }
                          } else {
                            const currentlySelected = selectedSet.has(
                              slotInfo.iso
                            );
                            setDragModeSelect(!currentlySelected);

                            setSelectedSet((prev) => {
                              newSelectedSet = new Set(prev);
                              if (newSelectedSet.has(slotInfo.iso))
                                newSelectedSet.delete(slotInfo.iso);
                              else newSelectedSet.add(slotInfo.iso);
                              return newSelectedSet;
                            });
                            newMarkedForRemoval = markedForRemoval;
                          }

                          setTimeout(() => {
                            if (typeof onSelectionChange === "function") {
                              const selectedArray = Array.from(
                                newSelectedSet || selectedSet
                              )
                                .filter(
                                  (iso) =>
                                    !(
                                      newMarkedForRemoval || markedForRemoval
                                    ).has(iso)
                                )
                                .map((sIso) => {
                                  const d = new Date(sIso);
                                  return {
                                    iso: sIso,
                                    day: d.toLocaleDateString("en-CA"),
                                    time: d.toLocaleTimeString("pt-BR", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    }),
                                  };
                                });
                              onSelectionChange(selectedArray);
                            }

                            if (typeof onRemovalChange === "function") {
                              const removalArray = Array.from(
                                newMarkedForRemoval || markedForRemoval
                              ).map((sIso) => {
                                const d = new Date(sIso);
                                return {
                                  iso: sIso,
                                  day: d.toLocaleDateString("en-CA"),
                                  time: d.toLocaleTimeString("pt-BR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: false,
                                  }),
                                };
                              });
                              onRemovalChange(removalArray);
                            }
                          }, 0);
                        }}
                        onMouseEnter={() => {
                          if (!isMouseDown) return;
                          if (isBooked || isPast) return;
                          if (isExistingAvailable) return; // Não arrastar em slots existentes

                          // Apenas para slots novos
                          setSelectedSet((prev) => {
                            const next = new Set(prev);
                            const has = next.has(slotInfo.iso);
                            if (dragModeSelect && !has) next.add(slotInfo.iso);
                            if (!dragModeSelect && has)
                              next.delete(slotInfo.iso);

                            // Notificar mudanças
                            if (typeof onSelectionChange === "function") {
                              const selectedArray = Array.from(next)
                                .filter((iso) => !markedForRemoval.has(iso))
                                .map((sIso) => {
                                  const d = new Date(sIso);
                                  return {
                                    iso: sIso,
                                    day: d.toLocaleDateString("en-CA"),
                                    time: d.toLocaleTimeString("pt-BR", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: false,
                                    }),
                                  };
                                });
                              onSelectionChange(selectedArray);
                            }

                            return next;
                          });
                        }}
                        onMouseUp={() => {
                          setIsMouseDown(false);
                        }}
                      >
                        {slotInfo.time}
                      </TimeSlot>
                    );
                  })}
                </DayColumn>
              );
            })}
          </SlotsRow>
          <ScrollBar />
        </SlotsRowContainer>
      </ScheduleGrid>
    </ScheduleWrapper>
  );
};

export default AddAvailabilitiesComponent;
