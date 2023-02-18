import React from 'react';
import style from './Home.module.css';
import MemberTab from '../components/MemberTab/MemberTab'
import Sponsor from "../components/Sponsor/Sponsor"

function About() {
	return (
			<div className={style.APP}>
				<Sponsor/>
				<MemberTab />
			</div>
	);
}

export default About;
