import React from 'react';
import style from './Map.module.css';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'
import { Button } from 'antd';


const Map = ({ type, url, text }) => {
	return (
		{
			[BlOCK_TYPE.MAP_A]: (
				<div style={{ textAlign: 'center' }}>
					<div style={{ textAlign: 'center', margin: '20px auto', width: 'props.width' }}>藝術家地圖</div>
					<div>
						<iframe loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="myFrame" ></iframe>
					</div>

				</div>
			),
			[BlOCK_TYPE.MAP_B]: (
				<div className={style.container}>
                    <h1 className={`${style.topic} ${style.three}`}>{'活動資訊'}</h1>
                    <div className={style.content}>
						<p>{text}</p>
						<Button style={{ marginTop: 16, backgroundColor: 'grey', color: 'white' }}>活動位置</Button>
					</div>
                </div>
			)
		}[type]
	);
}


export default Map;