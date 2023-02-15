import React from 'react';
import style from './Home.module.css';
import HomeCalendar from '../components/HomeCalendar/HomeCalendar';

function Home() {
	return (
		<>
			<div className={style.APP}>
				<Carousel />
			</div>
		</>
	);
}

export default Home;
