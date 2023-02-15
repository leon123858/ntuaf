import React from 'react';
// import style from './Home.module.css';
import { Card } from 'antd';

const Video = (url) => {
	return (
		<>
			<div style={{ textAlign: 'center', width: 560, marginBottom: 20 }}>回顧片</div>
			<Card style={{ width: 560, marginBottom: 20 }}>
				<p>Card content</p>
			</Card>
			<iframe
				width="560"
				height="315"
				src="https://www.youtube.com/embed/YI88ca_jzSs"
				title="YouTube video player"
				frameborder="1"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen 
			/>
		</>
	);
}


export default Video;