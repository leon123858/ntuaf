import React, { useState } from 'react';
import moment from 'moment'
import { DayPickerSingleDateController } from "react-dates";
import DayScheduleCard from './DayScheduleCard'
import 'react-dates/initialize';
import style from './HomeCalendar.module.css';

const defaultEvents = [
	{
		month: 5,
		date: 5,
		data: {
			activity: [
				{
					name: '開幕式',
					info: '振興草坪'
				},
			],
			exhibition: [
				{
					name: '莫比烏斯環: 止宿之境',
					info: '振興草坪'
				},
				{
					name: '莫比烏斯環: 止宿之境',
					info: '振興草坪'
				},
				{
					name: '莫比烏斯環: 止宿之境',
					info: '振興草坪'
				}
			]
		}
	},
	{
		month: 5,
		date: 12,
		data: {
			activity: [
				{
					name: '永續主題綠色市集',
					info: '一活 陳文成廣場'
				},
				{
					name: '永續主題綠色市集',
					info: '一活 陳文成廣場'
				},
			],
			exhibition: [
				{
					name: '屠:屠宰場屠:屠宰場屠:屠宰場屠:屠宰場屠:屠宰場屠:屠宰場',
					info: '一活 B1F'
				},
				{
					name: '想開了',
					info: '活大 B1F'
				},
				{
					name: '想開了',
					info: '活大 B1F'
				},
			]
		}
	},
	{
		month: 5,
		date: 13,
		data: {
			activity: [
				{
					name: '永續主題綠色市集',
					info: '一活 陳文成廣場'
				},
			],
			exhibition: []
		}
	},
	{
		month: 5,
		date: 17,
		data: {
			activity: [],
			exhibition: [
				{
					name: 'Labyrinth of Eddy and Eternity in An Hour',
					info: '活大木椅區 (天井)'
				}
			]
		}
	},
	{
		month: 5,
		date: 20,
		data: {
			activity: [
				{
					name: '閉幕式',
					info: '振興草坪'
				}
			],
			exhibition: [
				{
					name: '勾勒_恆動即生',
					info: '振興草坪'
				},
			]
		}
	}
]

const HomeCalendar = ({events = defaultEvents}) => {
	const startDate = moment("05-04-2023", "MM-DD-YYYY");
    const [date, setDate] = useState(startDate);
	const [focused, setFocused] = useState(true);
	
	const onDateChange = (currentDate) => setDate(currentDate);
	const onFocusChange = () => setFocused(true);

	const getDayEvents = () => {
		let result = events.find((event) => event.date === date.date() && event.month === date.month() + 1)
		if (result) return result
		else return {
			month: date.month() + 1, 
			date: date.date(), 
			data:{activity: [], exhibition: []}
		};
	}

	return (
		<div className={style.container}>
			<DayPickerSingleDateController
				date={date}
				focused={focused}
				onDateChange={onDateChange}
				onFocusChange={onFocusChange}

				initialVisibleMonth={() => startDate}
				isDayHighlighted={(day) => {
					if (events.some(e => (e.date === day.date() && e.month === day.month() + 1))) {
						return (date.month() !== day.month() || date.date() !== day.date());
					}
				}}
				renderDayContents={(day) => {
					if (day.date() <= 20 && day.date() >= 5 && day.month() + 1 === 5) {
						return(<span style={{fontWeight: 700}}>{day.date()}</span>);
					}
					else return day.date();
				}}
				isDayBlocked={(day) => (day.month() !== 4 && day.month() !== 3)}
				hideKeyboardShortcutsPanel={true}
			/>
			<DayScheduleCard data={getDayEvents()}/>
		</div>
	);
};
export default HomeCalendar;
