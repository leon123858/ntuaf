// import OneSideCard from "./OneSideCard.jsx"
import style from "./DoubleCard.module.css"
import FrontCard from "./FrontCard.jsx"
import BackCard from "./BackCard.jsx"
import { useContext } from "react"
import { BreakPointContext } from '../../useBreakPoint';

const DoubleSideCard = ({FrontCardContent, BackCardContent, closeModel, flip, setFlip}) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    return (
        <>{
            inBreakPoint?
            <div className={style.lgDCardWrapper}>
                <div className={flip===true?[style.dCardInnerWrapper, style.dCardInnerWrapperFlip].join(' '):style.dCardInnerWrapper}>
                    <div className={style.flipFrontCard}><FrontCard FrontCardContent={FrontCardContent} setFlip={setFlip} closeModel={closeModel}/></div>
                    <div className={style.flipBackCard}><BackCard BackCardContent={BackCardContent} setFlip={setFlip} closeModel={closeModel}/></div>
                </div>
            </div>:
            <div className={style.dCardWrapper}>
                <div className={flip===true?[style.dCardInnerWrapper, style.dCardInnerWrapperFlip].join(' '):style.dCardInnerWrapper}>
                    <div className={style.flipFrontCard}><FrontCard FrontCardContent={FrontCardContent} setFlip={setFlip} closeModel={closeModel}/></div>
                    <div className={style.flipBackCard}><BackCard BackCardContent={BackCardContent} setFlip={setFlip} closeModel={closeModel}/></div>
                </div>
            </div>
        }</>

    )
}

export default DoubleSideCard