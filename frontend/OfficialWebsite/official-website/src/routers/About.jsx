import React from 'react';
import style from './Home.module.css';
import MemberTab from '../components/MemberTab/MemberTab'
import DynamicVision from "../components/DynamicVision/DynamicVision"
import Murmur from "../components/Murmur/Murmur"
import Sponsor from "../components/Sponsor/Sponsor"

function About() {
	return (
			<div className={style.APP}>
				<Murmur/>
				<DynamicVision/>
				<MemberTab />
				<Sponsor/>
			</div>
	);
}

export default About;
