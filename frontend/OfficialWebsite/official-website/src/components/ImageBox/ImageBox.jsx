import React, { useContext } from 'react';
import { BreakPointContext } from '../../useBreakPoint';
import style from './ImageBox.module.css';
import 'react-slideshow-image/dist/styles.css';

import { Image } from 'antd';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk';

const ImageBox = ({ image }) => {
	const { inBreakPoint } = useContext(BreakPointContext);
	return {
		[BlOCK_TYPE.IMAGE_A]: (
			<div className={style.container} style={{ marginTop: 80 }}>
				<h1 className={`${style.topic} ${style.three}`}>{image?.text}</h1>
				<div className={style.content}>
					<Image alt='img' src={image.url} fallback='/loadingStatic.webp' />
				</div>
			</div>
		),

		[BlOCK_TYPE.IMAGE_B]: (
			<div className={style.container} style={(inBreakPoint) ? { textAlign: 'center', marginTop: 0 } : { textAlign: 'center' }}>
				<Image alt='img' src={image.url} fallback='/loadingStatic.webp' />
			</div>
		),
	}[image.type];
};
export default ImageBox;
