import React from 'react';
import style from './Map.module.css';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk';
import { Button } from 'antd';

const Map = ({ type, url, text }) => {
	console.log(url);
	return {
		[BlOCK_TYPE.MAP_A]: (
			<div className={style.container}>
				<h1 className={`${style.topic} ${style.three}`}>{'活動資訊'}</h1>
				<div className={style.content}>
					<p>{text}</p>
					<Button
						style={{ marginTop: 16, backgroundColor: 'grey', color: 'white' }}
					>
						活動位置
					</Button>
				</div>
			</div>
		),
		[BlOCK_TYPE.MAP_B]: (
			<div style={{ textAlign: 'center' }}>
				<div style={{ width: '80%', margin: '0 auto' }}>
					<iframe
						width='100%'
						height='200'
						src={url}
					>
						<a href='https://www.maps.ie/distance-area-calculator.html'>
							measure area map
						</a>
					</iframe>
				</div>
			</div>
		),
	}[type];
};

export default Map;
