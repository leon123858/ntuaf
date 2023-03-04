import React from 'react';
import style from './Map.module.css';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'
import { Button } from 'antd';


const Map = ({ type, url, text }) => {
	return (
		{
			[BlOCK_TYPE.MAP_A]: (
				<div className={style.container}>
					<h1 className={`${style.topic} ${style.three}`}>{'活動資訊'}</h1>
					<div className={style.content}>
						<p>{text}</p>
						<Button style={{ marginTop: 16, backgroundColor: 'grey', color: 'white' }}>活動位置</Button>
					</div>
				</div>
			),
			[BlOCK_TYPE.MAP_B]: (
				<div style={{ textAlign: 'center' }}>
					<div style={{ width: '80%', margin: '0 auto' }}>
						<iframe width="100%" height="600" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
							<a href="https://www.maps.ie/distance-area-calculator.html">
								measure area map
							</a>
						</iframe>
					</div>
				</div>
			)
		}[type]
	);
}


export default Map;