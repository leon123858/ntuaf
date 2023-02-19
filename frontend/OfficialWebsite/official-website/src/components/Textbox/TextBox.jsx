import React from 'react';
import style from './TextBox.module.css';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'

const TextBox = ({ text }) => {

    return (

        {
            [BlOCK_TYPE.TEXT_A]: (
                <div className={style.container}>
                    <h1 className={`${style.topic} ${style.one}`}>{text.url}</h1>
                    <div className={style.content} style={{ paddingTop: '22px' }}>
                        {text.text.split('\n').map((str, idx) => (
                            <p key={idx}>{str}</p>
                        ))}
                    </div>

                </div>

            ),

            [BlOCK_TYPE.TEXT_B]: (
                <div className={style.container} style={{ margin: '32px auto' }}>
                    <h1 className={`${style.topic} ${style.two}`}>{text.title}</h1>
                    <p className={style.content}>{text.text}</p>
                </div>
            ),

            [BlOCK_TYPE.TEXT_C]: (
                <div className={style.container}>
                    <h1 className={`${style.topic} ${style.three}`}>{text.title}</h1>
                    <p className={style.content}>{text.text}</p>
                </div>
            ),

            [BlOCK_TYPE.TEXT_D]: (
                <div className={style.container} style={{ margin: '48px auto' }}>
                    <p className={style.content}>{text.text}</p>
                </div>
            )

        }[text.type]
    );
};
export default TextBox;

