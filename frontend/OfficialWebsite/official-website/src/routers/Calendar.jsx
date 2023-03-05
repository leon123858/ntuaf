import React from 'react';
import style from './Home.module.css';
import HomeCalendar from '../components/HomeCalendar/HomeCalendar';

function Calendar() {
	return (
		<div>
			<div className={style.APP}>
				<HomeCalendar />
			</div>
		</div>
	);
}

export default Calendar;
