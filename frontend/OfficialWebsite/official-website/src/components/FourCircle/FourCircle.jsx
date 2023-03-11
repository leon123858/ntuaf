import Card from "./Card.jsx"
import styles from "./FourCircle.module.css"
import {useState, useEffect, useContext} from "react"
import { BreakPointContext } from '../../useBreakPoint';
import { Col, Row } from 'antd';
const FourCircle = () => {
    const [contents, setContents] = useState([])
    const { inBreakPoint, breakPoint } = useContext(BreakPointContext);
    document.body.style.setProperty('--fourBallOffset', `-${1000/2}px`);
    window.addEventListener('scroll', () => {
        let tmp = document.getElementsByClassName(styles.lgCardWrapper)[0];

        let animationPortion = window.pageYOffset / window.innerHeight
        animationPortion = animationPortion>=1?0.99:animationPortion
        document.body.style.setProperty('--scroll', animationPortion);
        console.log(window.pageYOffset, document.body.offsetHeight, window.innerHeight, tmp.offsetParent)
    }, false);
    useEffect(()=>{
        
        setContents([
            {
                title: "起",
                content: "毀滅與混沌",
                discription:"discription for 起",
                activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"]
            },
            {
                title: "承",
                content: "毀滅與混沌",
                discription:"discription for 承",
                activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"]
            },
            {
                title: "轉",
                content: "毀滅與混沌",
                discription:"discription for 轉",
                activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"]
            },
            {
                title: "合",
                content: "毀滅與混沌",
                discription:"discription for 合",
                activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"]
            },
        ])
    }, [])
    return (

        <>
        {inBreakPoint?
        <div className={styles.cardWrapper}>
        {contents.map((content, index) => {
            return (
                <Card content={content} key={index} />
            )
        })}
        </div>:
        <div className={styles.lgContainer} style={{width:`${breakPoint}px`}}>
        <div className={styles.lgCardWrapper} style={{width:`${breakPoint}px`}}>
        {contents.map((content, index) => {
            return (
                <Card content={content} key={index} />
            )
        })}
        </div>
        </div>
        }
        
        </>
        )
}


export default FourCircle