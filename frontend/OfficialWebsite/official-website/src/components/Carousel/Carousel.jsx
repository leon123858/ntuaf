import { Card } from 'antd';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import Slider from "react-slick"
import { AlignCenterOutlined, ConsoleSqlOutlined, HeartFilled, LeftOutlined, RightOutlined } from '@ant-design/icons';
import "./Carousel.css"
import ColumnGroup from 'antd/es/table/ColumnGroup';

const CarouselCard = ({index, imageIndex, cardContent}) => {
    
    const { Meta } = Card;
    return (
        <div className={index === imageIndex ? "slide activeSlide" : "slide"} style={{display:"inline", order:index%4}}>
            {/* <a href='https://google.com' style={{textDecoration:"none", color:"black"}}> */}
                <img src='https://images.squarespace-cdn.com/content/v1/5452d441e4b0c188b51fef1a/1615326541809-TW01PVTOJ4PXQUXVRLHI/male-orange-tabby-cat.jpg?format=300w'></img>
                <h4 className='title'>{cardContent.header}</h4>
                <p className="disc">{cardContent.content} {index}</p>
            {/* </a> */}
        </div>
        // {/* <Card
        //     hoverable
        //     className={index === imageIndex ? "slide activeSlide" : "slide"}
        //     style={{margin:"auto"}}

        // >
        //     <img style={{maxWidth:"100%"}} alt="example" src=" https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg" />
        //     <Meta title={cardContent.header} description={cardContent.content} />
        //     <>{index}</>
        // </Card> */}



    )
}
const CarouselComponent = () => {
    const NextArrow = ({ onClick }) => {
        return (
            <div className="arrow next" onClick={onClick}>
                <RightOutlined />
            </div>
        );
    };

    const PrevArrow = ({ onClick }) => {
        return (
            <div className="arrow prev" onClick={onClick}>
                <LeftOutlined />
            </div>
        );
    };

    const [imageIndex, setImageIndex] = useState(0);
    const [count, setCount] = useState(0);
    
    const settings = {
        // focusOnSelect: true,
        useTransform:false,
        adaptiveHeight:true,
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next),
    };
    let images = [1, 2, 3]
    let cardContent = {
        imageUrl:"",
        header:"展覽活動名稱",
        content: "展覽簡介內容"
    }
    let cardCotents = images.map(()=>cardContent)
    return (
        <div className="App">
            <button onClick={()=>{setCount(count+1)}} style={{height:"50px", width:"50px"}}>{count}</button>
            <div style={{display:"flex"}}>
                <h1 style={{flex:1, textAlign:"center", padding:"10px"}}>近期活動</h1>
                <h1 style={{flex:1, textAlign:"center", padding:"10px"}}>常設展覽</h1>
            </div>
            
            <div className='carouselWrapper'>
                    {cardCotents.map((cardContent, idx) => (
                            <CarouselCard index={idx} cardContent={cardContent} imageIndex={imageIndex} count/>
                    ))}
        
            </div>
        </div>
    );
};

export default CarouselComponent