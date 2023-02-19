import React from 'react';
import style from './VideoBox.module.css';
import { Card } from 'antd';

const Video = ({url, text}) => {

	return (
		<div className={style.container}>
			<h1 style={{ marginBottom: 20 }}>回顧片</h1>
			<Card style={{ marginBottom: 20 }}>
				<p>{text}</p>
			</Card>
			<iframe
				height="480"
				src={url}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
				allowFullScreen
				style={{ width: '100%' }} 
			/>
		</div>
	);
}


export default Video;