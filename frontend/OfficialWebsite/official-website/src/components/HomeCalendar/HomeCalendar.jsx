import React, { useState, useContext, useEffect } from 'react';
import moment from 'moment';
import { useLoaderData } from 'react-router-dom';
import { DayPickerSingleDateController } from 'react-dates';
import DayScheduleCard from './DayScheduleCard';
import 'react-dates/initialize';
import style from './HomeCalendar.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { getDayEvents as getDbDayEvents } from '@leon123858/ntuaf-sdk';

const HIGHT_LIGHT_TYPE = {
	不用點: 0,
	藍: 1,
	綠: 2,
	紅: 4,
	藍綠: 3,
	藍紅: 5,
	綠紅: 6,
	藍綠紅: 7,
};
// TODO:這裡的點要是該類別, 可以分 8 種 case
const eachTypeDot = {
	0: <div>{0}</div>,
	1: <div>{1}</div>,
	2: <div>{2}</div>,
	3: <div>{3}</div>,
	4: <div>{4}</div>,
	5: <div>{5}</div>,
	6: <div>{6}</div>,
	7: <div>{7}</div>,
};

const getDayHighlightType = (day, monthType) => {
	if (day.month() !== 3 && day.month() !== 4) {
		return HIGHT_LIGHT_TYPE.不用點;
	}
	if (monthType[day.month() + 1][`${day.month() + 1}_${day.date()}`]) {
		const tmpArr =
			monthType[day.month() + 1][`${day.month() + 1}_${day.date()}`];
		return (tmpArr[0] ? 1 : 0) + (tmpArr[1] ? 2 : 0) + (tmpArr[2] ? 4 : 0);
	}
	return HIGHT_LIGHT_TYPE.不用點;
};

const DayWithHighlightDot = ({ day, monthType }) => {
	const type = getDayHighlightType(day, monthType);
	const isCurrentDate = day.isSame(new Date(), 'day');
	return (
		<>
			<span style={isCurrentDate ? { fontWeight: 700 } : {}}>{day.date()}</span>
			<br />
			{eachTypeDot[type]}
		</>
	);
};

const HomeCalendar = () => {
	const startDate = moment();
	const [date, setDate] = useState(startDate);
	const [focused, setFocused] = useState(true);
	const [dayEvents, setDayEvents] = useState({
		month: date.month() + 1,
		date: date.date(),
		data: { activity: [], exhibition: [] },
	});
	const { inBreakPoint } = useContext(BreakPointContext);
	// 獲取兩個月各日活動分類
	const monthType = useLoaderData();
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
				// }}
				renderDayContents={(day) => {
					return <DayWithHighlightDot day={day} monthType={monthType} />;
				}}
				isDayBlocked={(day) => day.month() !== 4 && day.month() !== 3}
				hideKeyboardShortcutsPanel={true}
			/>
			<DayScheduleCard data={dayEvents} />
		</div>
	);
};
export default HomeCalendar;
