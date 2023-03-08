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
	0: <div className={style.dot}></div>,
	1: <div className={style.dot} style={{ background: '#25499D' }}></div>,
	2: <div className={style.dot} style={{ background: '#A9CF59' }}></div>,
	3: <div className={style.dot} style={{ background: 'linear-gradient(90deg, #AAC952 22.22%, #25499D 100%)' }}></div>,
	4: <div className={style.dot} style={{ background: '#D7497C' }}></div>,
	5: <div className={style.dot} style={{ background: 'linear-gradient(90deg, #DD0E65 11.11%, #25499D 100%)' }}></div>,
	6: <div className={style.dot} style={{ background: 'inear-gradient(90deg, #AAC952 27.78%, #DD0E65 111.11%)' }}></div>,
	7: <div className={style.dot} style={{ background: 'conic-gradient(from 185.19deg at 50% 50%, #AAC952 -35.66deg, #AAC952 0.59deg, #AAC952 34.29deg, #25499D 86.18deg, #25499D 121.94deg, #25499D 153.61deg, #DD0E65 220.2deg, #DD0E65 246.82deg, #DD0E65 274.61deg, #DD0E65 279.01deg, #AAC952 324.34deg, #AAC952 360.59deg)' }}></div>,
};

const getDayHighlightType = (day, monthType) => {
	if (day.month() !== 3 && day.month() !== 4) {
		return HIGHT_LIGHT_TYPE.不用點;
	}
	const tmpArr = monthType[day.month() + 1][`${day.month() + 1}_${day.date()}`];
	if (tmpArr) {
		return tmpArr[0] + (tmpArr[1] << 1) + (tmpArr[2] << 2);
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
		<>
			<div
				className={
					inBreakPoint
						? style.container
						: `${style.container} ${style.lgContainer}`
				}
			>
				<div>
					<DayPickerSingleDateController
						date={date}
						focused={focused}
						onDateChange={onDateChange}
						onFocusChange={onFocusChange}
						initialVisibleMonth={() => startDate}
						renderDayContents={(day) => {
							return <DayWithHighlightDot day={day} monthType={monthType} />;
						}}
						isDayBlocked={(day) => day.month() !== 4 && day.month() !== 3}
						hideKeyboardShortcutsPanel={true}
					/>

					<div style={(inBreakPoint) ? { display: 'flex', marginTop: '12px' } : { display: 'grid', marginTop: '12px' }}>
						<div style={{marginRight: 20, fontSize: 12}}>
							<div className={style.lgDot} style={{ background: '#25499D' }}></div>
							<span>一般活動</span>
						</div>
						<div style={{marginRight: 20, fontSize: 12}}>
							<div className={style.lgDot} style={{ background: '#A9CF59' }}></div>
							<span>講座 / 工作坊</span>
						</div>
						<div style={{marginRight: 20, fontSize: 12}}>
							<div className={style.lgDot} style={{ background: '#D7497C' }}></div>
							<span>常設展覽</span>
						</div>
					</div>
				</div>


				<DayScheduleCard data={dayEvents} />


			</div>
		</>

	);
};
export default HomeCalendar;
