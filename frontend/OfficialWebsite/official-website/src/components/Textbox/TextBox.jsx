import React, { useContext } from 'react';
import style from './TextBox.module.css';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'
import { BreakPointContext } from '../../useBreakPoint';

const TextBox = ({ text }) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    return (

        {
            [BlOCK_TYPE.TEXT_A]: (
                <div>
                    {(text.title)
                        ? (
                            <div className={style.container}>
                                <h2 style={{ fontSize: 20, paddingTop: 40 }}>{text.title}</h2>
                            </div>
                        )
                        : ''
                    }

                    <div className={style.container} style={(text.title) ? { paddingLeft: 20, marginTop: 44, paddingRight: 20 } : { paddingLeft: 20, marginTop: 32, paddingRight: 20 }}>

                        <h1 className={style.one}>{text.url}</h1>
                        <div className={style.content} style={(text.title) ? { marginTop: 24 } : {}}>
                            {text.text.split('\n').map((str, idx) => {
                                return (str === '') ? <span>&nbsp;</span> : <p key={idx}>{str}</p>
                            })}
                        </div>

                    </div>
                </div>
            ),

            [BlOCK_TYPE.TEXT_B]: (
                <div className={style.container} style={(text.title) ? { margin: '32px auto', backgroundColor: 'transparent' } : { margin: '-32px auto 32px auto' }}>
                    {
                        (text.title)
                            ? (
                                <h1 className={style.two}>{text.title}</h1>
                            )
                            : ''
                    }

                    <div className={style.content} style={(text.title) ? { marginTop: 24, backgroundColor: 'transparent' } : { backgroundColor: 'transparent' }}>
                        {text.text.split('\n').map((str, idx) => {
                            return (str === '') ? <span>&nbsp;</span> : <p key={idx}>{str}</p>
                        })}
                    </div>
                </div>
            ),

            [BlOCK_TYPE.TEXT_C]: (
                <div className={style.container} style={{ marginTop: 120 }}>
                    <h1 className={style.three}>{text.title}</h1>
                    <div className={style.content}>
                        {text.text.split('\n').map((str, idx) => {
                            return (str === '') ? <span>&nbsp;</span> : <p key={idx}>{str}</p>
                        })}
                    </div>
                </div>
            ),

            [BlOCK_TYPE.TEXT_D]: (
                <div style={(inBreakPoint) ? { padding: '40px 0' } : { display: 'flex', alignItems: 'center', padding: '40px 0' }} className={style.container}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={text.url} alt="" style={{ width: 140, marginRight: '30px' }} />
                    </div>

                    <div className={style.content} style={{ backgroundColor: 'transparent' }}>
                        {text.text.split('\n').map((str, idx) => {
                            return (str === '') ? <span>&nbsp;</span> : <p key={idx}>{str}</p>
                        })}
                    </div>
                </div>
            )

        }[text.type]
    );
};
export default TextBox;

