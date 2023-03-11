import React from 'react';
import MemberTab from '../components/MemberTab/MemberTab';
import DynamicVision from '../components/DynamicVision/DynamicVision';
import Murmur from '../components/Murmur/Murmur';
import Sponsor from '../components/Sponsor/Sponsor';

function About() {
	return (
		<div>
			<DynamicVision />
			<Murmur />
			<MemberTab />
			<Sponsor />
		</div>
	);
}

export default About;
