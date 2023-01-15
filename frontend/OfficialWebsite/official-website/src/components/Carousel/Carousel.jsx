import { useState } from "react"
import style from "./Carousel.module.css"
import { useSwipeable } from "react-swipeable"
import {default as CarouselImport}  from 'react-spring-3d-carousel';
import { Card as CardAntd, Tabs } from 'antd';

const { Meta } = CardAntd;
// import { uuid } from 'uuidv4';
const OneSideCard = ({cardContent}) => {
    // console.log(cardContent)
    return (
        <div className={style.oneSideCard}>
            {/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
            <img src='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=300w'
                alt="here"></img>
            <h4 className={style.title}>{cardContent.header}</h4>
            <p className={style.disc}>{cardContent.content} {cardContent.index}</p>
            {/* </a> */}
        </div>
    )
}
const DoubleSideCard = ({FrontCardContent, BackCardContent, flip}) => {
    // console.log(flip, flip===true, [style.dCardInnerWrapper, style.dCardInnerWrapperFlip].join(' '))
    // let cardContent0 = frontCard
    // let cardContent1 = backCard
    console.log("FrontCard", )
    return (
        <div className={style.dCardWrapper}>
            <div className={flip===true?[style.dCardInnerWrapper, style.dCardInnerWrapperFlip].join(' '):style.dCardInnerWrapper}>
                <div className={style.flipFrontCard}><OneSideCard cardContent={FrontCardContent}/></div>
                {/* {FrontCard?<FrontCard/>:<></>} */}
                {/* {BackCard?<BackCard/>:<></>} */}
                <div className={style.flipBackCard}><OneSideCard cardContent={BackCardContent}/></div>
            </div>
        </div>
    )
}
const CarouselCard2 = ({activateImg, cardList, flip}) => {
    // let {recentActivity, regularExpo} = cardContents
    let frontCard = cardList[0]
    let backCard =  cardList[0]
    let translatePercent = -cardList[0].index * 50 - (activateImg - 1) * 50
    let opacity = 1
    let scale = 1
    if (cardList[0].index - activateImg === 1 || cardList[0].index - activateImg === -1) {
        // it seems like flip can be set here
        opacity = 0.5
        scale = 0.7
    } else if (cardList[0].index - activateImg > 1 || cardList[0].index - activateImg < -1) {
        opacity = 0
        scale = 0.7
    }

    return (
    <div className={cardList[0].index === activateImg ? [style.activeSlide, style.slide].join(' ') : style.slide} style={{ transform: `translateX(${translatePercent}%) scale(${scale})`, opacity: `${opacity}`, }}>
        {/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
            <DoubleSideCard frontCard={frontCard} backCard={backCard} flip={false}/>
        {/* </a> */}
    </div>
    )
}

const CarouselCard = ({active, cardList, flip, activateImg}) => {
    // let {recentActivity, regularExpo} = cardContents
    let frontCard = cardList[0]
    let backCard =  cardList[0]
    let translatePercent = -cardList[0].index * 50 - (activateImg - 1) * 50
    let opacity = 1
    let scale = 1
    if (cardList[0].index - activateImg === 1 || cardList[0].index - activateImg === -1) {
        // it seems like flip can be set here
        opacity = 0.5
        scale = 0.7
    } else if (cardList[0].index - activateImg > 1 || cardList[0].index - activateImg < -1) {
        opacity = 0
        scale = 0.7
    }

    return (
    <div className={cardList[0].index === activateImg ? [style.activeSlide, style.slide].join(' ') : style.slide} style={{ transform: `translateX(${translatePercent}%) scale(${scale})`, opacity: `${opacity}`, }}>
        {/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
            <DoubleSideCard frontCard={frontCard} backCard={backCard} flip={false}/>
        {/* </a> */}
    </div>
    )
}
const CarouselComponent = ({ cardList }) => {
    const [activateImg, setActivateImg] = useState(1);
    const moveLeft = () => {
        if (activateImg <= 0) {
            // reach the first image
            return
        }
        setActivateImg((activateImg - 1) % (cardList.length))
    }

    const moveRight = () => {
        if (activateImg >= cardList.length - 1) {
            // reach the last image
            return
        }
        setActivateImg((activateImg + 1) % (cardList.length))
    }
    //info swipe effect
    const handlers = useSwipeable({
        onSwipedLeft: () => { if (activateImg + 1 <= cardList.length - 1) { setActivateImg((prev) => prev + 1) } },
        onSwipedRight: () => { if (0 <= activateImg - 1) { setActivateImg((prev) => prev - 1) } },
    });
    return (
        <div className={style.carouselWrapper}  {...handlers}>
            <div className={style.prev} onClick={moveLeft}>❮</div>
                <div className={style.next} onClick={moveRight}>❯</div>
            {/* {cardCotents.map((cardContent, idx) => (
                        <CarouselCard index={idx} cardContent={cardContent} activateImg={activateImg}/>
                ))} */}

            {/* {cardContents.map((cardContent, idx) => (
                <CarouselCard index={idx} cardContent={cardContent} activateImg={activateImg} />
            ))} */}

        </div>
    )
}
const TestComponent = ({Card})=>{
    return (<Card content={"content here"}/>)
}
const Card = ({content})=>{
    console.log("Card", content)
    return(
        <OneSideCard/>
    )
}


const Carousel = () => {
    const [activateImg, setActivateImg] = useState(1);
    const [flip, setFlip] = useState(false);
    const moveLeft = () => {
        // if (activateImg <= 0) {
        //     // reach the first image
        //     return
        // }
        setActivateImg(activateImg-1)
        // setActivateImg((activateImg - 1) % (cardList.length))
    }

    const moveRight = () => {
        // if (activateImg >= cardList.length - 1) {
        //     // reach the last image
        //     return
        // }
        setActivateImg(activateImg+1)
        // setActivateImg((activateImg + 1) % (cardList.length))
    }
    // todo draggable
    // todo make active image larger in mobile mode
    let aimages = [0, 1, 2, 3, 4]
    let eimages = [0, 1, 2]
    let defaultContent = {
        imageUrl: "",
        header: "to be continue...",
        content: "to be continue..."
    }
    let acardContent = {
        imageUrl: "",
        header: "近期活動名稱",
        content: "近期活動簡介內容"
    }
    let ecardContent = {
        imageUrl: "",
        header: "常設展覽名稱",
        content: "常設展覽簡介內容"
    }
    let activityContentList = aimages.map((index) => {return ({...acardContent, index:index})})
    let evnetContentList = eimages.map((index) => {return ({...ecardContent, index:index})})
    //info make two content lists to the same length
    if (activityContentList.length<evnetContentList.length){
        activityContentList = evnetContentList.map((_, i)=>{
            if(i<activityContentList.length){
                return activityContentList[i]
            }else{
                return {...defaultContent, index:i}
            }
        })
    }else if (activityContentList.length>evnetContentList.length){
        evnetContentList = activityContentList.map((_, i)=>{
            if(i<evnetContentList.length){
                return evnetContentList[i]
            }else{
                return {...defaultContent, index:i}
            }
        })
    }
    console.log(activityContentList, evnetContentList)
    let recentActivity = eimages.map((index) => {return ({...acardContent, index:index})})
    let regularExpo = eimages.map((index) => {return ({...ecardContent, index:index})})
    let cardContents = {recentActivity, regularExpo}
    // console.log(cardContents)
    const createCards = (content)=>{
        return(
            <OneSideCard cardContent={content}/>
        )
    }
    let frontCardL =  createCards(recentActivity)
    let backCardL =  createCards(regularExpo)
    let slides = activityContentList.map((content, i)=>{

        return ({
            key: i,
            content: 
            <div className={style.cardWrapper}>
                <DoubleSideCard FrontCardContent={activityContentList[i]} BackCardContent={evnetContentList[i]} flip={flip}></DoubleSideCard>

            </div>
        //     content: <CardAntd cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
        //     <Meta title="Europe Street beat" description="www.instagram.com" />
        // </CardAntd>
        })
    } )




    return (
        <div className={style.App}>
            <div className={style.headerWrapper}>
                <h1 className={style.header} onClick={()=>{setFlip(false)}}>近期活動</h1>
                <h1 className={style.header} onClick={()=>{setFlip(true)}}>常設展覽</h1>
            </div>
            
            <div className={style.carouselWrapper} >
                <div className={style.prev} onClick={moveLeft}>❮</div>
                <div className={style.next} onClick={moveRight}>❯</div>
                <CarouselImport slides={slides} goToSlide={activateImg}></CarouselImport>
            </div>
            
        </div>
    );
};

export default Carousel