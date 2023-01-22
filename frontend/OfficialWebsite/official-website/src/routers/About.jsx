import React from 'react';
// import style from './Home.module.css';
import ArtBox from '../components/artBox/artBox.jsx'
// import Video from '../components/VideoBox/videoBox.jsx';
import Map from '../components/Map/Map.jsx';

function About() {
	return (
		<>
			<ArtBox></ArtBox>
			<Map></Map>
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
