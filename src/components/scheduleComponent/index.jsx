import {React, useState, useMemo } from 'react';
import {
  ScheduleWrapper,
  ScheduleGrid,
  HeaderRow,
  SlotsRowContainer,
  SlotsRow,
  ArrowButton,
  DayColumn,
  DayHeader,
  DayName,
  DayNumber,
  TimeSlot,
  ScrollBar,
} from './styles';

const groupSlotsByDay = (slots) => {
  const grouped = new Map();
  if (!slots) return grouped;

  slots.forEach((slot) => {
    const date = new Date(slot.date);
    const dayKey = date.toISOString().split('T')[0];
    const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });

    if (!grouped.has(dayKey)) {
      grouped.set(dayKey, []);
    }
    // keep original ISO so parent can get exact datetime
    grouped.get(dayKey).push({ time, available: slot.available, iso: slot.date });
  });

  grouped.forEach(times => times.sort((a, b) => a.time.localeCompare(b.time)));
  return grouped;
};

const ScheduleComponent = ({ allSlots, onSlotSelect }) => {
  const [displayDate, setDisplayDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slotsByDay = useMemo(() => groupSlotsByDay(allSlots), [allSlots]);

  const visibleDays = Array.from({ length: 5 }).map((_, i) => {
    const date = new Date(displayDate);
    date.setDate(date.getDate() + i);
    return date;
  });



  const navigateDays = (amount) => {
    setDisplayDate(current => {
      const newDate = new Date(current);
      newDate.setDate(newDate.getDate() + amount);
      return newDate;
    });
  };

  return (
    <ScheduleWrapper>
      <ArrowButton onClick={() => navigateDays(-5)}>&lt;</ArrowButton>
      <ScheduleGrid>
        {/* Linha dos Cabeçalhos dos Dias */}
        <HeaderRow>
          {visibleDays.map((date) => (
            <DayHeader key={date.toISOString()}>
              <DayName>{date.toLocaleString('pt-BR', { weekday: 'short' }).replace('.', '')}</DayName>
              <DayNumber>{date.toLocaleString('pt-BR', { day: 'numeric', month: 'short' }).replace(' de ', ' ')}</DayNumber>
            </DayHeader>
          ))}
        </HeaderRow>

        {/* Linha dos Horários */}
        <SlotsRowContainer>
          <SlotsRow>
            {visibleDays.map((date) => {
              const dayKey = date.toISOString().split('T')[0];
              const daySlots = slotsByDay.get(dayKey) || [];

              return (
                <DayColumn key={dayKey}>
                  {daySlots.map((slotInfo) => {
                    const isSelected = selectedSlot?.day === dayKey && selectedSlot?.time === slotInfo.time;
                    return (
                      <TimeSlot
                        key={slotInfo.time}
                        available={slotInfo.available}
                        selected={isSelected}
                        onClick={() => {
                          if (!slotInfo.available) return;
                          const isSame = isSelected;
                          if (isSame) {
                            // unselect
                            setSelectedSlot(null);
                            if (typeof onSlotSelect === 'function') onSlotSelect(null);
                          } else {
                            // set local state
                            const newSlot = { day: dayKey, time: slotInfo.time, iso: slotInfo.iso };
                            setSelectedSlot(newSlot);
                            // notify parent if provided
                            if (typeof onSlotSelect === 'function') onSlotSelect(newSlot);
                          }
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
      <ArrowButton onClick={() => navigateDays(5)}>&gt;</ArrowButton>
    </ScheduleWrapper>
  );
};

export default ScheduleComponent;