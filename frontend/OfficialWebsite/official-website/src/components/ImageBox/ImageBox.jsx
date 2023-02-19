import React, { useContext } from 'react';
import style from './ImageBox.module.css';
import 'react-slideshow-image/dist/styles.css'

import { BreakPointContext } from '../../useBreakPoint';
import { Card, Image } from 'antd';
import { Slide } from 'react-slideshow-image';
import { BlOCK_TYPE } from '@leon123858/ntuaf-sdk'

const ImageBox = ({ images }) => {
    const { inBreakPoint } = useContext(BreakPointContext);

    return (
        {
            [BlOCK_TYPE.IMAGE_A]: (
                // <div className={style.container}>
                //     <div className={(inBreakPoint) ? style.picBox1 : style.lgPicBox1}>
                //         {
                //             images.images.map((image, idx) => (
                //                 <div key={idx}>
                //                     <Card
                //                         style={{
                //                             borderColor: 'black',
                //                         }}
                //                     >
                //                         <img
                //                             alt='img' src={image.src}
                //                             className={style.img}
                //                         />
                //                         {image.content}
                //                     </Card>
                //                 </div>
                //             ))
                //         }
                //     </div>
                // </div>
                <div className={style.container} style={{ margin: '32px auto' }}>
                    <h1 className={`${style.topic} ${style.two}`}>{images.content}</h1>
                    <p className={style.content}>{images.text}</p>
                </div>
            ),

            // [BlOCK_TYPE.IMAGE_B]: (
            //     <div className={style.container}>
            //         <div className={style.picBox2}>
            //             <Slide
            //                 indicators={true}
            //                 transitionDuration={300}
            //                 autoplay={false}
            //             >
            //                 {
            //                     images.images.map((image, idx) => (
            //                         <div className={style.slide} key={idx}>
            //                             <img src={image.src} alt="" style={{ height: 300 }} />
            //                         </div>
            //                     ))
            //                 }
            //             </Slide>
            //         </div>
            //     </div>
            // ),

            // [BlOCK_TYPE.IMAGE_C]: (
            //     <div className={style.container} style={{ textAlign: 'center' }}>
            //         <Image
            //             alt='img'
            //             src={images.images[0].src}
            //         />
            //     </div>
            // )

        }[images.type]
    );
};
export default ImageBox;
