import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { DayPickerSingleDateController } from 'react-dates';
import DayScheduleCard from './DayScheduleCard';
import 'react-dates/initialize';
import style from './HomeCalendar.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { getDayEvents as getDbDayEvents } from '@leon123858/ntuaf-sdk';

const HomeCalendar = () => {
	const startDate = moment('05-04-2023', 'MM-DD-YYYY');
	const [date, setDate] = useState(startDate);
	const [focused, setFocused] = useState(true);
	const [dayEvents, setDayEvents] = useState({
		month: date.month() + 1,
		date: date.date(),
		data: { activity: [], exhibition: [] },
	});
	const { inBreakPoint } = useContext(BreakPointContext);

	useEffect(() => {
		(async function () {
			const result = await getDbDayEvents(date.month() + 1, date.date());

			if (result) {
				setDayEvents({
					month: date.month() + 1,
					date: date.date(),
					data: {
						...result,
					},
				});
				return;
			}
			setDayEvents(
				{
					month: date.month() + 1,
					date: date.date(),
					data: { activity: [], exhibition: [] },
				}()
			);
		})();
	}, [date]);

	const onDateChange = async (currentDate) => setDate(currentDate);
	const onFocusChange = () => setFocused(true);

	return (
		<div
			className={
				inBreakPoint
					? style.container
					: `${style.container} ${style.lgContainer}`
			}
		>
			<DayPickerSingleDateController
				date={date}
				focused={focused}
				onDateChange={onDateChange}
				onFocusChange={onFocusChange}
				initialVisibleMonth={() => startDate}
				// isDayHighlighted={(day) => {
				// 	if (
				// 		events.some(
				// 			(e) => e.date === day.date() && e.month === day.month() + 1
				// 		)
				// 	) {
				// 		return date.month() !== day.month() || date.date() !== day.date();
				// 	}
				// }}
				renderDayContents={(day) => {
					if (day.date() <= 20 && day.date() >= 5 && day.month() + 1 === 5) {
						return <span style={{ fontWeight: 700 }}>{day.date()}</span>;
					} else return day.date();
				}}
				isDayBlocked={(day) => day.month() !== 4 && day.month() !== 3}
				hideKeyboardShortcutsPanel={true}
			/>
			<DayScheduleCard data={dayEvents} />
		</div>
	);
};
export default HomeCalendar;
