import React, { useContext }  from 'react';
import style from './ImageBox.module.css';
import { BreakPointContext } from '../../useBreakPoint';
import { Card } from 'antd';

const defaultImage = {
    type: 1,
    topic: '講者介紹',
    src: 'https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ',
    content: '「從前從前...有一個...」、「好久好久以前...」、「在七座山七條河以外...」早在公元前兩千多年前，人類就已使用楔型文字記錄下第一個故事《吉爾伽美什史詩》。一個不可考的時空、一個主角、一個轉折，加上追求動機，過程中還會有幫助者與阻礙者，將所有元素連接起來'
}

const ImageBox = ({ image = defaultImage }) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    return (
        {
            1 : (
                <div className={style.container}>
                    <h1 className={style.topic}>{image.topic}</h1>
                    <div className={(inBreakPoint) ? '' : style.lgDisplay}>
                        <img alt='img' src={image.src} className={(inBreakPoint) ? style.img : style.lgImg}></img>
                        <Card>
                            {image.content}
                        </Card>
                    </div>
                    
                </div>
            ),

            2 : (
                <div className={style.container}>
                    <h1 className={style.topic}>{image.topic}</h1>
                    <p className={style.content}>{image.content}</p>
                </div>
            ),

            3 : (
                <div className={style.container}>
                    <h1 className={style.topic}>{image.topic}</h1>
                    <p className={style.content}>{image.content}</p>
                </div>
            )

        }[image.type]
    );
};
export default ImageBox;

