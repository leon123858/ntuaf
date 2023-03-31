import React, { useContext } from 'react';
import style from './Map.module.css';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk';
import { BreakPointContext } from '../../useBreakPoint';

const Map = ({ type, url, text }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	return {
		[BlOCK_TYPE.MAP_A]: (
			<div className={style.container}>
				<h1 className={`${style.topic} ${style.three}`}>{'活動資訊'}</h1>
				<div className={style.content}>
					<div className={style.content} style={{ textAlign: 'left' }}>
						{text.split('\n').map((str, idx) => (
							<p key={idx}>{str}</p>
						))}
					</div>
					<hr style={{ margin: '20px 0' }} />
					<div className={style.content} style={{ textAlign: 'left' }}>
						{url.split('\n').map((str, idx) => (
							<p key={idx}>{str}</p>
						))}
					</div>
					{/* <Button
						style={{ marginTop: 16, backgroundColor: 'grey', color: 'white' }}
					>
						活動位置
					</Button> */}
				</div>
			</div>
		),
		[BlOCK_TYPE.MAP_B]: (
			<div style={{ textAlign: 'center' }} className={style.container}>
				<iframe
					width='100%'
					height={(inBreakPoint) ? 300 : 400}
					src={url}
					title='video'
				>
					<a href='https://www.maps.ie/distance-area-calculator.html'>
						measure area map
					</a>
				</iframe>
			</div>
		),
	}[type];
};

export default Map;
