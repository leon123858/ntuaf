import React from 'react';
import style from './TextBox.module.css';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'

const TextBox = ({ text }) => {

    return (
        
        {
            [BlOCK_TYPE.TEXT_A]: (
                <div className={style.container}>
                    <h1 className={`${style.topic} ${style.one}`}>{text.topic}</h1>
                    <p className={style.content} style={{ paddingTop: '22px' }}>{text.content}</p>
                </div>

            ),

            [BlOCK_TYPE.TEXT_B]: (
                <div className={style.container} style={{ margin: '32px auto' }}>
                    <h1 className={`${style.topic} ${style.two}`}>{text.topic}</h1>
                    <p className={style.content}>{text.content}</p>
                </div>
            ),

            [BlOCK_TYPE.TEXT_C]: (
                <div className={style.container}>
                    <h1 className={`${style.topic} ${style.three}`}>{text.topic}</h1>
                    <p className={style.content}>{text.content}</p>
                </div>
            ),

            [BlOCK_TYPE.TEXT_D]: (
                <div className={style.container}>
                    <p className={style.content}>{text.content}</p>
                </div>
            )

        }[text.type]
    );
};
export default TextBox;

