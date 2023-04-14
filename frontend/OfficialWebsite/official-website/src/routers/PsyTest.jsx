import React from "react";
import style from './PsyTest.module.css'
import { Button } from "antd";
import { useContext } from "react";
import { BreakPointContext } from "../useBreakPoint";
const PsyTest = () => {
    const {inBreakPoint} = useContext(BreakPointContext)
    return (
        <div className={style.container}>
            <div className={inBreakPoint? style.title: style.lgTitle}>
                請洄答2023——聽見你的聲音
                <div className={style.subtitle}>
                    Reply 2023—Find Your Inner Voice
                </div>
            </div>
            <div className={inBreakPoint? style.words:style.lgWords}>
            「你身處一地名為「洄」的無限空間裡。忽然發現，腳下的倒影映出的是小時候的你正無憂無慮的玩樂著，而頭上的霧團照射出的是未來正忙碌於生活的你，模糊卻又真實⋯⋯」
            </div>
            <button className={inBreakPoint? style.btn:style.lgBtn}>
                <p style={{marginRight: "-10px"}}>開始測驗</p>
            </button>
        </div>
    )
}

export default PsyTest