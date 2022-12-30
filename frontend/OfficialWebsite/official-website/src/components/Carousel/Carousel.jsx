import { Card } from 'antd';
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import Slider from "react-slick"
import { AlignCenterOutlined, ConsoleSqlOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import "./Carousel.css"

const CarouselCard = ({index, cardContent}) => {
    
    const { Meta } = Card;
    return (
        <a href='https://www.google.com' style={{textDecoration:"None"}}>
        <Card
            hoverable
            style={{ width: 240, maxWidth:"100%" }}

        >
            <img style={{maxWidth:"100%"}} alt="example" src=" https://upload.wikimedia.org/wikipedia/commons/6/6b/Picture_icon_BLACK.svg" />
            <Meta title={cardContent.header} description={cardContent.content} />
            <>{index}</>
        </Card>
        </a>

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

    const settings = {
        // focusOnSelect: true,
        infinite: true,
        lazyLoad: true,
        speed: 300,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setImageIndex(next),
    };
    let images = [1, 2, 3, 4]
    let cardContent = {
        imageUrl:"",
        header:"展覽活動名稱",
        content: "展覽簡介內容"
    }
    let cardCotents = images.map(()=>cardContent)
    return (
        <div className="App">
            <div style={{margin:"5px", textAlign:"justify"}}>
                <span style={{position:"relative"}}>近期活動</span>
                <span style={{position:"relative"}}>常設展覽</span>
            </div>
            <Slider {...settings}>
                {cardCotents.map((cardContent, idx) => (
                    <div className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                        <CarouselCard index={idx} cardContent={cardContent}/>
                        {/* <>{idx}</> */}
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CarouselComponent