import React from 'react';
import style from './Home.module.css';
import Carousel from '../components/Carousel/Carousel';
import FourCircle from '../components/FourCircle/FourCircle';


function Home() {
	return (
			<div className={style.APP}>
				<FourCircle />
				<Carousel />
			</div>
	);
}

export default Home;
