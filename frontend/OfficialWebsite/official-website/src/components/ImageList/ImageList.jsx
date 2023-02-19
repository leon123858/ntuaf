import React, { useContext } from 'react';
import style from './ImageList.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'

const ImageList = ({ data }) => {
    const { inBreakPoint } = useContext(BreakPointContext);

    return (
        (inBreakPoint)
            ? (
                <div className={style.container}>
                    <p className={style.topic}>{data.topic}</p>

                    <div className={(data.type === [BlOCK_TYPE.IMAGE_LIST_A]) ? style.imgList : style.imgList2}>
                        {data.images.map((image, idx) => 
                            (data.type === [BlOCK_TYPE.IMAGE_LIST_A])
                                ? (
                                    <div className={style.imgContainer} key={idx}>
                                        <img alt='team img' src={image.src} className={style.img} />
                                        <p className={style.imgName}>
                                            {image.name}
                                        </p>
                                    </div>
                                )
                                : (
                                    <div className={style.imgContainer2} key={idx}>
                                        <img alt='team img' src={image.src} className={style.img} />
                                        <p className={style.imgName2}>
                                            / {image.name}
                                        </p>
                                    </div>
                                )
                        )}
                    </div>

                </div>

            ) :
            (
                <div className={style.container}>
                    <p className={style.lgTopic}>{data.topic}</p>

                    <div className={style.lgImgList}>
                        {data.images.map((image, idx) => (
                            <div className={style.lgImgContainer} key={idx}>
                                <img alt='team img' src={image.src} className={style.lgImg} />
                                <p>{image.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )
    );
};
export default ImageList;

