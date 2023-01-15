import { useState } from "react"
import style from "./Carousel.module.css"
import { useSwipeable } from "react-swipeable"
import {default as CarouselImport}  from 'react-spring-3d-carousel';
import DoubleSideCard from "./DoubleSideCard.jsx"

const Carousel = () => {
    
    const [activateImg, setActivateImg] = useState(1);
    const [flip, setFlip] = useState(false);
    const moveLeft = () => {
        setActivateImg(activateImg-1)
    }

    const moveRight = () => {
        setActivateImg(activateImg+1)
    }
    //info for sample data
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
    //info create carousel cards for carousel
    let slides = activityContentList.map((content, i)=>{
        return ({
            key: i,
            content: 
            <div className={style.cardWrapper}>
                <DoubleSideCard FrontCardContent={activityContentList[i]} BackCardContent={evnetContentList[i]} flip={flip}></DoubleSideCard>
            </div>
        })
    } )
    //info swipe effect
    const handlers = useSwipeable({
        onSwipedLeft: () => { setActivateImg(activateImg+1) },
        onSwipedRight: () => { setActivateImg(activateImg-1) },
    });

    return (
        <div className={style.App}>
            <div className={style.headerWrapper}>
                <h1 className={style.header} onClick={()=>{setFlip(false)}}>近期活動</h1>
                <h1 className={style.header} onClick={()=>{setFlip(true)}}>常設展覽</h1>
            </div>
            
            <div className={style.carouselWrapper}  {...handlers}>
                <div className={style.prev} onClick={moveLeft}>❮</div>
                <div className={style.next} onClick={moveRight}>❯</div>
                <CarouselImport slides={slides} goToSlide={activateImg}></CarouselImport>
            </div>
            
        </div>
    );
};

export default Carousel