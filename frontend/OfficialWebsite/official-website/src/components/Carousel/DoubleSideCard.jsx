import OneSideCard from "./OneSideCard.jsx"
import style from "./DoubleSideCard.module.css"

const DoubleSideCard = ({FrontCardContent, BackCardContent, flip}) => {
    return (
        <div className={style.dCardWrapper}>
            {/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
                <div className={flip===true?[style.dCardInnerWrapper, style.dCardInnerWrapperFlip].join(' '):style.dCardInnerWrapper}>
                    <div className={style.flipFrontCard}><OneSideCard cardContent={FrontCardContent}/></div>
                    {/* {FrontCard?<FrontCard/>:<></>} */}
                    {/* {BackCard?<BackCard/>:<></>} */}
                    <div className={style.flipBackCard}><OneSideCard cardContent={BackCardContent}/></div>
                </div>
            {/* </a> */}
        </div>
    )
}

export default DoubleSideCard