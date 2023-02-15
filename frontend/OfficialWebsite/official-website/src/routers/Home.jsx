import React from 'react';
import style from './Home.module.css';
import Carousel from '../components/Carousel/Carousel'

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
