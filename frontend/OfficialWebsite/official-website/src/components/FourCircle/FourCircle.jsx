import Card from "./Card.jsx"
import styles from "./FourCircle.module.css"
import {useState, useEffect, useContext} from "react"
import { BreakPointContext } from '../../useBreakPoint';
const FourCircle = () => {
    const [contents, setContents] = useState([])
    const { inBreakPoint, breakPoint } = useContext(BreakPointContext);
    document.body.style.setProperty('--fourBallOffset', `-${1000/2}px`);
    window.addEventListener('scroll', () => {
        let tmp = document.getElementsByClassName(styles.lgCardWrapper)[0];

        let animationPortion = window.pageYOffset / window.innerHeight
        animationPortion = animationPortion>=1?0.99:animationPortion
        document.body.style.setProperty('--scroll', animationPortion);
        // console.log(window.pageYOffset, document.body.offsetHeight, window.innerHeight, tmp.offsetParent)
    }, false);
    useEffect(()=>{
        
        setContents([
            {
                title: "起",
                content: "毀滅與混沌",
                discription:"相傳世界曾在剎那間毀滅。在新天地尚未形成之際，晝夜未分、萬物融合而模糊不清。周身環繞的萬物雜處，皆以起終點相接的脈絡，交互合成、不斷被推進向前。混沌不清的世界中，你尋向無止境的深邃，彷彿聽見自己的心跳、看見隱約亮起的光⋯⋯",
                activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"],
                iconTextUrl:"https://drive.google.com/uc?export=view&id=1ZH67hNwfwAoj1Vks6zpQ3XXhbzl34kkR",
                frontCardBackgroundUrl: "https://drive.google.com/uc?id=1kyu7x55UBdqSmYlpf6WC6JxlvK4BDQTX",
                backCardBackgroundUrl:"https://drive.google.com/uc?id=11MSlrBGKFS5Qu7aoxETCHZRImerzCqfI",
                iconUrl:"https://drive.google.com/uc?id=1jWqKeJM_zxChS4-gvziaezkq_nkNZ-jD"
            },
            {
                title: "承",
                content: "毀滅與混沌",
                discription:"沙漏靜靜流淌，堆疊出回憶的雛形。如水般的時間之流，引領著你回溯。在這趟追尋的旅程裡，你檢視著過往或現在的種種，將它們一一拾掇。亦反芻著內心存在的好與壞，試圖療癒過去，並重塑自身獨有的樣貌。",
                activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"],
                iconTextUrl:"https://drive.google.com/uc?export=view&id=1iibFuaDkLb2css1cE90DPqx9uvVU-ngp",
                frontCardBackgroundUrl: "https://drive.google.com/uc?export=view&id=1jFhIkKU5iSMMBepJg9BvXsDr3SYn5FfB",
                backCardBackgroundUrl:"https://drive.google.com/uc?id=1_Ct8Jd-CbVH74klQp6GgLbZ5CBHXSHdE",
                iconUrl:"https://drive.google.com/uc?id=1WhSSOwiyQWeM2V5s_wugPbdOuv2Iek9J"
            },
            {
                title: "轉",
                content: "毀滅與混沌",
                discription:"求索於萬物中的你，與各式生靈展開互動，形成平衡又不斷打破平衡。你在自然的脈動與循環中，體會著其他生靈與外界的衝突、壓迫與被壓迫的交互關係；這些概念與想法無形間牽動著靈魂，形成領悟與懷疑，領著你朝著未知的方向及領域前行。",
                activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"],
                iconTextUrl:"https://drive.google.com/uc?export=view&id=19Pr_ZKuq_ewDTqWBta1pvVctPBalgGoE",
                frontCardBackgroundUrl: "https://drive.google.com/uc?export=view&id=1bHLquinCXf3qmzZgq5KpuRmjwoJGPQLt",
                backCardBackgroundUrl:"https://drive.google.com/uc?id=1YgQTSruabhyercf7SoNbzTmJoWapnKag",
                iconUrl:"https://drive.google.com/uc?id=1RUIAvkEpRrPXU06OmRVMP1E7zRFIDzQN"
            },
            {
                title: "合",
                content: "毀滅與混沌",
                discription:"你走到了末章。自然、萬物與時間在原點終結，文明的痕跡、繁華或者傷痛，於緩緩的沖刷之中褪去。一切的輻輳點，是過去、也是未來。一切歸零之瞬，你看見了重生的可能正悄然醞釀，新的循環即將展開⋯⋯",
                activity:["相應展覽活動", "相應展覽活動", "相應展覽活動", "相應展覽活動"],
                iconTextUrl:"https://drive.google.com/uc?export=view&id=155t92ccEnvx4Hwvpg7irog3F1N9rFvMB",
                frontCardBackgroundUrl: "https://drive.google.com/uc?export=view&id=1SkBeZ04SLJf0ZrV0GB2nK-HkcU4EuvsK",
                backCardBackgroundUrl:"https://drive.google.com/uc?id=1F8Ko3eqvQi84ZzaQNHbWZE3q7nqoOwEw",
                iconUrl:"https://drive.google.com/uc?id=1u1pT6fxyQoHawIHKwvv8CSXrTAgtwHaQ"
            },
        ])
    }, [])
    return (

        <>
        {inBreakPoint?
        <div className={styles.cardWrapper}>
        {contents.map((content, index) => {
            return (
                <Card content={content} index={index} />
            )
        })}
        </div>:
        <div className={styles.lgCardWrapper} style={{height:`${breakPoint}px`}}>
        {contents.map((content, index) => {
            console.log("index", index)
            return (
                <Card content={content} index={index} />
            )
        })}
        </div>

        }
        
        </>
        )
}


export default FourCircle