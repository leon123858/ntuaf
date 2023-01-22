import React from 'react';
// import style from './Home.module.css';
// import { Card } from 'antd';


const Map = () => {
	return(
		<>
			<div style={{ textAlign : 'left' , width: 560 ,marginBottom : 20 }}>藝術家地圖</div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.4727012957205!2d121.53607172695311!3d25.018027399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9898c33fb79%3A0x986a86f132e4eae4!2z5rS75aSn6aSQ5buz!5e0!3m2!1szh-TW!2stw!4v1674007111196!5m2!1szh-TW!2stw" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="myFrame"></iframe>
        </>
	);
}


export default Map;