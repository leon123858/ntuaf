import React from 'react';
import style from './Home.module.css';
import Carousel from '../components/Carousel/Carousel';
import FourCircle from '../components/FourCircle/FourCircle';
import DynamicVision from "../components/DynamicVision/DynamicVision"


function Home() {
	return (
			<div className={style.APP}>
				<DynamicVision/>
				<FourCircle />
				<Carousel />
			</div>
	);
}

export default Home;
