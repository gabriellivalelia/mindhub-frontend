import React, { useState, useMemo } from 'react';
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

// Helper: generate hourly slots (05:00 - 23:00) for a date
const generateDaySlots = (date) => {
	const slots = [];
	for (let hour = 5; hour <= 23; hour++) {
		const d = new Date(date);
		d.setHours(hour, 0, 0, 0);
		slots.push({ date: d.toISOString(), available: true });
	}
	return slots;
};

const groupSlotsByDay = (slots) => {
	const grouped = new Map();
	if (!slots) return grouped;

	slots.forEach((slot) => {
		const date = new Date(slot.date);
		const dayKey = date.toISOString().split('T')[0];
		const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });

		if (!grouped.has(dayKey)) grouped.set(dayKey, []);
		grouped.get(dayKey).push({ time, available: slot.available, iso: slot.date });
	});

	grouped.forEach((times) => times.sort((a, b) => a.time.localeCompare(b.time)));
	return grouped;
};

const AddAvailabilitiesComponent = ({ daysVisible = 5, onSelectionChange }) => {
	const [displayDate, setDisplayDate] = useState(new Date());
	// store selected slots as a Set of ISO strings for easy toggle
	const [selectedSet, setSelectedSet] = useState(new Set());

	const visibleDays = useMemo(() => {
		return Array.from({ length: daysVisible }).map((_, i) => {
			const date = new Date(displayDate);
			date.setDate(date.getDate() + i);
			date.setHours(0, 0, 0, 0);
			return date;
		});
	}, [displayDate, daysVisible]);

	// generate allSlots for visibleDays
	const allSlots = useMemo(() => {
		const arr = [];
		visibleDays.forEach((d) => {
			const daySlots = generateDaySlots(d);
			daySlots.forEach((s) => arr.push(s));
		});
		return arr;
	}, [visibleDays]);

	const slotsByDay = useMemo(() => groupSlotsByDay(allSlots), [allSlots]);

	const navigateDays = (amount) => {
		setDisplayDate((current) => {
			const newDate = new Date(current);
			newDate.setDate(newDate.getDate() + amount);
			return newDate;
		});
	};

		const toggleSlot = (iso) => {
		setSelectedSet((prev) => {
			const next = new Set(prev);
			if (next.has(iso)) next.delete(iso);
			else next.add(iso);

			// notify parent with an array of selected slot objects
			if (typeof onSelectionChange === 'function') {
				const selectedArray = Array.from(next).map((sIso) => {
					const d = new Date(sIso);
					return { iso: sIso, day: d.toISOString().split('T')[0], time: d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }) };
				});
				onSelectionChange(selectedArray);
			}

			return next;
		});
	};

	return (
		<ScheduleWrapper>
			<ArrowButton onClick={() => navigateDays(-daysVisible)}>&lt;</ArrowButton>
			<ScheduleGrid>
				<HeaderRow>
					{visibleDays.map((date) => (
						<DayHeader key={date.toISOString()}>
							<DayName>{date.toLocaleString('pt-BR', { weekday: 'short' }).replace('.', '')}</DayName>
							<DayNumber>{date.toLocaleString('pt-BR', { day: 'numeric', month: 'short' }).replace(' de ', ' ')}</DayNumber>
						</DayHeader>
					))}
				</HeaderRow>

				<SlotsRowContainer>
					<SlotsRow>
						{visibleDays.map((date) => {
							const dayKey = date.toISOString().split('T')[0];
							const daySlots = slotsByDay.get(dayKey) || [];

							return (
								<DayColumn key={dayKey}>
									{daySlots.map((slotInfo) => {
										const isSelected = selectedSet.has(slotInfo.iso);
										return (
											<TimeSlot
												key={slotInfo.time}
												available={slotInfo.available}
												selected={isSelected}
												onClick={() => {
													if (!slotInfo.available) return;
													toggleSlot(slotInfo.iso, dayKey, slotInfo.time);
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
			<ArrowButton onClick={() => navigateDays(daysVisible)}>&gt;</ArrowButton>
		</ScheduleWrapper>
	);
};

export default AddAvailabilitiesComponent;
