import React from 'react';
import MemberTab from '../components/MemberTab/MemberTab';
import Murmur from '../components/Murmur/Murmur';
import Sponsor from '../components/Sponsor/Sponsor';
import AboutBackground from '../components/AboutBackground/AboutBackground';
// import AboutBackground from '../components/AboutBackground/AboutBackground';

function About() {
	return (
		<div>
			<AboutBackground />
			<Murmur />
			<MemberTab />
			<Sponsor />
		</div>
	);
}

export default About;
