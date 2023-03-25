import React from 'react';
import style from './VideoBox.module.css';
import { Card } from 'antd';

const Video = ({url, text}) => {
	console.log("url =",url);
	function insertAtIndex(str, substring, index) {
		return str.slice(0, index) + substring + str.slice(index);
	}
	
	url = "https://www.youtube.com/jyRCXdu7W-0"
	const str = "https://www.youtube.com/";
	const video = insertAtIndex(url, "embed/", str.length);
	console.log("url after changed =",video);
	return (
		<div className={style.container}>
			<h1 style={{ marginBottom: 20 }}>回顧片</h1>
			<Card style={{ marginBottom: 20 }}>
				<p>{text}</p>
			</Card>
			<iframe
				height="300"
				src={video}
				title="YouTube video player"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
				allowFullScreen
				style={{ width: '100%' }} 
			/>
		</div>
	);
}


export default Video;
