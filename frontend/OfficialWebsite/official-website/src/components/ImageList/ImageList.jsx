import React, { useContext, useState } from 'react';
import style from './ImageList.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'
import Card from 'antd/es/card/Card';
import { Slider, Image } from 'antd'
import TextBox from '../Textbox/TextBox';

const ImageList = ({ data }) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    const [curPic, setCurPic] = useState(0);
    return ({
        [BlOCK_TYPE.IMAGE_LIST_A]: (
            <div className={style.container}>
                <p className={style.topic}>{data.topic}</p>
                <div className={style.lgImgList}>
                    {data.items.map((image, idx) => (
                        <div className={style.lgImgContainer} key={idx}>
                            <Image src={image.url} width='95%' style={{ borderRadius: 10 }} />
                        </div>
                    ))}
                </div>
            </div>
        ),
        [BlOCK_TYPE.IMAGE_LIST_B]: (
            <div className={style.container}>
                <div className={style.picBox2}>
                    <Image src={data.items[curPic].url} width='50%'></Image>
                    <div style={{ width: '60%', margin: '0 auto' }}>
                        <Slider
                            min={1}
                            max={data.items.length}
                            onChange={(e) => setCurPic(e - 1)}
                        />
                    </div>

                </div>
            </div>
        ),
        [BlOCK_TYPE.IMAGE_LIST_C]: (
            <div className={style.container}>
                <p className={style.topic}>{data.title}</p>
                <div>
                    {
                        data.items.map((image, idx) => (
                            <div key={idx} className={style.smpicbox}>
                                {
                                    (image.url) ?
                                        (
                                            <div className={style.picBox}>
                                                <Image
                                                    alt='img'
                                                    src={image.url}
                                                    width={'100%'}
                                                    style={{ borderRadius: '50%' }}
                                                />
                                            </div>

                                        )
                                        : ''
                                }
                                <div>
                                    {
                                        <div key={idx}>
                                            <TextBox
                                                key={idx}
                                                text={{
                                                    type: BlOCK_TYPE.TEXT_A,
                                                    text: image.name,
                                                    // url: image.url,
                                                }}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        ),
        [BlOCK_TYPE.IMAGE_LIST_D]: (
            <div className={style.container}>
                <p className={style.topic}>{data.topic}</p>

                <div className={(inBreakPoint) ? style.imgList2 : style.lgImgList2}>
                    {data.items.map((image, idx) =>
                        <div className={style.imgContainer2} key={idx}>
                            <Image src={image.url} width='75%' style={{ borderRadius: 10 }} />
                            <p className={style.imgName2}>
                                {image.name}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        ),
        [BlOCK_TYPE.IMAGE_LIST_E]: (
            <div className={style.container}>
                <p className={style.topic}>{data.topic}</p>
                <div>
                    {
                        data.items.map((image, idx) => (
                            <div key={idx} style={(idx % 2 === 0) ? { maxWidth: '70%', textAlign: 'left' } : { marginLeft: '30%', textAlign: 'left', maxWidth: '70%' }}>
                                <TextBox
                                    key={idx}
                                    text={{
                                        type: BlOCK_TYPE.TEXT_A,
                                        text: image.name,
                                        url: image.url,
                                    }}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        )

    }[data.type]
    );
};
export default ImageList;

