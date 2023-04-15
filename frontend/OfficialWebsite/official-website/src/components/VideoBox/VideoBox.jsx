import React, { useContext } from 'react';
import style from './VideoBox.module.css';
import { BreakPointContext } from '../../useBreakPoint';

const Video = ({ url, text, title }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	function insertAtIndex(str, substring, index) {
		return str.slice(0, index) + substring + str.slice(index);
	}

	url = 'https://www.youtube.com/jyRCXdu7W-0';
	const str = 'https://www.youtube.com/';
	const video = insertAtIndex(url, 'embed/', str.length);
	// console.log("url after changed =",video);
	return (
		<div className={style.container}>
			<p className={style.title}>{title}</p>
			<div className={style.content}>
				{text.split('\n').map((str, idx) => {
					return (str === '') ? <span>&nbsp;</span> : <p key={idx}>{str}</p>
				})}
			</div>
			<iframe
				height={(inBreakPoint) ? Math.min(window.screen.width / 2, 400) : 450}
				src={video}
				title='YouTube video player'
				allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
				allowFullScreen
				style={{ width: '100%' }}
			/>
		</div>
	);
};

export default Video;
