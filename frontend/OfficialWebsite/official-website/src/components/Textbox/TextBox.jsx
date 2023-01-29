import React from 'react';
import style from './TextBox.module.css';

const defaultText = {
    type: 4,
    topic: '零',
    content: '「從前從前...有一個...」、「好久好久以前...」、「在七座山七條河以外...」早在公元前兩千多年前，人類就已使用楔型文字記錄下第一個故事《吉爾伽美什史詩》。一個不可考的時空、一個主角、一個轉折，加上追求動機，過程中還會有幫助者與阻礙者，將所有元素連接起來，就成為一個關於蛻變和轉變的故事。這時候如果再摻有一些神秘和魔法元素，就能更增添奇幻色彩，它能勾起我們天馬行空的想像。'
}

const TextBox = ({ text = defaultText }) => {

    return (
        {
            1: (
                <div className={style.container}>
                    <h1 className={`${style.topic} ${style.one}`}>{text.topic}</h1>
                    <p className={style.content} style={{ paddingTop: '22px' }}>{text.content}</p>
                </div>

            ),

            2: (
                <div className={style.container} style={{ margin: '32px auto' }}>
                    <h1 className={`${style.topic} ${style.two}`}>{text.topic}</h1>
                    <p className={style.content}>{text.content}</p>
                </div>
            ),

            3: (
                <div className={style.container}>
                    <h1 className={`${style.topic} ${style.three}`}>{text.topic}</h1>
                    <p className={style.content}>{text.content}</p>
                </div>
            ),

            4: (
                <div className={style.container}>
                    <p className={style.content}>{text.content}</p>
                </div>
            )

        }[text.type]
    );
};
export default TextBox;

