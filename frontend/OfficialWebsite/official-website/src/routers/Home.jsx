import React, { useState } from 'react';
import './Home.css';
import Header from '../components/Header/Header';

function Home() {
	const [current, setCurrent] = useState('mail');
	const onClick = (e) => {
		console.log('click ', e);
		setCurrent(e.key);
	};
	return (
		<>
			<Header current={current} onClick={onClick} />
			<div className='App'>
				<header className='App-header'>
					<img src={'/logo.svg'} className='App-logo' alt='logo' />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<a
						className='App-link'
						href='https://reactjs.org'
						target='_blank'
						rel='noopener noreferrer'
					>
						Learn React
					</a>
				</header>
			</div>
		</>
	);
}

export default Home;
