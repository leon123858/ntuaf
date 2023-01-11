import React from 'react';
import style from './Home.module.css';
import ImageList from '../components/ImageList/ImageList';

function Home() {
	return (
		<>
			<div className={style.APP}>
				{/* <header className={style['App-header']}>
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
				</header> */}
				<ImageList />
			</div>
		</>
	);
}

export default Home;
