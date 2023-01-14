import React from 'react';
// import style from './Home.module.css';
import {Card,Tag,Image} from 'antd';

const { Meta } = Card;

const Event = () => {
	return(
		<div style={{position: 'relative',top:'-20px', left: '-20px'}}>
			<div style={{position: 'relative'}}>
				<Image alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
				<div style={{position: 'relative', bottom: '25px', left: '0'}}>
					<Tag color="magenta" >工作仿</Tag>
				</div>	
			</div>
		</div>
		
	)
}

function About() {
	return (
		<Card
			hoverable
			style={{ width: 240,position: 'relative' }}
			cover= {<Event/>}
		>
			<Meta title="Europe Street beat" description="www.instagram.com" />
		</Card>
		// <>
		// 	<div className={style.APP}>
		// 		<header className={style['App-header']}>
		// 			<img src={'/logo.svg'} className={style['App-logo']} alt='logo' />
		// 			<p>
		// 				Edit <code>src/App.js</code> and save to reload.
		// 			</p>
		// 			<a
		// 				className={style['App-link']}
		// 				href='https://reactjs.org'
		// 				target='_blank'
		// 				rel='noopener noreferrer'
		// 			>
		// 				Learn React
		// 			</a>
		// 		</header>
		// 	</div>
		// </>

	);
}

export default About;
