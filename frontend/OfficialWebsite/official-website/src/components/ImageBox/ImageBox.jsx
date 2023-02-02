import React, { useContext } from 'react';
import style from './ImageBox.module.css';
import 'react-slideshow-image/dist/styles.css'

import { BreakPointContext } from '../../useBreakPoint';
import { Card, Image } from 'antd';
import { Slide } from 'react-slideshow-image';

const defaultImages = {
    type: 3,
    images: [
        {
            src: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ',
            content: '「從前從前...有一個...」、「好久好久以前...」、「在七座山七條河以外...」早在公元前兩千多年前，人類就已使用楔型文字記錄下第一個故事《吉爾伽美什史詩》。一個不可考的時空、一個主角、一個轉折，加上追求動機，過程中還會有幫助者與阻礙者，將所有元素連接起來'
        },
        {
            src: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ',
            content: '「從前從前...有一個...」、「好久好久以前...」、「在七座山七條河以外...」早在公元前兩千多年前，人類就已使用楔型文字記錄下第一個故事《吉爾伽美什史詩》。一個不可考的時空、一個主角、一個轉折，加上追求動機，過程中還會有幫助者與阻礙者，將所有元素連接起來'
        },
        {
            src: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ',
            content: '「從前從前...有一個...」、「好久好久以前...」、「在七座山七條河以外...」早在公元前兩千多年前，人類就已使用楔型文字記錄下第一個故事《吉爾伽美什史詩》。一個不可考的時空、一個主角、一個轉折，加上追求動機，過程中還會有幫助者與阻礙者，將所有元素連接起來'
        },
        {
            src: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ',
            content: '「從前從前...有一個...」、「好久好久以前...」、「在七座山七條河以外...」早在公元前兩千多年前，人類就已使用楔型文字記錄下第一個故事《吉爾伽美什史詩》。一個不可考的時空、一個主角、一個轉折，加上追求動機，過程中還會有幫助者與阻礙者，將所有元素連接起來'
        },
    ]
}

const ImageBox = ({ images = defaultImages }) => {
    const { inBreakPoint } = useContext(BreakPointContext);

    return (
        {
            1: (
                <div className={style.container}>
                    <div className={(inBreakPoint) ? style.picBox : style.lgPicBox}>
                        {
                            images.images.map((image, idx) => (
                                <div key={idx}>
                                    <Card
                                        style={{
                                            borderColor: 'black',
                                        }}
                                    >
                                        <img
                                            alt='img' src={image.src}
                                            className={(inBreakPoint) ? style.img : style.lgImg}
                                        />
                                        {image.content}
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                </div>

            ),

            2: (
                <div className={style.container}>
                    <div style={{ width: '65%', margin: '0 auto', minWidth: 400 }}>
                        <Slide
                            indicators={true}
                            transitionDuration={300}
                            autoplay={false}
                        >
                            {
                                images.images.map((image, idx) => (
                                    <div className={style.slide} key={idx}>
                                        <img src={image.src} alt="" style={{ height: 300 }} />
                                    </div>
                                ))
                            }
                        </Slide>
                    </div>
                </div>
            ),

            3: (
                <div className={style.container} style={{ textAlign: 'center' }}>
                    <Image
                        alt='img'
                        src={images.images[0].src}
                    />
                </div>
            )

        }[images.type]
    );
};
export default ImageBox;

