// import React from 'react';
// import style from './Home.module.css';
import ArtBox from "../components/ArtBox/artBox";
import Carousel from '../components/Carousel/Carousel'


function About() {
	return (
		<>
			<ArtBox artName = "露娜" artist="諾克提斯" arturl = "https://wallpapercrafter.com/sizes/2048x1152/120189-Final-Fantasy-XV-video-games-Luna-Final-Fantasy-XV-Final-Fantasy.png"
			height ="10px" width = "30px" imageWidth = "300"
			/>
			{/* <Carousel/> */}
			{/* <div className={style.APP}>
				<header className={style['App-header']}>
					<img src={'/logo.svg'} className={style['App-logo']} alt='logo' />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className={style['App-link']}
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
					>
						Learn React
					</a>
				</header>
			</div> */}
		</>
	);
}

export default About;
