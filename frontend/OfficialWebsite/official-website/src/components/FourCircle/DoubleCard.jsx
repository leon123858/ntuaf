// import OneSideCard from "./OneSideCard.jsx"
import style from "./DoubleCard.module.css"
import FrontCard from "./FrontCard.jsx"
import BackCard from "./BackCard.jsx"
import {useState} from "react"

const DoubleSideCard = ({FrontCardContent, BackCardContent, closeModel}) => {
    const [flip, setFlip] = useState(false)
    return (
        <div className={style.dCardWrapper}>
            {/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
                <div className={flip===true?[style.dCardInnerWrapper, style.dCardInnerWrapperFlip].join(' '):style.dCardInnerWrapper}>
                    <div className={style.flipFrontCard}><FrontCard FrontCardContent={FrontCardContent} setFlip={setFlip} closeModel={closeModel}/></div>
                    {/* <div className={style.flipFrontCard}>helo</div> */}
                    {/* {FrontCard?<FrontCard/>:<></>} */}
                    {/* {BackCard?<BackCard/>:<></>} */}
                    {/* <div className={style.flipBackCard}>heloback</div> */}
                    <div className={style.flipBackCard}><BackCard BackCardContent={BackCardContent} setFlip={setFlip} closeModel={closeModel}/></div>
                </div>
                {/* <button onclick={()=>{setFlip(prev=>!prev)}}>flip</button> */}
            {/* </a> */}
        </div>
    )
}

export default DoubleSideCard