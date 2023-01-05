import { useState } from "react"
import style from "./Carousel.module.css"
import {useSwipeable} from "react-swipeable"

const CarouselCard = ({index, activateImg, cardContent}) => {

    let translatePercent = -index*50-(activateImg-1)*50
    let opacity = 1
    let scale=1
    if (index-activateImg===1 || index-activateImg===-1){
        // 
        opacity = 0.5
        scale = 0.7
    }else if (index-activateImg>1 || index-activateImg<-1){
        opacity = 0
        scale = 0.7
    }

    return (
        <div className={index === activateImg ? [style.activeSlide, style.slide].join(' '): style.slide} style={{transform:`translateX(${translatePercent}%) scale(${scale})`, opacity:`${opacity}`,}}>
            {/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
                <img src='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=300w'
                alt="here"></img>
                <h4 className={style.title}>{cardContent.header}</h4>
                <p className={style.disc}>{cardContent.content} {index}</p>
            {/* </a> */}
        </div>
    )
}
const CarouselComponent = ({cardCotents}) => {

    const [activateImg, setActivateImg] = useState(1);
    const moveLeft = ()=>{
        if (activateImg<=0){
            // reach the first image
            return
        }
        setActivateImg((activateImg-1)%(cardCotents.length))
    }
    
    const moveRight = ()=>{
        if (activateImg>=cardCotents.length-1){
            // reach the last image
            return
        }
        setActivateImg((activateImg+1)%(cardCotents.length))
    }
    //info swipe effect
    const handlers = useSwipeable({
        onSwipedLeft: () => {if (activateImg+1<=cardCotents.length-1){setActivateImg((prev)=>prev+1)}},
        onSwipedRight: ()=> {if (0<=activateImg-1){setActivateImg((prev)=>prev-1)}},
    });
    return (
        <div className={style.carouselWrapper}  {...handlers}>
                <div className={style.prev} onClick={moveLeft}>❮</div>
                <div className={style.next} onClick={moveRight}>❯</div>
                {cardCotents.map((cardContent, idx) => (
                        <CarouselCard index={idx} cardContent={cardContent} activateImg={activateImg}/>
                ))}
        
        </div>
    )
}
const Carousel = () => {
    // todo draggable
    // todo make active image larger in mobile mode
    let images = [1, 2, 3, 4, 5, 6]
    let cardContent = {
        imageUrl:"",
        header:"展覽活動名稱",
        content: "展覽簡介內容"
    }
    
    let cardCotents = images.map(()=>cardContent)

    return (
        <div className={style.App}>
            <div className={style.headerWrapper}>
                <h1 className={style.header}>近期活動</h1>
                <h1 className={style.header}>常設展覽</h1>
            </div>
            <CarouselComponent cardCotents={cardCotents}/>
        </div>
    );
};

export default Carousel