import React, { useContext } from 'react';
import style from './ImageList.module.css';
import { BreakPointContext } from '../../useBreakPoint';



const defaultData = {
    type: 2,
    topic: '藝人介紹',
    images: [
        {
            name: '我是藝人',
            src: 'https://i.seadn.io/gcs/files/ba48edfe0111f0c3a8aa66bc5c05c8b8.png?auto=format&w=1000',
        },
        {
            name: '我是藝人',
            src: 'https://i.seadn.io/gcs/files/ba48edfe0111f0c3a8aa66bc5c05c8b8.png?auto=format&w=1000',
        },
        {
            name: '我是藝人',
            src: 'https://i.seadn.io/gcs/files/ba48edfe0111f0c3a8aa66bc5c05c8b8.png?auto=format&w=1000',
        },
        {
            name: '我是藝人我是藝人',
            src: 'https://i.seadn.io/gcs/files/ba48edfe0111f0c3a8aa66bc5c05c8b8.png?auto=format&w=1000',
        },
        {
            name: '我是藝人',
            src: 'https://i.seadn.io/gcs/files/ba48edfe0111f0c3a8aa66bc5c05c8b8.png?auto=format&w=1000',
        },
        {
            name: '我是藝人',
            src: 'https://i.seadn.io/gcs/files/ba48edfe0111f0c3a8aa66bc5c05c8b8.png?auto=format&w=1000',
        },
        {
            name: '我是藝人',
            src: 'https://i.seadn.io/gcs/files/ba48edfe0111f0c3a8aa66bc5c05c8b8.png?auto=format&w=1000',
        },
        {
            name: '我是藝人我是藝人',
            src: 'https://i.seadn.io/gcs/files/ba48edfe0111f0c3a8aa66bc5c05c8b8.png?auto=format&w=1000',
        },
    ]
}

const ImageList = ({data = defaultData}) => {
    const { inBreakPoint } = useContext(BreakPointContext);
    return (
        (inBreakPoint) 
        ?  (
            <div className={style.container}>
                <p className={style.topic}>{data.topic}</p>
                <div className={(data.type === 1) ? style.imgList : style.imgList2}>
                    {data.images.map((image, idx) => (
                        <div className={(data.type === 1) ? style.imgContainer : style.imgContainer2} key={idx}>
                            <img alt='team img' src={image.src} className={style.img}/>
                            <p className={(data.type === 1) ? style.imgName : style.imgName2}>
                                {((data.type === 1) ? '' : '/')} {image.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            
        ) :
        (
            <div className={style.container}>
                <p className={style.lgTopic}>{data.topic}</p>
                <div className={style.lgImgList}>
                    {data.images.map((image, idx) => (
                        <div className={style.lgImgContainer} key={idx}>
                            <img alt='team img' src={image.src} className={style.lgImg}/>
                            <p>{image.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};
export default ImageList;

