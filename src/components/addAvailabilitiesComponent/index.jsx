import React, { useState, useMemo } from 'react';
import { useEffect } from 'react';
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
	ScrollBar

} from './styles';

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
		const dayKey = date.toLocaleDateString('en-CA'); // yields YYYY-MM-DD in local timezone
		const time = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false });

		if (!grouped.has(dayKey)) grouped.set(dayKey, []);
		grouped.get(dayKey).push({ time, available: slot.available, iso: slot.date });
	});

	grouped.forEach((times) => times.sort((a, b) => a.time.localeCompare(b.time)));
	return grouped;
};


const AddAvailabilitiesComponent = ({ daysVisible = 5, onSelectionChange, initialAvailabilities = [], appointments = [] }) => {
	const [displayDate, setDisplayDate] = useState(new Date());
	const [selectedSet, setSelectedSet] = useState(() => {
		const s = new Set();
		(initialAvailabilities || []).forEach((iso) => s.add(iso));
		(appointments || []).forEach((iso) => s.add(iso));
		return s;
	});

	// Drag selection state
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [dragModeSelect, setDragModeSelect] = useState(true); // true = selecting, false = deselecting

	const appointmentsSet = useMemo(() => new Set(appointments || []), [appointments]);

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
		visibleDays.forEach((d) => {
			const daySlots = generateDaySlots(d);
			daySlots.forEach((s) => arr.push(s));
		});
		return arr;
	}, [visibleDays]);

	const slotsByDay = useMemo(() => groupSlotsByDay(allSlots), [allSlots]);

	useEffect(() => {
		const onUp = () => setIsMouseDown(false);
		window.addEventListener('mouseup', onUp);
		return () => window.removeEventListener('mouseup', onUp);
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
					<ArrowButton onClick={() => navigateDays(-daysVisible)}>&lt;</ArrowButton>
					<ArrowButton onClick={() => navigateDays(daysVisible)}>&gt;</ArrowButton>
				</TopControls>
				<ScheduleGrid>
				<HeaderRow>
					{visibleDays.map((date) => (
						<DayHeader key={date.toLocaleDateString('en-CA')}>
							<DayName>{date.toLocaleString('pt-BR', { weekday: 'short' }).replace('.', '')}</DayName>
							<DayNumber>{date.toLocaleString('pt-BR', { day: 'numeric', month: 'short' }).replace(' de ', ' ')}</DayNumber>
						</DayHeader>
					))}
				</HeaderRow>

				<SlotsRowContainer>
					<SlotsRow>
						{visibleDays.map((date) => {
							const dayKey = date.toLocaleDateString('en-CA');
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
												readonly={appointmentsSet.has(slotInfo.iso)}
												onMouseDown={() => {
													if (!slotInfo.available) return;
													const currentlySelected = selectedSet.has(slotInfo.iso);
													// start drag mode: if currently selected -> we're deselecting, else selecting
													setDragModeSelect(!currentlySelected);
													setIsMouseDown(true);
													// apply the action for this first slot
													setSelectedSet((prev) => {
														const next = new Set(prev);
														if (next.has(slotInfo.iso)) next.delete(slotInfo.iso);
														else next.add(slotInfo.iso);
														if (typeof onSelectionChange === 'function') {
															const selectedArray = Array.from(next).map((sIso) => {
																const d = new Date(sIso);
																return {
																	iso: sIso,
																	day: d.toLocaleDateString('en-CA'),
																	time: d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }),
																	readonly: appointmentsSet.has(sIso),
																};
															});
															onSelectionChange(selectedArray);
														}
														return next;
													});
												}}
												onMouseEnter={() => {
													if (!isMouseDown) return;
													if (!slotInfo.available) return;
													setSelectedSet((prev) => {
														const next = new Set(prev);
														const has = next.has(slotInfo.iso);
														if (dragModeSelect && !has) next.add(slotInfo.iso);
														if (!dragModeSelect && has) next.delete(slotInfo.iso);
														if (typeof onSelectionChange === 'function') {
															const selectedArray = Array.from(next).map((sIso) => {
																const d = new Date(sIso);
																return {
																	iso: sIso,
																	day: d.toLocaleDateString('en-CA'),
																	time: d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }),
																	readonly: appointmentsSet.has(sIso),
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
