import React from 'react';
import style from './Home.module.css';
import HomeCalendar from '../components/HomeCalendar/HomeCalendar';


function Calendar() {
	return (
		<>
			<div className={style.APP}>
				<HomeCalendar />
			</div>
		</>
	);
}

export default Calendar;
