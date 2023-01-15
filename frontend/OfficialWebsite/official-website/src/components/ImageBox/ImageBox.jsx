import React, { useContext }  from 'react';
import style from './ImageBox.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { Card, Image } from 'antd';

const defaultImages = {
    type: 3,
    topic: '講者介紹',
    images: [
        {
            src: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ',
            content: '「從前從前...有一個...」、「好久好久以前...」、「在七座山七條河以外...」早在公元前兩千多年前，人類就已使用楔型文字記錄下第一個故事《吉爾伽美什史詩》。一個不可考的時空、一個主角、一個轉折，加上追求動機，過程中還會有幫助者與阻礙者，將所有元素連接起來'
        },
        // {
        //     src: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ',
        //     content: '「從前從前...有一個...」、「好久好久以前...」、「在七座山七條河以外...」早在公元前兩千多年前，人類就已使用楔型文字記錄下第一個故事《吉爾伽美什史詩》。一個不可考的時空、一個主角、一個轉折，加上追求動機，過程中還會有幫助者與阻礙者，將所有元素連接起來'
        // },
    ]
}

const cardStyle = { 
    borderColor: 'black', 
    maxWidth: '80%',
    margin: '0 auto', 
    maxHeight: 225, 
    overflow: 'hidden', 
    textOverflow: 'ellipsis', 
}

const ImageBox = ({ images = defaultImages }) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    return (
        {
            1 : (
                <div className={style.container}>
                    <h1 className={style.topic}>{images.topic}</h1>
                    {
                        images.images.map((image, idx) => (
                            <div className={(inBreakPoint) ? '' : style.lgDisplay} key={idx}>
                                <img 
                                    alt='img' src={image.src} 
                                    className={(inBreakPoint) ? style.img : style.lgImg} 
                                />
                                <Card 
                                    title={(inBreakPoint) ? '' :"xl3el"}
                                    style={cardStyle}
                                    headStyle={{ borderColor: 'black' }}
                                >
                                    {image.content}
                                </Card>
                            </div>
                        ))
                    }
                </div>
            ),

            2 : (
                <div className={style.container}>
                    <h1 className={style.topic}>{images.topic}</h1>
                    <p className={style.content}>{images.content}</p>
                </div>
            ),

            3 : (
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

