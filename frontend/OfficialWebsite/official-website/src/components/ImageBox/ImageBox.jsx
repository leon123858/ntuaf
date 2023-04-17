import React from 'react';
import style from './ImageBox.module.css';
import 'react-slideshow-image/dist/styles.css';

import { Image } from 'antd';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk';

const ImageBox = ({ image }) => {
	return {
		[BlOCK_TYPE.IMAGE_A]: (
			<div className={style.container} style={{ marginTop: 80 }}>
				<h1 className={`${style.topic} ${style.three}`}>{image?.text}</h1>
				<div className={style.content}>
					<Image alt='img' src={image.url} fallback='/loading.jpg' />
				</div>
			</div>
		),

		[BlOCK_TYPE.IMAGE_B]: (
			<div className={style.container} style={{ textAlign: 'center' }}>
				<Image alt='img' src={image.url} fallback='/loading.jpg' />
			</div>
		),
	}[image.type];
};
export default ImageBox;
