import LgOneSideCard from "./LgOneSideCard.jsx"
import style from "./LgDoubleSideCard.module.css"

const LgDoubleSideCard = ({FrontCardContent, BackCardContent, flip}) => {
    return (
        <div className={style.dCardWrapper}>
                <div className={flip===true?[style.dCardInnerWrapper, style.dCardInnerWrapperFlip].join(' '):style.dCardInnerWrapper}>
                    <div className={style.flipFrontCard}><LgOneSideCard cardContent={FrontCardContent}/></div>
                    <div className={style.flipBackCard}><LgOneSideCard cardContent={BackCardContent}/></div>
                </div>
        </div>
    )
}

export default LgDoubleSideCard