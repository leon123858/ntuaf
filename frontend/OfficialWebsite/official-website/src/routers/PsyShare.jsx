import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


function Share(){
    const { type } = useParams();
    const [src, setSrc] = useState("/心理測驗(結果)_A.jpg");
    useEffect(() => {
        switch (type) {
            case 'A':
                setSrc("/心理測驗(結果)_A.jpg")
                break;
            case 'B':
                console.log(1)
                setSrc("/心理測驗(結果)_B.jpg")
                break;
            case 'C':
                setSrc("/心理測驗(結果)_C.jpg")
                break;
            default:
                break;
        }
	},[type]);

    console.log(type)

    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <img alt="" style={{ maxWidth: '500px' }} src ={src}/>
        </div>
    )
}
export default Share;