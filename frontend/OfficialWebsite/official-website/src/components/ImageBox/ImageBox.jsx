import React, { useContext } from 'react';
import style from './ImageBox.module.css';
import 'react-slideshow-image/dist/styles.css'

import { BreakPointContext } from '../../useBreakPoint';
import { Card, Image } from 'antd';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'

const ImageBox = ({ image }) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    return (
        {
            [BlOCK_TYPE.IMAGE_A]: (
                <div className={style.container} style={{ margin: '32px auto' }}>
                    <h1 className={`${style.topic} ${style.three}`}>{image?.text}</h1>
                    <div className={style.content}>
                        <Image
                        alt='img'
                        src={image.url}
                    />
                    </div>
                </div>
            ),
            
            [BlOCK_TYPE.IMAGE_B]: (
                <div className={style.container} style={{ textAlign: 'center' }}>
                    <Image
                        alt='img'
                        src={image.url}
                    />
                </div>
            )

        }[image.type]
    );
};
export default ImageBox;
