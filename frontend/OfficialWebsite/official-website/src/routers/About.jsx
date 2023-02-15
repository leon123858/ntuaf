import React from 'react';
import style from './Home.module.css';
import MemberTab from '../components/MemberTab/MemberTab'

function About() {
	return (
		<>
			<div className={style.APP}>
				<MemberTab />
			</div>
		</>
	);
}

export default About;
