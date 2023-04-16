import React from 'react';
import style from './Home.module.css';
import Carousel from '../components/Carousel/Carousel';
import FourCircle from '../components/FourCircle/FourCircle';
import DynamicVision from '../components/DynamicVision/DynamicVision';

function Home() {
	// style={backgroundImage:`url(https://drive.google.com/uc?export=view&id=1tT1puvSuaTYRQEl1J_Fyqxdh_VqvpoyJ)` }
	return (
		<div className={style.APP}>
			<DynamicVision />
			<FourCircle />
			<Carousel />
		</div>
	);
}

export default Home;
