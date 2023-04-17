import React, { useContext } from 'react';
import style from './Home.module.css';
import HomeCalendar from '../components/HomeCalendar/HomeCalendar';
import { BreakPointContext } from '../useBreakPoint';

function Calendar() {
	const { inBreakPoint } = useContext(BreakPointContext);
	return (
		<div>
			{inBreakPoint || (
				<>
					<br></br>
					<br></br>
					<br></br>
				</>
			)}
			<div className={style.APP}>
				<HomeCalendar />
			</div>
		</div>
	);
}

export default Calendar;
