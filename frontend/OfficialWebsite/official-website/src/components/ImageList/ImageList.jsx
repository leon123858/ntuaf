import React, { useContext, useState } from 'react';
import style from './ImageList.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'
import { Slide } from 'react-slideshow-image';
import TextBox from '../Textbox/TextBox';
import Card from 'antd/es/card/Card';
import { Slider, Image } from 'antd'

const ImageList = ({ data }) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    const [curPic, setCurPic] = useState(0);

    return ({
        [BlOCK_TYPE.IMAGE_LIST_A]: (
            <div className={style.container}>
                <p className={style.lgTopic}>{data.topic}</p>

                <div className={style.lgImgList}>
                    {data.items.map((image, idx) => (
                        <div className={style.lgImgContainer} key={idx}>
                            <img alt='team img' src={image.url} className={style.lgImg} />
                        </div>
                    ))}
                </div>
            </div>
        ),
        [BlOCK_TYPE.IMAGE_LIST_B]: (
            <div className={style.container}>
                <div className={style.picBox2}>
                    <Image src={data.items[curPic].url}></Image>
                    <Slider
                        min={1}
                        max={data.items.length}
                        onChange={(e) => setCurPic(e-1)}
                    />
                </div>
            </div>
        ),
        [BlOCK_TYPE.IMAGE_LIST_C]: (
            <div className={style.container}>
                <p className={style.topic}>{data.url}</p>
                <h1>{data.title}</h1>
                <TextBox
                    text={{
                        type: BlOCK_TYPE.TEXT_C,
                        title: "活動介紹",
                        text: data?.text,
                    }}
                />
                <div className={(inBreakPoint) ? style.picBox1 : style.lgPicBox1}>
                    {
                        data.items.map((image, idx) => (
                            <div key={idx}>
                                <Card
                                    style={{
                                        borderColor: 'black',
                                    }}
                                >
                                    <img
                                        alt='img' src={image.url}
                                        className={style.iimg}
                                    />
                                    {image.name}
                                </Card>
                            </div>
                        ))
                    }
                </div>

            </div>
        ),
        [BlOCK_TYPE.IMAGE_LIST_D]: (
            <div className={style.container}>
                <p className={style.topic}>{data.topic}</p>

                <div className={style.imgList2}>
                    {data.items.map((image, idx) =>
                        <div className={style.imgContainer2} key={idx}>
                            <img alt='team img' src={image.url} className={style.img} />
                            <p className={style.imgName2}>
                                / {image.name}
                            </p>
                        </div>
                    )}
                </div>

            </div>
        ),
        [BlOCK_TYPE.IMAGE_LIST_E]: (
            <div className={style.container}>
                <div className={style.picBox2}>
                    <Slide
                        indicators={true}
                        transitionDuration={300}
                        autoplay={false}
                    >
                        {
                            data.items.map((image, idx) => (
                                <div className={style.slide} key={idx}>
                                    <img src={image.url} alt="" style={{ height: 300 }} />
                                </div>
                            ))
                        }
                    </Slide>
                </div>
            </div>
        )

    }[data.type]
    );
};
export default ImageList;

