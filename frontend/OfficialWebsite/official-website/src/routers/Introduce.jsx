import React from 'react';
import style from './Home.module.css';
import EventList from '../components/EventList/EventList'

function Introduce() {
	return (
		<>
			<div className={style.APP}>
				<EventList />
			</div>
		</>
	);
}

export default Introduce;
